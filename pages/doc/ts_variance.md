---
title: variance Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_variance.html
summary: Reference to the variance() function
---
## Summary
```
variance(expression[,metrics|sources|sourceTags|tags|<pointTagKey>])
```
Returns the variance for `expression`.

If there are gaps of data in the expression, they are first filled in using interpolation. Use `rawvariance` if you don't want interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to return the variance for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to modify the variance. </td>
</tr>
</tbody>
</table>

## Description

Returns the variance between the different data lines in a `ts()` expression, computed at each time interval. If there are gaps of data in the expression, they are first filled in using interpolation. Use `rawvariance()` if you don't need interpolation.

## Examples

The following example shows the variance for request latency for all servers in the sample set.

![ts variance](images/ts_variance.png)

The next example shows the same query, but groups the results by environment (`env` point tag).

![ts variance grouped](images/ts_variance_grouped.png)
