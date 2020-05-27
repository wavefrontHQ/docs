---
title: mchanges Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mchanges.html
summary: Reference to the mchanges() function
---

## Summary

```
mchanges(<timeWindow>, <tsExpression>)
```
Returns the number of times a counter changed directions (going up or going down) within the specified time window.

This function corresponds to the Prometheus `changes()` function

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
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want the number of counter direction changes for. </td></tr>
</tbody>
</table>

## Description

The `mchanges()` function reports how often a time series falls or climbs within a specified time window. You typically use `mchanges()` with counter metrics to determine how often a counter changed direction in a moving time window. For example, `mchanges(10m, ts(my.metric))` returns, at each point, the number of times that a counter changed direction over the last 10 minutes.

You can use this function to see whether a service experiences great fluctuations in either direction.

Although you can apply `flapping()` to any kind of metric, the typical use is to analyze the behavior of counter metrics, which are metrics that report cumulative totals (increasing values) over time.

A counter metric normally produces an monotonically increasing or decreasing series of data values.

## Example

<!---Need a good example that shows changes and difference between flapping and mchanges --->
