---
title: time Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_time.html
summary: Reference to the time() function
---
## Summary
```
time()
```
Returns a continuous series of epoch seconds corresponding to the seconds on the chart's x-axis.


## Description

The `time()` standard time function represents each second on the chart's x-axis as a number of epoch seconds. The returned values are based on the system clock on Wavefront servers.

Epoch seconds are the number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC) on January 1, 1970.
By default, the chart legend displays an abbreviated version of the epoch seconds that represent the timestamp. You can cause the legend to display the entire number of epoch seconds by holding down the shift key when you hover over the time series.

Note that if the chart's bucket size is greater than 1 second, some of the displayed values will be averages over multiple epoch time values, and therefore shown as decimal numbers with fractional parts. To get precise epoch times, you can zoom in to shrink the chart's bucket size to ~1 second.

<!---## Examples

This chart shows the timestamp values associated with the reported CPU usage maximums. Notice that the legend displays a timestamp as an abbreviated numeric value (`1.529G`).
![timestamp](images/ts_timestamp_no_shift.png)

This chart also shows the timestamp values associated with the reported CPU usage maximums, but this time we held the shift key while hovering the pointer over the value, so the legend displays the timestamp as an an actual number of epoch seconds (`1529366640`).
![timestamp change](images/ts_timestamp_shift.png)
--->
