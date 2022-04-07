---
title: Sending Histogram Distributions to the Wavefront Service
keywords:
tags: [proxies, query language]
sidebar: doc_sidebar
published: true
permalink: proxies_histograms.html
summary: Learn how to use histograms.
---
Tanzu Observability by Wavefront supports histograms for computing, storing, and using **distributions of metrics** rather than single metrics. Histograms are useful for high-velocity metrics about your applications and infrastructure – particularly those gathered across many distributed sources. You can send histograms to a Wavefront proxy or use direct ingestion.

This page explain how to send histogram distributions. After the data are available, you can [visualize histogram distributions](visualize_histograms.html) using Histogram charts or Heatmap charts.

## Getting Started

Watch this video for an introduction to histograms:
<p><a href="https://www.youtube.com/watch?v=syIKQ2oZk9s&index=4&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_histograms.png" style="width: 700px;" alt="histograms"/></a>
</p>

The following blog posts give some background information:
* [What if I Told You Your Monitoring Data is Lying: Why Histograms are Critical for Accurate Reporting of Hi-Velocity Metrics](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/what-if-i-told-you-your-monitoring-data-is-lying-why-histograms-are-critical-for-accurate-reporting-of-hi-velocity-metrics-part-1-of-2)
* [How the Metric Histogram Type Works: True Visibility into High-Velocity Application Metrics](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-the-metric-histogram-type-works-true-visibility-into-high-velocity-application-metrics-part-2-of-2)


## Why Use Histograms?

The Wavefront service can receive and store highly granular metrics at 1 point per second per unique source. However, some scenarios generate even higher frequency data.

Suppose you are measuring the latency of web requests. If you have a lot of traffic at multiple servers, you may have multiple distinct measurements for a given metric,
timestamp, and source. Using "normal" metrics, we can't measure this because, rather than metric-timestamp-source mapping to a single value, the composite key maps to a [multiset](https://en.wikipedia.org/wiki/Multiset) (multiple and possibly duplicate values).

One approach to dealing with high frequency data is to calculate an aggregate statistic, such as a percentile, at each source and send only that data. The problem with this approach is that performing an aggregate of a percentile (such as
a 95th percentile from a variety of sources) does not yield an accurate and valid percentile with high velocity metrics. That might mean that even though you have an outlier in some of the source data, it becomes obscured by all the other data.

To address high frequency data, the Wavefront service supports histograms -- a mechanism to compute, store, and use distributions of metrics. You have several options:
* Send the metrics to a histogram proxy port. The Wavefront service:
  - Converts the metrics to histogram distributions
  - Adds the extension `.m`, `.h`. or `.d` (for minute, hour, or day distributions).
* Convert the metric to histogram format on your side and send them in histogram format (prefix `M!`, `H!`, or `D!`, discussed below)
* Specify `f=histogram` as part of the [direct ingestion command](direct_ingestion.html#histogram-distribution).

You can query histograms with a set of [functions](query_language_reference.html#histogram-functions) and display them using a histogram charts or heatmap or other chart types.



## Sending Histogram Distributions

A histogram distribution allows you to combine multiple points into a complex value that has a single timestamp.

To send a histogram distribution to the Wavefront proxy:

- Send to the **distribution** port listed in the table in [Histogram Aggregation Ports](#histogram-aggregation-ports).

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

You can use [histogram configuration properties](proxies_configuring.html#histogram-configuration-properties) to customize how the Wavefront proxy handles histogram data.

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

The proxy aggregates the points and sends only the histogram distribution to the Wavefront service. The service knows only what each bin is and how many points are in each bin. The service doesn't store the value of each single histogram point, it computes and stores the distribution.

You can now apply other functions to the histogram, for example, you can try to find out what the 85th percentile of the histogram is. For this example, you could now write a query like this:

`percentile (85, hs(my.metric))`

## Histogram Overwrites

By default, new histogram data are added to existing histogram data to allow you to monitor how the histogram behaves over time.

In some special circumstances, you might want to set up histograms to overwrite existing histograms.
1. Ingest the original histogram with `“_merge”=”false”` tag set.
2. Set `“_merge”=”false”` for the histogram that is expected to overwrite the original histogram.

    {% include important.html content="The histogram that is expected to overwrite must be sent within a certain timeframe or the overwrite does not happen even if the flag is set. This timeframe is relative to the Epoch timestamp of the original point ingested." %}

   * 30 minutes for a minute bucketed histogram
   * 6 hours for hour bucketed histogram
   * 1 day for day bucketed histogram.

## Histogram Aggregation Ports

The port you use depends on your intention.
* If you are already sending histogram distributions to the proxy directly, you can use the same port you use for your regular metric traffic (usually 2878, see `pushListenerPorts`).

* If you want to aggregate high-velocity metric data into histogram distributions, use one of the following ports:

<table>
<colgroup>
<col width="30%" />
<col width="30%" />
<col width="15%" />
<col width="25%" />
</colgroup>
<thead>
<tr><th>Aggregation Interval or Distribution</th><th>Proxy Property</th><th>Default Value</th><th>Data Ingestion Format</th></tr>
</thead>
<tbody>
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


Send [**distribution data format**](#sending-histogram-distributions) histogram data only to the distribution port. If you send histogram distribution data format to `min`, `hour`, or `day` ports, the points are rejected as invalid input format and logged.

Send [**Wavefront data format**](wavefront_data_format.html) histogram data only to a minute, hour, or day port.
* If you send Wavefront data format histogram data to the distribution port, the points are rejected as invalid input format and logged.
* If you send Wavefront data format histogram data to port 2878 (instead of a min, hour, or day port), the data is not ingested as histogram data but as regular Wavefront data format metrics.

## How the Wavefront Service Creates Histogram Distributions

The Wavefront service creates distributions by aggregating metrics into bins. The following figure illustrates a distribution of 205 points that range in value from 0 to 120 at t = 1 minute, into bins of size 10.

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

### Histogram Bin Size

Histogram bin size is computed using a [T-digest algorithm](https://github.com/tdunning/t-digest/blob/master/docs/t-digest-paper/histo.pdf), which retains better accuracy at the distribution edges where outliers typically arise. In the algorithm, bin size is not uniform (unlike the histogram illustrated above). However, the bin size that the algorithm selects is irrelevant.

Histograms do not store each actual data point value that is fed to it. Instead, histograms store the quantiles calculated from histogram points, which are estimates within a certain margin of error.


### Histogram Metric Aggregation Intervals

The Wavefront service supports aggregating metrics by the minute, hour, or day. Intervals start and end on the minute, hour, or day, depending on the granularity that you choose. For example, day-long intervals start at the beginning of each day, UTC time zone.

The aggregation intervals do not overlap.  If you are aggregating by the minute, a value reported at 13:58:37 is assigned to the interval `[13:58:00;13:59:00]`. If no metrics are sent during an interval, no histogram points are recorded.

## Monitoring Histogram Points

You can use `~histogram` metrics to monitor histogram ingestion. See the [Ingest Rate by Source](wavefront_monitoring.html#ingest-rate-by-source) section of the Wavefront Service and Proxy Data dashboard.
