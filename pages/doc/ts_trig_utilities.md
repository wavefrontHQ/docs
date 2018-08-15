---
title: Trigonometric Utility Functions
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_trig_utilities.html
summary: Reference to the trigonometric utility functions
---
## Summary

Converts between radians and degrees.

<table style="width: 100%;">
<colgroup>
<col width="25%" />
<col width="35%" />
<col width="20%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Function Syntax</th><th>Description</th><th>Input Values</th><th>Output Values</th></tr>
</thead>
<tr>
<td markdown="span">`toDegrees(<expression>)`</td>
<td>Conversion from radians to degrees</td>
<td>Radians</td>
<td>Degrees</td>
</tr>

<tr>
<td markdown="span">`toRadians(<expression>)`</td>
<td>Conversion from degrees to radians</td>
<td>Degrees</td>
<td>Radians</td>
</tr>

</tbody>
</table>

## Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing input values to be converted. </td></tr>
</tbody>
</table>

## Description

Each trigonometric utility function converts the data values described by the input expression:
* `toRadians()` interprets each input value as a number of degrees, and returns a corresponding output value that is the equivalent number of radians.
* `toDegrees()` interprets each input value as a number of radians, and returns a corresponding output value that is the equivalent number of degrees.

Each trigonometric utility function returns its results as follows:
* If `expression` is a constant, then the function returns a continuous series of data points.  
* If `expression` describes one or more time series, then the function returns a new time series for each input time series. 
Each value in a new time series is obtained by converting the value of the corresponding point in the input time series. 

You typically use `toRadians()` to convert the input values of the [trigonometric functions](ts_trig.html) `sin()`, `cos()`, or `tan()`. For example, to find the sine of a metric after converting its values to radians: `sin(toRadians(ts(my.metric)))`

You typically use `toDegrees()` to convert the output values of the [trigonometric functions](ts_trig.html) `asin()`, `acos()`, or `atan()`. For example, to obtain the arcsine of a metric, and return its results in degrees: `toDegrees(asin(ts(my.metric)))`

## See Also

[Trigonometric Functions](ts_trig.html)
