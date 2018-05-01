---
title: Bucketing with align()
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_align_function.html
summary: Learn the role of the align() function in Wavefront Query Language expressions.
---

In Wavefront charts, point buckets represent data that has been summarized over a certain length of time.

Both the [**Summarize By** chart option](charts.html#summarize-by) and the [`align()` function](query_language_reference.html#filtering-and-comparison-functions) group points into buckets and allow you to specify how those points are aggregated (e.g. averaged, counted, summed, etc.).  The `align()` function additionally allows you to specify the desired bucket size whereas the bucket size available to the summarization method is automatically set based on the [chart resolution](charts_customizing.html#charts_resolution).

## The Pre-Align Warning

Sometimes you will see the warning indicator <i class="fa-exclamation-triangle fa" style="color: red;"/> in a chart and a warning something like the following:

```
The expression: ts(<metric>, source=<source>) has been pre-aligned, making it equivalent to
align(120s, mean, ts(<metric>, source=<source>)) in order to improve the performance of the sum()
aggregation operation. You can wrap the expression with align() to explicitly state the periodicity
and desired summarization strategy.
```

where `sum(ts(<metric>, source=<source>))` is the original query.

The summarization method is always applied. Suppose you have a 10m chart with 1-second resolution. If your data is reported once a second, summarization is occurring within the 1-second bucket, but it represents a single value and therefore, excluding `Count` summarization method, the summarization value is the same as the point value.

In the majority of cases, `align()` is only considered when explicitly added to the query. However, "pre-alignment" occurs in circumstances where aggregate functions are being applied to more than 100+ unique series. This pre-alignment is tied to a window of time more so than the actual unique series reporting data at any given moment. For example, if 100+ series are reporting data at the same time for 50% of your chart but less than 100 series for the other 50%, then the entire chart window will be pre-aligned if you attempt to aggregate those series into a single series. When aggregating 100+ time series, the pre-alignment that occurs includes a time window equal to the resolution bucket and the summarize strategy for the pre-alignment will match the selected summarization method. So if the resolution bucket is ~1800 seconds and you select `Sum` as the summarization method, then the pre-alignment that would occur in the case of aggregating 100+ time series would be 1800s buckets that are summed.

Metrics are automatically pre-aligned for performance reasons when more than 100 time series are used in an aggregate function. In most cases, for instance, where a metric reflects a parameter changing over time, you can ignore the warning.

However, for some very specific use cases, pre-alignment may cause undesirable side effects. Suppose you have a `http.requests.count` metric that reports values once a minute and represents the total number of HTTP requests per minute and you are trying to calculate the number of HTTP requests over the 1-hour sliding window (i.e. `msum(1h, rawsum(ts(http.requests.count, source="web*")`). If your data set is pre-aligned to a 2-minute (120s) time window, using the default summarization method, `Average`, `align(120s, mean)` averages the values for every 2-minute window, effectively cutting the number of values available to `msum()` in half&mdash;which dramatically changes the result of the calculation. In this case, doing an explicit `align()` with the `sum` aggregation method or changing the summarization method to `Sum` would avoid the side effect. Wavefront displays the warning message if your data set is automatically pre-aligned so you're aware of the possibility of side effects.

## Benefits of Applying align()

The benefits of explicitly applying `align()` are:

- Ability to specify bucket size
- Ability to speed up queries to a degree due to less rendering

The speed at which a query gets executed and displayed is partially based on the quantity of data that need to be displayed on the chart. Consider a 60-minute chart with data values reported every 60 seconds (assume resolution is ~30s). The amount of time it takes to render and display 60 values should be longer than it would take to display 6 values that were aligned at 10-minute buckets. Displaying 60 data values versus 6 data values probably does not have any noticeable difference in load time, but there would be a noticeable delay for 1-week or 1-month windows.

The final benefit for `align()` is tied to aggregate functions as well as query speed. Suppose you have 10 series typically reported every 60 seconds that you want to average over a 2-hour window. If 1 of those 10 series is being reported intermittently and may only be reported every 120 seconds now and again. Non-raw aggregate functions apply an interpolated value if possible for that 1 intermittent series when at least one of the other nine series reported a value. So at 9:03a there were only 9 reported values and therefore `avg()` will apply an interpolated value for the 10th series when possible before aggregating. Interpolated values requires resources that can affect the speed at which the query is displayed. So imagine if this was the case for 1000+ series that report every 5 seconds, but not always at the same 5-second interval. This could require a lot of interpolation and slow down the query speed. However, if you align these values in this example to a larger bucket (e.g. `align(1m, mean, ts("my.metric"))`, then the number of times an interpolated value can occur changes from 12 times a minute without `align()` (in the best case) to 1 time a minute with `align()`.
