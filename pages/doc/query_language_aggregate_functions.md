---
title: Standard Versus Raw Aggregate Functions
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_aggregate_functions.html
summary: Learn how to use standard versus raw aggregate functions in Wavefront Query Language expressions.
---

Wavefront provides two types of aggregate functions: standard aggregate functions (e.g. `sum()`, `avg()`) and raw aggregate functions (e.g. `rawsum()`, `rawavg()`). Both standard and raw aggregate functions provide a way to combine (aggregate) multiple series into a single series. Standard aggregate functions first interpolate the points of the underlying set of series, and then apply the aggregate function to the interpolated series. Raw aggregate functions do not interpolate the underlying series before aggregation. The differences between these two types of aggregate functions are subtle, but can have a major impact on performance, visualization, and/or alerts. In this article, we provide an example to showcase these differences.
 
Let's go over a visual example for more context. The chart below represents 3 unique series reporting latency data. The sections with dashed lines represent gaps where no data is reported.

![base chart](images/base_chart.png)
 
Two of the reporting series have gaps of missing data between 9:15a and 9:21a, all three reporting series have gaps of missing data between 9:27a and 9:30a, and one reporting series has a gap of missing data between 9:36a and 9:42a. Standard and raw aggregate functions result in two different visualizations:

![standard versus raw](images/standard_vs_raw_functions.png)
 
The difference in visualization is based on interpolation that occurs with standard aggregate functions, but not with raw aggregate functions. Standard aggregate functions interpolate data values before executing the aggregation when there is at least 1 true data value reported at a given interval. The data values in the charts above are typically reported once a minute. The orange series in the first chart above is reported once a minute, on the minute, between 9:15a and 9:21a, while the other two series are not. Since there is at least 1 true data value reported by the orange series during this time, a standard aggregate function will apply interpolated values for the blue and green series before calculating the sum() value. This is also visible between 9:36a and 9:42a when the green and orange series reported data values every minute, but the blue series did not.
 
Raw aggregate functions on the other hand calculate aggregates based on actual reported values (no interpolation). The `rawsum()` values between 9:15a and 9:21a is approximately 1/3 of the `sum()` values (1 of 3 series reported values) and approximately 2/3 of the sum() value (2 of 3 series reported values) between 9:36a and 9:42a.
 
However, the gap between 9:27a and 9:30a are exactly the same regardless of which aggregate function type we use. This is due to the fact that none of the underlying series included in the aggregation reported a data value during this gap of time. Therefore standard aggregate functions do not apply interpolated values during this gap, and look exactly the same as a raw aggregate function. The behavioral differences between standard and raw apply to all aggregate functions (sum, avg, min, max, count, variance, percentile).
