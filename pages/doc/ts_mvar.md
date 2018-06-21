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
The `mvar` (moving variance) function returns the moving variance of each series over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td>A clock/calendar time measurement (1s, 1m, 1h, 1d, 1w), time relative to the window length (vw), or time relative to the bucket size (bw) of the chart. Default is minutes if no unit is specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression. </td>
</tr>
</tbody>
</table>

## Description

The `mvar()` (moving variance) function computes the moving variance of each time series over a moving time window.

You can apply the `sqrt()` function to `mvar()` to get the moving standard deviation, for example: `sqrt(mvar(120m, ts(my.metric)))`.

## Example

The following example computes the moving variance tor the CPU usage user percentage over a time span of 5 hours.

![mvar simple](images/ts_mvar_simple.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)

[Detecting Anomalies With Functions and Statistical Functions](query_language_statistical_functions_anomalies.html)
