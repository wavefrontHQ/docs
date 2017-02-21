---
title: Introduction to Wavefront
tags: [getting_started]
sidebar: doc_sidebar
permalink: introduction.html
summary: This is an introduction to the Wavefront platform.
---
Wavefront is a high performance streaming analytics platform designed for monitoring and optimization.  The service is
unique in its ability to scale to very high data ingestion rates and query loads. The result is a technology stack
unique in its ability to scale horizontally while providing access to all of the granular (not aggregated) data
collected for all time.

The major components of Wavefront include the **Wavefront SaaS application**, which facilitates economies of scale for
deployment, flexibility, and time to value and the **Wavefront proxy**.  The Wavefront proxy is the interface to
**collector agents**, which instrument hardware and software applications. The Wavefront application can also ingest metrics
directly from external services such as Amazon Web Services. The diagram below depicts each of these components.

![Wavefront architecture](images/wavefront_architecture.png)

It's possible to have several data centers from different locations feeding data into Wavefront versus traditional on
premise solutions which can only provide a view of one location at a time.  At a high level, the setup process typically
consists of configuring collectors to send data to one or more Wavefront proxies and then configuring the Wavefront
proxies to forward this data to the Wavefront application.

The following sections describe these components in more detail.

## Wavefront Application

The Wavefront application has the following components:

-   user interface
-   REST API
-   query layer
-   compute layer
-   storage layer
-   data ingestion layer

The **user interface** (UI) is displayed to a browser, and all queries and computations are processed within the
query and compute layers in the Wavefront application.  You log into the Wavefront UI via a standard web browser in many cases
using an SSO solution.  One unique feature of the UI is the ability to display charts with data over any range of time
(e.g. over an entire year). Another important architectural feature of Wavefront is the ability for custom applications
to access Wavefront using the Wavefront **REST API**.  All actions within the UI can be accessed through the API.

Each of the layers can be scaled out horizontally to accommodate different use cases, data quantities, and
ingestion rates.

One of Wavefront's differentiators is the [Wavefront Time Series Query Language](time_series_language_reference), which
allows you to harness the power of the platform to design your own key performance indicators from all of your metric
data. The ts() language has support for sophisticated statistical functions and can be used to construct simple and
complex queries across multiple metrics/sources leveraging any combination of ts() functions (which include arithmetic
operators, aggregate functions, time functions, filtering operators, conditional functions, etc.). The primary job of
the **query layer** is to execute ts() language queries in the most efficient means possible. The query layer is
extremely flexible and optimized to scale to the enormous data volumes that Wavefront collects and maintains. This layer
is optimized to avoid unnecessary calls on the storage layer, and to ensure a very fast "speed of thought" response
time. Queries can be used to drive a chart or an alert. An alert can be used to notify an individual or a group
within your company about a particular condition that has been met.  For instance, you may want to alert operations if a
server goes down. The alerting functionality integrates with services such as PagerDuty to notify the appropriate
person or group in such a situation.

The **compute layer** combines points of data to display within a single pixel (depending on screen resolution)
according to the summarization method that is most appropriate for your use case. For example, you may want to compare
your data center's performance between two different years during the holiday period. All calculations are done on
the raw data set to ensure you get the most accurate representation of your query.

The **storage layer** is designed to be elastic to accommodate an ever-changing number of metrics and sources.  There is
no fixed limit on the amount of data that can be stored in the storage layer.

The **data ingestion layer** has been designed to accommodate extremely high data rates (in excess of 1 million points
per second).  It can be scaled appropriately depending on your expected data rates and growth plans.  Like the storage
layer, the data ingestion layer can have its capacity increased as you grow your usage of Wavefront.

{% include help/proxies_intro.md %}

In initial deployments you can start with one Wavefront proxy. However, to enable fault tolerance and higher data rates,
production environments more typically employ a load balancer sending data to multiple proxies:

![Wavefront architecture load balanced](images/wavefront_architecture_lb.png)

## Collector Agents

Collector agents collect metrics from monitored systems and send them to the Wavefront proxy. Monitored systems can include
hosts, containers, and many different types of applications. Wavefront supports many standard collector agents, including
[Telegraf](https://github.com/influxdata/telegraf), [Docker cAdvisor​](https://github.com/google/cadvisor), and others.

{% include links.html %}
