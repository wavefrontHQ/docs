---
title: max Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_max.html
summary: Reference to the max() function
---
## Summary
```
max(<expression1>, <expression2>)
max(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

When used as a comparison function, returns the higher of the two values in `expression1` and `expression2`.

When used as an aggregation function, returns the highest value across the set of time series described by `expression`. The results might be computed from real reported values and interpolated values. Use [`rawmax()`](ts_rawmax.html) if you don't need interpolation.


## Parameters

### Comparison Function
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>expression1</td>
<td>Expression to use as a threshold value for comparison.
</td></tr>
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
<td>Expression describing the set of time series to return maximums for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the maximum for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

You can use `max()` as a comparison function or as an aggregation function.

### Comparison Function

The `max()` comparison function lets you display all data points above a desired threshold, and assigns the threshold value to all data points below the threshold.

### Aggregation Function

The `max()` aggregation function finds the highest (maximum) data value at each moment in time, across the time series that are represented by the expression.

By default, `max()` produces a single series of maximums by aggregating values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of maximums for each group.

If any time series has data gaps, `max()` fills them in by interpolation whenever possible. 

#### Grouping

The `max()` aggregation function returns a single series of results by default. You can include a 'group by' parameter to obtain separate maximums for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `max(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


#### Interpolation

If any time series has gaps in its data, Wavefront attempts to fill these gaps with interpolated values before applying the function. 
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it. 
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart. 
In this case, Wavefront finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawmax()`](ts_rawmax.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


## Examples

### Comparison Function


The following example shows the total number of sample requests.

![ts max before](images/ts_max_comparison_before.png)

And here we see the only the metrics if there are more than 200 sample requests.

![ts max 250](images/ts_max_250.png)


### Aggregation Function

The following example shows first the total number of sample requests for 2 sources, `app-2` and `app-20`.

![before aggregation with max](images/ts_max_aggr_before.png)

And here we see what happens when we apply `max()`.

![after aggregation with max](images/ts_max_aggr_after.png)

## Caveats

Sometimes it's best to use `max()` with `align()`. 
See [Bucketing with align()](query_language_align_function.html).

Using [`rawmax()`](ts_rawmax.html) instead of `max()` can significantly improve query performance because `rawmax()` does not perform interpolation.
