---
title: deriv Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_deriv.html
summary: Reference to the deriv() function
---
## Summary
```
deriv(<expression>)
```
Returns the per-second rate of change for each time series described by the expression. The results can include both positive and negative rates of change. Use [`rate()`](ts_rate.html) if you want to see only positive rates of change.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return rates of change for. </td></tr>
</tbody>
</table>


## Description

The `deriv()` standard time function returns the rate of change (per second) between adjacent data values in the time series described by the expression. `deriv()` returns a separate series of results for each time series described by the expression.

You can apply `deriv()` to any kind of metric. If you are primarily interested in the rates of change of counter metrics, however, you will get more useful results from [`rate()`](ts_rate.html), which ignores negative rates of change. 

### Rate of Change

`deriv()` finds the per-second rate of change between pairs of adjacent (successively reported) data values.
The rate of change between a pair of data values is computed as follows: 
1. Subtract the earlier data value from the later value.
2. Divide the difference by the number of seconds in the reporting interval.

For example, let's say that a metric has a reporting interval of 30 seconds, and reports successive data values: 

| Value | Time
|105,500 | 05:45:00p 
|105,750 | 05:45:30p

The `deriv()` function computes the rate of change between these data values using the following formula: `(105,750 - 105,500)/30`. The resulting positive value (8.333) is returned at 05:45:30p, indicating that the metric increased by 8.333 per second between the two values.

Notice that the per-second rate of change between the same two data values would be quite different if the metric had reported them two minutes (120 seconds) apart: `(105,750 - 105,500)/120`.  In this case, the returned per-second rate would be 2.083.

Now let's say the above metric reports a later value that is less than the earlier value:

| Value | Time
|105,750 | 05:45:30p 
|105,250 | 05:46:00p

The `deriv()` function computes the rate of change between these data values using the following formula: `(105,250 - 105,750)/30`. The resulting negative value (-16.666) is returned at 05:46:00p, indicating that the metric decreased by 16.666 per second between the two values. (In contrast, `rate()` simply produces a gap in this case, rather than reporting a negative rate of change.) 


## Examples
