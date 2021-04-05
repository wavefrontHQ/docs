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


This section explains how to further troubleshoot issues with your Kubernetes integration based on the symptoms you see.

Troubleshooting data collection is most easily approached by following the data flow from the source to Tanzu Observability (Wavefront) to find where the flow is broken. Individual processes in the flow can cause problems, or connections between processes can cause problems. Identifying what metrics are and aren’t coming through generally helps identify where to look.

![Kubernetes Collector Data Flow Diagram](images/kubernetes_collector_dfd.png)

## Symptom: No Data Flowing into Wavefront

### Step 1: Verify that the collector is running. (node g)
* Run `kubectl get pods -l k8s-app=wavefront-collector -n <NAMESPACE>` to verify all collector instances are ready and available.
* If any pods show as not ready, investigate the cause with:
  * To check kubernetes for errors starting the pods, run `kubectl describe pod podname` and check the events section for errors. Common errors include:
    * Some general kubernetes error states are described here: https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application/
  * If the collector is running but has frequent restarts, that usually lets some data through, see below in section X

### Step 2: Verify that the proxy is running (node i)
* Run `kubectl get deployment wavefront-proxy -n NAMESPACE` to verify the proxy instances are ready and available.
* Run `kubectl get pods -l app=wavefront-proxy -n <NAMESPACE>` to verify there are no pod restarts etc.
* Run `kubectl logs pod_name` to check the proxy logs for errors connecting to the Wavefront SaaS service.

### Step 3: Verify that the collector can connect to the proxy (line h)
* List collector pods with `kubectl get pods -l k8s-app=wavefront-collector -n <NAMESPACE>`
* Check the collector logs for errors sending points to the proxy with `kubectl logs pod_name`
* To make sure that the collector can communicate with the proxy:
  * Verify the `proxyAddress` on the Collector sink configuration is correct.
  * Verify the proxy service exposes the correct ports (typically 2878).

### Step 4: Verify that the proxy can connect to Wavefront (line j)
* Refer to this [documentation](https://docs.wavefront.com/monitoring_proxies.html) for monitoring and troubleshooting the proxy.

## Symptom: Data in Wavefront is Incomplete

### Step 1: Verify the Collection Source is configured correctly (box e)

### Step 2: Verify Filter Configuration

Data flowing into wavefront can be filtered out at multiple points:
* The monitored application can, in some cases, filter what metrics it makes available to collect. (box a) The primary example of this is kube state metrics. See here for configuration options at https://github.com/kubernetes/kube-state-metrics/blob/master/docs/cli-arguments.md
* The Kubernetes collector allows two levels of filtering internally. The first is filtering metrics out at a per source level (box e). The second level is filtering on all metrics sent from the collector out to wavefront (box f). Run ```kubectl get configmap collector-config -n <YOUR_NAMESPACE> -o yaml``` and check both your source configuration and sink configuration for filters. Filters are configured as described at https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/configuration.md#prefix-tags-and-filters
* The Wavefront Proxy also allows filtering and/or renaming of metrics before they are sent to wavefront. (box i) Proxy filter configuration is described here: https://docs.wavefront.com/proxies_preprocessor_rules.html

### Step 3: Verify Metric Naming Configuration
* Metric prefixes can be configured to values that do not match the expected outputs in the collector config (boxes e&f)
* Metrics can be renamed to different names in the proxy configuration. (box i)


### Step 4: check and see if the collector is restarting frequently
* Run `kubectl get pods -l app.kubernetes.io/component=collector -n <NAMESPACE>` to verify there are no restarts amongst the Collector pods.
  * If the collector is showing frequent restarts, check the termination reason by running `kubectl describe pod podname`
    * OOM errors can show that the collector has insufficient resources to run. See new section X link on tuning resources.
  * check the collector logs for runtime errors by running `kubectl logs podname`

Likely causes:
1. Issues with a few isolated Collector instances
2. Data collection errors caused by erroneous discovery rules or data sources
3. Issues with leader election or the leader Collector instance
4. Points being blocked at the Wavefront Proxy

### Collector Instance Issues

The behavior of individual Collector instances (memory usage etc.) can differ based on how much data they are collecting, whether it's a leader instance etc.

To troubleshoot:
* Check if there are any restarts amongst the relevant Collector pods.
* Run `kubectl describe POD_NAME -n NAMESPACE` to check if there are any OOM's etc.

### Data Collection Errors

Use these metrics to help troubleshoot issues with data collection:

<table>
<tbody>
<thead>
<tr><th width="40%">Metric</th><th width="60%">Description</th></tr>
</thead>
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

### Leader Election Issues

Because the Wavefront Collector runs as a DaemonSet, leader election is used to select a single instance for collecting data from cluster-level components (non pod related) such as service endpoints, [object states](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#kubernetes-state-source), static sources (not configured via auto discovery) and events.

If you're noticing issues with collecting data from such components:
1. Verify a leader instance exists
2. Verify the leader is not changing or restarting often (could indicate memory issues etc.)

Use these metrics to help troubleshoot issues with leader election:

<table>
<tbody>
<thead>
<tr><th width="40%">Metric</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">kubernetes.collector.leaderelection.leading</td>
<td>A value of 1 indicates the leader instance.</td></tr>
<tr>
<td markdown="span">kubernetes.collector.leaderelection.error</td>
<td>Counter showing errors encountered in election a leader. </td></tr>
</tbody>
</table>


### Proxy Blocked Points

The [Monitoring Wavefront Proxies](monitoring_proxies.html) document explains how to use the Wavefront Usage dashboard to monitor and troubleshoot the Proxy.
