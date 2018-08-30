---
title: topk Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_topk.html
summary: Reference to the topk() function
---
## Summary
```
topk(<numberOfTimeSeries>, [mean|median|min|max|sum|count, [<timeWindow>,]] <expression>)
```
Ranks the time series described by the expression according to their most recent data values, and returns the top number of series in the ranking. A time series' rank is based on its single most recent data value, or on an aggregation of its most recent data values over a given time window.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of top-ranked time series to be returned.  </td></tr>
<tr>
<td>mean&vert;median&vert;min&vert;max&vert;sum&vert;count </td>
<td>Summarization method to use for aggregating the most recent data values in a time series. 
These are similar to the <a href="charts.html#general"><strong>Summarize by</strong> options</a> you can set for a chart.
Default is to rank each series according to the value of its last (rightmost) single data point, if this parameter is not specified.</td>
</tr>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">Length of the time window over which to aggregate the most recent values in a time series. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is 1vw if this parameter is not specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to be ranked and filtered.</td>
</tr>
</tbody>
</table>

## Description

The `topk()` function filters the time series described by the expression, ranking the series from high to low and then returning just the specified number of series at the top of the ranking. 

Depending on the parameters you specify, each time series is ranked based on its latest (most recent) single data value, or based on an aggregation of its most recent data values over a given time window. You request aggregation by specifying the summary method (mean, median, sum, etc.) to use for combining the values. You can optionally include the length of the time window for the aggregation, if it is to be different from the overall length of the chart. The time window always ends with the last (most recent) data value. For example, a time window of `2h` says to aggregate just the values reported in the last 2 hours. 

The following table summarizes how `topk()` parameters affect its results:

<table>
<tbody>
<thead><tr><th width="35%">Sample topk() Format</th> <th width="30%">Basis for Ranking Each Time Series</th> <th width="35%">topk() Results</th></tr>
</thead>
<tr>
<td markdown="span">`topk(3, ts(my.metric))`</td>
<td>Value of the latest data point in the series. </td>
<td>Returns the 3 time series whose last data values are the highest.</td></tr>
<tr>
<td markdown="span">`topk(3, median, ts(my.metric))`</td>
<td>Aggregated value of the data points reported by the series during the chart's time window.</td>
<td>Returns the 3 time series that had the highest median data value during the chart's time window.</td></tr>

<tr>
<td markdown="span">`topk(3, median, 2h, ts(my.metric))`</td>
<td>Aggregated value of the data points reported by the series during the specified time window. </td>
<td>Returns the 3 time series that had the highest median data value during the past 2 hours.</td></tr>
</tbody>
</table>


## Examples

**Example 1: Ranking by Last Data Value** 

<!--- The following example returns the 3 time series whose latest data point reported the highest number of failures:

```topk(3, ts(~sample.requests.failures.num))``` --->

The following example shows only the top 3 of the time series for which we have the total number of sample requests.

![topk example](images/ts_topk.png)

<!---
**Example 2: Ranking by Data Values Aggregated Over the Chart** 

The following query returns the 3 time series that accumulated the most failures across the entire chart. The results might change if you change the chart's time window.

  ```topk(3, sum, ts(~sample.requests.failures.num))```

**Example 3: Ranking by Data Values Aggregated Over a Shorter Time Window** 

The following query returns the 3 time series that reported the single highest number of failures during the last 2 hours. 

  ```topk(3, max, 2h, ts(~sample.requests.failures.num))```
--->
