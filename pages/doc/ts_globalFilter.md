---
title: globalFilter Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_globalFilter.html
summary: Reference to the retainSeries() function
---

## Summary
```
globalFilter(<expression> [, <metric>|source=<source>|tag=<sourceTag>|tagk=<pointTagKey>])
```

Filters the expression to display only the time series that matches the specified filters. This function works for ts() and hs() expressions.

<!-- No key is required to retain a metric. =>What does that mean? -->

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
<tr>
<td>metric&vert;source=&vert;tag=&vert;tagk=</td>
<td markdown="span">The metric, source, source tag, or point tag to filter by. See [How to Use Different Tag Types](tags_overview.html#how-to-use-different-tag-types). </td></tr>
</tbody>
</table>

## Description

The `globalFilter()` function filters a time series or histogram expression. You can filter by metric, source, source tag, or point tag. To filter by a source, source tag, or point tag, specify `source=`, `tag=`, or `tagk=`. Set `pointTagKey` to the unique point tag key to filter by.

The `globalFilter()` function is similar to [retainSeries()](ts_retainSeries.html), but filters are pushed all the way into the inner ts()/hs() expressions. That means you can use `globalFilter()` to filter data pre-aggregation. 


## Examples

In the following example, we first extract all `~sample.requests.*` metrics that are in the `dev` environment.

![retain series 1](images/ts_retain_series_1.png)

Then we extract from that series only the series that come from the `app-5` source. The resulting chart displays just three series.

![retain series 2](images/ts_retain_series_2.png)
