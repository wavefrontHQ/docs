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
rawmin(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the lowest value across the set of time series described by the expression. The results are computed from real reported data values only.
Use [`min()`](ts_min.html) to include interpolated values.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to return raw minimums for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the raw minimum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

The `rawmin()` aggregation function finds the lowest (minimum) reported data value at each moment in time, across the time series that are represented by the expression.

By default, `rawmin()` returns a single series of minimums by aggregating data values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of minimums for each group.

A raw minimum is computed only from real values reported at a given moment in time.
No interpolation is performed to fill in data gaps in any time series.
Use [`min()`](ts_min.html) if you want the minimums to include interpolated values wherever possible. Using `rawmin()` instead of `min()` can significantly improve query performance.

### Grouping

Like all other aggregation functions, `rawmin()` returns a single series of results by default. You can include a 'group by' parameter to obtain separate raw minimums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawmin(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

{% include note.html content="Starting with the 2023-20.x release, grouping is case-sensitive. For example, if you ingest point tags such as `zone` and `ZONE`, when you use an aggregation function and apply grouping, we will consider `zone` and `ZONE` as separate tags. " %}

## Example

In the following example, we use the rawmin aggregation function to show the minimum value for each availability zone over time. 

![raw min](images/ts_rawmin.png)
