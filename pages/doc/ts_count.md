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

Returns the number of time series that are reporting values.
If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available. Use `rawcount` if you don't want interpolation.



## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return a count for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning a count for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

At each time interval, the `count()` function adds together the number of reporting sources for each represented metric, and displays that value as a line on the chart.

To provide the aggregate value, Wavefront interpolates all queries at a time slice if at least one real reported data value is present.

### Grouping

Like all aggregation functions, `count()` returns a single series of results by default.  

You can include a 'group by' parameter to obtain separate counts for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `count(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


### Interpolation
To provide an aggregate value that our customers typically expect, Wavefront attempts to interpolate all queries at a time slice if at least one real reported data value is present.

For a live-view chart, where interpolation is not possible because no new points have been reported yet, Wavefront associates the last known reported value for all queries if a real reported data value is present. We apply the last known reported value only if interpolation can’t occur AND the last known reported point has been reported within the last 15% of the query time in the chart window.

## Examples

The following examples contrast the result you get for two different types of servers. We're using a Single Stat View chart to first get a count of all servers that have a sample requests latency and the source `app-1*` (11 servers). Then we get a count of all servers that have the source `app-2*` While the example is a bit contrived, it illustrates how to use the function.

![count 1](images/ts_count1.png)

![count 2](images/ts_count2.png)

The following example groups all sources whose name starts with `"app-1*"` by the `env` point tag. The Stacked Area chart shows that 1 server is tagged with `dev` and 10 servers are tagged with `production`.

![count grouped](images/ts_count_groupby_env.png)

## Caveats

Count is not a static number, it will change if the number of hosts reporting the metric changes. For some types of analysis, it is better to use `avg()` instead of `count()`.

<!---Ticket 1815 --->
