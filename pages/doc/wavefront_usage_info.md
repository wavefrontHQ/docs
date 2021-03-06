---
title: Find Actionable Usage Information
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage_info.html
summary: Monitor usage info for your Wavefront instance.
---

Wavefront includes tools and dashboards for examining usage. This page helps administrators learn how much data is coming in, who is sending the data, and how to get alerted if ingested data get close to monthly usage.

* Use the dashboards in the **Wavefront Usage** integration to see what's going on and how usage evolved over time. Zoom in on the timeframe of your choice, or clone and customize one of the dashboards to get the information you need.
* Dig deep into the data that are flowing right now with the [Wavefront Top GUI and with Wavefront Spy](wavefront_monitoring_spy.html).



## Why Is Usage Information Important?

Each customer has a contract with VMware that allows them to send a predetermined amount of data that to their Wavefront instance. That is, billing depends entirely on the points per seconds (PPS) that the customer sends.

If the customer uses more than the contracted rate, VMware bills for those additional data. Because VMware has to pay the cloud provides for data consumed by the Wavefront instances, we have to make sure that customers pay for the data they consume. But we're interested in having our customers get the best possible results from their data. Some things to consider.

* If some teams at the customer site send a lot of data to Wavefront but don't use those ingested data anywhere (e.g. in alerts, dashboards, etc.) nobody benefits.
* If several teams at a customer site use Wavefront, it might be useful to know which team send in most data.
* If customers are clear about how they're using the contracted PPS, they can budget well.
  - Learn how different metric types (histograms, metrics, spans, etc.) contribute to the overall ingest rate.
  - Understand how you can be smart about sending only data that are useful for you.

This page explains how you can monitor usage with predefined dashboards and tools. The information helps you use Wavefront efficiently and take action before billing becomes a problem.

## How Can I Learn About Ingested Data?

<table>
<tbody>
<thead>
<tr><th width="35%">You want to know...</th><th width="65%">You can...</th></tr>
</thead>
<tr>
<td>What are usage trends for my instance? </td>
<td>Use the dashboards in the <strong>Wavefront Usage</strong> integration.
</td>
</tr>
<tr>
<td>Who is responsible for high usage </td>
<td>Use the <strong>Wavefront Namespace Usage Explorer</strong> dashboard in the <strong>Wavefront Usage</strong> integration to drill down into namespaces and find where the ingested data is coming from.
</td>
</tr>
<tr>
<td>How close am I to my billing limit?</td>
<td>Use the <strong>Committed Rate and Monthly Usage (PPS P95)</strong> dashboard. Consider cloning and customizing this dashboard and adding alerts.</td>
</tr>
<tr>
<td>What are current usage details?</td>
<td>Use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">Wavefront Top GUI</a> for a detailed view of where points are coming from. </td>
</tr>
<tr>
<td>Why do I have cardinality problems?</td>
<td>Use the <a href="wavefront_monitoring_spy.html">Wavefront Spy utility </a> to drill down into individual data points and tag values. That helps you find sudden bursts of data (for example too many new IDs). </td>
</tr>
<tr>
<td>How much data is coming from my source?</td>
<td>Use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">Wavefront Top GUI</a> to filter by source and examine what's coming from the selected source.  </td>
</tr>
</tbody>
</table>


## Which Teams Are Responsible for How Much Ingested Data?

When you want to explore which teams are using the most data, follow these exploration steps.

### Step 1: Examine Ingestion with the Namespace Usage Explorer

The **Wavefront Namespace Usage Explorer** dashboard can help you pinpoint where data are coming from.  This dashboard provides not only a current view but also a historical view. Start at the level 1 namespace to identify the top level. Then dive into levels 2 and 3 for finer grained info to answer these questions:
* How many different namespaces do I have at each level?
* What are my top namespaces?
* Top 10 and trends over time at each level

The screenshot below shows an example from our demo server. The data are prefixed with the data source. In the pie chart, we can see that the top namespaces include `pcf` and `kubernetes`

![Metrics namespace dashboard screenshot](images/metrics_namespace_dashboard.png)

The Namespace Usage Explorer is especially useful if your metrics use hierarchical name spaces of up to 3 levels that help identify who sends which metrics. For example, some Wavefront customers use namespaces that show the Business Unit (Level 1), team (Level 2), and data source. For example, you might have `monitoring.dev.kubernetes` and `monitoring.sales.kubernetes` for kubernetes data coming from the dev and sales time in the monitoring Business Unit.

### (Optional) Create Custom Charts with Namespace Delta Counters

If you don't see the information you need, clone the **Namespace Usage Explorer** dashboard and modify existing charts or create custom charts that use delta counters. For example, the default dasbhaord examines `~metric` information, but you can also examine counters, histograms, and spans using the following format:

```
cs(~<data_type>.global.namespace.<namespace>.pps, source=<depth_number>)
```

Here's an example query that returns the top 10 Level 1 metrics:

```
rawsum(align(1m, taggify(cs("~metric.global.namespace.*.ppm", source="depth_1"), metric, Name, 3)), Name) / 60
```

A period is the default delimiter for namespaces. [Contact Customer Success](wavefront_support_feedback.html#support) to request a custom delimiter.

### Step 2: Drill Down Deeper with Wavefront Top and Wavefront Spy API

If you need more than 3 levels of namespaces or there are other reasons why the dashboard doesn't answer your questions, Wavefront Top shows in detail what’s happening right now. Wavefront Top supports points, delta counters, histograms, spans, spanlogs, and IDs. For example, you can:
* Dive into deeper levels of the namespace than with the Namespace Explorer dashboard
* View ingestion rate by source, point tag, or ingestion source
* See what percentage of currently ingested data within a namespace is actually accessed in queries over X days
* See what range of values is sent in for a particular namespace
* See the data lag for a particular namespace.
You cannot see the information over time from Wavefront Top.

The [Wavefront Spy API](wavefront_monitoring_spy.html) gives even more detail, but in most cases Wavefront Top offers sufficient detail.

## How Close Am I To Exceeding My Contracted Rate?

Each Wavefront customer has a contracted rate, but different customers have different contracts. For example, some customers requested hard caps on ingestion and their Wavefront instance is set up that way.

Many customers use the **Committed Rate and Monthly Usage (PPS P95)** dashboard that's part of the **Wavefront Usage** integration helps you determine whether you're getting close to meeting the limit. After the limit is reached Wavefront will still ingest data, but the customer has to pay overage.

The charts in the dashboard show this information:

* Broken down by type
* Hourly rate
* Across tenants
* Includes alert when customers are, for example, at 95% of contract rate.

## Which Metrics Are Ingested But Not Used?

The easiest way to improve Wavefront ingestion rates is to tell your teams to stop sending data that aren't used.

* Use Wavefront Top to examine which percentage of ingested metrics are accessed.
* See which metrics are ingested.
  - The [Metrics Browser](metrics_managing.html) lets you examine metrics and metric namespaces.
  - The **Wavefront Namespace Usage Explorer** dashboard that's part of the [Wavefront Usage integration](system.html) is available on each cluster and gives details on a per-namespace basis.
* See which metrics are accessed.
  - The [`Access` API endpoint](wavefront_api.html#notes-on-the-access-category), introduced in late 2020, provides information on how often an entity has been accessed. Supported entities are metric, histogram, span. Create a script that compares ingested to accessed metrics.
* See which dashboards are not used in the Dashboards browser.

![Dashboard browser with Sort menu](images/dashboard_views.png)
