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
  - The proxy can also ingest metrics from your log files. See [Log Data Metrics Integration](http://docs-dev.wavefront.com/integrations_log_data.html)

![Wavefront architecture](images/wavefront_architecture.svg)

## Wavefront Service

The Wavefront service runs in the cloud and is highly available to protect your data at any time.  You can access the service using one of the interfaces. The architecture includes several layers.

### Wavefront Service Architecture

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

  Wavefront supports Chrome, Firefox, and Safari. Wavefront does not support Internet Explorer because of technical limitations of that browser.

* The [Wavefront REST API](wavefront_api.html) allows you to perform UI actions programmatically. The API is based on Swagger, so you can generate the client of your choice.


## How to Get Data Into Wavefront

You have many choices for [getting data into Wavefront](wavefront_data_ingestion.html). For an introduction, watch this video by Wavefront Co-Founder Clement Pang.

<p><a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_data_into_wavefront.png" style="width: 700px;" alt="getting data into wavefront"/></a>
</p>

Using Wavefront, you can monitor all data sources in your environment.

* Configure Wavefront to access the data in your cloud environment. The result is direct ingestion of cloud services data such as Amazon Web Services or Google Cloud Platform.
* Set up a collector agent such as Telegraf to gather data from your applications and send that data to the Wavefront proxy. Wavefront supports many standard [collector agents](integrations.html), including Telegraf, Docker cAdvisor​, and others. You can use a collector agent integration install the agent and proxy for you.
* Instrument your applications using the Wavefront metrics library and send the data to the Wavefront proxy.
* Send data directly to the Wavefront proxy. If your environment already has a metrics infrastructure, you can do some pre-processing on the data so they correspond to the Wavefront Data Format, and send them to the Wavefront proxy.
* Use direct ingestion. For some use cases, [direct ingestion](direct_ingestion.html) is the best approach. Consider the [proxy benefits](proxies.html#proxy-benefits) before you select direct ingestion.
* For high-velocity metrics, [Wavefront histograms](proxies_histograms.html) might be the best solution.
