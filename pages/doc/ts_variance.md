---
title: variance Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_variance.html
summary: Reference to the variance() function
---
## Summary
```
variance(<expression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```
Returns the variance for `expression`.

If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available. Use `rawvariance()` if you don't want interpolation.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to return the variance for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning the variance for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>

## Description

Returns the variance between the different data lines in a `ts()` expression, computed at each time interval. If there are gaps of data in the expression, they are first filled in using interpolation if at least 1 known value is available.

Use `rawvariance()` if you don't need interpolation.

Like all aggregation functions, `variance()` returns a single series of results by default.  You can include a 'group by' parameter to obtain separate variances for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `variance(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


## Examples

The following example shows the variance for request latency for all servers in the sample set.

![ts variance](images/ts_variance.png)

The next example shows the same query, but groups the results by environment (`env` point tag).

![ts variance grouped](images/ts_variance_grouped.png)
