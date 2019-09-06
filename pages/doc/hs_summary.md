---
title: summary Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: hs_summary.html
summary: Reference to the summary() function
---
## Summary
```
summary(<percentageList>, <hsExpression>)
```

Returns time series that summarize the significant values from the histogram distributions described by the expression. The summary includes a time series for each `percentage` percentile. 

## Parameters


<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> percentageList</td>
<td>Comma-separated list of percentages that specify the percentiles you want in your summary. 
A percentile is the value below which a given percentage of values fall in a histogram distribution. Specify:
<ul>
<li>A number from 0 to 100, inclusive. May include a decimal point.</li>
<li markdown="span">`max` (equivalent to 100)</li>
<li markdown="span">`median` (equivalent to 50)</li>
<li markdown="span">`min` (equivalent to 0)</li>
<li markdown="span">`avg` (average of the distribution's values) </li>
</ul>
You can omit the <strong>percentageList</strong> to return the default summary, which includes max, 99.9, 99, 95, 90, 75, avg, median (50), 25, and min.
</td>
</tr>
<tr>
<td markdown="span">[hsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing the histogram series to summarize.</td></tr>
</tbody>
</table>


## Description

The `summary()` histogram function summarizes significant values from the distributions in each histogram series described by the expression. 

The summary for a histogram series consists of one or more time series that contain percentiles from each distribution in the series.
A percentile is a value below which a particular percentage of values fall. For example, `summary(75, 99.99, hs(my.hsMetric.m))` returns values at the 75th and 99.99th percentiles from each distribution in the histogram series. The values are returned as two separate time series.

By default, `summary()` returns a time series for each the following: max, 99.9, 99, 95, 90, 75, avg, median (50), 25, and min. 


## Examples

This chart summarizes the default set of significant values from the histogram series that is described by the expression `hs(alerting.check.latency.m, customer="perftest")`. 

![hs_summary_default](images/hs_summary_default.png)

This chart summarizes just the 35th percentile and the 87.7th percentile from the histogram series. 

![hs_summary_nondefault](images/hs_summary_nondefault.png)


## See Also

* [Wavefront Histograms](proxies_histograms.html)
