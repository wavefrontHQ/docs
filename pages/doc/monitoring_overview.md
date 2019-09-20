---
title: Monitor Cluster Health and Usage
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: monitoring_overview.html
summary: Understand which Wavefront tools help you monitor your cluster
---

Wavefront supports high cardinality and allows you, for example, to [monitor hundreds of thousands of Kubernetes containers](https://www.wavefront.com/wavefront-for-vmworld-us-2019/). It's still possible, however, that queries take a long time or result in a high PPS points-per-second rate. Reasons include how you send data to Wavefront or query syntax.

Users of dashboards and charts don't usually need to worry about this. But if you're a developer who is creating new dashboards and charts or a manager who needs to look at the big pictures, you can use several dashboards and tools to find out where improvements are needed.


## How Developers Monitor Cluster Health

Developers can contribute to cluster health as follows:

1. When sending data to Wavefront, consider [Wavefront data format best practices](wavefront_data_format.html#wavefront-data-format-best-practices), for example.
* Make the metrics the most stable part of your data.
* Keep the number of distinct time series and host under 1000.

2. In queries, use aggregations, filters, and topk() or bottomk() to avoid problems with charts that take a long time or even time out.

3. To check whether your queries might be exceptionally slow, check the [**Slow Queries** dashboard](wavefront_monitoring.html#examine-slow-queries)

## How Administrators Monitor Cluster and Proxy Status

Each Wavefront customer has one or more Ops team members who install the Wavefront proxy and perform user and group management. Those Wavefront administrators might also set up integrations or perform similar tasks for the rest of the team.

Administrators are usually interested in usage data at all levels.

1. View the [proxy information](monitoring_proxies.html) on the system dashboard. Development environments have only one proxy, but larger environments or production environments rely on a team of load-balanced proxies, as discussed by Clement Pang in [this video about proxies](https://youtu.be/Lrm8UuxrsqA).
    Having usage data for the proxy helps administrators during installation and also helps with proxy sizing later.
2. View the [cluster usage information](wavefront_monitoring.html) to see cluster health data. Wavefront monitors your clusters and might get in touch if, for example, you're projected to need more PPS going forward. But it's even better if administrators can keep an eye on cluster health, for example, to see whether a recently added integration adds significant load to the cluster.
3. Create custom charts with internal metrics. Our system dashboard information is a great start, but you might benefit from other [internal metrics](wavefront_monitoring.html#using-internal-metrics-to-optimize-performance) and it's easy to create a dashboard with custom charts.
   **Note**: The internal metrics that are listed in the documentation are most useful for customers. Many of the other internal metrics return results that are difficult to interpret.

## How Managers Monitor Cluster Health and Usage

Managers are interested in cluster health to ensure that they're aware if the consumption of contracted resources is increasing in an unexpected fashion.

Managers can start by using the System dashboard and internal metrics, discussed above. In addition, Wavefront allows you to look closedly at data that is being ingested, either by examining endpoints with [Wavefront Spy]() or by using the keyboard-driven [Wavefront Top]() tool that's available on github.

* **Wavefront `spy`** endpoints can provide insight into new data that is being ingested by your Wavefront instance. For example, you might analyze spy results to:
  * Verify that your Wavefront instance is ingesting the data points that you expect.
  * Troubleshoot a sudden change in the rate at which new data is ingested.

* [**Wavefront Top**](https://github.com/wavefrontHQ/wftop) is an interactive tool for exploring the live metric ingestion data shape and to explore which metric namespaces were used in the last X days. Watch [this video]() for an intro.

<!--- Discuss new Ingestion Policies here --->
