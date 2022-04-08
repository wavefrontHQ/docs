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
mmedian(<timeWindow>, <tsExpression>)
```
Returns the moving median of each time series over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want moving medians for.  </td></tr>
</tbody>
</table>

## Description

The `mmedian()` function computes the moving median of each time series over a shifting time window. For example, `mmedian(10m, ts(my.metric))` returns, at each point, the median of the data values over the previous 10 minutes for each specified time series.

To get the moving mean (rather than median), use the `mpercentile()` function as follows: `mpercentile(50,<tsExpression>[,<args])`.

By default, all the lines are dimmed. You can move the cursor over a line to highlight it, and Cmd-select lines if you want to turn on highlighting for multiple lines.
 

## Examples

The following example shows the result of a simple `mmedian()` query with the curser hovering over one of the lines.

![mmedian](images/ts_mmedian.png)

The next example shows how you can compare the `mmedian()` results by doing a Cmd-select of several lines.

![mmedian compare](images/ts_mmedian_clicked.png)

## See Also
The following video shows how you can prevent false alarms with `mmedian()`.

<p><a href="https://www.youtube.com/watch?v=dkHmnH_Dchc&feature=youtu.be"><img src="/images/v_false_alarms.png" style="width: 700px;"/></a>
</p>
