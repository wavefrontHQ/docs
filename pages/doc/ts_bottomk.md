---
title: bottomk Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_bottomk.html
summary: Reference to the bottomk() function
---
## Summary
```
bottomk(<numberOfTimeSeries>, <expression>)
```
Returns the bottom number of time series in the expression, based on the most recent data point.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of time series that you want.  </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

Returns the bottom number of time series in the expression, based on the most recent data point.


## Examples

The following example shows only the bottom 3 time seriesß for which we have the total number of sample requests.

![bottomk example](images/ts_bottomk.png)
