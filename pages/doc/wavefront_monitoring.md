---
title: Monitoring Wavefront
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring.html
summary: Learn how to monitor and troubleshoot the health of your Wavefront instance.
---

If system performance seems to be deteriorating, you can examine your Wavefront instance and Wavefront proxy with the Wavefront system dashboard, and look at internal metrics to investigate the problem.

This page discusses monitoring your Wavefront instance. See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details on investigating proxy issues.

## Wavefront Internal Metrics Overview

Wavefront collects several categories of internal metrics. These categories have the following prefixes:

- `~alert*` - set of metrics that allows you to examine the effect of alerts on your Wavefront instance. See [Troubleshooting Your Wavefront Instance with Internal Metrics](wavefront_monitoring.html#troubleshooting-your-wavefront-instance-with-internal-metrics)
- `~collector` - metrics processed at the collector gateway to the Wavefront instance.
- `~metric` - total unique sources and metrics.  You can compute the rate of metric creation from each source. [Troubleshooting Your Wavefront Instance with Internal Metrics](wavefront_monitoring.html#troubleshooting-your-wavefront-instance-with-internal-metrics) discusses a set of `~metric.new*` metrics.
- `~proxy` - metric rate received and sent from each Wavefront proxy, blocked and rejected metric rates, buffer metrics, and JVM stats of the proxy. Also includes counts of metrics affected by the proxy preprocessor.
  {% include note.html content="Proxy metrics historically had the prefix `~agent` and queries support both `~proxy` and `~agent`. Query errors still refer to the `~agent` prefix. For example - `No metrics matching - [~agent.points.*.received]`." %}
  See [Monitoring Wavefront Proxies](monitoring_proxies.html).
- `~wavefront` - set of gauges that track metrics about your use of Wavefront.

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

A small set of internal metrics can help you optimize performance. This section highlights some things to look for - the exact steps depend on how you're using Wavefront and on the characteristics of your environment.

Wavefront customer support engineers have found the following metrics especially useful.

<table>
<tbody>
<thead>
<tr><th width="20%">Type</th><th width="30%">Metric</th><th width="50%">Description</th></tr>
</thead>
<tr>
<td markdown="span">~query</td>
<td>~query.requests</td><td>Counter tracking the number of queries a user made.</td></tr>
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
<td markdown="span">~collector(*)</td>
<td markdown="span">~collector.points.reported, ~collector.histograms.reported</td>
<td markdown="span">Valid metric points or histogram points reported from the collector to Wavefront. This is the billing metric that customers can look up on their system dashboard. </td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.valid, ~collector.histograms.valid</td>
<td markdown="span">Valid metric points or histogram points received by the collector.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.batches, ~collector.histograms.batches</td>
<td markdown="span">Number of batches of points or histogram points received by the collector, either via the proxy or via the direct ingestion API</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.undecodable, ~collector.histograms.undecodable</td>
<td markdown="span">Points or histogram points that the collector receives but that the collector cannot report to Wavefront because the points are not in the right format.</td></tr>

</tbody>
</table>

(*) The collector is in the Wavefront cloud and comes after the agents and proxies.


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

See [Alert Dependencies](/alerts_dependencies.html) for additional information on fine-tuning your alerts using internal metrics.

### Understanding System Activity

The three `~metric.new_*` internal metrics allow you to discover if a recent change to the system might have caused the problem. These metrics can show you if Wavefront recently received points that don't fit the usual pattern of the metrics that Wavefront received from you. For example, assume you just used the Kubernetics integration to add a cluster to your Wavefront instance. The integration will start sending data from all hosts in the cluster. If you create point tags, they will also be sent for each host, potentially creating a bottleneck.

Each metric includes the metric name, customer, any tags, and the source or host. The three internal metrics allow you to find out information about 3 aspects of the metric.
* `~metric.new_metric_ids` shows metrics that Wavefront hasn't seen before in the metric namespace.
* `~metric.new_string_ids` shows point tags that Wavefront hasn't seen before, as strings.
* `~metric.new_host_ids` shows hosts, that is, the sources for the metrics, that Wavefront hasn't seen before.


### Find Users Who Caused Bottlenecks

 `~query.requests` returns information about queries and the associated user. It helps you examine whether one of your users stands out as the person who might be causing the performance problem. Often, new users unintentionally send many queries to Wavefront, especially if they use the API for the queries. The results can become difficult to interpret, and system performance might suffer.

## Examining Sample Point Ingestion and New IDs

Your Wavefront instance includes an HTTP endpoint that allows you to answer questions like the following:
* Show me metrics ingested that starts with X
* What is the pps for hosts under prefix Y
* What are metrics that are tagged with K=V
* Show me new metrics (metrics that the system hasn't seen before)
* Show me new sources
* Show me new point tags (K=V)

Because the endpoint hits a single back-end, the call returns only what a single ingestion shard sees, even with 100% sampling.

Note: Direct Data Ingestion permission is required to use these endpoints.

### Examining Points

To examine the sample points ingested, go to    `https://<cluster>.wavefront.com/api/spy/points`

The page displays:
* A header that details what is being examined.
* A divider
* The results in close to real time (as soon as they are available)

You can use the following parameters in the request:

|**Parameter**|**Description**|
|metric| Display only a metric line with a metric matching the given prefix|
|host| Display only a metric line with a host matching the given prefix  |
|pointTagKey|Display only a metric line with a point tag key (this can be repeated multiple times on the query, e.g. `points?pointTagKey=env&pointTagKey=colo)`
|sampling|0 to 1, with 0.01 being 1%|

For example, if you have a Wavefront instance named `ex1`, you can use the following query URLs.

<table>
<tbody>
<thead>
<tr><th width="25%">Ingestion Metric of Interest</th><th width="75%">Query</th></tr>
</thead>
<tr>
<td>Show all ingested metrics that begin with <code>cpu</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/points?metric=cpu</code>
</td>
</tr>
<tr>
<td>Show all metrics with the point tag <code>env</code> and <code>loc</code>.</td>
<td><pre>http://ex1.wavefront.com/api/spy/points?pointTagKey=env&pointTagKey=loc</pre>
</td>
</tr>
<tr>
<td>Show all ingested metrics for a host prefixed <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/points?host=web1</code>
</td>
</tr>
</tbody>
</table>


### Examining New IDs

ID assignments happen each time the system sees a metric, a host, or the entire <code>key=value</code> string of a point tag. To examine new IDs created by the system, go to `https://<cluster>.wavefront.com/api/spy/ids`

The page displays:
* A header that details what is being examined.
* A divider.
* The results in close to real time (as soon as they are available)

You can use the following parameters in the request:

|Parameter| Description|
|type|  METRIC, HOST, or STRING. STRING shows point tags. Each point tag, e.g. `env=prod` is a single string. |
|name| Prefix for the item that you are interested in|
|sampling| 0 to 1, with 0.01 being 1%|

For example, if you have a Wavefront instance named `ex1`, you can use the following query URLs.

<table>
<tbody>
<thead>
<tr><th width="35%">Ingestion Metric of Interest</th><th width="65%">Query</th></tr>
</thead>
<tr>
<td>See ID assignments for metrics prefixed by <code>cpu</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=METRIC&name=cpu</code>
</td>
</tr>
<tr>
<td>See ID assignments for point tag key and values prefixed by <code>loc=palo</code>. </td>
<td><pre>http://ex1.wavefront.com/api/spy/ids?type=&name=loc%3Dpalo</pre>
</td>
</tr>
<tr>
<td>See ID assignments for hosts prefixed by <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=HOST&name=web1</code>
</td>
</tr>

</tbody>
</table>
