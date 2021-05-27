---
title: Matching Functions (retainDimension, removeDimension)
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
published: true
permalink: ts_vector_matching.html
summary: Reference to the retainDimension and removeDimension functions
---
## Summary

```
retainDimension(<tsExpression1>, <pointTag1>, <pointTag2>,... operator <tsExpression2>)

removeDimension(<tsExpression>, <pointTag1>, <pointTag2>,... operator <tsExpression2>)

```

Functions that let you perform matching operations, similar to the PromQL [PromQL Operators/Vector Matching Operators]https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching)

* `retainDimension()` is similar to the ON operator.
* `removeDimension()` is similar to the IGNORING operator.

Two entries match if they have the exact same set of labels and corresponding values. The `removeDimension()` function allows ignoring certain point tags when matching, while the `retainDimension()` function allows reducing the set of considered point tags to a provided list.

For each function, you have to specify at least one `ts()` expression and at least one point tag value as a dimension. You can also use `groupRight` and `groupLeft` modifiers to achieve many-to-one and one-to-many vector matches.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression1](query_language_reference.html#query-expressions)</td>
<td>First expression in the set. </td>
</tr>
<tr>
<td markdown="span"> [tsExpression2](query_language_reference.html#query-expressions)</td>
<td>Second expression in the set. </td>
</tr>
<tr>
<td markdown="span">pointTag value</td>
<td>A point tag value to use as a dimension.</td>
</tr>
<tr>
<td markdown="span"><code>groupLeft</code> and <code>groupRight</code></td>
<td>Modifiers that allow you to request many-to-one and one-to-many matchings, where left or right determines which vector expression has higher cardinality.</td>
</tr>
</tbody>
</table>

## Description 

Allow you to perform vector matching operations, similar to the PromQL [PromQL Operators/Vector Matching Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching).


## How to Use

Here is an example on how to use the Wavefront query language functions. In this table:

* `exp1` and `exp2` are expressions, which in Wavefront query language are `ts1()` and `ts2()`
* `A`, `B`, `C`, and `D` are point tag values
* `op` is an operator, such as a comparison operator (>, <, =, >=, <=, !=) and arithmetic operator (+, -, /, *)

<table>
<tbody>
<thead>
<tr><th width="40%">PromQL</th><th width="60%">Wavefront Query Language</th></tr>
</thead>
<tr>
<td><code>exp1 op on(A, B) exp2</code></td>
<td><code>retainDimension(ts1() op ts2(), A, B)</code></td>
</tr>
<tr>
<td><code>exp1 op ignoring(B) exp2</code></td>
<td><code>removeDimension(ts1() op ts2(), B)</code></td>
</tr>
<tr>
<td><code>exp1 op group_left(A,B) exp2</code></td>
<td><code>retainDimension(ts1() op groupLeft ts2(), A, B)</code></td>
</tr>
<tr>
<td><code>exp1 op group_right(A,B) exp2</code></td>
<td><code>retainDimension(ts1() op groupRight ts2(), A, B)</code></td>
</tr>
<tr>
<td><code>exp1 op on(A, B) group_left(C, D) exp2</code></td>
<td><code>retainDimension(retainDimenion(ts1() op groupLeft ts2(), C, D), A, B)</code></td>
</tr>
<tr>
<td><code>exp1 op on(A, B) group_right(C, D) exp2</code></td>
<td><code>retainDimension(retainDimenion(ts1() op groupRight ts2(), C, D), A, B)</code></td>
</tr>
<tr>
<td><code>exp1 op ignoring(A, B) group_left(C, D) exp2</code></td>
<td><code>removeDimension(retainDimenion(ts1() op groupLeft ts2(), C, D), A, B)</code></td>
</tr>
<tr>
<td><code>exp1 op ignoring(A, B) group_right(C, D) exp2</code></td>
<td><code>removeDimension(retainDimenion(ts1() op groupRight ts2(), C, D), A, B)</code></td>
</tr>
</tbody>
</table>

## Examples

## See also

* [Pairing Up Matching Series](query_language_series_matching.html)
* [Logical Set and Binary Functions (union, intersect, complement)](ts_logicalSet.html)
