---
title: rate Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rate.html
summary: Reference to the rate() function
---
## Summary
```
rate(<expression>)
```
Returns the per-second rate of change for each time series described by the expression. The results include only positive rates of change. Use [`deriv()`](ts_deriv.html) if you want negative rates of change as well.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return rates for. </td></tr>
</tbody>
</table>


## Description

The `rate()` standard time function returns the rate of change (per second) between adjacent data values in the time series described by the expression. `rate()` returns a separate series of results for each time series described by the expression.

For example, consider a metric that counts the total number of logins for an application over time. If you're not interested in the total number of logins, but you want to see how fast they are being added, you can use the `rate()` function.

Although you can apply `rate()` to any kind of metric, the intended use is to find the rate of change for counter metrics, which are metrics that report cumulative totals (increasing values) over time. Accordingly, `rate()` returns only positive rates of change. 
You can use [`deriv()`](ts_deriv.html) if you want to see rates of change in other kinds of metrics.

### Rate of Change

`rate()` finds the per-second rate of change between pairs of adjacent (successively reported) data values, where the later value is greater than the earlier value.
The rate of change between a pair of increasing data values is computed as follows: 
1. Subtract the earlier data value from the later value.
2. Divide the difference by the number of seconds in the reporting interval.

For example, let's say that a metric has a reporting interval of 30 seconds, and reports successive data values: 

| Value | Time
|105,500 | 05:45:00p 
|105,750 | 05:45:30p

The `rate()` function computes the rate of change between these data values using the following formula: `(105,750 - 105,500)/30`. The resulting value (8.333) is returned at 05:45:30p, indicating that the metric increased by 8.333 per second between the two values.

Notice that the per-second rate of change between the same two data values would be quite different if the metric had reported them two minutes (120 seconds) apart: `(105,750 - 105,500)/120`.  In this case, the returned per-second rate would be 2.083.


### Response to Counter Resets

A counter metric normally produces an monotonically increasing series of data values, for which `rate()` reports positive rates of change. However, a metric might reset its counter on occasion -- for example, if the metric's source restarts or encounters a particular condition. A metric indicates a counter reset by reporting a lower data value (typically 0) immediately after a higher data value. `rate()` responds to a counter reset by simply producing a gap in its results at that point, rather than reporting a negative rate of change. 

If the metric's counter restarts, the metric reports a higher data value after the lower reset value, and `rate()` resumes its results by computing a positive rate of change.


## Examples

Here's a query that shows a sample metric that increments a counter. The reporting interval is 2 seconds, which means the counter increments every 2 seconds:
![rate before](images/ts_rate_before.png)

Here we apply `rate()` our original query to find how fast the counter grows per second. Notice that the `rate()` results begin one reporting interval after the counter metric began:
![rate after](images/ts_rate_after.png)
