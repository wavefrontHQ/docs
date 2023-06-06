---
title: cumulativeHisto Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_cumulativeHisto.html
summary: Reference to the cumulativeHisto() function. Convert Prometheus cumulative histograms to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) histograms.
---
## Summary
```
cumulativeHisto([<timeWindow>,] [<bucketName>,] <tsExpression>
   [,metrics|sources|sourceTags|pointTags|<pointTagKey>] )
```

Converts a cumulative histogram coming from Prometheus, Telegraf, or other source to an ordinary histogram in Operations for Applications histogram format. Users can then manipulate the histogram with [Operations for Applications histogram query functions](query_language_reference.html#histogram-functions).

{% include note.html content ="Always use the `_bucket` metric. The `_count` and `_sum` metrics won't return results. "%}


## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Defaults to 1m.</td></tr>
<tr>
<td>bucketName</td>
<td markdown="span">Optional string that describes the bucket. Default is <strong>le</strong>, that is, less than or equal. If your source histogram uses a different tag key to specify the buckets, specify that tag key here.  </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Cumulative histogram that we'll convert to an ordinary histogram.  </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional <code>group by</code> parameter for organizing the time series into subgroups and then returning each histogram subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

This function is useful if you want to analyze data that are already in a cumulative histogram format.

This function works only with data that include a parameter such as `le` for defining which part of the cumulative histogram you want to display. Data that are imported from Prometheus always include such a parameter.

When a chart displays the result of this function, it shows the median by default. You can use `percentile()` to change that and, for example, show the 90% percentile.

### Ordinary and Cumulative Histograms

Operations for Applications histogram distributions are ordinary histograms. In contrast, some other tools, such as Prometheus and Telegraf, use cumulative histograms.

![histogram types](images/histogram_types.png)

(image credit: Wikipedia)

If your data source emits cumulative histograms, you can use this function to visualize your histogram data in Operations for Applications dashboards and charts.

### How to Map Prometheus Queries to Operations for Applications Queries

When you use Prometheus, you run queries like this:
```
histogram_quantile(0.90, sum(rate(req_latency_bucket[5m])) by (le))
```

This query displays the 90th quantile of a cumulative histogram that corresponds to the `req_latency_bucket` metric. The `le` parameter means less than or equal.

The corresponding Operations for Applications query looks like this:
```
percentile(90, cumulativeHisto(sum(rate(ts(req_latency_bucket)), le)))
```

Here, we are creating a T-digest and adding sampling points based on the range and the count of the bucket.

### Grouping

Similar to aggregation functions for metrics, `cumulativeHisto()` returns a single distribution per specified time window. To get separate distributions for groups that share common characteristics, you can include a `group by` parameter, as for many ts() queries. For example, use `cumulativeHisto(1m, <expression>, sources)` to group by sources.

The function returns a separate series of results for each group.

{% include note.html content="Starting with the 2023-20.x release, grouping is case-sensitive. For example, if you ingest point tags such as `zone` and `ZONE`, when you use an aggregation function and apply grouping, we consider `zone` and `ZONE` as separate tags. " %}


### Interpolation

The `cumulativeHisto()` function itself doesn't perform interpolation because that doesn't make sense for a histogram. But when you apply `percentile()`, we do perform interpolation.

See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).

### Using taggify() with Prometheus Metrics from Telegraf

When you use Telegraf to collect Prometheus histogram metrics, the metrics include the bucket bounds as part of the metric names. For example:

```
source.source_http_requests_latency_including_all_seconds.2.5
source.source_http_requests_latency_including_all_seconds.5.0
source.source_http_requests_latency_including_all_seconds.10.0
```

If you want to use these metrics with WQL and show them in our dashboards and charts:

1. Extract the buckets as tags using `taggify()`
2. Apply `cumulativeHisto()`

For example:
1. You start with data metrics like this:

   **data:** `mavg(5m, rate(ts(“metric1_seconds.*" and not “metric1_seconds.count" and not “metric1_seconds.sum" )))`
2. You use `taggify()` to extract the bucket information.

   **taggify**: `sum(taggify(${data}, metric, le, "^metric1_seconds.(.*)$", "$1"), le)`
3. Now you can apply `cumulativeHisto` and other functions to the result.

   **target_data**: `percentile(95, cumulativeHisto(${tagged}))`


## Example

The following example starts with a cumulative histogram in Prometheus format. We can show only histogram values that are less than or equal to 60 using the `le` tag. You can see the `le` tag in the legend.

![cumulative histogram](images/cum_histo_simple.png)

We can then manipulate the cumulative histogram. First, we use `sum(rate())` to return the per-second rate of each time series.

![show only le 60](images/cum_histo_bucket.png)

<!---Humphrey says this doesn't make sense
Then we use the `cumulativeHisto()` function to return the cumulative histogram for the data.

![cumulative histo](images/cumulative_histo.png)
--->


## See Also

* The [cumulativePercentile function doc page](ts_cumulativePercentile.html) that explains how to calculate the cumulative percentile without the need to convert the cumulative Prometheus histogram to an Operations for Applications ordinary histogram.
* [This blog post](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/integrating-prometheus-with-wavefront-for-easy-scaling-and-failover) discusses the [Prometheus integration](prometheus.html) in some detail.
* The [How to Make Prometheus Monitoring Enterprise Ready](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-to-make-prometheus-monitoring-enterprise-ready) blog post explores how using Prometheus for metrics collection and Operations for Applications for data storage and visualization can give you the best of both worlds.
* Our [histogram doc page](proxies_histograms.html) gives background information about Operations for Applications histograms.


## Caveats

This function is meant for cumulative histograms, like those that come from Prometheus or Telegraf. It's not useful for ordinary histogram distributions.
