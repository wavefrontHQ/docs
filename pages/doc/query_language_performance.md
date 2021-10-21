---
title: Query Performance
keywords: query language
tags: [query language, performance]
sidebar: doc_sidebar
permalink: query_language_performance.html
summary: Learn some tricks for improving WQL performance.
---

The Wavefront Query Language lets you retrieve and display the data that has been ingested into Wavefront and create alerts that use the data.
* **Time series data** The query language is particularly well suited to time series data because it accommodates the periodicity, potential irregularity, and streaming nature of that data type.
* **Histograms** The query language includes functions for [manipulating histograms](query_language_reference.html#histogram-functions).
* **Traces and spans** Use the [tracing UI](tracing_traces_browser.html) to query traces and spans.

## Look at Just the Right Amount of Data

For best query language performance, it's important to look at just the right amount of data. Here's an overview:

* **Specify time windows**: For all functions with an optional timeWindow parameter, specify that [time window](#specify-a-time-window). Otherwise, Wavefront might retrieve data every second for 28 days.

  Examples:

  * `last(1vw, ts(~cpu.loadavg.1m)` Retrieve information for chart's current view window
  * `last(2h, ts(~cpu.loadavg.1m))` Retrieve information for the last 2 hours.

* **Filter by source**: By default, if you query a metric such as `cpu.loadavg.1m`, Wavefront retrieves that metric for any source (host, container, etc.). To significantly improve query performance, query only for sources that you need to know about.

   Example:

   * `ts(~cpu.loadavg.1m AND source=app-*)` Return only metrics with sources that start with `app-`

* **Filter by point tag**: If your data comes in with point tags, such as the availability zone, environment, or other attribute, you can change your query to filter by point tag.

   Example:

   * `ts(~cpu.loadavg.1m AND source=app-* AND env="production")` Return only metrics with sources that start with `app-` that also have the value `production` for the `env` point tag.

## Be Smart about Aggregation

Aggregation functions like sum() or avg() let you combine different time series, for example, by showing the sum or average of a set of time series. For optimal accuracy, Wavefront uses interpolation. After interpolation, each time series has a value at each point in time which improves accuracy during aggregation, but affects performance.

You have these options to eliminate the overhead from interpolation:

### Use `align()` with Aggregation Functions:

The align() function changes [how bucketing happens](query_language_align_function.html).

Example:

* More precise: `avg(ts(~sample.network.bytes.sent))` returns the average over all time series, inserting points so there's a value for each time series at any time there's a value for one time series.
* Faster: `align(1m, mean, ts("my.metric"))` returns the average over all time series, and uses the values at each 1 minute point in time.

In certain cases, Wavefront [performs prealignment](query_language_align_function.html#the-pre-align-warning--when-wavefront-applies-align).

### Use Raw Aggregation Functions

Instead of using align(), you can avoid the overhead of interpolation with a raw aggregation function. [Aggregating Time Series](query_language_aggregate_functions.html) has details and a video.
* Standard aggregation functions (e.g. sum(), avg(), or max()) first interpolate the points of the underlying set of series, and then apply the aggregation function to the interpolated series. These functions aggregate multiple series down, usually to a single series.
* Raw aggregation functions (e.g. rawsum(), rawavg()) do not interpolate the underlying series before aggregation.

Example:

* More precise: `sum(ts(~sample.cpu.loadavg.1m, source=app-1*))` performs interpolation first, and then computes the sum.
* Faster: `rawsum(ts(~sample.cpu.loadavg.1m, source=app-1*))` does not perform interpolation and computes the sum from the raw data.


## Specify a Time Window

A time window is a measure of time expressed as an integer number of units. You can specify:
<ul>
<li>Seconds, minutes, hours, days, or weeks (1s, 1m, 1h, 1d, 1w). For example, <strong>3h</strong> specifies 3 hours.</li>
<li>Time relative to the window length of the chart you are currently looking at (1vw).
If you are looking at a 30-minute window, <strong>1vw</strong> is one view-window length, and therefore equivalent to <strong>30m</strong>. </li>
<li>Time relative to the bucket size of the chart (1bw). Wavefront calculates bucket size based on the view window length and screen resolution. You can see bucket size at the bottom left of each chart.</li>
</ul>
The default unit is minutes if the unit is not specified.
