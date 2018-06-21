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
integrate(<timeWindow>, <expression>)
```
Returns the moving integration for the time series specified by `expression` over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td >A clock/calendar time measurement (1s, 1m, 1h, 1d, 1w), time relative to the window length (vw), or time relative to the bucket size (bw) of the chart. Default is minutes if no unit is specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.</td></tr>
</tbody>
</table>

## Description

The `integrate()` function returns the integration over a moving time window specified by the user. The integration determines the area below the specified time series.

This function is similar to [integral()](ts_integral.html). However, `integral()` always looks at the current view window and starts at 0, while `integrate()` allows you to specify a time window. You can use this function to determine trends in a specified time window, for example, over the last 8 days or 24 hours.

## Examples

The following example shows the behavior of 5 services over 8 days.

![integrate](images/ts_integrate.png)

## See Also

[Using Moving and Tumbing Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
