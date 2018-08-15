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
<col width="30%" />
<col width="30%" />
<col width="20%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Function Syntax</th><th>Description</th><th>Input Represents</th><th>Output Represents</th></tr>
</thead>
<tr>
<td markdown="span">`toDegrees(<expression>)`</td>
<td></td>
<td>Radians</td>
<td>Equivalent number of degrees.</td>
</tr>

<tr>
<td markdown="span">`toRadians(<expression>)`</td>
<td></td>
<td>Degrees</td>
<td>Equivalent number of radians.</td>
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
<td>Expression describing input values that are interpreted as indicated above. </td></tr>
</tbody>
</table>

## Description

Each trigonometric utility function produces data points by performing a calculation on the data points returned by the input expression.
* If `expression` is a constant, then the function returns a continuous series.  
* If `expression` describes one or more time series, then the function returns a new time series for each input time series. 
Each value in a new time series is obtained by operating on the value of the corresponding point in the input time series. 
