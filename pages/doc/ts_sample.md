---
title: sample Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_sample.html
summary: Reference to the sample() function
---
## Summary
```
sample(<numberOfTimeSeries>, <expression>)
```
Returns `numberOfTimeSeries` non-random time series based on the expression. This function is deterministic as long as the underlying set of time series stays the same. The returned values might change, for example, if a new source starts reporting the metric.

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

Returns `numberOfTimeSeries` non-random time series based on the expression. This function is deterministic as long as the underlying set of time series stays the same. The returned values might change, for example, if a new source starts reporting the metric.

Don't confuse `sample()` with  [` downsample()`](ts_downsample.html), which returns the values in the expression that occur in each timeWindow.

## Examples

The following example shows 10% of all `~sample.cpu.loadavg.1m` metrics. You would get the same results if you selected 3 of the metrics instead. 

![sample cpu load average](images/ts_sample.png)
