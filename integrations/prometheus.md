---
title: Prometheus Integration
tags: [integrations list]
permalink: prometheus.html
summary: Learn about the Prometheus Integration.
---
## Prometheus Integration

Prometheus is an open-source monitoring and alerting toolkit. The Wavefront Prometheus integration supports two different use cases:

* The first setup is excellent for monitoring applications by scraping metrics HTTP endpoints. This integration installs and configures Telegraf to collect Prometheus format metrics. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

* The second integration is perfect for integrating with Prometheus servers, preserving your existing service discovery mechanism. This integration uses the Wavefront [Prometheus Storage Adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter) which takes the data being sent to it and forwards it to a Wavefront proxy. Prometheus storage adapters can act as a "fork" and send data to a secondary location. The adapter is useful when you make data collected by Prometheus available in Wavefront.


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Prometheus Setup



The Wavefront Prometheus integration has different use cases.

## Use-Case 1: Monitoring Applications
This use case explains how to monitor applications in fairly static environments where the list of metrics HTTP endpoints doesn't change often. The static integration scrapes the Prometheus HTTP endpoints, converts the data to the Wavefront format, and sends the data into Wavefront.

### Step 1. Install the Telegraf Agent

This integration uses the Prometheus input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure the Prometheus Input Plugin

Create a file called `prometheus.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
# Read metrics from one or many prometheus clients
[[inputs.prometheus]]
  ## An array of urls to scrape metrics from.
  urls = ["http://localhost:9100/metrics"]

  ## Metric version controls the mapping from Prometheus metrics into
  ## Telegraf metrics.  When using the prometheus_client output, use the same
  ## value in both plugins to ensure metrics are round-tripped without
  ## modification.
  ##
  ##   example: metric_version = 1; deprecated in 1.13
  ##            metric_version = 2; recommended version
  metric_version = 2

  ## Use bearer token for authorization. ('bearer_token' takes priority)
  # bearer_token = "/path/to/bearer/token"
  ## OR
  # bearer_token_string = "abc_123"

  ## HTTP Basic Authentication username and password. ('bearer_token' and
  ## 'bearer_token_string' take priority)
  # username = ""
  # password = ""

  ## Specify timeout duration for slower prometheus clients (default is 3s)
  # response_timeout = "3s"

  ## Optional TLS Config
  # tls_ca = /path/to/cafile
  # tls_cert = /path/to/certfile
  # tls_key = /path/to/keyfile
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```
{% endraw %}

Replace the `urls` property with your server address:
{% raw %}
```
urls = ["http://[your_server_address]/metrics"]
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart Telegraf.

## Use-Case 2: Making Data in Prometheus Available in Wavefront

Use the following setup instructions to retain your Prometheus instances and preserve your existing service discovery mechanism. With this approach Prometheus acts as a collector agent, forwarding metrics into Wavefront using the [Prometheus Storage Adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter).

You can configure the storage adapter to either collect metrics from a stand-alone Prometheus server or from a Prometheus server deployed in Kubernetes.

### Stand-Alone Prometheus Server

#### Step 1. Install Wavefront Proxy
If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

#### Step 2. Configure the Prometheus Storage Adapter
Follow the [installation steps](https://github.com/wavefrontHQ/prometheus-storage-adapter#installation) to configure the adapter to collect metrics from Prometheus and forward it to Wavefront.

### Kubernetes based Prometheus Server
To collect metrics from Prometheus running in a Kubernetes cluster, follow these steps:

#### Step 1. Deploy a Wavefront Proxy
The Wavefront proxy can be installed outside of Kubernetes as given above or as a pod within your Kubernetes cluster.

To deploy the Wavefront proxy as a pod:
1. Save the [wavefront.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/wavefront-proxy/wavefront.yaml) to your system.
2. Edit the `wavefront.yaml` file and set `WAVEFRONT_URL` to `https://YOUR_CLUSTER.wavefront.com/api/` and `WAVEFRONT_TOKEN` to `YOUR_API_TOKEN`.
3. Run `kubectl create -f wavefront.yaml` to deploy the proxy.

The `wavefront-proxy` pod and service should now be running on your cluster.

#### Step 2. Deploy the Wavefront Prometheus Storage Adapter
To deploy the Prometheus Storage Adapter:

1. Save the [adapter.yaml](https://raw.githubusercontent.com/wavefrontHQ/prometheus-storage-adapter/master/deploy/kubernetes/adapter.yaml) to your system.
2. Replace the metrics `prefix` in the `adapter.yaml` file.
3. Replace the Wavefront proxy address if you are running it outside of Kubernetes.

Run `kubectl apply -f adapter.yaml`. The `prometheus-storage-adapter` pod and `storage-adapter-service` should now be running on your cluster.

#### Step 3. Integrating with Prometheus
To integrate the storage adapter with Prometheus, add these two lines to the end of the `prometheus.yml` file:{% raw %}
```
remote_write:
  - url: "http://storage-adapter-service.default.svc.cluster.local/receive"
```
{% endraw %}

**NOTE**: In this example, the Wavefront proxy and the Prometheus storage adapter are deployed on the `default` namespace. If they are deployed on a different namespace, make sure to update the namespace.

See the [Integrating Prometheus with Wavefront](https://tanzu.vmware.com/content/blog/prometheus-or-tanzu-observability-by-wavefront-for-kubernetes-an-sre-s-point-of-view-2) blog for more information.



