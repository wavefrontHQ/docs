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
rawvariance(<tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])
```

Returns the variance across the set of time series described by the expression. The results are computed from real reported data values only. 
Use [`variance()`](ts_variance.html) to include interpolated values.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the set of time series to return raw variances for. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional <code>group by</code> parameter for organizing the time series into subgroups and then returning the raw variance for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

The `rawvariance()` aggregation function computes the raw variance among data values at each moment in time, across the time series that are represented by the expression.  

By default, `rawvariance()` produces a single series of raw variances by aggregating data values across all time series. You can optionally group the time series based on one or more characteristics, and obtain a separate series of raw variances for each group.

A raw variance is computed only from those time series that actually report real values at a given moment in time. 
No interpolation is performed to fill in data gaps in any time series.
Use [`variance()`](ts_variance.html) if you want to include time series with interpolated values wherever possible. Using `rawvariance()` instead of `variance()` can significantly improve query performance. 

### Grouping

Like all aggregation functions, `rawvariance()` returns a single series of results by default.  You can include a `group by` parameter to obtain separate raw variances for groups of time series that share common metric names, source names, source tags, point tags, or values for a particular point tag key. 
The function returns a separate series of results corresponding to each group.

You can specify multiple 'group by' parameters to group the time series based on multiple characteristics. For example, `rawvariance(ts("cpu.cpu*"), metrics, Customer)` first groups by metric names, and then groups by the values of the `Customer` point tag.


{% include note.html content="Starting with the 2023-20.x release, grouping is case-sensitive. For example, if you ingest point tags such as `zone` and `ZONE`, when you use an aggregation function and apply grouping, we will consider `zone` and `ZONE` as separate tags. " %}

## Example

In following example, we use `rawvariance()` to display the variance for sample request latency, grouped by environment (`dev` or `production`). 

![raw variance](images/ts_rawvariance.png)
