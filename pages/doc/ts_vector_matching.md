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
retainDimension(<tsExpression>, <pointTag1>, <pointTag2>,...)

removeDimension(<tsExpression>, <pointTag1>, <pointTag2>,...)

```

Functions that let you perform matching operations, similar to the [PromQL Operators/Vector Matching Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching)

* `retainDimension()` is similar to the ON operator.
* `removeDimension()` is similar to the IGNORING operator.

Two entries match if they have the exact same set of labels and corresponding values. The `removeDimension()` function allows ignoring certain point tags when matching, while the `retainDimension()` function allows reducing the set of considered point tags to a provided list.

For each function, you have to specify at least one `ts()` expression and at least one point tag value as a dimension. 


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>A query expression. </td>
</tr>
<tr>
<td markdown="span"><code>pointTag1</code>, <code>pointTag2</code></td>
<td>Point tag values to use as dimensions.</td>
</tr>
</tbody>
</table>

## Description 

Allow you to perform vector matching operations, similar to the PromQL [PromQL Operators/Vector Matching Operators](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching).


## Examples

You can remove the `processId` related results from a query of the type:

```
sum(ts(~agent.listeners.connections.*, processId=3912), port, processId)

```

![A chart created with the above query with two dimensions shown in the pinned legend - port and process ID.](images/before-applying-remove-retaindimension.png)

To do that, use the `removeDimension()` function and include the `processId` tag, which is the dimension that will be removed:

```
removeDimension(sum(ts(~agent.listeners.connections.*, processId=3912), port, processId), "processId")

```

To retain only the `port` dimension in the same query, use the `retainDimension()` function and include the `port` tag, which is the dimension that will be explicitly kept:

```
retainDimension(sum(ts(~agent.listeners.connections.*, processId=3912), port, processId), "port")

```

The resulting chart is one and the same - the `processId` tag is the removed dimension and only the `port` tag is kept in the chart.

![A chart created with the above queries after applying the removeDimension and retainDimenstion functions with one dimension shown in the pinned legend - port.](images/after-applying-remove-retaindimension.png)

You can also use more complex queries with the `by` construct. For example, the query below, keeps the `processId` dimension.

```
retainDimension(sum(ts(~agent.listeners.connections.*, port=2878), port, processId) + by ("processId") sum(ts(~agent.points.2878.blocked), processId), processId)

```

## See also

* [Pairing Up Matching Series](query_language_series_matching.html)
* [Logical Set and Binary Functions (union, intersect, complement)](ts_logicalSet.html)
