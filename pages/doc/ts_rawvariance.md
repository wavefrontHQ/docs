---
title: rawvariance Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rawvariance.html
summary: Reference to the rawvariance() function
---
## Summary
```
rawmax(expression[,metrics|sources|sourceTags|tags|<pointTagKey>])
```

Returns the highest value of all series. In contrast to `max`, this function does not attempt to fill gaps in the data.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to find the maximum for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;tags&vert;&lt;pointTagKey&gt;</td>
<td>Optional additional expressions to filter or group the variance by. </td>
</tr>
</tbody>
</table>


## Description

Returns the variance between the different data lines in a `ts()` expression, computed at each time interval.

For `rawvariance()`, Wavefront does not perform interpolation. As a result, `rawvariance()` is faster than `variance()`


## Example

In following example, we use `rawvariance` to display the variance for sample request latency, grouped by environment (dev or production).

![raw max](images/ts_rawvariance.png)
