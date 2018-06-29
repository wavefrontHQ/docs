---
title: floor Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_floor.html
summary: Reference to the floor() function
---
## Summary
```
floor(<expression>)
```
Returns the floor for the time series described by the expression, by rounding any data values with decimals down to the nearest integer. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return floor values for. </td></tr>
</tbody>
</table>


## Description

The `floor()` function returns the floor for each data value in the time series described by the expression. 

The floor of a data value is the greatest integer that is less than or equal to that value:

<table>
<tbody>
<thead>
<tr><th width="20%">Sample query with floor()</th><th width="10%">Sample result</th><th width="35%">Input data value</th><th width="35%">Returned value (floor)</th></tr>
</thead>
<tr><td markdown="span">`floor(1.75)`</td> <td> 1 </td> <td>Positive, with fractional part</td><td>Integer part of the input value</td></tr>
<tr><td markdown="span">`floor(-1.75)`</td><td> -2 </td> <td>Negative, with fractional part</td><td>Next lower integer</td></tr>
<tr><td markdown="span">`floor(1)`</td><td> 1 </td> <td>Positive integer</td><td>Same as the input value</td></tr>
<tr><td markdown="span">`floor(-1)`</td><td> -1</td> <td>Negative integer</td><td>Same as the input value</td></tr>
</tbody>
</table>

`floor()` returns a separate series of results for each time series described by the expression.

## Examples

Here's a query that returns a time series that reports positive fractional values between .2 and 1.2. 
![floor before](images/ts_floor_before.png)

Now we apply `floor()` to our original query. Notice that the values below 1 are mapped to 0, and the values from 1 to 1.2 are mapped to 1.
  
![floor after](images/ts_floor_after.png)

## See Also

[`ceil()`](ts_ceil.html)

[`round()`](ts_round.html)
