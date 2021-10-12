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
default([<timeWindow>,] [<delayTime>,] <defaultValue>, <tsExpression> [.orElse<defaultIfNoData>])
```

Fills in gaps in the time series described by `tsExpression`, by inserting data points with the value `defaultValue`.
* Specify `timeWindow` to fill in data for just a limited period of time after each existing point.
* Specify `delayTime` to allow a gap before the inserted data.

{% include important.html content="If you don't specify a `timeWindow`, we apply the default value for every second and fill gaps up to 28 days. Performance of queries and dashboards can deteriorate." %}

{% include important.html content="Despite its apparent simplicity, the `default()` function is one of the most misunderstood functions in Wavefront's query language. See the **Caveats** section below for recommendations." %}



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
<tr>
<td markdown="span">.orElse</td>
<td>An optional operator that allows you to specify a default value even if the time series did not report any data in the specified time window. You can enter a constant value, for example <code>orElse(5)</code>. You can also enter a timeseries for chained .orElse statements, for example <code>.orElse(ts('my.metric'))</code>.</td>
</tr>
</tbody>
</table>

## Description

The `default()` function allows you to specify the value that you would like to assign to gaps of missing data on a chart. This is the only missing data function that allows you to specify the value you’d like to assign to gaps of missing data. The `default()` function only fills the gaps after a data point, not after a given timestamp.

### Basic Usage

For the simplest case, you can use `default()` to set the default value of a query to 0 if the specified metric does not exist:

`default(0, ts(my.metric))`

{% include note.html content="In certain situations we don't recommend using `default()`. See the list of **Caveats** below. In that case, use the following query instead." %}

`ts(my.metric).orElse(0)`

### Using default() With .orElse

While the `default()` function allows you to specify a value for missing points on a chart, the function shows NO DATA if the time series reported no data at all in the specified time window. In that situation, you can use `default()` with the `.orElse` operator to specify a value to return is no data are found.

{% include note.html content="A typical use case for `orElse` is together with `default()` but you can use `.orElse` with other functions." %}


## Examples

### Examples for Basic Usage of default()

The first screenshot shows two time series. The lines are dashed when there are no data:

![ts_default before](images/ts_default_before.png)

If we wrap `default()` and specify 0 as the default, missing data are replaced with 0 in the display.

![ts_default image](images/ts_default.png)

### Examples for default() with .orElse

* If the time series exists in the time window, `default()` fills in the values and `.orElse` is not needed (does nothing).
  ```
  default(100, ts('my.metric').orElse(25))
  ```
* If the time series does **not** exist in the time window, i.e. is not reporting in the past four weeks, NO DATA is shown by default. However, `.orElse` specifies a value of 25, which is shown for the time series.
  ```
  default(100, ts('metric_not_there').orElse(25))
  ```


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

{% include tip.html content="You cannot apply `default()` to a histogram. Even if you convert the histogram to a tsExpression, an error results if you then apply `default()`." %}


## See Also

[Using Moving and Tumbling Windows to Highlight trends](query_language_windows_trends.html)

Other missing data functions include:
* [interpolate](ts_interpolate.html)
* [next](ts_next.html)
* [last](ts_last.html)
* [orElse Operator](ts_orelse.html)
