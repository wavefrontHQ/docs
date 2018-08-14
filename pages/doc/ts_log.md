---
title: log Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_log.html
summary: Reference to the log() function
---
## Summary
```
log(<expression>)
```

Returns the natural logarithm of the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td markdown="span">Expression specifying the value to take the natural logarithm of. The expression must be a constant or arithmetic combination of constants. </td></tr>
</tbody>
</table>

## Description

The `log()` function produces a time series in which each data value is equal to the natural logarithm (log base _e_) of the number specified by the expression. The natural logarithm is the power to which you need to raise _e_ to obtain the value of the expression. In mathematics this function is typically written `ln x`, where `x` is the value of the expression.

The inverse of this function is `exp()`.

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

In this example, we see the result (in red) of using `log(4)` to find the power of _e_ that equals 4. We also see the result (in blue) of obtaining the inverse by applying the `exp()` function to the result of `log(4)`.

![ts log](images/ts_log_and_inverse.png)
