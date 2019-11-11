---
title: cumulativeHisto Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_cumulativeHisto.html
summary: Reference to the cumulativeHisto() function
---
## Summary
```
cumulativeHisto([<timeWindow>] <tsExpression>, <bucket_desc> <bucket_num>
   [,metrics|sources|sourceTags|pointTags|<pointTagKey>] )
```

Returns a cumulative histogram for a Prometheus or Telegraf time series.

This function works only with data that include a parameter such as `le` for defining which part of the cumulative histogram you want to display. Data that are imported from Prometheus always include such a parameter.

When a chart displays the result of this function, it shows the median by default. You can use `percentile()` to change that and, for example, show the 90% percentile.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Time series for which we want to have a cumulative histogram. </td></tr>
<tr>
<td>bucketName</td>
<td markdown="span">String that describes how to determine the bucket we're interested in. Default is <strong>le</strong>, that is, less than or equal. These names must be in the data. </td></tr>
<tr>
<td>bucket_value</td>
<td>Number for the bucket value. For example, <strong>le 60</strong> results in a histogram in which all values are less than or equal to 60. <strong>ge 200</strong> results in a histogram in which all values are less than or equal to 50. </td></tr>
<tr>
<td>metrics&vert;sources&vert;sourceTags&vert;pointTags&vert;&lt;pointTagKey&gt;</td>
<td>Optional 'group by' parameter for organizing the time series into subgroups and then returning each histogram subgroup.
Use one or more parameters to group by metric names, source names, source tag names, point tag names, values for a particular point tag key, or any combination of these items. Specify point tag keys by name.</td>
</tr>
</tbody>
</table>


## Description

Wavefront histogram distributions are ordinary histograms while some other tools, such as Prometheus and Telegraph, use cumulative histograms.

![histogram types](images/histogram_types.png)

If your data source emits cumulative histograms, you can use this function to visualize your histogram data in Wavefront.

### How to map Prometheus Queries to Wavefront Queries

When you use Prometheus, you run queries like this:
```
histogram_quantile(0.90, sum(rate(req_latency_bucket[5m])) by (le))
```

This query displays the 90th quantile of a cumulative histogram that corresponds to the `req_latency_bucket` metric. The `le` parameter means `less than or equal.

The corresponding Wavefront query looks like this:
```
percentile(90, cumulativeHisto(align(5m, counter_sum(req_latency_bucket, le) * 60)))
```

Here, we are creating a T-digest and adding sampling points based on the range and the cound of the bucket.

### Grouping

Similar to aggregation functions for metrics, `histo()` returns a single distribution per specified time window.  To get separate distributions for groups that share common characteristics,you can include a 'group by' parameter, as for many ts() queries. For example, use  to group by sources.

The function returns a separate series of results for each group.

### Interpolation

??Relevant??
The `histo()` function itself doesn't perform interpolation because that doesn't make sense for a histogram. But when you apply `percentile()`, we do perform interpolation.

See [Standard Versus Raw Aggregation Functions](query_language_aggregate_functions.html).


## Example

The following example starts with a cumulative histogram in Prometheus format. You can see the `le` tag in the legend.

![cumulative histogram](images/cum_histo_simple.png)

We can show only histogram values that are less than or equal to 60 using the `le` tag.

![show only le 60](images/cum_histo_bucket.png)

We can then manipulate the cumulative histogram. First, we use [counter_sum](ts_counter_sum.html) to return the per-second rate of each time series. We also group the results with the `env` and `location` parameter, and we use [`align()`](ts_align.html) to groups the distributions the a histogram series into time buckets of 1 minute.

![counter sum and align](images/cum_histo_counter_sum.png)

Finally, we use the `cumulativeHisto()` function to return a cumulative histogram for the data.

![cumulative histo](images/cumulative_histo.png)


## See Also

* Our [histogram doc page](https://proxies_histograms.html) gives background information.
* The [median() function](ts_median.html) returns time series that consist of the median values of the histogram distributions described by an expression.

## Caveats

This function is meant for cumulative histograms, like those that come from Prometheus or Telegraf. It's not useful for ordinary histogram distributions.
