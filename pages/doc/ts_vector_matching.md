---
title: retainDimension and removeDimension Functions
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
published: true
permalink: ts_retainDimension_removeDimension.html
summary: Reference to the retainDimension() and removeDimension() functions
---
## Summary

```
retainDimension(<tsExpression>, <pointTag1>, <pointTag2>,...)

removeDimension(<tsExpression>, <pointTag1>, <pointTag2>,...)

```

Functions that let you retain or remove dimensions from the query results. 

* `retainDimension()` allows to explicitly state which dimensions you want to see in the query output.
* `removeDimension()` allows to explicitly state which dimensions you want to remove from the query output.

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

Functions that let you retain or remove dimensions (point tags) from the query results.

## Examples

You can remove the `env` dimension from a query of the type:

```
ts(~sample.cpu.usage.*)

```

This sample query has 4 dimensions, such as source, metric, availability zone, and environment.

![A chart created with the sample query with 4 dimensions shown in the pinned legend - source, metric, availability zone and environment.](images/before-applying-remove-retaindimension.png)

To remove the `env` dimension, use the `removeDimension()` function and include the `env` tag, which is the dimension that you want to be removed:

```
removeDimension(ts(~sample.cpu.usage.*), env)

```
![A chart created with the above query after applying the removeDimension function with the environment dimension removed from the pinned legend.](images/after-applying-removedimension.png)


To retain only the source and metrics dimensions in the query, and remove the `env` and `az` dimensions, use the `retainDimension()` function and include the `hosts` and `metrics` tags, which are the dimensions that will be explicitly kept:

```
retainDimension(ts(~sample.cpu.usage.*), hosts, metrics)

```

![A chart created with the above query after applying the retainDimension function with the environment and availability zone dimensions removed from the pinned legend.](images/after-applying-retaindimension.png)
