---
title: "What is Wavefront?"
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_introduction.html
summary: Learn about the Wavefront platform.
---
Wavefront is a high-performance streaming analytics platform that helps you monitor and optimize your environment. Wavefront is unique because it can scale to very high data ingestion rates and query loads. That means you can collect data from many services and sources across your entire application stack, and can still look at details for earlier data collected by Wavefront.

Here's an overview of the components, and of the Wavefront data ingestion pipeline.

## Components

Wavefront has these main components:
* The **Wavefront service** runs the metrics collection engine.
* The **Wavefront proxy** forwards data to the Wavefront service in a secure, fast, and reliable way.
  - A **collector agent** such as Telegraf can send data to the proxy or
  - You can send your metrics directly to the proxy -- as long as the data is in one of the supported data formats. For example, if your environment already includes a metrics collection infrastructure, you can do some pre-processing on the data and send them to the proxy.

![Wavefront architecture](images/wavefront_architecture.svg)

## Wavefront Service

The Wavefront service runs in the cloud and is highly available to protect your data at any time.  You can access the service using one of the interface. The architecture includes several layers. 

## Wavefront Service Architecture

The Wavefront service has the following components:

-   query layer
-   compute layer
-   storage layer
-   data ingestion layer

Each layer scales to accommodate different use cases, data quantities, and ingestion rates.

- **Query Layer** - The **query layer** is to execute [Wavefront Query Language](query_language_reference.html) queries. The query layer is optimized to scale to the enormous data volumes that Wavefront collects and maintains.

  The Wavefront Query Language allows you to set up your own key performance indicators from all of your metric data. The query language supports sophisticated statistical functions. You can construct simple and complex queries across multiple metrics and sources and leverage any combination of functions. Functions include arithmetic operators, aggregate functions, time functions, filtering operators, conditional functions, etc.

- **Compute Layer** - The **compute layer** combines points of data to display within a single pixel (depending on screen resolution). All calculations are done on the raw data set to ensure you get the most accurate representation.

- **Storage Layer** - The **storage layer** can accommodate an ever-changing number of metrics and sources. There is no fixed limit on the amount of data that can be stored in the storage layer.

- **Data Ingestion Layer** - The **data ingestion layer** can accommodate data rates in excess of 1 million points per second.  This layer can be scaled depending on expected data rates and growth plans.  You can increase the capacity of both the storage layer and the data ingestion layer as your Wavefront usage grows.

### Wavefront Interfaces

You can interact with Wavefront from your web browser or using the REST API:

* The **user interface** (UI) is displayed in a browser. You log in to the Wavefront UI from a standard web browser, in many cases using an SSO solution.  One unique feature of the UI is that it can display charts with data over any range of time (e.g. over an entire year).

* The **REST API** allows custom applications to access all Wavefront UI actions.

## Wavefront Proxy

The Wavefront proxy allows you to send your data to Wavefront in a secure, fast, and reliable manner. The proxy works
with the Wavefront service to ensure end-to-end flow control. When it detects network connectivity issues, the proxy
queues metrics in memory and on disk. Once connectivity is restored, the proxy replays queued metrics but prioritizes
real-time traffic. There are many ways to  [configure](proxies_configuring.html) the proxy to tune this behavior.

The [proxy preprocessor](proxies_preprocessor_rules.html) allows you to correct errors in the metrics coming from your source, reducing the number of invalid metrics which would otherwise be rejected by the proxy.

The proxy generates its own [internal metrics](wavefront_monitoring.html) for easy monitoring of the pipeline within Wavefront. In initial deployments, you can start with one Wavefront proxy. To enable fault tolerance and higher data rates, production environments typically use a load balancer that sends data to multiple proxies:

![Wavefront architecture load balanced](images/wavefront_architecture_lb.svg)



## How to Get Data Into Wavefront

You have many choices for getting data into Wavefront. You can combine them to monitor all data sources in your environment.
* Configure Wavefront to access the data in your cloud environment. The result is direct ingestion of cloud services data such as Amazon Web Services or Google Cloud Platform.
* Set up a collector agent such as Telegraf to gather data from your applications and send that data to the Wavefront proxy. Wavefront supports many standard [collector agents](integrations.html), including Telegraf, Docker cAdvisor​, and others. You can use a collector agent integration install the agent and proxy for you.
* Instrument your applications using the Wavefront metrics library and send the data to the Wavefront proxy.
* Send data directly to Wavefront. If your environment already has a metrics infrastructure, you can do some pre-processing on the data so they correspond to the Wavefront Data Format, and send them to the Wavefront proxy.
