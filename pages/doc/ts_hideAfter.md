---
title: hideAfter Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_hideAfter.html
summary: Reference to the hideAfter() function
---
## Summary
```
hideAfter(<timeWindow>, <expression>)
```
Hides data after the specified time.

For example, `hideAfter(10m)` hides data that’s newer than 10 minutes ago.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>Time where you want to start hiding data.  For example, `hideAfter(10m)` hides data that’s newer than 10 minutes ago. </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression that you want to filter.</td>
</tr>
</tbody>
</table>

## Description

The `hideBefore()` and `hideAfter()` functions allow you to  pan chart windows into the future to further refine the display. They can be especially useful in conjunction with predictive functions, but also make charts easier to view by hiding unnecessary detail.

## Examples
