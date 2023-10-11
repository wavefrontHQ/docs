---
title: limit Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_limit.html
summary: Reference to the limit() function
---
## Summary
```
limit(<numberOfTimeSeries>[, <offsetNumber>], <tsExpression>)

limit(<numberOfHistogramSeries>[, <offsetNumber>], <hsExpression>)

limit(<numberOfTraces>, <tracesExpression>)
```

The `limit()` function shows only a specified number of items. You can use `limit()` with time series, histograms, or traces.

{% include important.html content="It's not recommended to use the `limit()` function, because it selects randomly from all time series and does not perform a query over all data followed by filtering. It is possible that the `limit()` function returns NO DATA or that it results in incorrect reporting because the function examines the underlying time series and not the actual reporting in time.
<br><br>
For example, the result of a query might be NO DATA even if some time series report data because the (randomly) selected time series have no data or because time series that the query looks at are not what you expect when you call `limit(number_of_timeseries)`.
<br><br>
Consider using the `count()` function instead of the `limit()` function." %}

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td markdown="span"> Time series filtering function</td>
<td markdown="span">Limits the number of time series displayed for `tsExpression` in a time-series chart.</td></tr>
<tr>
<td markdown="span">Histogram series filtering function</td>
<td markdown="span">Limits the number of histogram distributions displayed for `hsExpression` in a time-series chart.</td></tr>
<tr>
<td markdown="span">Traces filtering function</td>
<td markdown="span">Limits the number of traces listed by `tracesExpression` in the Traces browser.</td>
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
<td>numberOfTimeSeries</td>
<td>Number of time series that you want displayed. You can express this parameter as a number (e.g. 10) or a percentage (e.g. 17%). </td></tr>
<tr>
<td>offsetNumber</td>
<td markdown="span"> Specifies the index to start with.  </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the time series that you want to filter.</td>
</tr>
</tbody>
</table>

### Histogram Filtering Function

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfHistogramSeries</td>
<td>Number of histogram series that you want displayed. You can express this parameter as a number (e.g. 10) or a percentage (e.g. 17%). </td></tr>
<tr>
<td>offsetNumber</td>
<td markdown="span"> Specifies the index to start with.  </td></tr>
<tr>
<td markdown="span"> [hsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the histogram that you want to filter.</td>
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
<td>numberOfTraces</td>
<td>Number of traces that you want listed. Express this parameter as a number (e.g. 10). Do not specify a percentage. </td></tr>
<tr>
<td markdown="span"> [tracesExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the traces that you want to filter. Includes a <a href="traces_function.html">traces() function.</a></td>
</tr>
</tbody>
</table>

## Description

You can use `limit()` as a filtering function with time series, series of [histogram distributions](hs_function.html), or [traces](trace_data_details.html).


### Time-Series Filtering Function

The `limit()` function lets you use the `numberOfTimeSeries` parameter to specify the maximum number of time series that are returned. For example, the following query returns at most 10 time series:

```limit(10, ts(~sample.mem.used.percentage))```

Optionally, use `offsetNumber` to specify the starting index. For example, set `offsetNumber` to 5 to start with the 5th item.

### Histogram Series Filtering Function

The `limit()` function lets you use the `numberOfHistogramSeries` parameter to specify the maximum number of histogram series that are returned. For example, the following query returns at most 10 histograms:

```limit(10, ts(~sample.mem.used.percentage))```

Optionally, use `offsetNumber` to specify the starting index. For example, set `offsetNumber` to 5 to start with the 5th item.

### Traces Filtering Function

The `limit()` function lets you use the `numberOfTraces` parameter to specify the maximum number of traces that are returned. For example, the following query returns at most 50 traces:

```limit(50, traces("beachshirts.styling.makeShirts"))```

{% include note.html content="Because the ordering of traces is unpredictable, you cannot use `limit()` to page through a set of results and obtain the next group of traces." %}


## Examples

### Time-Series Filtering Function

The following example returns only 5 of the time series.

![limit 1](images/ts_limit_1.png)

This example offsets the selection from the first example by 4. That means 1 time series is shared (the series for `app-16`), the others are different.

![limit 2](images/ts_limit_2.png)
