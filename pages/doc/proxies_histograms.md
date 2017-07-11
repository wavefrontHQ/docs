---
title: Wavefront Histograms
keywords:
tags: [proxies, query language]
sidebar: doc_sidebar
published: false
permalink: proxies_histograms.html
summary: Learn how to use Wavefront histograms.
---

Wavefront can receive and store highly granular metrics at 1 point per second per unique source. However some
environments generate higher frequency data. For example, suppose you are measuring the latency of web requests. If you
have sufficient traffic at multiple servers, you could have multiple distinct measurements for a given metric,
timestamp, and source. Such a data flow would result in "collisions" using the [Wavefront data
format](wavefront_data_format.html). In other words, the frequency of this data is actually higher than the Wavefront
format; rather than metric-timestamp-source mapping to a single value, the composite key maps to a
[multiset](https://en.wikipedia.org/wiki/Multiset) (multiple and possibly duplicate values).

One approach to dealing with high frequency data is to calculate an aggregate statistic, such as a percentile, at each
source and send only that data. The problem with this approach is that performing an aggregate of a percentile (such as
P95s from a variety of sources) does not yield a valid percentile.

To address cases where high frequency data is available, Wavefront supports histograms, a mechanism to compute, store,
and use distributions of metrics rather than single metrics. A Wavefront
[histogram](https://en.wikipedia.org/wiki/Histogram) is a distribution of metrics collected and computed by the
Wavefront proxy or sent by you to the proxy. Histograms are supported by Wavefront proxy 4.12 and higher. To indicate that metrics should be treated as histogram data, you send
the metrics to a [histogram proxy port](#histogram-proxy-ports) instead of the usual port 2878. 

Once the proxy sends the histogram data to the Wavefront server, Wavefront [rewrites the names of histogram metrics](#histogram-metric-names) which you can query with a limited set of [functions](#histogram-functions). 

## Wavefront Histogram Distributions
 
Wavefront creates distributions by aggregating metrics into bins. For example, the following figure illustrates a distribution of 205 metrics that range in value from 0 to 120 at t = 1 minute, into bins of size 10.

![histogram](images/histogram.png)

The following table enumerates the distribution of the same metric at successive minutes. The first row of the table contains the distribution illustrated in the figure. The following rows show how the distribution evolves over successive minutes.

<table width="50%">
<colgroup>
<col width="30%" />
<col width="70%" />
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


The Wavefront histogram bin size is computed using a [T-digest algorithm](https://github.com/tdunning/t-digest/blob/master/docs/t-digest-paper/histo.pdf), which retains better accuracy at the distribution edges where outliers typically arise. A consequence of using this algorithm is that unlike the histogram illustrated above, the bin size is not uniform.
 
In addition, because histograms do not store data point values, quantiles calculated from histograms are estimates within a certain margin of error.


## Histogram Metric Aggregation Intervals


Wavefront supports aggregating metrics by the minute, hour, or day. Intervals start and end on the minute, hour, or day, depending on the granularity that you choose. For example, day-long intervals start at the beginning of each day, UTC time zone.  

The aggregation intervals do not overlap.  If you are aggregating by the minute, a value reported at 13:58:37 would be assigned to the interval `[13:58:00;13:59:00]`. If no metrics are sent during an interval, no histogram points are recorded.
 
## Sending Histogram Distributions

You can also compute a histogram distribution yourself and send it to the Wavefront proxy. A distribution allows you to send a group of points with a single value. 

To indicate that data is a histogram distribution, you send histogram data:

- To the **distribution** port listed in the table in [Histogram Proxy Ports](#histogram-proxy-ports).

- Using the following format:

  ```html
  {!M | !H | !D} [<timestamp>] #<points> <metricValue> <metricName> source=<source> <pointTagKey1>=<value1> ... <pointTagKeyn>=<valuen>
  ```

  where `{!M | !H | !D}` identifies the aggregation interval (minute, hour, or day) used when computing the distribution and `points` is the number of points. For example:

  ```
  !M 1493773499 #20 30 request.latency source=appServer1 region=us-west
  ```

  is a distribution that sends 20 points of the metric `request.latency` with value 30 that have been aggregated into minute intervals.

  {% include note.html content="Unlike the Wavefront data format, which is `<metricName> <metricValue> <timestamp>`, histogram data inverts the ordering of components in a data point: `<timestamp> #<points> <metricValue> <metricName>`." %}


## Histogram Configuration

Histograms are supported by Wavefront proxy 4.8 and higher. Using histograms require that you configure various options in the Wavefront proxy. For information on how to configure proxies, see [Configuring Proxies](proxies_configuring.html).


### Histogram Proxy Ports
 
To indicate that metrics should be treated as histogram data, you send the metrics to a specific Wavefront proxy TCP port according to whether you are sending a distribution or by aggregation interval. For example:

<table width="80%">
<colgroup>
<col width="40%" />
<col width="40%" />
<col width="20%" />
</colgroup>
<thead>
<tr><th>Distribution or Aggregation Interval</th><th>Proxy Property</th><th>Default Value</th></tr>
</thead>
<tbody>
<tr>
<td>distribution</td>
<td>histogramDistListenerPorts</td>
<td>40000</td>
</tr>
<tr>
<td>minute</td>
<td>histogramMinuteListenerPorts</td>
<td>40001</td>
</tr>
<tr>
<td>hour</td>
<td>histogramHourListenerPorts</td>
<td>40002</td>
</tr>
<tr>
<td>day</td>
<td>histogramDayListenerPorts</td>
<td>40003</td>
</tr>
</tbody>
</table>

You can send [Wavefront data format](#wavefront-data-format) histogram data only to a minute, hour, or day port. If you send Wavefront data format histogram data to the distribution port, the points are rejected as invalid input format and logged. If you send Wavefront data format histogram data to port 2878 (instead of a min, hour, or day port), the data is not ingested as histogram data but as regular Wavefront data format metrics. If you send more than one regular metric with same timestamp, the metric value is overwritten with the value received last.

You can send [distribution data format](#distribution-data-format) histogram data only to the distribution port. If you send Wavefront distribution data format to min, hour, or day ports the points are rejected as invalid input format and logged.

### Histogram Configuration Properties

This table lists other histogram configuration properties in addition to the histogram proxy ports. In particular, note the requirements on the state directory and the affect of the two `persist` properties listed at the bottom of the table.

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
<td>avgHistogramDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 500.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>avgHistogramKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of metric, source, and point tags. Default: 50.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramAccumulatorResolveInterval</td>
<td>Interval in milliseconds to write back accumulation changes to disk. Default: 100.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #time series * #parallel reporting bins. Default: 100000.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramCompression</td>
<td>A bound on the number of centroids per histogram. Default: 100.</td>
<td markdown="span">Positive integer in the interval [20;1000].</td>
</tr>
<tr>
<td>histogramDayListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by day. Default: 40003.</td>
<td>Comma-separated list of ports.</td>
</tr>
<tr>
<td>histogramDayAccumulators</td>
<td>Number of accumulators per day port. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDayFlushSecs</td>
<td>Time-to-live in seconds for a day granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 18000 (5 hours).
</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramDistListenerPorts</td>
<td>TCP ports to listen on for ingesting histogram distributions. Default: 40000.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramHourListenerPorts</td>
<td>TCP ports to listen on for histograms to be aggregated by hour. Default: 40002.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramHourAccumulators</td>
<td>Number of accumulators per hour port. Default: 2.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramHourFlushSecs</td>
<td>Time-to-live in seconds for an hour granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 4200.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteListenerPorts
</td>
<td>TCP ports to listen on for histograms to be aggregated by minute. Default: 40001.</td>
<td>Comma-separated list of ports. Can be a single port.</td>
</tr>
<tr>
<td>histogramMinuteAccumulators</td>
<td>Number of accumulators per minute port. Default: 2.
</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramMinuteFlushSecs</td>
<td>Time-to-live in seconds for a minute granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 70.</td>
<td>Positive integer.</td>
</tr>
<tr>
<td>histogramStateDirectory</td>
<td>Directory for persistent proxy state, must be writable.  Before being flushed to Wavefront, histogram data is persisted on the filesystem where the Wavefront proxy resides. If the files are corrupted or the files in the directory can't be accessed, the proxy reports the problem in its log and fails back to using in-memory structures. In this mode, samples can be lost if the proxy terminates without draining its queues. Default: <code>/var/spool/wavefront-proxy</code>.
</td>
<td>A valid path on the local file system. {% include note.html content="A high PPS requires that the machine that the proxy is on has an appropriate amount of IOPS. We recommend about 1K IOPS with 8GB RAM on the machine that the proxy writes histogram data to. Recommended machine type: m4.xlarge." %}</td>
</tr>
<tr>
<td>persistAccumulator</td>
<td>Whether to persist accumulation state. Default: true.
</td>
<td>Boolean. {% include warning.html content="If set to false unprocessed metrics are lost on proxy shutdown." %}
</td>
</tr>
<tr>
<td>persistMessages</td>
<td>Whether to persist received metrics to disk. Default: true.
</td>
<td>Boolean. {% include warning.html content="If set to false unprocessed metrics are lost on proxy shutdown." %}
</td>
</tr>
</tbody>
</table>

## Querying Histogram Metrics

Wavefront follows specific naming conventions for histogram metrics and defines functions to query and summarize histogram metrics.

### Histogram Metric Naming
 
You send metrics using the standard [Wavefront data format](wavefront_data_format.html):

```html
<metricName> <metricValue> [<timestamp>] source=<source> <pointTagKey1>=<value1> ... <pointTagKeyn>=<valuen>
```

For example, `request.latency 20 1484877771 source=<source>`. 

The Wavefront proxy adds the prefix `histogram` and suffixes `.m`, `.h`, or `.d` according to the aggregation interval. For example, if the preceding metric `request.latency` is aggregated over an hour, it would be named `histogram.request.latency.h`.

### Histogram Functions

To query histogram metrics, use the `hs()` function to return points. 

You can apply a limited set of statistical functions to the returned data&mdash; `percentile`, `max`, `median`, `min`, and `count`. For example:

- `percentile(<percentile>, hs(histogram.<metricName>.m))` returns `<metricName>` for the `<percentile>` percentile aggregated over a minute.
- `max(hs(histogram.<metricName>.m))` returns the largest `<metricName>` aggregated over a minute.
- `median(hs(histogram.<metricName>.h))` returns the median `<metricName>` aggregated over an hour.
- `min(hs(histogram.<metricName>.h))` returns the smallest `<metricName>` aggregated over an hour.
- `count(hs(histogram.<metricName>.d))` returns the number of `<metricName>` points aggregated over a day.


