---
title: Tanzu Observability FAQ
keywords: alerts
tags: [getting started]
sidebar: doc_sidebar
permalink: tobs_faq.html
summary: Get answers to the top FAQs for Tanzu Observability
---

## Why Can't I Edit This Dashboard? This Alert?

By default, all users can view dashboards and alerts. They can also edit dashboards and alerts but cannot save their changes. To do more, you need permissions.

<p><span style="font-size: 1.1em; font-weight: 600">Action</span></p>

1. Check your permissions. See [Examine Groups, Roles, and Permissons](users_account_managing.html#examine-groups-roles-and-permissions).
2. If you don't have the permissions you need, ask a user with **Accounts** permissions to grant you the permissions.

If that doesn't solve the problem, the indidual dashboard or alert you're trying to edit might be protected by access control. The creator of the alert or dashboard or a Super Admin user can grant access.

## Why Is Our PPS So High? Why Do We Have Overage?

PPS and Overage determine what a Tanzu Observability customer is billed:
* **PPS**, or Points per Seconds means data points ingested per second by the Wavefront service. All customers are billed based on their PPS.
* **Overage** Many Tanzu Observability customers have a contract that specifies a certain PPS for a certain amount of time. If the customer exceeds that PPS, the customer is billed for overage.

Because the Wavefront service runs on AWS, we have to bill based on how much data is ingested. However, we're interested in helping you lower your bill and get more out of Tanzu Observability. We encourage you to find out:
* Are there dashboards or alerts that ingest data but that are never used?
* Are your queries looking at too much data, that is, could you filter as part of the query?

Start with [Find Actionable Usage Information](wavefront_usage_info.html) and examine how to improve PPS! 


## Why Is Tanzu Observability So Slow?

Tanzu Observability can handle handle a lot of data, but sometimes you need it faster!

<p><span style="font-size: 1.1em; font-weight: 600">Action</span></p>

* **Improve Rendering Speed**. You can make some modification to slow dashboards to improve rendering speed. See [Ensure Optimal Dashboard Performance](ui_dashboards.html#ensure-optimal-dashboard-performance). Changes include ensuring that sampling is turned on, controlling that only events you need to see are displayed, and more.

* **Improve Data Shape and Cardinality** At the heart of improving rendering speed and query execution speed is the shape of your data. If your dashboard or your query look at only the data you're actually interested in, performance improves drastically. See [Optimizing Data Shape to Improve Performance](optimize_data_shape.html) and [Find Ingestion and Query Problems](monitoring_overview.html).

## Do You a Hello World Tutorial?

Yes! Have a look at [Hello Wavefront!](hello_wavefront_aws_tutorial.html) for
* Detailed step-by-step instructions for ingesting data from AWS
* A video about ingesting data from a Windows machine
* Links to next steps


## Do You Have APIs?

Yes! To access the APIs, click the gear icon in the top right and select **API Documentation**. See [Wavefront REST API](wavefront_api.html) for details on finding the API token and more.


## Other FAQs
