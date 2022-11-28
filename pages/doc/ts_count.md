---
title: count Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_count.html
summary: Reference to the count() function
---
## Summary
```
count(<tsExpression>[, metrics|sources|sourceTags|pointTags|<pointTagKey>])

count(<hsExpression>)

count(<eventsExpression>)
```
You can use `count()` with time series, with histograms, and with events.

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td markdown="span"> Time series <br>aggregation function</td>
<td markdown="span">Returns the number of reporting time series described by the `tsExpression` at each moment in time.
A time series is counted as reporting even if it has interpolated values.</td></tr>
<tr>
<td markdown="span">Histogram <br>conversion function</td>
<td markdown="span">Returns time series that consist of the number of values in each histogram distribution described by the `hsExpression`.</td>
</tr>
<tr>
<td markdown="span">Event <br>conversion function</td>
<td markdown="span">Returns a single time series that reports the number of event boundaries that occur in `eventExpression` over time.</td>
</tr>
</tbody>
</table>

If a time series stops reporting data, use the [`mcount()` function](ts_mcount.html) -- it continues for 2x the specified time window, and then stops. The `mcount()` function returns the moving count for each time series described by the expression. The moving count is the number of data points reported by a time series over a shifting time window. For example, `mcount(10m, ts(my.metric))` returns, at each point, the number data values over the previous 10 minutes for each specified time series.

## Parameters

### Time-Series Aggregation Function

<table style="width: 100%;">
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to be counted. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning a count for each subgroup.
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
<td>Expression describing the histogram distributions to obtain the number of values from. </td></tr>
</tbody>
</table>

### Events Conversion Function

<table style="width: 100%;">
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> [eventExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the events to count over time. </td></tr>
</tbody>
</table>


## Description

You can use `count()`:
* With time series as an aggregation function for time series.
* With histogram series as a conversion function.
* With event sets as a conversion function.

### Time-Series Aggregation Function

The `count()` aggregate function adds together the number of reporting time series represented by the expression, at each moment in time.

By default, `count()` produces a single count across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate count for each group.

If a time series has data gaps, `count()` fills them in by interpolation whenever possible. A time series with an interpolated value is considered to be reporting and is included in the current count.  When a value cannot be interpolated into a time series (or if the series stops reporting altogether), the series is excluded from the count.


#### Grouping

Like all aggregation functions, `count()` returns a single series of results by default.

You can include a 'group by' parameter to obtain separate counts for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key.
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `count(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


#### Interpolation

If any time series has gaps in its data, the query engine attempts to fill these gaps with interpolated values before applying the function.
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it.
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart.
In this case, the query engine finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawcount()`](ts_rawcount.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).

### Histogram Conversion Function

The `count()` histogram conversion function returns the number of data values in each distribution of each histogram series that is represented by the expression. The counts for a given histogram series are returned as a separate time series that contains a data point corresponding to each input distribution.

`count()` is a histogram conversion function because it takes histogram distributions as input, and returns time series. You can therefore use a histogram conversion function as a `tsExpression` parameter in a time series query function.

### Events Conversion Function

The `count()` events conversion function returns a single time series in which each data point reports the number of event boundaries in `eventExpression` at that moment in time.

The number of event boundaries at a particular moment in time is equal to: the number of events that started at that time, minus the number of events that ended at that time. Instantaneous events are represented as a single “0” value: 1 started minus 1 ended (instantaneous events are defined as events having their end time equal to their start time).

![Events count](images/count_events.png)


## Examples

### Time-Series Aggregation Function

The following examples contrast the result you get for two different types of servers. We're using a Single Stat View chart to first get a count of all servers that have a sample requests latency and the source `app-1*` (11 servers). Then we get a count of all servers that have the source `app-2*` While the example is a bit contrived, it illustrates how to use the function.

![count 1](images/ts_count1.png)

![count 2](images/ts_count2.png)

The following Stacked Area chart groups all sources whose name starts with `"app-1*"` by the `env` point tag. The chart shows that 1 server is tagged with `dev` and 10 servers are tagged with `production`.

![count grouped](images/ts_count_groupby_env.png)

### Histogram Conversion Function

The following example shows the result of applying `count()` to an `hsExpression`. As the legend shows, the distribution at 2:40p summarizes 3 values.

![hs count](images/hs_count.png)

**Note:**  `count()` returns a separate time series for each input histogram series. In this example, the `hsExpression` represents a single histogram series, so the result is a single time series. (In contrast, when `count()` is used as an aggregation function with a `tsExpression`, a single returned time series might be the result of counting multiple input time series.)


## Caveats

Count is not a static number, it will change if the number of hosts reporting the metric changes. For some types of analysis, it is better to use `avg()` instead of `count()`.

<!---Ticket 1815 --->
