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
lowpass(<expression1>, <expression2>[, inner])
```
Returns only the points in `expression2` that are below `expression1`. `expression1` is often a constant. Specify `inner` if you want an inner join.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression1](query_language_reference.html#expressions)</td>
<td>Threshold expression. Often a constant. </td></tr>
<tr>
<td markdown="span"> [expression2](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
<tr>
<td>inner</td>
<td>Results in an inner join. </td>
</tr>
</tbody>
</table>

## Description

The `lowpass()` filtering function plots a chart based on all reported data values that are lower than the specified threshold. The function discards data values that are  greater than or equal to the threshold, resulting in gaps of missing data between the remaining points.

## Examples

![lowpass example](images/lowpass.png)

In the example chart above, solid orange lines are only present when the reported data values are lower than the threshold. In this example, the threshold is 140. The remaining reported data values are essentially, resulting dashed lines to indicate missing data.


## See Also

[Series Matching](query_language_series_matching.html)
