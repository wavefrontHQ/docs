---
title: Fluentd Integration
tags: [integrations list]
permalink: fluentd.html
summary: Learn about the Fluentd Integration.
---
## Fluentd Integration

Fluentd is an open source data collector for a unified logging layer. By setting up this integration, you can send Fluentd metrics into Tanzu Observability by Wavefront.

1. **Fluentd**: This integration installs and configures Telegraf to send Fluentd metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).
2. **Fluentd on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape Fluentd metrics using auto-discovery and annotation based discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
* Fluentd
* Fluentd on Kubernetes

Here's a section of a dashboard displaying Fluentd metrics:
{% include image.md src="images/fluentd_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Fluentd Setup



Use the instructions on this page for monitoring:
  * Fluentd - Standalone
  * Fluentd on Kubernetes

## Fluentd

  This integration uses the Fluentd input plugin for Telegraf to get the metrics from Fluentd. If you've already installed Telegraf on your servers, you can skip to Step 2.

**NOTE**: Make sure that Telegraf is of version `1.23.0` or later.
  



### Step 1: Install the Telegraf Agent

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Ensure the monitor_agent plugin is configured on Fluentd

  In the Fluentd configuration file `/etc/td-agent/td-agent.conf`, ensure that the monitor_agent plugin is configured as in the example below:
{% raw %}
  ```
  <source>
    @type monitor_agent
    bind 0.0.0.0
    port 24220
  </source>
  ```
{% endraw %}

### Step 3: Configure the Fluentd Input Plugin on Telegraf

  Create a `fluentd.conf` file in `/etc/telegraf/telegraf.d` and enter the Fluentd plugin configuration as in the following example snippet:
{% raw %}
   ```
# Read metrics exposed by fluentd monitor_agent plugin
[[inputs.fluentd]]
  ## This plugin reads information exposed by fluentd (using /api/plugins.json endpoint).
  ##
  ## Endpoint:
  ## - only one URI is allowed
  ## - https is not supported
  endpoint = "http://example.com:24220/api/plugins.json"

  ## Define which plugins have to be excluded (based on "type" field - e.g. monitor_agent)
  exclude = [
          "monitor_agent",
          "dummy"
  ]
   ```
{% endraw %}
### Step 4: Restart Telegraf

  Run `sudo service telegraf restart` to restart your Telegraf agent.

## Fluentd on Kubernetes

This integration supports Fluentd deployment as daemonset using standard fluentd-docker images with Prometheus plugin configuration as mentioned below.



1. Make sure that Fluentd is deployed on your Kubernetes cluster. If not deployed already, you can deploy it by using the sample `.yaml` files as explained below.

2. Add the following match clause in the existing `fluent.conf` file by using ConfigMaps and save the file. You can find the `fluent.conf` file under `/fluentd/etc/`.
{% raw %}
```
<match **>
  @type stdout
  @id out_prometheus
  <buffer>
    flush_thread_count 8
    flush_interval 5s
    chunk_limit_size 2M
    queue_limit_length 32
    retry_max_interval 30
    retry_forever true
  </buffer>
</match>
```
{% endraw %}

You can override another configuration file using the same ConfigMap, if needed. See the sample [fluentd-config-map.yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/fluentd/fluentd-config-map.yaml) file. 

3. Mount the same `.conf` files present in the `/fluentd/etc/` directory by using volume mount in your Fluentd deployment `.yaml`.
 For more information, see the sample [fluentd-daemonset.yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/fluentd/fluentd-daemonset.yaml) file.

4. Annotate the Fluentd daemonset to add Prometheus `scrape`, `scheme`, `port`, and `path`.

{% raw %}
```
kubectl annotate pod <FLUENTD_POD_NAME> prometheus.io/scrape=true prometheus.io/scheme=http prometheus.io/port=24231 prometheus.io/path=/metrics
```
{% endraw %}

For more information, see the following sample `.yaml` files:
   * [fluentd-config-map.yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/fluentd/fluentd-config-map.yaml)
   * [fluentd-rbac.yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/fluentd/fluentd-rbac.yaml)
   * [fluentd-daemonset.yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/fluentd/fluentd-daemonset.yaml)


### Configure the Wavefront Collector for Kubernetes

You can configure the Wavefront Collector for Kubernetes to scrape Fluentd metrics exposed to Prometheus by using annotation based discovery. To collect the Fluentd metrics automatically, configure the Wavefront Collector for Kubernetes to use auto-discovery.

If you do not have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow the instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install). You can check the status of Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster on the `Setup` tab of the Kubernetes integration.

**NOTE**: Make sure that auto discovery `enableDiscovery: true` and annotation based discovery `discovery.disable_annotation_discovery: false` are enabled in the Wavefront Collector. They should be enabled by default.






## Fluentd
  

|Metric Name|Description|
| :--- | :--- |
|fluentd.retry.count |The number of retry attempts.|
|fluentd.buffer.queue.length|The length of the buffer queue.|
|fluentd.buffer.total.queued.size|The size of the buffer queue.|
|fluentd.emit.records|The number of emit records.|
|fluentd.emit.count|The total number of emit call.|
|fluentd.emit.size|The total size of emit events.|
|fluentd.write.count|The total number of write/try_write call.|
|fluentd.rollback.count|The total number of rollback. Rollback happens when write/try_write failed.|
|fluentd.slow.flush.count|The total number of slow flush. This count will be incremented when buffer flush is longer than slow_flush_log_threshold.|
|fluentd.flush.time.count|The total time of buffer flush in milliseconds.|
|fluentd.buffer.stage.length|The length of staged buffer chunks.|
|fluentd.buffer.stage.byte.size|The current bytesize of staged buffer chunks.|
|fluentd.buffer.queue.byte.size|The current bytesize of queued buffer chunks.|
|fluentd.buffer.available.buffer.space.ratios|Show available space for buffer.|

## Fluentd on Kubernetes
  

|Metric Name|Description|
| :--- | :--- |
|fluentd.output.status.retry.count.gauge|The number of retry attempts.|
|fluentd.output.status.buffer.queue.length.gauge|The length of the buffer queue.|
|fluentd.output.status.buffer.total.bytes.gauge|The size of the buffer queue.|
|fluentd.output.status.emit.records.gauge|The number of emit records.|
|fluentd.output.status.emit.count.gauge|The total number of emit call.|
|fluentd.output.status.write.count|The total number of write/try_write call.|
|fluentd.output.status.rollback.count.gauge|The total number of rollback. Rollback happens when write/try_write failed.|
|fluentd.output.status.retry.wait.gauge|If write out fails, Fluentd will retry after waiting for retry_wait seconds|
|fluentd.output.status.slow.flush.count.gauge|The total number of slow flush. This count will be incremented when buffer flush is longer than slow_flush_log_threshold.|
|fluentd.output.status.flush.time.count.gauge|The total time of buffer flush in milliseconds.|
|fluentd.output.status.buffer.stage.length.gauge|The length of staged buffer chunks.|
|fluentd.output.status.buffer.stage.byte.size.gauge|The current bytesize of staged buffer chunks.|
|fluentd.output.status.queue.bytesize.gauge|The current bytesize of queued buffer chunks.|
|fluentd.output.status.buffer.available.space.ratio.gauge|Show available space for buffer.|
