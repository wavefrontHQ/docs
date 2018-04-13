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
max(expression1, expression2)
max(expression[,metrics|sources|sourceTags|tags|<pointTagKey>])
```

When used as a comparison function, returns the higher of the two values in `expression1` and `expression2`.
When used as an aggregation function, returns the highest value of all series. If there are gaps of data in `expression`, they will first be filled in with interpolation. Use `rawmax` to return the highest value of all series without interpolation.

## Parameters

### Comparison Function
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
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
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to find the maximum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to filter or group the maximum by. </td>
</tr>
</tbody>
</table>

## Description

You can use `max()` as a comparison function or as an aggregation function.

### Comparison Function

The `max()` comparison function lets you display all data points above a desired threshold, and assign the threshold value to all data points below the threshold.

### Aggregation Function

When you add `max()` to a ts() expression, Wavefront sorts the values at each time interval and displays the highest (maximum) data value across all reporting metrics and sources.

The `max()` aggregation function interpolates the points of the underlying set of series, and then applies the function to the interpolated series. Use `rawmax` to not use interpolation. See [Standard Versus Raw Aggregate Functions](query_language_aggregate_functions.html).

To provide an aggregate value that our customers typically expect, Wavefront attempts to interpolate all queries at a time slice if at least one real reported data value is present.

For a live-view chart, where interpolation is not possible because no new points have been reported yet, Wavefront associates the last known reported value for all queries if a real reported data value is present. We apply the last known reported value only if interpolation can’t occur AND the last known reported point has been reported within the last 15% of the query time in the chart window.

## Examples

### Comparison Function

`max(160, ts(my.metric))` for all values in `my.metric` that are is less than 160. For all `my.metric` values greater than 160, returns the value of `my.metric`.

The following example shows the total number of sample requests.

![ts max before](images/ts_max_comparison_before.png)

And here we see the only the metrics if there are more than 200 sample requests.

![ts max 250](images/ts_max_250.png)


### Aggregation Function

The following example shows first the total number of sample requests for 2 sources, app-2 and app-20.

![before aggregation with max](images/ts_max_aggr_before.png)

And here we see what happens when we apply max.

![after aggregation with max](images/ts_max_aggr_after.png)

## Caveats

Sometimes it's best to use `max` with `align`.
