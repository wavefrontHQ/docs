---
title: RabbitMQ Integration
tags: [integrations list]
permalink: rabbitmq.html
summary: Learn about the RabbitMQ Integration.
---
## RabbitMQ Integration

RabbitMQ is a popular open source message broker. By setting up this integration, you can send RabbitMQ metrics to Wavefront.

1. **RabbitMQ Metrics**: This explains the installation and configuration of Telegraf to send RabbitMQ metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

2. **RabbitMQ on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape RabbitMQ metrics using prometheus plugin.

In addition to setting up the metrics flow, this integration also installs dashboards:
* RabbitMQ Metrics
* RabbitMQ on Kubernetes

Here's the screenshot of RabbitMQ dashboard displaying RabbitMQ metrics scraped using Telegraf plugin:

{% include image.md src="images/rabbitmq_dashboard.png" width="80" %}

To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## RabbitMQ Setup



### Step 1. Install the Telegraf Agent

This integration uses the RabbitMQ input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the RabbitMQ Management Plugin

This integration requires the [RabbitMQ Management Plugin](https://www.rabbitmq.com/management.html) to be enabled on the RabbitMQ server.

To enable the management plugin:{% raw %}
```
sudo rabbitmq-plugins enable rabbitmq_management
```
{% endraw %}

### Step 3. Configure RabbitMQ Input Plugin

Create a file called `rabbitmq.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
 [[inputs.rabbitmq]]
  url = "http://your.rabbitmq.server:15672"
  username = "guest"
  password = "guest"
```
{% endraw %}

Modify the `url`, `username` and `password` properties appropriately.

**Note:** The RabbitMQ Management API is accessed over port `15672` by default. Modify the port in the `url` if different.

To monitor specific nodes, include the `nodes` property. For example:{% raw %}
```
  nodes = ["rabbit@node1", "rabbit@node2"]
```
{% endraw %}
If not specified metrics for all nodes are gathered.

Configure additional `[[inputs.rabbitmq]]` entries to monitor multiple RabbitMQ instances. For additional details on the RabbitMQ configuration, refer [here](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/rabbitmq/README.md).

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



## RabbitMQ on Kubernetes 
**Note:** These instructions are for monitoring RabbitMQ on Kubernetes where the version for RabbitMQ should be 3.9.0 or above.

### Step 1. Enable RabbitMQ Plugins

This integration requires the [RabbitMQ Management Plugin](https://www.rabbitmq.com/management.html), [RabbitMQ Prometheus Plugin](https://www.rabbitmq.com/prometheus.html) and [RabbitMQ Peer Disocvery Plugin](https://www.rabbitmq.com/cluster-formation.html) to be enabled on the RabbitMQ server.

To enable the management plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_management
```
{% endraw %}
To enable the prometheus plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_prometheus
```
{% endraw %}
To enable the peer discovery plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_peer_discovery_k8s
```
{% endraw %}
### Step 2. Update the Wavefront Collector ConfigMap

If you do not have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install). You can check the status of Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster on the `Setup` tab of the Kubernetes integration.

Edit the Wavefront Collector ConfigMap at runtime using the following command:{% raw %}
```
kubectl edit configmap collector-config -n wavefront-collector
```
{% endraw %}
To enable the Wavefront Collector to discover the RabbitMQ instances and dynamically start collecting metrics, under `rabbitmq` add the following snippet:{% raw %}
```
        ## rabbitmq
      - name: rabbitmq
        type: prometheus
        selectors:
          images:
            - 'rabbitmq*'
        port: 15692
        path: /metrics
        scheme: http
        filters:
          metricDenyList:
          - 'rabbitmq.telemetry.*'
```
{% endraw %}



