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
count(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the number of reporting time series described by the expression at each moment in time.
A time series is counted as reporting even if it has interpolated values. 
Use [`rawcount()`](ts_rawcount.html) if you don't want to consider interpolated values.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to be counted. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning a count for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `count()` aggregate function adds together the number of reporting time series represented by the expression, at each moment in time.

By default, `count()` produces a single count across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate count for each group.

If a time series has data gaps, `count()` fills them in by interpolation whenever possible. A time series with an interpolated value is considered to be reporting and is included in the current count.  When a value cannot be interpolated into a time series (or if the series stops reporting altogether), the series is excluded from the count.

### Grouping

Like all aggregation functions, `count()` returns a single series of results by default.  

You can include a 'group by' parameter to obtain separate counts for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `count(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


### Interpolation

If any time series has gaps in its data, Wavefront attempts to fill these gaps with interpolated values before applying the function. 
A value can be interpolated into a time series only if at least one other time series reports a real data value at the same moment in time.

Within a given time series, an interpolated value is calculated from two real reported values on either side of it. 
Sometimes interpolation is not possible--for example, when a new value has not been reported yet in a live-view chart. 
In this case, Wavefront finds the last known reported value in the series, and assigns it to any subsequent moment in time for which a real reported data value is present in some other time series. We use the last known reported value only if interpolation can’t occur _and_ if the last known reported value has been reported within the last 15% of the query time in the chart window.

You can use [`rawcount()`](ts_rawcount.html) to suppress interpolation.  See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


## Examples

The following examples contrast the result you get for two different types of servers. We're using a Single Stat View chart to first get a count of all servers that have a sample requests latency and the source `app-1*` (11 servers). Then we get a count of all servers that have the source `app-2*` While the example is a bit contrived, it illustrates how to use the function.

![count 1](images/ts_count1.png)

![count 2](images/ts_count2.png)

The following example groups all sources whose name starts with `"app-1*"` by the `env` point tag. The Stacked Area chart shows that 1 server is tagged with `dev` and 10 servers are tagged with `production`.

![count grouped](images/ts_count_groupby_env.png)

## Caveats

Count is not a static number, it will change if the number of hosts reporting the metric changes. For some types of analysis, it is better to use `avg()` instead of `count()`.

<!---Ticket 1815 --->
