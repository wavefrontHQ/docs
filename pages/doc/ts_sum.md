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
Returns the sum of the set of time series described by the expression. 
The results may combine interpolated values and real reported values. 
Use [`rawsum()`](ts_rawsum.html) if you don't need interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the set of time series to be summed. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning a sum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

The `sum()` aggregation function adds together the data values at each moment in time, across the time series that are represented by the expression. 

By default, `sum()` produces a single series of sums by aggregating values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of sums for each group.

If any time series has data gaps, `sum()` fills them in by interpolation whenever possible. 


### Grouping

Like all aggregation functions, `sum()` returns a single series of results by default.  You can include a 'group by' parameter to obtain separate subtotals for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `sum(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

### Interpolation

If any time series has gaps in its data, Wavefront attempts to fill these gaps with interpolated values before applying the function. 
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it. 
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart. 
In this case, Wavefront finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawsum()`](ts_rawsum.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


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

Using `rawsum()` instead of `sum()` can significantly improve query performance because `rawsum()` does not perform interpolation.
