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
rawvariance(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the variance of all series. Does not perform interpolation..


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to find the variance for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td markdown="span">Optional 'group by' parameter for subdividing the results of **expression** and then returning the raw variance for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

Returns the variance between the different data lines in a `ts()` expression, computed at each time interval.

For `rawvariance()`, Wavefront does not perform interpolation. As a result, `rawvariance()` is faster than `variance()`

Like all aggregation functions, `rawvariance()` returns a single series of results by default.  You can include a 'group by' parameter to obtain separate raw variances for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawvariance(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


## Example

In following example, we use `rawvariance` to display the variance for sample request latency, grouped by environment (`dev` or `production`).

![raw max](images/ts_rawvariance.png)
