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
mvar(timeWindow, expression)
```
The `mvar` (moving variance) function returns the moving variance of each series over `timeWindow`.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>A window of time specified in seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). If the unit is not specified, the default is minutes. Example: 1h.
<div><strong>NOTE</strong>: <code>mcount()</code> returns the number of data points for 2x the duration of <code>&lt;timeWindow&gt;</code>.</div></td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression. </td>
</tr>
</tbody>
</table>

## Description

The `mvar()` (moving variance) function stands for moving variance. The mvar() function computes the moving variance of each data stream over a shifting time window. You can apply the `sqrt()` function to mvar to get the moving standard deviation, for example: `sqrt(mvar(120m, ts(my.metric)))`.

## Example

The following example computes the moving variance tor the CPU usage user percentage  over a time span of 5 hours.

![mvar simple](images/ts_mvar_simple.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
