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
retainSeries(<expression> [, <metricName>|source=<sourceName>|tag=<sourceTag>|tagk=<pointTagKey>])
```

Filters the expression to display only the time series that match the specified metric, source, source tag, or point tag.  To filter by a particular source, source tag, or point tag, specify `source=`, `tag=`, or `tagk=`, respectively. You can specify only one filtering parameter per function call.

<!-- No key is required to retain a metric. =>What does that mean? -->

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
<tr>
<td>&lt;metricName&gt;&vert;source=&vert;tag=&vert;tagk=</td>
<td markdown="span">The metric, source, source tag, or point tag to filter by. See [filter() Function](ts_filter.html) for an in-depth discussion of source tags, point tags, and when to use them. </td></tr>
</tbody>
</table>

## Description

The `retainSeries()` function filters the expression to display only the time series that match the specified metric, source, source tag, or point tag. To filter by a particular source, source tag, or point tag, specify `source=`, `tag=`, or `tagk=`, respectively. Set `pointTagKey` to the unique point tag key to filter by.

You might be able to use the `retainSeries()` function to retain only the series that have the synthetic point tag that you define, for example, in conjunction with `taggify()`.

In contrast to `filter()`, this function supports expanding a source tag.


## Examples

In the following example, we first extract all `~sample.requests.*` metrics that are in the `dev` environment.

![retain series 1](images/ts_retain_series_1.png)

Then we extract from that series only the series that come from the `app-5` source. The resulting chart displays just three series.

![retain series 2](images/ts_retain_series_2.png)
