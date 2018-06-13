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
<tr><td>timeWindow</td>
<td>Amount of time you want to go forward to obtain the values to return. You can specify:
<ul>
<li>Seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w).</li>
<li>Time relative to the view window length you are currently looking at (1vw). If you are looking at a 30 minute window, <code>1vw</code> is one view-window length, and therefore equivalent to 30m. </li>
<li>Time relative to the bucket size of the chart (1bw). Wavefront calculates bucket size based on the view window length and screen resolution. You can see bucket size at the bottom left of each chart.</li>
</ul>
If the unit is not specified, the default is minutes. 
</td></tr> 
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return later values from. </td></tr>
</tbody>
</table>


## Description

The `lead()` standard time function returns later data values from the time series described by the expression. The data values are time-shifted back by the specified amount of time along the time axis, for easy comparison with earlier data values. 

For example, say you are looking at a set of data values reported by a time series 1 hour ago, and you want to compare them to the data values that were reported 60 seconds later (i.e., 59 minutes ago). You can use a custom date to view the hour-old data, and then use `lead()` to "shift" the time series by 1 minute, so that the newer values align, point for point, with the older values. 

`lead()` returns a separate series of results for each time series described by the expression.

You cannot use `lead()` to see the future values of live data that have not yet been reported by a time series. However, you can use `lead()` to view forecasted values returned by `hw()`. See [Holt-Winters Predictive Analysis](query_language_hw_function.html). 

## Examples

Here's a query that shows some request latency averages. By specifying a custom date, we can look at data from 1 hour ago. Notice that the average at 01:12 is 145.000.
![lead before](images/ts_lead_before.png)

Now we'd like to compare each average to the average that was reported 1 minute later (i.e., 59 minutes ago). We add a second query that applies `lead()` to the original query. Notice that, at 01:11, `lead()` returns the value 145.000, which had actually been reported one minute later (at 01:12) by the specified time series. 
![lead after](images/ts_lead_after.png)

<!--- add an example that involves hw() some day ---!>
