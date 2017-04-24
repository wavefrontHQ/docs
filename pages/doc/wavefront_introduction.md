---
title: Introduction to Wavefront
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_introduction.html
summary: Learn about the Wavefront platform.
---
Wavefront is a high performance streaming analytics platform designed for monitoring and optimization.  The service is
unique in its ability to scale to very high data ingestion rates and query loads. The result is a technology stack
unique in its ability to scale horizontally while providing access to all of the granular (not aggregated) data
collected for all time.

The major components of Wavefront include the **Wavefront SaaS application**, which facilitates economies of scale for
deployment, flexibility, and time to value and the **Wavefront proxy**.  The Wavefront proxy is the interface to
**collector agents**, which instrument hardware and software applications. The Wavefront application can also ingest
metrics directly from external services such as Amazon Web Services. The diagram below depicts each of these components.

![Wavefront architecture](images/wavefront_architecture.png)

It's possible to have several data centers from different locations feeding data into Wavefront versus traditional on
premise solutions which can only provide a view of one location at a time.  At a high level, the setup process typically
consists of configuring collectors to send data to one or more Wavefront proxies and then configuring the Wavefront
proxies to forward this data to the Wavefront application.

Let's delve into these Wavefront components.

## Wavefront Application

The Wavefront application has the following components:

-   user interface
-   REST API
-   query layer
-   compute layer
-   storage layer
-   data ingestion layer

The **user interface** (UI) is displayed to a browser, and all queries and computations are processed within the query
and compute layers in the Wavefront application.  You log into the Wavefront UI via a standard web browser in many cases
using an SSO solution.  One unique feature of the UI is the ability to display charts with data over any range of time
(e.g. over an entire year). Another important architectural feature of Wavefront is the ability for custom applications
to access Wavefront using the Wavefront **REST API**.  All actions within the UI can be accessed through the API.

Each of the layers can be scaled out horizontally to accommodate different use cases, data quantities, and ingestion
rates.

One of Wavefront's differentiators is the [Wavefront Query Language](query_language_reference.html), which allows you to
harness the power of the platform to design your own key performance indicators from all of your metric data. The query
language has support for sophisticated statistical functions and can be used to construct simple and complex queries
across multiple metrics/sources leveraging any combination of functions (which include arithmetic operators, aggregate
functions, time functions, filtering operators, conditional functions, etc.). The primary job of the **query layer** is
to execute Wavefront Query Language queries in the most efficient means possible. The query layer is extremely flexible
and optimized to scale to the enormous data volumes that Wavefront collects and maintains. This layer is optimized to
avoid unnecessary calls on the storage layer, and to ensure a very fast "speed of thought" response time. Queries can be
used to drive a chart or an alert. An alert can be used to notify an individual or a group within your company about a
particular condition that has been met.  For instance, you may want to alert operations if a server goes down. The
alerting functionality integrates with services such as PagerDuty to notify the appropriate person or group in such a
situation.

The **compute layer** combines points of data to display within a single pixel (depending on screen resolution)
according to the summarization method that is most appropriate for your use case. For example, you may want to compare
your data center's performance between two different years during the holiday period. All calculations are done on the
raw data set to ensure you get the most accurate representation of your query.

The **storage layer** is designed to be elastic to accommodate an ever-changing number of metrics and sources.  There is
no fixed limit on the amount of data that can be stored in the storage layer.

The **data ingestion layer** has been designed to accommodate extremely high data rates (in excess of 1 million points
per second).  It can be scaled appropriately depending on your expected data rates and growth plans.  Like the storage
layer, the data ingestion layer can have its capacity increased as you grow your usage of Wavefront.

In most cases before metrics can begin streaming to Wavefront from a host, application, or service you must add a
Wavefront proxy to your installation.

## Wavefront Proxy

The Wavefront proxy allows you to send your data to Wavefront in a secure, fast, and reliable manner. The proxy works
with the Wavefront server to ensure end-to-end flow control. When it detects network connectivity issues, the proxy
queues metrics in memory and to disk. Once connectivity is restored the proxy replays queued metrics but prioritizes
real-time traffic. There are many ways to [configure](proxies_configuring.html) the proxy to tune this behavior.

The [proxy preprocessor](proxies_preprocessor_rules.html) allows you to correct errors in metric definition, reducing the
number of invalid metrics which would otherwise be rejected by the proxy.

A proxy generates its own [internal metrics](wavefront_monitoring.html) for easy monitoring of the pipeline within Wavefront.
In initial deployments you can start with one Wavefront proxy. However, to enable fault tolerance and higher data rates,
production environments more typically employ a load balancer sending data to multiple proxies:

![Wavefront architecture load balanced](images/wavefront_architecture_lb.png)

## Collector Agent

Collector agents collect metrics from monitored systems and send them to the Wavefront proxy. Monitored systems can include hosts, containers, and many different types of applications. Wavefront supports many standard [collector agents](wavefront_integrations.html), including [Telegraf](integrations_telegraf.html), [Docker cAdvisor​](integrations_cadvisor.html), and others.


