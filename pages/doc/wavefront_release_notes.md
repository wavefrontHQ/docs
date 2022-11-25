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

## 2022-47.x Release Notes

* **Logs(Beta)**:
  - Improved the search time window when you [drill drown](logging_overview.html#traces-browser) from the Traces browser into the related logs. By default, the search time window starts 5 seconds before the trace and ends 5 seconds after the trace, but it's configurable.
  - Added an autocomplete functionality to the search bar, so that you can quickly enter log filters by using the keyboard.
  
* **Obsolescence period for metrics and sources**: The period of inactivity, after which metrics and source become *obsolete*, is now configurable. By default, the obsolescence period for metrics and sources is 4 weeks. See [Obsolete Metrics](metrics_managing.html#obsolete-metrics) and [Obsolete Sources](sources_managing.html#step-1-find-a-source) for details.

* **Integrations**: We had an integrations release in November! We added the Tanzu Service Mesh integration and made a lot of improvements to a number of integrations, including the Kubernetes integration. See the [Integration Release Notes](integrations_new_changed.html#november-2022) for details.

## 2022-44.x Release Notes

* The **Query Suggestions** for charts and alerts are now actionable. To apply a suggestion and improve the query performance, click a suggestion and your query updates accordingly. See [Use Performance Improvement Suggestions](query_language_performance.html#use-performance-improvement-suggestions) for details.

    ![screenshot of a query and the Suggestions panel with clickable values](images/Query_suggestions_RNs.png)
* We made major improvements to our help docs to fix some issues and include more help pages.

## 2022-42.x Release Notes

With this release, we launch the Initial Availability of our **Logs (Beta)** feature.

{% include important.html content="Tanzu Observability Logs (Beta) is enabled only for selected customers. If you'd like to participate, contact your Tanzu Observability account representative or [technical support](wavefront_support_feedback.html#support)."%}

![The UI of the Logs Browser](images/logs_RNs.png)

If the logs feature is enabled on your account:
* You can start [sending logs](logging_send_logs.html) and correlate them with traces and metrics for unified observability and root cause analysis.
* If you have the [**Logs** permission](permissions_overview.html), you can start using the [Logs Browser](logging_log_browser.html) to examine the ingested logs and find the root cause of critical issues. Click **Logs (Beta)** on the toolbar or drill into logs from charts, alerts, and traces. See [Get Started with Logs (Beta)](logging_overview.html) for details.
* You can use the **Linux Host** and **Wavefront Usage** integrations that we improved for logs. See the [Integrations Release Notes](integrations_new_changed.html#october-2022) for details.

## 2022-41.x Release Notes

* **Accessibility Improvements**: With this release we have made a lot of accessibility-related fixes. For example:
  
	* Added meaningful texts for screen readers to all of our pages and UI elements, such as buttons, form fields, data tables and their structure elements, and so on.
	* Fixed color coding and contrast.
	* Forms and form fields now contain instructions and all required fields are marked as such. In addition, we’ve made fixes to the error messages and their color coding and associated them with the appropriate form fields.
	* We’ve added alternative texts for all images used in the UI.
	* When you navigate to a page in the UI, we’ve added the appropriate name on the browser page as well. For example, when you create a new chart, on the browser you’ll see New Chart &#124; Tanzu Observability.

* **Dashboard Performance Improvements**: Previously, by default, the **Show Events** option was enabled to show the events from charts. This could increase the total query time of a dashboard. With this release, when you create a dashboard, by default the **Show Events** option is set to **None**. You can change this setting based on your needs. See [Control Event Overlays](charts_events_displaying.html#control-event-overlays) for details and screenshots.

* **Wavefront Top**: We have released the 1.2 version of the [wftop utility](https://github.com/wavefrontHQ/wftop) that has fixes for multiple CVE issues.

* **Wavefront Proxy**: We’ve just released Wavefront Proxy 12. For details on the changes, see the [Wavefront proxy GitHub page](https://github.com/wavefrontHQ/wavefront-proxy/releases).

* **Integrations**: We had an integrations release in October! We made a lot of bug fixes and improvements to a number of integrations, including the Wavefront Usage integration. See the [Integration Release Notes](integrations_new_changed.html#october-2022) for details.




## Past Release Notes

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
