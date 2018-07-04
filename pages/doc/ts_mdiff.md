---
title: mdiff Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mdiff.html
summary: Reference to the mdiff() function
---

## Summary

```
mdiff(<timeWindow>, <expression>)
```
Returns the moving difference between data values reported `timeWindow` apart, within each time series described by the expression.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td>Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series you want moving differences for.  </td></tr>
</tbody>
</table>

## Description

The `mdiff()` function returns the moving difference for each time series described by the expression.
The moving difference for a time series is the difference, at each point in time, between the currently reported data value, and the data value that was reported `timeWindow` ago. For example, `mdiff(10m, ts(my.metric))` returns, at each point, the result of subtracting the data value reported 10 minutes ago from the current data value, for each specified time series.

This function does not interpolate any data values before doing the subtraction.
 

## Examples

In the following chart, the value at 5:00pm is 462 and the value 15 minutes before that was 258, resulting in a difference of 204.

![ts mdiff](images/ts_mdiff.png)

## See Also

See [Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html) for background information. 
