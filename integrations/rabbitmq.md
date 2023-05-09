---
title: RabbitMQ Integration
tags: [integrations list]
permalink: rabbitmq.html
summary: Learn about the RabbitMQ Integration.
---
## RabbitMQ Integration

RabbitMQ is a popular open source message broker. By setting up this integration, you can send RabbitMQ metrics to Operations for Applications.

1. **RabbitMQ Metrics**: This explains the installation and configuration of Telegraf to send RabbitMQ metrics into Operations for Applications. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

2. **RabbitMQ on Kubernetes**: This explains the configuration of Kubernetes Metrics Collector to scrape RabbitMQ metrics using prometheus plugin.

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

**Supported Versions:**
* RabbitMQ 3.9.29 or later.
* Kubernetes Metrics Collector: v1.13.0 or later.

This integration uses the **Kubernetes Metrics Collector** to collect the metrics from RabbitMQ service endpoint and forwards it to Operations for Applications, so that you can monitor your clusters and workloads in Kubernetes.

You can deploy the Kubernetes Metrics Collector by using either the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes) (recommended deployment) or by using the [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or [manual installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install) (deprecated deployment).

If you do not already have the Kubernetes Metrics Collector installed in your Kubernetes cluster, follow the add Kubernetes instructions and add it to your cluster. Then proceed with the steps below, except step `2.2`.

If you already have the Kubernetes Metrics Collector installed by using the deprecated Helm or manual deployment, you can choose to proceed with one of the options below:
  - Uninstall the deprecated Kubernetes Metrics Collector, then install the Observability for Kubernetes Operator and proceed with the steps below, except step `2.2`.
  - Continue using the deprecated Helm or manual deployment. In such a case, proceed with the steps below, except step `2.1`.

### Step 1. Enable RabbitMQ Plugins

This integration requires the [RabbitMQ Management Plugin](https://www.rabbitmq.com/management.html), [RabbitMQ Prometheus Plugin](https://www.rabbitmq.com/prometheus.html) and [RabbitMQ Peer Discovery Plugin](https://www.rabbitmq.com/cluster-formation.html) to be enabled on the RabbitMQ server.

To enable the management plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_management
```
{% endraw %}
To enable the Prometheus plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_prometheus
```
{% endraw %}
To enable the peer discovery plugin:{% raw %}
```
rabbitmq-plugins enable rabbitmq_peer_discovery_k8s
```
{% endraw %}
### Step 2. Update the Collector ConfigMap

* To update the Observability for Kubernetes Operator, follow the steps under [Update the Observability for Kubernetes Operator ConfigMap](#kubernetes-operator).

* To update the Kubernetes Metrics Collector installed using Helm or manual installation, follow the steps under [Update the Kubernetes Metrics Collector ConfigMap](#kubernetes-collector).

##### <a name="kubernetes-operator"></a><br> 2.1 Update the Observability for Kubernetes Operator ConfigMap

Step 1. Download the [existing collector ConfigMap](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/deploy/scenarios/wavefront-collector-existing-configmap.yaml) `.yaml` file, and open it in edit mode.

Step 2. Update `YOUR_CLUSTER_NAME` with the name of your Kubernetes cluster and `YOUR_WAVEFRONT_URL` with the URL of your Operations for Applications instance.

Step 3. Add the following snippet under `plugins`, and save the `.yaml` file:{% raw %}
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

Step 4. Deploy the existing collector ConfigMap `.yaml` file.{% raw %}
```
kubectl apply -f wavefront-collector-existing-configmap.yaml
```
{% endraw %}

##### <a name="kubernetes-collector"></a><br> 2.2 Update the Kubernetes Metrics Collector ConfigMap

Step 1. Edit the Kubernetes Metrics Collector ConfigMap at runtime using the following command:{% raw %}
```
kubectl edit configmap collector-config -n wavefront-collector
```
{% endraw %}

Step 2. Add the following snippet under `plugins`, save and exit to enable the Kubernetes Metrics Collector to discover the RabbitMQ instances and dynamically start collecting metrics:{% raw %}
```
      # rabbitmq
      - name: rabbitmq
        type: prometheus
        selectors:
          images:
            - '*rabbitmq*'
        port: 15692
        path: /metrics
        scheme: http
        filters:
          metricDenyList:
          - 'rabbitmq.telemetry.*'
```
{% endraw %}



