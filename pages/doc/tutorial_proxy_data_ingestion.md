---
title: "Tutorial: Getting Started with Host, Application, and Custom Data"
tags: [getting started, data, proxies, integrations, tutorials]
sidebar: doc_sidebar
permalink: tutorial_proxy_data_ingestion.html
summary: Learn how to get Telegraf host metrics into Wavefront.
---

Getting your host, application, and custom data into Wavefront is quick and easy. Wavefront's SaaS platform lets you build your monitoring solution without installing and configuring complex software. You ingest metrics data using one or more collector agents and the Wavefront proxy. A collector agent, such as [Telegraf](integrations_telegraf.html) or [Docker cAdvisor](integrations_cadvisor.html), collects metrics such as capacity and usage from your systems, and outputs them to storage, in this case the Wavefront proxy. The Wavefront proxy works with the Wavefront server to ensure security and end-to-end flow control. You can also ingest data from AWS using Wavefront's AWS cloud integration. The diagram below depicts each of these components.

![Wavefront architecture](images/wavefront_architecture.png)

Here we focus on using the Wavefront proxy and Telegraf agent for data ingestion. Once you have data flowing, you visit the Metrics browser to view the metrics and finally you create a dashboard of some Telegraf metrics.

For the AWS version, see [Tutorial: Getting Started with Amazon Web Services Data](tutorial_aws_data_ingestion.html).
 
## Install the Wavefront Proxy and a Telegraf Collector Agent

Before metrics can begin streaming to Wavefront from a host, application, or service you must add a Wavefront proxy to your machine. The Wavefront application has a New Proxy wizard that guides you through installing the Wavefront proxy and a Telegraf collector agent. To complete this task you need [Proxy Management permission](permissions_overview.html), which your Wavefront administrator can grant.

To run the wizard:
 
 1. Open the Wavefront application UI.
 1. Select **Browse > Proxies**.
 1. Select **Add > New Proxy** at the top of the filter bar. The Populate Your Data screen displays.
 1. Under **WAVEFRONT PROXY**, click Add Now <i class="fa fa-arrow-right"/>. A script displays that runs a Wavefront CLI command to install a Wavefront proxy on your host.
    1. Copy the script and run on your host.
    1. When the installation completes, click **Next**. The screen reports `Found and registered <hostname>`.
    1. Click **Next**. Instructions for running a script to install the Telegraf collector agent display.
    1. Copy the script and run on your host.
    1. Click **Next**, then **Done** twice. The Proxies page displays. Verify that your proxy is listed.
 1. Let's look at the data that Telegraf is collecting. Select **Browse > Metrics** to open the Metrics browser.
    1. In the Metrics field, type **cpu.usage**. The `cpu.usage` folder displays.
    1. Click the folder to display Telegraf CPU metrics.

## Create a Dashboard

It's more interesting to visualize the CPU metrics in charts. Wavefront gives you an easy way to quickly create a dashboard of charts. To complete this task you need [Dashboard Management permission​](permissions_overview.html).

 1. In the Metrics browser, click **Create Dashboard** to create a set of charts of the CPU usage metrics.
    1. In the URL field, type **telegraf-cpu-dashboard** and in the Name field, type **Telegraf CPU Dashboard**.
    1. Click **Create**. A dashboard containing charts of each of the CPU metrics displays.
 1. In the time bar, click 10m: ![10m](images/10m.png#inline). The Telegraf CPU dashboard displays CPU metrics. If you hover over the bottom chart, the legend displays the `cpu.usage.user` metric for each core, in this case cpu0 and cpu1, and cpu.total.


## Next Steps

After you have data flowing into Wavefront, see [Tutorial: Getting Started](tutorial_getting_started.html) to learn how to develop charts and dashboards to visualize your data and alerts that notify you when anomalous values occur.
 
{% include shared/tutorial_next_steps.html %}

