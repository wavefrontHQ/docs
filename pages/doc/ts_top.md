---
title: top Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_top.html
summary: Reference to the top() function
---
## Summary
```
top(<numberOfTimeSeries>, [mean|median|min|max|sum|count|last, [<timeWindow>,]] <tsExpression>)
```

Ranks the time series described by the expression, and returns 1 for the specified number of top-ranked series, and 0 for the other series. Ranking for a time series is based on its last data value in the current chart, or on a summarization of its last data values over a specified time window.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of top-ranked time series to be returned as 1.  </td></tr>
<tr>
<td>mean&vert;median&vert;min&vert;max&vert;sum&vert;count&vert;last</td>
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

The `top()` function ranks the time series described by the expression, and then uses that ranking to represent each time series as either the constant 1 or the constant 0:

* 1 is returned for each time series that is in the specified number of series at the top of the ranking.
* 0 is returned for each of the remaining time series.

The returned constants are [continuous time series](query_language_discrete_continuous.html).

### About Ranking

Depending on the parameters you specify, the time series are ranked from top to bottom based one or more data values in each series:

* By default, the ranking is based on the value of the latest (rightmost) single data point displayed for each series on the current chart. When a chart shows live data, each series is therefore ranked according to its most recently reported value. The series with the highest rightmost value has the top ranking.

* If you specify a summarization method (`mean`, `median`, `sum`, etc.), the ranking is based on a _summary value_ obtained from each series by combining one or more of its rightmost data values. For example, `mean` produces a summary value for a series by averaging data values, and the series with the highest average has the top ranking.

  * By default, the summary value for a series combines all of the values shown for the series in the current chart.
  * If you specify a time window parameter, the summary value combines just the data values reported during that time window. The time window always includes the last (rightmost) data value in the chart. For example, in a live data chart, a time window of `2h` says to summarize the data values reported in the past 2 hours.

### Parameter Usage Overview

The following table shows how the parameters of `top()` affect the results.

<table>
<tbody>
<thead><tr><th width="35%">Sample Parameters</th> <th width="35%">Basis for Ranking Each Time Series</th> <th width="30%">Sample Results</th></tr>
</thead>
<tr>
<td markdown="span">`top(3, ts(my.metric))`</td>
<td>Value of the rightmost data point displayed for the series on the chart. </td>
<td>Returns 1 for each of the 3 time series with the highest data values at the right edge of the chart. Returns 0 for all other series.</td></tr>
<tr>
<td markdown="span">`top(3, max, ts(my.metric))`</td>
<td>Summary value obtained from the data points reported by the series during the chart's time window.</td>
<td>Returns 1 for each of the 3 time series that had the highest maximum data values during the chart's time window. Returns 0 for all other series.</td></tr>
<tr>
<td markdown="span">`top(3, max, 2h, ts(my.metric))`</td>
<td>Summary value obtained from the data points reported by the series during the specified time window. </td>
<td>Returns 1 for each of the 3 time series that had the highest maximum data values during the last 2 hours before the end of the chart. Returns 0 for all other series.</td></tr>
</tbody>
</table>



## Examples

**Unfiltered Series**

<!--- requests: ts(~sample.requests.total.num, source=app-11, source=app-12, source=app-13) --->
This chart shows 3 time series that report the total number of requests from 3 sources. We will filter these series in the following examples.

![topk base](images/ts_topk_filter_base.png)

**Example 1: Ranking by Rightmost Data Value**

<!--- top(2, ${requests}) --->
In this point plot chart, we use `top()` to filter the time series into two groups (1 or 0). The top 2 series (from sources `app-13` and `app-11`) display as 1, shown as a green "line" at the top, and the remaining series displays as 0, shown as an orange "line" at the bottom. The ranking is based on the value of the rightmost data point shown for each series in the chart:

![top example](images/ts_top_default_ranking.png)

**Example 2: Ranking by Summarized Data Values**

<!--- top(2, max, ${requests}) --->
Here we use `top()` with the `max` summarization method to filter the time series into two groups (1 or 0). The top 2 series (from sources `app-11` and `app-12`) display as 1, and the remaining series displays as 0. The top two series had the two highest peaks across the entire chart. The results might change if you change the chart's time window.

![top max example](images/ts_top_max_over_chart.png)

**Example 3: Ranking by Data Values Summarized Over a Shorter Time Window**

<!--- top(2, max, 5m, ${requests}) --->
Here we use `top()` with the `max` summarization method over the final 5 minutes of the chart. In contrast to Example 2, the top 2 time series are now from sources `app-13` and `app-11`. The highest peaks within the 5 minute time window differ from the highest peaks across the entire chart.


![top max 5m example](images/ts_top_max_5m.png)

## See Also

[`bottom()` Function](ts_bottom.html)

[`topk()` Function](ts_topk.html)
