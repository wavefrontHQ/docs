---
title: Monitoring Wavefront
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring.html
summary: Monitor and troubleshoot your Wavefront instance and examine version information.
---

If system performance seems to be deteriorating, you can examine your Wavefront instance and Wavefront proxy with the Wavefront system dashboard, and look at internal metrics to investigate the problem.

This page discusses monitoring your Wavefront instance. It includes a section about examining versions of dashboards and alerts. See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details on investigating proxy issues.

## Wavefront Internal Metrics Overview

Wavefront collects several categories of internal metrics. These categories have the following prefixes:

- `~alert*` - set of metrics that allows you to examine the effect of alerts on your Wavefront instance. 
- `~collector` - metrics processed at the collector gateway to the Wavefront instance.
- `~metric` - total unique sources and metrics.  You can compute the rate of metric creation from each source. 
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

A small set of internal metrics can help you optimize performance and monitor your costs. This section highlights some things to look for - the exact steps depend on how you're using Wavefront and on the characteristics of your environment.

Wavefront customer support engineers have found the following metrics especially useful.

<table>
<tbody>
<thead>
<tr><th width="15%">Type</th><th width="40%">Metric</th><th width="45%">Description</th></tr>
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
<td markdown="span">~collector(*)</td>
<td markdown="span">~collector.points.reported, <br> ~collector.histograms.reported, <br>~collector.tracing.spans.reported, <br>
~collector.direct-ingestion.tracing.spans.reported</td>
<td markdown="span">Valid metric points, histogram points, or [trace data (spans)](tracing_basics.html#trace-sampling-and-storage) that the collector reports to Wavefront. This is the billing metric that customers can look up on their system dashboard. </td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.valid, ~collector.histograms.valid</td>
<td markdown="span">Valid metric points or histogram points received by the collector. If the points received by the collector are valid, they are sent to the Wavefront service.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.batches, ~collector.histograms.batches</td>
<td markdown="span">Number of batches of points or histogram points received by the collector, either via the proxy or via the direct ingestion API. In the histogram context a batch is the number of HTTP POST requests.</td></tr>
<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.undecodable, ~collector.histograms.undecodable</td>
<td markdown="span">Points or histogram points that the collector receives but cannot report to Wavefront because the points are not in the right format.</td></tr>
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

## Examine Ingested Data Points

Your Wavefront instance includes an HTTP endpoint that returns a sampling of the ingested data points that have specified characteristics. You can use the returned list of points (typically as input to a script that you write) to answer questions like the following:

* Show me some ingested points with metric names that start with the prefix `Cust`.
* How many pps come from hosts with names that start with the prefix `web`?
* What are some points that are tagged with `env=prod`?

{% include shared/badge.html content="You need [Direct Data Ingestion permission](permissions_overview.html) to use the endpoint." %}

**Note:** You can [examine a sample of ingested spans](#examine-ingested-spans) by using a different endpoint.

### Endpoint and Parameters for Requesting Points

To get a sampling of ingested data points, use the following endpoint. Replace `<cluster>` with the name of your Wavefront instance:

  ```https://<cluster>.wavefront.com/api/spy/points``` 

The page displays a header that describes your request and lists the results, if any, in close to real time (as soon as they are available). Each point is listed on a separate line.

To get a sampling of points with specific characteristics, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="15%">Parameter</th><th width="85%">Description</th></tr>
</thead>
<tr><td markdown="span">metric</td>
<td markdown="span">List a point only if its metric name starts with the specified case-sensitive prefix. <br> E.g., `metric=Cust` matches metrics named `Customer`, `Customers`, `Customer.alerts`, but not `customer`.</td></tr>
<tr><td markdown="span">host</td>
<td>List a point only if its source name starts with the specified case-sensitive prefix. </td></tr>
<tr><td markdown="span">pointTagKey</td>
<td markdown="span">List a point only if it has the specified point tag key. Add this parameter multiple times to specify multiple point tags, e.g., `pointTagKey=env&pointTagKey=datacenter` </td></tr>
<tr><td markdown="span">sampling</td>
<td markdown="span">0 to 1, with 0.01 being 1%. <br> **Note:** Because the endpoint connects to a single Wavefront back-end, data is returned from only a single ingestion shard, even when you request 100% sampling.  </td></tr>
</tbody>
</table>


### Example Requests for Points

Suppose you have a Wavefront instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">To List a Sample of<br>These Points</th><th width="70%">Use This Query URL</th></tr>
</thead>
<tr>
<td markdown="span">Ingested points for any metric. </td>
<td><code>http://ex1.wavefront.com/api/spy/points</code>
</td>
</tr>
<tr>
<td markdown="span">Ingested points with metric names that start with `Cust`. </td>
<td><code>http://ex1.wavefront.com/api/spy/points?metric=Cust</code>
</td>
</tr>
<tr>
<td>Ingested points that have point tags named <code>env</code> and <code>loc</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/points?pointTagKey=env&pointTagKey=loc</code>
</td>
</tr>
<tr>
<td>Ingested points from a source whose name starts with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/points?host=web1</code>
</td>
</tr>
</tbody>
</table>

## Examine Ingested Spans

Your Wavefront instance includes an HTTP endpoint that returns a sampling of ingested spans with specified characteristics. You can use the returned list of spans (typically as input to a script that you write) to answer questions like the following:

* Show me some ingested spans with names that start with the prefix `order`.
* How many spans-per-second come from hosts with names that start with the prefix `web`?
* What are some spans that are tagged with `cluster` or `shard`?

{% include shared/badge.html content="You need [Direct Data Ingestion permission](permissions_overview.html) to use the endpoint." %}

**Note:** You can [examine a sample of ingested points](#examine-ingested-points) by using a different endpoint.

### Endpoint and Parameters for Requesting Spans

To get a sampling of ingested spans, use the following endpoint. Replace `<cluster>` with the name of your Wavefront instance:

  ```https://<cluster>.wavefront.com/api/spy/spans```


The page displays a header that describes your request, and lists the results, if any, in close to real time (as soon as they are available). Each span is listed on a separate line.

To get a sampling of spans with specific characteristics, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="15%">Parameter</th><th width="85%">Description</th></tr>
</thead>
<tr><td markdown="span">name</td>
<td markdown="span">List a span only if its operation name starts with the specified case-sensitive prefix. <br> E.g., `name=orderShirt` matches spans named `orderShirt` and `orderShirts`, but not `OrderShirts`.</td></tr>
<tr><td markdown="span">host</td>
<td>List a span only if the name of its source starts with the specified case-sensitive prefix. </td></tr>
<tr><td markdown="span">spanTagKey</td>
<td markdown="span">List a span only if it has the specified span tag key. Add this parameter multiple times to specify multiple span tags, e.g. `spanTagKey=cluster&spanTagKey=shard` </td></tr>
<tr><td markdown="span">sampling</td>
<td markdown="span">0 to 1, with 0.01 being 1%. <br> **Note:** Because the endpoint connects to a single Wavefront back-end, data is returned from only a single ingestion shard, even when you request 100% sampling. 
 </td></tr>
</tbody>
</table>


### Example Requests for Spans

Suppose you have a Wavefront instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">To Get a Sample of <br>These Spans</th><th width="70%">Use This Request</th></tr>
</thead>
<tr>
<td>Ingested spans representing any operation.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans</code>
</td>
</tr>
<tr>
<td>Ingested spans with names that begin with <code>orderShirts</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans?name=orderShirts</code>
</td>
</tr>
<tr>
<td>Ingested spans that have span tags <code>cluster</code> and <code>shard</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans?spanTagKey=cluster&spanTagKey=shard</code>
</td>
</tr>
<tr>
<td>Ingested spans from a host whose name starts with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans?host=web1</code>
</td>
</tr>
</tbody>
</table>


## Examine New IDs

During ingestion, Wavefront assigns a unique ID to each newly added metric name, span name, source name, and <code>key=value</code> string of a point tag or span tag. 

Your Wavefront instance includes an HTTP endpoint that provides a short window into the current stream of new ID assignments. You can use the returned list of ID assignments to see if the data that is currently being ingested has introduced any metrics, sources, spans, or tags that your Wavefront system hasn't seen yet.

{% include shared/badge.html content="You need [Direct Data Ingestion permission](permissions_overview.html) to use the endpoint." %}

### Endpoint and Parameters for Requesting ID Assignments

To get a list of new ID assignments, use the following endpoint. Replace `<cluster>` with the name of your Wavefront instance: 

  ```https://<cluster>.wavefront.com/api/spy/ids```

The page displays a header that describes your request, and lists the results, if any, in close to real time (as soon as they are available). Each ID assignment is listed on a separate line.

To get ID assignments for a specific type of new item, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="15%">Parameter</th><th width="85%">Description</th></tr>
</thead>
<tr><td markdown="span">type</td>
<td>
Type of new items you want to see ID assignments for: 
<ul><li>
METRIC - Each new metric name
</li>
<li>
SPAN - Each new span name
</li>
<li>
HOST - Each new source name
</li>
<li>
STRING - Each new point tag or span tag, represented as a single string containing a unique key-value pair, e.g. `env=prod`, `env=dev`, etc.
</li>
</ul>

</td></tr>
<tr><td markdown="span">name</td>
<td>Case-sensitive prefix for the items that you are interested in. </td></tr>
<tr><td markdown="span">sampling</td>
<td markdown="span">0 to 1, with 0.01 being 1% <br> **Note:** Because the endpoint connects to a single Wavefront back-end, data is returned from only a single ingestion shard, even when you request 100% sampling. </td></tr>
</tbody>
</table>



### Example Requests for New IDs

Suppose you have a Wavefront instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="35%">To Get ID Assignments <br>For These Items</th><th width="65%">Use This Request</th></tr>
</thead>
<tr>
<td>All new metric names, span names, source names, and tags.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids</code>
</td>
</tr>
<tr>
<td>All new metric names.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=METRIC</code>
</td>
</tr>
<tr>
<td>New metric names that start with <code>cpu</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=METRIC&name=cpu</code>
</td>
</tr>
<tr>
<td>New key-value pairs with keys that start with <code>comp</code>. </td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=STRING&name=comp</code>
</td>
</tr>
<tr>
<td>New key-value pairs of the form <code>loc=palo</code>. </td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=STRING&name=loc%3Dpalo</code>
</td>
</tr>
<tr>
<td>New source names that start with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=HOST&name=web1</code>
</td>
</tr>
</tbody>
</table>




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
