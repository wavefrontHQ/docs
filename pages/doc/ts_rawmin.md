---
title: rawmin Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawmin.html
summary: Reference to the rawmin() function
---
## Summary
```
rawmin(<expression>[,metrics|sources|sourceTags|tags|<pointTagKey>])
```

This aggregation function returns the lowest value of all series. In contrast to `min()`, this function does not attempt to fill gaps in the data.

There is no `rawmin()` comparison function.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to find the minimum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to filter or group the minimum by. </td>
</tr>
</tbody>
</table>


## Description

When you add `rawmin()` to a `ts()` expression, Wavefront sorts the values at each time interval and displays the lowest (minimum) data value across all reporting metrics and sources.

For `rawmin`, Wavefront does not perform interpolation.

## Examples

In following example, we use `rawmin` to display the sample requests number for each region.

![raw min](images/ts_rawmin.png)
