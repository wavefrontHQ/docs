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
sample(<numberOfTimeSeries>, <tsExpression>)
```
Returns `numberOfTimeSeries` non-random time series based on the expression. This function is deterministic as long as the underlying set of time series stays the same. However, the returned values can change, for example, if a new source starts reporting the metric.

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
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

Returns `numberOfTimeSeries` non-random time series based on the expression. This function is deterministic as long as the underlying set of time series stays the same. The returned values might change, for example, if a new source starts reporting the metric.


## Examples

The following example shows first the result of a query that returns a fairly large number of time series.

![metric for sample function](images/ts_sample_before.png)

We can use `sample()` to return 10% the time series, in this example, 3.

![sample cpu load average](images/ts_sample.png)

## See Also

For a random set of time series, use the [random()](ts_random.html) function.
