---
title: Metric Types
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: metric_types.html
summary: Learn about gauges, counters, delta counters, histograms, and spans.
---

 VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) supports monitoring time series, histograms, and traces.
* Each **time series** consists of numeric data points for a metric, for example, CPU load or failed network connections. Time series can use one of the [supported data formats](wavefront_data_format.html#supported-data-formats-for-metrics).
   The type of data that you’re collecting determines the type of metric. Operations for Applications supports gauges, counters, delta counters, and more.

* **[Histograms](proxies_histograms.html)** let you compute, store, and use distributions of metrics rather than single metrics. Histograms are useful for high-velocity metrics about your applications and infrastructure–-particularly metrics that are gathered across many distributed sources.
* **[Distributed tracing](tracing_basics.html)** enables you to track the flow of work that is performed by an application as it processes a user request. We support the OpenTracing standard. You can either visualize and examine traces coming from a 3rd-party system such as Jaeger or Zipkin, or instrument your application for tracing using one of our SDKs.

{% include tip.html content="Wavefront co-founder Clement Pang wrote [a Medium article](https://medium.com/@clementpang/thoughts-from-the-front-line-why-wavefront-3d807e2106f) that explains different metric types and why they are so powerful." %}

## Summary of Metric Types

### Metric Types per Data Type

The following table gives an overview of metric types. We introduce each type in more detail below.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Metric Type</th><th width="40%">Description</th><th width="40%">Example</th></tr>
</thead>
<tr>
<td>Gauge</td>
<td>Shows current value for each point in time.</td>
<td>CPU load, network connections.</td>
</tr>
<tr>
<td>Counter</td>
<td>Shows values as they increase (and decrease).</td>
<td>Number of failed connections, registered users.</td>
</tr>
<tr>
<td>Delta counter</td>
<td>Useful for monitoring bursty traffic in a Function-as-a-Service (serverless) environment. </td>
<td>Shows how many times a FaaS function executed (or failed). </td>
</tr>
<tr>
<td>Histogram</td>
<td>Supports computing, storing, and using distributions of metrics that use our histogram format. </td>
<td>Useful for very high frequency data. See the <a href="proxies_histograms.html">discussion of histograms</a>. </td>
</tr>
<tr>
<td>Trace</td>
<td>A trace shows you how a request propagates from one microservice to the next in a distributed application. The basic building blocks of a trace are its spans.</td>
<td>You can think of a trace as a tree of related spans. The trace has a unique trace ID, which is shared by each member span in the tree.</td>
</tr>
<tr>
<td>Span</td>
<td>Spans are the fundamental units of trace data. Each span corresponds to a distinct invocation of an operation that executes as part of the request.</td>
<td>For example, in our BeachShirts sample application, we have the <code>beachshirts.shopping</code> operation, which includes many invocations of the <code>Printing.getAvailableColors</code> span. </td>
</tr>
</tbody>
</table>

### Metric Types per Retention Period

With the 2024-07 release, we introduce **ephemeral** metrics, which have a shorter [retention period](terms_of_service.html#data-retention). [Converting](metrics_managing.html#change-the-retention-period-of-metrics) persistent metrics to ephemeral metrics improves the [query performance](query_language_performance.html) and reduces the [cardinality](cardinality.html).

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Metric Type</th><th width="40%">Description</th></tr>
</thead>
<tr>
<td>Persistent</td>
<td>18 months of data retention. By default, all ingested metrics are persistent but are convertible. Counters are persistent and not convertible. </td>
</tr>
<tr>
<td>Ephemeral</td>
<td>28 days of data retention.</td>
</tr>
</tbody>
</table>

## Gauges

A gauge shows the current value for each point in time. Think of a thermometer that shows the current temperature or a gauge that shows how much electricity your Tesla has left.

Many metrics are gauges. For example, our internal metrics include `~alert.checking_frequency.{id}` and `~alert.query_time.{alert_id}`.

## Cumulative Counters

Cumulative counters (counters) show information over time. Think of a person with a counter at the entrance to a concert. The counter shows the total number of people that have entered so far.

Counter metrics usually increase over time but might reset back to zero, for example, when a service or system restarts. Users can wrap [**rate()**](ts_rate.html) around a counter if they want to ignore temporary 0 values and see only the positive rate of change. [Using Cumulative Counters](delta_counters.html#using-cumulative-counters) gives several examples.

For example, `~metric.new_host_ids` and `~query.requests` are internal metrics that are counters.

## Delta Counters

[Delta counters](delta_counters.html)  bin to a minute timestamp and treat write operations to the same bin as deltas. They are well suited for the kind of bursty traffic you typically get in a Function-as-a-Service environment. Many functions execute simultaneously and it's not possible to monitor bursty traffic like that without losing metric points to collision.

For example, instead of one person with a counter standing at a single concert entrance, several people count, each at one entrance gate. Eventually the results from the counters can be added for total attendance. In the same way, Operations for Applications can aggregate delta counter information.

To have the Operations for Applications service treat a metric as a delta counter, you have several choices:
* Use the `cs()` instead of the `ts()` function.
* Add a delta character prefix to the metric.


[Using Delta Counters](delta_counters.html#using-delta-counters) gives details and best practices.


## Histograms

Operations for Applications can receive and store metrics at 1 point per second per unique source. However, some scenarios generate metrics even more frequently. Suppose you are measuring the latency of web requests. If you have a lot of traffic at multiple servers, you may have multiple distinct measurements for a given metric, timestamp, and source. Using "normal” metrics, we can’t measure this.

To address high frequency data, we supports histograms – a mechanism to compute, store, and use distributions of metrics. A histogram is a distribution of metrics collected and computed by the Wavefront proxy. [Sending Histogram Distributions](proxies_histograms.html) describes the histogram format, histogram ports, and some examples.

![histogram](images/histogram.png)

## Traces and Spans

We follow the OpenTracing standard for representing and manipulating trace data.

* A [**trace**](trace_data_details.html#traces) represents an individual workflow in an application. A trace shows you how a particular request propagates through your application or among a set of services.

* [**Spans**](trace_data_details.html#spans)  are the individual segments of work in the trace. A  trace consists of one or more spans. Each span represents time spent by an operation in a service (often a microservice).

Because requests normally consist of other requests, a trace actually consists of a tree of spans.


## Learn More!

Search this doc set for details on any of the metric types, or read this:
* [Metrics and the Metrics Browser](metrics_managing.html) examines the structure of a metric and explains how to use the Metrics Browser.
* [Cumulative Counters and Delta Counters](delta_counters.html) discusses the 2 kinds of counters that we support and includes examples for each type.
* [Histograms](proxies_histograms.html) are useful for distribution of metrics in high-velocity environment. We support a set of [query language functions just for histograms](query_language_reference.html#histogram-functions).
* Our [Tracing UI](tracing_basics.html#visualize-distributed-tracing-data) lets you drill down from the service level to the individual spans and examine outliers to find bottlenecks.
