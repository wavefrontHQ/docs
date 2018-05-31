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
rawpercentile(<percentileValue>, <expression>[, metrics|sources|sourceTags|pointTags|<pointTagKey])
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
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the values at the specified percentile for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

The `rawpercentile()` aggregation function lets you compute percentiles, including the median. The `percentileValue` can be any number greater than 0 and less than or equal to 100, and can include as many decimal points as you like. The Wavefront system sorts all values for each time slice and returns data based on the `percentileValue`.


Use [`percentile`](ts_percentile.html) if you don't want interpolation.

Like all aggregation functions, `rawpercentile()` returns a single series of results by default.  You can include a 'group by' parameter to obtain separate percentile results for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawpercentile(ts(50, "cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.

## Examples

The following simple example shows the median (50th percentile) for the requests latency. It's a single line because `rawpercentile()` is an aggregation function.

![percentile simple](images/ts_rawpercentile.png)

The following example shows the 75th percentile for the request latency. Here, we group by the `env` point tag and get a line for `env=production` and a line for `env=dev`.

![percentile grouped](images/ts_rawpercentile_env.png)
