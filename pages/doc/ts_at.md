---
title: at Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_at.html
summary: Reference to the at() function
---
## Summary
```
at(<timeWindow>, <expression>)
```
Returns a single current or past reported data value from the time series described by the expression. The returned value is displayed continuously across the chart, so you can use it as a reference value for comparing against the results of other queries. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<td markdown="span"> [timeWindow](query_language_reference.html#query-elements)</td>
<td>The report time of the data value to be returned, expressed as:
<ul>
<li>Amount of time before the current time. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</li>
<li>A quoted string indicating a time relative to your chart. You can specify the current time (<strong>"now"</strong>), 
the start time of your chart (<strong>"start"</strong>), or the end time of your chart (<strong>"end"</strong>).</li>
</ul>
</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return a data value from. </td></tr>
</tbody>
</table>


## Description

The `at()` standard time function returns the data value that was reported at a particular time by the time series described by the expression.  The returned value is displayed continuously across the chart, so you can use it as a reference value for comparing against the results of other queries. `at()` returns a separate result for each time series described by the expression.

You designate the data value of interest by specifying the time it was reported, typically as an interval before the current time. For example, you can specify `2h` to obtain the data value that was reported 2 hours ago. In fact, you'll see the value from 2 hours ago, even if you're looking at a chart of past values from weeks or months ago.

As an alternative, you can specify the time relative to your chart. For example, you can use `"start"` to obtain the data value that was reported at the beginning of your current chart window. In fact, if you're looking at a chart of past values, `"start"` causes `at()` to return the earliest of those past values.
 
When live data is reported, `at()` adjusts the returned value as necessary to reflect any changes in the data reported by the time series. Adjustments can occur whenever the chart is updated (every 30 seconds). For example, consider a time series that reports a different value every 2 minutes. If you run a query with `at()` at 8:00am to return the value reported 2 hours ago (at 6:00am), the result is automatically adjusted around 8:02am to show the value that was reported at 6:02am.  


## Examples

Here's a query that shows the maximum request latency across all sources and point tags.
![at before](images/ts_at_before.png)

Now we'd like to see how these maximums compare to the maximum request latency that was reported 2 weeks ago. We add a second query that applies `at()` to the original query. From this chart, we can see some increases in the maximum latency over 2 weeks ago.
![at after](images/ts_at_after.png)
