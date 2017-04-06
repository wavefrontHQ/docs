---
title: Wavefront Histograms
keywords:
tags: [proxies, query_language]
sidebar: doc_sidebar
permalink: proxies_histograms.html
summary: Learn how to use Wavefront histograms.
---
Even though Wavefront can receive and store highly granular metrics, it cannot receive data at greater than 1 point per second per unique source. In cases where finer data granularity is available to measure performance, Wavefront supports histograms, a mechanism to compute, store, and use distributions of metrics rather than single metrics.
 
For example, suppose you are measuring the latency of each web request. If you have sufficient traffic at multiple servers, you could have multiple distinct measurements for a given metric, host, and timestamp. This will result in "collisions" using [Wavefront data format](wavefront_data_format). In other words, the frequency of this data is actually higher than the Wavefront format; rather than metric-timestamp-source mapping to a single value, the composite key maps to a [multiset](https://en.wikipedia.org/wiki/Multiset) (multiple and possibly duplicate values).
 
One approach to dealing with high frequency data is to calculate a statistic, such as a percentile, at each source and send only that data. The problem with this approach is that an aggregate of a percentile (such as P95s from a variety of sources) does not yield a valid percentile.
 
A Wavefront histogram is a distribution of metrics collected and computed by the Wavefront proxy. In addition to storing histogram data, Wavefront provides language features that can be used to query histogram data from multiple sources and calculate quantiles and percentiles. These calculated quantiles are then available as new time series that can be used in Wavefront Query Language queries.

## Wavefront Histogram Computation
 
A [histogram](https://en.wikipedia.org/wiki/Histogram) creates a distribution by aggregating data into bins. For example, the following figure illustrates a distribution of 205 points of a metric that ranges in value from 0 to 120 into bins of size 10 at t = 1 minute.

![histogram](images/histogram.png)

The following table enumerates the distribution of the same metric at successive minutes.

<table width="50%">
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr><th>Time (minutes)</th><th>Distribution</th></tr>
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
Wavefront supports aggregating metrics by the minute, hour, or day. Intervals start and end on the minute, hour, or day, depending on the granularity that you choose. For example, day-long intervals start at the beginning of each day, UTC time zone.  The aggregation intervals do not overlap.  If you are aggregating by the minute, a value reported at 13:58:37 would be assigned to the interval [13:58:00;13:59:00]. If no metrics are sent during an interval, no histogram points are recorded.
 
## Wavefront Proxy Configuration
Histograms are supported by Wavefront proxy 4.6 and higher.
 
To indicate that metrics should be treated as histogram data, you send the metrics to a specific Wavefront proxy port according to the aggregation window. For example:

<table width="50%">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<thead>
<tr><th>Aggregation Window</th><th>Default Proxy Port</th></tr>
</thead>
<tbody>
<tr>
<td>minute</td>
<td>40001</td>
</tr>
<tr>
<td>hour</td>
<td>40002</td>
</tr>
<tr>
<td>day</td>
<td>40003</td>
</tr>
</tbody>
</table>

You configure the ports in the proxy configuration file `/etc/wavefront/wavefront-proxy/wavefront.conf`.

### Histogram Configuration Properties

<table class="width:100%;">
<colgroup>
<col width="35%" />
<col width="65%" />
</colgroup>
<thead>
<tr><th>Property</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>histogramMinsListenerPorts
</td>
<td>Comma-separated list of ports to listen on for histograms to be aggregated by minute. Default: 40001.</td>
</tr>
<tr>
<td>histogramMinuteAccumulators</td>
<td>Number of accumulators per minute port. Default: 2.
</td>
</tr>
<tr>
<td>histogramMinuteFlushSecs</td>
<td>Time-to-live in seconds for a minute granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 70.</td>
</tr>
<tr>
<td>histogramHoursListenerPorts</td>
<td>Comma-separated list of ports to listen on for histograms to be aggregated by hour. Default: 40002.</td>
</tr>
<tr>
<td>histogramHourAccumulators</td>
<td>Number of accumulators per hour port. Default: 2.</td>
</tr>
<tr>
<td>histogramHourFlushSecs</td>
<td>Time-to-live in seconds for an hour granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 4200.</td>
</tr>
<tr>
<td>histogramDaysListenerPorts</td>
<td>Comma-separated list of ports to listen on for histograms to be aggregated by day. Default: 40003.</td>
</tr>
<tr>
<td>histogramDayAccumulators</td>
<td>Number of accumulators per day port. Default: 2.</td>
</tr>
<tr>
<td>histogramDayFlushSecs</td>
<td>Time-to-live in seconds for a day granularity accumulation on the proxy (before the intermediary is sent to Wavefront). Default: 18000.
</td>
</tr>
<tr>
<td>histogramCompression</td>
<td markdown="span">Bounds the number of centroids per histogram. Must be in [20;1000]. Default: 100.</td>
</tr>
<tr>
<td>histogramStateDirectory</td>
<td markdown="span">Directory for persistent proxy state, must be writable.  Before being flushed to Wavefront, histogram data is persisted on the filesystem where the Wavefront proxy resides. If the files are corrupted or the files in the directory can't be accessed, the proxy reports the problem in its log and fails back to using in-memory structures. In this mode, samples can be lost if the proxy terminates without draining its queues. Default: `/var/spool/wavefront-proxy`.<br /><br />
<strong>Note: </strong>A high PPS requires that the machine that the proxy is on has an appropriate amount of IOPS. We recommend about 3K IOPS for 10k PPS on the directory that the proxy writes histogram data to.
</td>
</tr>
<tr>
<td>histogramAccumulatorResolveInterval</td>
<td>Interval in milliseconds to write back accumulation changes to disk. Default: 100.</td>
</tr>
<tr>
<td>histogramAccumulatorSize</td>
<td>Expected upper bound of concurrent accumulations: ~ #timeseries * #parallel reporting bins. Default: 100000.</td>
</tr>
<tr>
<td>avgHistogramKeyBytes</td>
<td>Average number of bytes in a UTF-8 encoded histogram key. Concatenation of ~metric, source, and point tags. Default: 50.</td>
</tr>
<tr>
<td>avgHistogramDigestBytes</td>
<td>Average number of bytes in an encoded distribution/accumulation. Default: 500.</td>
</tr>
<tr>
<td>persistMessages</td>
<td>Whether to persist received metrics to disk. Default: true.<br /><br />
<strong>Warning: </strong>If set to false unprocessed metrics are lost on proxy shutdown.
</td>
</tr>
<tr>
<td>persistAccumulator</td>
<td>Whether to persist accumulation state. Default: true.<br /><br />
<strong>Warning: </strong>If set to false unprocessed metrics are lost on proxy shutdown.
</td>
</tr>
</tbody>
</table>

## Histogram Metric Naming
 
You send metrics using the standard [Wavefront data format](wavefront_data_format):

```
<metricName> <metricValue> [<timestamp>] source=<source> [pointTags]
```

For example, `request.latency 20 1484877771 source=<source>`. The Wavefront proxy automatically adds the prefix histogram and suffixes .m, .h, or .d according to the bin granularity to histogram metrics. For example, if the preceding metric `request.latency` is aggregated over an hour, it would be named `histogram.request.latency.h`.
 
## Querying Histogram Metrics

To query histogram metrics, use the `hs()` function. For example:

- `percentile(90, hs(histogram.<metricName>.m))` returns `<metricName>` for the 90th percentile aggregated over a minute.
- `min(hs(histogram.<metricName>.h))` returns the smallest `<metricName>` aggregated over an hour.
- `max(hs(histogram.<metricName>.m))` returns the largest `<metricName>` aggregated over a minute.
- `count(hs(histogram.<metricName>.d))` returns the number of `<metricName>` points aggregated over a day.

{% include links.html %}
