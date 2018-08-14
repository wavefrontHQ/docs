---
title: exp Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_exp.html
summary: Reference to the exp() function
---
## Summary
```
exp(<expression>)
```

Returns the natural exponential of the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td markdown="span">Expression specifying the power to raise the constant _e_ to. </td></tr>
</tbody>
</table>

## Description

The `exp()` function produces a time series in which each data value is equal to _e_ raised to the power specified by the expression.

The inverse of this function is [`log()`](ts_log.html).

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

In this example, we see the result (in red) of using `exp(2)` to raise _e_ to the 2nd power. We also see the result (in blue) of obtaining the inverse by applying the `log()` function.

![ts exp](images/ts_exp_and_inverse.png)
