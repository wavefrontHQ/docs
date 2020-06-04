---
title: mslope Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mslope.html
summary: Reference to the mslope() function
---

## Summary
```
mslope(<timeWindow>, <tsExpression>)
```

Per-second derivative of the linear regression of the time series over the specified time window.


<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Optional expression to which you want to apply this function. </td>
</tr>
</tbody>
</table>

## Description

This moving time window function is a measure of how quickly a metric is changing. The function uses simple linear regression over a time window to calculate the per-second derivative.

<!---
`mslope()` differs from similar functions as follows:
* rate() -- In contrast to `rate()`, `mslope()` uses more than two smaples using simple linear regression (also called least-squares regression)
* integral() --
* integrate() --

Note: I expect confusion from our uses about whether to use this or integral or integrate.  We should clearly call out the differences.  One difference i can think of is that this function considers more points in computing the rate of change.
--->

## Example

The following screenshot shows the result of `mslope()` for a simple metric.

![mslope function](images/ts_mslope.png)

## See Also

* The [`deriv()` function](ts_deriv.html) returns the per-second rate of change for each time series described by the tsExpression.
