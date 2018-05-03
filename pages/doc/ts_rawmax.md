---
title: rawmax Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawmax.html
summary: Reference to the rawmax() function
---
## Summary
```
rawmax(<expression>[,metrics|sources|sourceTags|tags|<pointTagKey>])
```

This aggregation function returns the highest value of all series. In contrast to `max()`, this function does not attempt to fill gaps in the data.

There is no `rawmax()` comparison function.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to find the maximum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to filter or group the maximum by. </td>
</tr>
</tbody>
</table>


## Description

When you add `rawmax()` to a `ts()` expression, Wavefront sorts the values at each time interval and displays the highest (maximum) data value across all reporting metrics and sources.

For `rawmax`, Wavefront does not perform interpolation.


## Examples

In following example, we use `rawmax` to display the maximum for the sample cpu usage percentage, and display a line for each region.

![raw max](images/ts_rawmax_aggr.png)
