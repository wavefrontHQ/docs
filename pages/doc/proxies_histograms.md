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
* Send the metrics to a [histogram proxy port](#histogram-proxy-ports) instead of the normal metrics port (2878).
  Starting with Wavefront proxy 4.29, send histograms in distribution format to port 2878.
* Specify `f=histogram` as part of the [direct ingestion command](direct_ingestion.html#histogram-distribution).

The Wavefront service [rewrites the names of histogram metrics](#histogram-metric-naming), which you can query with a set of [functions](#histogram-functions).

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

A distribution allows you to send multiple points with a single value.

To send histogram data as a distribution to the Wavefront proxy:

- Send to the **distribution** port listed in the table in [Histogram Proxy Ports](#histogram-proxy-ports).

- Use the following format:

  ```
  {!M | !H | !D} [<timestamp>] #<points> <metricValue> [... #<points> <metricValue>]
   <metricName> source=<source>
   [<pointTagKey1>=<value1> ... <pointTagKeyn>=<valuen>]
  ```

  where
  * `{!M | !H | !D}` identifies the aggregation interval (minute, hour, or day) used when computing the distribution
  * `points` is the number of points.
  * all elements not enclosed in square brackets, including the source, are required elements. 

  For example:

  ```
  !M 1493773500 #20 30 #10 5 request.latency source=appServer1 region=us-west
  ```

  is a distribution that sends 20 points of the metric `request.latency` with value 30 and 10 points with value 5, that have been aggregated into minute intervals.

  {% include note.html content="Unlike the Wavefront data format, which is `<metricName> <metricValue> <timestamp>`, histogram data format inverts the ordering of components in a data point: `<timestamp> #<points> <metricValue> <metricName>`." %}

You can also send a histogram distribution using [direct ingestion](direct_ingestion.html#histogram-distribution). In that case, you must include `f=histogram` or your data are treated as metrics even if you use histogram format.

## Histogram Example

Suppose you want to send the following points to the Wavefront proxy:

10, 20, 20, 30, 40, 100, 100

If you want an hourly aggregation, you can send those points as a distribution to the histogram distribution listener port:
* By default port 2878 for proxy 4.29 and later.
* By default 40000 for earlier proxy versions.

`!H <timestamp> #1 10 #2 20 #1 30 #2 100 my.metric source=s1`

Here, you specify:
* the interval, in this case hours (!H)
* timestamp (optional)
* a set of sequences. Each sequence starts with #, followed by the number of points and the value of the points. In this example, we have 2 for 20 and 100 because we’re sending that point twice.
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

## Histogram Configuration

Histograms are supported by Wavefront proxy 4.12 and later. To use histograms, ensure that your data is in histogram format, and set the [histogram proxy port](#histogram-proxy-ports) to send to. Different ports accept different data formats, as shown in the table below. For information on how to configure proxies, see [Advanced Proxy Configuration](proxies_configuring.html).


### Histogram Proxy Ports

To indicate that you are sending histogram data, send the metrics to one of the histogram proxy ports. You can use:
* Port 2878 for proxy 4.29 and later for histogram distributions.
* Port 40000 for earlier proxy versions for histogram distributions.
* The other ports for other formats.

<table>
<colgroup>
<col width="25%" />
<col width="30%" />
<col width="25%" />
<col width="20%" />
</colgroup>
<thead>
<tr><th>Aggregation Interval or Distribution</th><th>Proxy Property</th><th>Default Value</th><th>Data Ingestion Format</th></tr>
</thead>
<tbody>
<tr>
<td>distribution</td>
<td>histogramDistListenerPorts</td>
<td>2878 (proxy 4.29 and later)<br>
40000 (earlier proxy versions)</td>
<td><a href="#sending-histogram-distributions">Distribution data format</a></td>
</tr>
<tr>
<td>minute</td>
<td>histogramMinuteListenerPorts</td>
<td>40001</td>
<td><a href="/wavefront_data_format.html">Wavefront data format</a></td>
</tr>
<tr>
<td>hour</td>
<td>histogramHourListenerPorts</td>
<td>40002</td>
<td><a href="/wavefront_data_format.html">Wavefront data format</a></td>
</tr>
<tr>
<td>day</td>
<td>histogramDayListenerPorts</td>
<td>40003</td>
<td><a href="/wavefront_data_format.html">Wavefront data format</a></td>
</tr>
</tbody>
</table>

You can send [**Wavefront data format**](wavefront_data_format.html) histogram data only to a minute, hour, or day port.

You can send [**distribution data format**](#sending-histogram-distributions) histogram data only to the distribution port. If you send Wavefront distribution data format to `min`, `hour`, or `day` ports, the points are rejected as invalid input format and logged.

### Histogram Configuration Properties

Wavefront supports additional histogram configuration properties, shown in the following table. Note the requirements on the state directory and the effect of the two `persist` properties listed at the bottom of the table.

<table class="width:100%;">
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="34%" /></colgroup>
<thead>
<tr><th>Property</th><th>Description</th><th>Format</th></tr>
</thead>
<tbody>
<tr>
<td>histogramStateDirectory</td>
<td>Directory for persistent proxy state, must be writable.  Before being flushed to Wavefront, histogram data is persisted on the filesystem where the Wavefront proxy resides. If the files are corrupted or the files in the directory can't be accessed, the proxy reports the problem in its log and fails back to using in-memory structures. In this mode, samples can be lost if the proxy terminates without draining its queues. Default: <code>/var/spool/wavefront-proxy</code>.
</td>
<td>A valid path on the local file system. {% include note.html content="A high PPS requires that the machine that the proxy is on has an appropriate amount of IOPS. We recommend about 1K IOPS with at least 8GB RAM on the machine that the proxy writes histogram data to. Recommended machine type: m4.xlarge." %}</td>
</tr>
<tr>
<td>persistAccumulator</td>
<td>Whether to persist accumulation state. We suggest keeping this setting enabled unless you are not using hour and day level aggregation and consider losing up to 1 minute worth of data during proxy restarts acceptable. Default: true.
</td>
<td>. {% include warning.html content="If set to false, unprocessed metrics are lost on proxy shutdown." %}
</td>
</tr>
<tr>
<td>persistMessages</td>
<td>Whether to persist received metrics to disk. Default: true.
</td>
<td>Boolean. {% include warning.html content="If set to false, unprocessed metrics are lost on proxy shutdown." %}
</td>
</tr>
<tr>
<td>histogramAccumulatorResolveInterval</td>
<td>Interval in milliseconds to write back accumulation changes from memory cache to disk. Only applicable when memory cache is enabled. Increasing this setting reduces storage IO pressure but might increase heap memory use. Default: 100.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramAccumulatorFlushInterval</td>
<td>Interval in milliseconds to check for histograms that need to be sent to Wavefront acccording to their histogramMinuteFlushSecs etc settings. Default: 1000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramAccumulatorFlushMaxBatchSize</td>
<td>Max number of histograms to move to the outbound queue in one flush. Default: no limit.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td> histogramMaxReceivedLength</td>
<td>Maximum line length for received histogram points. Default: 65536.</td>
<td>Positive integer.</td>
</tr>

<tr>
<td>histogramReceiveBufferFlushInterval</td>
<td>Sets maximum time in milliseconds that incoming points can stay in the receive buffer when incoming traffic volume is very low. Default: 100.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramProcessingQueueScanInterval</td>
<td>Interval in milliseconds between checks for new entries in the processing queue. Default: 20.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by minute. Default: 40001.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramMinuteAccumulators</td>
<td>Number of accumulators per minute port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteFlushSecs</td>
<td>Time-to-live, in seconds, for a minute granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 70.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval. [20;1000].</td>
</tr>
<tr>
<td>histogramMinuteMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (more than 1 point per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramMinuteAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramMinuteCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by hour. Default: 40002.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramHourAccumulators</td>
<td>Number of accumulators per hour port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourFlushSecs</td>
<td>Time-to-live, in seconds, for an hour granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 4200.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramHourMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (more than 1 point per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramHourAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramMinuteCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by day. Default: 40003.</td>
<td>Comma-separated list of ports.</td>
</tr>
<tr>
<td>histogramDayAccumulators</td>
<td>Number of accumulators per day port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayFlushSecs</td>
<td>Time-to-live, in seconds, for a day granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 18000 (5 hours).
</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramDayMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (more than 1 point per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramDayAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramDayCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>

<tr>
<td>histogramDistListenerPorts</td>
<td>TCP ports to listen on for ingesting histogram distributions. Default: 2878 (proxy 4.29 and later) 40000 (earlier proxy versions).</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramDistAccumulators</td>
<td>Number of accumulators per distribution port. In high traffic environments we recommend that the total number of accumulators per proxy across all utilized ports does not exceed the number of available CPU cores. Default: number of available CPU cores. </td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistFlushSecs</td>
<td>Number of seconds to keep a new distribution bin open for new samples, before the intermediary is sent to Wavefront. Default: 70.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramDistMemoryCache</td>
<td>Enabling memory cache reduces I/O load with fewer time series and higher frequency data (Aggregating more than 1 distribution per second per time series). Default: false.</td>
<td>Boolean.</td>
</tr>
<tr>
<td>histogramDistAvgDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 32 + histogramDistCompression * 7</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistAvgKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 150.</td>
<td>Positive integer.</td>
</tr>
</tbody>
</table>


## Histogram Metric Naming

You send metrics using the standard [Wavefront data format](wavefront_data_format.html):

```html
<metricName> <metricValue> [<timestamp>] source=<source> <pointTagKey1>=<value1> ... <pointTagKeyn>=<valuen>
```

For example, `request.latency 20 1484877771 source=<source>`.

Wavefront adds the suffixes `.m`, `.h`, or `.d` to the metric name according to the aggregation interval. For example, if the metric `request.latency` is aggregated over an hour, the metric will be named: `request.latency.h`.

## Querying and Viewing Histogram Metrics

You can display time series metrics in Wavefront charts using `ts()` queries. To display histograms, you use `hs()` queries in conjunction with histogram functions, or the histogram browser.

### Histogram Query Basics

You can query histogram metrics with `hs()` queries. Each histogram metric has an extension `.m`, `.h`, or `.d`.
* If you sent the data using Wavefront histogram format, the histogram metric extension depends on the aggregation interval you specified (`!M`, `!H`, or `!D`).
* If you sent the data using Wavefront data format, the histogram metric extension depends on the histogram port that you used.

<!--- When you add a histogram query to a chart, we --->
To visualize the histogram, use one of the [histogram functions](query_language_reference.html#histogram-functions).

By default, we wrap a `median()` function around the result and display the median:

![default histogram](images/hs_median.png)

You can explicitly wrap another [histogram functions](query_language_reference.html#histogram-functions) around the result to see other information.

### Using summary() and alignedSummary() for Histogram Visualization

Users often need more information about a histogram than the median or any of the supported functions make available. To make histogram displays more meaningful, release 2019.18 introduced two new functions, `summary()` and `alignedSummary`.

By default, each function wraps the histogram data with max, P999, P99, P90, P75, avg, median (P50), P25, and min.

The following diagram shows the information you get for the metric shown above if you use `summary()`. The diagram includes the legend to illustrate the information you can now get from your histogram data.

![histogram summary](images/hs_summary.png)

The `alignedSummary()` function returnes an aligned summary of the histogram with the same defaults.

![histogram aligned summary](images/hs_alignedsummary.png)

For both functions, you can instead specify the percentiles that you are interested in, by calling the function with an optional list of percentiles as the first argument. For example, the following function returns the 25th and 10th percentile of the orderShirts histogram:

`summary((77.77, 65), hs(orderShirts.m))`

### Viewing Histograms in the Histogram Browser

You can view histograms in the Histogram browser.

To view histograms:
1. Click **Browse > Histograms** and start typing the histogram metric name.
  Each histogram metric has an extension .d, .h, or .m. If you sent a metric in histogram format, three metrics result. If you sent a metric using Wavefront data format, the extension depends on the histogram port that you used.
2. Select the metric you're interested in.

   ![select_histogram_chart](images/histogram_select_chart.png)
3. Examine the chart.
   * The query is an `hs()` query, not a `ts()` query.
   * We display the median for histogram metrics by default. You can use  `percentile(<value>, <histograms>))` to retrieve other percentiles.

   ![histogram_chart](images/histogram_chart.png)

## Monitoring Histogram Points

You can use `~collector` metrics to monitor histogram ingestion. See [Understanding ~collector Metrics for Histograms](wavefront_monitoring.html#understanding-collector-metrics-for-histograms).
