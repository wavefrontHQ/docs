---
title: integrate Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_integrate.html
summary: Reference to the integrate() moving time window function
---

## Summary

```
integrate(<timeWindow>, <tsExpression>)
```
Returns the moving integration for each time series described by the expression, over the specified time window.

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
<td>Expression that describes the time series you want moving integrations for.</td></tr>
</tbody>
</table>

## Description

The `integrate()` function returns the integration for each time series, over a shifting time window. The integration for a series over a time window determines the area below the series during that window. For example, `integrate(10m, ts(my.metric))` returns, at each point, the integration over the previous 10 minutes for each specified time series. 

This function is similar to [integral()](ts_integral.html). However, `integral()` always looks at the current view window and starts at 0, while `integrate()` allows you to specify a time window. You can use this function to determine trends in a specified time window, for example, over the last 8 days or 24 hours.

## Examples

The following example shows the behavior of 5 services over 8 days.

![integrate](images/ts_integrate.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)
