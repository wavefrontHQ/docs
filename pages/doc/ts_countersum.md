---
title: counter_sum Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
published: false
permalink: ts_countersum.html
summary: Reference to the counter_sum() function
---
## Summary
```
counter_sum(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

For counter metrics, returns the per-second rate of change for all time series.

<!---This function is public but not in QLR page on purpose. Used for special cases (tracing) and name is non-standard (underbar)--->

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the first derivative for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description


The `counter_sum()` function is intended for counter metrics and solves the following problem:
* If you call `sum(rate(<mymetric>))`, then interpolation can distort the result.
* If you call `rawsum(rate(<mymetric))`, there's no interpolation but query execution is not efficient.

The `counter_sum()` function returns the sum of the per-second rate of change for all data, but does so efficiently.


## Examples

The following simple examples contrast `sum(rate)`, `rawsum(rate)`, and `counter_sum`.




## See Also

Related functions include
* [rate()](ts_rate.html) and [deriv()](ts_deriv.html) report rates of change.
* [sum()](ts_sum.html) and [rawsum()](ts_rawsum.html) aggregate metrics with and without interpolation.
