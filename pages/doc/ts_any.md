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
<td >Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>A ts() expression, a constant, or a wildcard.</td></tr>
</tbody>
</table>

## Description

The `any()` function enables you to emulate an alert window and helps you predetermine how often an alert would fire based on existing data within a shifting time window. 

The `any()` function looks at the displayed point buckets within a specified moving time window and:
* Returns 0  if no displayed point buckets meet that condition.
* Returns 1 if at least one of the displayed point buckets meets that condition.

You can use [`all()`](ts_all.html) to test whether all displayed point buckets meet the condition.

## Examples

The following example checks whether the number of failures for `app-19` is greater than the number of failures for `app-5` at during a 5 minute time window and returns 1 if it is.

![any example](images/ts_any.png)
