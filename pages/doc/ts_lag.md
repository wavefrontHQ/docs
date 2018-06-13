---
title: lag Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_lag.html
summary: Reference to the lag() function
---
## Summary
```
lag(<timeWindow>, <expression>)
```
Returns earlier data values from the time series described by the expression, to help you compare each time series with its own past behavior. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td>timeWindow</td>
<td>Amount of time you want to go back to obtain the past values. You can specify:
<ul>
<li>Seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w).</li>
<li>Time relative to the view window length you are currently looking at (1vw). If you are looking at a 30 minute window, <code>1vw</code> is one view-window length, and therefore equivalent to 30m. </li>
<li>Time relative to the bucket size of the chart (1bw). Wavefront calculates bucket size based on the view window length and screen resolution. You can see bucket size at the bottom left of each chart.</li>
</ul>
If the unit is not specified, the default is minutes. 
</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return earlier values from. </td></tr>
</tbody>
</table>


## Description

The `lag()` standard time function returns data values that were reported earlier by the time series described by the expression. The data values are time-shifted forward by the specified amount of time along the time axis, for easy comparison with more recent data values.

For example, say you want to use a single chart to show a set of recent data values reported by a time series, along with the data values that were reported 4 hours earlier. You can use `lag()` to "time-shift" the time series by 4 hours, so that the earlier values align, point for point, with the more recent values. 

`lag()` returns a separate series of results for each time series described by the expression.

Note:
* If you simply want to see earlier values without comparing them to more recent data in the same chart, you can simply turn off live data and specify custom start and end dates. 
* If you want to time shift by 1 day, 1 week, or 1 month, you can use the chart's <strong>Compare</strong> menu as a shortcut for querying with `lag(1d, ...)`, `lag(1w, ...)`, or `lag(1m, ...)`. 

## Examples

Here's a query that shows some recent request latency averages.
![lag before](images/ts_lag_before.png)

Now we'd like to see how these averages compare to the averages that were reported 4 hours earlier. We add a second query that applies `lag()` to the original query.
![lag after](images/ts_lag_after.png)
