---
title: lead Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_lead.html
summary: Reference to the lead() function
---
## Summary
```
lead(<timeWindow>, <expression>)
```
Returns later data values from the time series described by the expression, to help you compare each time series with its own subsequent behavior. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<td markdown="span"> [timeWindow](query_language_reference.html#query-elements)</td>
<td>Amount of time you want to go forward to obtain the values to return. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.
</td></tr> 
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return later values from. </td></tr>
</tbody>
</table>


## Description

The `lead()` standard time function returns later data values from the time series described by the expression. These later data values are time-shifted back by the specified amount of time along the time axis, for easy comparison with earlier data values. 

For example, say you have used [`hw()`](query_language_hw_function.html) to project a time series into the future, and you want to compare some actual reported data values against the values forecasted for 3 weeks from now.  You can use `lead()` to "shift" the forecasted values back by 3 weeks, so that they align, point for point, with the currently reported values. 

Or, say you are using a chart with a custom date to view data values that were reported 4 hours ago, and you want to  compare each of those values with the value reported by the same time series 1 hour later.  You can use `lead()` to "shift" the later values back, so that they align, point for point, with the earlier values. 

`lead()` returns a separate series of results for each time series described by the expression.

You cannot use `lead()` to see the future values of live data that have not yet been reported by a time series.  

## Examples

Here's a query that shows some request latency averages. By specifying a custom date, we can look at data from 1 hour ago. Notice that the average at 01:12 is 145.000.
![lead before](images/ts_lead_before.png)

Now we'd like to compare each average to the average that was reported 1 minute later. We add a second query that applies `lead()` to the original query. Notice that, at 01:11, `lead()` returns 145.000, which was the value from one minute ahead (01:12) in the time series.

![lead after](images/ts_lead_after.png)

<!--- add an example that involves hw() some day --->

## See Also
[`lag()` Function](ts_lag.html)
