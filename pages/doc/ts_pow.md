---
title: pow Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_pow.html
summary: Reference to the pow() function
---
## Summary
```
pow(<base-tsExpression>, <exponent-tsExpression>[, inner])
```

Raises the base expression to the power of the exponent expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [base-tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing a constant or a time series of values to be raised to the exponent. </td></tr>
<tr>
<td markdown="span"> [exponent-tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing a constant or a time series of values to use as the exponent. </td></tr>
<tr>
<td>inner</td>
<td>Results in an inner join.</td></tr>
</tbody>
</table>

## Description

The `pow()` function produces a time series in which the data values are the values specified by the base expression, raised to a power specified by the exponent expression.

Either or both parameters may describe a time series or a constant value, and either may be fractional or negative. WQL does not support imaginary numbers, so `pow(-1, 0.5)` returns no data.

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

Here we see the result (in orange) of using `pow()` to raise the values of a time series (in blue) to the 3rd power. That is, for each data value _`v`_ in the input series, the result series returns <code><em>v</em><sup>3</sup></code>.

![ts exp ts](images/ts_pow_time_series.png)
