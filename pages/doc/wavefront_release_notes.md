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

* **Create alerts for your services**: Now you can [create alerts for your services](tracing_ui_overview.html#create-alerts) from the application status page. 

## 2021-16.x Release Notes

* **Alert Notifications to Tracing Dashboard**. Customize your alert notification to [include a link to a Tracing Service dashboard](alert_target_customizing.html#include-a-link-to-a-tracing-service-dashboard).
* **Deprecation of Hipchat Integration**. The Hipchat integration is no longer available in the product or the documentation.
* **Trace ID Search Ignores Selected Time Window**. When you search for a Trace ID, the search now returns results regardless of the selected time window.


## 2021-15.x Release Notes

* **Product improvements**: Going forward, spans that have the `$` character in the application or service name are rejected by Wavefront.
* **Documentation improvements**:
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
