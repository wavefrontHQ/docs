---
title: all Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_all.html
summary: Reference to the all() function
---

## Summary

```
all(<timeWindow>, <expression>)
```
Returns 1 if the expression has been non-zero at every point in time during the time window. Otherwise, returns 0.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td >A clock/calendar time measurement (1s, 1m, 1h, 1d, 1w), time relative to the window length (vw), or time relative to the bucket size (bw) of the chart. Default is minutes if no unit is specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.  </td>></tr>
</tbody>
</table>

## Description

The `any()` and `all()` time functions emulate alert windows and allow you to predetermine how often an alert would fire based on existing data.

When you use these functions, you must also include a moving time window in minutes. The `all()` function works in a similar manner, but the chart will only display 1 values if all displayed point buckets meet the condition in the specified moving time window.

## Examples

The following example shows the value 1 if the two sources in the query have the same number of failure requests, and shows 0 otherwise.

![all example](images/ts_all.png)
