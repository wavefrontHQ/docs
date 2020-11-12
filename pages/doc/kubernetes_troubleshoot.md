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

## Symptom: No Data Flowing into Wavefront

Likely Causes:
1. The Wavefront Collector is not running
2. The Wavefront Proxy is not running or cannot connect to Wavefront
3. The Wavefront Collector cannot connect to the Wavefront Proxy

Follow the steps below to troubleshoot.

### Verify the Wavefront Collector Is Running

* Run `kubectl get daemonset wavefront-collector -n NAMESPACE` to verify all collector instances are ready and available.
* Run `kubectl get pods -l app.kubernetes.io/component=collector -n <NAMESPACE>` to verify there are no restarts amongst the Collector pods.
* Check the logs for the Collector pods to troubleshoot further.

### Verify the Wavefront Proxy Deployment

* Run `kubectl get deployment wavefront-proxy -n NAMESPACE` to verify the proxy instances are ready and available.
* Run `kubectl get pods -l app.kubernetes.io/component=proxy -n <NAMESPACE>` to verify there are no pod restarts etc.
* Check the proxy logs to check if there are errors in connecting to the Wavefront SaaS service.

Refer to this [documentation](https://docs.wavefront.com/monitoring_proxies.html) for monitoring and troubleshooting the proxy.

### Verify the Collector Can Connect to the Proxy

Check the Collector logs for any errors when sending points to the Proxy.

To troubleshoot further:
1. Verify the `proxyAddress` on the Collector sink configuration is correct.
2. Verify the proxy service exposes the correct ports (typically 2878).

## Symptom: Partial Data Flowing into Wavefront

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
