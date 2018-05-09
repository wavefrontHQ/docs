---
title: bottom Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_bottom.html
summary: Reference to the bottom() function
---
## Summary
```
top(<numberOfTimeSeries>, <expression>)
```
Returns the bottom `numberOfTimeSeries` series in expression as 1, based on the most recent data point. Displays all other series as 0's. This function outputs continuous time series.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of time series that you want.  </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

The `bottom()` function computes and returns the bottom N number of series associated with a ts() query as ones and zeros. The function determines the bottom N series based on the latest time slice, that is, the furthest right) of the current time window. Of `numberOfTimeSeries` is less than the number of returned series in the `ts()` expression, we evaluate only data values present within 1-minute of the absolute latest time slice in the current chart window as true (1). If other series are present but not reported within 1 minute of the absolute latest time slice in the current chart window, then they those series are automatically be evaluated as false (0).

Use missing data functions to ensure all present queries have a data value reported at the latest time slice in the current chart window. The type of missing data function used should be based on your use case. For example, if you are looking at live data and want the last known reported value to be evaluated, use `last()`. Keep in mind that `last()` generates the last reported value over the last 4 weeks. Use a smaller time window with `last` if that makes more sense.

## Examples

The following example evaluates the last known reported value for the last 10 minutes.

![filter base](images/ts_filter_base.png)

Then we filter those results into two buckets: The ones with the lowest 5 values show as 1, and the rest show as 0.

![top example](images/ts_top.png)
