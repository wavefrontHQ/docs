---
title: last Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_last.html
summary: Reference to the last() function
---
## Summary
```
last([<timeWindow>,] <tsExpression>)
```
Fills in gaps in each time series described by `tsExpression`, by inserting data points that have the last known value of the time series.

* If you don’t specify `timeWindow`, fills gaps with duration of up to the [metrics obsolescence period](metrics_managing.html#obsolete-metrics) are completely filled. (depending on when data started flowing) with the last known value.
* If you specify `timeWindow`, fills any gap you specify with the last know value.

See **Caveats** below for some limitations to this function.

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
<td>Expression that describes the time series in which to replace data gaps with the last value. </td>
</tr>
</tbody>
</table>

## Description

The `last()` function allows you to assign the last known reported data point value to a gap of missing data. When you add `last()` to a  `tsExpression`, a solid straight line with the value of the last reported data point will be drawn in place of gaps of missing data.


By default, `last()` applies the last reported data value to gaps of missing data with duration of up to the [metrics obsolescence period](metrics_managing.html#obsolete-metrics). If you’d like this window to be smaller, you can use the `timeWindow` parameter. If you use `last()` with a function that uses interpolation, we apply `last()` to the last 15% of a chart window.

## Examples

In the following example, we've zoomed in on `~sample.cpu.loadavg.1m` and see missing data.

![ts_last before](images/ts_last_next_before.png)

We decide to replace the missing data with the *last* value before the gap. What that is differs for different missing data windows.

![ts_last](images/ts_last.png)

Then we replace the missing data with the first good value after the gap using `next`.

![ts next](images/ts_next.png)

## Caveats

The function returns results only if:
* the specified timeWindow is less than the [metrics obsolescence period](metrics_managing.html#obsolete-metrics)
* the time window the function looks at is less than the [metrics obsolescence period](metrics_managing.html#obsolete-metrics)

For example, if you specify `last(1vw, ts(my_query)`, and if your view window is greater than 4w (the [metrics obsolescence period](metrics_managing.html#obsolete-metrics) if the default configuration is not changed), the query fails with an error.

{% include tip.html content="You cannot apply `last()` to a histogram. Even if you convert the histogram to a tsExpression, an error results if you then apply `last()`." %}

## See Also

[Using Moving and Tumbling Windows to Highlight trends](query_language_windows_trends.html)

Other missing data functions include
* [default](ts_default.html)
* [next](ts_next.html)
* [interpolate](ts_interpolate.html)
