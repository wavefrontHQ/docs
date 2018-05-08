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
sum(<expression>[,metrics|sources|sourceTags|tags|<pointTagKey>])
```
Returns the sum of all series. If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available. Use `rawsum()` if you don't need interpolation.

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

The `sum()` function takes the sum, at each time slice, of the different data lines in `expression`. If at least one data value is present in a given time slice, then all other existing time series in the query are interpolated before the aggregation if possible.

Like all aggregation functions, `sum` usually returns a single line when used without additional arguments.

With the optional `sources`, `metrics`, `sourceTags`, or `tags` parameter, you can 'group by' that parameter. You can use more than one parameter, and you can specify one or more point tags by name.

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


You can specify multiple arguments. For example, `sum(ts("cpu.cpu*"), metrics, Customer)` first groups by metrics, and then groups by the `Customer` point tag.

## Caveats

Using `rawsum()` instead of `sum()` can significantly improve query performance. If you don't need interpolation, consider that option.
