---
title: hw Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_hw.html
summary: Reference to the hw() function
---

## Summary
```
hw(<historyLength>, <tsExpression> [,<smoothingFactor>, <trendFactor>])
hw(<historyLength>, <seasonLength>, <samplingRate>, <tsExpression> [, <smoothingFactor>, <trendFactor>, <seasonalityFactor>])
```
Returns a smoothed version of the time series described by the expression, and forecasts future points using the Holt-Winters algorithm.
* For double exponential smoothing use `smoothingFactor` and `trendFactor`.
* If you have seasonal data, use triple exponential smoothing with `smoothingFactor`, `trendFactor`, `seasonalityFactor`.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>historyLength</td>
<td>Amount of data that we use to smooth the underlying time series and to forecast.  History length is expressed as time before the left side of the widow, so that <code>hw(4w, ...)</code> looks at the last 4 weeks of data before the query starts. If the chart window looks only at future data points, the history length is interpreted as the amount of time before the present instead of the amount of time before the left side of the window.
</td>
</tr>
<tr>
<td>seasonLength</td>
<td>Used with the triple-exponential smoothing algorithm to specify the length of one season of data.  You need at least two full seasons of data to run the Holt-Winters algorithm.
</td>
</tr>
<tr>
<td>samplingRate</td>
<td>Rate at which the function summarizes the points in the underlying expression, similar to the <code>align()</code> function. The sampling rate always uses the average of all points in the time window as the summarization strategy. To use a different summarization strategy, wrap the underlying expression with <code>align()</code>.
</td>
</tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The time series on which you want to run the Holt-Winters algorithm.
</td>
</tr>
<tr>
<td>smoothingFactor, trendFactor, seasonalityFactor</td>
<td>Optional coefficients that the Holt-Winters algorithm uses to determine how stable and how reactive its forecast is.  The values range between 0 and 1, with smaller numbers weighing historical data more, and larger numbers weighing recent data more.
<ul>
<li>smoothingFactor specifies how much old data is important relative to new data </li>
<li>trendFactor specifies how important the trend is. </li>
<li>seasonalityFactor weighs the seasonality.  </li>
</ul>
See "Using Optional Parameters to Affect hw()" below for details.
</td>
</tr>
</tbody>
</table>

## Description

The `hw` function supports smoothing and prediction based on existing data. An optional `seasonalityFactor` parameter is available for triple exponential smoothing.

If you don't specify the `smoothingFactor`, `trendFactor`, and `seasonalityFactor` parameters, the algorithm uses an optimization method called Nelder-Mead.  Because Nelder-Mead finds local optima the same query might return two different results if the function is run twice.

### Holt-Winters Triple Exponential Smoothing

Use triple exponential smoothing if your data is highly seasonal. Our implementation includes parameters to specify history length, season length, and sample rate. The optional `smoothingFactor`, `trendFactor`, and `seasonalityFactor` parameters let you fine-tune how aggressive the smoothing is. See [Exponential Smoothing](https://en.wikipedia.org/wiki/Exponential_smoothing) and other internet resources for info about the algorithm.

Holt-Winters triple exponential smoothing is a form of time series analysis that's used primarily for periodic or seasonal data. Its main strength is catching the overall trend of data over time while maintaining the structure of the data's seasons.

If you use the `hw()` function on a time series with a set periodicity, the function can predict the next event of interest, and, for example, send an alert.

For example, assume that at certain times of the day a set of virtual machines experiences peak load. You could set up an alert for that event, or assign additional CPU and memory to them. If the peak load time changes, for example, because daylight saving time ends, the `hw()` function can catch up and adjust the alert or resources.

### Holt-Winters Double Exponential Smoothing

Use double exponential smoothing if you have data with only trend and no seasonality. The `smoothingFactor` parameter lets you specify how much old data is important relative to new data (same as `smoothingFactor`). The `trendFactor` parameter lets you specify how important the trend is (same as `trendFactor`).

{% include note.html content="This double exponential smoothing method is only for data with additive trend not with multiplicative trend." %}

## Using Optional Parameters to Affect hw()

For triple exponential smoothing, you can use the optional `smoothingFactor`, `trendFactor`, and `seasonalityFactor` parameters that the algorithm uses to determine how stable and how reactive the forecast is.

- **smoothingFactor** affects the weighted average of the points themselves.  The weight of every point decays exponentially the further back the point is.  When a new point is added to the weighted average, the weight of the new point is smoothingFactor, and the weight of the old average is `(1 – smoothingFactor)`.  Therefore, higher values of smoothingFactor cause the algorithm to weight newer points more, making the forecast more reactive and less stable.

- **trendFactor** affects the weighted average of the slopes between consecutive points.  The algorithm uses an exponentially decaying weighted average of the slope between every two consecutive points, similar to the raw value of the points.  This weighted average is calculated in the same way as the weighted average for smoothingFactor. Each time a new point is added, the slope between it and the last point is factored in with a weight of trendFactor, while the old weighted average now has weight `(1 – trendFactor)`.  Therefore, higher values of trendFactor cause the algorithm to weight the most recent slope higher, making the forecast more reactive and less stable.

- **seasonalityFactor**  affects the weighted average of the seasonal offsets.  Holt-Winters captures seasonal data by measuring the average offset of a given point into a season from the average value of that season.  For example, assume history length is four weeks, season length is one week, and sampling rate is one day. Then across the four weeks of history, there is an average amount that each day differs from the average value of the week it occurs in.

  Like the smoothingFactor and trendFactor, this average is a weighted average, with newer offsets having higher weights.  Each time a new point is processed, it impacts the average offset from the season average by a factor of seasonalityFactor, while the old weighted average offset has a weight of `(1 – seasonalityFactor)`.  Therefore, higher values of seasonalityFactor cause the algorithm to weight newer points more, making the forecast more reactive and less stable.

## Example Discussion

**Triple Exponential Smoothing**
If your data for CPU usage is seasonal, use this query:
```
hw(4h, 1h, 1m, align(1m, ts(cpu.usage.idle)))
```
The function runs the Holt-Winters algorithm on the series with a season length of 1 hour and a sampling rate of 1 minute. The example doesn't use the optional parameters to weigh smoothing, trend, and seasonality.

**Double Exponential Smoothing**

If your data for CPU usage is *not* seasonal, use this query:
```
hw(4h, 1m, align(1m, ts(cpu.usage.idle)))
```
The function runs the Holt-Winters algorithm on the series using a sampling rate of 1 minute. The example doesn't use the optional parameters to weigh smoothing and trend.


## Caveats
There are requirements when using the `hw()` function:
* The number of data points(including both the history length and the points in the window) divided by the sampling rate cannot exceed 10,000.
* For triple exponential smoothing, the sampling rate must evenly divide the season length.

## See Also

See [Expanding Wavefront Predictive Analytics - See the Future with Holt-Winters Algorithm](https://www.wavefront.com/holtwinters-predictive-algorithm/) for in-depth discussion of an example.
