---
title: max Function
keywords: query language reference
tags: [query language reference]
sidebar: doc_sidebar
permalink: ts_max.html
summary: Reference to the max() function
---
## Summary
```
max(<expression>, <expression>)
```
Returns the higher of the two values in `<expression>` and `<expression>`.

For example `max(160, ts(my.metric))` returns 160 if my.metric is less than 160. If my.metric is greater than 160, returns the value of my.metric.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>expression</td>
<td>First expression of two expressions to compare. </td></tr>
<tr>
<td>expression</td>
<td>Second expression of two expressions to compare.   </td>
</tr>
</tbody>
</table>

## Description

When you add `max()` to a ts() expression, Wavefront sorts the values at each time interval and displays the highest (maximum) data value across all reporting metrics and sources.

This is  one of the Wavefront raw aggregate functions. Raw aggregate functions do not interpolate the underlying series before aggregation. Raw functions aggregate data points by time buckets. The differences between these two types of aggregate functions are subtle, but can have a major impact on performance, visualization, and/or alerts. In this article, we provide an example to showcase these differences. See [Standard Versus Raw Aggregate Functions](query_language_aggregate_functions.html). 

## Examples

## Caveats
