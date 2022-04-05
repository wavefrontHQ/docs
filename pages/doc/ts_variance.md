---
title: variance Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_variance.html
summary: Reference to the variance() function
---
## Summary
```
variance(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the variance based on the set of time series described by the expression.
The results might be computed from real reported values and interpolated values.
Use [`rawvariance()`](ts_rawvariance.html) if you don't need interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to return variances for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the variance for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `variance()` aggregation function computes the variance among data values at each moment in time, across the time series that are represented by the expression.

By default, `variance()` produces a single series of variances by aggregating data values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of variances for each group.

If any time series has data gaps, `variance()` fills them in by interpolation whenever possible.

### Grouping

Like all aggregation functions, `variance()` returns a single series of results by default.  You can include a 'group by' parameter to compute separate variances based on groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `variance(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

### Interpolation

If any time series has gaps in its data, the query engine attempts to fill these gaps with interpolated values before applying the function.
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it.
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart.
In this case, the query engine finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawvariance()`](ts_rawvariance.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


## Examples

The following example shows the request latency for app-2 and app-20.

![ts variance source data](images/ts_latency_source.png)

The `variance` function shows the variance for request latency for the 2 sources in the sample set.

![ts variance](images/ts_variance.png)
