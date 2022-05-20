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
rawcount(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the number of reporting time series described by the expression at each moment in time. A time series is counted as reporting at a given moment only if it has a real data value, instead of an interpolated value.
Use [`count()`](ts_count.html) to include time series with interpolated values.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to be counted.  </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning a raw count for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `rawcount()` aggregation function adds together the number of actually reporting time series represented by the expression, at each moment in time.

By default, `rawcount()` produces a single raw count across across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate raw count for each group.

A raw count is computed only from those time series that actually report real values at a given moment in time.
No interpolation is performed to fill in data gaps in any time series.
Use [`count()`](ts_count.html) if you want the counts to include time series with interpolated values wherever possible. Using `rawcount()` instead of `count()` can significantly improve query performance.

### Grouping

Like all aggregation functions, `rawcount()` returns a single series of results by default.
You can include a 'group by' parameter to obtain separate raw counts for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawcount(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


## Example

The following example shows the raw count grouped by the values of the `env` point tag. There's an area for each environment.

![rawcount example](images/ts_rawcount.png)
