---
title: Kubernetes Troubleshooting
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wf_kubernetes_troubleshooting.html
summary: Get help when you have problems with your Kubernetes setup.
---


Depending on your setup, you typically deploy the following into your Kubernetes cluster:
* **[Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes)** -- runs as a DaemonSet
* **[Wavefront Proxy](proxies.html)** -- runs as a Deployment fronted by a Kubernetes Service

Once deployed, the Collector instances gather data at regular intervals from various sources and send the data to Wavefront via the Proxy.

## Troubleshoot Using the Wavefront Collector Dashboard

The Wavefront Collector emits [internal metrics](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#collector-health-metrics) that you can use to troubleshoot issues.

The Wavefront Collector metrics dashboard in the Kubernetes integration shows these metrics.

![screenshot of Kubernetes metrics](images/kubernetes_monitoring.png)

## Troubleshooting Using the Data Collection Flow

This section helps you troubleshoot issues that you run into when Configuring the Wavefront Kubernetes setup. The diagram shows how the data flows from your Kubernetes environment to Wavefront. 

![Kubernetes Collector Data Flow Diagram](images/kubernetes_collector_troubleshooting_flow_diagram.png)

You run into issues when data doesn't flow from one component to another or due to a configuration issue. The sections below explain how to troubleshoot.

For example, identifying the metrics that come into Wavefront and the metrics that don't go into Wavefront help you know where to look.

Troubleshooting data collection is most easily approached by following the data flow from the source to Tanzu Observability (Wavefront) to find where the flow is broken. Individual processes in the flow can cause problems, or connections between processes can cause problems. Identifying what metrics are and aren’t coming through generally helps identify where to look.

## Symptom: No Data Flowing into Wavefront

### Step 1: Verify that the Collector is Running. 

![Highlights Kubernetes collector on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_1.png)

* Run `kubectl get pods -l k8s-app=wavefront-collector -n <NAMESPACE>` to verify all collector instances are ready and available.
* Pods are marked as not ready:
  * If there are errors with starting pods, run `kubectl describe pod podname`, and check the events section for errors. For details on errors, see [Troubleshoot Applications on Kubernetes documentation](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/).
  * If the collector is running but has frequent restarts, only part of the data goes through. See [Check If the Collector Restarts Frequently](#step-4-check-if-the-collector-restarts-frequently) below.

### Step 2: Verify that the Proxy is Running

![Highlights Wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

* Run `kubectl get deployment wavefront-proxy -n NAMESPACE` to verify the proxy instances are ready and available.
* Run `kubectl get pods -l app=wavefront-proxy -n <NAMESPACE>` to verify there are no pod restarts.
* Run `kubectl logs pod_name` to check the proxy logs for errors connecting to the Wavefront SaaS service.

### Step 3: Verify that the Collector Can Connect to the Proxy

![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_3.png)

* List collector pods with `kubectl get pods -l k8s-app=wavefront-collector -n <NAMESPACE>`.
* Check the collector logs for errors sending points to the proxy with `kubectl logs pod_name`.
* To make sure that the collector can communicate with the proxy:
  * Verify the `proxyAddress` on the Collector sink configuration is correct.
  * Verify the proxy service exposes the correct port (typically 2878).

### Step 4: Verify that the Proxy Can Connect to Wavefront

![Highlights arrow from the wavefront proxy to the wavefront service on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_4.png)

See [Monitor Wavefront Proxies](https://docs.wavefront.com/monitoring_proxies.html) for monitoring and troubleshooting the proxy.

## Symptom: Incomplete Data in Wavefront

### Step 1: Verify Collection Source Configurations

![Highlights the source box on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_1.png)

See the [Wavefront Collector Configurations]( https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md) to verify that the collector is configured correctly.

### Step 2: Verify Filter Configuration

You can filter out data flowing into Wavefront at multiple points:
* In some cases, the application (App Pod) can filter metrics and decide on the metrics are available to collect. 
  A common example of this is kube-state-metrics. See [kube-state-metrics documentation](https://github.com/kubernetes/kube-state-metrics/blob/master/docs/cli-arguments.md) for configuration options.
  ![Highlights the app pod on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_2.1.png)

* The Wavefront Kubernetes collector allows two levels of filtering internally. 
  1. Filter metrics at the source level. 
  2. Filter all metrics sent from the collector to Wavefront. 
  
  Run ```kubectl get configmap collector-config -n <YOUR_NAMESPACE> -o yaml``` and check both your source configuration and sink configuration for filters. See [Prefix, tags, and filter configurations for the Wavefront Collector](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#prefix-tags-and-filters).
  
  ![Highlights the source and sink the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_2.2.png)

* Filter or rename metrics on the Proxy before sending them to Wavefront. See [Wavefront proxy preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html). More information can be found in [Monitoring Wavefront Proxies](monitoring_proxies.html).
  
  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

### Step 3: Verify Metric Naming Configuration
* Check the metrix prefixes on the source and sink configurations. Metric prefixes could be configured to names different than expected.
  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_metric_name_step_1.png)
* Rename metrics to different names in the proxy configuration. See [Wavefront proxy preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html).
  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

### Step 4: Check Collector Health


#### Check for Leader Health Problems 

The **leader Wavefront collector pod** collects the metrics from its node and the metrics that are not specific to the local node. For example, cluster metrics, service monitoring metrics, and metrics from applications configured using explicit rule definitions. If a leader pod crashes due to insufficient resources, another pod picks up the leader role automatically. The new leader pod also faces the same problem and crash, just like the previous leader pod, and this cycle continues. This problem leads to inconsistent gaps in data collection.

Open the Wavefront Collector Metrics dashboard in the Kubernetes integration. In the Troubleshooting section, if you see the Leader Election in red or the chart has spikes with the number of times the leadership changed, there are leader health problems.

Example: The screenshot below shows that there are no leader health problems

![Leadership Election in a good state on the Collector Troubleshooting Dashboard](images/kubernetes_leader_ok.png)

{{site.data.alerts.tip}}
  <ul>
    <li>
      If the leader has no health problem, check the memory or CPU issues affecting the other collector pods.
    </li>
    <li>
      If the leader is continually crashing, this can be due to insufficient memory. See the section on Check for Insufficient Memory Symptoms.
    </li>
  </ul>
{{site.data.alerts.end}}
    

#### Check for Insufficient CPU Symptoms

Follow these steps:

1. Open the Wavefront Collector Metrics dashboard in the Kubernetes integration. In the Troubleshooting section, see the Collector Restarts chart. If the chart is in red, or if there are spikes on the chart, there are memory or CPU issues.
  See [Fine-Tune the Time Window](ui_examine_data.html#fine-tune-the-time-window) to customize the time window on the chart.

    Example: The screenshot below shows that there are collector restarts.
    ![Collector restarts happening on the Collector Troubleshooting Dashboard](images/kubernetes_restarts.png)

2. In the Wavefront Collector Metrics dashboard's Data Collection section, check the Collection Latency chart. If you customized the time window for the above steps, make sure the same time window is selected for this chart too.

    ![Collector Latency Graph on the collector Troubleshooting Dashboard](images/kubernetes_latency.png) 
    
    {{site.data.alerts.tip}}
      <ul>
        <li>
          Latency should be less than the collection intervals you configure. The <code>defaultCollectionInterval</code> is set to 60 seconds. You configure it on the <a href="https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration-file"><code>configration.md</code></a> file.
        </li>
        <li>
          If the latency is high, the collector has insufficient CPU to process the metrics, and the collectors stack up in memory and cause an Out Of Memory error (OOM).
        </li>
        <li>
          To solve this, the collector needs higher CPU limits on the collector pods, or you need to reduce the collection load. See the remedies section.
        </li>
      </ul>
    {{site.data.alerts.end}}

#### Check for Insufficient Memory Symptoms

Follow these steps:

* Run `kubectl get pods -l app.kubernetes.io/component=collector -n <NAMESPACE>` to find collector pods that have been restarting.
    * If the collector is showing frequent restarts, check the termination reason by running `kubectl describe pod podname`
        * OOM errors show that the collector has insufficient memory resources to run. 

* If your collector does not show OOM as its termination reason, you can check the logs for other errors by running `kubectl logs podname`

To solve this, See the remedies section.

#### Remedies

* **Increase CPU or memory limits**: 
  The easiest way to resolve memory or CPU issues is to increase the memory and CPU limits. To determine the CPU or memory limit, see the charts in the Wavefront Collector Metrics dashboard's Troubleshooting section.

* **Determine CPU limit**: 
  If you’re seeing high collector latencies, you need to adjust the CPU limit. When the collector is throttled due to lack of CPU availability, it leads to memory issues too. 
  The process of increasing CPU is trial and error. You need to adjust the limit and monitor the collector latency graph after the update. If the latencies level out, you have found the correct CPU limit.

* **Determine memory limit** <br/> 
  Follow these steps:
  1. Open the Wavefront Collector Metrics dashboard, and see Collector Memory Usage (Top 20) chart on the Troubleshooting section. This chart giveS you an idea of the limits you need.
      {% include note.html content="The limit values on the chart are sampled and do not show the peak memory usage." %}
  2. Customize the time frame on the chart to 2-4 days using the (-) icon on the chart and look for any spikes. The spikes are most likely created by the elected leader.
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

* **Reduce the Collection Load**: 
  Reduce the number of metrics that are collected and reduce the collector CPU and memory load as close to the source as possible. It grants the largest reduction in overall load on the system. Fewer resources are required to remove a source than to filter downstream at the collector. 

    * **Configure the Wavefront Collector to remove sources**:
  If you have statically defined sources, comment out or remove sources that emit a large number of metrics from the `sources` list in the collector [configuration.md](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration-file) file.
  {% include important.html content="Do not remove `kubernetes_source` under the `sources` list." %}

    * **Filter metrics from sources**: 
  Sources scraped by the collector have a way of filtering out metrics. You can remove sources you don’t need, like kube-state metrics, or configure the Wavefront collector using the [configuration.md](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#configuration) file to filter metrics of the sources you don't need.

    * **Disable Auto-Discovery**:
  If the load is still high, you may be scraping pods based on annotations that the collector finds, which is standard for helm charts or widely used containers. Disable autodiscovery and see if the load reduces. If this works and you don't want the pods to be scrapped in the future, remove the annotations.

    * **Filter Metrics using Wavefront Collector sink configuration**: 
  You can filter the metrics that come from individual sources. See [Filtering](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/filtering.md).
    {% include note.html content="This option adds a lot of load to the collector, so use it only if the above methods are not effective." %}

### Other Collector Instance Issues

#### Check for Data Collection Errors

Use these metrics to help troubleshoot issues with data collection:

<table>
<thead>
<tr><th width="40%">Metric</th><th width="60%">Description</th></tr>
</thead>
<tbody>
<tr><td markdown="span">kubernetes.collector.target.collect.errors</td>
<td>Counter showing the number of errors collecting data from a target pod or service etc.</td></tr>
<tr>
<td markdown="span">kubernetes.collector.source.collect.errors</td>
<td>Counter showing the number of errors per plugin type (prometheus, telegraf etc.) </td></tr>
<tr>
<td markdown="span">kubernetes.collector.target.points.collected</td>
<td>Counter showing the number of points collected from a single target (pod, service etc.) as a per-second rate </td></tr>
</tbody>
</table>

Check the source of these metrics to identify the specific Kubernetes node on which the collector is running. Then check the logs for that collector instance for further troubleshooting.
