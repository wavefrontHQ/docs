---
title: Getting Data into Wavefront
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: data_into_wavefront.html
summary: Learn how to get data into Wavefront.
---
Wavefront customers use Wavefront to visualize their metric and instrument them with alerts. How you get your data into Wavefront depends on the use case and on whether you use an in-product integration, custom integration, collector agent, instrumented application, or other approach.

## Step 1: Understand Your Use Case
Where your metrics are coming from and what kind of data you're interested in affects how you get data into Wavefront. Here are the main use cases:
- **Infrastructure customers** are interested in infrastructure metrics.
   - Some customers work with host metrics, such as CPU, memory, etc. to find bottlenecks, explore trends, and troubleshoot their environment. These customers often use Telegraf or another open source solution to extract the data they're interested in, and send those data to the Wavefront proxy on port 2878.
   - Many other customers explore app-driven infrastructure date, for example, by sending metrics from NGNIX, MySQL, and similar sources into Wavefront.
- **App and business customers** want to collect application data, either from the backend or by monitoring user behavior. How these customers proceed several factors:
    - Use one of the collector agents, such as Telegraf, to get data into Wavefront. Telegraf includes a Wavefront output plugin
    - Monitor applications by following the steps in one of the Code Instrumentation integrations - or use them as an example for your application.
    - Even if you don't see an integration, you can send data to the Wavefront  no predefined library, you can data, converting them to Wavefront format, and sending them to the Wavefront proxy on port 2878.
- **Cloud customers** collect data using one of the our cloud integrations. There's no need to set up a proxy.
- **Special cases** mean customers who don't readily fit into one of the use cases above.
  - Customers with a metrics pipeline that already collects data might be interested in Wavefront for visualization and alerting. Those customers can send those data to the Wavefront proxy in one of the supported data formats.
  - Customers with log files or other data can use the same approach. If the data are in a supported format, you can send them to Wavefront.

## Step 2: Find the Simplest Integration Path

To integrate with Wavefront, you might be able to use an in-product integration or custom integration. But even without an integration, it's straightforward to get your metrics into Wavefront.

### Infrastructure Instrumentation

For many of the use cases that center around infrastructure monitoring and alerting, you can follow these steps to get your data into Wavefront:
1. Check whether an in-product integration for your use case exists. See the
2. Use the Setup steps to get data flowing from your host or application to the Wavefront service.
    As part of the setup, the integration lets you pick a proxy or it installs a proxy for you.
3. If no integration exists, you can send your metrics to a collector agent such as Telegraf or collectd.
    Wavefront supports integrations for several custom collectors. Those collector integrations send data to the Wavefront proxy for you.


### Instrumenting your Application to Send Data to Wavefront

Certain use cases don't center around infrastructure data like CPU and memory, but involve instrumenting an application to collect custom metrics. Other customers might be interested in business monitoring, for example collecting customer data such as website interactions.

For those use cases, you can follow these steps:
1. Check whether you can use one of the existing code instrumentation integrations such as Java, Go, or StatsD, and follow the Setup steps.
2. Otherwise, follow these steps:
  1. Set up a Wavefront Proxy. If you have a proxy installed in your environment, consider using that - or you can install a new proxy. See [Installing and Managing Proxies](proxies_installing.html)
  2. Send the metrics you're interested in to the Wavefront proxy at port 2878 in a format that Wavfront supports. See [Supported Data Formats](proxies.html#supported-data-formats)


### Getting Metrics from a Cloud Provider

To get metrics from a cloud provider, you use one of the pre-packaged integrations to get data flowing and set up dashboards, charts, and alarms. This doc set has additional information for [AWS Metrics Integration](integrations_aws_metrics.html) and [AWS ECS Integration](integrations_aws_ecs.html).

## What's the Big Picture?

You can use Wavefront for any time series metrics, even if you're already collecting those metrics or if you want to view log data. The data flow is similar in all cases:

![data flow](images/data_flow.png)

1. The metrics originate with your infrastructure or application.
2. You can send the metrics directly to the Wavefront proxy and the proxy forwards them to the Wavefront service. In that case, you have to ensure that they one of the supported data formats.
3. You can also send the data to a collector agent such as Telegraf.
   * For Telegraf, you can use the Telegraf input plugin for your data source and the Wavefront Telegraf output plugin.
   * Wavefront includes integrations for many other collector agents.

Depending on your use case, you might be able to use an in-product integration, a collector integration, or send your metrics directly.

## How Do You Get Started?

If you have time series metrics, you can get those metrics into Wavefront. The exact process depends on your use case. It's a little easier if a Wavefront integration or a Telegraf plugin is available for your data source -- but after metrics are flowing, all users customize the Wavefront integration.

### Step 1: Make Sure You Have a Wavefront Proxy

The Wavefront proxy makes your data pipeline resilient, so you always send your data to a Wavefront proxy. You don't need a proxy for each data source - in many cases one proxy or two proxies behind a load balancer can ingest data from all your data sources. See [Proxy Deployment Options](proxies.html#proxy-deployment-options) and [Installing and Running Wavefront Proxies](proxies_installing.html).
**Note**: If you end up using an integration, the integration can install the proxy for you if you don't have one in your environment.

### Step 2: Check For An Integration For Your Data Source

Using an integration is the easiest way of getting data into Wavefront. Wavefront adds new integrations all the time. See [List of Wavefront Integrations](integrations_list.html). To set up the integration:
1. In Wavefront, click **Integrations** and select your integration.
2. Click **Setup** and follow the instructions on screen.

**Note** If no in-product integration exists for your data source, check whether we have a [custom integration](integrations.html#in-product-and-custom-integrations).

### Step 4 Use a Data Collector Integration

If you want to monitor infrastructure metrics, you can most likely send your data to a collector agent and configure the collector agent to sent them on to the Wavefront proxy, which will forward them to the Wavefront Service.

Wavefront supports many collector agent in-product integrations. Some of them already have a Wavefront output plug-in, and for others, we set things up for you.


### Instrumenting Your Applications

You have several choices for instrumenting your application.
* Wavefront supports integrations for several popular programming languages. For example, you can create a Java Wavefront Reportor to use DropWizard metrics exactly as you normally would.
* Wavefront provides SDKs in Go, Java, Python, and Ruby that allow you to send metrics from applications written in Go and Java. See [Wavefront API SDKs](wavefront_api.html#api-sdks) for links to the different SDKs.If no integration exists for your use case,


## Use Integrations for Infrastructure and Applications

For many of the use cases you can take advantage of one of the Wavefront integrations. In most cases, the integration installs required components and gives detailed instructions on configuration file changes in the **Setup** tab. Many integrations use a Wavefront proxy and a Telegraf agent. For those agents, Setup usually goes like this:
1. Checks whether a Wavefront proxy is installed in the environment.
  * If no proxy is installed, installs it.
  * If a proxy is installed, allows you to select it or to install an additional proxy.
1. Installs a collector agent (Telegraf) if it's not running.
   Not all integrations use a collector agent.
2. Provides instructions for setting up the environment. For example, you might be told to create and edit a configuration file for the Telegraph plugin.

Most integrations include one or more predefined dashboards with charts that show information that's usually of interest for the application. For example, users of a web service integration need different information than users who monitor a Linux host. You can clone and modify those dashboards, create additional dashboards, create alerts, and so on.

## Use a  Cloud Integrations

Cloud integrations use a slightly different process than other integratinos. You log in to the cloud service and you can then specify the data that you're interested in.

Wavefront supports integrations for the most popular cloud services.


## Other Integrations

Wavefront supports many additional integrations, for example container integrations. See [List of Wavefront Integrations](integrations_list.html) - or check out the integrations from within the product.

For some use cases, for example some integrations that use collectd instead of Telegraf as the collection agent, we give you the setup instructions in the documentation. See [Integrations Pages](label_integrations.html) for all topics related to integrations.

## Integrate Your Own Metrics

If no integration exists for your use case, you need to perform these tasks:
1. Check whether a Wavefront Proxy is installed in your environment, and install one if there isn't.
2. Decide how to make data available to Wavefront, and send them to the proxy.

### Installing the Wavefront Proxy

[Installing and Running Wavefront Proxies](proxies_installing.html) explains how to install the proxy.
** Note: ** One proxy can ingest metrics from different hosts or applications, you don't have to install a proxy for each item you want to monitor.

### Making Data Available to Wavefront

Wavefront accepts data in [Wavefront data format](wavefront_data_format.html), Graphite data format, and OpenTSDB data format. See [Supported Data Formats](proxies.html#supported-data-formats) and see also [Wavefront Data Naming](wavefront_data_naming.html) for some best practices.

If you want to monitor your infrastructure, you can send the data to a collector agent and from there to the Wavefront proxy.

## Step 3 Use Wavefront for Visualization and Alerting.

Once data is flowing, you can use Wavefront for visualization and alerting.

1. Many integrations include dashboards that collect commonly used metrics.
1. You can customize existing dashboards or create charts from scratch and add them to your own dashboard.
3. Optionally, you can add alerts to your charts and send them to alert targets such as Pagerduty or a custom webhook target.
