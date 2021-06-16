---
title: cumulativePercentile Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_cumulativePercentile.html
summary: Reference to the cumulativePercentile() function. 
---
## Summary
```
cumulativePercentile(<percentage>, <tsExpression>)
```

Calculates the cumulative percentile value for a histogram coming from Prometheus cumulative histograms.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td>percentage</td>
<td>A number greater than 0 and less than or equal to 100 that specifies the percentile of interest.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>A Prometheus cumulative histogram.</td></tr>
</tbody>
</table>


## Description

This function calculates the percentile value from Prometheus cumulative histograms without converting them to Wavefront ordinary histograms.

When a chart displays the result of this function, it shows the cumulative percentile that you define in `<percentage>`.


## Example

This example shows how to use the `cumulativePercentile()` function to return the cumulative percentile value for the histogram.

Margarita: [Need a nice example of a cumulative percentile histogram]



## See Also

* The [Integrating Prometheus with Wavefront for Easy Scaling and Failover](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/integrating-prometheus-with-wavefront-for-easy-scaling-and-failover) blog post discusses the [Prometheus integration](prometheus.html) in some detail.
* The [How to Make Prometheus Monitoring Enterprise Ready](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-to-make-prometheus-monitoring-enterprise-ready) blog post explores how using Prometheus for metrics collection and Wavefront for data storage and visualization can give you the best of both worlds.
* Our [histogram doc page](proxies_histograms.html) gives background information about Wavefront histograms.
* The [cumulativeHisto function doc page](ts_cumulativeHisto.html) that explains how you can convert Prometheus cumulative histograms to Wavefront ordinary histograms.

## Caveats

This function is meant for cumulative histograms, like those that come from Prometheus.
