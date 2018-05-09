---
title: retainSeries Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_retainSeries.html
summary: Reference to the retainSeries() function
---

## Summary
```
retainSeries(<expression> [, <metric>|source=<s>|tag=<st>|tagk=<pointTagKey>])
```
<!---should that be metric inside angles?-->

Retains the specified metric, source, source tag, or point tag in the expression.  To retain a particular source, source tag, or point tag, specify one of `source=`, `tag=`, or `tagk=`. Set `tagk` to the point tag key to retain. You can specify only one parameter per function call. To specify multiple parameters, use a retainSeries() call for each parameter.

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
<td>metric, source=, tag=, tagk=</td>
<td>The metric, source, source tag, or point tag to filter by. See [the filter() Function](ts_filter.html) for an in-depth discussion of source tags, point tags, and when to use them. </td></tr>
</tbody>
</table>

## Description

Allows you to retain only the specified metric, source, source tag, or point tag in the expression. To filter a particular source, source tag, or point tag, specify either `source=` or `tag=` or `tagk=` and to the key you want to filter by.

You might be able to use the `retainSeries()` function to retain only the series that have the synthetic point tag that you define, for example, in conjunction with `taggify()`

You can specify only one parameter (metric, source, source tag, or point tag) per function call. To specify multiple parameters, use a `filter()` call for each parameter. In contrast to `filter()` this function supports expanding a source tag.


## Examples

The following example first extracts all `~sample.requests.*` metrics that are in the `dev` environment.

![retain series 1](images/ts_retain_series_1.png)

Then we extract from that series only the series that come from the app-5 source. The result are just three series.

![retain series 2](images/ts_retain_series_2.png) 
