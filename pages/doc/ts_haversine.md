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
Returns the distance between coordinates. The input expressions can be constants or ts() expressions.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [lat1, long1, lat2, long2](query_language_reference.html#expressions)</td>
<td>The coordinates for which you want the distance.</td></tr>
</tbody>
</table>


## Description
Returns the distance between coordinates. The expression(s) can be constants or ts() expressions. You must specify 4 arguments, each representing latitude and longitude pairs.
* The 1st and 3rd arguments are latitudes
* The 2nd and 4th arguments are longitudes.


## Example
In the following example, we specify a set of coordinates and the chart returns the distance in kilometers.

![ts haversine](images/ts_haversine.png)
