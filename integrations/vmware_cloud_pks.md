---
title: VMware Cloud PKS Integration
tags: [integrations list]
permalink: vmware_cloud_pks.html
summary: Learn about the Wavefront VMware Cloud PKS Integration.
---
## Kubernetes Integration

Kubernetes is a popular open source container orchestration system. This integration uses the new [Wavefront Kubernetes Collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector) to collect detailed resource metrics about the containers, namespaces, nodes, pods, and the Kubernetes cluster itself and sends them to a [Wavefront proxy](https://docs.wavefront.com/proxies.html). This integration also explains how to configure and collect [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics). The kube-state-metrics service listens to the Kubernetes API server and generates metrics about the state of Kubernetes objects.

In addition to setting up the metrics flow, this integration also installs dashboards.

Here's a preview of some of the pod charts in the Kubernetes dashboard.

{% include image.md src="images/db_kubernetes_pods.png" width="80" %}

Here's a preview of some of the charts from kube-state-metrics dashboard.

{% include image.md src="images/kube-state-dashboard.png" width="80" %}

## Kubernetes Setup

**Note:** This integration provides updated setup instructions and dashboard for Kubernetes. For the previous setup instructions, see the **Kubernetes (Archived)** integration in the **Archived** section.

### Step 1. Deploy a Wavefront Proxy in Kubernetes

Download [wavefront.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/wavefront-proxy/wavefront.yaml) to your system. Edit the file and set `WAVEFRONT_URL` to `https://YOUR_CLUSTER.wavefront.com/api/` and `WAVEFRONT_TOKEN` to `YOUR_API_TOKEN`.

Run `kubectl create -f </path/to>/wavefront.yaml` to deploy the proxy.

The Wavefront proxy and a `wavefront-proxy` service should now be running in Kubernetes.

### Step 2. Deploy the kube-state-metrics Service

Download [kube-state.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes/master/ksm-all-in-one/kube-state.yaml) to your system and run `kubectl create -f </path/to>/kube-state.yaml`.

The `kube-state-metrics` service should now be running on your cluster.

### Step 3. Deploy Wavefront Kubernetes Collector

Download the following deployment files to a directory named `wavefront-collector-dir` on your system:
* [0-collector-namespace.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/0-collector-namespace.yaml)
* [1-collector-cluster-role.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/1-collector-cluster-role.yaml)
* [2-collector-rbac.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/2-collector-rbac.yaml)
* [3-collector-service-account.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/3-collector-service-account.yaml)
* [4-collector-deployment.yaml](https://raw.githubusercontent.com/wavefrontHQ/wavefront-kubernetes-collector/master/deploy/kubernetes/4-collector-deployment.yaml)

Edit `4-collector-deployment.yaml` as follows:

* Replace `clusterName=k8s-cluster` to uniquely identify your Kubernetes cluster.
* If RBAC is disabled in your Kubernetes cluster, comment out `serviceAccountName: wavefront-collector`.
* If the read-only kubelet port is disabled, replace the kubernetes source as described [here](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/configuration.md#kubernetes-source).

Run `kubectl create -f </path/to/wavefront-collector-dir>/` to deploy the collector on your cluster.

To verify the collector is deployed, run `kubectl get pods -n wavefront-collector`.

If you do not see metrics in the Kubernetes dashboard, check the logs from the collector and proxy pods.

### Horizontal Pod Autoscaling (HPA)
Wavefront provides a HPA adapter for autoscaling your pods based on any metrics in Wavefront. See  [wavefront-kubernetes-adapter](https://github.com/wavefrontHQ/wavefront-kubernetes-adapter) for details.

### Openshift Monitoring
This collector supports monitoring of Openshift Origin clusters. See [openshift](https://github.com/wavefronthq/wavefront-kubernetes-collector/tree/master/docs/openshift.md) for detailed installation instructions.
