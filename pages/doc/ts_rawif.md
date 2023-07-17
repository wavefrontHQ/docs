---
title: rawif Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawif.html
summary: Reference to the rawif() function
---
## Summary
```
rawif(<condition-tsExpression>, <then-tsExpression>, [<else-tsExpression>])
```

Returns the points from `then-tsExpression` while `condition-tsExpression` returns non-zero values.
Returns points from `else-tsExpression` otherwise. The results are computed from real reported data values only. Use [`if()`](ts_if.html) to include interpolated values.



## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span"> [condition-tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series to be used as the condition. For example, if the condition is <strong>cpu.loadavg.1m>100</strong>, then the condition evaluates to true if the load is greater than 100, and to false otherwise.<br />
This expression typically uses a comparison operator.</td></tr>
<tr><td markdown="span"> [then-tsExpression](query_language_reference.html#query-expressions)</td>
<td>Required expression that describes the time series to return when the condition is met.
<ul>
<li>If <strong>condition-tsExpression</strong> is true for a point, we return the corresponding point from  <strong>then-tsExpression</strong>.</li>
<li>If <strong>condition-tsExpression</strong> is false for a point, we return nothing for that point. </li>
</ul></td></tr>
<tr><td markdown="span"> [else-tsExpression](query_language_reference.html#query-expressions)</td>
<td>Optional expression that describes the time series to return when the condition is not met. <br />
If you include <strong>else-tsExpression</strong>:
<ul><li>If <strong>condition-tsExpression</strong> is true for a point, we return the corresponding point from <strong>then-tsExpression</strong>, that is, we ignore <strong>else-tsExpression</strong></li>
<li>If <strong>condition-tsExpression</strong> is false for a point, we return the corresponding point from <strong>else-tsExpression</strong>. That means we return return a continuous stream of points that change depending on the value of the condition.</li></ul>
 </td></tr>
</tbody>
</table>

## Description
The `rawif()` conditional function returns data values based on the specified condition. The results are computed from real reported data values only with no interpolation. You can determine what values are returned if the condition is true, and what values are returned if the condition is false. The query engine treats a 0 value as false, and all other values as true.

Each of the [tsExpressions](query_language_reference.html#query-expressions) can be a constant or a query that returns one or more non-constant time series.

## Examples

The following example set (`ts(~sample.requests.latency AND source="app-2*")`) starts with a simple metric, and the chart looks like this:

![rawif metric](images/ts_if_metric.png)

Now we use an `rawif` condition that returns a value of 50 for any point that's greater than 100, and a value of 25 otherwise: `rawif(ts(~sample.requests.latency AND source="app-2*")>100, 50, 25)`:

![rawif then else](images/ts_rawif_then_else.png)

Finally, we look at an example that does not use an `else-tsExpression`. For this case, we've limited the query to one time series: `rawif(ts(~sample.requests.latency AND source="app-20")>200, 0)`:

![rawif then](images/ts_rawif_then.png)
