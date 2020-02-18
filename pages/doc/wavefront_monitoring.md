---
title: Monitor Wavefront Service
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring.html
summary: Monitor and troubleshoot your Wavefront instance and examine version information.
---

If system performance seems to be deteriorating, you can examine your Wavefront instance and Wavefront proxy with the Wavefront system dashboard, and look at internal metrics to investigate the problem.

This page discusses monitoring your Wavefront instance. It includes a section about examining versions of dashboards and alerts. See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details on investigating proxy issues.

## Wavefront Internal Metrics Overview

Wavefront collects several categories of internal metrics. This section gives an overview, see [Using Internal Metrics to Optimize Performance ](wavefront_monitoring.html#using-internal-metrics-to-optimize-performance) below for details.

- `~alert*` - set of metrics that allows you to examine the effect of alerts on your Wavefront instance.
- `~collector` - metrics processed at the collector gateway to the Wavefront instance. Includes spans.
- `~metric` - total unique sources and metrics.  You can compute the rate of metric creation from each source.
- `~proxy` - metric rate received and sent from each Wavefront proxy, blocked and rejected metric rates, buffer metrics, and JVM stats of the proxy. Also includes counts of metrics affected by the proxy preprocessor.
  {% include note.html content="Proxy metrics historically had the prefix `~agent` and queries support both `~proxy` and `~agent`. Query errors still refer to the `~agent` prefix. For example - `No metrics matching - [~agent.points.*.received]`." %}
  See [Monitoring Wavefront Proxies](monitoring_proxies.html).
- `~wavefront` - set of gauges that track metrics about your use of Wavefront.
- `~http.api` - namespace for looking at API request metrics.

If you have an [AWS integration](integrations_aws_metrics.html), metrics with the following prefix are available:

- `~externalservices` - metric rates, API requests, and events from AWS CloudWatch, AWS CloudTrail, and AWS Metrics+.

There's also a metric you can use to monitor ongoing events and make sure the number does not exceed 1000:
- `~events.num-ongoing-events` - Returns the number of [ongoing events](events.html#event-states).

## Charts in the Wavefront Usage Integration Dashboard

The [Wavefront Usage integration](system.html) provides the Wavefront System Usage dashboard that displays metrics that help you find reasons for system slowdown. You can examine many aspects or your Wavefront Instance. We'll look at  the following sections here:
* Overall Data Rate
* Wavefront Stats
* AWS Integration
* Ingestion Rate by Source

See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details on the following sections:
* Proxy Health
* Proxy Troubleshooting

### Overall Data Rate

The Overall Data Rate section shows the overall point rate being processed by the Wavefront servers.

![overall_section](images/overall_section.png)

These charts use the following metrics:

- **Data Ingestion Rate**
   - `~collector.points.reported` -- points coming from the proxy.
   - `~collector.direct-ingestion.points.reported` -- points coming through direct ingestion.
   - `~collector.delta_points.reported` -- delta counter points.
   - `~externalservices.<*>.points` -- per-second rate at which Wavefront ingests new points from cloud integrations such as AWS, GCP, and Azure.

   For example, use `~externalservices.ec2.points` for the EC2 points.
   - `externalservices.points.reported` -- shows how you get billed for external services.
- **Data Scan Rate** - `~query.summaries_scanned`, the per second rate at which data points are being queried out of Wavefront through dashboards, alerts, custom charts, or API calls.


### Wavefront Stats

Charts that track the number of Wavefront users during various time windows, number of dashboards and alerts, and information about the types of alerts.

![wavefront metrics](images/wavefront_metrics.png)

### AWS Integration

If you have an [AWS integration](integrations_aws_metrics.html) and are ingesting AWS CloudWatch, CloudTrail, and API Metrics+ metrics into Wavefront, this section monitors the count of CloudWatch requests, API requests, the point rate, and events coming in from your integration.

![aws_metric_sections](images/aws_metric_sections.png)

The available metrics for the AWS integration are:

- `~externalservices.cloudwatch.api-requests` - number of CloudWatch API requests
- `~externalservices.cloudwatch.points`- number of CloudWatch metrics returned
- `~externalservices.ec2.points` - number of AWS Metrics+ metrics returned
- `~externalservices.cloudtrail.events` - number of CloudTrail events returned
- `~externalservices.cloudwatch-cycle-timer` - time in milliseconds CloudWatch requests take to complete

### Ingest Rate by Source

This section gives insight into the shape of your data. It shows the total number of sources reporting. It also monitors the rate of metrics creation and breaks it down by source.

![point_rate breakdown](images/point_rate_breakdown.png)

The metrics used in this section are:

- `~metric.counter` - number of metrics being collected. It can be broken down by the sources sending the metrics.

## Using Internal Metrics to Optimize Performance

A small set of internal metrics can help you optimize performance and monitor your costs. This section highlights some things to look for - the exact steps depend on how you're using Wavefront and on the characteristics of your environment.

Wavefront customer support engineers have found the following metrics especially useful.

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
<td markdown="span">Tracks how often a specified alert performs a check. See [Alert States](alerts_states_lifecycle.html#alert-states) for details.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.reported <br> ~collector.histograms.reported <br>~collector.tracing.spans.reported<br>~collector.tracing.span_logs.reported <br> ~collector.tracing.span_logs.bytes_reported<br></td>
<td markdown="span">Valid metric points, histogram points, [trace data (spans)](tracing_basics.html#trace-sampling-and-storage), or [span logs](2019.30.x_release_notes.html#span-logs-for-distributed-tracing) that the collector reports to Wavefront. This is a billing metric that you can look up on the Wavefront Usage dashboard.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.points.reported` we have `collector.direct-ingestion.points.reported`.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.batches<br> ~collector.histograms.batches<br> ~collector.tracing.spans.batches<br> ~collector.tracing.span_logs.batches</td>
<td markdown="span">Number of batches of points, histogram points, or spans received by the collector, either via the proxy or via the direct ingestion API. In the histogram context a batch is the number of HTTP POST requests.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.spans.batches` we have `collector.direct-ingestion.spans.batches`.</td></tr></td></tr>

<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.undecodable<br> ~collector.histograms.undecodable<br> ~collector.tracing.spans.undecodable<br> ~collector.tracing.span_logs.undecodable</td>
<td markdown="span">Points, histogram points, spans, or span logs that the collector receives but cannot report to Wavefront because the input is not in the right format.<br>
<br>
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.points.undecodable` we have `collector.direct-ingestion.points.undecodable`.</td></tr></td></tr>
<tr>
<td markdown="span">~metric</td>
<td>~metric.new_host_ids</td>
<td markdown="span">Counter that increments when a new `source=` or `host=` is sent to Wavefront.</td></tr>
<tr>
<td markdown="span">~metric</td>
<td>~metric.new_metric_ids</td>
<td markdown="span">Counter that increments when a new metric name is sent to Wavefront.</td></tr>
<tr>
<td markdown="span">~metric</td>
<td>~metric.new_string_ids</td>
<td markdown="span">Counter that increments when a new point tag value is sent to Wavefront.</td></tr>
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




### Viewing Internal Metrics

Here's one easy way to see internal metrics information:
1. Select **Integrations** and click the Wavefront Usage integration.
2. Select **Dashboard**.
3. Click the pencil icon and select **Clone**.
4. Add charts for the metrics that you're interested in.

### Fine-Tuning Alerts

The `~alert` metrics allow you to examine your alerts and understand which alerts impact performance. After you find out how much load a query is putting on the system, you can potentially refine the alert and improve performance.
* `~alert.query_points` shows the details of the points scanned by each alert.
* `~alert.query_time` shows details for the amount of time it takes to run the alert query.
* `~alert.checking_frequency` helps you find alerts that are checking too frequently. For each alert, the alert checking frequency should be greater or equal to query time.

For example, you can set up an alert that monitors existing alerts that have high points scanned rates. You can then catch badly written alerts and tune them to improve performance.

See [Building Linked Alerts](alerts_dependencies.html) for additional information about using internal alert metrics.

### Understanding System Activity

The three `~metric.new_*` internal metrics allow you to discover if a recent change to the system might have caused the problem. These metrics can show you if Wavefront recently received points that don't fit the usual pattern of the metrics that Wavefront received from you. For example, assume you just used the Kubernetics integration to add a cluster to your Wavefront instance. The integration will start sending data from all hosts in the cluster. If you create point tags, they will also be sent for each host, potentially creating a bottleneck.

Each metric includes the metric name, customer, any tags, and the source or host. The three internal metrics allow you to find out information about 3 aspects of the metric.
* `~metric.new_metric_ids` shows metrics that Wavefront hasn't seen before in the metric namespace.
* `~metric.new_string_ids` shows point tags that Wavefront hasn't seen before, as strings.
* `~metric.new_host_ids` shows hosts, that is, the sources for the metrics, that Wavefront hasn't seen before.

### Understanding ~collector Metrics for Histograms

The ~collector metrics are especially useful when monitoring histogram ingestion. Whenever a distribution is sent to the collector, `~collector.histograms.reported` is incremented. When using one of the [aggregation ports](proxies_histograms.html#histogram-proxy-ports) (min, hour, day), all data points received within the aggregation interval are used to compute the distribution for that interval.

For example, if you are using the minute aggregation interval, all points received within a minute, e.g. 12:00-12:00:59 are part of the distribution for that minute. This is based on the timestamp, if specified; otherwise, based on arrival time at the proxy.
If, after 12:07:59, a point is received with a timestamp between 12:00-12:00:59, the proxy builds another distribution because the default flush interval for minute aggregation is 70 sec.
The proxy will essentially send two distributions to the Wavefront collector for the time interval of 12:00-12:00:59. On the backend, these two distributions are merged together so that when queried, they will behave as one distribution. However, the collector will still have seen two distributions arrive.


### Finding Query Users Who Caused Bottlenecks

 `~query.requests` returns information about queries and the associated user. It helps you examine whether one of your users stands out as the person who might be causing the performance problem. Often, new users unintentionally send many queries to Wavefront, especially if they use the API for the queries. The results can become difficult to interpret, and system performance might suffer.


## Examine Slow Queries

You can examine slow queries to troubleshoot performace issues.

**To bring up the Slow Queries page**

1. In the Wavefront UI, click the gear icon <i class="fa fa-cog"/> at the top right of the task bar.
1. Click the **Slow Query Dashboard** option in the menu.
2. Use the buttons at the top right to choose the time window.

The three tabs in the display give you the following information.

<table>
<tbody>
<thead>
<tr><th width="25%">Tab</th><th width="75%">Description</th></tr>
</thead>
<tr>
<td>Overview</td>
<td>Slow queries in the system.
<div>Shows the context of the query (Alerts/API or streaming) and which slow queries failed to complete vs. which queries took a long time but eventually completed. Also shows the number of slow queries by user.</div>
</td>
</tr>
<tr>
<td>Top Slow Queries </td>
<td>Lists details about the top slow queries including the time taken, points scanned, and CPU seconds.
</td>
</tr>
<tr>
<td>Resource Consumption</td>
<td>Displays users that ran slow queries and includes time spent, total points scanned, and total CPU consumed.
</td>
</tr>
</tbody>
</table>

If several slow queries are executed within the selected time window the Slow Query page can become long. Section links at the top left allow you to select a section. *The links display only after you have scrolled down the page.*

## Examining Versions of Dashboards and Alerts

Wavefront stores details about each version of each dashboard and each alert. That means you have an audit trail of changes. When someone saves changes to a dashboard or alert, we create a new version and track the changes, including details about the change and the user who made the change.

You can examine dashboard and alert versions from the UI or using the REST API.

**To examine versions of a dashboard:**

1. Select **Browse > All Dashboards**
2. Click the three vertical dots to the left of the dashboard you're interested in and select **Versions**.
3. You can review the changes to the dashboard, revert to a previous version, or clone a previous version.

![dashboard versions](images/dashboard_versions.png)

The process is the same for alerts.
