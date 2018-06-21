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
Returns the moving sum over time for the given time series expression over the time interval of the current chart window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.  </td></tr>
</tbody>
</table>

## Description

The `integral` function returns the moving sum for the time series specified by `expression` over the time interval of the current chart window. The function always starts at 0 on the left side of the chart and shows the total accumulation over the time duration of the current chart window.

The function is useful for determining trends, for example, whether the total number of requests per minute increased, or whether new sources were added to meet demand.

In contrast to [integrate](ts_integrate.html), this function depends completely on the time window that you're currently looking at.

## Examples

The following example shows how `integral()` sums all sources that start with `app-1*` over the current time window.

![integral](images/ts_integral.png)

As we zoom in, the differences between the different sources become more obvious.

![integral zoomed](images/ts_integral_zoomed.png)

## See Also

[Using Moving and Tumbing Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
