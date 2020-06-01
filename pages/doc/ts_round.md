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
round(<toMultiple>, <tsExpression>)
```
Returns the nearest integer for each data value in the time series described by the expression. Supports rounding toward a number whose multiple you want to round towards.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series to return rounded values for. </td></tr>
<tr>
<td markdown="span">toMultiple</td>
<td>Number whose multiple you want to round toward (integer or decimal)</td></tr>
</tbody>
</table>


## Description

The `round()` function returns the nearest integer for each data value in the time series described by the expression, by mapping any data value with a fractional part to the integer that is closest in value.

`round()` returns a separate series of results for each time series described by the expression.


## Examples

The two different signatures of the function are usually used in different use cases.

### Example 1: Use round() for Precision

One use of `round()` is for achieving precision.  For example, suppose that a series `mySeries` returns 0.564, 0.435, 0.777. The math you need to do requires 1 decimal point. You can use `round()` with the `nearestNumber` parameter like this:

```
round(0.5, mySeries)
```
This call returns  `0.5, 0.5. 1.0`.


### Example 2: Visualize round() Results

Here's a query that returns a time series that reports positive fractional values between .2 and 1.2. Here's the chart, with the color set to purple.
![round before](images/ts_round_before.png)

Now we apply `round()` to our original query. Notice that the values below .5 are mapped to 0, and the values between .5 and 1.2 are mapped to 1. The original query is still in purple, the round is set to orange.

![round after](images/ts_round_after.png)

## See Also

[`ceil()`](ts_ceil.html)

[`floor()`](ts_floor.html)
