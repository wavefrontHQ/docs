---
title: Aggregation Functions
keywords: query language, aggregate function
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_aggregate_functions.html
summary: Learn how to use standard and raw aggregation functions in Wavefront Query Language expressions.
---

You can use aggregation functions to combine values from multiple time series. An aggregation function returns a series of data points whose values are calculated from corresponding points in two or more input time series. Wavefront provides two types of aggregation functions:

* Standard aggregation functions (e.g. `sum()`, `avg()`) first interpolate the points of the underlying set of series, and then apply the aggregation function to the interpolated series.
* Raw aggregation functions (e.g. `rawsum()`, `rawavg()`) do not interpolate the underlying series before aggregation.


## Filtering the Aggregation Input

You use an expression to describe the set of time series to be aggregated. When using a ts() expression, you can include filters to narrow the set. For example, if multiple sources are reporting the metric `~sample.cpu.loadavg.1m`:
* `sum(ts(~sample.cpu.loadavg.1m))` shows the sum of the values reported for the metric from all sources.
* `sum(ts(~sample.cpu.loadavg.1m, source=app-1*))` shows the sum of the values reported for the metric, but only from sources that match `app-1*`.
* `sum(ts(~sample.cpu.loadavg.1m, source=app-1*, env=prod))` further filters the input series to those with the point tag `env=prod`.

## Aggregating Data Points That Line Up

The easiest way to see the results of an aggregation function is when all of the input series report their data points at exactly the same time. This causes the points at any given timestamp to all line up. The aggregation function operates on the values in each lineup of points, and returns each result in a point at the corresponding timestamp.

For example, consider the two time series in the following chart. The reporting interval for these series is 1 minute, and the points in these series "line up" at each 1-minute mark on the x-axis. We use a point plot to reveal the correspondences between reported points.

![agg lineup](images/query_language_agg_lineup.png)

Now we use the `sum()` function to aggregate these two time series. Each blue point produced by `sum()` is the result of adding the data values reported by the input series at the same minute.

![agg lineup sum](images/query_language_agg_lineup_sum.png)


## Aggregating When Data Points Do Not Line Up

In many cases, the set of time series you specify to an aggregation function will have data points that do _not_ "line up" at corresponding moments in time. For example:
* All input series might report data points regularly, but some might report at a longer or shorter interval than the others.
* One input series might report at irregular times that don't match the reporting times of any other input series.
* One otherwise regular input series might have gaps due to reporting interruptions (e.g., intermittent server or network downtime) which are not experienced by the other input series.

Wavefront provides two kinds of aggregation functions for handling this situation:
* [**Standard aggregation functions**](#standard-aggregation-functions-interpolation) fill in the gaps in each input series by interpolating values, and therefore operate on interpolated values as well as actual reported data points.
* [**Raw aggregation functions**](#raw-aggregation-functions-no-interpolation) do not interpolate the underlying series before aggregation, but rather operate only on actual reported data points.


### Standard Aggregation Functions (Interpolation)

Standard aggregation functions fill in the gaps in each input series by interpolating values. In the following video, Wavefrount co-founder Clement Pang explains how interpolation works:

<p><a href="https://youtu.be/9LnDszVrJs4" target="_blank"><img src="/images/v_interpolation.png" style="width: 700px;" alt="time series and interpolation"/></a>
</p>

For example, let's start with a pair of series with reporting intervals that do not line up. In the following chart, `series 1` reports once a minute, and `series 2` reports once every 2.5 minutes. Both series have data points aligned at 4:25 and again at 4:30. Between these times, we see unaligned data points -- 4 points from `series 1`, and one point (at 4:27:30) from `series 2`.

![agg mismatch](images/query_language_agg_mismatch.png)

Now we use the `sum()` function (a standard aggregation function) to aggregate these two time series. In the following chart, we see that `sum()` produces a result for _every_ moment in time that a data point is reported by _at least one_ input series. Whenever both series report a data point at the same time (for example, 4:25), `sum()` returns a data point whose value is the sum of both reported points (169.05 + 162 = 331.05).

![agg mismatch sum](images/query_language_agg_mismatch_sum.png)

The result at 4:26 is more interesting. At this moment in time, `sum()` returns the value 328.430, although there is only a single input data value (164) at that time, reported by `series 1`. `sum()` produces the return value by adding 164 to an _interpolated_ value from `series 2`. Interpolation inserts an implicit point into `series 2` at 4:26, and assigns an estimated value to that point based on the values of the actual, reported points on either side (at 4:25 and 4:27:30). `sum()` uses the estimated value (in this case, 164.43) to calculate the value returned at 4:26.

**Requirements for Interpolation**

Wavefront interpolates a value into an input time series only under the following circumstances:

* When at least one other input time series reports a real data value at the same moment in time. In our example, no values are interpolated at, say, 4:26:30, because neither input series reports a point at that time.

* When the time series has an actual reported value on either side of it. Sometimes this cannot occur, for example, when a new data point has not been reported yet at the right edge of a live-view chart. In this case, Wavefront inserts implicit points wherever needed, and assigns the last known reported value in the time series to those implicit points.
(The last known reported value must be reported within the last 15% of the query time in the chart window.)


### Raw Aggregation Functions (No Interpolation)

You can use raw aggregation functions instead of standard aggregation functions if you want the results to be based on actual reported values, without any interpolated values. For example, you might use raw aggregation results as a way of detecting when one or more input time series fail to report a value.

Let's see how the raw aggregation function `rawsum()` treats the two sample time series from the previous section. The following chart shows that `rawsum()`, like `sum()`, produces a result for _every_ moment in time that a data point is reported by _at least one_ input series.

Unlike `sum()`, `rawsum()` produces its results by adding up just the actual values at each reporting moment. At 4:26, for example, `rawsum()` returns 164.00, which is the only value reported at this time. No values from `series 2` are present at that time, and none are interpolated.

![raw agg mismatch sum](images/query_language_rawagg_mismatch_sum.png)

Whenever both series report a data point at the same time (for example, 4:25), `rawsum()` returns a data point whose value is the sum of both reported points (169.05 + 162 = 331.05).

## Grouping the Results of Aggregation

Each aggregation function accepts a 'group by' parameter that allows you to subdivide the input time series into groups, and request separate aggregates for each group. The chart displays a separate line corresponding to each group. For example, you can use a 'group by' parameter with `sum()` or `rawsum()` produce a separate subtotal for each group of time series that are reported from a common source. The chart for such a query displays one line corresponding to each source. When used without a 'group by' parameter, an aggregation function returns a single series of results.

<table>
<tbody>
<thead>
<tr><th width="20%">'Group By' Parameter</th><th width="40%">Description</th><th width="40%">Example</th></tr>
</thead>
<tr>
<td markdown="span">**metrics**</td>
<td>Group the series with the same metric name.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), metrics)`</td>
</tr>

<tr>
<td markdown="span">**sources**</td>
<td>Group the series that are reported from the same source.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), sources)`</td>
</tr>

<tr>
<td markdown="span">**sourceTags**</td>
<td markdown="span">Group the series that are reported from sources with the same source tag names. A source tag is used only if it is explicitly specified in the ts() expression, such as `prod` and `db`.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m, tag=prod or tag=db),sourceTags)`</td>
</tr>

<tr>
<td markdown="span">**pointTags**</td>
<td>Group the series by all available point tag keys.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), pointTags)`</td>
</tr>

<tr>
<td markdown="span">**&lt;pointTagKey&gt;**</td>
<td markdown="span">Group the series with common values for a particular point tag key. Specify the point tag key by name, such as `region`.</td>
<td markdown="span">`sum(ts(cpu.loadavg.1m), region)`</td>
</tr>
</tbody>
</table>

## Aggregation Example

The chart below represents 3 unique series reporting latency data. The sections with dashed lines represent gaps where no data is reported.

![base chart](images/base_chart.png)

Two of the reporting series have gaps of missing data between 9:15a and 9:21a, all three reporting series have gaps of missing data between 9:27a and 9:30a, and one reporting series has a gap of missing data between 9:36a and 9:42a. Standard and raw aggregation functions result in two different visualizations:

![standard versus raw](images/standard_vs_raw_functions.png)

The difference in visualization is based on interpolation that occurs with standard aggregation functions, but not with raw aggregation functions. Standard aggregation functions interpolate data values before executing the aggregation when there is at least 1 true data value reported at a given interval. The data values in the charts above are typically reported once a minute. The orange series in the first chart above is reported once a minute, on the minute, between 9:15a and 9:21a, while the other two series are not. Since there is at least 1 true data value reported by the orange series during this time, a standard aggregation function will apply interpolated values for the blue and green series before calculating the sum() value. This is also visible between 9:36a and 9:42a when the green and orange series reported data values every minute, but the blue series did not.

Raw aggregation functions on the other hand calculate aggregates based on actual reported values (no interpolation). The `rawsum()` values between 9:15a and 9:21a is approximately 1/3 of the `sum()` values (1 of 3 series reported values) and approximately 2/3 of the sum() value (2 of 3 series reported values) between 9:36a and 9:42a.

However, the gap between 9:27a and 9:30a are exactly the same regardless of which aggregation function type we use. This is due to the fact that none of the underlying series included in the aggregation reported a data value during this gap of time. Therefore standard aggregation functions do not apply interpolated values during this gap, and look exactly the same as a raw aggregation function. The behavioral differences between standard and raw apply to all aggregation functions (sum, avg, min, max, count, variance, percentile).
