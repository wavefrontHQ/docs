---
title: Metrics
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: metric_types.html
summary: Learn about the types of data Wavefront works with and where they're used.
---

Wavefront supports monitoring time series, histograms, and traces.
* Each **time series** consists of numeric data points for a metric, for example, CPU load or failed network connections. Time series can use one of the [supported data formats](wavefront_data_format.html#supported-data-formats-for-metrics).
   The type of data that you’re collecting determines the type of metric. Wavefront supports gauges, counters, delta counters, and more.

* **[Wavefront histograms](proxies_histograms.html)** let you compute, store, and use distributions of metrics rather than single metrics. Histograms are useful for high-velocity metrics about your applications and infrastructure–-particularly metrics that are gathered across many distributed sources.
* **[Distributed tracing](tracing_basics.html)** enables you to track the flow of work that is performed by an application as it processes a user request. We support the OpenTracing standard. You can either visualize and examine traces coming from a 3rd-party system such as Jaeger or Zipkin, or instrument your application for tracing using one of our SDKs.

## Summary of Metric Types

The following table gives an overview of metric types. We introduce each type in more detail below.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Metric</th><th width="40%">Description</th><th width="40%">Example</th></tr>
</thead>
<tr>
<td>Gauge</td>
<td>Shows current value for each point in time.</td>
<td>CPU load, network connections</td>
</tr>
<tr>
<td>Counter</td>
<td>Shows values as they increase (and decrease).</td>
<td>Number of failed connections, registered users.</td>
</tr>
<tr>
<td>Delta counter</td>
<td>Useful for monitoring bursty traffic in a Function-as-a-Service (serverless) environment. </td>
<td>Shows how many times an FaaS function executed (or failed). </td>
</tr>
<tr>
<td>Histogram</td>
<td>Supports computing, storing, and using distributions of metrics that use the Wavefront histogram format. </td>
<td>Useful for very high frequency data. See the <a href="proxies_histograms.html">discussion of histograms</a>. </td>
</tr>
<tr>
<td>Trace</td>
<td>A trace shows you how a request propagates from one microservice to the next in a distributed application. The basic building blocks of a trace are its spans.</td>
<td>You can think of a trace as a tree of related spans. The trace has a unique trace ID, which is shared by each member span in the tree. See <a href="tracing_basics.html#sample-application">"Sample Application</a> for an example.</td>
</tr>
<tr>
<td>Span</td>
<td>Spans are the fundamental units of trace data. Each span corresponds to a distinct invocation of an operation that executes as part of the request.</td>
<td>For example, in our BeachShirts sample application, we have the <code>beachshirts.shopping</code> operation, which includes many invocations of the <code>Printing.getAvailableColors</code> span. </td>
</tr>

</tbody>
</table>

## Gauge

A gauge shows the current value for each point in time. Think of a thermometer that shows the current temperature or a gauge that shows how much electricity your Tesla has left.

Many metrics that come into Wavefront are gauges. For example, Wavefront internal metrics include `~alert.checking_frequency.{id}` and `~alert.query_time.{alert_id}`.

## Counter

Counters show information over time. Think of a person with a counter at the entrance to a concert. The counter shows the total number of people that have entered so far.

   Counters usually increase over time but might briefly go to zero, for example, in case of a network outage. Users can wrap [**rate()**](ts_rate.html) around a counter if they want to ignore temporary 0 values and see only the positive rate of change.

Wavefront internal metrics that are counters include `~metric.new_host_ids` and `~query.requests`.

To turn a gauge into a counter, you can use query language functions such as [integral](ts_integral.html). For example, you could convert a `~alert.checking_frequency.<id>` to see the trend in checking frequency instead of the raw data.

## Delta Counter

[Delta counters](delta_counters.html) are well suited for the kind of bursty traffic you typically get in a Function-as-a-Service environment. Many functions execute simultaneously and it's not possible to monitor bursty traffic like that without losing metric points to collision.

For example, instead of one person with a counter standing at a concert entrance, is an example. No single person can capture the composite count,  so you add up the counters. In the same way, the Wavefront service can aggregate delta counter information.

If a metric starts with a delta character, the Wavefront service considers that metric a delta metric. The Wavefront service aggregates delta metric points and stores the aggregated point.

The following illustration compares a counter and a delta counter.
* The *counter* mycounter sends 3 data points to the Wavefront service. Wavefront stores each value with its timestamp. When you run a query, such as `integral()`, the Wavefront service fetches the stored values, aggregates them, and returns the result.
* In the *delta counter* use case, a FaaS environment runs the function in multiple function invocation instances and sends the points to the Wavefront service. The Wavefront service aggregates the points and stores the result. When the user runs a query, the Wavefront service fetches the already aggregated value.

![counters_delta_counters](images/counter_delta_counter.svg)

## Histograms

Wavefront can receive and store metrics at 1 point per second per unique source. However, some scenarios generate metrics even more frequently. Suppose you are measuring the latency of web requests. If you have a lot of traffic at multiple servers, you may have multiple distinct measurements for a given metric, timestamp, and source. Using "normal” metrics, we can’t measure this.

To address high frequency data, Wavefront supports histograms – a mechanism to compute, store, and use distributions of metrics. A Wavefront histogram is a distribution of metrics collected and computed by the Wavefront proxy. Histograms are supported by Wavefront proxy 4.12 and later. [Wavefront Histograms](proxies_histograms.html) describes the histogram format, histogram ports, and some examples.

![histogram](images/histogram.png)

## Traces and Spans

Wavefront follows the OpenTracing standard for representing and manipulating trace data.

* A **trace** represents an individual workflow in an application. A trace shows you how a particular request propagates through your application or among a set of services.

* **Spans**  are the individual segments of work in the trace. A Wavefront trace consists of one or more spans. Each span represents time spent by an operation in a service (often a microservice).

Because requests normally consist of other requests, a trace actually consists of a tree of spans.

## Metrics Browser

Use the Metrics Browser to see which metrics are available in your environment and to hide and redisplay metrics.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To view, hide, and redisplay metrics</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong></li>
<li>Use the options on the left to narrow down your search.</li></ol></td>
<td width="40%"><img src="/images/browse_metrics.png" alt="browse metrics"></td>
</tr>
</tbody>
</table>


## Hiding and Unhiding Metrics

You can _manually_ hide metrics from the Metrics browser and in the autocomplete dropdown associated with queries. Manually hiding metrics does not permanently delete a metric or metric namespace.

{% include shared/permissions.html entity="metrics" entitymgmt="Metric" %}


**Note:** While hidden metrics are removed from the autocomplete dropdown, those metrics can still be used in a ts() query when data values are present.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To hide one or more metrics:</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong></li>
<li>Click the <strong>Manage Hidden Metrics</strong> button</li>
<li>In the dialog type a complete metrics name (e.g. <code>requests.latency</code>) or a metric prefix (e.g. <code>requests.</code>, <code>cpu.loadavg.</code>).
<ul>
<li>This field does not support auto-complete, so you have to type the entire metric name or metric prefix.</li>
<li>The text is case sensitive.</li>
<li>Wildcards are not supported. The star <code>*</code> character is considered part of the text string.</li>

</ul></li>
<li>Press Enter to add the metric(s) to the list and click <strong>Save</strong>.</li>
</ol> </td>
<td width="40%"><img src="/images/hide_metrics.png" alt="hide metrics"></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>To view hidden metrics:</strong>
<ol>
<li>Select <strong>Browse > Metrics</strong></li>
<li>Click the <strong>Manage Hidden Metrics</strong> button.</li>
<li>Click the <strong>Unhide</strong> button to the right of the metric or metric prefix to unhide and click <strong>Save</strong>.</li>
</ol>
The selected metrics and metric prefixes appear again as long as they have had at least 1 reported data value in the last 4 weeks. Otherwise, these metric/metric prefixes are considered obsolete metrics and Wavefront hides them. You can show obsolete metrics for individual charts or alerts. </td>
<td width="40%"><img src="images/viewing_hidden_metrics.png" alt="view hidden metrics"></td>
</tr>
</tbody>
</table>

## Learn More!

Search this doc set for details on any of the metric types, or read this:
* [Delta counters](delta_counters.html) are used by the [AWS Lambda Functions Integration](aws-lambda-functions.html) and discussed in more detail in [AWS Lambda Integration Details](integrations_aws_lambda.html)
* [Histograms](proxies_histograms.html) are useful for distribution of metrics in high-velocity environment. We support a set of [query language functions just for histograms](query_language_reference.html#histogram-functions).
* Our [Tracing UI](/tracing_ui_overview.html) lets you drill down from the service level to the individual spans and examine outliers to find bottlenecks.
