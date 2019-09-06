---
title: median Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: hs_median.html
summary: Reference to the median() function
---
## Summary
```
median(<hsExpression>)
```

Returns time series that consist of the median values from the histogram distributions described by the expression.  

## Parameters


<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[hsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing the histogram series to extract median values from.</td></tr>
</tbody>
</table>


## Description

The `median()` histogram function extracts the median value from each histogram distribution described by the expression, and returns those values as time series. A separate time series is returned for each histogram series. 


## Examples

This chart shows the median values of each distribution in the histogram series that is described by the expression `hs(alerting.check.latency.m, customer="perftest")`. Because the specified histogram metric has one distribution per minute, this query returns a time series with one median value per minute. 

![hs_median](images/hs_median.png)


## See Also

* [Wavefront Histograms](proxies_histograms.html)
