---
title: hideBefore Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_hideBefore.html
summary: Reference to the hideBefore() function
---
## Summary
```
hideBefore(<timeWindow>, <expression>)
```
Hides data that's older than the specified time.

For example, `hideBefore(10m)` hides data that’s older than 10 minutes. The function updates so that at any time, you see only 10 minutes of data.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>Amount of time for which you want to keep data. For example, <code>hideBefore(10m)</code> hides data that’s older than 10 minutes. </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

The `hideBefore()` and `hideAfter()` functions allow you to  pan chart windows into the future to further refine the display. They can be especially useful in conjunction with predictive functions, but also make charts easier to view by hiding unnecessary detail. 

## Examples
