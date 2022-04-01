---
title: highpass Function and gt Operator
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_highpass.html
summary: Reference to the highpass() function
---
## Summary
```
highpass(<tsExpression1>, <tsExpression2>[, inner])

highpass(<traceDuration>, <tracesExpression>)

highpass(<spanDuration>, <spansExpression>)
```

You can use `highpass()` with time series, with traces, or with spans.
You can use the `.gt` operator with time series. Multiple operators can be used at the same time.

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td markdown="span"> Time series filtering function</td>
<td markdown="span">Filters the results of `tsExpression2` to include only points with values that are greater than `tsExpression1`. `tsExpression1` is often a constant.</td></tr>
<tr>
<td markdown="span">Traces filtering function</td>
<td markdown="span">Filters the results of `tracesExpression` to include only traces that are longer than the specified duration.</td>
</tr>
<tr>
<td markdown="span">Spans filtering <br>function</td>
<td markdown="span">Filters the results of `spansExpression` to include only spans that are longer than the specified duration.</td>
</tr>
</tbody>
</table>




## Parameters

### Time-Series Filtering Function

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression1](query_language_reference.html#query-expressions)</td>
<td>Threshold expression. Often a constant. </td></tr>
<tr>
<td markdown="span"> [tsExpression2](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series that you want to filter.</td>
</tr>
<tr>
<td>inner</td>
<td>Results in an inner join. </td>
</tr>
</tbody>
</table>

### Traces Filtering Function

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>traceDuration</td>
<td>Lower limit for trace duration. Specify an integer number of milliseconds, seconds, minutes, hours, days or weeks (1ms, 1s, 1m, 1h, 1d, 1w).</td></tr>
<tr>
<td markdown="span"> [tracesExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the traces you want to filter. Includes a <a href="traces_function.html">traces() function.</a></td>
</tr>
</tbody>
</table>

### Spans Filtering Function

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>spanDuration</td>
<td>Lower limit for span duration. Specify an integer number of milliseconds, seconds, minutes, hours, days or weeks (1ms, 1s, 1m, 1h, 1d, 1w).</td></tr>
<tr>
<td markdown="span"> [spansExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the spans you want to filter. Includes a <a href="spans_function.html">spans() function.</a></td>
</tr>
</tbody>
</table>


## Description

You can use `highpass()`:
* With time series as a filtering function.
* With traces as a filtering function.
* With spans as a filtering function.

You can use the `gt` operator with time series. You can use more than one operator to create a bounded expression. For example, use `ts(<tsExpression>).gt(50.5).lt(70.5)` to return only values greater than 50.5 and less than 70.5.

### Time-Series Filtering Function


The `highpass()` time-series filtering function plots a chart based on all reported data points that are higher than the specified threshold. The function ignores data points if their values are less than or equal to the threshold, resulting in gaps between the remaining points.

You typically use `highpass()` to compare multiple time series to a single threshold or a single time series to multiple thresholds. If `tsExpression1` and `tsExpression2` each describe multiple time series, then the query engine uses [series matching](query_language_series_matching.html) to determine which pairs of time series to compare.

### Traces Filtering Function

The `highpass()` trace-filtering function examines the traces described by the traces expression, and returns any traces that are longer than the specified duration. Shorter traces are ignored. The duration of an entire trace is considered, not the duration of any individual span in the trace.

For example, the following query returns only traces that are longer than 3 seconds:

```highpass(3s, traces("beachshirts.styling.makeShirts"))```

### Spans Filtering Function

The `highpass()` spans-filtering function examines the spans described by the spans expression, and returns any spans that are longer than the specified duration. Shorter spans are ignored.

For example, the following query expression returns only spans that are longer than 3 seconds:

```highpass(3s, spans("beachshirts.styling.makeShirts"))```

You can pass this expression to [traces()](traces_function.html) to display traces that contain at least one span for `beachshirts.styling.makeShirts` that is longer than 3 seconds.

```traces(highpass(3s, spans("beachshirts.styling.makeShirts")))```


## Examples

Let's look at latency data:

![highpass before](images/ts_highpass_before.png)

Now we wrap this example with `highpass()` and use a threshold of 120.
The resulting Stacked Area chart shows results only where the data exceeds 120.

![highpass example](images/ts_highpass.png)


## See Also

* [Series Matching](query_language_series_matching.html)
* [Queries for Comparing Time Series](query_language_recipes.html#queries-for-comparing-time-series)
