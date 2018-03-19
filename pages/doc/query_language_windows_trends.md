---
title: Using Moving and Tumbling Windows to Highlight Trends
keywords: query language
tags: [query language, best practice]
sidebar: doc_sidebar
permalink: query_language_windows_trends.html
summary: Learn how to use moving window functions in Wavefront Query Language expressions to highlight trends.
---

## Moving Window Functions

The moving window functions in Wavefront allow you to calculate continuous aggregation over sliding windows. Wavefront offers many moving functions that allow you to create moving windows on various aggregation such as `msum()`,` mavg()`, `mmedian()`, `count()`, etc. These functions create continuous moving or sliding windows which can extremely useful to look at moving trends.

The chart below for instance shows the 24 hour moving average of the points received from the following queries:

Rate: `sum(rate(ts(~agent.points.2878.received)))`

Moving avg: `mavg(24h, ${rate})`

As you can see it is a continuous moving average of the past 24 hours.

![moving_average](images/moving_avg.png)


But if you want to only look at the daily average for each day, and display only that average, you have to create fixed-size time windows and record your metrics in these windows.

These windows are commonly referred as _tumbling windows_. Tumbling windows are a series of fixed size, non-overlapping, and contiguous time intervals.

## Moving Windows Versus Tumbling Windows

Before we look at how to create and use these tumbling windows for different use cases, let's take a look at an example to understand thoroughly the concepts of moving and tumbling windows.

The following diagrams illustrate a stream with a series of points being reported and how they are mapped into  5-second moving windows versus 5-second tumbling windows.

![5sec_moving_window](images/5sec_moving_window.png)

The moving window slides ahead one second at a time. You can see how new points are added at the front and the older points become invisible as the window moves ahead.

* Moving windows overlap.
* Tumbling windows are fixed windows that do not overlap-- the set of points is exclusive for each window.

![5sec_tumbling_window](images/5sec_tumbling_window.png)

These three tumbling windows are actually part of the moving windows, and every 5th moving window forms this 5-second tumbling window. To create tumbling window of `n` duration (5 seconds in this example) you can sample every nth moving window (5th window), sliding ahead in the same unit of  duration (seconds in this example).

![moving_vs_tumbling_window](images/moving_vs_tumbling_window.png)

We can use this approach for our example from the top (daily average rate) and sample every `mavg(24h,$rate)` at the end of each day using one of the time functions.

In this case, we use the `hour()` function to sample the average at every midnight. This results in the average for 24 hours, and we can display it across the day using the missing data function `next()`. In the chart below, the green circles show the sampled data. You can use `next()` to display the information for the entire day, as in the following queries. The corresponding chart is immediately below.

Rate: `sum(rate(ts(~agent.points.2878.received)))`

Moving avg: `mavg(24h, ${rate})`

Sampled at midnight: `if (hour("US/Pacific") = 0,${mavg})`

Daily avg: `next(24h,if(hour("US/Pacific") = 0,${mavg})`

![sample_moving_window](images/sample_moving_window.png)

Using the same queries, you can use missing data functions to display the result across tumbling windows.

![missing_data_fnc](images/missing_data_fcn_tumbling_window.png)


## Tumbling Window Examples

Below are more examples of tumbling windows.

### Count the unique number of metrics per day starting at 0 every midnight at PDT

This chart shows the metrics reported to Wavefront by the Slack application in both the moving and the tumbling windows. The chart shows the count per day starting at midnight PDT. If the count per day is missing at midnight, the chart looks at the first value in count per day up to 12:30pm, and uses that value as the value for the entire day.

We use the following queries:

data: `ts("slack.*")`

mcount: `sum(mcount(24h, ${data}))`

windowed: `if (hour("US/Pacific") <= 0.5,${mcount})`

window-aligned: `align(1h, first, $windowed})`

Readable across day: `next(24h, ${window-aligned})`

![daily_count](images/daily_count.png)

This example is similar to the earlier example. However, instead of sampling the moving count exactly at midnight, we take into account any missing or delayed data and pick the first value of the 30 minutes past midnight. The `next()` function displays this value for the entire day.

### Get a 50th percentile of every 5 minute bucket

In the following chart, sample data is being reported every 1 minute.

![sample_data](images/sample_data.png)

In the following chart, a 5-minute moving percentile gives you the 50th percentile point in the last 5 minutes and display it at every minute interval.

![moving_percentile](images/5min_50th_moving.png)

If you wanted to find a 50th percentile of points in fixed 5-minute window, you could use the similar logic to the earlier examples. Here we use `align(5m,...)` to sample, instead of the time functions followed by `next()`, to display the 50th percentile for the entire 5-minute window.

![tumbling_percentile](images/5min_50th_tumbling.png)

This example plots the raw data overlaid with the 5-minute tumble window for the 50th percentile. The orange line is the 50th percentile of points in every 5-minute fixed window. And you see how it coincides with the middle-valued point in that time interval.

The examples show how you can covert any moving function to a fixed or tumbling window by correctly sampling the moving window. You can use time functions or `align()`, or both.
