---
title: any Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_any.html
summary: Reference to the any() function
---

## Summary

```
any(<timeWindow>, <expression>)
```
Returns 1 if the expression has been non-zero at any time during the time window. Otherwise, returns 0.

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
<td>The expression can be a constant, a wildcard, or an expression.  </td></tr>
</tbody>
</table>

## Description

The `any()` and `all()` time functions emulate alert windows and allow you to predetermine how often an alert would fire based on existing data.

When you use these functions, you must also include a moving time window in minutes. The `any()` function looks at all displayed point buckets within a specified moving time window and
* Displays the value 0  on the chart if no displayed point buckets meet that condition
* Displays the value 1 if any of the displayed point buckets meet that condition.

## Examples

The following example checks whether the number of failures for `app-19` is greater than the number of failures for `app-5` at during a 5 minute time window and returns 1 if it is.

![any example](images/ts_any.png)
