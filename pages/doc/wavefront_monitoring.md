---
title: Monitor Your Wavefront Service
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring.html
summary: Monitor and troubleshoot your Wavefront instance and see PPS info.
---

You can use the Wavefront Usage integration dashboards to:
* Get usage information for your Wavefront instance and Wavefront proxy.
* Drill down into the metrics namespaces to discover trends.
* Examine PPS (points per second) based on predefined ingestion policies.
* See whether ingested metrics are at 95% of committed rate. Optionally get alerts if that happens.

In addition, you can create your own dashboards, charts, and alerts using internal metrics (discussed below) to investigate the problem.

See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details on investigating proxy usage.

## Learn About Wavefront Usage with Dashboards

The Wavefront Usage integration includes the following dashboards:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Dashboard</th><th width="30%">Focus</th><th width="40%">Description</th></tr>
</thead>
<tr>
<td><strong>Wavefront Service and Proxy Data</strong></td>
<td>Examine <strong>usage data</strong>.</td>
<td>Provides visibility into your use of the Wavefront service via internal metrics that Wavefront collects automatically. Preconfigured charts monitor the data ingestion rate for points, spans, and distributions, the data scan rate, and different proxy metrics.</td></tr>
<tr>
<td><strong>Wavefront Namespace Usage Explorer</strong></td>
<td>Explore metrics namespaces to see the <strong>trend</strong> of your metrics ingestion rate.</td>
<td>Tracks the number of time series metrics received for the first 3 levels of your metric namespace. Also tracks the breakdown of histograms, spans, and delta counters.</td></tr>
<tr>
<td><strong>Wavefront Ingestion Policy Explorer</strong></td>
<td>In environments where ingestion policies are defined, investigate usage for <strong>each account and ingestion policy</strong>.</td>
<td markdown="span">Provides a granular breakdown of Wavefront ingestion across your organization by ingestion policies, accounts, sources, and types. Use this dashboard to identify who is contributing the most to your Wavefront usage and manage your overall usage. You can implement [ingestion policies](ingestion_policies.html) if you see problems in this dashboard.</td></tr>
<tr>
<td><strong>Committed Rate and Monthly Usage (PPS P95)</strong></td>
<td>Avoid <strong>exceeding the committed rate</strong> for your instance by exploring dashboards and creating alerts.
</td>
<td markdown="span">Displays a detailed breakdown of your monthly usage. Enables you to take appropriate action when usage reaches around 95% of your committed usage.</td></tr>

</tbody>
</table>

<!---
* **Wavefront Service and Proxy Data** provides visibility into your use of the Wavefront service via internal metrics that we collect for you automatically. Preconfigured charts monitor the data ingestion rate for points, spans and distributions, the data scan rate, and different proxy metrics.
* **Wavefront Namespace Usage Explorer** tracks the number of metrics received for the first 3 levels of your metric namespace. You can also view the breakdown of histograms, spans and delta counters.
* **Wavefront Ingestion Policy Explorer** provides a granular breakdown of Wavefront ingestion across your organization by ingestion policies, accounts, sources, and types. Use this dashboard to identify who is contributing the most to your Wavefront usage and manage your overall usage. You can implement [ingestion policies](ingestion_policies.html) if you see problems in this dashboard.
* **PPS P95 Usage Dashboard** displays a detailed breakdown of your monthly usage. This enables you to take appropriate action when usage reaches around 95% of your target/committed usage.--->

### Wavefront Service and Proxy Data Dashboard

The Wavefront Service and Proxy Data dashboard helps you find reasons for system slowdown.

The charts show internal metrics information and allow you to examine many aspects of your Wavefront instance. See [Monitoring Wavefront Proxies](monitoring_proxies.html) for details on the **Proxy Health** and **Proxy Troubleshooting** sections.


#### Overall Data Rate

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
- **Data Scan Rate**
  - `~query.summaries_scanned`, the per-second rate at which metrics are being queried through dashboards, custom charts, or API calls.
  - `~query.spans_scanned`, the per-second rate at which spans are being queried through dashboards, custom charts, or API calls.
  - `~query.histograms_scanned`, the per-second rate at which histograms are being queried through dashboards, custom charts, or API calls


#### Wavefront Stats

Charts that track the number of Wavefront users during various time windows, number of dashboards and alerts, and information about the types of alerts.

![wavefront metrics](images/wavefront_metrics.png)

#### AWS Integration

If you have an [AWS integration](integrations_aws_metrics.html) and are ingesting AWS CloudWatch, CloudTrail, and API Metrics+ metrics into Wavefront, this section monitors the count of CloudWatch requests, API requests, the point rate, and events coming in from your integration.

![aws_metric_sections](images/aws_metric_sections.png)

The available metrics for the AWS integration are:

- `~externalservices.cloudwatch.api-requests` - number of CloudWatch API requests.
- `~externalservices.cloudwatch.points`- number of CloudWatch metrics returned.
- `~externalservices.ec2.points` - number of AWS Metrics+ metrics returned.
- `~externalservices.cloudtrail.events` - number of CloudTrail events returned.
- `~externalservices.cloudwatch-cycle-timer` - time in milliseconds CloudWatch requests take to complete.

#### Ingest Rate by Source

This section gives insight into the shape of your data. It shows the total number of sources reporting. It also monitors the rate of metrics creation and breaks it down by source.

![point_rate breakdown](images/point_rate_breakdown.png)

The metrics used in this section are:

- `~metric.counter` - Number of metrics being collected. Does not include internal metrics.

   If you're interested in histogram ingestion by source, clone this dashboard and add a chart that uses the `~histogram.counter` metric.

- `~histogram.counter` - Number of histograms being collected. Does not include internal histogram data.


### Wavefront Metric Namespace Breakdown Dashboard

This dashboard helps you drill down into the metrics namespace and explore the **trend** of your metrics ingestion rate.

Wavefront automatically tracks the number of metrics received for the first 3 levels of your metric namespace as delta counters, which can be queried with `cs(~metric.global.namespace.*)`. The period (`.`) character separates the levels. For example for a metric named disk.space.total.bytes, the first level is disk, the second is space, and the third is total. This dashboard includes chart to explore those metrics and trends.

![screenshot of part of dashboard](/images/metrics_breakdown.png)

### Wavefront Ingestion (PPS) Usage Dashboard

This dashboard helps you investigate Wavefront usage for each user and ingestion policy.

Wavefront supports creation of ingestion policies. You create policies and assign accounts (user or service accounts) to each policy and examine which teams use which part of total ingestion in this Ingestion (PPS) Usage dashboard. You can even drill down and examine usage of individual users.

The dashboard includes a link to the **Ingestion Policies** page so you can create, examine, or modify [ingestion policies](ingestion_policies.html)

![screenshot of part of the dashboard](/images/ingestion_pps_usage_breakdown.png)

### Committed Rate and Monthly Usage (PPS P95) vs. Committed Dashboard

This dashboards helps you monitor your **monthly usage** and ensure that you're not ingesting more PPS than your contracted rate allows.

The dashboard gives a detailed breakdown of your Tanzu Observability monthly usage against commitment. When your usage reaches around 95% of your committed rate, you can then take appropriate action.

For example:
* Examine who is using a high percentage of the PPS in the  **Wavefront Ingestion Policy Explorer** dashboard.
* Implement [ingestion policies](ingestion_policies.html).

{% include note.html content="The information contained in this dashboard has a 24-hour latency."%}

![screenshot of part of the dashboard](/images/p95_dashboard.png)

## Scenario: Avoid Exceeding the Committed Rate

Customers often tell us that they want to make sure they don't exceed their committed monthly PPS (points per second). Follow these steps to monitor usage and take corrective action.

1. The new `Committed Rate and Monthly Usage (PPS P95) vs. Committed` dashboard includes charts that show how close you are to consuming 95% of your contracted rate. You can add alerts to charts in this dashboard to get notifications.
2. If you need to reduce usage, you have several options:
   * Start examining ingestion from the Wavefront Service and Proxy Data dashboard. The [internal metrics](wavefront_monitoring.html#internal-metrics-overview) shown in this dashboard highlight.
   * Use the **Wavefront Namespace Usage Explorer** dashboard to drill down into the metrics. Wavefront automatically tracks the number of metrics received for the first 3 levels of your metric namespace as delta counters, and this dashboard presents the metrics in an easy-to-use way.
   * Finally, if you suspect that much of your usage comes from certain accounts (human or service accounts) consider setting up one or more ingestion policies. With these policies in place, each account cannot consume more than the rate that is preset in the policy.


## Customize Usage Information with Wavefront Internal Metrics

Wavefront collects several categories of internal metrics. They are used extensively in the different dashboards of the Wavefront Usage integration. You can:

* Clone and modify one of the Wavefront Usage integration dashboards.
* Create your own dashboard, query these metrics in charts, and create alerts for these metrics.


### Internal Metrics Overview

We collect the following metrics.

- `~alert*` - a set of metrics that allows you to examine the effect of alerts on your Wavefront instance.
- `~collector` - metrics processed at the collector gateway to the Wavefront instance. Includes spans.
- `~metric` - total unique sources and metrics.  You can compute the rate of metric creation from each source.
- `~proxy` - metric rate received and sent from each Wavefront proxy, blocked and rejected metric rates, buffer metrics, and JVM stats of the proxy. Also includes counts of metrics affected by the proxy preprocessor. See [Monitoring Wavefront Proxies](monitoring_proxies.html).
- `~wavefront` - set of gauges that track metrics about your use of Wavefront.
- `~http.api` - namespace for looking at API request metrics.

If you have an [AWS integration](integrations_aws_metrics.html), metrics with the following prefix are available:

- `~externalservices` - metric rates, API requests, and events from AWS CloudWatch, AWS CloudTrail, and AWS Metrics+.

There's also a metric you can use to monitor ongoing events and make sure the number does not exceed 1000:
- `~events.num-ongoing-events` - returns the number of [ongoing events](events.html#event-states).


### Useful Internal Metrics for Optimizing Performance

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
<td markdown="span">Tracks how often a specified alert performs a check. See [Alert States](alerts_states_lifecycle.html#what-are-alert-states) for details.</td></tr>
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
**Note:** We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.spans.batches` we have `collector.direct-ingestion.spans.batches`.</td></tr>

<tr>
<td markdown="span">~collector</td>
<td markdown="span">~collector.points.undecodable<br> ~collector.histograms.undecodable<br> ~collector.tracing.spans.undecodable<br> ~collector.tracing.span_logs.undecodable</td>
<td markdown="span">Points, histogram points, spans, or span logs that the collector receives but cannot report to Wavefront because the input is not in the right format.<br>
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

If several slow queries are executed within the selected time window the Slow Query page can become long. Section links at the top left allow you to select a section. *The links display only after you have scrolled down the page.*

## Examine Versions of Dashboards and Alerts

Wavefront stores details about each version of each dashboard and each alert. That means you have an audit trail of changes. When someone saves changes to a dashboard or alert, we create a new version and track the changes, including details about the change and the user who made the change.

You can examine dashboard and alert versions from the UI or using the REST API.

**To examine versions of a dashboard:**

1. Select **Browse > All Dashboards**
2. Click the three vertical dots to the left of the dashboard you're interested in and select **Versions**.
3. You can review the changes to the dashboard, revert to a previous version, or clone a previous version.

![dashboard versions](images/dashboard_versions.png)

The process is the same for alerts.

## Learn More!

[Find Actionable Usage Information](wavefront_usage_info.html) explains how to use tools and dashboards to learn how much data is coming in, who is sending the data, and how to get alerted if ingested data get close to monthly contracted usage.


The following KB articles give additional details:
* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata)
* [How to Identify Unused Data](https://help.wavefront.com/hc/en-us/articles/360058084372-How-to-Identify-Unused-Data)
* [How to Optimize Your Ingestion Rate PPS](https://help.wavefront.com/hc/en-us/articles/360057995092-How-to-Optimize-Your-Ingestion-Rate-PPS-)
