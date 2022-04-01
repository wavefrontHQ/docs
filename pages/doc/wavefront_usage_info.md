---
title: Find Actionable Usage Information
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_usage_info.html
summary: Monitor usage information for your Wavefront instance.
---

Tanzu Observability by Wavefront includes tools and dashboards for examining usage. This page helps administrators learn how much data is coming in, who is sending the data, and how to get alerted if ingested data get close to monthly contracted usage.

## Why Is Usage Information Important?

Each customer has a contract with VMware that allows them to send a predetermined amount of data to their Wavefront instance. That is, billing depends on the points per second (PPS) that the customer sends.

If the customer uses more than the contracted rate, VMware bills for those additional data. Because VMware has to pay the cloud provides for data consumed by the Wavefront instances, we have to make sure that customers pay for the data they consume. But we're interested in having our customers get the best possible results from their data.


* **Send data, use data**. If some teams at the customer site send a lot of data but don't use those ingested data anywhere (e.g. in alerts, dashboards, etc.) nobody benefits.
* **Team responsibility**. If several teams at a customer site use the Wavefront service, it might be useful to know which team send in most data.
* **Know PPS and limits**. If customers are clear about how they're using the contracted PPS, they can budget well.
  - Learn how different metric types (histograms, metrics, spans, etc.) contribute to the overall ingest rate.
  - Understand how you can be smart about sending only data that are useful for you.

## How Can I Learn About Ingested Data?

{% include note.html content="The new Usage Portal and Ingestion Policy functionality is currently available to some of our customers. It will become available to all customers within the next releases."%}

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
<td>How close am I to my billing limit?</td>
<td>
Use the <a href="examine_usage.html"><strong>Usage Summary</strong></a> dashboard on the <strong>Usage and Ingestion Policies</strong> page to see information about the projected overage and whether you exceed your committed rate.
<p>Use the <strong>Committed Rate vs Monthly Usage (PPS P95)</strong> dashboard. Consider cloning and customizing this dashboard and adding alerts.</p></td>
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

The **Committed Rate vs Monthly Usage (PPS P95)** dashboard that’s part of the Wavefront Usage integration helps you determine whether you’re getting close to meeting the limit. For most Wavefront instances, after the limit is reached data still keeps flowing into Tanzu Observability, but the customer has to pay overage.

The charts in the dashboard show this information:

* Current PPS vs Committed PPS usage.
* Usage of the Wavefront service in terms of PPS for your current billing period.
* Usage of the Wavefront service for your current billing period in terms of the data points that are being queried via dashboards, alerts, custom charts, API calls, etc.
* Total PPS ingested for your current billing period.
* Hourly usage of the Wavefront service.
* Usage of the Wavefront service in terms of hourly PPS, data points per second (DPS), or spans per second (SPS) ingested vs scanned for the current billing period.
* Usage of the Wavefront service in terms of PPS, DPS, or SPS ingested vs scanned for the current billing period.

## Which Metrics Are Ingested But Not Used?

The easiest way to improve your ingestion rates is to send only data that you actually use. The main way to use data is to query for it, whether it be in charts or dashboards or in alert conditions.

1. See which metrics are ingested.

      * The [Metrics Browser](metrics_managing.html) lets you examine non-obsolete metrics and metric namespaces.
  
          {% include tip.html content="There is an underlying (undocumented) API that the Metric Browser uses that you can try to take advantage of. Use your browser's developer tools to see the underlying API calls made." %}

      * The **Wavefront Namespace Usage Explorer** dashboard, which is part of the [Wavefront Usage integration](system.html), gives details on a per-namespace basis.
  
2. See which metrics are accessed.

      * Use the [Wavefront Top](wavefront_monitoring_spy.html#get-started-with-wavefront-top-and-spy) tool to examine which ingested metrics are accessed during the last lookup period. The default lookback period is 7 days but is configurable.
  
          You can sort the namespaces by the *%Acc.* column and drill down to found out the metrics for which the accessed PPS out of the ingested PPS is *0%*.
  
          {% include tip.html content="Start with namespaces that have high ingestion rates but low access rates." %}
  
      * The [Access API endpoint](wavefront_api.html#notes-on-the-access-category), provides information on how often an entity has been accessed. Supported entities are metric, histogram, and span. The default lookback period is 7 days but is configurable up to 60 days. 
  
          You can create a script that compares ingested to accessed metrics. A common strategy is to start with metric namespaces that contribute the most to the overall ingestion rate and then create a script to determine all of the metric names within those namespaces and feed each of those metric names to the Access API. 
  
          {% include tip.html content="While it is possible to list all metric names, it is recommended to focus on specific namespaces one at a time due to the possible sheer number of metric names." %}
  
      * Use the Dashboards and Alerts browsers to examine metrics usage in queries. The general steps are to determine all of the metric names within a namespace, check whether each metric name is included in any chart queries for all dashboards, and check whether each metric name is included in any alert queries.
  
          {% include note.html content="There's a chance that some metrics are only queried for in ad hoc charts. While this is possible, it's more likely that important data is already used in dashboards and alerts." %}
    
3. See which dashboards are not used.

    Some metrics might be queried in dashboard charts but the dashboards might be [unused](ui_dashboards.html#identify-unused-dashboards).

    ![Dashboard browser with Sort menu](images/dashboards_unused.png)

## How Can I Optimize My Ingestion Rate?

Billing for Tanzu Observability is based primarily on the ingestion rate, so it's a good practice to look for ways to optimize and reduce your ingestion rate.

* Examine the largest metric namespaces in terms of ingestion rate.

    The **Wavefront Namespace Usage Explorer** dashboard, which is part of the [Wavefront Usage integration](system.html), is the best place to start for insight into metric namespaces. At a glance, this dashboard displays the largest level 1 namespaces. For each of these top namespaces, you can further examine the level 2 and level 3 namespaces for more insight into the sub-categories of metrics that contribute to the overall ingestion rate.
    
    This simple analysis often reveals metric namespaces that users may not have realized contributed so much to their ingestion rate. These namespaces are great areas for optimization.
    
  *  granularity you need for your metric data points.
  
      Even though Tanzu Observability supports second-level granularity for metric data points, it's rare that all data needs to be that granular. If some data does not need to be that granular, there can be significant savings just by increasing the interval at which that data reports. For example, switching from a 1-second interval to a 1-minute interval results in a 60x reduction in ingestion rate for that set of data.
      
      

## Learn More!

Our Customer Success Team has put together KB articles that drill down into adoption info.
* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Identify Unused Data](https://help.wavefront.com/hc/en-us/articles/360058084372-How-to-Identify-Unused-Data).
* [How to Optimize Your Ingestion Rate PPS](https://help.wavefront.com/hc/en-us/articles/360057995092-How-to-Optimize-Your-Ingestion-Rate-PPS-).
* [How to Request a PPS Add-On to Current Committed Rate](https://help.wavefront.com/hc/en-us/articles/4402939921044-How-to-request-a-PPS-add-on-to-current-committed-rate).
