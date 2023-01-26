---
title: Examine the Overall Usage of Your Wavefront Service
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: examine_usage.html
summary: Monitor your overall usage per billing period.
---

It's important to understand how you use your Tanzu Observability by Wavefront service, whether you will be billed for more data, and whether you will need to request more data. Typically, billing is based on the amount of data that you send to Tanzu Observability, measured in Points per Second (PPS). If your scan rate exceeds more than 20x the ingestion rate, you will be billed based on the scan rate. If you exceed your committed rate, you will be charged more.

You can examine the overall usage of your Wavefront service by using the **Usage Summary** dashboard, discussed here.

For monitoring the ingestion rates by accounts, sources, metric namespaces, and point tags, you can use [ingestion policies](ingestion_policies.html).

For performance monitoring of your Wavefront instance, you can use [wftop, Wavefront spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Wavefront Usage integration](wavefront_monitoring.html).

## How to Go to the Usage Summary Dashboard?

You can navigate to the Usage Summary dashboard and get an overview of your ingested and scanned rates per [billing period](glossary.html#b). You can go up to 2 years back in time.

1. Log in to the **Usage Summary** dashboard.

2. Navigate to the list of ingestion policies.

    - If you are a Super Admin user, from the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage and Subscriptions**.
    - If you are not a Super Admin user, from the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.

   The **Usage Summary** tab opens. This tab contains the dashboard with an overview of the ingested and scanned rates.
3. From the **Billing Period** drop-down menu, select the period you are interested in.
   
## Understand the Data

The **Usage Summary** dashboard shows charts for the selected [billing period](glossary.html#b).

{% include note.html content="The charts slightly differ for the two types of contract commitments - **billable** and **burndown**. "%}

Here's an example of how the dashboard may look like if you have a billable commit contract.

![Example of the Usage Summary dashboard](images/usage_overview.png)

The charts are organized in the following sections.

### Overview Charts

The **Overview** section of the dashboard contains the following charts:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>P95 Usage for Selected Period</strong></td>
<td>Shows your 95th percentile PPS usage for the selected billing period, including overages if any.</td></tr>
<tr>
<td><strong>Current Overage for Selected Period</strong>
<p>(Only for billable customers)</p></td>
<td>Shows the number of PPS above your committed rate. If the overage reaches 1k PPS, the chart color changes from green to orange.
<p><strong>Important</strong>: If you exceed your committed rate for more than 5% of the hours of a given billing period, you will be billed for the number of PPS above your committed rate.</p></td>
</tr>
<tr>
<td><strong>Remaining Balance vs Burndown Commitment</strong>
<p>(Only for burndown customers)</p></td>
<td>Shows your remaining number of PPS out of your burndown commitment. </td>
</tr>
<tr>
<td><strong>Current Period vs Previous Period</strong></td>
<td>Shows the percentage change in the usage for the selected billing period compared to the billing period before that. A positive value indicates a usage increase whereas a negative value indicates a usage decrease.</td>
</tr>
<tr>
<td><strong>Hourly Usage</strong></td>
<td>Shows the hourly PPS usage over the selected billing period. The dashed line represents the PPS usage over the previous billing period.
<p>If you have a billable commit contract, the red line represents your committed rate.</p></td>
</tr>
<tr>
<td><strong>Time Above Committed Rate</strong>
<p>(Only for billable customers)</p></td>
<td>Shows the percentage of time in which you have exceeded your committed rate. If you exceed your committed rate for more than 5% of the hours of a given billing period, you will be billed your overage rate.</td>
</tr>
<tr>
<td><strong>Average Usage for the Last Quarter</strong></td>
<td>Shows the average usage for the previous three billing periods.
<p>If you have a billable commit contract, the usage is presented out of your total commitment level.</p></td>
</tr>
<tr>
<td><strong>Last 12 Months Usage</strong></td>
<td>Shows your billed usage over time.
<p>If you have a billable commit contract, the red line represents your committed rate.</p></td>
</tr>
<tr>
<td><strong>Top Metrics by Namespace</strong></td>
<td>Shows the first-level metric namespaces in the tenant, sorted in descending order by the number of ingested points per second (PPS).  For example, consider that the tenant ingests metrics <code>cpu.usage</code>, <code>cpu.cores.number</code>, <code>memory.total</code>, and <code>memory.free</code>. The <code>cpu.usage</code> and <code>cpu.cores.number</code> metrics ingest totally 7k PPS, and <code>memory.total</code> and <code>memory.free</code> ingest totally 4k PPS. The chart shows the namespaces <code>cpu</code> and <code>memory</code> sorted by the total number of the PPS ingested by the metrics in each namespace, i.e. you'll see <code>cpu</code> on top (with value of 7k PPS) and then <code>memory</code> (with value of 4k PPS).</td>
</tr>
<tr>
<td><strong>Top Increasing Metrics</strong></td>
<td>Shows the first-level metric namespaces in the tenant, sorted in descending order by the increase in the ingested points per second (PPS) during the last 30 days.</td>
</tr>
</tbody>
</table>

### Scan Rate Charts

Typically, you are billed based on the ingestion rate (the rate at which you send your data to Tanzu Observability). However, if the scan rate (the rate at which you query your data) exceeds the ingestion rate more than 20 times, you will be billed based on the scan rate.

The **Scan Rate** section of the dashboard contains helps you explore scan rates:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Is Billing Based on Scan Rate?</strong></td>
<td>Shows whether you are currently billed based on your scan rate.</td></tr>
<tr>
<td><strong>Scan Rate vs Ingest Rate</strong></td>
<td>Shows how many times your scan rate exceeds your ingestion rate.</td>
</tr>
<tr>
<td><strong>Ingest Rate vs Scan Rate</strong></td>
<td>Compares your ingestion rate with your scan rate.</td>
</tr>
</tbody>
</table>
    
## Learn More!

For more in-depth exploration on the usage of your Wavefront service, see the [Wavefront Usage integration](system.html)-related documentation: 

* [Monitor Your Wavefront Service](wavefront_monitoring.html).
* [Find Actionable Usage Information](wavefront_usage_info.html).
* [Monitor Wavefront Proxies](monitoring_proxies.html).

Our Customer Success Team has put together KB articles that drill down into adoption info.

* [How to Track Adoption in Your Company with Usage Metadata](https://help.wavefront.com/hc/en-us/articles/360058526192-How-to-Track-Tanzu-Observability-Adoption-with-Usage-Metadata).
* [How to Request a PPS Add-On to Current Committed Rate](https://help.wavefront.com/hc/en-us/articles/4402939921044-How-to-request-a-PPS-add-on-to-current-committed-rate).
