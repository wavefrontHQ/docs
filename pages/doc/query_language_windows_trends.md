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

The chart below for instance shows the 24 hour moving average of the points received. As you can see it is a continuous moving average of the past 24 hours.

{% include image.html file="moving_avg.png" alt="moving_avg" caption="Fig 1: Moving Average Over a Day" %}

But what if you wanted to only look at the daily average for each day and display only that average across the day. Essentially what you want to create is fixed size time windows and record your metrics in these windows.

These windows are more commonly referred as _tumbling windows_. Tumbling windows are a series of fixed size, non-overlapping, and contiguous time intervals.

## Moving Windows Versus Tumbling Windows

Before we look at how to create and use these tumbling windows for different use cases, let's take a look at an example to understand thoroughly the concepts of moving and tumbling windows.

The following diagrams illustrate a stream with a series of points being reported and how they are mapped into  5-second moving windows versus 5-second tumbling windows.

{% include image.html file="5sec_moving_window.png" alt="5sec_moving_window" caption="Fig 2: 5 Second Moving Windows Illustrated" %}

The moving window slides ahead one second at a time and you can see how new points get added at the front and the older points keep falling out as the window moves ahead. So these windows overlap each other, whereas tumbling windows are fixed windows that do not overlap one another and the set of points are exclusive for each window.

{% include image.html file="5sec_tumbling_window.png" alt="5sec_tumbling_window" caption="Fig 3: 5 Second Tumbling Windows" %}

If you look closely, these three tumbling windows are actually part of the moving windows and every 5th moving window forms this 5-second tumbling window. So in theory to create tumbling window of `n` duration (5 seconds in this example) all you need to do is sample every nth moving window (5th window) sliding ahead at in the same unit of window duration (seconds in this example).

{% include image.html file="moving_vs_tumbling_window.png" alt="moving_vs_tumbling_window" caption="Fig 4: Moving Windows Versus Tumbling Windows" %}

Going back to our example from top to look at the daily average rate, we can use the same concept and sample every `mavg(24h,$rate)` at the end of each day.

You can do that using the time functions. In this case, we will use the `hour()` function to sample the average at every midnight. This would give you the average of last 24 hours which is essentially the daily average and we display it across the day using the missing data function `next()`.

{% include image.html file="sample_moving_window.png" alt="sample_moving_window" caption="Fig 5: Sample Moving Windows to Create Tumbling Windows" %}

In the chart above, the green circles show the sampled data and you can use `next()` to display it across the entire day.

{% include image.html file="missing_data_fcn_tumbling_window.png" alt="missing_data_fcn_tumbling_window" caption="Fig 6: Use Missing Data Functions to Display the Result Across Tumbling Window" %}

Below are more examples of tumbling windows.

## Examples

### Count the unique number of metrics per day starting at 0 every midnight at PDT

This chart shows all the how many metrics are reported into Wavefront from the Slack application.

{% include image.html file="daily_count.png" alt="daily_count" caption="Fig 7: Daily Count of Reported Metrics" %}

This example is very similar to the earlier example. However, instead of sampling the moving count exactly at midnight, this expression takes into account any missing or delayed data and picks the first value of the 30 minutes past midnight and then finally the `next()` function simply displays this value for the entire day.

### Get a 50th percentile of every 5 minute bucket

Here is sample data being reported every 1 minute.

{% include image.html file="sample_data.png" alt="sample_data" caption="Fig 8: Sample Data" %}

A 5-minute moving percentile will give you the 50th percentile point in the last 5 minutes and display it at every minute interval.

{% include image.html file="5min_50th_moving.png" alt="5min_50th_moving" caption="Fig 9: 5 Minute 50th Moving Percentile" %}

But what if you wanted to find a 50th percentile of points in fixed 5-minute window. You could use the similar logic as we saw in the earlier examples. Here we are using `align(5m,...)` to sample, instead of the time functions followed by `next()`, to display the 50th percentile for the entire 5-minute window.

{% include image.html file="5min_50th_tumbling.png" alt="5min_50th_tumbling" caption="Fig 10: 50th Percentile for Every 5 Minute Tumbling Window" %}

This expression is plotting the raw data overlaid with the 5-minute tumble window for the 50th percentile. The orange line is the 50th percentile of points in every 5-minute fixed window. And you see how it coincides with the middle-valued point in that time interval.

Thus any of the moving functions can be converted into fixed or tumbling windows by correct sampling of the moving window for which you should use the time functions and/or `align()`.
