---
title: Find Actionable Usage Information
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage_info.html
summary: Monitor usage information for your Wavefront instance.
---

Tanzu Observability by Wavefront includes tools and dashboards for examining usage. This page helps administrators learn how much data is coming in, who is sending the data, how to get alerted if ingested data get close to monthly contracted usage, and how to optimize your ingestion rate.

## Why Is Usage Information Important?

Each customer has a contract with VMware that allows them to send a predetermined amount of data to their Wavefront instance. That is, billing depends on the points per second (PPS) that the customer sends.

If the customer uses more than the contracted rate, VMware bills for those additional data. Because VMware has to pay the cloud provides for data consumed by the Wavefront instances, we have to make sure that customers pay for the data they consume. But we're interested in having our customers get the best possible results from their data.


* **Send data, use data**. If some teams at the customer site send a lot of data but don't use those ingested data anywhere (e.g. in alerts, dashboards, etc.) nobody benefits.
* **Team responsibility**. If several teams at a customer site use the Wavefront service, it might be useful to know which team send in most data.
* **Know PPS and limits**. If customers are clear about how they're using the contracted PPS, they can budget well.
  - Learn how different metric types (histograms, metrics, spans, etc.) contribute to the overall ingest rate.
  - Understand how you can be smart about sending only data that are useful for you.

## How Can I Learn About Ingested Data?

<table>
<tbody>
<thead>
<tr><th width="35%">You want to know...</th><th width="65%">You can...</th></tr>
</thead>
<tr>
<td>What are usage trends for my instance? </td>
<td>Use the dashboard on the <strong>Usage and Ingestion Policies</strong> page, or the dashboards in the <strong>Wavefront Usage</strong> integration. 
</td>
</tr>
<tr>
<td>Who is responsible for high usage? </td>
<td>Use <a href="ingestion_policies.html">ingestion policies</a> and the <strong>Wavefront Ingestion Summary</strong> dashboard for an ingestion policy to investigate which are the top accounts contributing to the ingestion.
<p>Use the <strong>Wavefront Ingestion Policy Explorer</strong> dashboard in the <strong>Wavefront Usage</strong> integration to drill down into accounts and find the accounts responsible for the high ingestion.</p>
<p>Use the <strong>Wavefront Namespace Usage Explorer</strong> dashboard in the <strong>Wavefront Usage</strong> integration to drill down into namespaces and find where the ingested data is coming from.</p>
</td>
</tr>
<tr>
<td>How close am I to my committed limit?</td>
<td>
Use the <a href="examine_usage.html"><strong>Usage Summary</strong></a> dashboard on the <strong>Usage and Ingestion Policies</strong> page to see information about the projected overage and whether you exceed your committed rate.
<p>Depending on your contract type, use the <strong>Committed Rate vs Monthly Usage (PPS P95) for Billable</strong> or the <strong>Usage (PPS) vs Remaining Balance (PPS P95) for Burndown</strong> dashboard. Consider cloning and customizing this dashboard and adding alerts.</p></td>
</tr>
<tr>
<td>What are current usage details?</td>
<td>Start with the <strong>Usage Summary</strong> dashboard on the <a href="examine_usage.html"><strong>Usage and Ingestion Policies</strong> page</a>. You can also investigate the dashboards in the <strong>Wavefront Usage</strong> integration. The dashboards allow you to look at both current usage and usage over time. If you need to drill down more, use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">Wavefront Top GUI</a> for a detailed view of current spikes. </td>
</tr>
<tr>
<td>Why do I have cardinality problems?</td>
<td>If you know there's been a spike in data (for example, an ID burst), you can use the <a href="wavefront_monitoring_spy.html">Wavefront Spy utility </a> to drill down into individual data points and tag values. </td>
</tr>
<tr>
<td>How much data is coming from my source?</td>
<td>You have several options:<ol><li>Use the <a href="sources_managing.html#examine-sources-in-the-source-browser">Source Browser</a> for a first look.</li>
<li>Look at the last section in the Wavefront Service and Proxy Data to see the top sources listed by PPS. </li>
<li>Use the <a href="wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy">Wavefront Top GUI</a> to filter by source and examine what's coming from the selected source.</li></ol> </td>
</tr>
</tbody>
</table>


## Which Teams Are Responsible for How Much Ingested Data?

When you want to find out which teams are using the most data, you can either create an [ingestion policy](ingestion_policies.html) for each team and monitor the usage per team, or you can follow these steps.

### Step 1: Examine Ingestion with the Namespace Usage Explorer

The **Wavefront Namespace Usage Explorer** dashboard can help you pinpoint where data are coming from.  This dashboard provides not only a current view but also a historical view. Start at the level 1 namespace to identify the top level. Then dive into levels 2 and 3 for finer-grained information to answer these questions:
* How many different namespaces do I have at each level?
* What are my top namespaces?
* Which are the top 10 metric namespaces and trends over time at each level?

The screenshot below shows an example from our demo server. The data are prefixed with the data source. In the pie chart, we can see that the top namespaces include `pcf` and `kubernetes`.

![Metrics namespace dashboard screenshot](images/metrics_namespace_dashboard.png)

The Namespace Usage Explorer is especially useful if your metrics use hierarchical name spaces of up to 3 levels that identify who sends which metrics. For example, some of our customers use namespaces that show the Business Unit (Level 1), team (Level 2), and data source. For example, you might have `monitoring.dev.kubernetes` and `monitoring.sales.kubernetes` for Kubernetes data coming from the dev and sales time in the monitoring Business Unit.


### (Optional) Create Custom Charts with Namespace Delta Counters

If you don't see the information you need, for example if need to look at histogram ingestion, clone the **Namespace Usage Explorer** dashboard. You can then modify existing charts or create custom charts. Tanzu Observability supports delta counters that return information about counters, histograms, and spans. For example, the default dashboard examines `~metric` information, but you can also examine other data using the following format:

```
cs(~<data_type>.global.namespace.<namespace>.pps, source=<depth_number>)
```

Here's an example query that returns the top 10 Level 1 metrics:

```
rawsum(align(1m, taggify(cs("~metric.global.namespace.*.ppm", source="depth_1"), metric, Name, 3)), Name) / 60
```

{% include tip.html content="The default delimiter for namespaces is a period. [Contact Customer Success](wavefront_support_feedback.html#support) to request a custom delimiter." %}



### Step 2: Drill Down Deeper with Wavefront Top and Wavefront Spy API

If you need more than 3 levels of namespaces or if the dashboard doesn't answer your questions for other reasons, Wavefront Top and the Spy API show in detail what’s happening right now.
* Wavefront Top supports metrics and IDs.
* The Wavefront Spy API also supports delta counters, histograms, spans, and span logs.

For example, with Wavefront Top you can:
* Dive into deeper levels of the namespace than with the Namespace Explorer dashboard.
* View ingestion rate by source, point tag, or ingestion source.
* See what percentage of currently ingested data within a namespace is actually accessed in queries over X days. The number of days defaults to 7 and is configurable.
* See what range of values is sent in for a particular namespace.
* See the data lag for a particular namespace.

{% include tip.html content="You cannot see the information over time from Wavefront Top. Use one of the Wavefront Usage dashboards instead if possible." %}


The [Wavefront Spy API](wavefront_monitoring_spy.html) gives even more detail, but in most cases Wavefront Top is sufficient.

## How Close Am I to Exceeding My Contracted Rate?

The first thing you would do is to investigate the charts in the [Usage Summary dashboard](examine_usage.html). They can show you how close you are to exceeding your committed rate and whether you will be billed for overages.

Depending on your contract type, the **Committed Rate vs Monthly Usage (PPS P95) for Billable** dashboard or the **Usage (PPS) vs Remaining Balance (PPS P95) for Burndown** dashboard in the Wavefront Usage integration helps you determine whether you’re getting close to meeting the committed usage. For most Wavefront instances, after the committed usage is reached data still keeps flowing into Tanzu Observability, but the customer has to pay overage.

The charts in the dashboards show broad information, including::

* Current usage vs commitment
* Usage of the Wavefront service in terms of PPS per billing period
* Ingestion usage of the Wavefront service in terms of points, histograms, and traces
* Scan usage of the Wavefront service in terms of points, histograms, and edges
* Ingestion and scan rates per billing period
* Last 12 months usage of the Wavefront service.

## Which Metrics Are Ingested But Not Used?

The easiest way to [optimize your ingestion rate](#how-can-i-optimize-my-ingestion-rate) is to send only data that you actually use. The main way to use data is to query for it in charts, dashboards, alert conditions, or API calls.

### Step 1: See Which Metrics are Ingested

* The [Metrics Browser](metrics_managing.html#metrics-browser) lets you examine non-obsolete metrics and metric namespaces.
  
* The **Wavefront Namespace Usage Explorer** dashboard, which is part of the [Wavefront Usage integration](system.html), gives details on a per-namespace basis.
  
### Step 2: See Which Metrics Are Not Used or Check the Usage of the Metrics You Are Interested In

* Use the [Wavefront Top](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy) tool to examine which ingested metrics are accessed during the last lookback period. The default lookback period is 7 days but you can configure it up to 60 days. The *PPS* column shows the ingested rates, and the *%Acc.* column shows the percentages of the ingested rates that are accessed by queries.

    Start with the namespaces that have high ingestion rates but low access rates. Drill down the namespaces to found out the metrics with access rates of *0%*.
    
* Use the Wavefront API to create a script that compares ingested versus accessed metrics. The [Access API endpoint](wavefront_api.html#notes-on-the-access-category) provides information on how often an entity has been accessed. Supported entities are metrics, histograms, and spans. The default lookback period is 7 days but you can configure it up to 60 days. 
  
    Start with metric namespaces that contribute the most to the overall ingestion rate.
    1. Create a script to determine all of the metric names within those namespaces
    2. Feed each of those metric names to the Access API.
          
        While it is possible to list all metric names, you should focus on specific namespaces one at a time due to the possible sheer number of metric names.
  
        {% include tip.html content="There is an underlying (undocumented) API that the [Metrics Browser](metrics_managing.html#metrics-browser) uses. To take advantage of that API, use your browser's developer tools to see the underlying API calls." %}
  
* Use the Dashboards and Alerts browsers to examine metrics usage in queries.
      
    1. Determine all of the metric names within a namespace
    
    2. Check whether each metric name is included in any chart query for all dashboards and whether it is included in any condition query for all alerts.

        {% include note.html content="There's a chance that some metrics are queried only in ad hoc charts. While this is possible, it's more likely that important data is already used in dashboards and alerts." %}
    
### Step 3: See Which Dashboards Are Not Used
Some metrics might be queried in dashboard charts but these dashboards might be unused. Examine and, if needed, delete the [unused dashboards](ui_dashboards.html#identify-unused-dashboards).

## How Can I Optimize My Ingestion Rate?

Billing for Tanzu Observability is based primarily on the ingestion rate, so it's a good practice to look for ways to optimize and reduce your ingestion rate.

### Examine the Largest Metric Namespaces in Terms of Ingestion Rate

The **Wavefront Namespace Usage Explorer** dashboard, which is part of the [Wavefront Usage integration](system.html), is the best place to start for getting an insight into metric namespaces. This dashboard displays the largest level-1 namespaces. For each of these top namespaces, you can further examine the level-2 and level-3 namespaces and drill down to the sub-categories of metrics that contribute to the overall ingestion rate.
    
This simple analysis often reveals metric namespaces that you may not have realized contributed so much to your ingestion rate. These namespaces are great areas for optimization.
    
### Consider Increasing Reporting Intervals
  
* Even though Tanzu Observability supports second-level granularity for metric data points, it's rare that all data needs to be that granular. If some data does not need to be that granular, there can be significant savings just by increasing the interval at which that data reports. For example, switching from a 1-second interval to a 1-minute interval results in a 60x reduction in the ingestion rate for that set of data.
      
* Another area to explore for adjusting reporting intervals is *constant values*. Values that do not change often are great candidates for increasing reporting intervals.
    
    You can use [Wavefront Top](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy) to uncover constant values. The *Range* column shows the range of the reported values (the maximum value minus the minimum value) for each namespace.
    
    - If the range is *0*, then this data set is most likely reporting constant values.
        
    - If the range does not change, it is also possible that only a few fixed values are reported and the data set can also be a candidate for increased reporting intervals.
      
### Examine Unused Data

If data is ingested but not queried, then that is most likely data that does not need to be ingested. See [Which Metrics Are Ingested But Not Used?](wavefront_usage_info.html#which-metrics-are-ingested-but-not-used) for tips on finding unused data.

### Consider Using Histograms

If some of your data sets are tracking various statistics, for example, `min`, `max`, `mean`, such as in the case for [Dropwizard](https://metrics.dropwizard.io/3.1.0/getting-started) or [StatsD](statsd.html) style histogram data, these are good candidates to consider converting to [histograms](proxies_histograms.html). Histograms store data as distributions rather than as individual data points. For billing purposes, the rate of distributions ingested is converted to a rate of points ingested through a conversion factor. If you don't know your conversion factor, contact your Account Executive.
    
To determine whether there will be PPS savings from sending in metrics data as histogram data, first determine the ingestion rate for the metric data. To illustrate, let's look at an example:
      
Suppose we are ingesting 10 statistics for a specific series of data: `min`, `max`, `mean`, `sum`, `count`, `p50`, `p75`, `p95`, `p9`9, and `p999`. Let's say that this data is ingested at 30-second intervals. This means that we are ingesting 20 data points every minute. That is equivalent to .33 PPS (20 data points per minute / 60 seconds per minute). For histograms, at the most granular level, there can be one distribution per minute for any particular series. If your conversion factor from distribution per second to PPS is less than 20, this means there will be savings from ingesting this set of data as histograms. On top of these PPS savings, you will also get all the benefits of histograms, including better and more accurate insight into your data. So, even if the conversion factor results in an equivalent PPS, we still recommend sending in data as histograms to take advantage of the benefits of using distribution data.      
      
## Learn More!

Our Customer Success Team has put together KB articles that drill down into adoption info.
* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Request a PPS Add-On to Current Committed Rate](https://help.wavefront.com/hc/en-us/articles/4402939921044-How-to-request-a-PPS-add-on-to-current-committed-rate).
