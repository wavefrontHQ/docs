---
title: Finding Ingestion and Query Problems
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: monitoring_overview.html
summary: Understand how Wavefront dashboards and tools help you find problems
---

Wavefront is perfect if you want to monitor lots of hosts or lots of metrics. For example, you can monitor hundreds of thousands of Kubernetes containers. But how well the system performs can still depend on the quality of the input:

* Are the data points you're sending easy to ingest? Too many unique combinations of metric, source, and tag slow down the environment and make it hard to understand what's going on when you look at charts.
* Are you actually using all the data you send in? It's tempting to send all data to Wavefront, and then analyze what seems suitable. But if you examine which data your dashboards and queries actually use, you might be able to get faster query displays and more easily stay within your allocated PPS budget.


## Find Slow Queries and Improve Dashboard Response

You can find queries that are exceptionally slow by checking  the **Slow Query** dashboard.

**To open the Slow Queries Dashboard**:

1. Log in to your Wavefront instance.
2. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Slow Query Dashboard**.

   * The **Overview** tab summarizes slow queries in the system. You can quickly see the number of slow queries, which slow queries failed to complete, and which queries took a long time but eventually completed.

     The dashboard also provides you with the number of slow queries by user. The time window buttons [1h, 12h, 1d] control which slow queries you are viewing.

   * The **Top Slow Queries** tab provides details (timestamp, query type, ts() query, points, etc.) about the slow queries.

     * **Time Taken** shows the time a slow query takes. Queries listed on this page can't return results for more than 5 minutes.
     * **Points Scanned** shows the number of data points that were queried to show the chart on the screen.
     * **CPU Seconds** column shows the amount of time that was spent on processing the query.

   * The **Resource Consumption** tab displays each user that ran a slow query and provides details such as time spent, total points scanned, and total CPU consumed.

And even if a query isn't listed there, there are some guidelines for queries:

1. When sending data to Wavefront, consider [Wavefront data format best practices](wavefront_data_format.html#wavefront-data-format-best-practices), for example:
* Make the metrics the most stable part of your data. For example, don't include a unique ID in each metric.
* Keep the number of distinct combinations of metric, source, and tags under 1000. For example, avoid including a timestamp in your metric. Instead, look at the metric over time in chart.

2. In queries, use filters to narrow down results, and `topk()` or `bottomk()` to limit the number of lines that your charts display.

## Monitor System Usage and Proxy Status

Administrators (and often other team members) are interested in usage data at all levels.

1. Super Admins who install Wavefront proxies can examine the [proxy information](monitoring_proxies.html) on the system dashboard. Larger environments or production environments rely on a team of load-balanced proxies, as discussed by Clement Pang in [this video about proxies](https://youtu.be/Lrm8UuxrsqA).
    Having usage data for the proxy helps administrators during installation and also helps with proxy sizing later.
2. View the points flowing into the system from the [Overall Data Rate section](wavefront_monitoring.html#overall-data-rate) of the Wavefront Service and Proxy Data dashboard.
3. Create custom charts with internal metrics. Our system dashboard information is a great start, but you might benefit from other [internal metrics](wavefront-internal-metrics.html) and it's easy to create a dashboard with custom charts.

   **Note**: We've include the internal metrics that are most useful in the documentation.

## Monitor Data Ingestion and Data Shape

Wavefront recently made some tools available that allow you to monitor ingestion and data shape. By data shape we mean that you can find out, for example, if you have very large numbers of metrics, or you suddenly started having an unusually large number of sources.

You can start by examining the system dashboard and internal metrics, discussed above. In addition, Wavefront allows you to look closely at data that is being ingested:
* Examine endpoints with [Wavefront Spy]()
* Use the keyboard-driven [Wavefront Top]() tool to drill down interactively.

Both tools are for situations when the dashboards don't give you enough information -- they're really for debugging rather day-by-day use.

* **Wavefront `spy`** endpoints can provide insight into new data that your Wavefront instance ingests. For example, you might analyze spy results to:
  * Verify that your Wavefront instance is ingesting the data points that you expect.
  * Troubleshoot a sudden change in the rate at which new data is ingested.

* [**Wavefront Top**](https://github.com/wavefrontHQ/wftop) is an interactive tool for exploring ingested points. For example, you can find out which metric namespaces were used in the last X days. Wavefront Top helps you look at the big picture of what's being ingested -- and the keyboard-driven UI makes it easy to drill down. Watch [this video](https://vmwaretv.vmware.com/media/t/1_yif61rd5) for an intro.

<!--- Discuss new Ingestion Policies here --->
