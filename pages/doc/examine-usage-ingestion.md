---
title: Examine the Overall Usage of Your Wavefront Service
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: examine_usage.html
summary: Monitor overall usage for a given time period.
---

As a Wavefront Super Admin, you're interested in how ingested data is used, whether you will be billed for more data, and whether you will need to request more data. Billing is based on the amount of data, measured in Points per Second (PPS), which you send to Tanzu Observability by Wavefront. If you exceed your committed rate, you will be charged more.

You can examine the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). 

You can also see how data is used by specific accounts or groups, based on the [ingestion policies](ingestion_policies.thml) that you create.

## How to Use the Usage Summary Dashboard

You can navigate to the Usage Summary dashboard to get an overview of the ingested and scanned data over a certain month (up to 25 months back). 

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**.

   The **Usage Summary** tab opens. This tab contains the dashboard with an overview of the ingested and scanned rates.
3. To choose a specific month, from the **Billing Month** drop-down menu, select the month you are interested in.
   
   You can go up to 25 months back in time.
   
## Understand the Data

Here's an example of how the dashboard may look like.

![Example of the Usage Summary dashboard](images/usage_overview.png)

### Overview Charts

The **Overview** section of the dashboard contains the following charts:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Projected Usage for Selected Month</strong></td>
<td>Shows the P95 usage for the selected month including overages.</td></tr>
<tr>
<td><strong>Projected Overages for Selected Month</strong></td>
<td>Shows the projected overage in PPS for the selected month.</td>
</tr>
<tr>
<td><strong>Previous Month to Selected Month</strong></td>
<td>Compares the PPS ingestion usage of the selected month with the previous month.</td>
</tr>
<tr>
<td><strong>Hourly Usage</strong></td>
<td>Shows the hourly PPS. The red line represents the commit level. If the hourly usage exceeds the committed rate with more than 5% for a given month, you will incur overage charges.</td>
</tr>
<tr>
<td><strong>Time Above Contract Rate</strong></td>
<td>Shows the percentage of time in which you have exceeded your committed rate. If you exceed your committed rate for more than 5% of the hours of a given month, you will be billed your overage rate.</td>
</tr>
<tr>
<td><strong>Average Usage for the Last Quarter</strong></td>
<td>Shows the average usage for the previous three months out of your total commitment level.</td>
</tr>
<tr>
<td><strong>Historical Usage (24 Months)</strong></td>
<td>Shows your billed usage over the last 2 years. The dashed line represents your commit level.</td>
</tr>
<tr>
<td><strong>Top Metrics by Namespace</strong></td>
<td>Shows the number of data PPS for all first-level metric names in the system. For example, if you have metrics named <code>cpu.usage</code>, <code>cpu.cores.number</code>, <code>memory.total</code>, and <code>memory.free</code>, this chart shows the total PPS under the first level metric names, such as <code>cpu</code> and <code>memory</code>.</td>
</tr>
<tr>
<td><strong>Top Increasing Metrics</strong></td>
<td>Shows the rate of metrics within a 30-days period of time.</td>
</tr>
</tbody>
</table>

    
### Scan Rate Charts

Typically, you are billed based on your ingestion rate. If your scan rate exceeds the ingestion rate more than 20 times, you will be billed based on the scan rate.

The **Scan Rate** section of the dashboard contains charts showing you the following charts:

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
<td>Shows the times your scan rate exceeds your ingestion rate.</td>
</tr>
<tr>
<td><strong>Ingest Rate vs Scan Rat</strong></td>
<td>Compares your ingestion rate with your scan rate.</td>
</tr>
</tbody>
</table>

    
## Learn More

For more in-depth exploration on the usage of your Wavefront service, see the [Wavefront usage integration](system.html)-related documentation: 

* [Monitor Your Wavefront Service](wavefront_monitoring.html)
* [Find Actionable Usage Information](wavefront_usage_info.html)
* [Monitor Wavefront Proxies](monitoring_proxies.html)
