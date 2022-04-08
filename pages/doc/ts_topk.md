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
topk(<numberOfTimeSeries>, [mean|median|min|max|sum|count|last, [<timeWindow>,]] <tsExpression>)
```
Ranks the time series described by the expression, and returns just the specified number of top-ranked series. Ranking for a time series is based on its last data value in the current chart, or on a summarization of its last data values over a specified time window.


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
<td>mean&vert;median&vert;min&vert;max&vert;sum&vert;count&vert;last </td>
<td>Summarization method to use for combining data values in a time series.
These are similar to the <strong>Summarize by</strong> options that you can set for a chart.
Default is to rank each series according to the value of its last (rightmost) data point on the current chart, if this parameter is not specified.</td>
</tr>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Length of the time window over which to summarize data values in a time series, if a summarization method is specified. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is 1vw, if this parameter is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series to be ranked and filtered.</td>
</tr>
</tbody>
</table>


## Description

The `topk()` function ranks the time series described by the expression, and then filters these series by returning just the specified number of series at the top of the ranking.

### About Ranking

Depending on the parameters you specify, the time series are ranked from top to bottom based one or more data values in each series:

* By default, the ranking is based on the value of the latest (rightmost) single data point displayed for each series on the current chart. When a chart shows live data, each series is therefore ranked according to its most recently reported value. The series with the highest rightmost value has the top ranking.

* If you specify a summarization method (`mean`, `median`, `sum`, etc.), the ranking is based on a _summary value_ obtained from each series by combining one or more of its rightmost data values. For example, `mean` produces a summary value for a series by averaging data values, and the series with the highest average has the top ranking.

  * By default, the summary value for a series combines all of the values shown for the series in the current chart.
  * If you specify a time window parameter, the summary value combines just the data values reported during that time window. The time window always includes the last (rightmost) data value in the chart. For example, in a live data chart, a time window of `2h` says to summarize the data values reported in the past 2 hours.

### Parameter Usage Overview

The following table shows how the parameters of `topk()` affect the results.

<table>
<tbody>
<thead><tr><th width="35%">Sample Parameters</th> <th width="35%">Basis for Ranking Each Time Series</th> <th width="30%">Sample Results</th></tr>
</thead>
<tr>
<td markdown="span">`topk(3, ts(my.metric))`</td>
<td>Value of the rightmost data point displayed for the series on the chart. </td>
<td>Returns the 3 time series with the highest data values at the right edge of the chart.</td></tr>
<tr>
<td markdown="span">`topk(3, max, ts(my.metric))`</td>
<td>Summary value obtained from the data points reported by the series during the chart's time window.</td>
<td>Returns the 3 time series that had the highest maximum data values during the chart's time window.</td></tr>

<tr>
<td markdown="span">`topk(3, max, 2h, ts(my.metric))`</td>
<td>Summary value obtained from the data points reported by the series during the specified time window. </td>
<td>Returns the 3 time series that had the highest maximum data values during the last 2 hours before the end of the chart.</td></tr>
</tbody>
</table>


## Examples

**Unfiltered Series**

<!--- requests: ts(~sample.requests.total.num, source=app-11, source=app-12, source=app-13) --->
This chart shows 3 time series that report the total number of requests from 3 sources. We will filter these series in the following examples.

![topk base](images/ts_topk_filter_base.png)

**Example 1: Ranking by Rightmost Data Value**

<!--- topk(2, ${requests}) --->
Here we use `topk()` to show only the top 2 time series (from sources `app-13` and `app-11`). The ranking is based on the value of the rightmost data point shown for each series in the chart, which was reported at 12:35pm:

![topk example](images/ts_topk_default_ranking.png)

**Example 2: Ranking by Summarized Data Values**

<!--- topk(2, max, ${requests}) --->
Here we use `topk()` with the `max` summarization method to show the time series (from sources `app-11` and `app-12`) that had the two highest peaks across the entire chart. The results might change if you change the chart's time window.

![topk max example](images/ts_topk_max_over_chart.png)

**Example 3: Ranking by Data Values Summarized Over a Shorter Time Window**

<!--- topk(2, max, 5m, ${requests}) --->
Here we use `topk()` with the `max` summarization method over the final 5 minutes of the chart. In contrast to Example 2, the top 2 time series are now from sources `app-13` and `app-11`. The highest peaks within the 5 minute time window differ from the highest peaks across the entire chart.

![topk max 5m example](images/ts_topk_max_5m.png)

<!---
**Example XX: Ranking by Summarized Data Values**

Now we use `topk()` with the summarization method `sum` to show the 2 time series that accumulated the most requests across the entire chart. The results might change if you change the chart's time window.

  ```topk(3, sum, ts(~sample.requests.requests.total.num))```

**Example XX: Ranking by Data Values Summarized Over a Shorter Time Window**

The following query returns the 3 time series that reported the single highest number of requests during the last 2 hours.

  ```topk(3, max, 2h, ts(~sample.requests.requests.total.num))```
--->

## See Also

[`bottomk()` Function](ts_bottomk.html)

[`top()` Function](ts_top.html)
