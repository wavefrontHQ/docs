---
title: Metrics
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: metric_types.html
summary: Learn about gauges, counters, delta counters, histograms, and spans.
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

## Gauges

A gauge shows the current value for each point in time. Think of a thermometer that shows the current temperature or a gauge that shows how much electricity your Tesla has left.

Many metrics that come into Wavefront are gauges. For example, Wavefront internal metrics include `~alert.checking_frequency.{id}` and `~alert.query_time.{alert_id}`.

## Counters

Counters show information over time. Think of a person with a counter at the entrance to a concert. The counter shows the total number of people that have entered so far.

Counter metrics usually increase over time but might reset back to zero, for example, when a service or system restarts. Users can wrap [**rate()**](ts_rate.html) around a counter if they want to ignore temporary 0 values and see only the positive rate of change.

Wavefront internal metrics that are counters include `~metric.new_host_ids` and `~query.requests`.

### Counter Example (Count Total)

In most cases, you can get the information you need from a counter as follows:

1. A counter usually represents something like "how many requests have been processed" or "how many errors happened". You get the metric like this:
```
   ts(~sample.network.bytes.received)
```
2. You use the `rate()`function to get the corresponding per-second rate so you know, for example, "how many requests have been processed per second?"  or "How many errors are happening per second":
```
   rate(ts(~sample.network.bytes.received))
```
3. There are often multiple time series that have the counter (e.g. coming from different sources). Each time series reports the count of the requests received or errors. If you're interested in the total count across your system, you can use `sum()` to sum it up into a single time series.
```
sum(rate(ts(~sample.network.bytes.received)))
```

###  Counter Example (Count Total Over Time Period)

If you want to count the total number of occurrences of a certain time period, the syntax is slightly more complex. Because counters commonly reset to zero, you need a query that counts the total number of increments over the time period you're looking at. You want to ignore any counter resets.

Here, we want to get the number of errors for 1 day.

1. We start by wrapping the counter with `ratediff()`, which, in contrast to `rate()` returns the absolute difference between incrementing data points without dividing by the number of seconds between them.
```
   ratediff(ts(the.counter))
```
2. We use `align` to group the data values of the time series into buckets 1 minute.
```
   align(1m, sum, ratediff(ts(the.counter)))
```
3. We use `rawsum()` to combine all time series into one series, and to not use interpolation.
```
    rawsum(align(1m, sum, ratediff(ts(the.counter))))
```
4. Finally, we get the result for 1 day by using the `msum()` function.
```
    msum(1d, rawsum(align(1m, sum, ratediff(ts(the.counter)))))
```

### Gauge into Counter

To turn a gauge into a counter, you can use query language functions such as [integral](ts_integral.html). For example, you could convert a `~alert.checking_frequency.My_ID` to see the trend in checking frequency instead of the raw data.
```
    integral(ts(~alert.checking_frequency.My_ID))
```

## Delta Counters

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

<<<<<<< HEAD

{% include note.html content="While hidden metrics are removed from the autocomplete dropdown, those metrics can still be used in a `ts()` query when data values are present. " %}
=======
{% include tip.html content="While hidden metrics are removed from the autocomplete dropdown, those metrics can still be used in a ts() query when data values are present." %}
>>>>>>> 711e0ddc8fafd9a7acc1d2a93f496df133bdbd60

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
