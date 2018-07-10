---
title: abs Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_abs.html
summary: Reference to the abs() function
---
## Summary
```
abs(<expression>)
```
Returns the absolute value of the expression.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>A ts() expression for which you want the absolute value.</td></tr>
</tbody>
</table>


## Description

At times, charts display data that fluctuates between positive and negative values. When the `abs()` function is added to a `ts()` expression, each data point will be displayed as an absolute value (the distance from zero).


## Examples

Suppose that you have a `ts()` expression that displays three data points: 2, -1, and -9. If you add the `abs()` function to the expression, then the data points are displayed as 2, 1, and 9.

The following example shows how `abs()` displays a corresponding positive value for each negative value in the chart. We've included a line for 0 to illustrate how the function works.

![ts abs](images/ts_abs.png)
