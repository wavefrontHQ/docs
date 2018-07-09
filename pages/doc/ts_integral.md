---
title: integral Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_integral.html
summary: Reference to the integral() function
---

## Summary

```
integral(<expression>)
```
Returns the moving sum for each time series, over the time window set for the current chart.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>A ts() expression, a constant, or a wildcard.  </td></tr>
</tbody>
</table>

## Description

The `integral` function returns the moving sum for each time series described by the expression, over the time window set for the current chart. The function always returns 0 at the left side of the chart, and shows the total accumulation over the duration of the chart's time window.

The function is useful for determining trends, for example, whether the total number of requests per minute increased, or whether new sources were added to meet demand. For example, you might want to know how much traffic you serve in a day. By looking at the slope that results from the call to `integral`, you can see where traffic grows the fastest.

In contrast to [integrate](ts_integrate.html), this function depends completely on the time window that you're currently looking at.



## Examples

The following example shows how `integral()` sums all sources that start with `app-1*` over the current time window.

![integral](images/ts_integral.png)

As we zoom in, the differences between the different sources become more obvious.

![integral zoomed](images/ts_integral_zoomed.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
