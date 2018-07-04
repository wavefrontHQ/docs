---
title: mmax Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mmax.html
summary: Reference to the mmax() function
---

## Summary

```
mmax(<timeWindow>, <expression>)
```
Returns the moving maximum of each time series over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series you want moving maximums for.  </td></tr>
</tbody>
</table>

## Description

The `mmax()` function computes the moving maximum of each time series over a shifting time window. For example, `mmax(10m, ts(my.metric))` returns, at each point, the maximum data value over the previous 10 minutes for each specified time series.

By default, all the lines are dimmed. You can move the curser over a line to highlight it, and Cmd-select lines if you want to turn on highlighting for multiple lines to do comparisons.
 

## Examples

The following example shows the result of a simple `mmax()` query.

![mmax](images/ts_mmax.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)
