---
title: atEpoch Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_atEpoch.html
summary: Reference to the atEpoch() function
---
## Summary
```
atEpoch(<epochTime>, <tsExpression>)
```
Returns a single value from the time series described by the expression. The returned value is displayed continuously across the chart, so you can use it as a reference value for comparing against the results of other queries of you can compare results at precise times.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td>epochTime</td>
<td>The report time of the data value to be returned, as epoch time.
</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series to return a data value from. </td></tr>
</tbody>
</table>


## Description

The `atEpoch()` standard time function returns the data value that was reported at a particular time by the time series described by the expression.  The returned value is displayed continuously across the chart, so you can use it as a reference value for comparing against the results of other queries. `atEpoch()` returns a separate result for each time series described by the expression.

You designate the data value of interest by specifying the time it was reported.

The [at() function](ts_at.html) offers several other ways to report data at a specific time.

## Examples

Here's a query that shows the value for a single source at Epoch time 1571177581.
![atEpoch for 1 source](images/ts_atEpoch_one_source.png)

You can also use `atEpoch()` with a query that shows multiple time series, and compare it, for example, to another time series.

![at Epoch for multiple sources](images/ts_atEpoch_multiple.png)
