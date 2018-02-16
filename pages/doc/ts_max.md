---
title: max Function
keywords: query language reference
tags: [query language reference]
sidebar: doc_sidebar
permalink: ts_max.html
summary: Reference to the max() function
---
## Summary
```
max(<expression>, <expression>)
max(expression[,metrics|sources|sourceTags|tags|<pointTagKey>])
```
When used as a returns the higher of the two values in `<expression>` and `<expression>`.
When used as an aggregate function, returns the highest value of all series. If there are gaps of data in expression, they will first be filled in with interpolation.

You can use `rawmax` to return the highest value of all series without interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>expression</td>
<td>Expression to compare with another expression or with a metric, source, sourceTag(s), tag(s), or pointTagKey. </td></tr>
<tr>
<td>expression2</td>
<td>Second expression of two expressions to compare.   </td>
</tr>
<tr>
<td>,metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Second expression of two expressions to compare. This expression can take several forms. </td>
</tr>
</tbody>
</table>

## Description

When you add `max()` to a ts() expression, Wavefront sorts the values at each time interval and displays the highest (maximum) data value across all reporting metrics and sources.

The `max()` function is an aggregate function, which means that it interpolates the points of the underlying set of series, and then applies the function to the interpolated series. Use `rawmax` to not use interpolation. See [Standard Versus Raw Aggregate Functions](query_language_aggregate_functions.html).

## Examples

`max(160, ts(my.metric))` -- returns 160 if my.metric is less than 160. If my.metric is greater than 160, returns the value of my.metric.

`max(ts(“requests.latency”,tag= “rack-4”),hosts)` Returns the aggregate of all reported  values for each individual host across all 3 represented metrics. This query displays a single line for each represented host machine.

The following diagrams show first the CPU idle time for a host, and then the maximum, which amplified the results.

![cpu_idle_time](images/max_without.png)
![max_cpu_idle_time](images/max_with.png)

## Caveats

It might be necessary to use `max` with `align`.
