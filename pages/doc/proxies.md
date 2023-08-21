---
title: Wavefront Proxies
keywords:
tags: [proxies, data]
sidebar: doc_sidebar
permalink: proxies.html
summary: Learn about Wavefront proxies.
---
VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) enables you to:
* Send data through Wavefront proxies. Most customers and our DevOps team use proxies.
* Send data directly using [direct ingestions](direct_ingestion.html).


A Wavefront proxy ingests metrics and forwards them to Operations for Applications in a secure, fast, and reliable manner. After you install a proxy in your environment, it can handle thousands of simultaneous clients. Your data collection agents or custom code send data to the proxy, which consolidates points into configurable batches and sends the data to your Operations for Applications service.

## Proxy Benefits

Having a proxy be part of the architecture has benefits:
- **Prevent data loss, optimize network bandwidth** -- The proxy buffers and manages data traffic. Even if there's a connectivity problem, you don't lose data points.
- **Simple firewall configuration** -- The proxy receives metrics from many agents on different hosts and forwards those metrics to Operations for Applications. You don't need to open internet access for each of the agents.
- **Enrich or filter data** -- You can set up the preprocessor to filter data before it's sent to your Operations for Applications service.
-  **Examine bottlenecks** -- Each proxy generates its own metrics, so you can check whether data comes in and whether data is sent to your Operations for Applications service.

In this video, Clement contrasts using a Wavefront proxy with using direct ingestion, discusses proxy benefits, and goes over the architecture of most production systems, which includes a fleet of proxies behind a load balancer. The result is more resilience and a better user experience. Note that this video was created in 2019 and some of the information in it might have changed. 

<p>
<iframe id="kmsembed-1_5wfjti3m" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_5wfjti3m/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Wavefront Proxy"></iframe>
</p>

## Proxy Deployment Options

You have a choice of proxy deployment option:
* Initially, as part of the in-product Getting Started workflow, trial users install their first integration - often an integration with the local host. In that case, the data source, the agent, and the proxy all run on the same host and the proxy forwards metrics to the Operations for Applications service.
* As your environment grows, you place the proxy on a dedicated host. Different agents and other data sources can send metrics to the proxy, and the proxy forwards the metrics to your Operations for Applications service. Agents can run either on the same host as the data source or on a different host.
*  In production environments, you can place two proxies or a fleet of proxies behind a load balancer for optimal performance and high availability. In that case, each proxy must have a unique name. Your fleet of proxies does not run on the same host as your data sources.

{% include note.html content="It's not a good idea to install a proxy on each host you're monitoring. First, you lose the benefit of protection against data loss -- the proxy can buffer your metrics. Second, you only need a small number of proxies even in production environments." %}

### Learning Environment: One Host

Users who set up their first integration -- usually as part of the Getting Started workflow --  often choose to monitor their local host. This first integration installs both the proxy and a Telegraf agent on the same host by default.

![Proxy and agent on single host](/images/proxy_deployment_simple.png)

The single-host deployment is an exception. Most environments use one or two proxies on dedicated hosts and run the agents on different systems - either on the same system as the data source or on separate systems.

When you set up an integration, the Setup page lets you pick a proxy –- or offers to install a new proxy. If the integration's Setup page doesn't have options for installing a proxy, that integration most likely does not use a proxy.

{% include note.html content="If you don't see a suitable integration, you might be able to use a code instrumentation integration (Java, Go, etc), or you can send data directly to the proxy -- as long as you use one of the [Supported Data Formats](proxies.html#supported-data-formats)." %}

### Development Environment: Shared Proxy Deployment

A proxy can accept metrics from multiple collector agents and forward those metrics to Operations for Applications. Having just one proxy means that you don't need to open multiple firewall ports: The proxy is the only component that needs a firewall port opened, simplifying configuration.

![Multiple agents one proxy](/images/proxy_deployment_multiple_inputs.png)

We support a rich set of integrations.
* Cloud integrations don't use a proxy.
* For other integrations, you can follow the steps on the Setup tab for the integration to set up an agent (usually Telegraf) and select or install a proxy.

You can also use one of [our SDKs](wavefront_sdks.html) to send your metrics to the proxy.


### Production Environment: Team of Proxies & Load Balancer

To enable fault tolerance and higher data rates, production environments typically use a load balancer that sends data to multiple proxies, as shown below.


![Proxies using load balancer](/images/proxy_deployment_load_balancer.png)

{% include note.html content="In environments with more than one proxy, each proxy must have a unique name." %}


## Proxy Configuration

You can modify how the proxy handles data in several ways:

- **Configuration file**: The proxy processes data according to a configuration file. You can modify configuration properties -- for example, create `block` list and `allow` list regex patterns, specify information about certain data formats, and much more. See [Configuring Wavefront Proxies](proxies_configuring.html).
- **Preprocessor Rules**: Use preprocessor rules to correct certain data quality issues when you can't fix the problem at the emitting source. See [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html). If you want to perform conditional preprocession, see [Preprocessor Rule Conditions](proxies_preprocessor_rule_conditions.html).
- **Source Tags**: Use source tags and descriptions in the metric source to instruct the proxy to filter the incoming metrics. See [Manage SourceTag and SourceDescription Properties at the Proxy](tags_overview.html#manage-sourcetag-and-sourcedescription-properties-at-the-proxy).

![Proxy configuration options](/images/proxy_config_options_rev.png)

## Supported Data Formats

Wavefront proxies support:
* Time-series metrics
* Histograms
* Traces/spans

Each type of data uses a different data format. See [Data Format](wavefront_data_format.html) for details and links.


## Learn More!

* [Monitor Wavefront Proxies](monitoring_proxies.html) discusses how to use the Proxies Browser and the out-of-the-box proxy dashboards, and lists the `~proxy` internal metrics.
* [Proxies Troubleshooting](proxies_troubleshooting.html) helps with proxy queue management, proxy messages, and more.
* [Telegraf Troubleshooting](telegraf_details.html) has details on troubleshooting and fine-tuning the Telegraf agent.
