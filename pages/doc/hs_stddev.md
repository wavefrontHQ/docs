---
title: Standard Deviation Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: hs_stddev.html
summary: Reference to the stddev() function
---
## Summary
```
stddev(<hsExpression>)
```

Shows how the data in a histogram expression is distributed around the mean.

## Parameters


<table style="width: 100%;">
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">[hsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing the histogram series.</td></tr>
</tbody>
</table>


## Description

The `stddev()` function shows you how the data in a histogram expression varies against the mean or average and returns those values as a time series. A separate time series is returned for each histogram series. You can use this function to understand the volatility of your data or to find anomalies in your histogram expression.

## Example

This chart represents all the histogram series described by `hs(tracing.derived.*.duration.micros.m))`. Each histogram series consists of distributions from a particular source, and a given source might emit more than one histogram series. The chart represents each histogram series as a separate line that shows the median values of the distributions.

![hs_stddedv_before](images/hs_stddedv_before.png)

Use the following query to find the standard deviation:

```
stddev(hs(tracing.derived.*.duration.micros.m)))
```

Now, you see how the data in your expression varies against the mean. You see an anomaly (a spike) between 1.35 PM and 1.45 AM.

![hs_stddev](images/hs_stddev.png)


## See Also

* [Wavefront Histograms](proxies_histograms.html)
