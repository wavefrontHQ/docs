---
title: Istio Integration
tags: [integrations list]
permalink: istio.html
summary: Learn about the Wavefront Istio Integration.
---
## Istio Integration

Istio is an open platform-independent service mesh that provides traffic management, policy enforcement, and telemetry collection.

Click the **Setup** tab for instructions on:

* Setting up your environment to send Istio **metrics** to Wavefront.
* Setting up your environment to send Istio **traces** to Wavefront.

This integration also installs a dashboard. Here's a preview of the Istio dashboard:

{% include image.md src="images/istio_1.png" width="80" %}
{% include image.md src="images/istio_2.png" width="80" %}
{% include image.md src="images/istio_3.png" width="80" %}

## Istio Setup



This integration uses the [Wavefront by VMware Adapter for Istio](https://github.com/vmware/wavefront-adapter-for-istio) to send metrics. The adapter can send data to Wavefront using either the [proxy](https://docs.wavefront.com/proxies.html) or [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).
The instructions below assume Istio is deployed in a Kubernetes environment.

### Reporting Istio Metrics to Wavefront
The following instructions are for reporting metrics. To report traces, use the Istio tracing set up instructions below.

#### Step 1. Set up Wavefront Proxy
Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. If you plan on sending metrics directly to the Wavefront service, this step is not required.


#### Step 2. Deploy and Configure the Wavefront by VMware Adapter for Istio

You can deploy the adapter using helm or kubectl. See the [reference documentation](https://istio.io/docs/reference/config/policy-and-telemetry/adapters/wavefront/) for available configuration parameters.

* Helm: The preferred way to deploy the adapter. See the [helm quick start](https://github.com/vmware/wavefront-adapter-for-istio/tree/master/install/wavefront#quick-start) for details.
* kubectl: See the [standard installation](https://github.com/vmware/wavefront-adapter-for-istio#standard-installation) instructions.

You have to update the `source` parameter to your cluster or application name. How you do that depends on whether you use the proxy or direct ingestion:

Option 1. Send metrics to a Wavefront Proxy{% raw %}
```
params:
  proxy:
    address: YOUR-PROXY-IP:YOUR-PROXY-PORT
  source: your-cluster-or-application
```
{% endraw %}

Option 2. Send metrics directly to a Wavefront service{% raw %}
```
params:
  direct:
    server: https://YOUR_CLUSTER.wavefront.com
    token: YOUR_API_TOKEN
  source: your-cluster-or-application
```
{% endraw %}

### Reporting Istio Traces to Wavefront
The following instructions are for reporting traces. To report metrics, use the Istio metrics set up instructions above.

#### Step 1. Set up Wavefront Proxy
Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. As part of the process, uncomment the lines to enable Zipkin/Istio traces. Use a proxy version 4.35 or later.

#### Step 2. Set up Istio to Send Traces to Wavefront Proxy

Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes/tree/master/istio) to allow Istio to re-direct its traces to the Wavefront proxy.
