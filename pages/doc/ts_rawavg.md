---
title: rawavg Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawavg.html
summary: Reference to the rawavg() function
---
## Summary
```
rawavg(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the raw average (mean) of the time series described by the expression.
The results are computed from real reported data values only.
Use [`avg()`](ts_avg.html) to include interpolated values.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to be averaged. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the raw average for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `rawavg()` aggregation function averages the data values reported at each moment in time, across the time series that are represented by the expression.

By default, `rawavg()` returns a single series of averages by aggregating data values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of averages for each group.

A raw average is computed only from real values reported at a given moment in time.
No interpolation is performed to fill in data gaps in any time series.
Use [`avg()`](ts_avg.html) if you want the averages to include interpolated values wherever possible. Using `rawavg()` instead of `avg()` can significantly improve query performance.

### Grouping

Like all aggregation functions, `rawavg()` returns a single series of results by default. You can include a 'group by' parameter to obtain separate raw averages for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawavg(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

## Example

The following example shows the data for `sample.requests.loadavg`. To limit the number of lines, we're filtering to show only time series with `env=dev`.

![metric filtered](images/ts_avg_before.png)

When we apply `rawavg()` we get a single line.

![raw avg](images/ts_rawavg.png)


## See Also
[Detect Anomalies with Mean and Median](query_language_statistical_functions_anomalies.html#detect-anomalies-with-mean-and-median)

[Bucketing with align()](query_language_align_function.html)
