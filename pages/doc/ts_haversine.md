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
<td markdown="span"> lat1, long1</td>
<td markdown="span">[tsExpressions](query_language_reference.html#query-expressions) specifying the latitude and longitude of the first pair coordinates. Either expression can describe a constant or a time series of values.</td></tr>
<tr>
<td markdown="span"> lat2, long2</td>
<td markdown="span">[tsExpressions](query_language_reference.html#query-expressions) specifying the latitude and longitude of the second pair of coordinates. Either expression can describe a constant or a time series of values.</td></tr>
</tbody>
</table>


## Description
The `haversine()` function returns the distance between the specified pair of coordinates.

You specify each coordinate as a pair of expressions representing latitude and longitude. The expressions may be constants or `tsExpressions`.


## Example
In the following example, we specify a set of coordinates and the chart returns the distance in miles.

![ts haversine](images/ts_haversine.png)
