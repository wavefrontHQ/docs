---
title: bottomk Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_bottomk.html
summary: Reference to the bottomk() function
---
## Summary

```
bottomk(<numberOfTimeSeries>, [mean|median|min|max|sum|count, [<timeWindow>,]] <tsExpression>)
```
Ranks the time series described by the expression, and returns just the specified number of bottom-ranked series. Ranking for a time series is based on its last data value in the current chart, or on a summarization of its last data values over a specified time window.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of bottom-ranked time series to be returned.  </td></tr>
<tr>
<td>mean&vert;median&vert;min&vert;max&vert;sum&vert;count </td>
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

The `bottomk()` function ranks the time series described by the expression, and then filters these series by returning just the specified number of series at the bottom of the ranking.

### About Ranking

Depending on the parameters you specify, the time series are ranked from top to bottom based one or more data values in each series:

* By default, the ranking is based on the value of the latest (rightmost) single data point displayed for each series on the current chart. When a chart shows live data, each series is therefore ranked according to its most recently reported value. The series with the lowest rightmost value has the bottom ranking.

* If you specify a summarization method (`mean`, `median`, `sum`, etc.), the ranking is based on a _summary value_ obtained from each series by combining one or more of its rightmost data values. For example, `mean` produces a summary value for a series by averaging data values, and the series with the lowest average has the bottom ranking.

  * By default, the summary value for a series combines all of the values shown for the series in the current chart.
  * If you specify a time window parameter, the summary value combines just the data values reported during that time window. The time window always includes the last (rightmost) data value in the chart. For example, in a live data chart, a time window of `2h` says to summarize the data values reported in the past 2 hours.

### Parameter Usage Overview

The following table shows how the parameters of `bottomk()` affect the results.

<table>
<tbody>
<thead><tr><th width="35%">Sample Parameters</th> <th width="35%">Basis for Ranking Each Time Series</th> <th width="30%">Sample Results</th></tr>
</thead>
<tr>
<td markdown="span">`bottomk(3, ts(my.metric))`</td>
<td>Value of the rightmost data point displayed for the series on the chart. </td>
<td>Returns the 3 time series with the lowest data values displayed at the right edge of the chart.</td></tr>
<tr>
<td markdown="span">`bottomk(3, min, ts(my.metric))`</td>
<td>Summary value obtained from the data points reported by the series during the chart's time window.</td>
<td>Returns the 3 time series that had the lowest minimum data values during the chart's time window.</td></tr>

<tr>
<td markdown="span">`bottomk(3, min, 2h, ts(my.metric))`</td>
<td>Summary value obtained from the data points reported by the series during the specified time window. </td>
<td>Returns the 3 time series that had the lowest minimum data values during the last 2 hours before the end of the chart.</td></tr>
</tbody>
</table>



## Examples

**Unfiltered Series**

<!--- requests: ts(~sample.requests.total.num, source=app-11, source=app-12, source=app-13) --->
This chart shows 3 time series that report the total number of requests from 3 sources. We will filter these series in the following examples.

![topk base](images/ts_topk_filter_base.png)

**Example 1: Ranking by Rightmost Data Value**

<!--- bottomk(2, ${requests}) --->
Here we use `bottomk()` to show only the bottom 2 time series (from sources `app-11` and `app-12`). The ranking is based on the value of the rightmost data point shown for each series in the chart, which was reported at 12:35)pm:

![bottomk example](images/ts_bottomk_default_ranking.png)

**Example 2: Ranking by Summarized Data Values**

<!--- bottomk(2, min, ${requests}) --->
Here we use `bottomk()` with the summarization method `min` to show the time series (from sources `app-12` and `app-11`) that had the two lowest values across the entire chart. The results might change if you change the chart's time window.

![bottomk min example](images/ts_bottomk_min_over_chart.png)

**Example 3: Ranking by Data Values Summarized Over a Shorter Time Window**

<!--- bottomk(2, min, 5m, ${requests}) --->
Here we use `bottomk()` with the `min` summarization method over the final 5 minutes of the chart. In contrast to Example 2, the bottom 2 time series are now from sources `app-13` and `app-12`. The minimums within the 5 minute time window differ from the minimums across the entire chart.


![bottomk min 5m example](images/ts_bottomk_min_5m.png)

## See Also

[`topk()` Function](ts_topk.html)

[`bottom()` Function](ts_bottom.html)
