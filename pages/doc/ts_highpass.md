---
title: highpass Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_highpass.html
summary: Reference to the highpass() function
---
## Summary
```
highpass(<expression1>, <expression2>[, <inner>])
```
Returns only the points in `expression2` that are above `expression1`. `expression1` is often a constant.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression1](query_language_reference.html#query-expressions)</td>
<td>Threshold expression. Often a constant. </td></tr>
<tr>
<td markdown="span"> [expression2](query_language_reference.html#query-expressions)</td>
<td>Expression that you want to filter</td>
</tr>
<tr>
<td>inner</td>
<td>Results in an inner join. </td>
</tr>
</tbody>
</table>

## Description

The `highpass()` filtering function plots a chart based on all reported data points that are higher than the threshold. The function discards data values that are  less than or equal to the threshold, resulting in gaps of missing data between the remaining points.

## Examples

In the example chart below, solid orange lines are only present when the reported data values exceed the threshold. The solid orange lines are right on top of the blue lines. In this example, the threshold is 120. The remaining reported data values that did not exceed 120 are dropped, resulting dashed lines to indicate missing data.

![highpass example](images/ts_highpass.png)




## See Also

[Series Matching](query_language_series_matching.html)
