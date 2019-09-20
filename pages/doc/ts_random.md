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
When used as a filtering function, returns the specified number of time series chosen randomly from the series described by the expression.

When used as a value generator (no parameters), returns a series of random values between 0.0 and 1.0.

## Parameters
### Filtering Function
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of time series in the random subset. You can express this parameter as a number (e.g. 10) or a percentage (e.g. 17%). </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

### Filtering Function

The `random()` filtering function returns the specified number of time series chosen randomly from the time series described by the expression. Repeated calls display different random subsets.

### Value generator

The `random()` value generator returns a random value between 0.0 and 1.0 for every point in time on a chart. Repeated calls display different random values at each point.


## Examples

### Filtering Function

The following example chart shows 3 of the `~sample.cpu.loadavg.1m` time series, picked randomly. Notice how the sources that were selected are not related.

![random](images/ts_random.png)
