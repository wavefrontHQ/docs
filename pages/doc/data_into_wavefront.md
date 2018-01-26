---
title: Getting Data into Wavefront
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: data_into_wavefront.html
summary: Learn how to get data into Wavefront.
---
Wavefront customers use Wavefront to visualize their metric and instrument them with alerts. How you get your data into Wavefront depends on the use case and on whether you use an in-product integration, custom integration, collector agent, instrumented application, or other approach.

## What's Your Use Case?
Where your metrics are coming from and what kind of data you're interested in affects how you get data into Wavefront. Here are the main use case:
- **Infrastructure customers** collect CPU, memory, and other metrics over time to find bottlenecks, explore trends, and troubleshoot their environment. These customers often use Telegraf or another open source solution to extract the data they're interested in, and send those data to the Wavefront proxy on port 2878.
- **App and business customers** want to collect application data, either from the backend or by monitoring user behavior. How these customers proceed depends on the language.
    - You can monitor Java applications using a Dropwizard library.
    - If there's no predefined library, you are responsible for extracting the data, converting them to Wavefront format, and sending them to the Wavefront proxy on port 2878.
- **Cloud customers** collect data using one of the our cloud integrations. There's no need to set up a proxy.

### Sending Infrastructure Data to the Wavefront Proxy With Telegraph

For many of the use cases that center around infrastructure monitoring and alerting, you can follow these steps to get your data into Wavefront:
{::comment}Should we recommend users get the Telegraf plugin for their infrastructure resource? {:/comment}
{::comment}Should we recommend collectd as an option?  {:/comment}
1. Make sure you have a Wavefront Proxy running in your environment. See [Installing and Running Wavefront Proxies](https://docs.wavefront.com/proxies_installing.html)
2. Set up a collector agent such as Telegraf or collectd.
{::comment}Can I just use the Telegraf or collectd integration? Or will I usually want to use a Telegraf plug-in for my type of infrastructure? {:/comment}
3. Set up Telegraph so it sends data to the Wavefront proxy .
{::comment}Can I just use the Telegraf or collectd integration? Or will I usually want to use a Telegraf plug-in for my type of infrastructure? {:/comment}
4. Create a dashboard and add charts to view your data.
5. Optionally add alerts to your dashboards.

### Instrumenting your Application to Send Data to Wavefront

Certain use cases don't center around infrastructure data like CPU and memory, but involve instrumenting an application to collect custom metrics. Examples are XYZ, and also business monitoring, which might involve collecting customer data such as website interactions.

For those use cases, you can follow these steps:

TBD

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

#### Telegraf
* Telegraf has an output plugin for Wavefront, and you can set it up to send data to your proxy.

**  If Telegraf already has an input plugin for the infrastructure platform or application you want to monitor, you can configure that input plugin to pull in the data you need.

** Otherwise, you can send your data to Telegraf in one of the supported formats.

#### Other Collector Agents
You can use other collector agents such as collectd to collect the data and send them to the Wavefront proxy. Wavefront includes in-product integrations for several collector agents. We also have supplemental instructions for using collectd with different metrics sources.

### Step 5 Instrument Your Applications

You have several choices for instrumenting your application.
* Wavefront supports integrations for several popular programming languages. For example, you can create a Java Wavefront Reportor to use DropWizard metrics exactly as you normally would.
* Wavefront provides SDKs in Go, Java, Python, and Ruby that allow you to send metrics from applications written in Go and Java. See [Wavefront API SDKs](wavefront_api.html#api-sdks) for links to the different SDKs.If no integration exists for your use case,


### Integrations for Infrastructure and Applications

For many of the use cases you can take advantage of one of the Wavefront integrations. In most cases, the integration installs required components and gives detailed instructions on configuration file changes in the **Setup** tab. Many integrations use a Wavefront proxy and a Telegraf agent. For those agents, Setup usually goes like this:
1. Checks whether a Wavefront proxy is installed in the environment.
  * If no proxy is installed, installs it.
  * If a proxy is installed, allows you to select it or to install an additional proxy.
1. Installs a collector agent (Telegraf) if it's not running.
   Not all integrations use a collector agent.
2. Provides instructions for setting up the environment. For example, you might be told to create and edit a configuration file for the Telegraph plugin.

Most integrations include one or more predefined dashboards with charts that show information that's usually of interest for the application. For example, users of a web service integration need different information than users who monitor a Linux host. You can clone and modify those dashboards, create additional dashboards, create alerts, and so on.

### Cloud Integrations

Cloud integrations use a slightly different process than other integratinos. You log in to the cloud service and you can then specify the data that you're interested in.

Wavefront currently supports integrations for the most popular cloud services.

**Note:** If no Wavefront integration exists yet for your cloud provider, you can use your cloud provider's API to put the data into Wavefront Format and send them directly to the Wavefront service. Cloud integrations do not use the Wavefront proxy.

### Other Integrations

Wavefront supports many additional integrations, for example container integrations. See [New and Changed Integrations](integrations_new_changed.html).

### Custom Integrations

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
