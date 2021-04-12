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

Data Flow Diagram Here - https://miro.com/app/board/o9J_lMZP5mk=/

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
* The application (App Pod) can filter metrics and decide on the metrics that need to be collected. 
  An example of this is kube-state-metrics. See [kube-state-metrics documentation](https://github.com/kubernetes/kube-state-metrics/blob/master/docs/cli-arguments.md) for configuration options.
  ![Highlights the app pod on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_2.1.png)

* The Wavefront Kubernetes collector allows two levels of filtering internally. 
  1. Filter metrics at the source level. 
  2. Filter all metrics sent from the collector to Wavefront. 
  
  Run ```kubectl get configmap collector-config -n <YOUR_NAMESPACE> -o yaml``` and check both your source configuration and sink configuration for filters. See [Prefix, tags, and filter configurations for the Wavefront Collector](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#prefix-tags-and-filters).
  
  ![Highlights the source and sink the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom-Incomplete_step_2.2.png)

* Filter or rename metrics on the Proxy before sending them to Wavefront. See [Wavefront proxy preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html).
  
  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)

### Step 3: Verify Metric Naming Configuration
* Configure metric prefixes to values that do not match the expected outputs in the collector configuration.
  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_metric_name_step_1.png)
* Rename metrics to different names in the proxy configuration. See [Wavefront proxy preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html).
  ![Highlights arrow from the sinker to the wavefront proxy on the Kubernetes Collector data flow diagram](images/kubernetes_troubleshooting_symptom_step_2.png)


### Step 4: Check If the Collector Restarts Frequently
* Run `kubectl get pods -l app.kubernetes.io/component=collector -n <NAMESPACE>` to verify there are no restarts amongst the Collector pods.
  * If the Collector is showing frequent restarts, check the termination reason by running `kubectl describe pod podname`.
    * Out Of Memory (OOM) errors can show that the Collector has insufficient resources to run. See new section X link on tuning resources.
  * Check the Collector logs for runtime errors by running `kubectl logs podname`.

Likely causes:
1. [Issues with a few isolated Collector instances](l#check-for-collector-instance-issues).
2. [Data collection errors caused by erroneous discovery rules or data sources](#check-for-data-collection-errors).
3. [Issues with leader election or the leader Collector instance](#check-for-leader-election-issues).
4. [Points blocked at the Wavefront Proxy](#check-for-proxy-blocked-points).

### Step 4: Check Collector Health

#### Leader Health
Leader health problems can create odd and inconsistent gaps in almost any metric coming out of a cluster.

##### Step 4.1
The easiest way to check for a leader health problem is to check the Wavefront Collector Metrics dashboard in the Kubernetes integration. On that page, leader problems would be highlighted here:

![Leadership Election in a good state on the Collector Troubleshooting Dashboard](images/kubernetes_leader_ok.png)

If this is red or showing leadership changes, it is likely that the leader is crashing.

The “leader” Wavefront Collector pod is responsible for collecting all metrics that cannot be made specific to a local node as well as for collecting from the node it is on. For example, that would include cluster metrics, service monitoring, and applications configured by explicit rule definitions. If a leader pod crashes due to insufficient resources, another pod should pick up the leader role automatically. That pod would then, of course, face whatever problem the last leader had and could crash itself. That leads to odd and inconsistent gaps in data collection while one pod after another is restarting.

If there are no problems with leadership election, you’ll still want to work through Steps 4.2 and 4.3 to determine if there are any memory or cpu issues affecting collectors other than the leader. 
If the leader is continually crashing, there is most likely a large source overwhelming each leader as they are elected and the issue is ultimately insufficient memory. Jump to 
Step 4.3 for how to dig in.

##### Step 4.2
Checking for symptoms of insufficient CPU

Check the collector restarts graph on the Wavefront Collector Metrics dashboard to find a good timeframe to investigate for collector restarts.

![Collector restarts happening on the Collector Troubleshooting Dashboard](images/kubernetes_restarts.png)

Check the collection latency for the timeframe around the collector restarts on this graph:

![Collector Latency Graph on the Collector Troubleshooting Dashboard](images/kubernetes_latency.png)

Latency should be a much smaller value than the collection intervals you have collected on your metric sources. If the latency is high (seconds to minutes), likely your collectors have insufficient CPU to process the metrics that they are collecting and that is causing them to stack up in memory and will cause an Out Of Memory error (OOM).

To remedy this, the collector either needs higher cpu limits on the collector pods, or to reduce the collection load. See the sections below for details on how to do this (link to below sections)

##### Step 4.3
Checking for symptoms of insufficient memory

* Run `kubectl get pods -l app.kubernetes.io/component=collector -n <NAMESPACE>` to find collector pods that have been restarting.
    * If the collector is showing frequent restarts, check the termination reason by running `kubectl describe pod podname`
        * OOM errors show that the collector has insufficient memory resources to run. 

* If your collector does not show OOM as its termination reason, you can check the logs for other errors by running `kubectl logs podname`

Any memory issues can be resolved through the remedies below. See for more details.

### Remedies

#### Increasing Limits

The easiest thing to do to resolve memory or cpu issues and get things reporting again is to increase the memory and/or cpu limits. To determine the cpu/memory limit to set, you can use a few helpful graphs on the collector troubleshooting dashboard.

##### Determining CPU Limit

If you’re seeing high collector latencies, you should adjust the cpu limits first. When the collector is throttled because of lack of cpu availability, it leads to memory issues as well. The process of increasing cpu is one of trial and error. You’ll need to adjust the limit and then monitor the collector latency graph after the update. Once you see the latencies level out, it's a good indication that you’ve found the right limit.

##### Determining Memory Limit

The “Collector Memory Usage (Top 20)” dashboard can give you an idea of what limits you need but remember that those values are sampled and may not show the peak memory usage. This can found by going to the dashboards for the Kubernetes Integration. Set the time frame to 2-4 days and look for any spikes. You’ll want to start your limit at a little over whatever that max you find is. This will most likely be the elected leader and you should set your limit to 110% of that max.

![Collector Memory Usage Graph on the Collector Troubleshooting Dashboard](images/kubernetes_collector_memory.png)

The method for changing the cpu or memory limits depends on the way the collector was installed. See the method you used below for how to update the limits.

##### Changing in Helm Deploys
For a helm chart, this can be configured as described [here](https://github.com/wavefrontHQ/helm/tree/master/wavefront#parameters)

You can update the limits [in the values.yaml](https://github.com/wavefrontHQ/helm/blob/master/wavefront/values.yaml#L184) for convenience

##### Changing Manual Deploys
In a manual deployment, the container settings need to be updated in the daemonset definition. The existing limits would look something like this:
``` 
resources:
    limits:
      cpu: 1000m
      memory: 1024Mi
```

#### Reduce the Collection Load

Another way to resolve cpu and/or memory issues is to reduce the amount of metrics being collected. You’ll want to reduce load as close to the source as possible. This grants the largest reduction in overall load on the system. Removing a source all together takes much less resources than having to filter downstream at the collector. 

##### Remove sources or filter what they’re sending
A lot of sources scraped by the collector have a way of filtering out metrics built in. Consider removing sources you don’t need, like kube-state metrics, or at least filtering metrics with configuration of those individual sources if possible.

##### Remove Sources using Collector Configuration
If you have any statically defined sources in your configuration file, you can remove them, especially any you think would emit a large amount of metrics. More information on this here: 

##### Disable Auto Discovery
If you’re still seeing too much of a load, you may be scraping pods based on annotations that the collector is finding. These are usually standard for helm charts or widely used containers. You can disable autodiscovery to see if this is the case and consider removing the annotations if you don’t want these scraped in the future.

##### Filter Metrics using Collector Configuration
You can also filter the metrics you’re getting from individual sources. More information on that here. This adds a lot of load to the collector, so this should only be used if the methods above aren’t effective.

### Other Collector Instance Issues

The behavior of individual Collector instances (memory usage etc.) can differ based on how much data they are collecting, whether it's a leader instance etc.

To troubleshoot:
* Check if there are any restarts amongst the relevant Collector pods.
* Run `kubectl describe POD_NAME -n NAMESPACE` to check if there are any OOM issues.

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

Check the source of these metrics to identify the specific Kubernetes node on which the Collector is running. Then check the logs for that Collector instance for further troubleshooting.

#### Check for Leader Election Issues

Because the Wavefront Collector runs as a DaemonSet, leader election is used to select a single instance for collecting data from cluster-level components (non pod related) such as service endpoints, [object states](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#kubernetes-state-source), static sources (not configured via auto discovery), and events.

If you're noticing issues with collecting data from such components:
1. Verify a leader instance exists
2. Verify the leader is not changing or restarting often (could indicate memory issues etc.)

Use these metrics to help troubleshoot issues with leader election:

<table>
<thead>
<tr><th width="40%">Metric</th><th width="60%">Description</th></tr>
</thead>
<tbody>
<tr><td markdown="span">kubernetes.collector.leaderelection.leading</td>
<td>A value of 1 indicates the leader instance. Only a single collector should have this value set to 1 if there are none or anymore than that, it signals an issue with leadership election</td>
</tr>
<tr>
<td markdown="span">kubernetes.collector.leaderelection.error</td>
<td>Counter showing errors encountered in the leader election process. </td></tr>
</tbody>
</table>


#### Check for Proxy Blocked Points

The [Monitoring Wavefront Proxies](monitoring_proxies.html) document explains how to use the Wavefront Usage dashboard to monitor and troubleshoot the Proxy.
