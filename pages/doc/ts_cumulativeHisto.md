---
title: cumulativeHisto Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_cumulativeHisto.html
summary: Reference to the cumulativeHisto() function. Convert Prometheus cumulative histograms to Wavefront ordinary histograms.
---
## Summary
```
cumulativeHisto([<timeWindow>,] [<bucketName>,] <tsExpression>
   [,metrics|sources|sourceTags|pointTags|<pointTagKey>] )
```

Converts a cumulative histogram coming from Prometheus, Telegraf, or other source to an ordinary histogram in Wavefront histogram format. Users can then manipulate the histogram with [Wavefront histogram query functions](query_language_reference.html#histogram-functions).


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
<td markdown="span">Optional string that describes the bucket. Default is <strong>le</strong>, that is, less than or equal. If your source histogram uses a different bucketing strategy, specify the name here.  </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Cumulative histogram that we'll convert to an ordinary histogram.  </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning each histogram subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

This function is useful if you want to analyze data that are already in a cumulative histogram format.

This function works only with data that include a parameter such as `le` for defining which part of the cumulative histogram you want to display. Data that are imported from Prometheus always include such a parameter.

When a chart displays the result of this function, it shows the median by default. You can use `percentile()` to change that and, for example, show the 90% percentile.

### Ordinary and Cumulative Histograms

Wavefront histogram distributions are ordinary histograms while some other tools, such as Prometheus and Telegraf, use cumulative histograms.

![histogram types](images/histogram_types.png)

(image credit: Wikipedia)

If your data source emits cumulative histograms, you can use this function to visualize your histogram data in Wavefront.

### How to Map Prometheus Queries to Wavefront Queries

When you use Prometheus, you run queries like this:
```
histogram_quantile(0.90, sum(rate(req_latency_bucket[5m])) by (le))
```

This query displays the 90th quantile of a cumulative histogram that corresponds to the `req_latency_bucket` metric. The `le` parameter means `less than or equal.

The corresponding Wavefront query looks like this:
```
percentile(90, cumulativeHisto(align(5m, sum(rate(req_latency_bucket, le)) * 60)))
```

Here, we are creating a T-digest and adding sampling points based on the range and the count of the bucket.

### Grouping

Similar to aggregation functions for metrics, `histo()` returns a single distribution per specified time window.  To get separate distributions for groups that share common characteristics,you can include a 'group by' parameter, as for many ts() queries. For example, use  to group by sources.

The function returns a separate series of results for each group.

### Interpolation

The `cumulativeHisto()` function itself doesn't perform interpolation because that doesn't make sense for a histogram. But when you apply `percentile()`, we do perform interpolation.

See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


## Example

The following example starts with a cumulative histogram in Prometheus format. We can show only histogram values that are less than or equal to 60 using the `le` tag. You can see the `le` tag in the legend.

![cumulative histogram](images/cum_histo_simple.png)

We can then manipulate the cumulative histogram. First, we use `sum(rate())` to return the per-second rate of each time series.

![show only le 60](images/cum_histo_bucket.png)

Next we group the results with the `env` and `location` parameter, and we use the [`align()` function](ts_align.html) to group the distributions of the histogram series into time buckets of 1 minute.

![counter sum and align](images/cum_histo_align.png)

Finally, we use the `cumulativeHisto()` function to return a cumulative histogram for the data.

![cumulative histo](images/cumulative_histo.png)


## See Also

* The [Integrating Prometheus with Wavefront for Easy Scaling and Failover](https://www.wavefront.com/integrating-prometheus-with-wavefront/) blog post discusses the [Prometheus integration](prometheus.html) in some detail.
* The [How to Make Prometheus Monitoring Enterprise Ready](https://www.wavefront.com/how-to-make-prometheus-monitoring-enterprise-ready/) blog post explores how using Prometheus for metrics collection and Wavefront for data storage and visualization can give you the best of both worlds.
* Our [histogram doc page](proxies_histograms.html) gives background information about Wavefront histograms.


## Caveats

This function is meant for cumulative histograms, like those that come from Prometheus or Telegraf. It's not useful for ordinary histogram distributions.
