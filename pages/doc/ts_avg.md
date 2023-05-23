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
avg(<tsExpression>[, metrics|sources|sourceTags|pointTags|<pointTagKey>])

avg(<hsExpression>)
```
You can use `avg()` with time series and with histograms.

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td markdown="span"> Time series <br>aggregation function</td>
<td>Returns the average (the mean) of the set of time series described by the expression.
The results might be computed from real reported values and interpolated values.
Use rawavg() if you don't need interpolation.</td></tr>
<tr>
<td markdown="span">Histogram <br>conversion function</td>
<td markdown="span">Returns time series that consist of the average value from each histogram distribution described by the `hsExpression`.</td>
</tr>
</tbody>
</table>

## Parameters

### Time-Series Aggregation Function

<table style="width: 100%;">
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to be averaged. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional <code>group by</code> parameter for organizing the time series into subgroups and then returning the average for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

### Histogram Conversion Function

<table style="width: 100%;">
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> [hsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the histogram series to obtain average values from. </td></tr>
</tbody>
</table>

## Description

You can use `avg()`:
* With time series as an aggregation function.
* With histogram series as a conversion function.

### Time-Series Aggregation Function

The `avg()` aggregation function averages the data values at each moment in time, across the time series that are represented by the expression.

By default, `avg()` produces a single series of averages by aggregating values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of averages for each group.

If any time series has data gaps, `avg()` fills them in by interpolation whenever possible.

The `avg()`, `mavg()` and `mmedian()` functions can help you understand the tendency of the data.

* Use `avg()` or `mavg()` to get the mean (average), that is, the number in the middle of a set of values.
* Use `mmedian()` to be less sensitive to outliers. Even a single outlier can affect the result of `avg()` and `mavg()`. Use `mpercentile()` with a percentile of 50 to get the moving median.


#### Grouping

Like all aggregation functions, `avg()` returns a single series of results by default.
You can include a `group by` parameter to obtain separate averages for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `avg(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

{% include note.html content="Starting with the 2023-20.x release, grouping is case-sensitive. For example, if you ingest point tags such as `zone` and `ZONE`, when you use an aggregation function and apply grouping, we will consider `zone` and `ZONE` as separate tags. " %}

#### Interpolation
If any time series has gaps in its data, the query engine attempts to fill these gaps with interpolated values before applying the function.
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it.
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart.
In this case, the query engine finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawavg()`](ts_rawavg.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).

### Histogram Conversion Function

The `avg()` histogram conversion function computes the average of the data values in each distribution of a histogram series that is represented by the expression. The averages for a given histogram series are returned as a separate time series that contains a data point corresponding to each input distribution.

`avg()` is a histogram conversion function because it takes histogram distributions as input, and returns time series. You can therefore use a histogram conversion function as a `tsExpression` parameter in a time series query function.


## Examples

### Time-Series Aggregation Function

The following example shows the data for `sample.requests.loadavg`. To limit the number of lines, we're filtering to show only time series with `env=dev`.

![metric filtered](images/ts_avg_before.png)

When we apply `avg()` we get a single line.

![avg](images/ts_avg.png)

We can group by the `env()` point tag to see the differences between the dev and production servers.

![avg grouped](images/ts_avg_grouped.png)

### Histogram Conversion Function

In the following example, the blue line shows the result of applying `avg()` to an `hsExpression`. In this particular example, the average is nearly always the same as the median (the red line), with some divergent values around 2:40p.

![hs avg](images/hs_avg.png)

**Note:**  `avg()` returns a separate time series for each input histogram series. In this example, the `hsExpression` represents a single histogram series, so the result is a single time series. (In contrast, when `avg()` is applied to a `tsExpression`, a single returned time series might be the result of combining multiple input time series.)


## Caveats for Time Series

Using [`rawavg()`](ts_rawavg.html) instead of `avg()` can significantly improve query performance because `rawavg()` does not perform interpolation.

## See Also
* [Detect Anomalies with Mean and Median](query_language_statistical_functions_anomalies.html#detect-anomalies-with-mean-and-median)
* [Bucketing with align()](query_language_align_function.html)
* [rawavg()](ts_rawavg.html)
