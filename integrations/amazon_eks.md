---
title: Amazon EKS Integration
tags: [integrations list]
permalink: amazon_eks.html
summary: Learn about the Wavefront Amazon EKS Integration.
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

* Kubernetes: Detailed health of your infrastructure and workloads.
* Kubernetes Metrics by Namespace: Details of your pods/containers broken down by namespace.
* Kube-state metrics: State of Kubernetes objects such as pods, services, deployments and daemonsets.
* Kubernetes Collector Metrics: Internal stats of the Collector.

Here's a preview of some of the pod charts in the Kubernetes dashboard:

{% include image.md src="images/db_kubernetes_pods.png" width="80" %}

Here's a preview of some of the charts from kube-state-metrics dashboard:

{% include image.md src="images/kube-state-dashboard.png" width="80" %}

## Kubernetes Setup

This integration uses the [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) to monitor your Kubernetes clusters.

### OpenShift Installation
Follow these steps for installing the Wavefront Collector in an OpenShift environment. Refer to the **Kubernetes Quick Install using Helm** or **Kubernetes Manual Install** for installing the collector in all other Kubernetes environments.

The collector supports monitoring of Openshift clusters:
  * To monitor Openshift Origin 3.9 follow the steps in [Installation and Configuration on OpenShift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/master/docs/openshift.md).
  * To monitor Openshift Enterprise 3.11 follow the steps in [Installation and Configuration of Wavefront Collector Operator on Openshift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/master/docs/openshift-operator.md)

### Kubernetes Quick Install Using Helm
1. Ensure that you have installed [helm](https://helm.sh/docs/intro/).
1. Add the Wavefront helm repo:{% raw %}
```
helm repo add wavefront https://wavefronthq.github.io/helm/
helm repo update
```
{% endraw %}
1. To deploy the Wavefront Collector and Wavefront Proxy:
  * Using helm 2:{% raw %}
```
helm install stable/wavefront --name wavefront --set wavefront.url=https://YOUR_CLUSTER.wavefront.com --set wavefront.token=YOUR_API_TOKEN --set clusterName=<YOUR_CLUSTER_NAME> --namespace wavefront
```
{% endraw %}
  * Using helm 3:{% raw %}
```
kubectl create namespace wavefront
helm install wavefront stable/wavefront --set wavefront.url=https://YOUR_CLUSTER.wavefront.com --set wavefront.token=YOUR_API_TOKEN --set clusterName=<YOUR_CLUSTER_NAME> --namespace wavefront
```
{% endraw %}

**Note:** The `clusterName` property refers to the Kubernetes cluster, for example, `dev-cluster`. You must set this property.

Refer to the Wavefront [helm chart](https://github.com/wavefrontHQ/helm/tree/master/wavefront) for further options.

### Kubernetes Manual Install
Follow the instructions below to manually set up Kubernetes monitoring.

### Step 1. Deploy a Wavefront Proxy in Kubernetes

1. Download [wavefront.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/wavefront-proxy/wavefront.yaml) to your system.
2. Edit the file and set `WAVEFRONT_URL` to `https://YOUR_CLUSTER.wavefront.com/api/` and `WAVEFRONT_TOKEN` to `YOUR_API_TOKEN`.
3. Run `kubectl create -f </path/to>/wavefront.yaml` to deploy the proxy.

The Wavefront proxy and a `wavefront-proxy` service should now be running in Kubernetes.

### Step 2. Deploy the kube-state-metrics Service
1. Download [kube-state.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/ksm-all-in-one/kube-state.yaml) to your system.
2. Run `kubectl create -f </path/to>/kube-state.yaml`.

The `kube-state-metrics` service should now be running on your cluster.

### Step 3. Deploy Wavefront Collector for Kubernetes

1. Download the following deployment files to a directory named `wavefront-collector-dir` on your system:
  * [0-collector-namespace.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/0-collector-namespace.yaml)
  * [1-collector-cluster-role.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/1-collector-cluster-role.yaml)
  * [2-collector-rbac.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/2-collector-rbac.yaml)
  * [3-collector-service-account.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/3-collector-service-account.yaml)
  * [4-collector-config.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-collector-for-kubernetes/master/deploy/kubernetes/4-collector-config.yaml)
  * [5-collector-daemonset.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-collector-for-kubernetes/master/deploy/kubernetes/5-collector-daemonset.yaml)

2. Edit `4-collector-config.yaml` and replace `clusterName: k8s-cluster` to uniquely identify your Kubernetes cluster.

3. If RBAC is disabled in your Kubernetes cluster, edit `5-collector-daemonset.yaml` and comment out `serviceAccountName: wavefront-collector`.

4. Run `kubectl create -f </path/to/wavefront-collector-dir>/` to deploy the collector on your cluster.

To verify the collector is deployed, run `kubectl get pods -n wavefront-collector`.

### Application and Service Auto Discovery
The Wavefront Collector can [auto discover](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md#rule-based-discovery) applications and services within a Kubernetes environment and automatically start collecting metrics.

The default configuration file includes [discovery configurations](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/d6a73808a32d72d9268e8c18204287f9515ad413/deploy/kubernetes/4-collector-config.yaml#L96) for a number of common applications such as Consul, Redis, Memcached, etc. Uncomment the configurations for the applications you wish to monitor, and customize the rules as relevant to your environment.

### Troubleshooting
If you do not see metrics in the Kubernetes dashboard, check the logs from the collector and proxy pods.

### Horizontal Pod Autoscaling (HPA)
Wavefront provides a HPA adapter for autoscaling your pods based on any metrics in Wavefront. See [wavefront-kubernetes-adapter](https://github.com/wavefrontHQ/wavefront-kubernetes-adapter) for details.
