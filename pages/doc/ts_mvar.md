---
title: mvar Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mvar.html
summary: Reference to the mvar() function
---

## Summary

```
mvar(<timeWindow>, <expression>)
```
Returns the moving variance for each series over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td>Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series you want moving variances for. </td>
</tr>
</tbody>
</table>

## Description

The `mvar()` function computes the moving variance of each time series over a shifting time window. For example, `mvar(60m, ts(my.metric))` returns, at each point, the variance in the data values over the previous 60 minutes for each specified time series.

You can apply the `sqrt()` function to `mvar()` to get the moving standard deviation, for example: `sqrt(mvar(120m, ts(my.metric)))`.

## Example

The following example computes the moving variance for the CPU usage user percentage over 5 hours.

![mvar simple](images/ts_mvar_simple.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)

[Detecting Anomalies With Functions and Statistical Functions](query_language_statistical_functions_anomalies.html)
