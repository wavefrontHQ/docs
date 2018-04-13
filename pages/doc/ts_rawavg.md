---
title: rawavg Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawavg.html
summary: Reference to the rawavg() function
---
## Summary
```
rawavg(expression[,metrics|sources|sourceTags|tags|<pointTagKey>])
```
Returns the average (the mean) of all series. In contrast to `avg`, `rawavg` does not use interpolation to fill gaps in the data.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create an average (mean) for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to include in the average. You can use these expressions to group the results. </td>
</tr>
</tbody>
</table>

## Description

The `rawavg()` function aggregates any values that are truly reported at a given time slice across all reported series. The function displays the average total value as a single line on a chart.

If you want to group the results, you can use one of the optional arguments. For example, suppose you want to see the request latency for all sources.

Using `rawavg()` instead of `avg()` can significantly improve query performance.

## Example

The following example shows the raw average for sample requests, grouped by the `az` tag, which indicates the region to which the hosts below to.

![raw average](images/ts_rawavg.png)

## See Also
[Detecting Anomalies With Functions and Statistical Functions](query_language_statistical_functions_anomalies.html#mean-and-median)
[The align() Function](https://docs.wavefront.com/query_language_align_function.html)
