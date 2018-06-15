---
title: Best Practices for Using the default() Function
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_default_function.html
summary: Learn best practices for using the default() function.
---
Despite its apparent simplicity, the `default()` function is one of the most misunderstood functions in Wavefront's query language.

Use `default()` with care:

* Sometimes using `default()` is just what you need - but sometimes it does not behave the way you might expect.
* In many cases `default()` does not add value when used with alerts.
* `default()` can affect performance - and in some cases prevent alerts from firing.

Here are some things to watch out for:

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
