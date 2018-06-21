---
title: mavg Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mavg.html
summary: Reference to the mavg() function
---

## Summary

```
mavg(<timeWindow>, <expression>)
```

Returns the moving average of each series over `timeWindow`.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><a href="query_language_reference.html#query-elements">timeWindow</a></td>
<td>A clock/calendar time measurement (1s, 1m, 1h, 1d, 1w), time relative to the window length (vw), or time relative to the bucket size (bw) of the chart. Default is minutes if the unit is not specified.
<div><strong>NOTE</strong>: If the series stops reporting, then <code>mcount()</code> returns the number of data points for 2x the duration of the time window.</div></td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>A ts expression, a constant, or a wildcard.</td>
</tr>
</tbody>
</table>

## Description

The `mavg()` function computes the moving average of each time series over a shifting time window. For example, `mavg(60m, ts(my.metric))` returns, at each point, the moving average over the last 60 minutes for each series in `expression`.

Here's how to select your averaging function:

* Use `mavg()` to see the moving average in a specified time window.
* Use `avg()` to see the average (the mean).
* Use `median()` to see the median. Using `median` is preferred if there are a lot of outliers.
* Use `mpercentile()` with a percentile of 50 to see the moving median.


## Example

Let's say you have the following expression:

`mavg(48h, ts(my.metric))`

Assume `ts(my.metric)` reports data values once per hour, but only started reporting data 24 hours ago. `mavg()` will add up all reported points within the last 48 hours and divide by the number of reported points (not number of hours). So in that example `mavg()` divides by 24 not by 48, because technically, we have only 24 reported points within the last 48 hours.

The following example shows the requests latency for a single app server (app-1):

![mavg before](images/ts_mavg_before.png)

And here's what we see when we apply `mavg()`.

![mavg](images/ts_mavg.png)

## Caveats

At times, using `msum` can get you the information you want. In that case, use `msum` because performance is better.
