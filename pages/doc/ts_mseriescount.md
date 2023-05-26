---
title: mseriescount Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mseriescount.html
summary: Reference to the mseriescount() function
---

## Summary

```
mseriescount(<timeWindow>, <tsExpression>[, metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the aggregated number of series reporting during the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td >Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want the moving series count for. </td></tr>
<tr><td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional <code>group by</code> parameter for organizing the time series into subgroups and then returning a count for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `mseriescount()` function returns the moving series count, which is the aggregated number of time series that are reporting during the shifting time window. For example, `mseriescount(60m, ts(my.metric))` returns the number of series reporting over the previous 60 minutes.

This function is especially helpful if new time series are constantly spun up and taken down and the number of reporting series changes over time. For example, you could use this function to check whether you have the right number of hosts in a cluster. You could also write an alert that checks whether you have enough hosts.

Here's how you use different counting functions:
* `count()` - returns the number of time series reporting at each moment in time
* `mcount()` - returns the number of data points reported by a given time series over a shifting time window
* `mseriescount()` - returns the number of time series reporting during a shifting time window


For example, you could use `mseriescount()` in an alert that fires when the build number changes in any of a set of service pods. To do that, the alert:
* Extracts the `build` point tag
* Checks how many `build` point tags there are in the last hour, day, or week.
* Alerts if it's not 1.

## Examples

The following very simple example illustrates that 11 time series with `source=app-1*` and 2 time series with `source=app-2*` reported in the specified time window. If the number of time series changes frequently, using this function gets you more interesting results.

![ts seriescount](images/ts_mseriescount.png)
