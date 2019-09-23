---
title: Trigonometric Functions
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_trig.html
summary: Reference to the trigonometric functions
---
## Summary

Performs the indicated trigonometric function on each data value described by the expression.

<table style="width: 100%;" id="trig-functions">
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="30%" />
<col width="10%" />
</colgroup>
<tbody>
<thead>
<tr><th>Function Syntax</th><th>Description</th><th>Input Values</th><th>Return Values</th><th>Math Notation</th></tr>
</thead>
<tr>
<td markdown="span">`sin(<expression>)`</td>
<td>Sine</td>
<td>Radians</td>
<td>Ratio of opposite/hypotenuse sides for an angle of <em>&Theta;</em> radians.</td>
<td markdown="span">`sin` <em>&Theta;</em></td>
</tr>

<tr>
<td markdown="span">`cos(<expression>)`</td>
<td>Cosine</td>
<td>Radians</td>
<td>Ratio of adjacent/hypotenuse sides for an angle of <em>&Theta;</em> radians.</td>
<td markdown="span">`cos` <em>&Theta;</em></td>
</tr>

<tr><td markdown="span">`tan(<expression>)`</td>
<td>Tangent</td>
<td>Radians</td>
<td>Ratio of opposite/adjacent sides for an angle of <em>&Theta;</em> radians.</td>
<td markdown="span">`tan` <em>&Theta;</em></td></tr>

<tr><td markdown="span">`asin(<expression>)`</td>
<td td markdown="span">Arcsine <br>Inverse of `sin()`</td>
<td>Ratio of sides. <br>Number -1 &lt; <em>x</em> &lt; 1</td>
<td>Radians in the angle for a given ratio of opposite/hypotenuse sides.</td>
<td markdown="span">`asin` _`x`_</td></tr>

<tr><td markdown="span">`acos(<expression>)`</td>
<td td markdown="span">Arccosine <br>Inverse of `cos()` </td>
<td>Ratio of sides. <br>Number -1 &lt; <em>x</em> &lt; 1</td>
<td>Radians in the angle for a given ratio of adjacent/hypotenuse sides.</td>
<td markdown="span">`acos` _`x`_</td></tr>

<tr><td markdown="span">`atan(<expression>)`</td>
<td td markdown="span">Arctangent <br>Inverse of `tan()`</td>
<td>Ratio of sides</td>
<td>Radians in the angle for a given ratio of opposite/adjacent sides. </td>
<td markdown="span">`atan` _`x`_</td></tr>

<tr><td markdown="span">`atan2(<y-expression>, <x-expression>)`</td>
<td markdown="span">Arctangent <br>Alternative to `atan()` </td>
<td>y and x coordinates</td>
<td>Radians in the angle for a ratio of y and x coordinates. </td>
<td markdown="span">`atan` _`y`_`/`_`x`_</td></tr>

<tr><td markdown="span">`sinh(<expression>)`</td>
<td>Hyperbolic sine</td>
<td>Number</td>
<td markdown="span"> (_e_<sup>x</sup> - _e_<sup>-x</sup>)/2</td>
<td markdown="span">`sinh` _`x`_</td></tr>

<tr><td markdown="span">`cosh(<expression>)`</td>
<td>Hyperbolic cosine </td>
<td>Number</td>
<td markdown="span">(_e_<sup>x</sup> + _e_<sup>-x</sup>)/2</td>
<td markdown="span">`cosh` _`x`_</td></tr>

<tr><td markdown="span">`tanh(<expression>)`</td>
<td>Hyperbolic tangent</td>
<td>Number</td>
<td markdown="span">(`sinh` _`x`_)/(`cosh` _`x`_)</td>
<td markdown="span">`tanh` _`x`_</td></tr>

</tbody>
</table>



## Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing input values that are interpreted as indicated in the [table above](#trig-functions). **Note:** You can use [`toRadians()`](ts_trig_utilities.html) to convert values from numbers of degrees to numbers of radians.</td></tr>
<tr>
<td markdown="span"> [y-expression](query_language_reference.html#query-expressions), [x-expression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Used in `atan2()`. Expressions describing values that represent pairs of y and x coordinates. </td></tr>
</tbody>
</table>

## Description

Each trigonometric function produces data points by performing a calculation on the data points returned by the input expression. 
* If `expression` is a constant, then the function returns a continuous series.  
* If `expression` describes one or more time series, then the function returns a new time series for each input time series. 
Each value in a new time series is obtained by operating on the value of the corresponding point in the input time series. 

## See Also

[`toDegrees()`](ts_trig_utilities.html)

[`toRadians()`](ts_trig_utilities.html)
