---
title: if Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_if.html
summary: Reference to the if() function
---
## Summary
```
if(<conditionExpression>, <thenExpression>, [<elseExpression>])
```

Returns the points from `thenExpression` while `conditionExpression` returns values >0.
Returns points from `elseExpression` otherwise.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span"> [conditionExpression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to be used as the condition. For example, if the condition is `cpu.loadavg.1m>100` then the condition evaluates to true if the load is greater than 100, and to false otherwise.  </td></tr>
<tr><td markdown="span"> [thenExpression](query_language_reference.html#expressions)</td>
<td>Expression that describes the time series to display when the condition is met. Required. </td></tr>
<tr><td markdown="span"> [elseExpression](query_language_reference.html#expressions)</td>
<td>Expression that describes the time series to display when the condition is not met. Optional. <br />
If you include elseExpression, then we display a continuous stream that changes depending on the value of the condition. </td></tr>
</tbody>
</table>

## Description
The `if()` conditional function returns data values based on the specified condition. You can determine what values are displayed if the condition is true, and what values are displayed if the condition is false. The Wavefront system treats a 0 value as false, and all other values as true.

### Optional Else Expression

* The `conditionExpression` typically uses a comparison operator.
* The `thenExpression` is required.
  - If `conditionExpression` is true for a point we display `thenExpression`. - - - If `conditionExpression` is false for a point, we display nothing.
* The `elseExpression` is optional.
  - If `conditionExpression` is true for a point we display `thenExpression`.
  - If `conditionExpression` is false for a point, we display `elseExpression`.

### Interpolation

If you're using `if` without an `elseExpression`, and if there are multiple true values displayed for a single time series in a time window, then we use interpolation to join those (true) values. You'll see a dotted line.

## Examples

The following example set starts with a simple metric, which looks like this:

![if metric](images/ts_if_metric.png)

Now we use an `if` condition that displays a value of 50 for any point that's greater than 100, and a value of 25 otherwise. Here, the behavior of the two time series diverges: For one, the value alternates between 25 and 50. The other time series is always greater than 100 and displays as a single orange line.

![if then else](images/ts_if_then_else.png)

Finally, we look at an example that does not use an `else` expression. For this case, we've limited the query to one time series, and we can see the interpolation that happens between the different true values.

![if then](images/ts_if_then.png)
