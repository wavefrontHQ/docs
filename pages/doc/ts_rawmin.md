---
title: rawmin Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawmin.html
summary: Reference to the rawmin() function
---
## Summary
```
rawmin(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

This aggregation function returns the lowest value of all series. In contrast to `min()`, this function does not attempt to fill gaps in the data.

There is no `rawmin()` comparison function.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to find the minimum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the raw minimum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

When you add `rawmin()` to a `ts()` expression, Wavefront sorts the values at each time interval and displays the lowest (minimum) data value across all reporting metrics and sources.

For `rawmin`, Wavefront does not perform interpolation.

Like all other aggregation functions, `rawmin()` returns a single series of results by default. You can include a 'group by' parameter to obtain separate raw minimums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawmin(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

## Examples

In following example, we use `rawmin` to display the sample requests number for each region.

![raw min](images/ts_rawmin.png)
