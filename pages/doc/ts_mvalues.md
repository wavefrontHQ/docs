---
title: mvalues Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mvalues.html
summary: Reference to the mvalues() function.
---

## Summary

```
mvalues(<timeWindow>, <tsExpression>[,metrics|sources|sourceTags|pointTags|<pointTagKey>])

```
Returns the number of unique values over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td>Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series for which you want to see the number of unique values. </td>
</tr>
<tr><td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional <code>group by</code> parameter for organizing the time series into subgroups and then returning a count for each subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>
 
## Description

The `mvalues()` function counts the number of the unique values over a shifting time window. For example, `mvalues(5m, ts(~sample.db.bytes.sent), env)` returns the number of unique bytes sent to and from the database, grouped by environment over a 5-minute time window.

## Example

The following query returns the number of product versions over time.

```
ts(build.version)

```

To narrow down the search and see the current number of product versions running across your environment, apply the `mvalues ()` function.

```
mvalues(5m, ts(build.version))

```

You can see the result in the top right corner of the chart, under Value.

You can also see the current number of product versions running across your environment for points that are tagged with `primary` and are grouped by `sourceTags`.

```
mvalues(5m, ts(build.version, tag="*-primary"), sourceTags)

```

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)
