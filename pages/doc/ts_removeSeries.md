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
removeSeries(<tsExpression>, <filter1> [and|or [not] <filter2>] ... )

where <filterN> is:
    <metricName> | source="<sourceName>" | tag="<sourceTagName>" | <pointTagKey>="<pointTagValue>"
```
Filters the expression to display only the time series that do <em>not</em> match one or more filters, which might be any combination of metric names, source names, source tags, or point tags.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="40%">Parameter</th><th width="60%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series that you want to filter.</td>
</tr>
<tr>
<td>&lt;metricName&gt;&vert;source=&vert;tag=&vert;&lt;pointTagKey&gt;=</td>
<td markdown="span">A metric, source, source tag, or point tag to filter by. You must specify at least one filter, which can be of any type. Use Boolean operators to combine multiple filters. For example, <br>**(source=app-1 or source=app-2) and env=dev**.</td></tr>
</tbody>
</table>

## Description

The `removeSeries()` function filters the expression to display only the time series that do <strong><em>not</em></strong> match the specified metric, source, source tag, or point tag, or combination of these filters. To filter the expression to display only the time series that  <strong><em>match</em></strong> one or more filters, use [`retainSeries()`](ts_retainSeries.html).

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

The following example removes all series tagged with `env=production`, so only those with `env=dev` remain.

![remove series](images/ts_remove_series.png)
