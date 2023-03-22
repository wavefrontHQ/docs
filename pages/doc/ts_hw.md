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
hw(<historyLength>, <tsExpression>, <smoothingFactor>, <trendFactor>)
hw(<historyLength>, <seasonLength>, <samplingRate>, <tsExpression> [, <smoothingFactor>, <trendFactor>, <seasonalityFactor>])
```
Returns a smoothed version of the time series described by the expression, and forecasts future points using the Holt-Winters algorithm.
* For double exponential smoothing use `smoothingFactor` and `trendFactor`.
* If you have seasonal data, use triple exponential smoothing with `seasonLength`. You can optionally specify `smoothingFactor`, `trendFactor`, and `seasonalityFactor`.

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
<td>smoothingFactor</td>
<td>Specifies how much old data is important relative to new data. The values range between 0 and 1, with 1 assigning the most importance to old data.
See "Using Parameters to Affect hw()" below for details.</td>
</tr>
<tr>
<td>trendFactor</td>
<td>trendFactor specifies how important the trend is. The values range between 0 and 1, with 1 used for the most important trend. See "Using Parameters to Affect hw()" below for details.
</td>
</tr>
<tr>
<td>seasonalityFactor</td>
<td>Optional. Used for triple-exponential smoothing to weigh the seasonality.  The values range between 0 and 1, with smaller numbers weighing historical data more, and larger numbers weighing recent data more.
</td>
</tr>
</tbody>
</table>

## Description

The `hw` function supports smoothing and prediction based on existing data.
* For double-exponential smoothing, `smoothingFactor` and `trendFactor` are required.
* For triple-exponential smoothing, a `seasonLength` parameter is required. The `smoothingFactor`, `trendFactor`, and `seasonalityFactor` parameters are optional. If not specified, the algorithm uses an optimization method called Nelder-Mead.  Because Nelder-Mead finds local optima the same query might return two different results if the function is run twice.

### Holt-Winters Triple Exponential Smoothing

Use triple exponential smoothing if your data is highly seasonal. Our implementation includes parameters to specify history length, season length, and sample rate. The optional `smoothingFactor`, `trendFactor`, and `seasonalityFactor` parameters let you fine-tune how aggressive the smoothing is. See [Exponential Smoothing](https://en.wikipedia.org/wiki/Exponential_smoothing) and other internet resources for info about the algorithm.

Holt-Winters triple exponential smoothing is a form of time series analysis that's used primarily for periodic or seasonal data. Its main strength is catching the overall trend of data over time while maintaining the structure of the data's seasons.

If you use the `hw()` function on a time series with a set periodicity, the function can predict the next event of interest, and, for example, send an alert.

For example, assume that at certain times of the day a set of virtual machines experiences peak load. You could set up an alert for that event, or assign additional CPU and memory to them. If the peak load time changes, for example, because daylight saving time ends, the `hw()` function can catch up and adjust the alert or resources.

### Holt-Winters Double Exponential Smoothing

Use double exponential smoothing if you have data with only trend and no seasonality. The `smoothingFactor` parameter lets you specify how much old data is important relative to new data. The `trendFactor` parameter lets you specify how important the trend is.

{% include note.html content="This double exponential smoothing method is only for data with additive trend not with multiplicative trend." %}

## Using Parameters to Affect hw()

You use parameters to influence how stable and how reactive the forecast is.

For **double exponential smoothing**, `smoothingFactor` and `trendFactor` are required and `seasonalityFactor` is not supported.

For **triple exponential smoothing**, `smoothingFactor`, `trendFactor`, and `seasonalityFactor` are optional.

- **smoothingFactor** affects the weighted average of the points themselves.  The weight of every point decays exponentially the further back the point is.  When a new point is added to the weighted average, the weight of the new point is smoothingFactor, and the weight of the old average is `(1 – smoothingFactor)`.  Therefore, higher values of smoothingFactor cause the algorithm to weight newer points more, making the forecast more reactive and less stable.

- **trendFactor** affects the weighted average of the slopes between consecutive points.  The algorithm uses an exponentially decaying weighted average of the slope between every two consecutive points, similar to the raw value of the points.  This weighted average is calculated in the same way as the weighted average for smoothingFactor. Each time a new point is added, the slope between it and the last point is factored in with a weight of trendFactor, while the old weighted average now has weight `(1 – trendFactor)`.  Therefore, higher values of trendFactor cause the algorithm to weight the most recent slope higher, making the forecast more reactive and less stable.

- **seasonalityFactor**  affects the weighted average of the seasonal offsets.  Holt-Winters captures seasonal data by measuring the average offset of a given point into a season from the average value of that season.  For example, assume history length is four weeks, season length is one week, and sampling rate is one day. Then across the four weeks of history, there is an average amount that each day differs from the average value of the week it occurs in.

  Like the smoothingFactor and trendFactor, this average is a weighted average, with newer offsets having higher weights.  Each time a new point is processed, it impacts the average offset from the season average by a factor of seasonalityFactor, while the old weighted average offset has a weight of `(1 – seasonalityFactor)`.  Therefore, higher values of seasonalityFactor cause the algorithm to weight newer points more, making the forecast more reactive and less stable.

## Example

In the following example, we've defined `original data` as a ts expression. We can fun the following query to return a smoothed version of the expression and forecasts its future points using the Holt-Winters triple exponential smoothing algorithm for seasonal data.

```
hw(1d, 1h, 10m, ${original data}, 1, 0, 1)
```

The query uses the triple exponential smoothing syntax, which includes seasonality and has these elements.

* 1d - historyLength
* 1h - seasonLength
* 10m - samplingRate
* ${original data} - tsExpression
* 1 - smoothingFactor
* 0 - trendFactor
* 1 - seasonalityFactor


## Caveats
There are requirements when using the `hw()` function:
* The number of data points(including both the history length and the points in the window) divided by the sampling rate cannot exceed 10,000.
* For triple exponential smoothing, the sampling rate must evenly divide the season length.

## See Also

See [this blog article](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/expanding-wavefront-predictive-analytics-see-the-future-with-holt-winters-algorithm) for in-depth discussion of an example.
