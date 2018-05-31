---
title: sum Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_sum.html
summary: Reference to the sum() function
---
## Summary
```
sum(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the sum of all series. If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available. Use `rawsum()` if you don't need interpolation.

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
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the sum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

The `sum()` function takes the sum, at each time slice, of the different data lines in `expression`. If at least one data value is present in a given time slice, then all other existing time series in the query are interpolated before the aggregation if possible.

Like all aggregation functions, `sum()` returns a single series of results by default.  You can include a 'group by' parameter to obtain separate subtotals for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `sum(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

## Examples

The following examples illustrate this.

**Example 1: No Filtering, no Grouping**

This chart does no grouping and shows a single line:

![sum_simple](images/ts_sum.png)

**Example 2: Filtering by Source**

This chart uses a filter, it selects only `db-*` servers. We still see a single line, but a different pattern:

`sum(ts(~sample.cpu.loadavg.1m, source="db-*"))`

![sum_groupby_db](images/ts_sum_filter.png)

**Example 3: Grouping by Source and Point Tag**

This chart filters by source and groups by the `env` point tag (`env=production` and `env=dev`). This chart also shows us why the charts in Example 1 and Example 2 are so similar. The servers in the two groups have similar but not the same CPU load patterns.

`sum(ts(~sample.cpu.loadavg.1m, source="db-*"),env)`

![sum_groupby_db](images/ts_sum_filter_group.png)




## Caveats

Using `rawsum()` instead of `sum()` can significantly improve query performance. If you don't need interpolation, consider that option.
