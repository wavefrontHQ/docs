---
title: OpenShift Integration
tags: [integrations list]
permalink: openshift.html
summary: Learn about the Wavefront OpenShift Integration.
---
## Kubernetes Integration

Wavefront provides a comprehensive solution for monitoring Kubernetes. This integration uses the [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes-collector) to collect detailed metrics from Kubernetes clusters.

### Collection
The collector makes it easy for you to monitor and manage your Kubernetes environment:

* Collects real-time metrics from all layers of a Kubernetes environment (clusters, nodes, pods, containers and the Kubernetes control plane).
* Supports plugins such as Prometheus, Telegraf and Systemd enabling you to collect metrics from various workloads.
* [Auto discovery](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/discovery.md) of pods and services based on annotation and configuration.
* Daemonset mode for high scalability with leader election for monitoring cluster-level resources.
* Rich [filtering](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/filtering.md) support.
* Auto reload of configuration changes.
* [Internal metrics](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/metrics.md#collector-health-metrics) for tracking the collector health and source of your Kubernetes metrics.

### Dashboards

In addition to setting up the metrics flow, this integration also installs dashboards:

* Kubernetes Summary: Detailed health of your infrastructure and workloads.
* Kubernetes Clusters: Detailed health of your clusters and its nodes, namespaces, pods and containers.
* Kubernetes Nodes: Detailed health of your nodes.
* Kubernetes Pods: Detailed health of your pods broken down by node and namespace.
* Kubernetes Containers: Deatailed health of your containers broken down by namespace, node and pod.
* Kubernetes Namespaces: Details of your pods/containers broken down by namespace.
* Wavefront Collector for Kubernetes Metrics: Internal stats of the Wavefront Collector for Kubernetes.

Here's a preview of the Kubernetes Summary dashboard:

{% include image.md src="images/db_kubernetes_summary.png" width="80" %}

Here's a preview of the Kubernetes Pods dashboard:

{% include image.md src="images/db_kubernetes_pods.png" width="80" %}

## Use OpenShift To Install The Kubernetes Integration

This page contains the Installation and Configuration steps for full-stack monitoring of OpenShift clusters using Wavefront Helm Chart.

### Install and Configure Wavefront Helm Chart on OpenShift Enterprise 4.x

This page contains the Installation and Configuration steps for full-stack monitoring of OpenShift clusters using Wavefront Helm Chart.

#### Install and Configure Wavefront Helm Chart

1. Log in to OpenShift Web UI as administrator.
2. Create a project with name `wavefront`.
3. In the Left pane, navigate to **Helm**, select **Install a Helm Chart from the developer catalog**.
4. Search for **Wavefront** and click **Install Helm Chart**.
5. Install from **form view** or **yaml view**. Replace the following with your values:
    * clusterName → <KUBERNETES_CLUSTER_NAME>
    * token → <YOUR_API_TOKEN>
    * url → https://<YOUR_CLUSTER>.wavefront.com
6. Click **Install**.

Because default parameters are used, the collector runs as a daemonset and uses `wavefront-proxy` as sink. The collector auto-discovers the pods and services that expose metrics and dynamically starts collecting metrics for the targets. It collects metrics from the kubernetes API server if configured.

Now log in to Wavefront and search for the `<KUBERNETES_CLUSTER_NAME>` in kubernetes integration dashboards.

### Install and Configure Wavefront Operator on OpenShift Enterprise 3.x

The Wavefront Collector supports monitoring of OpenShift clusters:
* To monitor OpenShift Origin 3.9 follow the steps in [Installation and Configuration on OpenShift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/master/docs/openshift.md).
* To monitor OpenShift Enterprise 3.11 follow the steps in [Installation and Configuration of Wavefront Collector Operator on OpenShift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/master/docs/openshift-operator.md)

#### Using an Existing Proxy

To configure Wavefront Collector to use a proxy that's already running in your environment, follow these steps:
1. Make the following change to the **proxy** section:
    * enabled → false
2. Add **proxyAddress** under **collector** in the yaml view.
3. Click **Install**.

#### Advanced Wavefront Proxy Configuration

You can configure the proxy to change how it processes your data, port numbers, metric prefix etc.

#### Configuring Wavefront Proxy Preprocessor Rules

[Preprocessor rules](https://docs.wavefront.com/proxies_preprocessor_rules.html) allow you to manipulate incoming metrics before they reach the proxy, for example, you could remove confidential text strings or replace unacceptable characters. Follow these steps to create a ConfigMap with custom preprocessor rules:

1. Add **preprocessor** under **proxy** in yaml view.
```
preprocessor:
  rules.yaml: |
    '2878':
    # fix %2F to be a / instead.  May be required on EKS.
    - rule    : fix-forward-slash
      action  : replaceRegex
      scope   : pointLine
      search  : "%2F"
      replace : "/"
    # replace bad characters ("&", "$", "!", "@") with underscores in the entire point line string
    - rule    : replace-badchars
      action  : replaceRegex
      scope   : pointLine
      search  : "[&\\$!@]"
      replace : "_"
```
2. Click on **Install**.

## Metrics

* [Kubernetes Source](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#kubernetes-source)
* [Kubernetes State Source](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#kubernetes-state-source)
* [Prometheus Source](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#prometheus-source)
* [Systemd Source](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#systemd-source)
* [Telegraf Source](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#telegraf-source)
* [Collector Health](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/metrics.md#collector-health-metrics)
