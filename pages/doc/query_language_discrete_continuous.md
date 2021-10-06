---
title: Discrete and Continuous Time Series
keywords: query language, discrete, continuous, interpolation
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_discrete_continuous.html
summary: Understand discrete and continuous time series and when Wavefront performs interpolation.
---

Many Wavefront queries operate on and return data as one or more time series. Each time series is a unique sequence of data points that consists of a data value and a timestamp.

* A _discrete time series_ consists of data points separated by time intervals that are greater than one second. A discrete time series might have:
  * A data-reporting interval that is infrequent (e.g., 1 point per minute) or irregular (e.g., whenever a user logs in)
  * Gaps where values are missing due to reporting interruptions (e.g., intermittent server or network downtime)

* A _continuous time series_ contains one data point per second. Because Wavefront accepts and stores data at up to 1 second resolution, a continuous time series has a data value corresponding to every moment in time that can be represented on the X-axis of a chart.

{% include tip.html content="Raw aggregation functions directly applied to continuous functions (such as `msum()`) can behave differently than raw aggregation functions applied directly to non-continuous functions. See the discussion below." %}

## Example

The following chart shows a point plot for the results of two queries. The query labeled **Discrete** returns multiple time series, each consisting of data points that occur 1 minute apart (at 9:30, 9:31, 9:32, and so on). The query labeled **Continuous** returns the constant value `160` for every second in the chart.

![discrete continuous](images/query_language_discrete_continuous.png)

A discrete time series is still discrete when you use a line plot to display it. The following chart shows the same queries, but with the points connected by lines in the display. We've used the **Color** option to show all lines associated with one time series in yellow.

![discrete continuous lineplot](images/query_language_discrete_continuous_lineplot.png)


## Functions that Preserve Discrete Data

Most query language functions that operate on a discrete time series return a new time series that is also discrete.

Some functions operate on an input time series to produce a new series with the same number of data points at exactly the same times, but with values resulting from some calculation.  The result time series will have the same intervals and gaps as the original input time series did. For example:
* The [`floor()`](ts_floor.html) function visits each point in a given time series, rounds the point's data value down to the nearest integer, and assigns the result of that calculation to a new point with a matching timestamp.

Some functions operate on an input time series to produce a new series that has fewer data points. The points in the result series might have different timestamps, different values, or both, and the series typically has wider intervals and gaps. For example:
* The [`align()`](ts_align.html) function groups the input data points into “buckets” and returns a new series that consists of one data point per bucket.
* The [`lowpass()`](ts_lowpass.html) function returns a new series that consists of data points that match just the input points whose values fall below a specified threshold.



## Functions that Create Continuous Data

Certain query language functions and expressions return a new time series that is guaranteed to be continuous (have one data point per second).

Some functions and expressions produce a continuous time series in which a constant value is assigned to every possible data point. For example:
* The expression `160` assigns the value `160` to every data point in a continuous result series.
* The [`at()`](ts_at.html) function obtains a value from a past data point in an input time series and assigns that value to every data point in a continuous result series.

Some functions produce a continuous time series by calculating a value from the timestamp of each data point. For example:
* The [`dayOfYear()`](ts_dayOfYear.html) function produces a time series by correlating every second of a time line with the day of the year it falls on.

## Functions that Use Interpolation to Create Continuous Data

Certain functions produce a continuous time series by starting with data points from a discrete time series and inserting additional points (1 per second) to fill in the intervals and gaps. You see data every second regardless of the reporting interval of the underlying input data. The process is called _interpolation_. In the following video, Wavefrount co-founder Clement Pang explains how it works:

<p><a href="https://youtu.be/9LnDszVrJs4" target="_blank"><img src="/images/v_interpolation.png" style="width: 700px;" alt="time series and interpolation"/></a>
</p>

For example, the [`last()`](ts_last.html) function produces a new time series that consists of the actual, reported data points from the input series, plus points that are added by interpolation between them. Each interpolated point has the same value as the last reported point before it.

Here's a point plot showing a discrete series (the red dots) and the points (blue dots) produced by applying `last()`. The points of the discrete series are reported once a minute, and the points between them are all interpolated.

![continuous last](images/query_language_continuous_last.png)

Different functions use different techniques to calculate the values of interpolated points. For example:
* When the `last()` function inserts a new point with a particular timestamp, the value assigned to that point is taken from the last actual, reported point before it.
* When the [`interpolate()`](ts_interpolate.html) function inserts a new point with a particular timestamp, the value assigned to that point is an estimate of what the input series would have reported at that time, based on the values of the actual, reported points on either side.

{% include note.html content="Some functions use interpolation to fill gaps to produce a continuous time series, while standard aggregation functions use interpolation to fill specific gaps in an input series before including it in an aggregation. " %}

For example:
* Functions such as `last()`, `interpolate()`, and the others [summarized below](#summary-of-functions-that-return-continuous-time-series) use interpolation to fill in all gaps to produce a result series that is guaranteed to be continuous.
* Standard aggregation functions such as [`sum()`](ts_sum.html) and [`avg()`](ts_avg.html) use interpolation to fill in specific gaps in an input series before including that series in the aggregation. The result series produced by an aggregation function is normally discrete. [Aggregating Time Series](query_language_aggregate_functions.html) gives more details.

## Summary of Functions that Return Continuous Time Series

The following functions always return continuous time series, even when they operate on an input series that is discrete:

* [Moving time windows](query_language_reference.html#moving-window-time-functions) except [`integral()`](ts_integral.html).
* Missing data functions: [`default()`](ts_default.html), [`last()`](ts_last.html), [`next()`](ts_next.html), [`interpolate()`](ts_interpolate.html)
* [`if()`](ts_if.html) function, when `expression` is not a constant time series.
* [`between()`](ts_between.html), [`exists()`](ts_exists.html), and [`random()`](ts_random.html) functions.
* [`ongoing()` events function](events_queries_advanced.html#event-set-to-time-series-conversion-functions).
* Calendar/clock standard time functions: [`year()`](ts_year.html), [`month()`](ts_month.html), [`dayOfYear()`](ts_dayOfYear.html), [`day()`](ts_day.html), [`weekday()`](ts_weekday.html), [`hour()`](ts_hour.html), and [`time()`](ts_time.html).
* Constant time series functions and expressions: [`at()`](ts_at.html), [`top()`](ts_top.html), [`bottom()`](ts_bottom.html), and `<number>`.
