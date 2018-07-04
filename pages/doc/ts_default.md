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
default([<timeWindow>,] [<delayTime>,] <defaultValue>, <expression>)
```

Fills in gaps in an expression with `defaultValue`. `defaultValue` can be a constant or an expression). The optional `timeWindow` parameter fills in that period of time after each existing point (for example, 5m for 5 minutes). Without `timeWindow`, all gaps are filled in.

Despite its apparent simplicity, the `default()` function is one of the most misunderstood functions in Wavefront's query language. See the **Caveats** section below for recommendations.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>By default, the <code>default()</code> function applies the specified value to gaps of missing data for up to 4 weeks. Use this optional parameter if you’d like this window to be smaller. The smallest time window you can specify is 1 second (1s). </td></tr>
<tr>
<td>delayTime</td>
<td>Amount of time that must pass without a reported value before the value specified by <code>defaultValue</code> is used. Optional.</td></tr>
<tr>
<td>defaultValue</td>
<td>Value that you want to use in places where there are gaps in the data. </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression in which you want to replace gaps in data with a default value. </td>
</tr>
</tbody>
</table>

## Description

The `default()` function allows you to specify the value that you would like to assign to gaps of missing data on a chart. This is the only missing data function that allows you to specify the value you’d like to assign to gaps of missing data.

Enter the data value for missing data before the actual `ts()` expression.

## Examples

In the chart below, we're using a value of 0 to highlight when data a missing - the line dips to 0:

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
