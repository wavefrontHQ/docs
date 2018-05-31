---
title: rawmax Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawmax.html
summary: Reference to the rawmax() function
---
## Summary
```
rawmax(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

This aggregation function returns the highest value of all series. In contrast to `max()`, this function does not attempt to fill gaps in the data.

There is no `rawmax()` comparison function.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return the raw maximum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the raw maximum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

When you add `rawmax()` to a `ts()` expression, Wavefront sorts the values at each time interval and displays the highest (maximum) data value across all reporting metrics and sources.

For `rawmax`, Wavefront does not perform interpolation.

The `rawmax()` aggregation function returns a single series of results by default. You can include a 'group by' parameter to obtain separate raw maximums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawmax(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


## Examples

In following example, we use `rawmax` to display the maximum for the sample cpu usage percentage, and display a line for each region.

![raw max](images/ts_rawmax_aggr.png)
