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
* For **Observability for Kubernetes**, go to the [release notes for Observability for Kubernetes GitHub repository](https://github.com/wavefrontHQ/observability-for-kubernetes/releases).

## 2023-11.x Release Notes

* **Usage Summary Dashboard Improvements**: Added support for customers with burndown commit contracts.

  The charts for customers with burndown commitments slightly differ from the charts for customers with billable commitments.

  For more details, see [Examine Your Overall Usage](examine_usage.html).

* **Ingestion Policies Improvements**:

  * New [**Ingestion Policies** permission](permissions_overview.html).

    Users with that permission can create, edit, and delete ingestion policies.

  * Changed navigation to the **Ingestion Policies** page.

    **Ingestion Policies** is now a separate menu item under the gear icon <i class="fa fa-cog"/> on the toolbar.

  * New [**Revert** functionality](ingestion_policies.html#view-ingestion-policy-history-and-revert-to-a-previous-version) on the **Earlier Versions** page.

    Users with the **Ingestion Policies** permission can revert an ingestion policy to an earlier version.

  For more details, see [Monitor Usage with Ingestion Policies](ingestion_policies.html).

* **Node Map Chart Improvements**: You can specify the maximum number of node groups to display on a node map chart. When you open a node map chart in edit mode or create a new node map chart, on the **Node Map Details** tab, from the **Max Node Group Count** drop-down menu you can select the maximum number of groups to display on the chart. The default value is 10, the maximum value is 35. For details, see [Node Map Chart](ui_chart_reference.html#node-map-chart).

   ![A screenshot of the Node Map Defaults tab with the Max Node Group Count drop-down menu highlighted.](/images/node-map-chart.png)

## 2023-10.x Release Notes

**Proxy Setup Instructions for Kubernetes in the UI**: When you [install a proxy from the UI](proxies_installing.html#install-a-proxy-from-the-ui), you can now click the **Kubernetes** tab to copy the proxy configurations and the deployment command.

![A screenshot of the Kubernetes tab on the Add a Proxy page](/images/add_K8_proxy.png)


## 2023-09.x Release Notes

**Analyze Your Queries**: With this release you can use the Query Analyzer and [analyze your queries and their subqueries](query_language_performance.html#use-the-query-analyzer). When you expect to see certain data in Operations for Applications, but it doesn’t show up for some reason, charts display a **No Data** message. When you see this message on a chart, use the Query Analyzer to analyze and troubleshoot your queries and subqueries. 

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
