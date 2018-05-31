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
rawavg(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the average (the mean) of all series. In contrast to `avg()`, `rawavg()` does not use interpolation to fill gaps in the data.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create an average (mean) for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the raw average for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `rawavg()` function aggregates any values that are truly reported at a given time slice across all reported series. The function displays the average total value as a single line on a chart.

Using `rawavg()` instead of `avg()` can significantly improve query performance.

Like all aggregation functions, `rawavg()` returns a single series of results by default. You can include a 'group by' parameter to obtain separate raw averages for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawavg(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

## Example

The following example shows the raw average for sample requests, grouped by the `az` tag, which indicates the region to which the hosts below to.

![raw average](images/ts_rawavg.png)

## See Also
[Detecting Anomalies With Functions and Statistical Functions](query_language_statistical_functions_anomalies.html#mean-and-median)
[The align() Function](https://docs.wavefront.com/query_language_align_function.html)
