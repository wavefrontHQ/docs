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
cumulativePercentile(<percentage>, [<bucketName>,] <tsExpression>
   [,metrics|sources|sourceTags|pointTags|<pointTagKey>])
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
<td>A number between 0 and 100 that specifies the percentile of interest.</td>
</tr>
<tr>
<td>bucketName</td>
<td markdown="span">Optional string that describes the bucket. Default is <strong>le</strong>, that is, less than or equal. If your source histogram uses a different tag key to specify the buckets, specify that tag key here.  </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>A Prometheus cumulative histogram.</td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional group by parameter for organizing the time series into subgroups and then returning each histogram subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

This function calculates the percentile value from Prometheus cumulative histograms without converting them to Wavefront ordinary histograms.

When a chart displays the result of this function, it shows the cumulative percentile that you define in `<percentage>`.


## Example

This example shows how to use the `cumulativePercentile()` function to return the cumulative percentile value for the histogram.

```
cumulativePercentile(95, mavg(1m, rate(ts(demo_api_request_duration_seconds_bucket, path="/api/foo" and status="500" and method="GET" and host="demo.promlabs.com:10000"))))
```


## See Also

* The [Integrating Prometheus with Wavefront for Easy Scaling and Failover](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/integrating-prometheus-with-wavefront-for-easy-scaling-and-failover) blog post discusses the [Prometheus integration](prometheus.html) in some detail.
* The [How to Make Prometheus Monitoring Enterprise Ready](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-to-make-prometheus-monitoring-enterprise-ready) blog post explores how using Prometheus for metrics collection and Wavefront for data storage and visualization can give you the best of both worlds.
* Our [histogram doc page](proxies_histograms.html) gives background information about Wavefront histograms.
* The [cumulativeHisto function doc page](ts_cumulativeHisto.html) that explains how you can convert Prometheus cumulative histograms to Wavefront ordinary histograms.

## Caveats

This function is meant for cumulative histograms, like those that come from Prometheus.
