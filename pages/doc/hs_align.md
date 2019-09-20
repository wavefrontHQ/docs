---
title: align Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: hs_align.html
summary: Reference to the align() function
---
## Summary
```
align(<timeWindow>, <hsExpression>)
```

Groups the distributions of a histogram series into time buckets of size **timeWindow**, and returns a single merged histogram distribution per bucket. In a time-series chart, `align()` displays just the median values of the resulting distributions.


## Parameters


<table style="width: 100%;">
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> [timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Size (duration) of the buckets into which histogram distributions are grouped. 
You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified. </td>
</tr>
<tr>
<td markdown="span">[hsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing the histogram series to organize into buckets.</td></tr>
</tbody>
</table>


## Description

The `align()` histogram function adjusts the granularity of each histogram series described by the expression. Within each series, `align()` groups the histogram distributions into buckets of the specified duration, and then merges the distributions in each group to produce a single composite distribution for each bucket. For example, `align(1h, hs(my.hsMetric.m))` merges groups of per-minute distributions to produce hourly distributions.

This function merges the centroids and counts to produce composite histogram distributions.

You typically use `align()` as part of an input [`hsExpression`](query_language_reference.html#query-expressions) that you specify to another histogram query function, for example, `max(align(10m, hs(users.settings.numberOfApiTokens.m)))` 

You can visualize `align()` by running it as a top-level query under a time-series chart. Doing so displays a time series that consists of just the median values from the distributions in each returned histogram series. The chart for `align(hs(my.hsMetric.m))` is the same as the chart for `median(align(hs(my.hsMetric.m)))`.


## Examples

This chart represents the histogram series that is described by the expression `hs(alerting.check.latency.m, customer="perftest")`. The chart shows the histogram series as a line that consists of the median values of the distributions. The line contains one median value per minute.

![hs_align_before](images/hs_align_base.png)

Now we align the per-minute distributions into 10-minute buckets:
 
```align(10m, hs(alerting.check.latency.m))```

Aligning merges the histogram distributions "horizontally" to produce a less granular series of composite distributions. The chart displays the results as a single line that consists of the median values of the composite distributions.  The line contains one median value every 10 minutes.

![hs_align](images/hs_align.png)

## See Also

* [Wavefront Histograms](proxies_histograms.html)
