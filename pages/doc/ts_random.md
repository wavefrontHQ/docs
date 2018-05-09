---
title: random Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_random.html
summary: Reference to the random() function
---
## Summary
```
random(<numberOfTimeSeries>, <expression>)
```
Returns `numberOfTimeSeries` random time series based on the expression.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of time series that you want. You can express this parameter as a number (e.g. 10) or a percentage (e.g. 17%). </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

The `random()` function returns a random value between 0.0 and 1.0 for every point in time on a chart. If you reload a chart that uses `random()`, the reloaded chart computes a brand new random value at each point.

## Examples

The following example chart shows 10% of the `~sample.cpu.loadavg.1m` time series, picked randomly. Notice how the sources that were selected are not related.

![random](images/ts_random.png)
