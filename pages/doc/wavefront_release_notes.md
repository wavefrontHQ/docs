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

## Announcement

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the [VMware Cloud services platform](https://console.cloud.vmware.com/). After this date, we support two types of subscriptions: 

* **Onboarded Subscriptions**: Operations for Applications subscriptions that are onboarded to the VMware Cloud services platform. 
* **Original Subscriptions**: Existing subscriptions which remain as is until they migrate to VMware Cloud services. 
   
   We are in the process of incrementally migrating original subscriptions to VMware Cloud services.

For information about the two subscription types and how they differ, see [Subscription Types](subscriptions-differences.html).
 
{% include note.html content="We will support both original and onboarded subscriptions until all original subscriptions are migrated to VMware Cloud services."%}

## 2023-31.x Release Notes

### Original and Onboarded Subscriptions

* **Logs GA release**: With this release, we launch the General Availability of our [Logs feature](logging_overview.html). You can:
  * [Send your logs](logging_send_logs.html) to our service, and troubleshoot using the [Logs Browser](logging_log_browser.html).
  * [Create logs charts](logging_logs_chart.html) to view logs next to your metrics data.
  * Drill into logs from alerts, charts, and traces.
  * [Customize the default log settings](logging_logs_settings.html) to map logs tags to metrics and trace tags so you can drill into logs seamlessly.
  
  {% include important.html content="Logs is enabled only for selected customers. If you want to participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)." %}

  ![A screenshot of the logs browser.](images/logs_browser_ga_for_release_notes.png)

* **Logs Alerts**: You can create alerts for your logs data and see the firing events of the logs alert. See [Manage Logs Alerts](logging_log_alerts.html) for details. 

  {{site.data.alerts.note}}
  <ul>
      <li>
          You need the <b>Logs</b> permission to view the logs alerts.
      </li>
      <li>
          You need the <b>Alerts</b> and <b>Logs</b> permissions to create and manage logs alerts.
      </li>
  </ul>
  <p>The steps to add roles and permissions differ for onboarded and original subscriptions. For details, see how to manage roles, groups, and permissions for <a href="csp_users_roles.html#create-edit-or-delete-a-custom-role">onboarded subscriptions</a> and <a href="users_roles.html">original subscriptions</a>.</p>
  {{site.data.alerts.end}}

  In this release, you can create logs alerts only when the default query language for your [user account](users_account_managing.html#configure-user-preferences) is **WQL** and **Chart Builder** is the default way for building queries. This limitation will be removed in an upcoming release.

  ![A screenshot of the alert browser on the logs alerts tab.](images/logs_alerts_for_rlease_notes.png)

* **Maintenance Window Browser Page Improvements**: The [**Maintenance Window** browser page](maintenance_windows_managing.html#maintenance-windows) is now improved and allows you to:

    * Hide and show details for all maintenance windows or for a specific maintenance window.
    * Sort the maintenance windows by name, state, start or end time.
    * Apply various filters, hide and show the filters listed on the left.

* **New Field in the Generic Webhook Alert Template**: We added the [`contributingKVs` iterator](alert_target_customizing.html#list-all-sources-and-point-tags-of-an-aggregation-alerts-time-series), which returns the keys and values of each source and point tag used in the time series of a failed alert whose condition uses a single top-level aggregation function.

  {% include important.html content="This feature is not available by default. To enable this feature for your service instance, contact your account representative or [technical support](wavefront_support_feedback.html#support)." %}

* **Support for Alerting on ~alert.webhooks**: With this release, you can alert on `cs(~alert.webhooks.*)`. See [Query Responses of Webhook Alert Targets](webhooks_alert_notification.html#query-responses-of-webhook-alert-targets) for details.

### Onboarded Subscriptions Only

* **Support for Kubernetes Integration Setup**: We added support for setting up the Kubernetes integration when your Operations for Applications service is onboarded to VMware Cloud services. See the [Integrations Release Notes](integrations_new_changed.html#august-2023) for details.

* **Support for Tanzu Application Service Integration Setup**: We added support for setting up the Tanzu Application Service integration when your Operations for Applications service is onboarded to VMware Cloud services. See the [Integrations Release Notes](integrations_new_changed.html#august-2023) for details.


## 2023-29.x Release Notes

### Original and Onboarded Subscriptions

*  **Google Cloud Platform Integration Improvements**: You can now select to ingest histogram metrics as well as filter these metrics by their Google Cloud Platform grouping function. See the [Integrations Release Notes](integrations_new_changed.html#july-2023) for details.

* **Documentation Improvement**: We have added a new [documentation page](integrations_gcp_api.html) which explains how to set up the Google Cloud Platform integration by using our REST API.

## 2023-27.x Release Notes

### Original and Onboarded Subscriptions

**Monitor Google Cloud Run**: You can monitor Google Cloud Run metrics. See the [Integrations Release Notes](integrations_new_changed.html#july-2023) for details.

### Original Subscriptions Only

**Service Accounts Improvement**: With this release, [service accounts](service-accounts.html) can create and modify ingestion policies when they have the **Ingestion Policies** permission. 

## 2023-25.x Release Notes

* **Wavefront Proxy Release**: We’ve just released [Wavefront proxy 13](https://github.com/wavefrontHQ/wavefront-proxy/releases), which supports sending data to Operations for Applications subscriptions **onboarded** to VMware Cloud Services by using a VMware Cloud services access token.
* **New Fields in the Generic Webhook Alert Template**: We added two new fields to the Generic Webhook notification template which allow you to extract information about the filter-by and group-by keys. For information and examples, see [Extract Information About the Filter-by and Group-by Keys](alert_target_customizing.html#extract-information-about-the-filter-by-and-group-by-keys).

## 2023-20.x Release Notes

**The Group By Parameter Is Case-Sensitive**: With this release, when you apply the `group by` parameter to aggregation function queries, the grouping is case-sensitive. For more information and details, see [Aggregation Functions](query_language_reference.html#aggregation-functions) and [Tags Overview](tags_overview.html#tags-basics).

## 2023-18.x Release Notes

* **Upcoming Metrics Obsolescence Period Changes**: Within the next releases we will change the [metrics obsolescence period](https://docs.wavefront.com/metrics_managing.html#obsolete-metrics) from **28 days** to **14 days**. This change will further improve your query performance. Here's what you have to do: 
  * If you are querying for a time series that has not reported points within the last **14 days**, you must select to [Include Obsolete Metrics](https://docs.wavefront.com/metrics_managing.html#obsolete-metrics) for your [charts](https://docs.wavefront.com/ui_charts.html#include-metrics-that-stopped-reporting) or [dashboards](https://docs.wavefront.com/ui_dashboards.html#set-dashboard-display-preferences-and-settings). 
  * If the data you are querying for does have data points within the last **14 days**, you do not need to do anything.

  If you have any questions or concerns, please do not hesitate to [contact us](mailto:support@wavefront.com).

* **Alert Checking Frequency**: When you create an alert, the default alert checking frequency is now set to 5 minutes. If you want to change the default value, define the **Checking Frequency** when you create or edit the alert. For more information on the checking frequency, see [How Are Alerts Evaluated](alerts.html#how-are-alerts-evaluated).




## Past Release Notes
- [2023-13.x Release Notes](2023-13.x_release_notes.html)
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
