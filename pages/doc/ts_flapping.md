---
title: flapping Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_flapping.html
summary: Reference to the flapping() function
---

## Summary

```
flapping(<timeWindow>, <tsExpression>)
```
Returns the number of times a counter has reset within the specified time window.

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
<td>Expression that describes the time series you want the number of counter resets for. </td></tr>
</tbody>
</table>

## Description
The `flapping()` function reports how frequently a time series falls and then climbs within a shifting time window. You typically use `flapping()` with counter metrics to determine how often a counter reset has occurred over a moving time window. For example, `flapping(10m, ts(my.metric))` returns, at each point, the number of counter resets over the previous 10 minutes within each specified time series. You can use this function to see whether a service is flapping, that is, whether there are great fluctuations.

Although you can apply `flapping()` to any kind of metric, the typical use is to analyze the behavior of counter metrics, which are metrics that report cumulative totals (increasing values) over time. A counter metric normally produces an monotonically increasing series of data values. However, a metric might reset its counter on occasion – for example, if the metric's source restarts or encounters a particular condition. A metric indicates a counter reset by reporting one or more falling data values, followed by rising data values. `flapping()` reports the number of such resets within the specified time window.

## Examples

The following image shows the fluctuations in the total number of requests for two different sources.

![flapping](images/ts_flapping.png)
