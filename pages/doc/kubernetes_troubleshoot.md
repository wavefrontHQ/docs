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

#### Check for Collector Instance Issues

The behavior of individual Collector instances (memory usage etc.) can differ based on how much data they are collecting, whether it's a leader instance etc.

To troubleshoot:
* Check if there are any restarts amongst the relevant Collector pods.
* Run `kubectl describe POD_NAME -n NAMESPACE` to check if there are any OOM issues.

#### Check for Data Collection Errors

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

#### Check for Leader Election Issues

Because the Wavefront Collector runs as a DaemonSet, leader election is used to select a single instance for collecting data from cluster-level components (non pod related) such as service endpoints, [object states](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#kubernetes-state-source), static sources (not configured via auto discovery), and events.

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


#### Check for Proxy Blocked Points

The [Monitoring Wavefront Proxies](monitoring_proxies.html) document explains how to use the Wavefront Usage dashboard to monitor and troubleshoot the Proxy.
