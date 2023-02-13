---
title: Release Notes and Announcements
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Announcements and new and updated features in Tanzu Observability by Wavefront.
---

This page lists new and updated features for the Tanzu Observability by Wavefront service.

* For **Wavefront Proxy**, your go-to place is the [Wavefront proxy GitHub page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
* For the latest changes and releases of our **Integrations**, see the [Integrations Release Notes](integrations_new_changed.html).
* For **Observability for Kubernetes**, go to the [release notes for Wavefront Collector for Kubernetes GitHub repository](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/releases).


## 2023-05.x Release Notes

* **See Who Has the Accounts Permission:**
  <table style="width: 100%;">
  <tbody>
  <tr>
  <td width="50%">
  Users with the <strong>Accounts</strong> permission can manage users, roles, and permissions. If you need changes in your groups, roles, or permissions, but you don't have the <strong>Accounts</strong> permission, you can now see the contact details of the users with this permission at the bottom of the <a href="users_account_managing.html#examine-groups-roles-and-permissions"><strong>Groups, Roles & Permissions</strong></a> page.
  </td>
  <td width="50%"><img src="images/Accounts_users.png" alt="a screenshot with the link at the bottom of the Groups, Roles & Permissions page"></td>
  </tr>
  </tbody>
  </table>

* **Super Admin Mode:**
  <table style="width: 100%;">
  <tbody>
  <tr>
  <td width="50%">
  If you are a Super Admin, the Super Admin mode lets you turn on and off your own Super Admin privileges. You can <a href="users_account_managing.html#enable-or-disable-super-admin-mode">enable Super Admin mode</a> until you complete your Super Admin tasks. After that, to avoid making unintentional changes in the system, disable Super Admin mode.
  </td>
  <td width="50%"><img src="/images/super_admin_mode.png" alt="A screenshot of the drop-down menu with the Super Admin Mode toggle."></td>
  </tr>
  </tbody>
  </table>
* **Integrations:** We had an integrations release in January! We made a lot of bug fixes and significant improvements to several integrations. See the [Integrations Release Notes](integrations_new_changed.html#january-2023) for details.

## 2023-04.x Release Notes

* **OpenTelemetry**: OpenTracing is deprecated. ([OpenTracing](https://opentracing.io/) and [OpenCensus](https://opencensus.io/) have merged to form [OpenTelemetry](https://opentelemetry.io/).) To send trace data to Tanzu Observability, use OpenTelemetry.
  * See the [OpenTracing to OpenTelemetry Migration Guide](opentracing_to_opentelemetry_migration.html) to migrate a Java application that uses OpenTracing to use OpenTelemetry.
  * The Wavefront OpenTracing SDKs are now deprecated, and are no longer supported.

* **Spring Boot 3**: The Wavefront for Spring Boot version 3.0.1 or later now uses Spring Boot 3.
  * To learn more, see [Wavefront for Spring Boot 3](wavefront_springboot3.html).
  * Try out the [Wavefront for Spring Boot 3 Tutorial](wavefront_springboot3_tutorial.html) and see how you can send your data in a few simple steps!
  * See the [Wavefront for Spring Boot FAQs](wavefront_spring_boot_faq.html#how-do-i-upgrade-from-spring-boot-2-to-spring-boot-3) to upgrade from Spring Boot 2 to Spring Boot 3.

* **Charts Improvements**: The pie chart displays the value for current, mean, median, sum, min, max, and count on the chart. For more details, see [Chart References](ui_chart_reference.html#pie-and-donut-chart).
  
  For example, if the query you use gets the CPU usage of all the applications, and you select Sum, you can see how the CPU usage of an application compares to all the other applications for a given time window.
  ![shows a screenshot of the pice chart, with the display value set to sum.](images/pie_chart_display_value.png)


## 2023-03.x Release Notes

* **Alert Notifications Update**: If your **PagerDuty** [alert target](webhooks_alert_notification.html) is integrated with Slack, the alert notifications in Slack are now more extensive. They show the complete alert notification summary, which can be up to 1,000 characters.

## 2023-02.x Release Notes

* **Charts Improvements**: **Stacked Area** and **Stacked Column** charts are now supported with the latest Mozilla Firefox versions.



<!--* **Alert Targets Browser Page Improvements**: The **Alert Targets** browser page is now improved and allows you to:

  * Hide and show details for all alert targets or for a specific alert target.
  * Sort alert targets either by the last updated date or by target name.
  * Hide and show the filters listed on the left.

  For more details, see [View Alert Targets](webhooks_alert_notification.html#view-custom-alert-targets).-->

## Past Release Notes

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