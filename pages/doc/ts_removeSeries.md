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
removeSeries(<expression> [, <metric>|source=<s>|tag=<st>|tagk=<pointTagKey>])
```
<!---should that be metric inside angles?-->

Removes the specified metric, source, source tag, or point tag from the expression. No key is required to remove a metric. To remove a particular source, source tag, or point tag, specify one of source=, tag=, or tagk= respectively. Set tagk to the unique point tag key to remove.

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

Removes the specified metric, source, source tag, or point tag from the expression. You can specify only one parameter per function call. To specify multiple parameters, use a `removeSeries()` call for each parameter.

At times, a simpler way to remove series is to use Boolean operators. For example, instead of:
```
removeSeries(ts("smp-fax\*.count", source="-eq"), "smp-fax\*.metrics.wavefront.\*")
```
you can call:

```
ts("smp-fax\*.count" and not "smp-fax\*.metrics.wavefront.*", source="-eq*")`
```


## Examples

The following example removes all series tagged with `env=dev`, so only those with `env=production` remain.

![remove series](images/ts_remove_series.png)
