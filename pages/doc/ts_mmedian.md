---
title: mmedian Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mmedian.html
summary: Reference to the mmedian() function
---

## Summary

```
mmedian(<timeWindow>, <expression>)
```
The `mmedian()` (moving median) function computes the moving median of each data stream over a shifting time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>A window of time specified in seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). If the unit is not specified, the default is minutes. Example: 1h.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.  </td></tr>
</tbody>
</table>

## Description

The `mmedian()` function computes the moving median of each data stream over a shifting time window.

Use the `mpercentile()` function to get the moving mean, that is, `mpercentile(50,<expression>[,<args])`.

By default, all the lines are dimmed. You can move the curser over a line to highlight it, and Cmd-select lines if you want to turn on highlighting for multiple lines to do comparisons.
 

## Examples

The following example shows the result of a simple `mmedian` query with the curser hovering over one of the lines.

![mmedian](images/ts_mmedian.png)

The next example shows how you can compare the `mmedian()` by doing a Cmd-select of several lines.

![mmedian compare](images/ts_mmedian_clicked.png)

## See Also

[Preventing False Alarms with mmedian() (video)](https://www.youtube.com/watch?v=dkHmnH_Dchc&feature=youtu.be)
