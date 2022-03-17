---
title: Kubernetes Troubleshooting
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wf_kubernetes_troubleshooting.html
summary: Get help when you have problems with your Kubernetes setup.
---


Depending on your setup, you typically deploy the following components into your Kubernetes cluster:
* **[Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes)** -- runs as a DaemonSet
* **[Wavefront Proxy](proxies.html)** -- runs as a deployment fronted by a Kubernetes Service

Once deployed, the collector instances gather data at regular intervals from various sources and send the data to Tanzu Observability by Wavefront via the Wavefront proxy.

## Known Issues

This section focuses on known issues that cannot be fixed, for example, because of an issue with Kubernetes itself. Other issues are usually addressed by the team quickly and are not listed here.

### Pod in terminating state with flapping metrics

**Problem:** Sometimes Kubernetes leaves pods in a terminating state indefinitely. If that happens, the reported metrics for the pod might oscillate (flap) between their actual values and zero.

**Cause:** The oscillation occurs at the kubelet summary API. The root cause is currently unknown.

**Solution:** Forcibly delete the pod that is stuck in the terminating state.


## Troubleshoot Using the Wavefront Collector Dashboard

The Wavefront Collector emits [internal metrics](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#collector-health-metrics) that you can use to troubleshoot issues.

The Wavefront Collector metrics dashboard in the Kubernetes integration shows these metrics.

![screenshot of Kubernetes metrics](images/kubernetes_monitoring.png)

## Troubleshooting Using the Data Collection Flow

In Kubernetes, a Node can be considered a virtual machine, and can have several applications and services running on it. These applications and services are referred to as Pods. The Wavefront Collector deploys itself on each Node to collect metrics from the Pods.

All the Pods the Wavefront Collector collects metrics from are considered a Source.

Next, the Source sends metrics to the Wavefront Sink and then to the Wavefront Service through the Wavefront proxy.

Since the Wavefront Collector runs on each Node, metrics common to the Kubernetes environment or cluster can be repeated, such as the cluster metrics, which are reported multiple times. To avoid the same metric being reported several times, one Wavefront collector is elected as the leader to perform tasks that only need to be done once.

The following diagram shows how the data flows from your Kubernetes environment to Tanzu Observability.

![Kubernetes Collector Data Flow Diagram](images/kubernetes_collector_troubleshooting_flow_diagram.png)


You run into issues when data doesn't flow from one component to another or when there are configuration issues.

For example, identifying the metrics that come into Tanzu Observability and the metrics that don't go into Tanzu Observability help you know where to look.

To troubleshoot data collection, follow the data flow from the source to Tanzu Observability to find where the flow is broken.
* Individual processes in the flow can cause problems.
* Connections between processes can cause problems.

Identifying what metrics are and aren’t coming through can help identify where to look.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Symptom: No Data Flowing into Tanzu Observability

### Step 1: Verify that the Collector is Running.

![Highlights Wavefront Collector on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_1.png)

* Run `kubectl get pods -l k8s-app=wavefront-collector -n <NAMESPACE>` to verify all collector instances are ready and available.
* Pods are marked as not ready:
  * If there are errors with starting pods, run `kubectl describe pod pod_name`, and check the events section for errors. For details on errors, see [Troubleshoot Applications on Kubernetes documentation](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/).
  * If the collector is running but has frequent restarts, only part of the data goes through. See [Check If the Collector Restarts Frequently](#step-4-check-if-the-collector-restarts-frequently) below.

  <table style="width: 100%;">
  <tbody>
  <tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
  </tbody>
  </table>

### Step 2: Verify that the Proxy is Running

![Highlights Wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

* Run `kubectl get deployment wavefront-proxy -n NAMESPACE` to verify the proxy instances are ready and available.
* Run `kubectl get pods -l app=wavefront-proxy -n <NAMESPACE>` to verify there are no pod restarts.
* Run `kubectl logs pod_name` to check the proxy logs for errors connecting to the Wavefront service.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Step 3: Verify that the Collector Can Connect to the Proxy

![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_3.png)

* List collector pods with `kubectl get pods -l k8s-app=wavefront-collector -n <NAMESPACE>`.
* Check the collector logs for errors sending points to the proxy with `kubectl logs pod_name`.
* To make sure that the collector can communicate with the proxy:
  * Verify that the `proxyAddress` on the [collector sink configuration on the configuration.md file](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#wavefront-sink) is correct.
  * Verify that the proxy service exposes the correct port (typically 2878).

  <table style="width: 100%;">
  <tbody>
  <tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
  </tbody>
  </table>

### Step 4: Verify that the Proxy Can Connect to the Wavefront Service

![Highlights arrow from the Wavefront proxy to the Wavefront service on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_4.png)

See [Monitor Wavefront Proxies](https://docs.wavefront.com/monitoring_proxies.html) for monitoring and troubleshooting the proxy.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Symptom: Incomplete Data in Tanzu Observability

### Step 1: Verify Collection Source Configurations

![Highlights the source box on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_1.png)

See the [Wavefront Collector Configurations](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md) to verify that the collector is configured correctly.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Step 2: Verify Filter Configuration

You can filter out data flowing into Tanzu Observability at multiple points:
* In some cases, the application (App Pod) can filter metrics and decide on the metrics are available to collect.
  A common example of this is kube-state-metrics. See [kube-state-metrics documentation](https://github.com/kubernetes/kube-state-metrics/blob/master/docs/cli-arguments.md) for configuration options.
  ![Highlights the app pod on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_2.1.png)

* The Wavefront Collector for Kubernetes allows two levels of filtering internally, shown in the picture below.
  1. Filter metrics at the source level.
  2. Filter all metrics sent from the collector to Tanzu Observability.

  Run ```kubectl get configmap collector-config -n <YOUR_NAMESPACE> -o yaml``` and check both your source configuration and sink configuration for filters. See [Prefix, tags, and filter configurations for the Wavefront Collector](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#prefix-tags-and-filters).

  ![Highlights the source and sink the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_2.2.png)

* Filter or rename metrics at the Proxy before sending them. See [Wavefront proxy preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html). More information can be found in [Monitoring Wavefront Proxies](monitoring_proxies.html).

  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Step 3: Verify Metric Naming Configuration

* Check the metric prefixes on the source and sink configurations. You can update the metric prefixes in the [configuration.md](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#common-properties) file.

  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_metric_name_step_1.png)

* Rename metrics to different names in the proxy configuration. See [Wavefront proxy preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html).

  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Step 4: Check Collector Health


#### Check for Leader Health Problems

The **leader Wavefront Collector pod** collects the metrics from its node and the metrics that are not specific to the local node. Example: cluster metrics, service monitoring metrics, and metrics from applications that use explicit rule definitions.

If a leader pod crashes due to insufficient resources, another pod picks up the leader role automatically. If the new leader pod also faces the same problem and crashes as well, just like the previous leader pod, the cycle continues. This problem leads to inconsistencies in data collection.

To check for leader health problems:

1.	Open the Wavefront Collector Metrics dashboard in the Kubernetes integration.
2.	In the Troubleshooting section, check if the Leader Election is red or if the chart has spikes with the number of times the leadership changed,

If you see these symptoms, then there are leader health problems.

The following screenshot shows that there are no leader health problems.

![Leadership Election in a good state on the Collector Troubleshooting Dashboard](images/kubernetes_leader_ok.png)

{{site.data.alerts.tip}}
  <ul>
    <li>
      If the leader has no health problem, check the memory or CPU issues affecting the other collector pods.
    </li>
    <li>
      If the leader is continually crashing, insufficient memory might be the cause. See the section on <a href="#check-for-insufficient-memory-symptoms">Check for Insufficient Memory Symptoms</a>.
    </li>
    <li>
      See the <a href="#remedies-for-cpu-or-memory-problems">Remedies for CPU or Memory Problems</a>.
    </li>
  </ul>
{{site.data.alerts.end}}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

#### Check for Insufficient CPU Symptoms

To check for Insufficient CPU, follow these steps:

1. Open the Wavefront Collector Metrics dashboard in the Kubernetes integration.

1. In the Troubleshooting section, see the Collector Restarts chart.
    If the chart is in red, or if there are spikes on the chart, there are memory or CPU issues.
    See [Fine-Tune the Time Window](ui_examine_data.html#fine-tune-the-time-window) to customize the time window on the chart.

    The following screenshot shows that there are collector restarts.
    ![Collector restarts happening on the Collector Troubleshooting Dashboard](images/kubernetes_restarts.png)

1. In the Wavefront Collector Metrics dashboard's Data Collection section, check the Collection Latency chart. If you customized the time window for the above steps, use the same time window is selected for this chart.

    ![Collector Latency Graph on the collector Troubleshooting Dashboard](images/kubernetes_latency.png)

    {{site.data.alerts.tip}}
      <p>
          Latency should be less than the collection intervals you configure. The <code>defaultCollectionInterval</code> is set to 60 seconds. You configure it on the <a href="https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration-file"><code>configration.md</code></a> file.
      </p>
      <p>
          If the latency is high, the collector might have insufficient CPU to process the metrics, and the collectors stack up in memory and cause an Out Of Memory (OOM) error.
          To solve this, the collector needs higher CPU limits on the collector pods, or you need to reduce the collection load. See the <a href="#remedies-for-cpu-or-memory-problems">Remedies for CPU or Memory Problems</a>.
      </p>
    {{site.data.alerts.end}}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

#### Check for Insufficient Memory Symptoms

To check for insufficient memory, follow these steps:

* Run `kubectl get pods -l app.kubernetes.io/component=collector -n <NAMESPACE>` to find collector pods that have been restarting.
    * If the collector is showing frequent restarts, check the termination reason by running `kubectl describe pod pod_name`
    * OOM errors show that the collector has insufficient memory resources to run.

* If your collector does not show OOM as its termination reason, check the logs for other errors by running `kubectl logs pod_name`

To solve this, See the remedies section.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

#### Remedies for CPU or Memory Problems

* **Increase CPU or memory limits**:
  The easiest way to resolve memory or CPU issues is to increase the memory and CPU limits. To determine the CPU or memory limit, see the charts in the Wavefront Collector Metrics dashboard's Troubleshooting section.

* **Determine CPU limit**:
  If you see high collector latencies, you need to adjust the CPU limit. When the collector is throttled due to lack of CPU availability, it leads to memory issues too.
  The process of increasing CPU is trial and error. Adjust the limit and monitor the collector latency graph after the update. If the latencies level out, you have found the correct CPU limit.

* **Determine memory limit by following these steps**:
  1. Open the Wavefront Collector Metrics dashboard and see Collector Memory Usage (Top 20) chart on the Troubleshooting section. This chart gives you an idea of the limits you need.
      {% include note.html content="The limit values on the chart are sampled and do not show the peak memory usage." %}
  2. Customize the time frame on the chart to 2-4 days using the (-) icon on the chart and look for spikes. The spikes are most likely created by the elected leader.
  3. Start to set the limit 10% over the max value you find and monitor the changes. For example, based on the screenshot below, the max value is 43.5 Mi. Therefore, you can start to set your limit at 47.85 Mi (43.5 x 1.10) and monitor the progress.

    ![Collector Memory Usage Graph on the Collector Troubleshooting Dashboard](images/kubernetes_collector_memory.png)

* **Change the CPU or memory limit based on how the Wavefront Collector is installed**:
  * Helm Deployments
    * Option 1: For details on updating the CPU and memory limit on helm charts, see [Parameters](https://github.com/wavefrontHQ/helm/tree/master/wavefront#parameters).
    * Option 2: Update the `cpu` and `memory` limits in the [values.yaml](https://github.com/wavefrontHQ/helm/blob/master/wavefront/values.yaml#L184) file.

  * Manual Deployments <br/>
    Update the container settings in the `daemonset` definition. The default limits are:
    ```
    resources:
        limits:
          cpu: 1000m
          memory: 1024Mi
    ```

* **Reduce the collection load**:
  Reduce the number of metrics that are collected and reduce the collector CPU and memory load limit from the start. For example, reduce the load at the application pod or source level. It grants the largest reduction in overall load on the system. Fewer resources are required to remove a source than to filter downstream at the collector.

  * **Filter metrics**:

    * **Configure the Wavefront Collector to remove sources**:
      If you have statically defined sources, comment out or remove sources that emit a large number of metrics from the `sources` list in the collector [configuration.md](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration-file) file. This method removes metrics that are minimally processed, reducing the CPU and memory load on the collector.
      {% include important.html content="Do not remove `kubernetes_source` from the `sources` list." %}

    * **Filter metrics at the source**: Sources scraped by the collector have a way of filtering out metrics. You can filter the metrics on the source or from the Wavefront collector:
      * Some applications let you configure the metrics they produce. If your application can do that, you can reduce the metrics collected before the metrics are sent to the collector.
        {% include note.html content = "Only some sources let you filter metrics. Example: kube-state metrics" %}
      * Change the [Wavefront Collector source configuration](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration) to filter out metrics you don’t need. Note:
        {% include note.html content = "Filtering metrics in the source configuration, reduces the collector load. Filtering metrics in the sink configuration will not reduce the collector load." %}

  * **Disable Auto-Discovery**:
    If the load is still high, you might be scraping pods based on annotations that the collector finds, which is standard for helm charts or widely used containers. Disable autodiscovery and see if the load reduces. If this works and you don't want the pods to be scrapped in the future, remove the annotations.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Step 5: Check for Data Collection Errors

Use these metrics to help troubleshoot issues with data collection:

<table>
<thead>
<tr><th width="40%">Metric</th><th width="60%">Description</th></tr>
</thead>
<tbody>
<tr><td markdown="span">kubernetes.collector.target.collect.errors</td>
<td>Counter showing the number of errors collecting data from a target pod or service etc. <br/>You can see this data on the Collection Errors Per Endpoint chart under the Troubleshooting section of the Kubernetes Collector Metrics Dashboard.</td></tr>
<tr>
<td markdown="span">kubernetes.collector.source.collect.errors</td>
<td>Counter showing the number of errors per plugin type (prometheus, telegraf etc.) <br/>You can see this data on the Collection Errors Per Type chart under the Troubleshooting section of the Kubernetes Collector Metrics Dashboard.</td></tr>
<tr>
<td markdown="span">kubernetes.collector.target.points.collected</td>
<td>Counter showing the number of points collected from a single target (pod, service etc.) as a per-second rate. <br/>You can see this data on the Points Collected Per Target (Top 20) chart under the Data Collection section of the Kubernetes Collector Metrics Dashboard.</td></tr>
</tbody>
</table>

Check the source of these metrics to identify the specific Kubernetes node on which the collector is running. Then check the logs for that collector instance for further troubleshooting.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Symptom: Missing Metrics from a Single Source

### Step 1: Verify That Metric Data Is Sent to Tanzu Observability

1. Click **Browse > Metrics** to navigate to the metrics screen.
2. Look for your metric data.
   * If your metric data is listed on the Metrics page, investigate the chart or query that you use to monitor your data.
   * If your metric data is missing, the issue is somewhere else.

### Step 2: Check for a Missing Metric Collection Target

1. Open the Wavefront Collector Metrics dashboard in the Kubernetes integration.
2. Find the Data Collection section, go to the **Points Collected Per Type** graph and check whether your source is sending metrics.

   * If your source is not in the top 20, modify the query to remove the top 20 limit or limit your particular missing pod.
   * If your source is missing, the Wavefront Collector cannot collect data from your application. The source might not be running, or your configuration might be incorrect. Check for configuration problems.

   ![Example of the Points Collected Per Type graph](images/k8s-top-twenty.png)

3. Check the Wavefront Collector logs for indications of what can be wrong. For example, you may have a configuration problem.

   Run `kubectl logs daemonset/wavefront-collector -n wavefront` to check the collector logs for errors in parsing the configuration and to see whether the source got scraped.

   If something such as the below line is missing for the source that you’re debugging, the configuration for that source might be incorrect.

   ```
   time="2021-04-27T14:28:04Z" level=info msg="Finished querying source" latency=42.6569ms name="prometheus_source: http://10.244.0.5:8443/metrics" total_metrics=2938
   ```

4. Look through the [configuration file](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration-file) and for each source verify that:
  * The formatting is correct.
  * There are no errors in the endpoints, ports, or other configuration information.

### Step 3: Check for Metric Filtering

1. Open the Troubleshooting dashboard.
2. Locate the Points Filtered Per Type graph and see whether your source is sending metrics.
   Look for filtering of the source that you’re missing. If your source is sending metrics, your metric can be filtered out. For example, if the source you're missing is a prometheus endpoint, look whether any points of type `prometheus` are listed:

   ![Example of the Points Filtered Per Type graph](images/k8s_points_filter_per_type.png)

3. Look at the filtering in your [configuration file](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration-file) and for each source verify that:
  * The configuration for your metric source is correct.
  * The configuration for your Wavefront sink is correct.

### Step 4: Verify That the Metric Source Is Working

1. Run `kubectl logs` to check the logs of the container that you're trying to scrape.
2. Try running `kubectl restart` to restart the pod you're trying to scrape.
3. Use a cloud provider console to run a `curl` command in the container and see if you get a good result back.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="wf_kubernetes_troubleshooting.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Symptom: Kubernetes Dashboards Do Not Show Any Data

  ![Kubernetes Dashboards tab](images/k8s-dashboards.png)

The most common cause for the Kubernetes dashboards to not show any data is a problem with sending data to Tanzu Observability. See [Symptom: No Data Flowing into Tanzu Observability](#symptom-no-data-flowing-into-tanzu-observability).

Another reason for missing data can be a change in the prefix of the Kubernetes sources in the Wavefront Collector for Kubernetes. By default, the dashboards rely on a prefix, such as `kubernetes.`, in the configured collector sources. For more information, see the [sources section of the collector configuration file](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/395df1b533b01b43961641b1a03134481cf89609/deploy/kubernetes/4-collector-config.yaml#L52).

If you want to use the Kubernetes dashboards with a custom prefix, [clone the dashboards](ui_dashboards.html#edit-or-clone-a-dashboard) and update the prefix in all of the charts.
