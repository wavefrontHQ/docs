---
title: Wavefront Proxies
keywords:
tags: [proxies, data]
sidebar: doc_sidebar
permalink: proxies.html
summary: Learn about Wavefront proxies.
---
A Wavefront proxy ingests metrics and forwards them to the Wavefront service in a secure, fast, and reliable manner. After you install a proxy in your environment, it can handle thousands of simultaneous clients. Your data collection agents or custom code send data to the proxy, which consolidates points into configurable batches and sends the data to the Wavefront service.

## Proxy Benefits

Having a proxy be part of the Wavefront architecture has benefits:
- **Prevent data loss, optimize network bandwidth** -- The proxy buffers and manages data traffic. Even if there's a connectivity problem, you don't lose data points.
- **Simple firewall configuration** -- The proxy receives metrics from many agents on different hosts and forwards those metrics to the Wavefront service. You don't need to open internet access for each of the agents.
- **Enrich or filter data** -- You can set up the preprocessor to filter data before it's sent to Wavefront.
-  **Examine bottlenecks** -- Each proxy generates its own metrics, so you can check whether data comes in and whether data is sent to the Wavefront service.

## Proxy Deployment Options

Wavefront lets you choose a deployment option:
* As part of the in-product Getting Started workflow, trial users install their first integration - in most cases, an integration with the local host. In that case, the data source, the agent, and the proxy all run on the same host and the proxy forwards metrics to the Wavefront service.
* As your environment grows, you place the proxy on a dedicated host. Different agents and other data sources can send metrics to the proxy, and the proxy forwards the metrics to the Wavefront service. Agents can run either on the same host as the data source or on a different host.
*  In production environments, you usually place two proxies behind a load balancer for optimal performance and high availability.

### Setting Up Your First Agent and Proxy

Users who set up their first integration -- usually as part of the Getting Started workflow --  often choose to monitor their local host. This first integration installs both the proxy and a Telegraf agent on the same host by default.

![Proxy and agent on single host](/images/proxy_deployment_simple.svg)

The single-host deployment is an exception. Most environments use one or two proxies on dedicated hosts and run the agents on different systems - either on the same system as the data source or on separate systems.

When you set up an integration, the Setup page let's you pick a proxy –- or offers to install a new proxy. If the integration's Setup page doesn't have options for installing a proxy, that integration most likely does not use a proxy.

**Note** If you don't see a suitable integration, you might be able to use a code instrumentation integration (Java, Go, etc), or you can send data directly to the proxy -- as long as you use one of the [Supported Data Formats](http://docs-dev.wavefront.com/proxies.html#supported-data-formats).

### Shared Proxy Deployment

A proxy can accept metrics from multiple collector agents and forward those metrics to the Wavefront service. Having just one proxy means that you don't need to open multiple firewall ports: The proxy is the only component that needs a firewall port opened, simplifying configuration.

![Multiple agents one proxy](/images/proxy_deployment_multiple_inputs.svg)

Wavefront supports a rich set of custom collector integrations. You can follow the steps on the Setup tab for the integration to enable your environment for that agent. You can also use a code instrumentation integration such as Java, Go, or StatsD to send your metrics directly to the proxy.

![Agents and metrics collection](/images/proxy_deployment_complex.svg)

### Highly Available and Scalable Deployment

To enable fault tolerance and higher data rates, production environments typically use a load balancer that sends data to multiple proxies, as shown below.

![Proxies using load balancer](/images/proxy_deployment_load_balancer.svg)

## Proxy Configuration

No matter which of the deployment options you choose, you can modify proxy behavior in several ways:

- **Configuration file**: The proxy processes data according to a configuration file. You can modify configuration properties -- for example, to whitelist and blacklist regx patterns -- specify information about certain data formats, and much more. See [Configuring Wavefront Proxies](proxies_configuring.html).
- **Source Tags**: If you specify source tags and descriptions in the metric source, the proxy can use that information to filter the incoming metrics. See [Sending source Tags and Source Descriptions Through the Wavefront Proxy](proxies_configuring.html#sending-source-tags-and-source-descriptions-through-the-wavefront-proxy).
- **Preprocessor Rules**: Starting with proxy version 4.1, the Wavefront proxy includes a preprocessor that applies user-defined rules before data is sent to the Wavefront service. You can use preprocessor rules to correct certain data quality issues when you can't fix the problem at the emitting source. See [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html).

![Proxy configuration options](/images/proxy_config_options.svg)

## Supported Data Formats

If your environment already has a metrics collection engine, it's easy to send those metrics to Wavefront -- as long as they use a supported data format.

{% include shared/data_formats.html %}
