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
limit(<numberOfTimeSeries>[, <offsetNumber>], <expression>)
```
Displays only `numberOfTimeSeries` time series.

## Parameters
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
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

Returns only `numberOfTimeSeriestime` series. Use the optional `offsetNumber` to specify an index to start with. For example, set `offsetNumber` to 5 to start with the 5th item.

## Examples

The following example returns only 5 of the time series.

![limit 1](images/ts_limit_1.png)

This example offsets the selection from the first example by 4. That means 1 time series is shared (the series for `app-16`), the others are different.

![limit 2](images/ts_limit_2.png)
