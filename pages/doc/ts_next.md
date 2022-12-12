---
title: next Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_next.html
summary: Reference to the next() function
---
## Summary
```
next([<timeWindow>,] <tsExpression>)
```
Fills in gaps in each time series described by `tsExpression`, by inserting data points that have the next known value of the time series.
Specify `timeWindow` to fill in data for a limited period of time before each existing point.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td>Maximum amount of time to fill with inserted data points. If you omit this parameter, gaps with duration of up to the <a href="metrics_managing.html#obsolete-metrics">metrics obsolescence period</a> are completely filled.
<br>You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified. </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series in which to replace data gaps with the next value. </td>
</tr>
</tbody>
</table>

## Description

The `next()` function allows you to assign the next known reported data point value to a gap of missing data. If there's a gap, nothing happens until the first new value becomes available. Then the data is backfilled with that, the next, value.  No line (dotted or solid) is drawn until the next data point is reported.

By default, `next()` applies the next reported data value to gaps of missing data with duration of up to the [metrics obsolescence period](metrics_managing.html#obsolete-metrics) (by default, 4 weeks). If you’d like this window to be smaller, you can use the `timeWindow` parameter.

## Examples

In the following example, we've zoomed in on `~sample.cpu.loadavg.1m` and see missing data.

![ts_last before](images/ts_last_next_before.png)

We decide to replace the missing data with the *last* value before the gap, in this case 0.

![ts_last](images/ts_last.png)

Then we replace the missing data with the first good value after the gap using `next`.

![ts next](images/ts_next.png)

## Caveats

{% include tip.html content="You cannot apply `next()` to a histogram. Even if you convert the histogram to a tsExpression, an error results if you then apply `next()`." %}

## See Also

[Using Moving and Tumbling Windows to Highlight trends](query_language_windows_trends.html)

Other missing data functions include:
* [default](ts_default.html)
* [interpolate](ts_interpolate.html)
* [last](ts_last.html)
