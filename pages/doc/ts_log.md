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
log(<tsExpression>)
```

Returns the natural logarithm of each data value described by the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing a constant or a time series of values to take the natural logarithm of. </td></tr>
</tbody>
</table>

## Description

The `log()` function produces a time series in which each data value is equal to the natural logarithm (log base _e_) of the value or values specified by the expression. The natural logarithm is the power to which you need to raise _e_ to obtain the specified value. In mathematics, <code>log<sub><em>e</em></sub></code> can be written `ln`.
* If `tsExpression` describes a constant value _`N`_, then `log()` returns a continuous series where every data value is <code>log<sub><em>e</em></sub> <em>N</em></code>.
* If `tsExpression` describes one or more time series, then `log()` returns a new time series for each input time series.
Each value in a new time series is calculated as <code>log<sub><em>e</em></sub> <em>V</em></code>, where _`V`_ is the value of the corresponding point in the input time series.


The inverse of this function is [`exp()`](ts_exp.html).

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

In this example, we see the result (in red) of using `log(4)` to find the power of _e_ that equals 4. We also see the result (in blue) of obtaining the inverse by applying the `exp()` function to the result of `log(4)`.

![ts log](images/ts_log_and_inverse.png)

Here we see the result (in orange) of using `log()` to take the natural log of a time series (in purple).

![ts log ts](images/ts_log_time_series.png)

## See also
[log10()](ts_log10.html)
