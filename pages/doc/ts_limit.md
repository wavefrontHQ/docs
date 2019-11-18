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

limit(<numberOfTraces>, <tracesExpression>)
```

You can use `limit()` with time series and with traces.

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
<td>Expression that that describes the time series you want to filter.</td>
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
<td>Expression that that describes the traces you want to filter. Includes a <a href="traces_function.html">traces() function.</a></td>
</tr>
</tbody>
</table>

## Description

You can use `limit()`:
* With time series as a filtering function.
* With traces as a filtering function.

### Time-Series Filtering Function

The `limit()` function specifies the maximum number of time series that need to be returned by the `tsExpression` using the `numberOfTimeSeries`. For example, the following query limits the results of the `tsExpression` to at most 10 time series: 

```limit(10, ts(~sample.mem.used.percentage))```

Optionally, use `offsetNumber` to specify the starting index. For example, set `offsetNumber` to 5 to start with the 5th item. 


### Traces Filtering Function

The `limit()` traces filtering function specifies the maximum number of traces that need to be returned by the `tracesExpression` using `numberOfTraces`. For example, the following query limits the results of the `tracesExpression` to at most 50 traces: 

```limit(50, traces("beachshirts.styling.makeShirts"))```

<div class="alert alert-info" role="alert"><i class="fa fa-info-circle"></i> <b>Note:</b> Because the ordering of traces is unpredictable, you cannot use <code>limit()</code> to page through a set of results and obtain the next group of traces.</div>

## Examples

### Time-Series Filtering Function

The following example returns only 5 of the time series.

![limit 1](images/ts_limit_1.png)

This example offsets the selection from the first example by 4. That means 1 time series is shared (the series for `app-16`), the others are different.

![limit 2](images/ts_limit_2.png)
