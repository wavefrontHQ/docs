---
title: "Tutorial: Getting Host, Application, and Custom Data into Wavefront"
tags: [getting started, data, proxies, integrations, tutorials]
sidebar: doc_sidebar
permalink: tutorial_proxy_data_ingestion.html
summary: Learn about how to get data into Wavefront with the Wavefront proxy and Telegraf collector agent.
---
The major components of Wavefront include the Wavefront SaaS application, which facilitates economies of scale for deployment, flexibility, and time to value and the Wavefront proxy. The Wavefront proxy is the interface to collector agents, which instrument hardware and software applications. The Wavefront application can also collect metrics directly from external metrics services such as those provided by Amazon Web Services. The diagram below depicts each of these components.

![Wavefront architecture](images/wavefront_architecture.png)

To get data into Wavefront you either install a Wavefront proxy and collector agent or set up an Amazon Web Services cloud integration. For both methods you need [Proxy Management permission](permissions_overview.html) which your Wavefront administrator can grant.

To get data into Wavefront, you either install a Wavefront proxy and collector agent or set up an Amazon Web Services (AWS) cloud integration.  Here we focus on using a Wavefront proxy and Telegraf agent for data ingestion. For the AWS version, see [Tutorial: Getting Amazon Web Services Data into Wavefront](tutorial_aws_data_ingestion.html). Once you have data flowing, we visit the Metrics Browser to view the metrics and create a dashboard of the Telegraf metrics. 
 
## Install a Wavefront Proxy and Telegraf Collector Agent
Before metrics can begin streaming to Wavefront from a host, application, or service you must add a Wavefront proxy to your machine. The Wavefront application has a wizard that guides you through installing a Wavefront proxy and a Telegraf collector agent. To run the wizard:
 
 1. Open the Wavefront application UI.
 1. Select **Browse > Proxies**.
 1. Select **Add > New Proxy** at the top of the filter bar. The Populate Your Data screen displays.
 1. Under **WAVEFRONT PROXY**, click Add Now <i class="fa fa-arrow-right"/>. A script displays that runs a Wavefront CLI command to install a Wavefront proxy on your host.
    1. Copy the script and run on your host.
    1. When the installation completes, click **Next**. The screen reports `Found and registered <hostname>`.
    1. Click **Next**. Instructions for running a script to install the Telegraf collector agent display.
    1. Copy the script and run on your host.
    1. Click **Next**, then **Done** twice. The Proxies page displays. Verify that your proxy is listed.
 1. Let's look at the data that Telegraf is collecting. Select **Browse > Metrics** to open the Metrics Browser.
    1. In the Metrics field, type **cpu.usage**. The `cpu.usage` folder displays.
    1. Click the folder to display Telegraf CPU metrics.
   1. Click **Create Dashboard** to quickly create a dashboard of charts for the metrics.  (To complete this task you need [Dashboard Management permission​](permissions_overview.html).
    1. In the URL field, type **telegraf-cpu-dashboard** and in the Name field, type **Telegraf CPU Dashboard**.
    1. Click **Create**. A dashboard containing charts of each of the CPU metrics displays.
 1. In the time bar, click 10m: ![10m](images/10m.png#inline). The Telegraf CPU dashboard displays CPU metrics. If you hover over the bottom chart, the legend displays the `cpu.usage.user` metric for each core, in this case cpu0 and cpu1, and cpu.total.


## Next Steps

 After you have data flowing into Wavefront, see [Tutorial: Getting Started](tutorial_getting_started.html) to learn how to
 develop charts and dashboards to visualize your data and alerts that notify you when anomalous values occur.
 
{% include shared/tutorial_next_steps.html %}

