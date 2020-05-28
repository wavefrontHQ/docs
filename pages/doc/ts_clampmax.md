---
title: clampMax and clampMin Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_clampmax.html
summary: Reference to the clampMax() and clampMin() functions
---
## Summary
```
clampMax(<max>, <tsExpression>)
clampMin(<min>, <tsExpression>)
```


* The `clampMax()` function changes any point larger than `max` to `max`
* The `clampMin()` function changes any point smaller than `min` to `min`




## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>max</td>
<td>For clampMin(), changes all values that are larger than max to max.</td></tr>
<tr>
<td>min</td>
<td>For clampMin(), changes all values that are smaller than min to min.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want to filter.</td>
</tr>
</tbody>
</table>

## Description

Allows you to add a specified bound to your data points.
* `clampMax()` sets an upper bound. For example, `clampMax(5, ts(xx))` changes any data points that are larger than 5 to 5.
* `clampMin()` sets a lower bound. For example, `clampMin(24, ts(xx))` changes any data points that are smaller than 24 to 24.

## Examples
