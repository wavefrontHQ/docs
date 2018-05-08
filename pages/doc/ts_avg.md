---
title: avg Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_avg.html
summary: Reference to the avg() function
---
## Summary
```
avg(expression[,metrics|sources|sourceTags|tags|<pointTagKey])
```
Returns the average (the mean) of all series. If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available. Use `rawavg` if you don't want interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create an average (mean) for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to include in the average. </td>
</tr>
</tbody>
</table>

## Description

The `avg()` function takes the average (the mean), at each point in time, of the different time series in the expression. If at least one data value is present at a point in time, then all other existing time series in the query will be interpolated before the average is computed (if possible).

The `avg`, `mavg` and `median` functions can help you understand the tendency of the data.

* Use `avg` or `mavg` to get the mean (average), that is, the number in the middle of a set of values.
* Use `mendian` to be less sensitive to outliers. Even a single outlier can affect the result of `avg` and `mavg`. Use `mpercentile` with a percentile of 50 to get the moving median.

Like all aggregation functions, `avg` usually returns a single line when used without additional arguments.

### Grouping

With the optional `sources`, `metrics`, `sourceTags`, or `tags` arguments, you can 'group by' that attribute. You can use more than one argument, and you can specify one or more point tags by name.

### Interpolation
To provide an aggregate value that our customers typically expect, Wavefront attempts to interpolate all queries at a time slice if at least one real reported data value is present.

For a live-view chart, where interpolation is not possible because no new points have been reported yet, Wavefront associates the last known reported value for all queries if a real reported data value is present. We apply the last known reported value only if interpolation can’t occur AND the last known reported point has been reported within the last 15% of the query time in the chart window.

## Examples
The following example shows the data for `sample.requests.loadavg`.

When we apply `avg` we get a single line.

![avg](images/ts_avg.png)

We can group by the `env` point tag to see the differences between the dev and production servers.

![avg grouped](images/ts_avg_grouped.png)

## Caveats

Using [`rawavg()`](ts_rawavg.html) instead of `avg()` can significantly improve query performance because `rawavg()` does not perform interpolation.

## See Also
* [Mean and Median](query_language_statistical_functions_anomalies.html#mean-and-median)
* [The align() Function](https://docs.wavefront.com/query_language_align_function.html)
