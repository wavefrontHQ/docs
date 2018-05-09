---
title: topk Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_topk.html
summary: Reference to the topk() function
---
## Summary
```
topk(<numberOfTimeSeries>, <expression>)
```
Returns the top number of time series in the expression, based on the most recent data point.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of time series that you want.  </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter</td>
</tr>
</tbody>
</table>

## Description

Returns the top number of time series in the expression, based on the most recent data point.


## Examples

The following example shows only the top 3 of the time series for which we have the total number of sample requests.

![topk example](images/ts_topk.png)
