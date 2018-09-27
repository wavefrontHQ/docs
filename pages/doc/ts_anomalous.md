---
title: anomalous Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_anomalous.html
summary: Reference to the anomalous() function
---
## Summary
```
anomalous(<testWindow>, [<confidenceFactor>,] [<historyWindow>, [<alignWindow>,]] <expression>)
```
Returns the percentage of anomalous points in each time series described by the expression. Points are considered anomalous if their values fall outside the expected range, as determined by the specified confidence factor. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span"> [testWindow](query_language_reference.html#query-elements)</td>
<td>Length of the moving time window to check for anomalous points. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.
</td></tr>
<tr><td markdown="span"> confidenceFactor</td>
<td> Confidence factor for determining the range of expected values, expressed as a value between 0.0 and 1.00. Specify 0.99 for a range that is equivalent to 3 standard deviations on either side of a predicted value. Specify 0.95 for a range that is equivalent to 2 standard deviations on either side of a predicted value.
Default is 0.99 if this parameter is not specified.
</td></tr>
<tr><td markdown="span"> [historyWindow](query_language_reference.html#query-elements)</td>
<td>Time window immediately preceding the chart window. Taken together, points reported in the chart window and the specified history window are used as the basis for predicting values within the test window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is 1 week if this parameter is not specified.
</td></tr>
<tr><td markdown="span"> [alignWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">Size (duration) of the buckets for grouping data values to regularize the reporting interval of the time series. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is the bucket size of the chart, if this parameter is not specified. You cannot specify this parameter unless you also specify `historyWindow`.
</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to inspect for anomalous points. </td></tr>
</tbody>
</table>


## Description

The `anomalous()` function analyzes data points in the time series described by the expression, and returns the percentage of points that have anomalous (unexpected) values. Values are considered anomalous if they fall outside a predicted range of values. By default, `anomalous()` uses a range that is predicted with 0.99 (99%) confidence.

Within a time series, `anomalous()` analyzes successive groups of data points, and returns the percentage of anomalous points for each group. These groups are defined by the _test window_, which is a moving time window whose length you specify. For example, `anomalous(5m, ts(my.metric))` returns, for a given data point, the percentage of anomalous data points that were reported during the 5 minutes before that data point. If 2 out of 5 points in the test window have values that are considered anomalous, the result returned for that test window is `0.40`. 

`anomalous()` returns a separate series of results for each time series described by the expression.

You can specify parameters to `anomalous()` to adjust the range of expected values, or to fine-tune the input values on which prediction is based.

### Adjusting the Range of Expected Values

`anomalous()` uses a forecasting algorithm to predict a range of expected values for each data point shown in the chart for the time series. A reported data point is considered anomalous if its value falls outside of the range that is predicted for it. 

Within the overall range of expected values, different sub-ranges of values are predicted with different degrees of confidence. You can select a wider or narrower sub-range by specifying a confidence factor to `anomalous()`. The confidence factor is a number between 0.0 and 0.99, and the sub-ranges it indicates are analogous to standard deviations in statistical analysis. For example:

* You can specify 0.99 to adjust the range to include 99% of the expected values. This causes `anomalous()` to report the percentage of points that fall outside 3 standard deviations from the central predicted values. 
* You can specify 0.95 to adjust the range to include 95% of the expected values. This causes `anomalous()` to report the percentage of points outside 2 standard deviations from the central predicted values. 

The wider the range, the fewer points will lie outside it, and the smaller the reported percentages. The narrower the range, the more points are considered anomalous, and the higher the reported percentages.


### Tuning Value Prediction

The forecasting algorithm used by `anomalous()` bases its predictions on actual values reported by the series. 

Predictions are produced by forecasting algorithms acting on past values.
