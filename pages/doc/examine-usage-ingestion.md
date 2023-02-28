---
title: Examine the Overall Usage of Your Service Instance
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: examine_usage.html
summary: Monitor your overall usage per billing period.
---

It's important to understand how you use your VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) service, whether you will be billed for more data, and whether you will need to request more data. Typically, billing is based on the amount of data that you send to Operations for Applications, measured in Points per Second (PPS). If your scan rate exceeds more than 20x the ingestion rate, you will be billed based on the scan rate. If you exceed your committed rate, you will be charged for overage usage.

You can examine the overall usage of your Operations for Applications service by using the **Usage Summary** dashboard, discussed here.

For usage monitoring by specific accounts, sources, metric namespaces, and point tags, you can use [ingestion policies](ingestion_policies.html).

For performance monitoring of your Operations for Applications service, you can use [wftop and spy](wavefront_monitoring_spy.html), the [Slow Query dashboard](monitoring_overview.html#find-slow-queries-and-improve-dashboard-response), and the [Usage integration](wavefront_monitoring.html).

## How to Go to the Usage Summary Dashboard?

You can navigate to the Usage Summary dashboard to get an overview of the ingested and scanned rates over a certain [billing period](glossary.html#b). You can go up to 2 years back in time.

1. Log in to your service instance (`https://<your_instance>.wavefront.com`).
1. From the gear icon <i class="fa fa-cog"/> on the toolbar, select **Usage Portal**.

    {% include tip.html content="If you are a Super Admin user and enabled Super Admin mode, the menu item is **Usage and Subscriptions**." %}
    
    The **Usage Summary** tab opens. This tab contains the dashboard with an overview of the ingested and scanned rates.
1. From the **Billing Month** drop-down menu, select the billing period you are interested in.
   
   
## Understand the Data

Here's an example of how the dashboard may look like.

![Example of the Usage Summary dashboard](images/usage_overview.png)

If you exceed your committed rate for more than 5% of the hours of a given month, you will be billed your overage rate for the number of PPS above your committed rate.

### Overview Charts

The **Overview** section of the dashboard contains the following charts:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Chart</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td><strong>Projected Usage for Selected Month</strong></td>
<td>Shows the projected usage for the selected month.</td></tr>
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
<td>Shows the average usage for the previous three months out of your total commit level.</td>
</tr>
<tr>
<td><strong>Historical Usage (24 Months)</strong></td>
<td>Shows your billed usage over the last 2 years.</td>
</tr>
<tr>
<td><strong>Top Metrics by Namespace</strong></td>
<td>Shows the number of data PPS for all first-level metric names in the system. For example, if you have metrics named <code>cpu.usage</code>, <code>cpu.cores.number</code>, <code>memory.total</code>, and <code>memory.free</code>, this chart shows the total PPS under the first level metric names, such as <code>cpu</code> and <code>memory</code>.</td>
</tr>
<tr>
<td><strong>Top Increasing Metrics</strong></td>
<td>Shows the top increasing metrics within a 30-days period of time.</td>
</tr>
</tbody>
</table>

### Scan Rate Charts

Typically, you are billed based on your ingestion rate. If your scan rate becomes 20 times the ingestion rate or more, you will be billed based on the scan rate.

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

For more in-depth exploration on the usage of your Operations for Applications service, see the [Usage integration](system.html)-related documentation: 

* [Monitor Your Service](wavefront_monitoring.html).
* [Find Actionable Usage Information](wavefront_usage_info.html).
* [Monitor Wavefront Proxies](monitoring_proxies.html).
* [Purchase Additional Capacity](purchase_additional_capacity.html)

Our Customer Success Team has put together a KB article that drills down into adoption info.

* [How to Track Adoption with Usage Metadata](https://tanzu.vmware.com/content/blog/how-to-track-wavefront-adoption-with-usage-metadata).
