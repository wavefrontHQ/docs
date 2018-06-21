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
Returns one value in the expression for each time window. For example, if you collect data once a minute, but want data points to be displayed every 30 minutes (summarized by median every 30 minutes), use `align(30m, median, ts(my.metric))`.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td markdown="span">Time window (bucket size) into which `align()` organizes the metrics. In addition to time window parameter values used by other functions, you can use <bold>bw</bold> to specify bucket window. </td>
</tr>
<tr>
<td>mean&vert;median&vert;min&vert;max&vert;first&vert;last&vert;sum&vert;count </td>
<td>Aggregation function to use for grouping data points within buckets.</td>
</tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to organize into buckets. </td></tr>
</tbody>
</table>

## Description

The `align()` function groups data points into buckets by allowing you to specify a time window. We often use `align()` with one of the aggregation functions to specify how the grouped points are aggregated (e.g. averaged, counted, summed, etc.).

Metrics are automatically pre-aligned for performance reasons when more than 100 time series are used in an aggregation function. You might see a pre-align warning even if you're not using the `align()` function. You can ignore the warning in most cases, for instance, if a metric reflects a parameter changing over time.

You can use set the `timeWindow` parameter to the values used in other functions, or use `bw`, which stands for bucket window. You `bw` to enforce the summarization option in the query instead of the chart. For example, `align(1bw, [{mean|median|min|max|first|last|sum},] <expression>)` produces a chart that looks identical, regardless of summarization method that you choose in the chart.
Using `bw` can also improve query performance on larger time windows where you normally align to a smaller interval like 1 minute. For example, `rawsum(align(1m, <expression>))` can be optimized by using `rawsum(align(1bw, <expression>))`.


## Examples

The following example shows a simple query for requests latency for the `app-10` source.
Below that, we put the results into 5 minute buckets (orange line) and apply `max()` to the bucketed results.

![align example](images/ts_align.png)


## See Also

[Bucketing with align()](https://docs.wavefront.com/query_language_align_function.html)
