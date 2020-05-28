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

Functions that let you

* `union()` is similar to the AND operator and lets you combine time series.
* `intersect()` is similar to the OR operator.
* `complement()` indicates an UNLESS relationship between two time series.

For each function, you have to specify at least two expressions. You can specify additional expressions.


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

Allows you to perform logical set operations on two or more time series.

* `union()` takes at least 2 time series as parameters and returns
* `complement()` takes at least 2 time series as parameters and returns
* `intersect()` takes at least 2 time series as parameters and returns

<!---
## Examples




## See Also
--->
