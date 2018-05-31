---
title: rawsum Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawsum.html
summary: Reference to the rawsum() function
---
## Summary
```
rawsum(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the sum of all series. In contrast to `sum()`, `rawsum()` does not use interpolation to fill gaps in the data.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create a sum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the raw sum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name. </td>
</tr>
</tbody>
</table>


## Description

The `rawsum()` aggregation function sums the values that are reported in a given time slice
across all reported series and displays the total value as a single line in a chart.

Using `rawsum()` instead of `sum()` can significantly improve query performance.

Like all aggregation functions, `rawsum()` returns a single series of results by default.  You can include a 'group by' parameter to obtain separate raw sums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawsum(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


## Examples

The following chart for returns a single line that sums the load average for all sources.

![rawsum_raw](images/ts_rawsum.png)

You can **group by** point tag for each line. The following example groups the query above by environment.

![rawsum_groupby](images/ts_rawsum_groupby.png)
