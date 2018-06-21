---
title: mmin Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mmin.html
summary: Reference to the mmin() function
---

## Summary

```
mmin(<timeWindow>, <expression>)
```
Returns the moving minimum of each time series over a moving time window.

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
<td markdown="span">[expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.  </td></tr>
</tbody>
</table>

## Description

The `mmin()` (moving minimum) function returns the moving minimum of each time series over a moving time window.

By default, all the lines are dimmed. You can move the curser over a line to highlight it, and Cmd-select lines if you want to turn on highlighting for multiple lines to do comparisons.

## Examples

The following example shows the result of a simple `mmin` query.

![mmin](images/ts_mmin.png)

## See Also

[Using Moving and Tumbing Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
