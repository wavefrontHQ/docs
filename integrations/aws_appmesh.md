---
title: AWS App Mesh Integration
tags: [integrations list]
permalink: aws_appmesh.html
summary: Learn about the Wavefront AWS App Mesh Integration.
---
## AWS App Mesh Integration

AWS App Mesh is a service mesh that allows you to monitor and control communications across microservices applications on AWS.

Click the **Setup** tab for instructions on:

* Setting up your environment to send AWS App Mesh **metrics** to [[applicationName]].
* Setting up your environment to send AWS App Mesh **traces** to [[applicationName]].

This integration also installs a dashboard. Here's a preview of the AWS App Mesh dashboard:

{% include image.md src="images/appmesh_1.png" width="80" %}
{% include image.md src="images/appmesh_2.png" width="80" %}
{% include image.md src="images/appmesh_3.png" width="80" %}

## Reporting AWS App Mesh Metrics to [[applicationName]]



This integration uses the [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes-collector) to send metrics. The collector can send metrics to [[applicationName]] using either the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

The following instructions are for reporting metrics. To report traces, use the AWS App Mesh tracing setup instructions below.

### Step 1. Set up Wavefront Proxy
Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. If you plan on sending metrics directly to the [[applicationName]] service, this step is not required. If you plan to send traces, use the proxy set up instructions in the tracing section below.


### Step 2. Deploy and Configure the Wavefront Collector for Kubernetes

You can deploy the collector using `kubectl`. To send metrics to [[applicationName]], set up the collector with Auto Discovery.

Refer to the collector [documentation] for configuration details and installation instructions.

Also, Refer to the Auto Discovery [documentation] to set up collector with Auto Discovery.

A sample deployment to deploy the collector with discovery rules can be found [here](https://github.com/wavefrontHQ/wavefront-kubernetes/tree/master/aws-appmesh#deploy-wavefront-kubernetes-collector-with-auto-discovery-rules).


## Reporting AWS App Mesh Traces to [[applicationName]]
The following instructions are for reporting traces. To report metrics, use the AWS App Mesh metrics setup instructions above.

### Step 1. Set up Wavefront Proxy
Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. As part of the process, uncomment the appropriate lines to enable Zipkin/Istio traces. Use a proxy version 4.35 or later.

### Step 2. Set up Envoy to Send Zipkin Format Traces to Wavefront Proxy

* Follow the Envoy [documentation](https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/zipkin_tracing#install-sandboxes-zipkin-tracing) to set up Envoy proxy to collect and report Zipkin traces to a Zipkin cluster.
* Modify the Zipkin cluster to point to the Wavefront proxy.

Look at the sample deployment [here](https://github.com/wavefrontHQ/wavefront-kubernetes/tree/master/aws-appmesh/deploy/tracing-config.yaml).



