---
title: default Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_default.html
summary: Reference to the default() function
---
## Summary
```
default([<timeWindow>,] [<delayTime>,] <defaultValue>, <tsExpression>)
```

Fills in gaps in the time series described by `tsExpression`, by inserting data points with the value `defaultValue`. Specify `timeWindow` to fill in data for just a limited period of time after each existing point. Specify `delayTime` to allow a gap before the inserted data.

**Note:** Despite its apparent simplicity, the `default()` function is one of the most misunderstood functions in Wavefront's query language. See the **Caveats** section below for recommendations.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td>Maximum amount of time to fill with inserted data points. If you omit this parameter, gaps of up to 4 weeks are completely filled.
<br>You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td>delayTime</td>
<td>Amount of time that must pass without a reported value before inserting data points. If you omit this parameter, data points are inserted at the beginning of each gap.</td></tr>
<tr>
<td>defaultValue</td>
<td>Value that you want to use in places where there are gaps in the data. You can specify a constant or a function that returns time series.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression in which you want to replace gaps in data with a default value. </td>
</tr>
</tbody>
</table>

## Description

The `default()` function allows you to specify the value that you would like to assign to gaps of missing data on a chart. This is the only missing data function that allows you to specify the value you’d like to assign to gaps of missing data.

For the simplest case, you can use `default()` to set the default value of a query to 0 if the specified metric does not exist:

`default(0, ts(my.metric))`

**Note:** In certain situations we don't recommend using `default()`. See the list of **Caveats** below. In that case, use the following query instead.

`if(exists(ts(my.metric)), ts(my.metric), 0)`



## Examples

The first screenshot shows just the function as a blue line, which is dashed when there are no data:

![ts_default before](images/ts_default_before.png)

If we add a second query that uses `default()`, an orange line is superimposed on top of the first in most places. In areas of missing data, we see a blue dashed line and the orange line is at 0.

![ts_default image](images/ts_default.png)

## Caveats

Use `default()` with care:

* Sometimes using `default()` is just what you need - but sometimes it does not behave the way you might expect.
* In many cases `default()` does not add value when used with alerts.
* `default()` can affect performance - and in some cases prevent alerts from firing.

Here are some things to watch out for -- and suggestions how you can rewrite the query without using `default()` in many cases:

- **Time series churn**: Use of `default()` leads to slower queries if there's time series churn, that is, old time series stop reporting and new time series start reporting all the time. This can happen easily if sources are dynamically provisioned, for example, in case of an EC2 instance.
  For example, consider the following query:

  `align(1m, default(0, ts("filehandles.used"))) / align(1m, default(0, ts("filehandles.total"))) * 100 > 60. `

  Assume your environment has about 350 active time series at any moment, but within the last 4 weeks, ~7200 unique time series were active.
  In this case, `default()` is not needed at all - `filehandles.used` and `filehandles.total` always report together. The following query is more than 20x faster:

  `ts("filehandles.used") / ts("filehandles.total") * 100 > 60`
- **Alerts don't fire**: When a metric arrives with a delay of more than 1 minute, the use of `default()` can prevent an associated alert from firing because the value for the last minute evaluates to `false`.

  Instead of accounting for sparse metrics -- `success.count` is reporting all the time, but `failure.count` is reporting a value only when there's a problem -- approach the query from a different angle.

  Instead of:

  `ts(success.count) * 100 / (default(0, ts(failure.count)) + ts(success.count)) < 95`

  Use

  `ts(failure.count) * 100 / (ts(failure.count) + ts(success.count)) > 5`
- **Using highpass() and default()**: Using `highpass()` after `default()` with a higher highpass value than default reverts the effects of `default()`.

  Instead of

  `highpass(..., default(0, ts(...)))`

  Use

  `highpass(..., ts(...))`
- **Using msum() and default()**: Using `msum()` after `default(0, )` is redundant because `msum()` always returns a value for all active series where `default(0, )` backfills a value.

  Instead of

  `msum(..., default(0, ts(...)))`

  Use

  `msum(..., ts(...))`
- **Using rawsum() after default()**: Using `rawsum()` after `default(0, )` is usually redundant. If you are sure that default() is necessary:

  Instead of

  `rawsum(default(0, ts(...)))`

  Use

  `default(0, rawsum(ts(...)))`

If you still think that `default()` is needed, limit the time window to reduce performance problems.

## See Also

[Using Moving and Tumbling Windows to Highlight trends](query_language_windows_trends.html)

Other missing data functions include [interpolate](ts_interpolate.html), [next](ts_next.html), and [last](ts_last.html).
