---
title: align Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_align.html
summary: Reference to the align() function
---
## Summary
```
align(<timeWindow>,[mean|median|min|max|first|last|sum|count,] <expression>)
```
Groups the data values of a time series into buckets of size <strong>timeWindow</strong>, and returns one displayed value per bucket. Each returned value is the result of combining the data values in a bucket using the specified summarization method.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [timeWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">Size (duration) of the buckets into which data values are grouped. 
You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified. </td>
</tr>
<tr>
<td>mean&vert;median&vert;min&vert;max&vert;first&vert;last&vert;sum&vert;count </td>
<td>Summarization method to use for aggregating the data values within each bucket. 
These are similar to the <a href="charts.html#general"><strong>Summarize by</strong> options</a> you can set for a chart.
Default is mean (average).</td>
</tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to organize into buckets. </td></tr>
</tbody>
</table>

## Description

The `align()` function adjusts the display of each time series described by the expression, by grouping the data values into buckets of the specified duration and then returning a single displayed value for each bucket. 

By default, each returned value is the mean (average) of the values that were reported in a bucket. You can specify a different summarization method if you want the bucketed values to be aggregated in some other way (e.g. counted, summed, etc.). For example, if your time series reports data once a minute, but you want the data values to be displayed every 30 minutes (and summarized by median over that time window), use `align(30m, median, ts(my.metric))`.

`align()` returns values at intervals that start at the beginning of epoch time (Jan 1, 1970).
For example, `align(2d, ts(my.metric))` produces a value at every 48-hour interval starting with `1970-01-01T00:00:00Z`.

`align()` returns each value at the beginning of the interval that contains the data values it summarizes. 
For example, suppose `align(1m, sum, ts(my.metric))` returns a value at 10:05:00pm. This returned value is the sum of the values reported by `my.metric` from 10:05:00pm to 10:05:59pm.

Metrics are automatically pre-aligned for performance reasons when more than 100 time series are used in an aggregation function. You might see a pre-align warning even if you're not using the `align()` function. You can ignore the warning in most cases, for instance, if a metric reflects a parameter changing over time.

You can use any supported unit of time for the `timeWindow` parameter. The `bw` unit, which stands for bucket window, enforces the summarization option in the query instead of the chart. For example, `align(1bw, [{mean|median|min|max|first|last|sum},] <expression>)` produces a chart that looks identical, regardless of summarization method that you choose in the chart.
Using `bw` can also improve query performance on larger time windows where you normally align to a smaller interval like 1 minute. For example, `rawsum(align(1m, <expression>))` can be optimized by using `rawsum(align(1bw, <expression>))`.


## Examples

The following example shows a simple query for requests latency for the `app-10` source.
Below that, we put the results into 5 minute buckets (orange line) and use `max` to summarize the bucketed results.

![align example](images/ts_align.png)


## See Also

[Bucketing with align()](query_language_align_function.html)
