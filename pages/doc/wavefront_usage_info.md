---
title: Find Actionable Usage Information
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage_info.html
summary: Monitor usage info for your Wavefront instance.
---

Wavefront includes tools and dashboards for examining usage. This page helps administrators learn how much data is coming in, who is sending the data, and how to get alerted if ingested data get close to monthly usage.

{% include tip.html content="This page intentionally doesn't explain the order in which you might use our tools because we've found that different users prefer different tools." %}


* Dig deep into the data that are flowing with Spy and its Wavefront Top GUI.
* Use the dashboards in the **Wavefront Usage** integration as is to see what's going on. Clone and customize those dashboards to fine-tune them for your environment.


## Why Is Usage Information Important?

Each customer has a contract with VMware that determines the amount of data that they can send to the Wavefront instance. That is, billing depends entirely on the points per seconds (PPS) that the customer sends.

If the customer uses more than the contracted rate, VMware bills for those additional data. Because VMware has to pay the cloud provides for data consumed by the Wavefront instances, we have to make sure that customers pay for the data they consume. But we're interested in having our customers get the best possible results from their data. Some things to consider.

* If some teams at the customer site send a lot of data to Wavefront but don't use those ingested data anywhere (e.g. in alerts, dashboards, etc.) nobody benefits.
* If several teams at a customer site use Wavefront, it might be of benefit to share the cost across divisions.
* If customers are clear about how they're using the contracted PPS, they can budget well.
  - Learn how different metric types (histograms, metrics, spans, etc.) contribute to the overall ingest rate.
  - Understand how you can be smart about sending only data that are useful for you.

This page explains how you can monitor usage using different tools and dashboard. The information helps you take action before billing becomes a problem.

## How Can I Learn About Ingested Data?

Use the following dashboards and tools:

* Start with the **Wavefront Service and Proxy Usage** dashboard in the **Wavefront Usage** integration. It shows many of the [internal metrics](wavefront_monitoring.html#customize-usage-information-with-wavefront-internal-metrics) and allows you to drill down and examine:
  - Overall ingest rate
  - Ingest rate by [proxy](monitoring_proxies.html)
  - Ingest rate by source via the `~metric.counter` metrics.

* Look at details about *current usage* with [Wavefront Spy API](wavefront_monitoring_spy.html) and related [Wavefront Top GUI](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy). These tools are especially useful if you're experiencing a spike and want to know why.
* Drill down into namespaces and find where the ingested data is coming from with the **Wavefront Namespace Usage Explorer**, dashboard discussed below.
* Find out whether you're getting close to your contracted monthly PPS with the **Committed Rate and Monthly Usage (PPS P95)** dashboard. Consider cloning and customizing this dashboard and adding alerts.

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


## Which Teams Are Responsible for How Much Ingested Data?

We offer several options for exploring which teams are using the most data.

### Wavefront Spy API

The [Wavefront Spy API](wavefront_monitoring_spy.html) and the related Wavefront Top GUI allow you to sample data that your Wavefront instance is currently ingesting. Wavefront Spy supports points, delta counters, histograms, spans, spanlogs, and IDs.

### Namespace Delta Counters

Starting in late 2020, Wavefront has made counters available that let you monitor usage of metrics, counters, histograms, and spans using the following format:

```
cs(~<data_type>.global.namespace.<namespace>.pps, source=<depth_number>)
```
The Namespace Usage Explorer (discussed next) uses these queries. Here's an example query that returns the top 10 Level 1 metrics:

```
rawsum(align(1m, taggify(cs("~metric.global.namespace.*.ppm", source="depth_1"), metric, Name, 3)), Name) / 60
```

A period is the default delimiter. [Contact Customer Success](wavefront_support_feedback.html#support) to request a custom delimiter.

### Namespace Usage Explorer

The **Wavefront Namespace Usage Explorer** can help you pinpoint where data are coming from and can help you answer these questions:
* How many different namespaces do I have at each level?
* What are my top namespaces?
* Top 10 and trends over time at each level

The screenshot below shows an example from our demo server. The data are prefixed with the data source. In the pie chart, we can see that the top namespaces include `pcf` and `kubernetes`

![Metrics namespace dashboard screenshot](images/metrics_namespace_dashboard.png)

Some Wavefront customers have set up the namespaces so they show the Business Unit (Level 1), team (Level 2), and data source. For example, you might have `monitoring.dev.kubernetes` and `monitoring.sales.kubernetes` for kubernetes data coming from the dev and sales time in the monitoring Business Unit.

## How Close Am I To Exceeding My Contracted Rate?

Each Wavefront customer has a contracted rate, but different customers have different contracts. For example, some customers requested hard caps on ingestion and their Wavefront instance is set up that way.

Many customers use the **Committed Rate and Monthly Usage (PPS P95)** dashboard that's part of the **Wavefront Usage** integration helps you determine whether you're getting close to meeting the limit. After the limit is reached Wavefront will still ingest data, but the customer has to pay overage.

The charts in the dashboard show this information:

* Broken down by type
* Hourly rate
* Across tenants
* Includes alert when customers are at, e.g., 95% of contract rate.
