---
title: mvalues Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mvalues.html
summary: Reference to the mvalues() function
---

## Summary

```
mvalues(<timeWindow>, <tsExpression>)

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
<td>Expression that describes the time series you want moving variances for. </td>
</tr>
</tbody>
</table>

## Description

The `mvalues()` function counts the number of the unique values over a shifting time window. For example, `mvalues(5m, ts(~sample.db.bytes.sent), env)` returns the number of unique bytes sent to and from the database, grouped by environment over a 5-minute time window.


## Example

The following example returns the CPU percentage processor time on a Windows host, filtered by host name.

```
ts(win.cpu.Percent.Processor.Time, source="my-host-name")

```
![Windows host CPU percent processor time before applying the mvalues function](images/ts_mvalues_before.png)

If you only want to see the unique results over the last five minutes, apply the `mvalues ()` function.

```
mvalues(5m, ts(win.cpu.Percent.Processor.Time, source="my-host-name"))

```

![Windows host CPU percent processor time after applying the mvalues function](images/ts_mvalues_after.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)
