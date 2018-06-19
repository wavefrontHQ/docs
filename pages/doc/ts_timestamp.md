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
timestamp(<expression>)
```
Returns the timestamps for the reported data values in the time series described by the expression. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return timestamps for. </td></tr>
</tbody>
</table>


## Description

The `timestamp()` standard time function returns timestamps for the reported data values in the time series described by the expression. A timestamp is returned only for a data value that is actually reported by a time series. This function does not interpolate data values.

A timestamp is represented as a number of epoch seconds, which is the number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC) on January 1, 1970. By default, the chart legend displays an abbreviated version of the epoch seconds that represent the timestamp. You can cause the legend to display the entire raw value of the timestamp in epoch seconds by holding down the shift key when you hover over the time series.


## Examples

This chart shows the timestamp values associated with the reported CPU usage maximums. Notice that the legend displays a timestamp as an abbreviated numeric value (`1.529G`).
![timestamp](images/ts_timestamp_no_shift.png)

This chart also shows the timestamp values associated with the reported CPU usage maximums, but this time we held the shift key while hovering the pointer over the value, so the legend displays the timestamp as an an actual number of epoch seconds (`1529366640`).
![timestamp change](images/ts_timestamp_shift.png)
