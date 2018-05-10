---
title: rawpercentile Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawpercentile.html
summary: Reference to the rawpercentile() function
---

## Summary

```
rawpercentile(<percentileValue>, <expression>[, metrics|sources|sourceTags|tags|<pointTagKey])
```
Returns the percentile of each series over `timeWindow`. In contrast to `percentile()`, this function does not perform interpolation.


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
<td>Optional additional expressions to modify the percentile. </td>
</tr>
</tbody>
</table>

## Description

The `rawpercentile()` aggregation function lets you compute percentiles, including the median. The `percentileValue` can be any number greater than 0 and less than or equal to 100, and can include as many decimal points as you like. The Wavefront system sorts all values for each time slice and returns data based on the `percentileValue`.

Like all aggregation functions, `rawpercentile()` displays a single line when used without additional arguments. You can group the results by point tag, source tag, and so on.

Use [`percentile`](ts_percentile.html) if you don't want interpolation.

## Examples

The following simple example shows the median (50th percentile) for the requests latency. It's a single line because `rawpercentile()` is an aggregation function.

![percentile simple](images/ts_rawpercentile.png)

The following example shows the 75th percentile for the request latency. Here, we group by the `env` point tag and get a line for `env=production` and a line for `env=dev`.

![percentile grouped](images/ts_rawpercentile_env.png)
