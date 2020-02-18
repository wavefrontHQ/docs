---
title: Wavefront Histograms
keywords:
tags: [proxies, query language]
sidebar: doc_sidebar
published: true
permalink: proxies_histograms.html
summary: Learn how to use Wavefront histograms.
---
Wavefront histograms let you compute, store, and use distributions of metrics rather than single metrics. Histograms are useful for high-velocity metrics about your applications and infrastructure – particularly those gathered across many distributed sources. You can send histograms to a Wavefront proxy or use direct ingestion.

## Getting Started

Watch this video for an introduction to histograms:
<p><a href="https://www.youtube.com/watch?v=syIKQ2oZk9s&index=4&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_histograms.png" style="width: 700px;" alt="histograms"/></a>
</p>

The following blog posts give some background information:
* [What if I Told You Your Monitoring Data is Lying: Why Histograms are Critical for Accurate Reporting of Hi-Velocity Metrics](https://www.wavefront.com/why-histograms-critical-for-reporting-hi-velocity-metrics/)
* [How the Metric Histogram Type Works: True Visibility into High-Velocity Application Metrics](https://www.wavefront.com/metric-histogram-type-works-true-visibility-high-velocity-application-metrics-part-2-2-2-2/)


## Why Use Histograms?

Wavefront can receive and store highly granular metrics at 1 point per second per unique source. However, some scenarios generate even higher frequency data. Suppose you are measuring the latency of web requests. If you have a lot of traffic at multiple servers, you may have multiple distinct measurements for a given metric,
timestamp, and source. Using "normal" metrics, we can't measure this because, rather than metric-timestamp-source mapping to a single value, the composite key maps to a [multiset](https://en.wikipedia.org/wiki/Multiset) (multiple and possibly duplicate values).

One approach to dealing with high frequency data is to calculate an aggregate statistic, such as a percentile, at each source and send only that data. The problem with this approach is that performing an aggregate of a percentile (such as
a 95th percentile from a variety of sources) does not yield an accurate and valid percentile with high velocity metrics. That might mean that even though you have an outlier in some of the source data, it becomes obscured by all the other data.

To address high frequency data, Wavefront supports histograms -- a mechanism to compute, store, and use distributions of metrics. A Wavefront histogram is a distribution of metrics collected and computed by the Wavefront proxy (4.12 and later), or sent to the Wavefront service via direct ingestion. To indicate that metrics should be treated as histogram data, the user can:
* Send the metrics to a [histogram proxy port](#histogram-proxy-ports) -- either 2878 (Wavefront proxy 4.29 or later) or 40000 (earlier proxy versions).
* Specify `f=histogram` as part of the [direct ingestion command](direct_ingestion.html#histogram-distribution).

The Wavefront service [rewrites the names of histogram metrics](#histogram-metric-naming), which you can query with a set of [functions](query_language_reference.html#histogram-functions).

## Wavefront Histogram Distributions

Wavefront creates distributions by aggregating metrics into bins. The following figure illustrates a distribution of 205 points that range in value from 0 to 120 at t = 1 minute, into bins of size 10.

![histogram](images/histogram.png)

The following table lists the distribution of one metric at successive minutes. The first row of the table contains the distribution illustrated in the figure. The following rows show how the distribution evolves over successive minutes.

<table width="100%">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<thead>
<tr><th>Time (minute)</th><th>Distribution (number of points)</th></tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>[2, 1, 9, 20, 31, 40, 40, 29, 19, 10, 2, 2]</td>
</tr>
<tr>
<td>2</td>
<td>[2, 1, 9, 22, 31, 38, 41, 28, 17, 11, 3, 2]</td>
</tr>
<tr>
<td>3</td>
<td>[1, 2, 10, 21, 31, 39, 40, 29, 19, 10, 1, 2]</td>
</tr>
<tr>
<td>4</td>
<td>[2, 1, 9, 19, 29, 40, 41, 31,  20, 10, 1, 2]</td>
</tr>
</tbody>
</table>


The Wavefront histogram bin size is computed using a [T-digest algorithm](https://github.com/tdunning/t-digest/blob/master/docs/t-digest-paper/histo.pdf), which retains better accuracy at the distribution edges where outliers typically arise. In the algorithm, bin size is not uniform (unlike the histogram illustrated above). However, the bin size that the algorithm selects is irrelevant.

Wavefront histograms do not store each actual data point value that is fed to it. Instead, histograms store the quantiles calculated from histogram points, which are estimates within a certain margin of error.


## Histogram Metric Aggregation Intervals

Wavefront supports aggregating metrics by the minute, hour, or day. Intervals start and end on the minute, hour, or day, depending on the granularity that you choose. For example, day-long intervals start at the beginning of each day, UTC time zone.

The aggregation intervals do not overlap.  If you are aggregating by the minute, a value reported at 13:58:37 is assigned to the interval `[13:58:00;13:59:00]`. If no metrics are sent during an interval, no histogram points are recorded.

## Sending Histogram Distributions

A histogram distribution allows you to combine multiple points into a complex value that has a single timestamp.

To send a histogram distribution to the Wavefront proxy:

- Send to the **distribution** port listed in the table in [Histogram Proxy Ports](#histogram-proxy-ports).

- Use the following format:

  ```
  {!M | !H | !D} [<timestamp>] #<points> <metricValue> [... #<points> <metricValue>]
   <metricName> source=<source>
   [<pointTagKey1>=<value1> ... <pointTagKeyN>=<valueN>]
  ```

  where
  * `{!M | !H | !D}` identifies the aggregation interval (minute, hour, or day) used when computing the distribution
  * `points` is the number of points.
  * all elements not enclosed in square brackets, including the source, are required elements.

  For example:

  ```
  !M 1493773500 #20 30 #10 5 request.latency source=appServer1 region=us-west
  ```

  is a distribution that sends 20 points of the metric `request.latency` with value 30, and 10 points with value 5, that have been aggregated into minute intervals.

  {% include note.html content="Unlike the Wavefront data format, which is `<metricName> <metricValue> <timestamp>`, histogram data format inverts the ordering of components in a data point: `<timestamp> #<points> <metricValue> <metricName>`." %}

You can also send a histogram distribution using [direct ingestion](direct_ingestion.html#histogram-distribution). In that case, you must include `f=histogram` or your data are treated as metrics even if you use histogram data format.

## Histogram Example

Suppose you want to send the following points to the Wavefront proxy:

10, 20, 20, 30, 40, 100, 100

If you want an hourly aggregation, you can send those points as a distribution to the histogram distribution listener port:
* By default, port 2878 for proxy 4.29 and later.
* By default, 40000 for earlier proxy versions.

`!H <timestamp> #1 10 #2 20 #1 30 #2 100 my.metric source=s1`

Here, you specify:
* the interval, in this case hours (!H)
* timestamp (optional)
* a set of sequences. Each sequence starts with #, followed by the number of points and the value of the points. In this example, we have 2 for 20 because we’re sending 2 points with the value 20.
* metric name
* source
* optional point tag keys and values

You can also send the histogram data to one of the histogram proxy ports in [Wavefront data format](wavefront_data_format.html). For this example, we use the hour port (40002). You have to send each point separately and include a timestamp, and all points have to arrive within the hour. For example, if you sent a point in the range 3:00-3:59 with !H, it shows at 3:00 with an `hs()` query.

```
my.metric 10 <t1> <source>
my.metric 20 <t2> <source>
my.metric 20 <t3> <source>
my.metric 30 <t4> <source>
my.metric 40 <t5> <source>
my.metric 100 <t6> <source>
my.metric 100 <t7> <source>
```

The proxy aggregates the points and sends only the histogram distribution to Wavefront. The Wavefront service knows only what each bin is and how many points are in each bin. Wavefront does not store the value of each single histogram point, it computes and stores the distribution.

You can now apply other functions to the histogram, for example, you can try to find out what the 85th percentile of the histogram is. For this example, you could now write a query like this:

`percentile (85, hs(my.metric))`


## Querying Histogram Metrics

To display histogram information start with a query or with the Histogram browser:
* Run an `hs()` query, optionally with [histogram functions](query_language_reference.html#histogram-functions)
* Select **Browse > Histograms** from the task bar and drill down to a histogram metric.

You use the [`hs()` function](hs_function.html) with the name of a histogram metric to access the histogram distributions for that metric. A histogram metric name has an extension `.m`, `.h`, or `.d`:
* If you sent distributions in histogram data format, the histogram metric extension corresponds to the interval you specified (`!M`, `!H`, or `!D`).
* If you sent metrics using Wavefront data format, the histogram metric extension corresponds to the histogram port that you used.

## Visualizing Histogram Metrics in a Histogram Chart

Histogram charts are charts designed especially for histogram visualization.

![histogram overview](images/histograms_overview.png)

You can:
* Add histogram queries in Query Builder (Chart Builder is not currently supported for histogram queries).
* Set the Y axis dimensions and X axis minimum, maximum, and units.
* Select percentile markers to display.
* Customize the color gradient.
* Examine each histogram bar with hover text.
* Drill down to a corresponding chart from the menu in the top right.

See the [chart reference for histograms](ui_chart_reference.html#histogram-chart) for details.

## Visualizing Histogram Metics in Other Charts

It's also possible to visualize histogram distributions in a time-series chart such as a line chart. We implicitly wrap a `median()` function around the `hs()` function and display the median value of each distribution as a time series:

![default histogram](images/hs_function_as_median.png)

You can explicitly wrap another [histogram function](query_language_reference.html#histogram-functions) around the result of `hs()` to see other information. For example, the 2 histogram queries in the following chart display the maximum and minimum values from each histogram distribution:

![default histogram](images/hs_max_min.png)


### Histogram Summary Information

Sometimes it is useful to see more information about a histogram than just the median or any single percentile. You can use [`summary()`](hs_summary.html) or [`alignedSummary()`](hs_alignedSummary.html) to display all of the following percentiles from the histogram data: max, 99.9, 99, 95, 90, 75, avg, median (50), 25, and min.
<!--- When/if these values can be specified to the function, change to "max, P999, P99, P95, P90, P75, avg, median (P50), P25, and min" --->

The following diagram shows the information you get for the metric shown above if you wrap it with `summary()`. The legend lists the series that are extracted from the histogram data by default.

![histogram summary](images/hs_summary_topic.png)

You can extract just the percentiles that you are interested in, by calling the function with an optional list of percentages as the first argument. For example, the following function returns the 10th and 25th percentile from each histogram distribution in the series:

`summary(10, 25, hs("alerting.check.latency.m", customer=perftest))`

### Viewing Histograms in the Histogram Browser

You can view histograms in the Histogram browser.

To view histograms:
1. Click **Browse > Histograms** and start typing the histogram metric name.
  Each histogram metric has an extension .d, .h, or .m. If you sent a metric in histogram data format, the extension corresponds to the interval you specified (`!M`, `!H`, or `!D`). If you sent a metric using Wavefront data format, the extension depends on the histogram port that you used.
2. Select the metric you're interested in.

   ![select_histogram_chart](images/histogram_select_chart.png)
3. Examine the chart.
   * The query is an `hs()` query, not a `ts()` query.
   * We display the median for histogram metrics by default. You can use  `percentile(<value>, hs(<expression>))` to retrieve other percentiles.

   ![histogram_chart](images/histogram_chart.png)

## Monitoring Histogram Points

You can use `~collector` metrics to monitor histogram ingestion. See [Understanding ~collector Metrics for Histograms](wavefront_monitoring.html#understanding-collector-metrics-for-histograms).
