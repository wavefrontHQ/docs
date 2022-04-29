---
title: Optimize Query Performance
keywords: query language
tags: [query language, performance]
sidebar: doc_sidebar
permalink: query_language_performance.html
summary: Tricks for improving Wavefront Query Language performance.
---

The Wavefront Query Language lets you retrieve and display the data that has been ingested into Tanzu Observability by Wavefront and create alerts that use this data.

<table style="width: 100%;">
<tbody>
<tr>
<td width="15%">
<strong>Time series data</strong></td>
<td width="85%" markdown="span">The query language is particularly well suited to manipulating time series data because it accommodates the periodicity, potential irregularity, and streaming nature of that type of data. </td>
</tr>
<tr>
<td width="15%">
<strong>Histograms</strong></td>
<td width="85%" markdown="span">The query language includes functions for [manipulating histograms](query_language_reference.html#histogram-functions).</td>
</tr>
<tr>
<td width="15%">
<strong>Traces and spans</strong></td>
<td width="85%" markdown="span">Use the [tracing UI](tracing_traces_browser.html) to query traces and spans.</td>
</tr>
</tbody>
</table>

## Video: Optimize Dashboard Performance

Watch this video to learn how to optimize dashboard and query performance.

<p>
<iframe id="kmsembed-1_ynnxe6tn" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_ynnxe6tn/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe>
</p>

## Use Statistics and Suggestions

In the query editor, you can show query stats for the whole chart or stats and suggestions for each query. We collect the following statistics for the chart and for each query:
- **Points Scanned**: Number of data points that were queried to show the chart on the screen. You can affect this number by including the time window in the query or by changing the time window interactively.
- **Duration**: Time between query start and return of result.
- **Cardinality**: Number of unique time series. A unique time series has unique metric name, source name and point tags (key and value). For example, you might receive `networks_bytes_received` from multiple sources and with multiple point tags (e.g. `availability_zone`). You can lower cardinality for each query (and the chart) by filtering, for example, limiting the query to certain sources, certain availability zones, etc.

### Chart Performance Stats

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
To see chart performance stats:
<ol><li>
Put the chart in Edit mode or click the chart name.</li>
<li>Click the ellipsis icon and select <strong>Show Chart Stats</strong>.</li></ol></td>
<td width="60%"><img src="/images/chart_stats_problem.png" alt="screenshot shows chart stats"></td>
</tr>
</tbody>
</table>

### Query Stats and Suggestions

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
To see information for a single query, click the <strong>lightbulb icon</strong>. In the panel to the right you see:
<ul><li>
The query execution statistics for running the query in the current environment. See <a href="#use-statistics-and-suggestions"> Use Statistics and Suggestions</a> for details on what the statistics mean and how to remedy problems.</li>
<li>If the query uses certain functions in ways that often cause performance degradation, the Suggestions field shows how to improve the query, and includes a link to the doc for details. </li></ul></td>
<td width="60%"><img src="/images/query_stats_annotated.png" alt="screenshot highlighting Show/Hide stats icon, stats, and suggestions"></td>
</tr>
</tbody>
</table>

## Use Filters to Look at the Right Data

For best query language performance, it's important to look at just the right amount of data.

**Use filtering functions in queries** narrow down the query space. For example, if a query filters metrics by source or point tag, the query returns faster because the query engine knows which metrics to fetch. Here are some tips:


* **Filter by source**: By default, if you query a metric such as `cpu.loadavg.1m`, the query engine retrieves that metric for any source (host, container, etc.). To significantly improve query performance, query only for sources that you need to know about.

   Example:

   - **Faster**: `ts(~cpu.loadavg.1m, source="db-1")` narrows down the query to a specific time series.
   - **Slower**: `ts(~cpu.loadavg.1m)` returns all time series and is slower.


* **Filter by point tag**: If your data comes in with point tags, such as the availability zone, environment, or other attribute, you can change your query to filter by point tag.

   Example:

   - `ts(~cpu.loadavg.1m AND source=app-* AND env="production")` returns only metrics with sources that start with `app-` and that also have the value `production` for the `env` point tag.

* **Avoid NOT in filters**: With `AND NOT`, the query engine has to search through everything matching the metric, and then filter.

  Example:
  - **Faster**: `ts(~cpu.loadavg.1m, source="db-1" and env="prod")` narrows down the query to a specific time series.
  - **Slower**: `ts(~cpu.loadavg.1m AND NOT env="dev")` is more expensive. With `AND NOT` the query engine has to search through all instances of `~cpu.loadavg.1m` and extract instances that do not have the `env-"dev"` point tag.

* **Filter in the base query**: If possible filter in the base query instead of using advanced filtering functions.

  Example:
 
  - **Faster**: `sum(ts(user.metric, source=app-1)))`
  - **Slower**: `retainSeries(sum(ts(user.metric)), source=app-1))`

## Be Smart About Aggregation

Aggregation functions like sum() or avg() let you combine different time series, for example, by showing the sum or average of a set of time series. For optimal accuracy, the query engine uses interpolation. After interpolation, each time series has a value at each point in time which improves accuracy during aggregation, but affects performance. See [Aggregating Time Series](query_language_aggregate_functions.html) for background and a video.

You have these options to eliminate the overhead from interpolation:

### Use align() with Aggregation Functions

The align() function changes [how bucketing happens](query_language_align_function.html).

Example:

* **More precise**: `avg(ts(~sample.network.bytes.sent))` returns the average over all time series, inserting points so there's a value for each time series at any time there's a value for one time series.
* **Faster**: `align(1m, mean, ts("my.metric"))` returns the average over all time series, and uses the values at each 1 minute point in time.

In certain cases, the query engine [performs prealignment](query_language_align_function.html#the-pre-align-warning--when-the-query-engine-applies-align).

### Use Raw Aggregation Functions

Instead of using align(), you can avoid the overhead of interpolation with a raw aggregation function. [Aggregating Time Series](query_language_aggregate_functions.html) has details and a video.
* Standard aggregation functions (e.g. sum(), avg(), or max()) first interpolate the points of the underlying set of series, and then apply the aggregation function to the interpolated series. These functions aggregate multiple series down, usually to a single series.
* Raw aggregation functions (e.g. rawsum(), rawavg()) do not interpolate the underlying series before aggregation.

Example:

- **More precise**: `sum(ts(~sample.cpu.loadavg.1m, source=app-1*))` performs interpolation first, and then computes the sum.
- **Faster**: `rawsum(ts(~sample.cpu.loadavg.1m, source=app-1*))` does not perform interpolation and computes the sum from the raw data.


## Specify a Time Window with Missing Data Functions

Missing data functions such as last() support an optional `timeWindow` parameter. The default() function also supports a `delayTime` parameter. If you don’t specify those time parameters, the query engine applies the default value for every second and for gaps up to 28 days. This impacts performance of the query and the dashboard.

- **Faster**: `default([<timeWindow>,] [<delayTime>,] <defaultValue>, <tsExpression>)`
- **Slower**: `default(0, <tsExpression>)`

The time window is a measure of time expressed as an integer number of units. The default unit is minutes. You can specify:
<ul>
<li>Seconds, minutes, hours, days, or weeks (1s, 1m, 1h, 1d, 1w). For example, <strong>3h</strong> specifies 3 hours.</li>
<li>Time relative to the window length of the chart you are currently looking at (1vw).
If you are looking at a 30-minute window, <strong>1vw</strong> is one view-window length, and therefore equivalent to <strong>30m</strong>. </li>
<li>Time relative to the bucket size of the chart (1bw). The query engine calculates bucket size based on the view window length and screen resolution. You can see bucket size at the bottom left of each chart.</li>
</ul>

## Use Wildcard Characters with Care

WQL supports the asterisk (*) as a wildcard character.  [Wildcards](query_language_reference.html#partial-regex-wildcards-aliases-and-variables) in queries can result in many time series on a chart, which can be confusing and affect performance. If using a wildcard character make sense for your use case, use delimiters, and don't use a wildcard at the beginning of a query.

- **Faster**: `ts(‘abc.*.xyz’)` -- Using delimiters around wildcards.
- **Slower**: `ts(“abc*xyz”)` -- Not using a period as a delimiter.
- **Slower**: `ts("*abc.xyz")` -- Wildcard character at the beginning of a query.

## Learn More!

* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html)
* [Troubleshooting Missing Data](missing_data_troubleshooting.html)
