---
title: globalFilter Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_globalFilter.html
summary: Reference to the globalFilter() function
---

## Summary
```
globalFilter(<tsExpression | hsExpression>, <filter1> [and|or [not] <filter2>] ... )

where <filterN> is:
    <metricName> | source=<sourceName> | tag=<sourceTagName> | <pointTagKey>=<pointTagValue>
```

Filters the expression to display only the time series that match the specified filters. This function works for ts() and hs() expressions.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="40%">Parameter</th><th width="60%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression | hsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series or histogram series that you want to filter.</td>
</tr>
<tr>
<td>&lt;metricName&gt;&vert;source=&vert;tag=&vert;&lt;pointTagKey&gt;=</td>
<td markdown="span">A metric, source, source tag, or point tag to filter by. You must specify at least one filter, which can be of any type. Use Boolean operators to combine multiple filters. For example, <br>**(source=app-1 or source=app-2) and env=dev**.</td></tr>
</tbody>
</table>

## Description

The `globalFilter()` function filters a time series or histogram expression. You can filter by metric, source, source tag, or point tag. To filter by a source, source tag, or point tag, specify `source=`, `tag=`, or `tagk=`. Set `pointTagKey` to the unique point tag key to filter by.

The `globalFilter()` function is similar to [retainSeries()](ts_retainSeries.html), but filters are pushed all the way into the inner ts()/hs() expressions. That means you can use `globalFilter()` to filter data pre-aggregation.


## Examples

**No Data With retainSeries()**

In the following example, we're using the `retainSeries` filtering function together with `sum()`. Because information about the environment is no longer available after the `sum()` has been applied, the query returns NO DATA.

![filter with retainSeries](images/filter_with_retainSeries.png)

**Data With globalFilter()**

In contrast, if we use `globalFilter` for the same scenario, we can filter by environment and apply the `sum()` function.

![filter with globalFilter](images/filter_with_globalFilter.png)

## See Also

* [`retainSeries()` function](ts_retainSeries.html)
* [`removeSeries()` function](ts_removeSeries.html)
