---
title: ceil Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_ceil.html
summary: Reference to the ceil() function
---
## Summary
```
ceil(<expression>)
```
Returns the ceiling for the time series described by the expression, by rounding any data values with decimals up to the nearest integer.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return ceiling values for. </td></tr>
</tbody>
</table>


## Description

The `ceil()` function returns the ceiling for each data value in the time series described by the expression. 

The ceiling of a data value is the smallest integer that is greater than or equal to that value:

<table>
<tbody>
<thead>
<tr><th width="20%">Sample query with ceil()</th><th width="10%">Sample result</th><th width="35%">Input data value</th><th width="35%">Returned value (ceiling)</th></tr>
</thead>
<tr><td markdown="span">`ceil(1.75)`</td> <td> 2 </td> <td>Positive, with fractional part</td><td>Next higher integer</td></tr>
<tr><td markdown="span">`ceil(-1.75)`</td><td> -1 </td> <td>Negative, with fractional part</td><td>Integer part of the input value</td></tr>
<tr><td markdown="span">`ceil(1)`</td><td> 1 </td> <td>Positive integer</td><td>Same as the input value</td></tr>
<tr><td markdown="span">`ceil(-1)`</td><td> -1</td> <td>Negative integer</td><td>Same as the input value</td></tr>
</tbody>
</table>

`ceil()` returns a separate series of results for each time series described by the expression.

## Examples

Here's a query that returns a time series that reports positive fractional values between .2 and 1.2. 
![ceil before](images/ts_ceil_before.png)

Now we apply `ceil()` to our original query. Notice that the values below 1 are mapped to 1, and the values from 1 to 1.2 are mapped to 2.
  
![ceil after](images/ts_ceil_after.png)

## See Also

[`floor()`](ts_floor.html)

[`round()`](ts_round.html)
