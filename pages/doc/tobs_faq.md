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

## Do You Have Tutorials?

Yes!
* The [Hello Wavefront!](hello_wavefront_aws_tutorial.html) has:
  - Detailed step-by-step instructions for ingesting data from AWS
  - A video about ingesting data from a Windows machine
  - Links to next steps
* The [Explore Data Tutorial](tutorial_dashboards.html) gives step-by-step instructions for exploring a sample dashboard. You don't need special permissions follow these steps.
* The [Query Language Tutorial](query_language_getting_started.html) explores the anatomy of a query, includes a few videos, and includes hands-on practice.
* The [Alerts Browser Tutorial](alerts.html#alerts-browser-tutorial) and the [Create Alerts Tutorial](alerts_manage.html#create-alert-tutorial) get you started with alerts.

## Do You Have Videos?

Yes! Tanzu Observability has [a channel on VMware TV](https://vmwaretv.vmware.com/channel/Tanzu%2BObservability/252649793) that includes playlists for getting started, query language, alerting, and more.

## Do You Have APIs?

Yes! To access the APIs, click the gear icon in the top right and select **API Documentation**. See [Wavefront REST API](wavefront_api.html) for details on finding the API token and more.


## Do You Have Other FAQs?

Yes! We have FAQs for several areas of the product.
* [Alerts FAQ](alerts_faq.html) has answers about alerts firing (or not firing), tips for optimizing alerts, and more.
* [Kubernetes FAQ](wavefront_kubernetes_faq.html) has answers to questions about filtering data, monitoring Prometheus endpoints, and more.
* [Tracing FAQ](tracing_faq.html) is for users of our tracing offering.
* [Authorization FAQ](authorization-faq.html) helps administrators who want the important authorization questions answered.

Search the doc set for `FAQ` to find more FAQ pages. 
