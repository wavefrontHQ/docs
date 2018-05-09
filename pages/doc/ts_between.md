---
title: between Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_between.html
summary: Reference to the between() function
---
## Summary
```
between(<expression>, <lower>, <upper>)
```
Returns 1 if `expression` is >= `lower` and <= `upper`. Otherwise, returns 0. This function outputs continuous time series.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to compare against an upper and lower limit. </td></tr>
<tr>
<td>lower</td>
<td>Lower bound for the between() function. </td>
</tr>
<tr>
<td>upper</td>
<td>Upper bound for the between() function. </td>
</tr>
</tbody>
</table>

## Description

The `between()` function determines if the value of `expression` is greater than or equal to`lower` and less than or equal to `upper`. When the value of `expression` falls in between the values of `lower` and `upper` the function displays 1 on the chart.  When `expression` does not fall between `lower` and `upper` the function displays 1 on the chart. The values for `expression`, `lower`, and `upper` can be any constant or `ts()` expression.

## Examples

The following example show the CPU load average per 1 minute as a blue line. The orange line shows a value of 1 where the metric is between .5 and 1.0, and shows a value of zero otherwise.

![between example](images/ts_between.png)


## See Also

[Series Matching](query_language_series_matching.html)
