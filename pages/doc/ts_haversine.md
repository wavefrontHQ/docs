---
title: haversine Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_haversine.html
summary: Reference to the haversine() function
---
## Summary
```
haversine(<lat1>, <long1>, <lat2>, <long2>)
```
Returns the distance between the specified pair of coordinates. 


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [lat1, long1](query_language_reference.html#expressions)</td>
<td>Expressions specifying the latitude and longitude of the first pair coordinates.</td></tr>
<td markdown="span"> [lat2, long2](query_language_reference.html#expressions)</td>
<td>Expressions specifying the latitude and longitude of the second pair of coordinates.</td></tr>
</tbody>
</table>


## Description
The `haversine()` function returns the distance between the specified pair of coordinates. 

You specify each coordinate as a pair of expressions representing latitude and longitude. The expressions may be constants or ts() expressions.


## Example
In the following example, we specify a set of coordinates and the chart returns the distance in kilometers.

![ts haversine](images/ts_haversine.png)
