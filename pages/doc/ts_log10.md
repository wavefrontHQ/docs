---
title: log10 Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_log10.html
summary: Reference to the log10() function
---
## Summary
```
log10(<expression>)
```

Returns the logarithm of the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td markdown="span">Expression specifying the value to take the logarithm of. The expression must be a constant or arithmetic combination of constants. </td></tr>
</tbody>
</table>

## Description

The `log10()` function produces a  time series in which each data value is equal to the logarithm (log base 10) of the number specified by the expression. The logarithm is the power to which you need to raise 10 to obtain the value of the expression. 

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

In this example, we see the result (in red) of using `log10(4)` to find the power of 10 that equals 4.

![ts log10](images/ts_log10_and_inverse.png)
