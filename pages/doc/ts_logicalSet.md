---
title: Logical Set and Binary Functions (union, intersect, complement)
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_logicalSet.html
summary: Reference to the union, intersect, and complement logical set functions
---
## Summary
```
union(<tsExpression1>, <tsExpression2> ...)

intersect(<tsExpression1>, <tsExpression2>, ...)

complement(<tsExpression1>, <tsExpression2>, ...)
```

Functions that let you perform logical set operations, similar to the PromQL [PromQL Logical/Set Binary Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/#logical-set-binary-operators)

* `union()` is similar to the OR operator and lets you combine time series.
* `intersect()` is similar to the AND operator.
* `complement()` indicates an UNLESS relationship between two time series.

For each function, you have to specify at least two `ts()` expressions as parameters. You can specify additional `ts()` expressions.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression1](query_language_reference.html#query-expressions)</td>
<td>First expression in the set. </td></tr>
<tr>
<td markdown="span"> [tsExpression2](query_language_reference.html#query-expressions)</td>
<td>Second expression in the set.</td>
</tr>
</tbody>
</table>


## Description

Allows you to perform logical set operations on two or more time series. These operators match the [PromQL Logical/Set Binary Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/#logical-set-binary-operators) `or` (union), `unless` (complement), `and` (intersection).

* `union()` takes at least 2 time series as parameters and returns the points from the first time series plus all points in the other time series which do not have exactly matching point tags.
* `intersect()` takes at least 2 time series as parameters and returns the points of the first series for which there are points with exactly matching point tags in the other time series.
* `complement()` takes at least 2 time series as parameters and returns the points of the first series for which there are no points in the other series that have exactly matching point tags.



<!---
## Examples




## See Also
--->
