---
title: min Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_min.html
summary: Reference to the min() function
---
## Summary
```
min(<expression1>, <expression2>)
min(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

When used as a comparison function, returns the lower of the two values in `expression1` and `expression2`.
When used as an aggregation function, returns the lowest value of all series. If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available. Use `rawmin` to return the highest value of all series without interpolation.

## Parameters

### Comparison Function
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>expression1</td>
<td>Expression to compare with another expression or with a metric, source, sourceTag(s), tag(s), or pointTagKey. </td></tr>
<tr>
<td>expression2</td>
<td>Second expression of two expressions to compare.   </td>
</tr>
</tbody>
</table>

### Aggregation Function
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return the minimum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the minimum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

You can use `min()` as a comparison function or as an aggregation function.

### Comparison Function

The `min()` comparison function lets you display all data points above a desired threshold, and assigns the threshold value to all data points below the threshold.

### Aggregation Function

When you add `min()` to a ts() expression, Wavefront sorts the values at each time interval and displays the lowest (minimum) data value across all reporting metrics and sources.
The `min()` aggregation function interpolates the points of the underlying set of series, and then applies the function to the interpolated series. Use `rawmin` to not use interpolation. See [Standard Versus Raw Aggregate Functions](query_language_aggregate_functions.html).

#### Interpolation

To provide an aggregate value that our customers typically expect, Wavefront attempts to interpolate all queries at a time slice if at least one real reported data value is present.

For a live-view chart, where interpolation is not possible because no new points have been reported yet, Wavefront associates the last known reported value for all queries if a real reported data value is present. We apply the last known reported value only if interpolation can’t occur AND the last known reported point has been reported within the last 15% of the query time in the chart window.

#### Grouping

The `min()` aggregation function returns a single series of results by default. You can include a 'group by' parameter to obtain separate minimums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `min(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

## Examples

### Comparison Function

The following example from our built-in Interactive Query Language Tutorial illustrates the use of `min`. It includes a mark line so you can see how the values are shown as 200 if they are higher than the specified minimum.

![ts min](images/ts_min.png)

### Aggregation Function

The following example shows `min()` without an expression to compare against. For this example, we can group the results.

![ts min aggr](images/ts_min_aggr.png)


## Caveats

Sometimes it's best to use `min` with `align`. See [Bucketing with align()](query_language_align_function.html).
