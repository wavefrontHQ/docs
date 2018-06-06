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

When used as an aggregation function, returns the lowest value across the set of time series described by `expression`. The results may be computed from real reported values and interpolated values. 
Use  [`rawmin()`](ts_rawmin.html) if you don't need interpolation.

## Parameters

### Comparison Function
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>expression1</td>
<td>Expression to use as a threshold value for comparison. </td></tr>
<tr>
<td>expression2</td>
<td>Expression describing the time series to be compared against the threshold value.   </td>
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
<td>Expression describing the set of time series to return minimums for. </td></tr>
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

The `min()` comparison function lets you display all data points below a desired threshold, and assigns the threshold value to all data points above the threshold.

### Aggregation Function

The `min()` aggregation function finds the lowest (minimum) data value at each moment in time, across the time series that are represented by the expression.  

By default, `min()` produces a single series of minimums by aggregating values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of minimums for each group.

If any time series has data gaps, `min()` fills them in by interpolation whenever possible. 

#### Grouping

The `min()` aggregation function returns a single series of results by default. You can include a 'group by' parameter to obtain separate minimums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `min(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

#### Interpolation

If any time series has gaps in its data, Wavefront attempts to fill these gaps with interpolated values before applying the function. 
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it. 
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart. 
In this case, Wavefront finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawmin()`](ts_rawmin.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).

## Examples

### Comparison Function

The following example from our built-in Interactive Query Language Tutorial illustrates the use of `min()`. It includes a mark line so you can see how the values are shown as 200 if they are higher than the specified minimum.

![ts min](images/ts_min.png)

### Aggregation Function

The following example shows `min()` without an expression to compare against. For this example, we can group the results.

![ts min aggr](images/ts_min_aggr.png)


## Caveats

Sometimes it's best to use `min()` with `align()`. See [Bucketing with align()](query_language_align_function.html).

Using [`rawmin()`](ts_rawmin.html) instead of `min()` can significantly improve query performance because `rawmin()` does not perform interpolation.
