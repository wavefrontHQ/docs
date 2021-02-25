---
title: Holt-Winters Predictive Analysis
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: query_language_hw_function.html
published: false
summary: Learn how to do Holt-Winters prediction using the hw() function.
---
Wavefront includes an implementation of the Holt-Winters algorithm, which supports prediction based on existing data. It's especially useful if your data are highly seasonal. Our implementation includes parameters to specify history length, season length, and sample rate. The `alpha`, `beta`, and `gamma` parameters let you fine-tune how aggressive the smoothing is. See [Exponential Smoothing](https://en.wikipedia.org/wiki/Exponential_smoothing) and other internet resources for info about the algorithm.

See [Expanding Wavefront Predictive Analytics - See the Future with Holt-Winters Algorithm](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/expanding-wavefront-predictive-analytics-see-the-future-with-holt-winters-algorithm) for in-depth discussion of an example.

## Overview

Holt-Winters triple exponential smoothing is a form of time series analysis that's used primarily for periodic or seasonal data. Its main strength is catching the overall trend of data over time while maintaining the structure of the data's seasons.

If you use the `hw()` function on a time series with a set periodicity, the function can predict the next event of interest, and, for example, send an alert.

For example, assume that at certain times of the day a set of virtual machines experiences peak load. You could set up an alert for that event, or assign additional CPU and memory to them. If the peak load time changes, for example, because daylight saving time ends, the `hw()` function can catch up and adjust the alert or resources.

## Syntax and Parameters

The function has the following syntax:

`hw(<history_length>, <season_length>, <sampling_rate>, <expression>[, <alpha>, <beta>, <gamma>])`

The function has three required and three optional parameters:

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>history_length</td>
<td>Amount of data that we use to smooth the underlying time series and to forecast.  History length is expressed as time before the left side of the widow, so that <code>hw(4w, ...)</code> looks at the last 4 weeks of data before the query starts. If the chart window looks only at future data points, the history length is interpreted as the amount of time before the present instead of the amount of time before the left side of the window.
</td>
</tr>
<tr>
<td>season_length</td>
<td>Length of one season of data.  You need at least two full seasons of data to run the Holt-Winters algorithm.
</td>
</tr>
<tr>
<td>sampling_rate</td>
<td>Rate at which the function summarizes the points in the underlying expression, similar to the <code>align()</code> function. The sampling rate always uses the average of all points in the time window as the summarization strategy. To use a different summarization strategy, wrap the underlying expression with <code>align()</code>.
<div>&nbsp;</div>
<div>For example, <code>hw(4h, 1h, 1m, align(1m, ts(cpu.usage.idle)))</code>
<ul>
<li>takes the time series <code>cpu.usage.idle</code>,</li>
<li>and runs the Holt-Winters algorithm on the series with a season length of 1 hour and a sampling rate of 1 minute. </li></ul></div>
</td>
</tr>
<tr>
<td>expression</td>
<td>The time series on which you want to run the Holt-Winters algorithm.
</td>
</tr>
<tr>
<td>alpha, beta, gamma</td>
<td>Optional coefficients that the Holt-Winters algorithm uses to determine how stable and how reactive its forecast is.  The values range between 0 and 1, with smaller numbers weighing historical data more, and larger numbers weighing recent data more.
<div>&nbsp;</div>
<div>If you don't specify these parameters, the algorithm uses an optimization method called Nelder-Mead.  Because Nelder-Mead finds local optima the same query might return two different results if the function is run twice.  See Optional Parameters below for details.</div>
</td>
</tr>
</tbody>
</table>

## Optional Parameters to Holt-Winters

Alpha, beta, and gamma are optional parameters that the Holt-Winters algorithm uses to determine how stable and how reactive its forecast is.

- **Alpha** affects the weighted average of the points themselves.  The weight of every point decays exponentially the further back the point is.  When a new point is added to the weighted average, the weight of the new point is alpha, and the weight of the old average is `(1 – alpha)`.  Therefore, higher values of alpha cause the algorithm to weight newer points more, making the forecast more reactive and less stable.

- **Beta** affects the weighted average of the slopes between consecutive points.  The algorithm uses an exponentially decaying weighted average of the slope between every two consecutive points, similar to the raw value of the points.  This weighted average is calculated in the same way as the weighted average for alpha. Each time a new point is added, the slope between it and the last point is factored in with a weight of beta, while the old weighted average now has weight `(1 – beta)`.  Therefore, higher values of beta cause the algorithm to weight the most recent slope higher, making the forecast more reactive and less stable.

- **Gamma**  affects the weighted average of the seasonal offsets.  Holt-Winters captures seasonal data by measuring the average offset of a given point into a season from the average value of that season.  For example, assume history length is four weeks, season length is one week, and sampling rate is one day. Then across the four weeks of history, there is an average amount that each day differs from the average value of the week it occurs in.

  Like the alpha and beta, this average is a weighted average, with newer offsets having higher weights.  Each time a new point is processed, it impacts the average offset from the season average by a factor of gamma, while the old weighted average offset has a weight of `(1 – gamma)`.  Therefore, higher values of gamma cause the algorithm to weight newer points more, making the forecast more reactive and less stable.
