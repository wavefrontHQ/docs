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
rawmax(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the highest value across the set of time series described by the expression. The results are computed from real reported data values only.
Use [`max()`](ts_max.html) to include interpolated values.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to return raw maximums for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the raw maximum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

The `rawmax()` aggregation function displays the highest (maximum) data value at each moment in time, across the time series that are represented by the expression.

By default, `rawmax()` returns a single series of maximums by aggregating data values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of maximums for each group.

A raw maximum is computed only from real values reported at a given moment in time.
No interpolation is performed to fill in data gaps in any time series.
Use [`max()`](ts_max.html) if you want the maximums to include interpolated values wherever possible. Using `rawmax()` instead of `max()` can significantly improve query performance.

### Grouping

Like all other aggregation functions, `rawmax()` returns a single series of results by default. You can include a 'group by' parameter to obtain separate raw maximums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawmax(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

{% include note.html content="Starting with the 2023-20.x release, grouping is case-sensitive. For example, if you ingest point tags such as `zone` and `ZONE`, when you use an aggregation function and apply grouping, we will consider `zone` and `ZONE` as separate tags. " %}

## Example

In following example, we use `rawmax()` to display the maximum for the sample cpu usage percentage, and display a line for each region.

![raw max](images/ts_rawmax_aggr.png)
