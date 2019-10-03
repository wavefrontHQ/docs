---
title: lowpass Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_lowpass.html
summary: Reference to the lowpass() function
---
## Summary
```
lowpass(<tsExpression1>, <tsExpression2>[, inner])

lowpass(<traceDuration>, <tracesExpression>)

lowpass(<spanDuration>, <spansExpression>)
```

You can use `lowpass()` with time series, with traces, and with spans.

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td markdown="span"> Time series filtering function</td>
<td markdown="span">Filters the results of `tsExpression2` to include only points with values that are less than `tsExpression1`. `tsExpression1` is often a constant.</td></tr>
<tr>
<td markdown="span">Traces filtering function</td>
<td markdown="span">Filters the results of `tracesExpression` to include only traces that are shorter than the specified duration.</td>
</tr>
<tr>
<td markdown="span">Spans filtering <br>function</td>
<td markdown="span">Filters the results of `spansExpression` to include only spans that are shorter than the specified duration.</td>
</tr>

</tbody>
</table>


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression1](query_language_reference.html#query-expressions)</td>
<td>Threshold expression. Often a constant. </td></tr>
<tr>
<td markdown="span"> [tsExpression2](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want to filter.</td>
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
<td>Upper limit for trace duration. Specify an integer number of milliseconds, seconds, minutes, hours, days or weeks (1ms, 1s, 1m, 1h, 1d, 1w).</td></tr>
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
<td>Upper limit for span duration. Specify an integer number of milliseconds, seconds, minutes, hours, days or weeks (1ms, 1s, 1m, 1h, 1d, 1w).</td></tr>
<tr>
<td markdown="span"> [spansExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the spans you want to filter. Includes a <a href="spans_function.html">spans() function.</a></td>
</tr>
</tbody>
</table>



## Description

You can use `lowpass()`:
* With time series as a filtering function.
* With traces as a filtering function.
* With spans as a filtering function.


### Time-Series Filtering Function

The `lowpass()` filtering function time-series filtering function plots a chart based on all reported data points that are lower than the specified threshold. The function ignores data points if their values are greater than or equal to the threshold, resulting in gaps between the remaining points.

You typically use `lowpass()` to compare multiple time series to a single threshold or a single time series to multiple thresholds. If `tsExpression1` and `tsExpression2` both describe multiple time series, then Wavefront uses [series matching](query_language_series_matching.html) to determine which pairs of time series to compare.


### Traces Filtering Function

The `lowpass()` trace-filtering function examines the traces described by the traces expression, and returns only traces that are shorter than the specified duration. Longer traces are ignored. The duration of an entire trace is considered, not the duration of any individual span in the trace.
For example, the following query returns only traces that are shorter than 12 milliseconds: 

```lowpass(12ms, traces("beachshirts.styling.makeShirts"))```

### Spans Filtering Function

The `lowpass()` spans-filtering function examines the spans described by the spans expression, and returns any spans that are shorter than the specified duration. Longer spans are ignored.

For example, the following query expression returns only spans that are shorter than 12 milliseconds: 

```lowpass(12ms, spans("beachshirts.styling.makeShirts"))```

You can pass this expression to [traces()](traces_function.html) to display traces that contain at least one span for `beachshirts.styling.makeShirts` that is shorter than 12 milliseconds.  

```traces(lowpass(12ms, spans("beachshirts.styling.makeShirts")))```


## Examples

![lowpass example](images/lowpass.png)

In the example chart above, solid orange lines are only present when the reported data values are lower than the threshold. In this example, the threshold is 140. The remaining reported data values display as dashed lines to indicate missing data.


## See Also

[Series Matching](query_language_series_matching.html)
