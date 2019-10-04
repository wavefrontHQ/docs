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
all(<timeWindow>, <tsExpression>)
```
Returns 1 if the expression has been non-zero at every point in time during the time window. Otherwise, returns 0.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td>Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the condition to be tested for.  </td></tr>
</tbody>
</table>

## Description

The `all()` function enables you to emulate an alert window and helps you predetermine how often an alert would fire based on existing data within a shifting time window.

The `all()` function looks at the displayed point buckets within a specified moving time window and:
* Returns 1 if _all_ of the displayed point buckets meets the specified condition.
* Returns 0 in all other cases.

Note: You can use [`any()`](ts_any.html) to test whether one or more displayed point buckets meet the condition.



## Examples

The following example shows the value 1 if the two sources in the query have the same number of failure requests, and shows 0 otherwise.

![all example](images/ts_all.png)
