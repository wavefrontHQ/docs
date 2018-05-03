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
rawsum(<expression>[,metrics|sources|sourceTags|tags|<pointTagKey>])
```
Returns the sum of all series. In contrast to `sum()`, `rawsum()` does not use interpolation to fill gaps in the data.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create a sum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional second expression to include in the sum. </td>
</tr>
</tbody>
</table>


## Description

The `rawsum()` aggregation function sums the values that are reported in a given time slice
across all reported series and displays the total value as a single line in a chart.

This function, like all aggregation functions, returns a single line when used without
additional parameters.

Using `rawsum()` instead of `sum()` can significantly improve query performance.

## Examples

The following chart for returns a single line that sums the load average for all sources.

![rawsum_raw](images/ts_rawsum.png)

You can **group by** point tag for each line. The following example groups the query above by environment.

![rawsum_groupby](images/ts_rawsum_groupby.png)

You can specify more than one grouping arguments.
For example, `rawsum(ts("cpu.cpu*"), metrics, Customer)` first groups by metrics, and then groups by the `Customer` point tag.
