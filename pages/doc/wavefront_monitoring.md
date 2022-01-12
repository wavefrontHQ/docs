---
title: Monitor Your Wavefront Service
keywords: administration
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring.html
summary: Monitor and troubleshoot your Wavefront instance and see points per second information.
---

You can use the Wavefront Usage integration dashboards to:
* Get usage information for your Wavefront instance and Wavefront proxy.
* Drill down into the metrics namespaces to discover trends.
* Examine the points per second (PPS) based on predefined ingestion policies.
* See whether the ingested metrics are at 95% of committed rate. Optionally, get alerts if that happens.

In addition, you can create your own dashboards, charts, and alerts by using the [internal metrics](wavefront-internal-metrics.html) to investigate the problem.

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
  - `~query.metrics_scanned`, the per-second rate at which metrics are being queried through dashboards, custom charts, derived metrics, or API calls.
  - `~query.spans_scanned`, the per-second rate at which spans are being queried through dashboards, custom charts, or API calls.
  - `~query.histograms_scanned`, the per-second rate at which histograms are being queried through dashboards, custom charts, derived metrics, or API calls. 


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
   * Finally, if you suspect that much of your usage comes from certain accounts (user or service accounts) consider setting up one or more ingestion policies. With these policies in place, each account cannot consume more than the rate that is preset in the policy.


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


Our Customer Success Team has put together KB articles that drill down into adoption info.
* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Identify Unused Data](https://help.wavefront.com/hc/en-us/articles/360058084372-How-to-Identify-Unused-Data).
* [How to Optimize Your Ingestion Rate PPS](https://help.wavefront.com/hc/en-us/articles/360057995092-How-to-Optimize-Your-Ingestion-Rate-PPS-).
