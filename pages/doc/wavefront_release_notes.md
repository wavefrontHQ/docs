---
title: Wavefront Release Notes
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Learn about new and updated features in Wavefront.
---

This page lists new and updated features in the Wavefront service.

## 2021-17.x Release Notes

* **Create Alerts for Your Services**: Now, you can [create alerts for your services](tracing_ui_overview.html#create-alerts) from the tracing application status page. 
* **Full PromQL Support in the UI**: We've expanded the limited PromQL support and we added:
 
  * Full support for creating charts and alerts with PromQL queries.
  * Admin-level setting that determines whether users can write queries in PromQL. 
  * Additional user-level settings for PromQL behavior. For example, you can display the translation to Wavefront query language for any PromQL query, by default.  

  See [Using PromQL in Wavefront](wavefront_prometheus.html) for information about enabling PromQL and how to use PromQL in charts and alerts.

   ![Prometheus query](images/prometheus_sample.png)

* **UI Updates**: The **System Preferences** option that Administrators can access from the gear icon, is now renamed to **Organization Settings**.

* **Pass a Time Window in Markdown Charts**: You can now pass a time window in a markdown chart, so that the dynamic link to a chart or a dashboard in the markdown chart respectively opens a chart or a dashboard within the current time range. For details, see [Markdown Chart](ui_chart_reference.html#markdown-chart).

## 2021-16.x Release Notes

* **Alert Notifications to Tracing Dashboard**: Customize your alert notification to [include a link to a Tracing Service dashboard](alert_target_customizing.html#include-a-link-to-a-tracing-service-dashboard).
* **Deprecation of HipChat Integration**: The HipChat integration is no longer available in the product or the documentation.
* **Trace ID Search Ignores Selected Time Window**: When you search for a Trace ID, the search now returns results regardless of the selected time window.


## 2021-15.x Release Notes

* **Product Improvements**: Going forward, spans that have the `$` character in the application or service name are rejected by Wavefront.
* **Documentation Improvements**:
  * A new video that highlights the features of the Traces Browser.
    <iframe src="https://bcove.video/3vaNJM7" width="700" height="400" allowfullscreen="true" alt="Highlights the Wavefront traces browser features."></iframe>
  * In response to user feedback, we updated the [Kubernetes Troubleshooting guide](wf_kubernetes_troubleshooting.html).


## Past Release Notes

- [2021-14.x Release Notes](2021.14.x_release_notes.html)
- [2021-08.x Release Notes](2021.08.x_release_notes.html)
- [2020-42.x Release Notes](2020.42.x_release_notes.html)
- [2020-38.x Release Notes](2020.38.x_release_notes.html)
- [2020-30.x Release Notes](2020.30.x_release_notes.html)
- [2020-26.x Release Notes](2020.26.x_release_notes.html)
- [2020-22.x Release Notes](2020.22.x_release_notes.html)
- [2020-14.x Release Notes](2020.14.x_release_notes.html)


For Wavefront Proxy, your go-to place is the [Wavefront proxy github page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
