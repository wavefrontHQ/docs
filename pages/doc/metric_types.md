---
title: Wavefront Metric Types
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: metric_types.html
summary: Learn about the different type of metrics Wavefront collects.
---

Wavefront shows how the metrics in the environment you are monitoring change over time. Each metric includes several elements:
* metric name and value
* timestamp
* metric source
* point tag or source tag (optional)

The type of data that you’re collecting determines the characteristics of the metrics. Currently, you can use Wavefront with gauges, counters, delta counters, and histograms.

## Summary of Metric Types

The following table gives an overview of metric types. We introduce each type in more detail below.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Metric</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td> Gauge</td>
<td>Monitor metrics that increase and decrease.</td>
</tr>
<tr>
<td>Counter</td>
<td>Shows metrics that increase over time.</td>
</tr>
<tr>
<td>Delta counter</td>
<td>Useful for monitoring bursty traffic in a Function-as-a-Service (serverless) environment. We use delta counters for some of the metrics in the AWS Lambda integration. You can send delta counters to the proxy or the service using Python, Go, or Node.js. See the <a href="integrations_aws_lambda.html">AWS Lambda integration</a> and the <a href="delta_counters.html">delta counters page</a>.</td>
</tr>
<tr>
<td>Histogram</td>
<td>Histograms support computing, storing, and using distributions of metrics. Useful for very high frequency data. See the <a href="proxies_histogram.html">discussion of histograms</a>. </td>
</tr>
</tbody>
</table>

## Gauge

Gauges monitor metrics that increase and decrease. Each gauge shows the current state of something, such as the CPU or memory that's in use.

Many metrics that come into Wavefront are gauges. For example, Wavefront internal metrics include `~alert.checking_frequency.{id}` and `~alert.query_time.{alert_id}`.

## Counter

Counters show information over time, such as how many network connections failed and succeded.

   Counters increase over time but might briefly go to zero, for example, in case of a network outage. In many cases, users wrap `rate()` around a counter.

Wavefront internal metrics that are counters include `~metric.new_host_ids` and `~query.requests`. It's also possible to use query language functions such as `integral` to turn a gauge into a counter. For example, you could convert a `~alert.checking_frequency.{id}` to see the trend in checking frequency instead of the raw data.

## Delta Counter

[Delta counters](delta_counters.html) are well suited for they kind of bursty traffic you typically get in a Function-as-a-Service environment. A large number of functions execute simultaneously and it's not possible to monitor bursty traffic like that without losing significant parts of the metrics information to collision.

For delta counters, which must have a &#916; prefix, the Wavefront service performs aggregation when the points arrive and stores the aggregated point. The point does not include informaton about the source -- but an environment like AWS Lambda, the source is irrelevant.

## Histograms

Wavefront can receive and store highly granular metrics at 1 point per second per unique source. However, some scenarios generate even higher frequency data. Suppose you are measuring the latency of web requests. If you have a lot of traffic at multiple servers, you may have multiple distinct measurements for a given metric, timestamp, and source. Using “normal” metrics, we can’t measure this.

To address high frequency data, Wavefront supports histograms – a mechanism to compute, store, and use distributions of metrics. A Wavefront histogram is a distribution of metrics collected and computed by the Wavefront proxy. Histograms are supported by Wavefront proxy 4.12 and later. To indicate that metrics should be treated as histogram data, the user must send the metrics to a histogram proxy port instead of the normal metrics port (2878).
