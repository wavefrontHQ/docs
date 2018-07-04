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
mcount(<timeWindow>, <expression>)
```
Returns the number of data points reported over the specified time window. If a time series stops reporting data, `mcount()` continues for 2x the specified time window, and then stops.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td>Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.

<div><strong>NOTE</strong>: If a time series stops reporting data, <code>mcount()</code> continues for 2x the specified time window, and then stops.</div></td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series you want moving counts for.  </td>
</tr>
</tbody>
</table>

## Description

The `mcount()` function returns the moving count for each time series described by the expression. The moving count is the number of data points reported by a time series over a shifting time window. For example, `mcount(10m, ts(my.metric))` returns, at each point, the number data values over the previous 10 minutes for each specified time series.

If a time series stops reporting data, `mcount()` continues to return the moving count until up to 2 times the elapsed time window after the last reported point, and returns no data after that.

Here's how to select your counting/summing function:

* `mcount()` - returns the number of data points reported over a shifting time window
* `msum()` - returns the sum of the data points reported over a shifting time window
* `count()` - returns the number of time series reporting at each moment in time
* `mseriescount()` - returns the number of time series reporting during a shifting time window

Common use cases include finding missing data points. Because of that, `mcount()` is often used with alerts. 

## Example

The following example queries the ambient air temperature in a vehicle using this query:

`ts(vehicle.ambient_air_temp)`

The chart below shows this simple raw metric, which reports points several times per minute. Near the end of the time window, no points are reported.

![chart_without_mcount](images/mcount_1.png)

To see more clearly what's happening, we can use `mcount()`. The chart below shows the results of the following query as red points:

`mcount(5m,ts(vehicle.ambient_air_temp))`

![chart_with_mcount](images/mcount_2.png)

The query says: Show me points that represent the number of points that `weather.humidity` reported in the last 5 minutes.

Notice how the red points are around 180 until the yellow points stop reporting. Then the red line drops slowly to 0 as fewer and fewer points reported `weather.humidity` in the last 5 minutes. You can see that 2.5 minutes after the yellow line stops, the red line shows that 90 points were reported in the last 5 minutes.

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)

[Account for Missing Data Points](alerts_robustness_increasing.html#account-for-missing-data-points)
