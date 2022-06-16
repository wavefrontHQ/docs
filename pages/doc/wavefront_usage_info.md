---
title: Improve PPS and Prevent Overage
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage_info.html
summary: Find actionable usage information and learn how to improve PPS.
---

How much your company pays for using Tanzu Observability by Wavefront depends on PPS (point per second). What you pay is based on data throughput, primarily:
* **Data ingestion**. When the Wavefront service ingests data, those data count toward your PPS allocation.
* **Data analysis**. When you run a query, either as part of an alert or when you look at a dashboard, the backend has to process the data, and those data points count toward your PPS allocation.

This page helps you get value from your PPS and avoid overage (overage is an extra fee that customers with certain contracts have to pay if they consume more data than they paid for).

## Where Do I Start?

Each customer has a contract with VMware that allows them to send a predetermined amount of data, measured in points per second (PPS) to their Wavefront instance.

If the customer uses more than the contracted rate, VMware bills for those additional data. Because VMware has to pay the cloud provider for data consumed by each Wavefront instances, we have to ensure that customers pay for the data they consume. But we want for you to get the largest amount of useful information possible from your data. This page has some tips.

### How Do Find Usage Information?

Your Wavefront instance includes dashboards and charts that help you determine how close you are to your contracted rate and to explore remediation options.

<table style="width: 100%;">
<tbody>
<tr>
<td>If you're a SuperAdmin and you want to know close you are to exceeding your committed rate and whether you will be billed for overages, you can use the <a href="examine_usage.html">Usage Summary dashboard</a>.
<ol>
<li>Click the gear icon and select <strong>Usage Portal</strong></li>
<li>Examine the charts on the dashboard. </li>
</ol> </td>
<td width="50%"><img src="/images/usage_overview.png" alt="screenshot of usage summary dashboard"></td></tr>
<tr>
<td>If you want to drill down into usage information, you can examine dashboards in the <strong>Wavefront Usage</strong> integration. Your contract with VMware determines which dashboard has the information you need:
<ul><li><strong>Burndown</strong>: If you prepaid, the <strong>Usage (PPS) vs Remaining Balance (PPS P95) for Burndown</strong> has the information you need.</li>
<li><strong>Billable</strong>: Otherwise, the <strong>Committed Rate vs Monthly Usage (PPS P95) for Billable</strong> dashboard has the information you need. </li>
</ul></td>
<td width="50%"><img src="/images/wavefront_usage_all_dashboards.png" alt="screenshot of the 5 Wavefront usage dashboards"></td>
</tr>
</tbody>
</table>

### How Can I Make Improvements?

<table>
<tbody>
<thead>
<tr><th width="25%">Action Item</th><th width="50%">Description</th><th width="25%">More Info</th></tr>
</thead>
<tr>
<td><strong>Ingest only data that you use</strong></td>
<td>If some teams send a lot of data but don't use those ingested data anywhere (e.g. in alerts, dashboards, etc.) your PPS rate is high but you don't benefit.
</td>
<td><a href="#whos-responsible-for-ingested-data">Who's Responsible for Ingested Data?</a></td>
</tr>
<tr>
<td><strong>Find areas with high PPS and take action</strong> </td>
<td>Your PPS becomes high if you send high cardinality data and if you scan a lot of data during query processing. Query processing happens:
<ul><li>When a dashboard renders data.</li>
<li>When an alert is checked.</li></ul>
</td>
<td><a href="#how-can-i-optimize-my-ingestion-rate">How can I optimize my ingestion rate?</a>
<a href="#how-can-i-optimize-my-scan-rate">How can I optimize my scan rate?</a>
</td>
</tr>
<tr>
<td><strong>Remedy high PPS</strong> </td>
<td>To remedy high PPS, you can optimize the data shape that you ingest, be smart about queries, and ensure optimal dashboard performance, for example, by limiting the time window in charts, using filters, and more.
</td>
<td><a href="optimize_data_shape.html">Optimizing the Data Shape to Improve Performance</a><br>
<a href="query_language_performance.html">Optimize Query Performance</a><br>
<a href="ui_dashboards.html#ensure-optimal-dashboard-performance">Ensure Optimal Dashboard Performance</a></td>
</tr>
<tr>
<td><strong>Find teams with high PPS</strong> </td>
<td>If several teams use the Wavefront service, explore which team sends in most data.
</td>
<td><a href="#whos-responsible-for-ingested-data">Who's Responsible for Ingested Data?</a></td>
</tr>
</tbody>
</table>



## How Can I Optimize My Ingestion Rate?

Billing for Tanzu Observability is based primarily on the ingestion rate, so it's a good practice to look for ways to optimize and reduce your ingestion rate.

### Examine Ingestion with the Namespace Usage Explorer

The **Wavefront Namespace Usage Explorer** dashboard can help you pinpoint where data are coming from.
1. Log in to your Wavefront instance.
2. In the toolbar, select **Integrations**, and click the **Wavefront Usage** integration.
3. Select the **Dashboards** tab and then the **Wavefront Namespace Usage Explorer** dashboard.

This dashboard provides not only a current view but also a historical view. Start at the level 1 namespace to identify the top level. Then dive into levels 2 and 3 for finer-grained information to answer these questions:
* How many different namespaces do I have at each level?
* What are my top namespaces?
* Which are the top 10 metric namespaces and trends over time at each level?

The screenshot below shows an example from our demo server. The data are prefixed with the data source. In the pie chart, we can see that the top namespaces include `pcf` and `kubernetes`.

![Metrics namespace dashboard screenshot](images/metrics_namespace_dashboard.png)

The Namespace Usage Explorer is especially useful if your metrics use hierarchical name spaces of up to 3 levels that identify who sends which metrics. For example, some of our customers use namespaces that show the Business Unit (Level 1), team (Level 2), and data source. For example, you might have `monitoring.dev.kubernetes` and `monitoring.sales.kubernetes` for Kubernetes data coming from the dev and sales time in the monitoring Business Unit.


### (Optional) Clone Namespace Explorer and Create Custom Charts

If you don't see the information you need, for example if need to look at histogram ingestion, clone the **Namespace Usage Explorer** dashboard and modify existing charts or create custom charts. You can use `cs()`, `hs()` and `spans()` queries to retrieve information about counters, histograms, and spans. For example, the default dashboard examines `~metric` information, but you can also examine other data using the following format:

```
cs(~<data_type>.global.namespace.<namespace>.pps, source=<depth_number>)
```

Here's an example query that returns the top 10 Level 1 metrics:

```
rawsum(align(1m, taggify(cs("~metric.global.namespace.*.ppm", source="depth_1"), metric, Name, 3)), Name) / 60
```

{% include tip.html content="The default delimiter for namespaces is a period. [Contact Support](wavefront_support_feedback.html#support) to request a custom delimiter." %}

### Drill Down with Wavefront Top and Wavefront Spy API

If you need more than 3 levels of namespaces or if the dashboard doesn't answer your questions for other reasons, Wavefront Top and the Spy API show in detail what’s happening right now.
* [Wavefront Top](https://github.com/wavefrontHQ/wftop) supports metrics and IDs.
* The [Wavefront Spy API](wavefront_monitoring_spy.html) also supports delta counters, histograms, spans, and span logs.

With Wavefront Top you can:
* Dive into deeper levels of the namespace than with the Namespace Explorer dashboard.
* View ingestion rate by source, point tag, or ingestion source.
* See what percentage of currently ingested data within a namespace is actually accessed in queries over X days. The number of days defaults to 7 and is configurable.
* See what range of values is sent in for a particular namespace.
* See the data lag for a particular namespace.

{% include tip.html content="You cannot see the information over time from Wavefront Top. Use one of the Wavefront Usage dashboards instead if possible." %}

The [Wavefront Spy API](wavefront_monitoring_spy.html) gives even more detail, but in most cases Wavefront Top is sufficient.

### Consider Sending Data Less Frequently

Even though Tanzu Observability supports second-level granularity for metric data points,  data rarely needs to be that granular.

* If some data does not need to be that granular, there can be significant savings just by increasing the interval at which that data reports. For example, switching from a 1-second interval to a 1-minute interval results in a 60x reduction in the ingestion rate for that set of data.

* Another area to explore for adjusting reporting intervals is *constant values*. Values that do not change often are great candidates for increasing reporting intervals.

    You can use [Wavefront Top](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy) to uncover constant values. The *Range* column shows the range of the reported values (the maximum value minus the minimum value) for each namespace.

    - If the range is *0*, then this data set is most likely reporting constant values.

    - If the range does not change, it is also possible that only a few fixed values are reported and the data set can also be a candidate for increased reporting intervals.


## How Can I Optimize My Scan Rate?

Each time a query is executed, the points that the query engine looks at are counted toward your PPS.
* If you examine a dashboard, all queries on the dashboard are executed. What precisely that means for your PPS depends in part on the time window the dashboard uses.
* When an alert is checked, the alert queries are executed.

If you ensure that your environment doesn't include unused dashboards or alerts, you can significantly improve your scan rate.

<table>
<tbody>
<thead>
<tr><th width="25%">Action Item</th><th width="50%">Details</th><th width="25%">Links & Examples</th></tr>
</thead>
<tr>
<td><strong>1. Use Namespace Explorere to see which metrics are ingested.</strong></td>
<td><ul><li>The <strong>Wavefront Namespace Usage Explorer</strong> dashboard, which is part of the <a href="system.html">Wavefront Usage integration</a>, gives details on a per-namespace basis. For example, you could check how much data comes from the <code>kubernetes</code> namespace, then drill down and examine, for each level, if those are data you need.</li>
<li>The <a href="metrics_managing.html#metrics-browser">Metrics Browser</a> lets you examine non-obsolete metrics and metric namespaces.
</li></ul>
</td>
<td><a href="#examine-ingestion-with-the-namespace-usage-explorer">Examine Ingestion with the Namespace Usage Explorer</a></td>
</tr>
<tr>
<td><strong>2. Use Wavefront Top to see which metrics are used.</strong> </td>
<td markdown="span">[Wavefront Top](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy) lets you examine which ingested metrics are accessed during the last lookback period. <br><br>

The default lookback period is 7 days but you can configure it up to 60 days. The *PPS* column shows the ingested rates, and the *%Acc.* column shows the percentages of the ingested rates that are accessed by queries.
<br><br>
Start with the namespaces that have high ingestion rates but low access rates. Drill down the namespaces to found out the metrics with access rates of *0%*.
</td>
<td><a href="#drill-down-with-wavefront-top-and-wavefront-spy-api">Drill Down with Wavefront Top and Wavefront Spy API</a></td>
</tr>
<tr>
<td><strong>3. Use the Wavefront API to compare ingested and accessed metrics.</strong> </td>
<td>Create a script that uses the <a href="wavefront_api.html#notes-on-the-access-category">Access API category</a> to check how often an entity has been accessed. Supported entities are metrics, histograms, and spans. The default lookback period is 7 days but you can configure it up to 60 days.<br><br>
Start with metric namespaces that contribute the most to the overall ingestion rate.
<ol><li>Create a script to determine all of the metric names within those namespaces.</li>
<li>Feed each of those metric names to the Access API. Focus on specific namespaces one at a time to avoid overload and get actionable information.</li></ol>
<strong>Tip</strong>: There is an underlying (undocumented) API that the <a href="metrics_managing.html#metrics-browser">Metrics Browser</a> uses. To take advantage of that API, use your browser's developer tools to see the underlying API calls.
</td>
<td><a href="wavefront_api.html#notes-on-the-access-category">Access API category</a></td>
</tr>
<tr>
<td><strong>4. Examine metrics usage in queries with the Dashboard browser and Alerts browser.</strong> </td>
<td>Use the dashboards browser and alerts browser to examine metrics usage.
<ol><li>Determine all of the metric names within a namespace.</li>
<li>Check whether each metric name is included in any chart query for all dashboards and whether it is included in any condition query for all alerts.</li></ol>
<strong>Note</strong>: There's a chance that some metrics are queried only in ad hoc charts, but it's likely that important data is also used in dashboards and alerts.
</td>
<td>TBD</td>
</tr>
<tr>
<td><strong>5. Improve query performance.</strong> </td>
<td>You can significantly reduce the load on the query engine by changing your query. For example, use filters to minimize the search space, include a time window with certain operations, and more.
</td>
<td><a href="query_language_performance.html">Optimize Query Performance</a><br>
<a href="ui_dashboards.html#ensure-optimal-dashboard-performance">Ensure Optimal Dashboard Performance</a></td>
</tr>
<tr>
<td><strong>6. Consider using histograms to improve PPS</strong> </td>
<td>Histograms store data as distributions rather than as individual data points. For billing purposes, the rate of distributions ingested is converted to a rate of points ingested through a conversion factor, 7 by default.<br><br>
</td>
<td>See <a href="proxies_histograms.html#how-histograms-can-improve-pps">How Histograms Can Improve PPS</a> for an example.</td>
</tr>
</tbody>
</table>

## Who's Responsible for Ingested Data?

When you want to find out which teams are using the most data, you several these options.
<table>
<tbody>
<thead>
<tr><th width="25%">Action Item</th><th width="50%">Details</th><th width="25%">Links & Examples</th></tr>
</thead>
<tr>
<td><strong>1. Use Ingestion Policies</strong>. </td>
<td markdown="span">Create an [ingestion policy](ingestion_policies.html) for each team and monitor the usage per team.
</td>
<td><a href="monitoring_overview.html">Finding Ingestion and Query Problems</a></td>
</tr>
<tr>
<td><strong>2. Examine Ingestion with the Namespace Usage Explorer</strong> </td>
<td markdown="span">If many teams in your company use Wavefront, it's good practice to have a policy that includes the team name in each ingested data point. You can then easily determine which teams ingest a lot of data.
</td>
<td><a href="ingestion_policies.html#examine-usage">Examine Usage with Ingestion Policies</a></td>
</tr>
</tbody>
</table>

## FAQs About PPS

<table>
<tbody>
<thead>
<tr><th width="25%">You want to know...</th><th width="40%">You can...</th><th width="35%">For Example</th></tr>
</thead>
<tr>
<td>What are usage trends for my instance? </td>
<td>Use the dashboard on the <strong>Wavefront Ingestion Policy Explorer</strong> dashboard or the dashboards in the <strong>Wavefront Usage</strong> integration.
</td>
<td markdown="span">![data ingestion points](images/data_ingestion_usage.png)</td>
</tr>
<tr>
<td>Who is responsible for high usage? </td>
<td>Use the <strong>Wavefront Ingestion Policy Explorer</strong> dashboard in the <strong>Wavefront Usage</strong> integration to drill down into accounts and find the accounts responsible for the high ingestion.</p>
<p>Use the <strong>Wavefront Namespace Usage Explorer</strong> dashboard in the <strong>Wavefront Usage</strong> integration to drill down into namespaces and find where the ingested data is coming from.</p>
</td>
<td markdown="span">![usage by account](images/usage_by_account.png)<br>
![Top 10 Level 1 Metric Namspaces](images/namespace_explorer.png)</td>
</tr>
<!---
<tr>
<td>How close am I to my committed limit?</td>
<td>
Use the <a href="examine_usage.html"><strong>Usage Summary</strong></a> dashboard on the <strong>Usage and Ingestion Policies</strong> page to see information about the projected overage and whether you exceed your committed rate.
<p>Depending on your contract type, use the <strong>Committed Rate vs Monthly Usage (PPS P95) for Billable</strong> or the <strong>Usage (PPS) vs Remaining Balance (PPS P95) for Burndown</strong> dashboard. Consider cloning and customizing this dashboard and adding alerts.</p></td>
</tr>
--->
<tr>
<td>What are current usage details?</td>
<td>Start with the dashboards in the <strong>Wavefront Usage</strong> integration. The dashboards allow you to look at both current usage and usage over time. If you need to drill down more, use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">Wavefront Top GUI</a> for a detailed view of <strong>current</strong> spikes. </td>
<td markdown="span">![Data Scan by User, with hover showing users](images/data_scan_by_user.png)</td>
</tr>
<tr>
<td>Why do I have cardinality problems?</td>
<td>If you know there's been a spike in data (for example, an ID burst), you can use Wavefront Top or the <a href="wavefront_monitoring_spy.html">Wavefront Spy utility </a> to drill down into individual data points and tag values. </td>
<td markdown="span">![example screenshot from wftop Github page](images/wftop_small.png)</td>
</tr>
<tr>
<td>How much data is coming from my source?</td>
<td>You have several options:<ol><li>Use the <a href="sources_managing.html#examine-sources-in-the-source-browser">Source Browser</a> for a first look.</li>
<li>Look at the last section in the Wavefront Service and Proxy Data to see the top sources listed by PPS. </li>
<li>Use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">Wavefront Top GUI</a> to filter by source and examine what's coming from the selected source.</li></ol> </td>
<td markdown="span">![Sources rate screenshot](images/top_sources.png) </td>
</tr>
</tbody>
</table>

## Learn More!
