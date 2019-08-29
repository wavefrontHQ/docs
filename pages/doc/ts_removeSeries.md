---
title: removeSeries Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_removeSeries.html
summary: Reference to the removeSeries() function
---

## Summary
```
removeSeries(<expression> [, <metricName>|source=<sourceName>|tag=<sourceTag>|tagk=<pointTagKey>])
```
<!---should that be metric inside angles?-->

Filters the expression to display only the time series that do <em>not</em> match the specified metric, source, source tag, or point tag. No key is required to remove a metric. To filter by a particular source, source tag, or point tag, specify `source=`, `tag=`, or `tagk=`, respectively. You can specify only one filtering parameter per function call.

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

The `removeSeries()` function filters the expression to display only the time series that do not match the specified metric, source, source tag, or point tag. To filter by a particular source, source tag, or point tag, specify `source=`, `tag=`, or `tagk=`, respectively. Set `pointTagKey` to the unique point tag key to filter by.

You can specify only one filtering parameter per function call. To filter by multiple parameters, use a `removeSeries()` call for each parameter.

<!---At times, a simpler way to remove series is to use Boolean operators. For example, instead of:
```
removeSeries(ts("smp-fax*.count", source="-eq"), "smp-fax*.metrics.wavefront.*")
```
you can call:

```
ts("smp-fax*.count" and not "smp-fax*.metrics.wavefront.*", source="-eq*")`
```
--->


## Examples

The following example removes all series tagged with `env=dev`, so only those with `env=production` remain.

![remove series](images/ts_remove_series.png)
