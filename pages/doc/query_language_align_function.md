---
title: Bucketing with align()
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_align_function.html
summary: Learn where to use the align() function and why the query engine does pre-alignment.
---

In VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) charts, point buckets represent data that has been summarized over a certain length of time.

Both the **Summarize By** chart option and the [`align()` function](ts_align.html) group points into buckets and allow you to specify how those points are aggregated (e.g., averaged, counted, summed, etc.).  The `align()` function allows you to specify the desired bucket size. By default, the summarization method that aggregation functions use is based on the bucket size of the [chart resolution](ui_charts.html#chart-resolution).

To support bucketing, `align()` supports the value `bw` (bucket window) for the `timeWindow` parameter.

## Why It Makes Sense to Apply align()

Wrapping a query in `align()` is often a good idea:

- You can specify the bucket size explicitly.
- As a result, you can often speed up queries because less rendering is required.

### Reducing the Number of Data Points
The speed at which a query is executed and displayed is partly based on how many data points have to be displayed on the chart. Consider a 60-minute chart with data values reported every 60 seconds (assume resolution is ~30s). It takes longer to render and display 60 values than it  would take to display 6 values that are aligned at 10-minute buckets. As the time window increases, the effect is more noticeable.

### Reducing Unnecessary Interpolation
Using `align()` can also improve query speed if [aggregation functions](query_language_aggregate_functions.html#standard-aggregation-functions-interpolation) perform [interpolation](query_language_discrete_continuous.html#functions-and-operators-that-use-interpolation-to-create-continuous-data).

Here's a simple example:
* You have 10 series that typically report every 60 seconds and that you want to average over a 2-hour window.
* 1 of those 10 series is being reported intermittently and often reports only every 120 seconds.
* Non-raw aggregation functions (e.g., `sum()` or `avg()`) interpolate that 1 intermittent series when at least one of the other nine series reported a value. For example, if there were 9 reported values 9:03a, then `avg()` generates an interpolated value for the 10th series before aggregating.

Interpolated require resources, and that can affect the speed at which the query is displayed. If a 1000+ series that reports every 5 seconds, but not always at the same 5-second interval could require a lot of interpolation and slow down the query speed.

To improve query speed, align to a larger bucket (e.g., `align(1m, mean, ts("my.metric"))`. Then the number of times that an interpolated value can occur might change from 12 times a minute without `align()` to once a minute with `align()`.

## The Pre-Align Warning -- When the Query Engine Applies Align

For some queries you see the warning indicator <i class="fa-exclamation-triangle fa" style="color: red;"/> in a chart and a warning like the following:

```
The expression: ts(<metric>, source=<source>) has been pre-aligned, making it equivalent to
align(120s, mean, ts(<metric>, source=<source>)) in order to improve the performance of the sum()
aggregation operation. You can wrap the expression with align() to explicitly state the periodicity and desired summarization strategy.
```

where `sum(ts(<metric>, source=<source>))` is the original query.

That means that the query engine wrapped your query in `align()` to avoid unacceptable performance issues. The query engine performs pre-alignment when aggregation functions are applied to more than 100 unique series. In most cases, for instance, where a metric reflects a parameter changing over time, you can ignore the warning.

The pre-alignment is tied to a window of time and not to the actual unique series reporting data at any given moment. For example, if 100+ series are reporting data at the same time for 50% of your chart window but less than 100 series report for the other 50%, then the entire chart window will be pre-aligned if you attempt to aggregate those series into a single series.

## Pre-Alignment Side Effects

In most cases, pre-alignment improves query speed and has no undesirable side effects. However, for some very specific use cases, pre-alignment can cause undesirable side effects.  If your data set is automatically pre-aligned, you see a warning message below the query.

Here's an example:
* You have a `http.requests.count` metric that reports values once a minute and represents the total number of HTTP requests per minute.
* You are trying to calculate the number of HTTP requests over the 1-hour sliding window (i.e. `msum(1h, rawsum(ts(http.requests.count, source="web*")`).
If your data set is pre-aligned to a 2-minute (120s) time window, using the default summarization method, `average`, `align(120s, mean)` averages the values for every 2-minute window. This pre-alignment cuts the number of values available to `msum()` in half&mdash;which dramatically changes the result of the calculation.

In this case, doing an explicit `align()` with the `sum` aggregation method or changing the summarization method to `sum()` avoids the side effect.
