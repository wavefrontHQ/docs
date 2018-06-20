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
avg(expression[,metrics|sources|sourceTags|pointTags|<pointTagKey])
```
Returns the average (the mean) of the set of time series described by the expression. 
The results might be computed from real reported values and interpolated values. 
Use [`rawavg()`](ts_rawavg.html) if you don't need interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the set of time series to be averaged. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the average for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `avg()` aggregation function averages the data values at each moment in time, across the time series that are represented by the expression.  

By default, `avg()` produces a single series of averages by aggregating values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of averages for each group.

If any time series has data gaps, `avg()` fills them in by interpolation whenever possible. 

The `avg()`, `mavg()` and `median()` functions can help you understand the tendency of the data.

* Use `avg()` or `mavg()` to get the mean (average), that is, the number in the middle of a set of values.
* Use `median()` to be less sensitive to outliers. Even a single outlier can affect the result of `avg()` and `mavg()`. Use `mpercentile()` with a percentile of 50 to get the moving median.


### Grouping

Like all aggregation functions, `avg()` returns a single series of results by default. 
You can include a 'group by' parameter to obtain separate averages for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `avg(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


### Interpolation
If any time series has gaps in its data, Wavefront attempts to fill these gaps with interpolated values before applying the function. 
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it. 
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart. 
In this case, Wavefront finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawavg()`](ts_rawavg.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).

## Examples
The following example shows the data for `sample.requests.loadavg`.

When we apply `avg()` we get a single line.

![avg](images/ts_avg.png)

We can group by the `env()` point tag to see the differences between the dev and production servers.

![avg grouped](images/ts_avg_grouped.png)

## Caveats

Using [`rawavg()`](ts_rawavg.html) instead of `avg()` can significantly improve query performance because `rawavg()` does not perform interpolation.

## See Also
* [Mean and Median](query_language_statistical_functions_anomalies.html#mean-and-median)
* [Bucketing with align()](https://docs.wavefront.com/query_language_align_function.html)
