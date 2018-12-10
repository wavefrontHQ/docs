---
title: Istio Integration
tags: [integrations list]
permalink: istio.html
summary: Learn about the Wavefront Istio Integration.
---
## Istio Integration

Istio is an open platform-independent service mesh that provides traffic management, policy enforcement, and telemetry collection.

This integration gives detailed instructions for setting up your environment to send Istio metrics to Wavefront.

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the Istio dashboard:

{% include image.md src="images/istio_1.png" width="80" %}
{% include image.md src="images/istio_2.png" width="80" %}
{% include image.md src="images/istio_3.png" width="80" %}

## Istio Setup



This integration uses the [Wavefront by VMware Adapter for Istio](https://github.com/vmware/wavefront-adapter-for-istio). The adapter can send data to Wavefront using either the [proxy](https://docs.wavefront.com/proxies.html) or [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

### Step 1. Set up Wavefront Proxy
Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. If you plan on sending metrics directly to the Wavefront service, this step is not required.

### Step 2. Deploy and Configure the Wavefront by VMware Adapter for Istio

You can deploy the adapter using helm or kubectl. See the [reference documentation](https://istio.io/docs/reference/config/policy-and-telemetry/adapters/wavefront/) for available configuration parameters.

* Helm: The preferred way to deploy the adapter. See the [helm quick start](https://github.com/vmware/wavefront-adapter-for-istio/tree/master/install/wavefront#quick-start) for details.
* kubectl: See the [standard installation](https://github.com/vmware/wavefront-adapter-for-istio#standard-installation) instructions.

You have to update the source parameter to your cluster or application name. How you do that depends on whether you use the proxy or direct ingestion:

#### Option 1. Send metrics to a Wavefront Proxy{% raw %}
```
params:
  proxy:
    address: YOUR-PROXY-IP:YOUR-PROXY-PORT
  source: your-cluster-or-application
```

#### Option 2. Send metrics directly to a Wavefront service
```
params:
  direct:
    server: https://YOUR_CLUSTER.wavefront.com
    token: YOUR_API_TOKEN
  source: your-cluster-or-application
```
{% endraw %}
