---
title: Release Notes and Announcements
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Announcements and new and updated features in VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).
---

This page lists new and updated features for the VMware Aria Operations for Applications service.

* For **Wavefront Proxy**, your go-to place is the [Wavefront proxy GitHub page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
* For the latest changes and releases of our **Integrations**, see the [Integrations Release Notes](integrations_new_changed.html).
* For **Observability for Kubernetes**, go to the [release notes for Wavefront Collector for Kubernetes GitHub repository](https://github.com/wavefrontHQ/observability-for-kubernetes/releases).

## 2023-09.x Release Notes

**Analyze Your Queries**: With this release you can use the Query Analyzer and [analyze your queries and their subqueries](query_language_performance.html#use-the-query-analyzer). When you expect to see certain data in Tanzu Observability, but it doesn’t show up for some reason, charts display a **No Data** message. When you see this message on a chart, use the Query Analyzer to analyze and troubleshoot your queries and subqueries. 

## 2023-08.x Release Notes

**Alert Targets Browser Page Improvements**: The **Alert Targets** browser page is now improved and allows you to:

  * Hide and show details for all alert targets or for a specific alert target.
  * Sort alert targets either by the last updated date or by target name.
  * Hide and show the filters listed on the left.

  For more details, see [View Alert Targets](webhooks_alert_notification.html#view-custom-alert-targets).

## 2023-07.x Release Notes

* **Proxies Browser Revamp**:

  Streamlined experience that improves monitoring and managing your proxies.
  - Configurable proxies list in table format lets you [explore your proxies](monitoring_proxies.html#explore-your-proxies-with-the-proxies-browser) in detail.
  - Individual proxy dashboards to [examine the health and usage of each proxy](monitoring_proxies.html#examine-the-health-and-usage-of-a-proxy-with-the-proxy-dashboard).

* **Amazon Web Services Integration Improvements:** 

  With this release, we have improved the AWS CloudWatch integration. When you configure the AWS CloudWatch integration, you can add custom namespaces to monitor more services, even those that are not in the default **Products** list of the AWS services in our GUI. For more information, see the [integrations release notes](integrations_new_changed.html#february-2023).

* **Ingestion Policies Improvement:**

  When you assign a key-value pair to an [ingestion policy](ingestion_policies.html) with the point tags scope, you can now set a wildcard for the tag value. For example, you can assign `env="*"`. 

* **Monitor the Status of Your Service:**

  <table style="width: 100%;">
    <tbody>
    <tr>
    <td width="50%">
    You can use the public <a href="https://status.vmware-services.io/">VMware Cloud Services Status Page</a> to monitor your service for incidents and maintenance.
    <ol>
    <li>For confidentiality reasons, we show the service status of each customer cluster by using a cluster alias name. <a href="service_status_page.html#find-your-cluster-alias-name">Find Your Cluster Alias Name</a>. </li>
    <li>Outages and other service-wide events are reported on the VMware Cloud Services status page. <a href="service_status_page.html#view-the-status-of-your-service">View the Status of Your Service</a>.</li>
    <li>You can subscribe to notifications for incidents and scheduled maintenance of your service. <a href="service_status_page.html#subscribe-for-status-updates">Subscribe for Status Updates</a>.</li>
    </ol>
    </td>
    <td width="50%"><img src="images/service_status.png" alt="The VMware Cloud Services Status Page with expanded VMware Aria Operations for Applications."></td>
    </tr>
    </tbody>
    </table>


## Past Release Notes

- [2023-06.x Release Notes](2023-06.x_release_notes.html)
- [2022-49.x Release Notes](2022-49.x_release_notes.html)
- [2022-39.x Release Notes](2022-39.x_release_notes.html)
- [2022-29.x Release Notes](2022-29.x_release_notes.html)
- [2022-20.x Release Notes](2022-20.x_release_notes.html)
- [2022-06.x Release Notes](2022-06.x_release_notes.html)
- [2021-49.x Release Notes](2021.49.x_release_notes.html)
- [2021-35.x Release Notes](2021.35.x_release_notes.html)
- [2021-24.x Release Notes](2021.24.x_release_notes.html)
- [2021-19.x Release Notes](2021.19.x_release_notes.html)
- [2021-14.x Release Notes](2021.14.x_release_notes.html)
- [2021-08.x Release Notes](2021.08.x_release_notes.html)
- [2020-42.x Release Notes](2020.42.x_release_notes.html)
- [2020-38.x Release Notes](2020.38.x_release_notes.html)
- [2020-30.x Release Notes](2020.30.x_release_notes.html)
- [2020-26.x Release Notes](2020.26.x_release_notes.html)
- [2020-22.x Release Notes](2020.22.x_release_notes.html)
- [2020-14.x Release Notes](2020.14.x_release_notes.html)
