---
title: mcount Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mcount.html
summary: Reference to the mcount() function
---

## Summary

```
mcount(timeWindow, expression)
```
The `mcount()` (moving count) function returns the number of data points over `timeWindow()`. If the expression stops reporting data, `mcount()` continues to report until up to 2 the duration of `timeWindow` after the last reported point, and returns no data after that.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>A window of time specified in seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). If the unit is not specified, the default is minutes. Example: 1h.
<div><strong>NOTE</strong>: <code>mcount()</code> returns the number of data points for 2x the duration of <code>&lt;timeWindow&gt;</code>.</div></td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.  </td>
</tr>
</tbody>
</table>

## Description

The `mcount()` function returns the number of data points for 2x the duration of a specified time window. Here's how to select your counting/summing function:

* Use `mcount()` to see the number of points in a time window
* Use `msum()` to see the sum of the data points in a time window
* Use `count()` to see the number of systems reporting

Common use cases include finding missing data points. Because of that, `mcount()` is often used with alerts. 

## Example

The following example queries the ambient air temperature in a vehicle using this query:

`ts(vehicle.ambient_air_temp)`

The chart on the right shows this simple raw metric, which reports points several times per minute. Near the end of the time window, no points are reported.

![chart_without_mcount](images/mcount_1.png)

To see more clearly what's happening, we can use `mcount()`. The chart below shows the results of the following query as red points:

`mcount(5m,ts(vehicle.ambient_air_temp))`

![chart_with_mcount](images/mcount_2.png)

The query says: Show me points that represent the number of points that `weather.humidity` reported in the last 5 minutes.

Notice how the red points are around 180 until the yellow points stop reporting. Then the red line drops slowly to 0 as fewer and fewer points reported `weather.humidity` in the last 5 minutes. You can see that 2.5 minutes after the yellow line stops, the red line shows that 90 points were reported in the last 5 minutes.

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
