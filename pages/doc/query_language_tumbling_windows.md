---
title: Using Tumbling Windows
keywords: query language
tags: [query_language]
datatable: true
sidebar: doc_sidebar
permalink: query_language_tumbling_windows.html
summary: Learn how operators and functions affect the evaulation of Wavefront Query Language expressions.
---

## Moving Windows
The moving functions in Wavefront allow you to calculate continuous aggregation over sliding windows. Wavefront offers many moving functions that allow you to create moving windows on various aggregation like msum(), mavg(), mmedian(), count() etc. These functions create continuous moving windows or sliding window which can extremely useful to look at moving trends.
 
The chart below for instance shows the 24 hour moving average of the points received. As you can see it is a continuous moving average of the past 24 hours.
 
![moving_avg](images/moving_avg.png)

Fig 1 : Moving Average Over a Day
 
But what if you wanted to only look at the daily average for each day and display only that average across the day. Essentially what you want to create is fixed sized time windows and record your metrics in these windows.
 
These windows are more commonly referred as tumbling windows. Tumbling windows are a series of fixed size, non-overlapping, and contiguous time intervals. 
 
## Moving Windows Versus Tumbling Windows
Before we look at how to  create and use these tumbling windows for different use cases, let's take a look at a theoretical example to understand thoroughly the concepts of moving windows and tumbling windows.
 
The following diagrams illustrate a stream with a series of points being reported and how they are mapped into  5-second moving windows vs 5-second tumbling windows.
 
![5sec_moving_window](images/5sec_moving_window.png)
Fig 2 :  5 Second Moving Windows Illustrated
 
The moving window slides ahead one second at a time and you can see how new points get added at the front and the older points keep falling out as the window moves ahead. So these windows overlap each other, where as tumbling windows are fixed windows that do not overlap one another and the set of points are exclusive for each window.
   
![5sec_tumbling_window](images/5sec_tumbling_window.png)
Fig 3 : 5 Second Tumbling Windows
 
If you look closely, these three tumbling windows are actually part of the moving windows and every 5th moving window forms this 5s tumbling window. So in theory to create tumbling window of n duration (5 seconds in this example) all you need to do is sample every nth moving window (5th window) sliding ahead at in the same unit of window duration (seconds in this example).

![moving_vs_tumbling_window](images/moving_vs_tumbling_window.png)
Fig 4 :  Moving Windows vs Tumbling Windows
 
Going back to our example from top to look at the daily average rate, we can use the same concept and sample out every mavg(24h,$rate) at the end of each day.
You can do that using the time functions in Wavefront. In this case, we will use the hour() function to sample out the average at every midnight. This would give you the average of last 24 hours which is essentially the daily average and we will display it across the day using one of our missing data functions next().
 
![sample_moving_window](images/sample_moving_window.png)
Fig 5 :  Sample Moving Windows to Create Tumbling Windows
 
In the chart above the green dots show the sampled data and then you can use next() to display it across the whole day.
 
![missing_data_fcn_tumbling_window](images/missing_data_fcn_tumbling_window.png)
Fig 6 :  Use Missing Data Functions to Display the Result Across Tumbling Window
 
 
Below are some more implementations of tumbling windows.
 
## Examples
 
Count the unique number of metrics per day starting at 0 every midnight at PDT
 
This chart shows all the how many metrics are reported into Wavefront from the Slack application.

![daily_count](images/daily_count.png)
Fig 7 :  Daily Count of Reported Metrics
 
 
This example is very similar to the earlier example. But here instead sampling the moving count exactly at midnight this expression takes into account any missing or delayed data and picks the first value of the 30 mins past midnight and then finally the next function simply displays this value for the whole day.
 
Get a 50th percentile of every 5 min bucket
 
Here is a sample data that is being reported every 1 minute.

![sample_data](images/sample_data.png)
Fig 8 :  Sample Data
 
 
A 5 minute moving percentile will give you the 50th percentile point in the last 5 mins and display it at every minute interval.

![5min_50th_moving](images/5min_50th_moving.png)
Fig 9 :  5 Minute 50th Moving Percentile
 
 
But what if you wanted to find a 50th percentile of points in fixed 5 mins window. You could use the similar logic as we saw in the earlier examples. Here we are using align(5m,) to sample instead of the time functions  followed by next() to display the 50th percentile for the entire 5 minute window.

![5min_50th_tumbling](images/5min_50th_tumbling.png)
Fig 10 :  50th Percentile for Every 5 Minute Tumbling Window
 
This expression is plotting the raw data overlaid with the 5 minute tumble window for the 50th percentile. The orange line is the 50th percentile of points in every 5 minute fixed windows. As you see how it coincides with the middle-valued point in that time interval.
 
Thus any of the moving functions can be converted into fixed or tumbling windows by correct sampling of the moving window for which you should use the time functions and/or align().

{% include links.html %}