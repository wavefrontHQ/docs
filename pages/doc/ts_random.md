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
random()
```
When used as a filtering function, returns `numberOfTimeSeries` random time series based on the expression.

When used with no parameters, returns random values between 0.0 and 1.0.

## Parameters
<table style="width: 100%;">
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

When used to filter an expression, `random()` returns a random value between 0.0 and 1.0 for every point in time on a chart. If you reload a chart that uses `random()`, the reloaded chart computes a brand new random value at each point.

You can also use `random()` without arguments to return random values between 0.0 and 1.0.

## Examples

The following example chart shows 10% of the `~sample.cpu.loadavg.1m` time series, picked randomly. Notice how the sources that were selected are not related.

![random](images/ts_random.png)
