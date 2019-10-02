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
<td markdown="span">Limits the time series returned by `tsExpression` to display at most `numberOfTimeSeries` series.</td></tr>
<tr>
<td markdown="span">Traces filtering function</td>
<td markdown="span">Limits the traces returned by `tracesExpression` to include at most `numberOfTraces` traces.</td>
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
<td>Number of traces that you want displayed. Express this parameter as a number (e.g. 10). Do not specify a percentage. </td></tr>
<tr>
<td markdown="span"> [tracesExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that that describes the traces you want to filter.</td>
</tr>
</tbody>
</table>

## Description

You can use `limit()`:
* With time series as a filtering function.
* With traces as a filtering function.

### Time-Series Filtering Function

The `limit()` filtering function limits the results of `tsExpression` to at most `numberOfTimeSeries` time series. Use the optional `offsetNumber` to specify an index to start with. For example, set `offsetNumber` to 5 to start with the 5th item.

### Traces Filtering Function

The `limit()` filtering function limits the results of `tracesExpression` to at most `numberOfTraces` traces.


## Examples

### Time-Series Filtering Function

The following example returns only 5 of the time series.

![limit 1](images/ts_limit_1.png)

This example offsets the selection from the first example by 4. That means 1 time series is shared (the series for `app-16`), the others are different.

![limit 2](images/ts_limit_2.png)

### Traces Filtering Function

The following example limits the results of the `traces()` query to at most 50 traces.

`limit(50, traces("beachshirts.styling.makeShirts"))`
