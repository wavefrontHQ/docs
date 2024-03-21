---
title: Improve PPS Usage and Prevent Overage
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage_info.html
summary: Find actionable usage information and learn how to improve PPS.
---

How much your company pays for using Tanzu Observability (formerly known as VMware Aria Operations for Applications) depends on PPS (points per second) consumption. What you pay is based on data throughput, primarily:
* **Data ingestion**. When the Tanzu Observability service ingests data, those data count toward your PPS allocation.
* **Data analysis**. When you run a query, either as part of an alert or when you look at a dashboard, the backend has to process the data, and those data points count toward your PPS allocation.

This page helps you get value from your PPS and avoid overage. Overage is an extra fee that customers with certain contracts pay if they consume more data than they paid for.

## Where Do I Start?

Each customer has a contract with VMware that allows them to send a predetermined amount of data, measured in points per second (PPS), to their Tanzu Observability instance.

If the customer uses more than the contracted rate, VMware bills for those additional data. Because VMware has to pay the cloud provider for data consumed by each Tanzu Observability instance, we have to ensure that customers pay for the data they consume. But we want for you to get the largest amount of useful information possible from your data. This page has some tips.

### How Do I Find Usage Information?

Your Tanzu Observability instance includes out-of-the-box dashboards and charts that help you determine how close you are to your contracted rate and allow you to explore remediation options.

<table style="width: 100%;">
<tbody>
<tr>
<td>If you want to know how close you are to exceeding your committed rate and whether you will be billed for overage, you can use the <a href="examine_usage.html">Usage Summary dashboard</a>.
<ol>
<li>Click the gear icon in the top right corner and select <strong>Usage Portal</strong>.<br/>
{% include tip.html content="If you are a Super Admin user and enabled Super Admin mode, the menu item is **Usage and Subscriptions**." %}</li>
<li>Examine the charts on the dashboard. </li>
</ol> </td>
<td width="50%"><img src="/images/usage_overview.png" alt="screenshot of usage summary dashboard"></td></tr>
<tr>
<td>If you want to drill down into usage and pricing information, you can examine the dashboards in the <strong>Tanzu Observability Usage</strong> integration. Your contract with VMware determines which dashboard has the information you need:
<ul>
<li><strong>Billable</strong>: Most users need the information on the <strong>Committed Rate vs Monthly Usage (PPS P95) for Billable</strong> dashboard.</li>
<li><strong>Burndown</strong>: A few customers have a burndown billing contract. For those customers, the <strong>Usage (PPS) vs Remaining Balance (PPS P95) for Burndown</strong> has the information they need.</li>
</ul></td>
<td width="50%"><img src="/images/wavefront_usage_all_dashboards.png" alt="screenshot of the 5 Tanzu Observability Usage dashboards"></td>
</tr>
</tbody>
</table>

### How Can I Make Improvements?

You can find information and improve PPS in several ways. The following table gives a summary.

<table>
<tbody>
<thead>
<tr><th width="25%">Action Item</th><th width="50%">Description</th><th width="25%">More Info</th></tr>
</thead>
<tr>
<td><strong>Find areas with high PPS and take action.</strong> </td>
<td>If your Tanzu Observability instance ingests high-cardinality data or if you scan a lot of data during query processing, you'll get high PPS usage. Query processing happens:
<ul><li>When a dashboard renders data.</li>
<li>When an alert is checked.</li></ul>
</td>
<td><a href="#how-can-i-optimize-my-ingestion-rate">How can I optimize my ingestion rate?</a>
<br><br><a href="#how-can-i-optimize-my-scan-rate">How can I optimize my scan rate?</a>
</td>
</tr>
<tr>
<td><strong>Ingest only data that you use.</strong></td>
<td>Datapoints that are sent in contribute to the PPS, so it makes sense to ingest only what's used, to reduce granularity, etc. It might also be necessary to find the teams who send data and don't use it. Ensure that someone benefits from all data that's sent in.
</td>
<td><a href="#how-can-i-optimize-my-ingestion-rate">How can I optimize my ingestion rate?</a> <br><br><a href="#whos-responsible-for-ingested-data">Who's Responsible for Ingested Data?</a></td>
</tr>
<tr>
<td><strong>Remedy high PPS.</strong> </td>
<td>To remedy high PPS consumption, you can optimize the ingestion rate and the data shape.
<ul>
<li>Be smart about queries by using filters and time windows.</li>
<li>Ensure optimal dashboard performance, for example, by limiting the data each chart displays.</li></ul>
</td>
<td><a href="optimize_data_shape.html">Optimizing the Data Shape to Improve Performance</a><br><br>
<a href="query_language_performance.html">Optimize Query Performance</a><br><br>
<a href="ui_dashboards.html#ensure-optimal-dashboard-performance">Ensure Optimal Dashboard Performance</a></td>
</tr>
<tr>
<td><strong>Find teams with high PPS.</strong> </td>
<td>If several teams use the Tanzu Observability service, explore which team sends in most data.
</td>
<td><a href="#whos-responsible-for-ingested-data">Who's Responsible for Ingested Data?</a></td>
</tr>
</tbody>
</table>



## How Can I Optimize My Ingestion Rate?

Billing for Tanzu Observability is based primarily on the ingestion rate. Ingestion is so important because data is ingested again and again. Tanzu Observability supports ingestion every second for metrics. Here's how you can look for ways to optimize and reduce your ingestion rate.

### Examine Ingestion with the Namespace Usage Explorer Dashboard

The **Tanzu Observability Namespace Usage Explorer** dashboard can help you pinpoint where data are coming from.
1. Log in to your service instance.
2. Click **Integrations** from the toolbar, and click the **Tanzu Observability Usage** integration.
3. On the **Dashboards** tab, click the **Tanzu Observability Namespace Usage Explorer** dashboard.

This dashboard provides not only a current view but also a historical view. Start at the level 1 namespace to identify the top level. Then dive into levels 2 and 3 for finer-grained information to answer these questions:
* How many different namespaces do I have at each level?
* What are my top namespaces?
* Which are the top 10 metric namespaces and trends over time at each level?

The screenshot below shows an example from our demo server. The data is prefixed with the data source. In the pie chart, you can see that the top namespaces include `pcf` and `kubernetes`.

![Metrics namespace dashboard screenshot](images/metrics_namespace_dashboard.png)

The **Namespace Usage Explorer** dashboard is especially useful if your metrics use hierarchical name spaces of up to 3 levels that identify who sends which metrics. For example, some of our customers use namespaces that show the Business Unit (Level 1), team (Level 2), and data source. For example, you might have `monitoring.dev.kubernetes` and `monitoring.sales.kubernetes` for Kubernetes data coming from the dev and sales teams in the monitoring Business Unit.


### (Optional) Clone Namespace Explorer and Create Custom Charts

If you don't see the information you need, for example if you need a chart that shows histogram ingestion, [clone](ui_dashboards.html#edit-or-clone-a-dashboard) the **Namespace Usage Explorer** dashboard and modify the existing charts or create custom charts. You can use `cs()` queries to retrieve information about counters, histograms, and spans. For example, the default dashboard examines `~metric` information, but you can also examine counter information using the following format:

```
cs(~<data_type>.global.namespace.<namespace>.pps, source=<depth_number>)
```

Here's an example query that returns the top 10 Level 1 metrics:

```
rawsum(align(1m, taggify(cs("~metric.global.namespace.*.ppm", source="depth_1"), metric, Name, 3)), Name) / 60
```

{% include tip.html content="The default delimiter for namespaces is a period. [Contact Support](wavefront_support_feedback.html#support) to request a custom delimiter." %}

### Drill Down with wftopt and Spy API

If you need more than 3 levels of namespaces or if the dashboard doesn't answer your questions for other reasons, wftop and the Spy API show in detail what’s happening right now.
* [wftop](https://github.com/wavefrontHQ/wftop) lets you examine which ingested metrics were accessed during the last lookback period.
* The [Spy API](wavefront_monitoring_spy.html) also supports delta counters, histograms, spans, and span logs.

With wftop you can:
* Use the *PPS* column to examine ingestion rates.
* Use the *%Acc.* column to examine the percentages of the ingested rates that are accessed by queries.
* Dive into deeper levels of the namespace than with the **Namespace Usage Explorer** dashboard.
* View ingestion rate by source, point tag, or ingestion source.
* See what percentage of currently ingested data within a namespace is actually accessed in queries over X days. The number of days defaults to 7 and is configurable.
* See what range of values is sent in for a namespace.
* See the data lag for a namespace.

{% include tip.html content="You cannot see the information over time from wftop. Use one of the Tanzu Observability Usage dashboards instead if possible." %}

The [Spy API](wavefront_monitoring_spy.html) gives even more detail, but the information in wftop is usually sufficient.


### Consider Sending Data Less Frequently

Even though Tanzu Observability supports per second granularity for metric data points,  data rarely needs to be that granular.

* For data that does not need to be that granular, increase the reporting interval for significant savings. For example, switching from a 1-second interval to a 1-minute interval results in a 60x reduction in the ingestion rate for that set of data.

* Values that do not change often (constants) are great candidates for increasing reporting intervals.

    You can use [wftop](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy) to uncover constant values. The *Range* column shows the range of the reported values (the maximum value minus the minimum value) for each namespace.

    - If the range is *0*, then this data set is most likely reporting constant values.

    - If the range does not change, it is also possible that only a few fixed values are reported. The data set is a candidate for higher reporting intervals.


## How Can I Optimize My Scan Rate?

Each time a query is executed, the points that the query engine looks at are counted toward your PPS.
* If you examine a dashboard, all queries on the dashboard are executed. What precisely that means for your PPS depends in part on the time window the dashboard uses.
* When an alert is checked, the alert queries are executed.

If you ensure that your environment doesn't include unused dashboards or alerts, you can significantly improve your scan rate.

### Examine the Data Scan Rate with the Tanzu Observability Usage Integration

Data points are usually scanned because an alert is checked or a dashboard is displayed or updated. You can get a high-level view in the Tanzu Observability Usage integration.

<table>
<tbody>
<tr>
<td width="60%"><ol><li>Log in to your service instance and click <strong>Integrations</strong> on the toolbar. </li>
<li>Click the <strong>Tanzu Observability Usage</strong> integration.</li>
<li>On the <strong>Dashboards</strong> tab, click the <strong>Tanzu Observability Service and Proxy Data</strong> dashboard. </li>
<li>Examine the <strong>Data Scan Rate</strong> and <strong>Data Scan Rate by User</strong> charts. </li>
<li>Click a chart to temporarily change the chart type (for example to topK) or the query. To permanently modify the chart, clone the dashboard.  </li>
</ol></td>
<td width="40%"><img src="images/data_scan_by_user_2.png" alt="Data scan by user."></td>
</tr>
</tbody>
</table>

**More Info**
* [Monitor Your Service with the Tanzu Observability Usage Integration](wavefront_monitoring.html)
* <a href="#examine-ingestion-with-the-namespace-usage-explorer-dashboard">Examine Ingestion with the Namespace Usage Explorer Dashboard</a>.


### Examine Points Scanned in the Alerts Browser

Even if an alert has no recipients, the alert query is executed at the predefined Alert Checking Frequency (1 minute by default). To significantly reduce the scan rate:
* Delete or snooze all alerts that aren't being used.
* Examine the alert query (or queries) for alerts with high point rates and [optimize query performance](query_language_performance.html) with filters and other strategies.

<table>
<tbody>
<tr>
<td width="70%"><ol><li>Log in to your service instance and from the toolbar select <strong>Alerts &gt; All Alerts</strong>. </li>
<li>To order the display by points scanned, select <strong>Points Scanned</strong> from the menu in the top right.</li>
<li>The alerts are ordered, and each alert shows <strong>Points</strong> below the query.  </li>
<li>For alerts with a high number of points scanned, examine the query and checking frequency to find ways to improve performance. </li>
</ol></td>
<td width="30%"><img src="images/alerts_points_scanned.png" alt="Menu option starts with Default, shows Points Scanned."></td>
</tr>
</tbody>
</table>

### Optimize Query Performance

You can significantly reduce the load on the query engine by changing your query. For example, use filters to minimize the search space, include a time window with certain operations, and more.

**More Info**

* <a href="query_language_performance.html">Optimize Query Performance</a><br>
* <a href="ui_dashboards.html#ensure-optimal-dashboard-performance">Ensure Optimal Dashboard Performance</a>


### Consider Histograms to Improve PPS

Histograms store data as distributions rather than as individual data points. For billing purposes, the rate of distributions ingested is converted to a rate of points ingested through a conversion factor, which is 7 by default.

**More Info**

See <a href="proxies_histograms.html#how-histograms-can-improve-pps">How Histograms Can Improve PPS</a> for an example.

### Use the REST API to Compare Ingested and Accessed Metrics

Create a script that uses the <a href="wavefront_api.html#notes-on-the-access-category">Access API category</a> to check how often an entity has been accessed. Supported entities are metrics, histograms, and spans. The default lookback period is 7 days but you can configure it up to 60 days.<br><br>
Start with metric namespaces that contribute the most to the overall ingestion rate.
<ol><li>Create a script to determine all of the metric names within those namespaces.</li>
<li>Feed each of those metric names to the Access API. Focus on specific namespaces one at a time to avoid overload and get actionable information.</li></ol>
<strong>Tip</strong>: There is an underlying (undocumented) API that the <a href="metrics_managing.html#metrics-browser">Metrics Browser</a> uses. To take advantage of that API, use your browser's developer tools to see the underlying API calls.

**More Info**

<a href="wavefront_api.html#notes-on-the-access-category">Access API category</a>


## Who's Responsible for Ingested Data?

You can find out which teams are using the most data with ingestion policies or from the **Namespace Usage Explorer** dashboard.
<table>
<tbody>
<thead>
<tr><th width="25%">Action Item</th><th width="50%">Details</th><th width="25%">Links & Examples</th></tr>
</thead>
<tr>
<td><strong>Use Ingestion Policies</strong>. </td>
<td markdown="span">Create an [ingestion policy](ingestion_policies.html#create-an-ingestion-policy) for the accounts in each team and monitor the usage per team.
</td>
<td><a href="ingestion_policies.html#examine-the-service-usage-by-ingestion-policy">Examine the Service Usage by Ingestion Policy</a>
</td>
</tr>
<tr>
<td><strong>Examine Ingestion with the Namespace Usage Explorer dashboard</strong>. </td>
<td markdown="span">If many teams in your company use Tanzu Observability, it's good practice to have a policy that includes the team name in each ingested data point. You can then easily determine which teams ingest a lot of data.
</td>
<td><a href="wavefront_monitoring.html#tanzu-observabilitys-namespace-usage-explorer-dashboard">Tanzu Observability Namespace Usage Explorer Dashboard</a></td>
</tr>
</tbody>
</table>

## FAQs About PPS

<table>
<tbody>
<thead>
<tr><th width="25%">You want to know...</th><th width="40%">You can...</th><th width="35%">For example</th></tr>
</thead>
<tr>
<td>What are the usage trends for my instance? </td>
<td>Use the charts on the <strong>Tanzu Observability Ingestion Policy Explorer</strong> dashboard or the dashboards in the <strong>Tanzu Observability Usage</strong> integration.
<p>Examine your overall usage on the <strong>Usage Summary</strong> dashboard. </p>
</td>
<td markdown="span">![data ingestion points](images/data_ingestion_usage.png)</td>
</tr>
<tr>
<td>Who is responsible for high usage? </td>
<td>Use the <strong>Tanzu Observability Ingestion Policy Explorer</strong> dashboard in the <strong>Tanzu Observability Usage</strong> integration to drill down into accounts and find the accounts responsible for the high ingestion.
<br><br>Use the <strong>Tanzu Observability Namespace Usage Explorer</strong> dashboard in the <strong>Tanzu Observability Usage</strong> integration to drill down into namespaces and find where the ingested data is coming from.
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
<td>Start with the dashboards in the <strong>Tanzu Observability Usage</strong> integration and the <strong>Usage Summary</strong> dashboard. The dashboards allow you to look at both current usage and usage over time. If you need to drill down more, use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">wftop GUI</a> for a detailed view of <strong>current</strong> spikes. </td>
<td markdown="span">![Data Scan by User, with hover showing users](images/data_scan_by_user.png)</td>
</tr>
<tr>
<td>Why do I have cardinality problems?</td>
<td>If you know there's a spike in data (for example, an ID burst), you can use wftop or the <a href="wavefront_monitoring_spy.html">Spy utility </a> during the spike to drill down into individual data points and tag values. Those two tools aren't as useful after the spike - use the <strong>Tanzu Observability Usage</strong> integration dashboards instead. </td>
<td markdown="span">![example screenshot from wftop Github page](images/wftop_small.png)</td>
</tr>
<tr>
<td>How much data is coming from my source?</td>
<td>You have several options:<ol><li>Use the <a href="sources_managing.html#examine-sources-in-the-source-browser">Source Browser</a> for a first look.</li>
<li>Look at the last section in the <strong>Tanzu Observability Service and Proxy Data</strong> dashboard to see the top sources listed by PPS. </li>
<li>Use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">wftop GUI</a> to filter by source and examine what's coming from the selected source.</li></ol>
<p>Consider creating an <a href="ingestion_policies.html#create-an-ingestion-policy">ingestion policy</a> for your sources.</p> </td>
<td markdown="span">![Sources rate screenshot](images/top_sources.png) </td>
</tr>
</tbody>
</table>
