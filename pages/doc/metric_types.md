---
title: Wavefront Metric Types
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: metric_types.html
summary: Learn about the different type of metrics Wavefront collects.
---

Wavefront monitors time series. Each time series consists of numeric data points for a metric, for example, CPU load or failed network connections.

The type of data that you’re collecting determines the type of metric. Wavefront supports several metric types: gauges, counters, delta counters, and histograms.

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
<td>Supports computing, storing, and using distributions of metrics.</td>
<td>Useful for very high frequency data. See the <a href="proxies_histograms.html">discussion of histograms</a>. </td>
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

Even if the metrics that arrive at the Wavefront service aren't counters, you can use query language functions such as [integral](ts_integral.html) to turn a gauge into a counter. For example, you could convert a `~alert.checking_frequency.<id>` to see the trend in checking frequency instead of the raw data.

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

To address high frequency data, Wavefront supports histograms – a mechanism to compute, store, and use distributions of metrics. A Wavefront histogram is a distribution of metrics collected and computed by the Wavefront proxy. Histograms are supported by Wavefront proxy 4.12 and later. To indicate that metrics should be treated as histogram data, the user must send the metrics to a histogram proxy port instead of the normal metrics port (2878).

![histogram](images/histogram.png)
