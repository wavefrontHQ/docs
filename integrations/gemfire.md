---
title: VMware Tanzu™ GemFire® Integration
tags: [integrations list]
permalink: gemfire.html
summary: Learn about the Wavefront VMware Tanzu™ GemFire® Integration.
---

## VMware Tanzu GemFire Integration

The VMware Tanzu GemFire integration allows you to monitor many Tanzu GemFire clusters running in Kubernetes, as well as Tanzu GemFire clusters running in a user-provided infrastructure.

1. **Tanzu GemFire for Kubernetes**

If you already have the Wavefront proxy and the Wavefront Collector installed in your Kubernetes cluster, you will see the Tanzu GemFire for Kubernetes metrics flowing into Wavefront. Otherwise, use the setup instructions.

2. **VMware Tanzu GemFire (Standalone)**

To scrape Tanzu GemFire metrics and send them to Wavefront, you must set up some user-managed applications.

3. **VMware Tanzu GemFire for VMs**

To emit Tanzu GemFire for VMs metrics to Wavefront, you must make sure that the Tanzu Observability by Wavefront nozzle is installed on the same Tanzu Application Service foundation.

## Sample Dashboards

In addition to setting up the metrics flow, this integration also installs dashboards. Here's the screenshot of our Tanzu GemFire Developer dashboard.

{% include image.md src="images/dashboard.png" width="80" %}

## Use the instructions on this page for monitoring:

1. VMware Tanzu GemFire for Kubernetes
2. VMware Tanzu GemFire

### VMware Tanzu GemFire for Kubernetes Setup

If you do not already have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, please follow these [instructions](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) to add it to your cluster.
For more details about the Wavefront Collector, see [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes).

If you do not have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).

Once installed, the Wavefront Collector will start collecting your Tanzu GemFire for Kubernetes metrics and will push them through the Wavefront proxy to your Wavefront environment specified upon installation.

Within about a minute you will be able to use the dashboard on the Dashboards tab above and see our default metrics sent from any Tanzu GemFire clusters created in that Kubernetes cluster.

### VMware Tanzu GemFire Setup
Supported versions: Tanzu GemFire 9.10.8 and later.

To set up Tanzu GemFire metrics flow, use the [setup instructions](https://gemfire.docs.pivotal.io/910/gemfire/tools_modules/tanzu-observability.html) in the VMware Tanzu GemFire Documentation.

### VMware Tanzu GemFire for VMs Setup
The [Tanzu Observability by Wavefront nozzle](https://network.pivotal.io/products/wavefront-nozzle/) tile must be installed on the same Tanzu Application Service (TAS) foundation as Tanzu GemFire for VMs. 

Follow instructions to [install and configure](https://docs.pivotal.io/wavefront-nozzle/3-x/installing.html#install) Tanzu Observability by Wavefront nozzle. Once configured, the metrics become visible within about a minute on the GemFire for VMs dashboard.



