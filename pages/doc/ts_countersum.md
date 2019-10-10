---
title: counter_sum Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_countersum.html
summary: Reference to the counter_sum() function
---
## Summary
```
counter_sum(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the per-second rate of change for each time series described by the expression. Recommended for counter metrics to see increase or reset.

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


The `counter_sum()` function returns the per-second rate of change for each time series described by the expression. The results include only non-negative rates of change.

This function is similar to the [rate() function](ts_rate.html). Both functions report only positive values, and both gap the first data value to be reported by a new time series.
However, there are differences:
* `rate()` gaps on counter reset, but `counter_sum()` reports zero.
* `counter_sum()` allows you to group by metrics, sources, etc. `rate()` does not support group by parameters.

## Examples

The following simple examples contrast `rate()`, `deriv()`, and `counter_sum`.

The `rate()` function only shows positive rates of change - even if the rate appears to drop to zero, it is slightly above zero.

![rate vs. counter_sum](images/ts_countersum_rate.png)

In contrast, the `deriv()` function shows both negative and positive rates of change.

![deriv vs. counter_sum](images/ts_counter_sum_deriv.png)

Finally, `counter_sum()` shows both no change (zero) and negative rates of change as zero.

![counter_sum](images/ts_counter_sum.png)


## See Also

Related functions include
* [rate()](ts_rate.html), which reports zero while counter_sum() reports only non-negative rates of change.
* [deriv()](ts_deriv.html), which reports zero and negative rates of change.
