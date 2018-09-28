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
Returns the percentage of anomalous points in each time series described by the expression. Points are considered anomalous if their values fall outside an expected range, as determined by the given confidence factor. 

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span"> [testWindow](query_language_reference.html#query-elements)</td>
<td>Length of the _test window_, which is the moving time window to check for anomalous points. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.
</td></tr>
<tr><td markdown="span"> confidenceFactor</td>
<td markdown="span"> A number from 0.0 to 1.00 (inclusive) that expresses the _confidence factor_ for determining the range of expected values. This number is used to compute the range as a number of standard deviations around the mean expected value.
Default is 0.99 if this parameter is not specified.
</td></tr>
<tr><td markdown="span"> [historyWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">Amount of time in the _history window_ immediately preceding the chart window. Points in the chart window and the history window are the basis for predicting the expected values in the test window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is 1 week (1w) if this parameter is not specified.
</td></tr>
<tr><td markdown="span"> [alignWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">Size (duration) of the buckets for summarizing data values, to regularize the reporting interval of the time series. The reported values in a bucket are summarized by averaging. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is the bucket size of the chart (1bw), if this parameter is not specified. You cannot specify this parameter unless you also specify `historyWindow`.
</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to inspect for anomalous points. </td></tr>
</tbody>
</table>


## Description

The `anomalous()` function analyzes data points in the time series described by the expression, and returns the percentage of points that have anomalous (unexpected) values. Values are considered anomalous if they fall outside a range of expected values. By default, `anomalous()` uses a range that is predicted with 0.99 (99%) confidence.

`anomalous()` analyzes successive groups of data points in a time series, and returns the percentage of anomalous points for each group. You define the groups to be checked by specifying the `testWindow` parameter. For example, `anomalous(5m, ts(my.metric))` returns, for each data point, the percentage of data points with anomalous values that were reported during the 5 minutes before that data point. If 2 out of 5 points in a test window have anomalous values, the result returned for that test window is `0.40`. 

`anomalous()` returns a separate series of results for each time series described by the expression.

You can specify optional parameters to `anomalous()` to adjust the range of expected values, or to fine tune the input values on which prediction is based.

### Adjusting the Range of Expected Values

`anomalous()` uses a forecasting algorithm to predict a range of expected values for each data point reported in the chart for the time series. A reported data point is considered anomalous if its value falls outside of the range that is predicted for it. 

The range of expected values for a point is organized in standard deviations around a mean expected value. You can adjust the width of the range by specifying a numeric `confidenceFactor` parameter. `anomalous()` uses this number to compute the number of standard deviations to include in the range. For example:

* Specify 0.99 to include 99% of the expected values in the range. Consequently, `anomalous(5m, .99, ts(my.metric))` returns the percentages of points that fall outside 3 standard deviations from the mean expected values. (**Note:** This is the default, so omitting `.99` is the same as specifying it.)
* Specify 0.95 to include 95% of the expected values. Consequently, `anomalous(5m, .95, ts(my.metric))` returns the percentages of points that fall outside 2 standard deviations from the mean expected values. 
* Specify 0.68 to include 68% of the expected values. Consequently, `anomalous(5m, .68, ts(my.metric))` returns the percentages of points that fall outside 1 standard deviation from the mean expected values. 


The wider the range, the fewer points will lie outside it, and the smaller the reported percentages. The narrower the range, the more points might be considered anomalous, and the higher the reported percentages.


### Tuning Value Prediction

`anomalous()` uses a forecasting algorithm that bases its predictions on actual values reported by the time series. These values come from data points reported in the chart window and data points reported in a history window immediately preceding the chart. In effect, the history window provides a minimum amount of past data for `anomalous()` to base its predictions on, regardless of the size of the chart's time window. 

By default, the history window is a week long. You can fine tune the forecast by adding an optional `historyWindow` parameter to specify a longer or shorter history window. A longer history window supports more accurate prediction, although it might cause the query to take longer.

If the data points used for prediction have missing data or an irregular reporting interval, you can smooth over the gaps by specifying an optional `alignWindow` parameter. You must specify `historyWindow` as well.

For example, `anomalous(5m, 2w, 1m, ts(my.metric))` predicts the expected values based on 2 weeks's worth of actual data points in addition to the data shown in the chart, and aligns the input data points at 1-minute intervals. 

<!--- Looking for a more realistic example.
## Example

The following chart shows CPU usage for one of the sources. 

![anomalous before](images/ts_anomalous_before.png)

We'd like to know whether the actual CPU usage deviates from the expected CPU usage, based on the past 2 weeks's worth of actual data. So we run the query `anomalous(2m, 0.50, 2w, ts(~sample.cpu.usage.user.percentage, source=app-14))` to analyze the points in 2-minute test windows. The resulting orange line in the following chart suggests that the dip in CPU usage between 3:18 and 3:22 may be anomalous, because 2/3 (0.667) of the values fall outside a fairly narrow range (50%) of the expected values. In contrast, the behavior from 3:23 on seems right in line with expectations -- the percentage of anomalous points here is 0.  

![anomalous after](images/ts_anomalous_after.png)
---> 
