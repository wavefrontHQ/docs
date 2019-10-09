---
title: timestamp Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_timestamp.html
summary: Reference to the timestamp() function
---
## Summary
```
timestamp(<tsExpression>)
```
Returns the timestamps for the reported data values in the time series described by the expression. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series to return timestamps for. </td></tr>
</tbody>
</table>


## Description

The `timestamp()` standard time function returns timestamps for the reported data values in the time series described by the expression. This function returns timestamps only for data values that are actually reported by a time series, and does not interpolate data values.

A timestamp is represented as a whole number of epoch seconds, which is the number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC) on January 1, 1970. 

By default, the chart legend displays an abbreviated version of the epoch seconds that represent the timestamp. You can cause the legend to display the entire raw value of the timestamp in epoch seconds by holding down the shift key when you hover over the time series. 

Note that if the chart's bucket size is greater than 1 second, some of the displayed values will be averages over multiple timestamp values, and therefore shown as decimal numbers with fractional parts. To get precise timestamps, you can zoom in to shrink the chart's bucket size to ~1 second.


## Examples

This chart shows the timestamp values associated with the reported maximum CPU usage percentage. Notice that the legend displays a timestamp as an abbreviated numeric value (`1.529G`).
![timestamp](images/ts_timestamp_no_shift.png)

This chart also shows the timestamp values associated with the same time series, but this time we held the shift key while hovering the pointer over the value, so the legend displays the timestamp as an an actual number of epoch seconds (`1529366640`).
![timestamp change](images/ts_timestamp_shift.png)
