---
title: AVI Networks (NSX ALB) Integration
tags: [integrations list]
permalink: avi_nsx_alb.html
summary: Learn about the Wavefront AVI Networks (NSX ALB) Integration.
---
## AVI Networks (NSX ALB) Integration

AVI Networks (NSX Advanced Load Balancer) provides multi-cloud load balancing, web application firewall, application analytics, and container ingress services from the data center to the cloud.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/nsx-alb-summary.png" width="80" %}

## AVI Networks (NSX Advanced Load Balancer) Setup



**Note**: We have included these instructions because we believe that they are useful. We have not performed independent testing of these instructions.

### Prerequisites

**Requirements**:
 - Python 3.6+
 - Packages: python3-yaml, python3-requests

### Installation

1. Create a directory `avi_metrics` and download the file `metricscollection.py` and `configuration.yaml` into the directory.{% raw %}
```
mkdir avi_metrics
cd avi_metrics
curl -o metricscollection.py https://raw.githubusercontent.com/avinetworks/devops/master/monitoring/metrics%20collection/metricscollection.py
```
{% endraw %}

2. Create a file `configuration.yaml` and add the following configuration snippet.
{% raw %}
```
#----------Controllers to Poll Data From - REQUIRED ------------
#---------------------------------------------------------------
controllers:
   - avi_cluster_name: demo_controller
     #_comment: FQDN or IP address that the script will connect to for API calls
     avi_controller: <IP_or_FQDN>
     avi_user: admin
     #_comment: ACCEPTS PLAIN TEXT OR BASE64 ENCODED PASSWORD
     avi_pass: password
     tags:
      environment: dev
      location: datacenter1
     #_comment: Realtime metrics will cause the script to take longer to complete, optional
     virtualservice_stats_config:
         virtualservice_metrics: True
         virtualservice_realtime: True
         virtualservice_runtime: True
         # virtualservice_names:
         #   - AutoScaleout-VS
         #   - Avi-DemoAvi-VS
         #   - WAF_Demo_VS
         virtualservice_metrics_list:
            - l4_client.avg_bandwidth
            - l4_client.avg_rx_pkts
            - l4_client.avg_tx_pkts
            - l4_client.avg_rx_bytes
            - l4_client.avg_tx_bytes
            - l7_client.avg_ssl_handshakes_new
     serviceengine_stats_config:
         serviceengine_metrics: True
         serviceengine_runtime: True
         serviceengine_realtime: True
     pool_stats_config:
         pool_metrics: True
         pool_runtime: True
         pool_realtime: True
     controller_stats_config:
         controller_metrics: True
         controller_runtime: True
         controller_metrics_list:
            - controller_stats.avg_cpu_usage
            - controller_stats.avg_disk_usage
            - controller_stats.avg_mem_usage
     metrics_endpoint_config:
         - type: wavefront
           enable: True
           metric_prefix: "avi"
           #_comment: IP or FQDN for Wavefront
           instance: <IP_or_FQDN>
           #_comment:  If using direct ingestion specify an api_key, if no key then wavefront proxy will be used
           #api_key: <API_TOKEN>
           #_comment:  If using proxy specify the listening port, if not defined defaults to 2878
           proxy_port: 2878
```
{% endraw %}

**NOTE**:
- It is recommended to configure Wavefront Proxy over direct ingestion.
- It is recommended to comment out the `virtualservice_names` block.
- Update the `IP_or_FQDN`, and `API_TOKEN` with the corresponding values as per your environment.

#### Running the script locally

1. Run the script to push metrics to the Wavefront endpoint.{% raw %}
```
python3 metricscollection.py
```
{% endraw %}

#### Run as a Container

1. Download the Dockerfile into the `avi_metrics` directory.{% raw %}
```
curl -o Dockerfile https://raw.githubusercontent.com/avinetworks/devops/master/monitoring/metrics%20collection/dockerfile
```
{% endraw %}

2. Build the container.{% raw %}
```
docker build -t metricscollection .
```
{% endraw %}

3. Start the container.{% raw %}
```
docker run -d --name metricscollection --restart always --log-opt max-size=1m -e "EN_CONFIGURATION=$(<configuration.yaml)"  metricscollection
```
{% endraw %}
**NOTE**: To start the container, you must specify the configuration by using the `EN_CONFIGURATION` environment variable.

For more information on AVI Controller configuration, see the [configuration](https://github.com/avinetworks/devops/tree/master/monitoring/metrics%20collection#configurationyaml) document.



