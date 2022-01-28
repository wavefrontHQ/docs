---
title: Wavefront Proxies
keywords:
tags: [proxies, data]
sidebar: doc_sidebar
permalink: proxies.html
summary: Learn about Wavefront proxies.
---
You can send data to the Wavefront service directly using [direct ingestions](direct_ingestion.html) -- but most customers and the Wavefront DevOps team use proxies.

A Wavefront proxy ingests metrics and forwards them to the Wavefront service in a secure, fast, and reliable manner. After you install a proxy in your environment, it can handle thousands of simultaneous clients. Your data collection agents or custom code send data to the proxy, which consolidates points into configurable batches and sends the data to the Wavefront service.

## Proxy Benefits

Having a proxy be part of the Wavefront architecture has benefits:
- **Prevent data loss, optimize network bandwidth** -- The proxy buffers and manages data traffic. Even if there's a connectivity problem, you don't lose data points.
- **Simple firewall configuration** -- The proxy receives metrics from many agents on different hosts and forwards those metrics to the Wavefront service. You don't need to open internet access for each of the agents.
- **Enrich or filter data** -- You can set up the preprocessor to filter data before it's sent to Wavefront.
-  **Examine bottlenecks** -- Each proxy generates its own metrics, so you can check whether data comes in and whether data is sent to the Wavefront service.

In this video, Clement contrasts using a Wavefront proxy with using direct ingestion, discusses proxy benefits, and goes over the architecture of most production systems, which includes a fleet of proxies behind a load balancer. The result is more resilience and a better user experience.

<p><a href="https://youtu.be/Lrm8UuxrsqA" target="_blank"><img src="/images/v_proxy_clement.png" style="width: 700px;" alt="Wavefront proxies video"/></a>
</p>



## Proxy Deployment Options

Wavefront lets you choose a deployment option:
* Initially, as part of the in-product Getting Started workflow, trial users install their first integration - often an integration with the local host. In that case, the data source, the agent, and the proxy all run on the same host and the proxy forwards metrics to the Wavefront service.
* As your environment grows, you place the proxy on a dedicated host. Different agents and other data sources can send metrics to the proxy, and the proxy forwards the metrics to the Wavefront service. Agents can run either on the same host as the data source or on a different host.
*  In production environments, you can place two proxies or a fleet of proxies behind a load balancer for optimal performance and high availability. In that case, each proxy must have a unique name. Your fleet of proxies does not run on the same host as your data sources.

{% include note.html content="It's not a good idea to install a proxy on each host you're monitoring. First, you lose the benefit of protection against data loss -- the proxy can buffer your metrics. Second, you only need a small number of proxies even in production environments." %}

### Learning Environment: One Host

Users who set up their first integration -- usually as part of the Getting Started workflow --  often choose to monitor their local host. This first integration installs both the proxy and a Telegraf agent on the same host by default.

![Proxy and agent on single host](/images/proxy_deployment_simple.png)

The single-host deployment is an exception. Most environments use one or two proxies on dedicated hosts and run the agents on different systems - either on the same system as the data source or on separate systems.

When you set up an integration, the Setup page lets you pick a proxy –- or offers to install a new proxy. If the integration's Setup page doesn't have options for installing a proxy, that integration most likely does not use a proxy.

{% include note.html content="If you don't see a suitable integration, you might be able to use a code instrumentation integration (Java, Go, etc), or you can send data directly to the proxy -- as long as you use one of the [Supported Data Formats](proxies.html#supported-data-formats)." %}

### Development Environment: Shared Proxy Deployment

A proxy can accept metrics from multiple collector agents and forward those metrics to the Wavefront service. Having just one proxy means that you don't need to open multiple firewall ports: The proxy is the only component that needs a firewall port opened, simplifying configuration.

![Multiple agents one proxy](/images/proxy_deployment_multiple_inputs.png)

Wavefront supports a rich set of custom collector integrations. You can follow the steps on the Setup tab for the integration to enable your environment for that agent. You can also use a code instrumentation integration such as Java, Go, or StatsD to send your metrics directly to the proxy.

![Agents and metrics collection](/images/proxy_deployment_complex.png)

### Production Environment: Team of Proxies & Load Balancer

To enable fault tolerance and higher data rates, production environments typically use a load balancer that sends data to multiple proxies, as shown below.

![Proxies using load balancer](/images/proxy_deployment_load_balancer.png)

{% include note.html content="In environments with more than one proxy, each proxy must have a unique name." %}

## Proxy Configuration

You can modify proxy behavior in several ways:

- **Configuration file**: The proxy processes data according to a configuration file. You can modify configuration properties -- for example, to create `block` list and `allow` list regex patterns, specify information about certain data formats, and much more. See [Configuring Wavefront Proxies](proxies_configuring.html).
- **Source Tags**: If you specify source tags and descriptions in the metric source, the proxy can use that information to filter the incoming metrics. See [Sending source Tags and Source Descriptions Through the Wavefront Proxy](proxies_configuring.html#sending-source-tags-and-source-descriptions-through-the-wavefront-proxy).
- **Preprocessor Rules**: Starting with proxy version 4.1, the Wavefront proxy includes a preprocessor that applies user-defined rules before data is sent to the Wavefront service. You can use preprocessor rules to correct certain data quality issues when you can't fix the problem at the emitting source. See [Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html).

![Proxy configuration options](/images/proxy_config_options_rev.png)

## Supported Data Formats

Wavefront proxies support:
* Time-series metrics
* Histograms
* Traces/spans

Each type of data uses a different data format. See [Wavefront Data Format](wavefront_data_format.html) for details and links.

## Proxies Troubleshooting & Advanced Configuration

### Truncate the Proxy Queue

If, for any reason, you have to truncate the proxy queue, you can do it locally by cleaning up the buffer directory, or remotely using the API with the `truncate` flag.

{% include warning.html content="Truncating the proxy can lead to data loss, but helps if you cannot safely empty queued proxy data in other ways." %}

**To truncate the proxy queue:**

In most cases, you truncate the proxy queue by deleting the files in the proxy queue directory.

1. Connect to the proxy machine.
2. Stop the proxy.
3. Delete all files in the proxy queue directory
4. Start the proxy

**To truncate the proxy queue with the API:**

If you can't connect to the proxy machine or don't have permissions for the proxy queue directory, you can truncate the queue with the API.

Run the following command:

```curl
$curl -X PUT -H 'Authorization: Bearer <TOKEN>' -H 'Content-Type: application/json' "https://MY_INSTANCE.wavefront.com/api/v2/proxy/PROXY_ID" -d {"truncate":true}
```

* `MY_INSTANCE` is your Wavefront instance, for example, the URL could start with `https://example.wavefront.com`
* `PROXY_ID` is the ID, which you can find in the Proxies browser in the Hostname column.

### More Info

* [Monitor Wavefront Proxies](monitoring_proxies.html) discusses proxy information in the Wavefront Usage dashboard and lists `~proxy` internal metrics.

See the following KB articles for additional proxy troubleshooting help.

* [Orphaned Proxy Instances in Tanzu Observability by Wavefront UI](https://help.wavefront.com/hc/en-us/articles/360060591732-Orphaned-Proxy-instances-in-Tanzu-Observability-UI)
* [How to Enable Proxy Health Checks for Tanzu Observability by Wavefront](https://help.wavefront.com/hc/en-us/articles/360058952572-How-to-enable-Tanzu-Observability-Proxy-Health-Checks-)
* [How to Chain Proxies](https://help.wavefront.com/hc/en-us/articles/360056083472-How-to-Proxy-Chain)
* [Validating Metrics Received at the Proxy](https://help.wavefront.com/hc/en-us/articles/360054622132-Validating-metrics-received-at-the-proxy)
* [Common Tanzu Observability by Wavefront Proxy Log Messages](https://help.wavefront.com/hc/en-us/articles/360050483312-Common-Tanzu-Observability-by-Wavefront-Proxy-Log-Messages)
