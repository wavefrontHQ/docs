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
exp(<tsExpression>)
```

Returns the natural exponential for each data value described by the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing a constant or a time series of values to raise the constant _e_ to. </td></tr>
</tbody>
</table>

## Description

The `exp()` function produces a time series in which each data value is equal to _e_ raised to the power specified by the expression.
* If `tsExpression` describes a constant value _`N`_, then `exp()` returns a continuous series where every data value is <code><em>e<sup>N</sup></em></code>.
* If `tsExpression` describes one or more time series, then `exp()` returns a new time series for each input time series.
Each value in a new time series is calculated as <code><em>e<sup>V</sup></em></code>, where _`V`_ is the value of the corresponding point in the input time series.

The inverse of this function is [`log()`](ts_log.html).

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

In this example, we see the result (in red) of using `exp(2)` to raise _e_ to the power `2`. We also see the result (in blue) of obtaining the inverse by applying the `log()` function.

![ts exp](images/ts_exp_and_inverse.png)

Here we see the result (in orange) of using `exp()` to obtain the natural exponential of a time series (in purple).

![ts exp ts](images/ts_exp_time_series.png)
