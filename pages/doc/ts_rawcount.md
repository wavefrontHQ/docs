---
title: rawcount Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawcount.html
summary: Reference to the rawcount() function
---
## Summary
```
rawcount(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

The `rawcount()` aggregation function aggregates any data values that are truly reported at a given time slice across all reported series, and displays the total number of present data values as the point at that time slice.

In contrast to `count()`, `rawcount()` does not perform interpolation.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create a count for. With <strong>rawcount()</strong>, we count only reported values and do not perform interpolation. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the raw count for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

At each time interval, the `rawcount()` function adds together the number of actually reporting sources for each represented metric, and displays that value as a line on the chart.

Like all aggregation functions, `rawcount()` returns a single series of results by default.  
You can include a 'group by' parameter to obtain separate raw counts for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawcount(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.
## Example

The following example shows the raw count grouped by the values of the `env` point tag. The orange line, for the production environment, is at the top.

![rawcount example](images/ts_rawcount.png)
