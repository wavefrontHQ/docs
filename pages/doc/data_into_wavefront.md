---
title: Getting Data into Wavefront
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: data_into_wavefront.html
summary: Learn how to get data into Wavefront.
---
Wavefront customers use Wavefront to visualize their metric and instrument them with alerts. How you get your data into Wavefront depends on the use case, but you have many options. Wavefront supports many in-product integrations and custom custom integration, or you can instrument your application and send data directly to Wavefront.

## The Big Picture

You can use Wavefront for any time series metrics, even if you're already collecting those metrics with a custom metrics pipeline. The data flow is similar in all cases:

1. The metrics originate with your infrastructure or application.
2. The metrics are sent to Wavefront:
    * For many in-product integrations, a collector agent take the metrics from your sources sends them to the proxy. A single proxy can forward metrics from many sources to the Wavefront service.
    * For cloud services, you use one of the [Cloud integrations](integrations_list.html#cloud) -- you don't have to install or set up a proxy.
    * If no in-product integration for you data source exists, you can use one of the Custom Collector integrations or send data directly to the proxy. The proxy accepts metrics in OpenTSB, Graphana, and [Wavefront data format](images/data_flow.png).

![wavefront architecture condensed](images/wavefront_architecture_condensed.svg)

## Step 1: Understand Your Use Case

Wavfront can help you get insight into all levels of your toolchain. Here are the main use cases.

- **Infrastructure metrics (2)** range from the simple to the complex:
   - Collect host metrics, such as CPU, memory, etc. to find bottlenecks, explore trends, and troubleshoot your environment. These customers often use Telegraf or another open source solution to extract data and send those data to the Wavefront proxy.
   - Use Wavefront for app-driven infrastructure data. For example, you can send metrics from NGNIX, MySQL, and similar sources into Wavefront.

   See the [list of integrations](integrations_list.html).
- **Custom metrics (1)** include data you want to collect from you in-house applications, or customized metrics, for example to monitor user behavior. Here are the main use cases:
    - Use one of the collector agents, such as Telegraf, to get data into Wavefront. Telegraf includes a Wavefront output plugin that sends you data to the Wavefront proxy.
    - Monitor applications by following the steps in one of the [Application Instrumentation](integrations_list.html#application-instrumentation) integrations - or use one of them as an example for your application.
- **Cloud metrics (3)** are available through one of the our cloud integrations. There's no need to install or set up a proxy.
- **Special cases** don't readily fit into one of the use cases above. But because the Wavefront data format is simple, it's straightforward to get any time series metrics into Wavefront. For example:
  - Customers with a metrics pipeline that already collects data might be interested in Wavefront for visualization and alerting. Those customers can send their data to the Wavefront proxy in one of the supported data formats.
  - Customers with log files or similar data might use the [log data custom integration](integrations_log_data.html). If your data are in a supported format, Wavefront can pull them from logs and present them for analysis.

## Step 2: Use the Simplest Integration Path for Your Use Case

You might be able to use an in-product integration or custom integration. But even without an integration, it's straightforward to get your metrics into Wavefront. Wavefront accepts data in [Wavefront data format](wavefront_data_format.html), Graphite data format, and OpenTSDB data format. See [Supported Data Formats](proxies.html#supported-data-formats).

### Infrastructure and Application Integration

For many of the use cases that center around infrastructure monitoring and alerting, you can follow these steps to get your data into Wavefront:
1. Check whether an in-product integration for your use case exists. See the [complete list of integrations](integrations_list.html).

   **Note** If no in-product integration exists for your data source, check whether we have a [custom integration](integrations.html#in-product-and-custom-integrations) that gives step-by-step instructions.
2. Use the Setup steps in the integration to get data flowing from your application to Wavefront.
    As part of the setup, the integration lets you pick a proxy or it installs a proxy for you.
3. If no integration exists, you can send your metrics to a collector agent such as Telegraf or collectd.
    Wavefront supports integrations for many custom collectors. The collector agent can send your data to the Wavefront proxy.

    Some collector agents, such as Telegraf, include an output plug-in for Wavefront. You add a configuration file to Telegraf that specifies which data you want to get from which host, and select the proxy to send the data to.

![data flow](images/data_flow.png)

    Many of the in-product integrations include examples for Telegraf input plugin configuration.
    * The Active Directory integration is an example for a Windows Telegraf input plugin.
    * The Mesos integration is an example for an environment where both primary and secondary server have to have Telegraf input plugins.
    * The JBoss AS integration is an example for a Linux Telegraf plugin that uses Jolokia.

### Code Instrumentation

Certain use cases don't center around infrastructure data like CPU and memory, but involve instrumenting an application. Some customers collect custom metrics, others might be interested in business monitoring, for example, in collecting customer data such as website interactions.

* Wavefront supports integrations for several popular programming languages. For example, you can create a Java Wavefront Reporter to use DropWizard metrics.
* Wavefront provides SDKs in Go, Java, Python, and Ruby that allow you to send metrics from applications written in Go and Java. See [Wavefront API SDKs](wavefront_api.html#api-sdks) for links to the different SDKs.

For application instrumentation use cases, you can follow these steps:
1. Check whether you can use one of the existing code instrumentation integrations, and follow the Setup steps.
2. Otherwise, follow these steps:

   1. Set up a Wavefront Proxy. If you have a proxy installed in your environment, consider using that - or you can install a new proxy. See [Installing and Managing Proxies](proxies_installing.html)
   2. Send the metrics you're interested in to the Wavefront proxy at port 2878 in a format that Wavfront supports. See [Supported Data Formats](proxies.html#supported-data-formats)

### Metrics from a Cloud Provider

Cloud integrations use a different process than other integrations. You log in to the cloud service, and give Wavefront read access to the metrics that you're interested in.

Wavefront supports integrations for the most popular cloud services. This doc set has customization information for [AWS Metrics Integration](integrations_aws_metrics.html) and [AWS ECS Integration](integrations_aws_ecs.html).

### Special Use Cases

Even if your use case doesn't fit the examples above, you can still get your time-series metrics into Wavefront.

If your company already has a custom metrics pipeline, follow these steps:

1. Convert your data into one of the [supported data formats](proxies.html#supported-data-formats).
2. Send the data to a Wavefront proxy. You can use one proxy or a set of proxies behind a load balancer in most situations.

If you're interested in sending log files to Wavefront, you can use use the Filebeat Log Data in-product integration, and customize the process as discussed in [Log Data Metrics Integration](integrations_log_data.html)

**Note** For some use cases, for example some integrations that use collectd instead of Telegraf as the collection agent, we give you the setup instructions in the documentation. See [Integrations Pages](label_integrations.html) for all topics related to integrations.




## Step 3 Use Wavefront for Visualization and Alerting.

Once data is flowing, you can use Wavefront for visualization and alerting.

1. Many integrations include dashboards that collect commonly used metrics.
2. You can customize existing dashboards or create charts from scratch and add them to your own dashboard.
3. Optionally, you can add alerts to your charts and send them to alert targets such as Pagerduty or a custom Webhook target.
