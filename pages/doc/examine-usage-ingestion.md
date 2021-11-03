---
title: Examine the Overall Usage of Your Wavefront Service
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: examine_usage.html
summary: Monitor overall usage for a given time period.
---

As a Wavefront Super Admin, you're interested in how ingested data is used, whether you will be billed for more data, and whether you will need to request more data.

You can examine the performance of your Wavefront instance using [wftop](), [Wavefront spy](wavefront_monitoring_spy.html), and the [Slow Queries dashboard](wavefront_monitoring.html#examine-slow-queries). 

You can also see how data is used by specific user accounts or user groups, based on the [ingestion policies](ingestion_policies.thml) that you create.

## How to Use the Usage Summary Dashboard

You can navigate to the Usage Summary dashboard to get an overview of the ingested and scanned data over a certain month (up to 25 months back). 

1. Log in to your Wavefront instance as a Super Admin user.
2. From the gear icon <i class="fa fa-cog"/> on the taskbar, select **Usage Portal**

   The **Usage Summary** tab opens. This tab contains the dashboard with an overview of the ingested and scanned rate.
3. To choose a specific month, from the **Billing Month** drop-down menu, select the month you are interested in.

## Understand the Data

Here's an example of how the dashboard may look like.

![Example of the Usage Summary dashboard](images/usage_overview.png)

### Overview charts

The **Overview** section of the dashboard contains the following charts:

* **Projected Usage for This Month**
    
    Shows the P95 usage for the current month including overages.
    
* **Projected Overages for This Month**

    Shows the projected overage in PPS for this month.
    
* **Previous Month to Selected Month**
    
    Compares the PPS ingestion usage of the selected month with the previous month.
    
* **Hourly Usage**
    
    Shows the hourly PPS usage. The red line in the chart represents the committed level.
    
* **Time Above Contract Rate**
    
    Shows the percentage of time in which you have exceeded your committed rate. If you exceed your committed rate for more than 5% of the hours of a given month, you will be billed your overage rate.
    
* **Average Usage for the Last Quarter**

    Shows the average usage for the previous three months out of your total commitment level.
    
* **Last 12 Months Usage**

    Shows your billed usage over the last year. The dashed line represents your commit level.
    
### Scan Rate Charts

Typically, you are billed based on your ingestion rate. If your scan rate exceeds the ingestion rate with more than 20, you will be billed based on the scan rate.

The **Scan Rate** section of the dashboard contains charts showing you the following charts:

* **Is Billing Based on Scan Rate?**
    
    Shows whether you are currently billed based on your scan rate.
    
* **Scan Rate vs Ingest Rate**

    Shows the times your scan rate exceeds your ingestion rate.
    
* **Ingest Rate vs Scan Rate**
    
    Compares your ingestion rate with your scan rate.
    
## Learn More

For more in-depth exploration on the usage of your Wavefront service, see the [Wavefront usage integration](system.html)-related documentation: 

* [Monitor Your Wavefront Service](wavefront_monitoring.html)
* [Find Actionable Usage Information](wavefront_usage_info.html)
* [Monitor Wavefront Proxies](monitoring_proxies.html)
