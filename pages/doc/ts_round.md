---
title: round Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_round.html
summary: Reference to the round() function
---
## Summary
```
round(<tsExpression>)
```
Returns the nearest integer for each data value in the time series described by the expression.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series to return rounded values for. </td></tr>
</tbody>
</table>


## Description

The `round()` function returns the nearest integer for each data value in the time series described by the expression, by mapping any data value with a fractional part to the integer that is closest in value.

The nearest integer is computed as follows:

<table>
<tbody>
<thead>
<tr><th width="20%">Sample query with round()</th><th width="10%">Sample result</th><th width="35%">Input data value</th><th width="35%">Returned value (nearest integer)</th></tr>
</thead>
<tr><td markdown="span">`round(1.75)`</td> <td>2 </td> <td>Positive, with fractional part &gt; 0.5</td><td>Integer with the next higher absolute value</td></tr>
<tr><td markdown="span">`round(-1.75)`</td><td>-2 </td> <td>Negative, with fractional part &gt; 0.5</td><td>Integer with the next higher absolute value</td></tr>
<tr><td markdown="span">`round(1.25)`</td><td>1 </td> <td>Positive, with fractional part &lt; 0.5</td><td>Integer with the next lower absolute value</td></tr>
<tr><td markdown="span">`round(-1.25)`</td><td>-1 </td> <td>Negative, with fractional part &lt; 0.5</td><td>Integer with the next lower absolute value</td></tr>
<tr><td markdown="span">`round(0.5)`</td><td>1 </td> <td>Positive, with fractional part = 0.5</td><td>Integer with the next higher value (round half up technique)</td></tr>
<tr><td markdown="span">`round(-0.5)`</td><td>0 </td> <td>Negative, with fractional part = 0.5</td><td>Integer with the next higher value (round half up technique)</td></tr>
</tbody>
</table>

`round()` returns a separate series of results for each time series described by the expression.

## Examples

Here's a query that returns a time series that reports positive fractional values between .2 and 1.2. Here's the chart, with the color set to purple.
![round before](images/ts_round_before.png)

Now we apply `round()` to our original query. Notice that the values below .5 are mapped to 0, and the values between .5 and 1.2 are mapped to 1. The original query is still in purple, the round is set to orange. 

![round after](images/ts_round_after.png)

## See Also

[`ceil()`](ts_ceil.html)

[`floor()`](ts_floor.html)
