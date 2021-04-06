---
title: VMware Tanzu™ GemFire® Integration
tags: [integrations list]
permalink: gemfire.html
summary: Learn about the Wavefront VMware Tanzu™ GemFire® Integration.
---
## VMware Tanzu GemFire Integration

VMware Tanzu GemFire is a distributed, in-memory, key-value store that performs read and write operations at blazing fast speeds for client-server applications. This integration allows users to monitor many different GemFire cluster(s) running in many different Kubernetes clusters.

This integration works out of the box if you already have the Wavefront proxy and collectors installed in your Kubernetes cluster. Otherwise, perform a simple Helm install of Wavefront Collector on your Kubernetes cluster to trigger metrics to flow to Wavefront.

Future plans include support for VMware Tanzu GemFire for VMs and Standalone offerings.

Below is a sample of what one of our Developer centered dashboards provides as part of this integration:

{% include image.md src="images/dashboard.png" width="80" %}
### VMware Tanzu GemFire for Kubernetes Setup

If you do not already have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, please follow these [instructions](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) to add it to your cluster.
See [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) for more details about collector.

Once installed, the collector pods will collect your GemFire metrics and push them through the Wavefront proxy to your Wavefront environment specified on installation of the Collector.

Within about a minute you will be able to use the dashboards on the Dashboards tab above to see our default metrics sent from any GemFire clusters created in that Kubernetes cluster.



