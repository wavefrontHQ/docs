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
rawsum(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the raw sum of the set of time series described by the expression. 
The results are computed from real reported data values only.
Use [`sum()`](ts_sum.html) to include interpolated values.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to be summed. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional <code>group by</code> parameter for organizing the time series into subgroups and then returning a raw sum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

The `rawsum()` aggregation function adds together the data values reported at each moment in time, across the time series that are represented by the expression.  

By default, `rawsum()` returns a single series of sums by aggregating data values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of sums for each group.

A raw sum is computed only from real values reported at a given moment in time. 
No interpolation is performed to fill in data gaps in any time series.
Use [`sum()`](ts_sum.html) if you want the sums to include interpolated values wherever possible. Using `rawsum()` instead of `sum()` can significantly improve query performance. 

### Grouping
Like all aggregation functions, `rawsum()` returns a single series of results by default.  You can include a `group by` parameter to obtain separate raw sums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawsum(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

{% include note.html content="Starting with the 2023-20.x release, grouping is case-sensitive. For example, if you ingest point tags such as `zone` and `ZONE`, when you use an aggregation function and apply grouping, we will consider `zone` and `ZONE` as separate tags. " %}

## Examples

The following chart for returns a single line that sums the load average for all time series.

![rawsum_raw](images/ts_rawsum.png)

You can **group by** point tag for each line. The following example groups the query above by environment.

![rawsum_groupby](images/ts_rawsum_groupby.png)
