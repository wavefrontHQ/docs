---
title: Service Internal Metrics
keywords: administration
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront-internal-metrics.html
summary: VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) collects internal metrics that are used extensively in the different dashboards of the Operations for Applications Usage integration.
---

You can:

* Clone and modify one of the Operations for Applications Usage integration dashboards.
* Create your own dashboard, query these metrics in charts, and create alerts for some of these metrics.

Most of the internal metrics are [**ephemeral**](metric_types.html#metric-types-per-retention-period) and not convertible to persistent. Exceptions are the following internal metrics, which are persistent:
- `~collector.*points.reported`
- `~externalservices.*.points`
- `~derived-metrics.points.reported`
- `~collector.*histograms.reported`
- `~derived-histograms.histograms.reported`
- `~collector.*spans.reported`
- `~query.metrics_scanned`
- `~proxy.points.*.received`
- `~proxy.histograms.*.received`
- `~proxy.spans.*.received`
- `~proxy.spanLogs.*.received`
- `~proxy.build.version`
- `~metric.global.namespace.*`
- `~histogram.global.namespace.*`
- `~counter.global.namespace.*`

## Internal Metrics Overview

We collect the following sets of metrics.

- `~alert*` -- a set of metrics that allows you to examine the effect of alerts on your service instance.
- `~collector` -- metrics processed at the collector gateway to the service instance. Includes spans.
- `~metric` -- total unique sources and metrics.  You can compute the rate of metric creation from each source.
- `~proxy` -- metric rate received and sent from each Wavefront proxy, blocked and rejected metric rates, buffer metrics, and JVM stats of the proxy. Also includes counts of metrics affected by the proxy preprocessor. See [Monitor Wavefront Proxies](monitoring_proxies.html).
- `~wavefront` -- set of gauges that track metrics about your use of the Operations for Applications service.
- `~http.api` -- namespace for looking at API request metrics.

If you have an [AWS integration](integrations_aws_metrics.html), metrics with the following prefix are available:

- `~externalservices` -- metric rates, API requests, and events from AWS CloudWatch, AWS CloudTrail, and AWS Metrics+.

There's also a metric you can use to monitor ongoing events and make sure the number does not exceed 1000:
- `~events.num-ongoing-events` -- returns the number of [ongoing events](events.html#event-states).


## Useful Internal Metrics for Optimizing Performance

A small set of internal metrics can help you optimize performance and monitor your costs. This section highlights some things to look for - the exact steps depend on how you're using the Operations for Applications service and on the characteristics of your environment.

Our customer support engineers have found the following metrics especially useful.

<table>
<tbody>
<thead>
<tr><th width="12%">Type</th><th width="35%">Metric</th><th width="53%">Description</th></tr>
</thead>
<tr>
<td markdown="span">~alert</td>
<td markdown="span">~alert.query_time.&lt;alert_id&gt;</td>
<td markdown="span">Tracks the average time, in ms, that a specified alert took to run in the past hour.</td></tr>
<tr>
<td markdown="span">~alert</td>
<td markdown="span">~alert.query_points.&lt;alert_id&gt;</td>
<td markdown="span">Tracks the average number of points that a specified alert scanned in the past hour.</td></tr>
<tr>
<td markdown="span">~alert</td>
<td markdown="span">~alert.checking_frequency.&lt;alert_id&gt;</td>
<td markdown="span">Tracks how often a specified alert performs a check. See [Alert States](alerts_states_lifecycle.html#what-are-alert-states) for details.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.reported <br> ~collector.histograms.reported <br>~collector.tracing.spans.reported<br>~collector.tracing.span_logs.reported <br> ~collector.tracing.span_logs.bytes_reported<br></td>
<td markdown="span">Valid metric points, histogram points, trace data (spans), or span logs that the collector reports to Operations for Applications. This is a billing metric that you can look up on the Operations for Applications Usage dashboard.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.points.reported` we have `collector.direct-ingestion.points.reported`.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.batches<br> ~collector.histograms.batches<br> ~collector.tracing.spans.batches<br> ~collector.tracing.span_logs.batches</td>
<td markdown="span">Number of batches of points, histogram points, or spans received by the collector, either via the proxy or via the direct ingestion API. In the histogram context a batch is the number of HTTP POST requests.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.spans.batches` we have `collector.direct-ingestion.spans.batches`.</td></tr>

<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.undecodable<br> ~collector.histograms.undecodable<br> ~collector.tracing.spans.undecodable<br> ~collector.tracing.span_logs.undecodable</td>
<td markdown="span">Points, histogram points, spans, or span logs that the collector receives but cannot report to Operations for Applications because the input is not in the right format.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.points.undecodable` we have `collector.direct-ingestion.points.undecodable`.</td></tr>

<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.delta_points.tracing_red.reported<br> ~collector.histograms.tracing_red.reported<br> ~collector.points.tracing_red.reported</td>
<td markdown="span">Delta counters, histograms, and points derived as [Tracing RED metrics](trace_data_details.html#red-metrics) that the collector receives.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.delta_points.tracing_red.reported` we have
`collector.direct-ingestion.delta_points.tracing_red.reported`.</td></tr>

<tr>
<td markdown="span">~metric</td>
<td>~metric.new_host_ids</td>
<td markdown="span">Counter that increments when a new `source=` or `host=` is sent to Operations for Applications.</td></tr>
<tr>
<td markdown="span">~metric</td>
<td>~metric.new_metric_ids</td>
<td markdown="span">Counter that increments when a new metric name is sent to Operations for Applications.</td></tr>
<tr>
<td markdown="span">~metric</td>
<td>~metric.new_string_ids</td>
<td markdown="span">Counter that increments when a new point tag value is sent to Operations for Applications.</td></tr>
<tr>
<td markdown="span">~query</td>
<td>~query.requests</td><td>Counter tracking the number of queries a user made.</td></tr>
<tr>
<td markdown="span">~http.api</td>
<td markdown="span">~http.api.v2.*</td>
<td>Monotonic counter, without tags, that can be aligned with the API endpoints and allows you to examine API request metrics.<br>
For example: <strong>ts(~http.api.v2.alert.{id}.GET.200.count)</strong> aligns with the <strong>GET /api/v2/alert/{id}</strong> API endpoint.<br>
Examine the <strong>~http.api.v2.</strong> namespace to see the counters for specific API endpoints.</td></tr>
</tbody>
</table>

If several slow queries are executed within the selected time window the Slow Query page can become long. Section links at the top left allow you to select a section. *The links display only after you have scrolled down the page.*
