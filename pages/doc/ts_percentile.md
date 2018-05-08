---
title: percentile Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_percentile.html
summary: Reference to the percentile() function
---

## Summary

```
percentile(<percentileValue>, <expression>[,metrics|sources|sourceTags|tags|<pointTagKey])
```
Returns the `percentileValue` value of all series. If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available.

For example, if `percentileValue` is 99, `percentile()` returns the 99th percentile value of all series.

Set `percentileValue()` to 50 for the mean value of all series.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>percentileValue</td>
<td>A number greater than 0 and less than or equal to 100 that determines which percentile the function returns. You can include as many decimal points as you like.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to return the percentile for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to modify the count. </td>
</tr>
</tbody>
</table>


## Description

The `percentile()` aggregation function lets you compute percentiles, including the median. The `percentileValue` can be any number greater than 0 and less than or equal to 100, and can include as many decimal points as you like. The Wavefront system sorts all values for each time slice and returns data based on the `percentileValue`.

Like all aggregation functions, `percentile()` displays a single line when used without additional arguments. You can group the results by point tag, source tag, and so on.

This function uses interpolation. Use `rawpercentile` if you don't want interpolation.

## Examples

The following simple example shows the median (50th percentile) for the requests latency. It's a single line because `percentile()` is an aggregation function.

![percentile simple](images/ts_percentile.png)

The following example shows the 75th percentile for the request latency. Here, we group by the `env` point tag and get a line for `env=production` and a line for `env=dev`.

![percentile grouped](images/ts_percentile_groupby.png)

<!---See also ticket 2775--->
