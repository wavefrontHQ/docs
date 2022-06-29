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

## 2022-25.x Release Notes

This release includes:

* **Time Window Settings of Charts**: You can now specify the time window setting on a chart level. When you do this, even if you change the time window settings of the dashboard in which the chart is included, the time window settings of the chart will not be affected. For more information, see [Set the Time Window on a Chart](ui_charts.html#set-the-time-window-on-a-chart).

* **Override the No Data Message on Charts**: You can override the **No Data** message on charts when there is no data in the current time window and there's no error in your query. You can also select to display a link to the [Troubleshooting Missing Data](missing_data_troubleshooting.html) documentation page. For details, see [Override the No Data Message on a Chart](ui_charts.html#override-the-no-data-message-on-a-chart).

* **Integrations**: Another update of the integrations in June 2022. We made significant improvements to the Tanzu Application Service, vSphere, Consul, and Google Cloud Platform integrations. See the [Integration Release Notes](integrations_new_changed.html#june-2022) for details.

* **Documentation Improvements**: We have recently added new information and improved a list of docs, such as:
  * [Tanzu Observability FAQ](tobs_faq.html)
  * [Improve PPS and Prevent Overage](wavefront_usage_info.html)
  * [Tanzu Observability Pricing](wavefront_pricing.html)
  * [vSphere Integration Details](integrations_vsphere.html)

## 2022-24.x Release Notes

This release includes:

* **Accessibility Fixes**: We've made significant keyboard navigation improvements to many UI pages.
* **Tanzu Application Service to Tanzu Observability**: We released the Tanzu Application Service to Tanzu Observability integration on June 13.
  * [Monitor Tanzu Application Service with Tanzu Observability](integrations_tas_howto.html) explains the process end to end.
  * [Tanzu Observability and TAS Troubleshooting](tas_to_troubleshooting.html) has troubleshooting steps based on what we've learned during the Beta period.
* **Wavefront Proxy**: Proxy [version 11.3](https://github.com/wavefrontHQ/wavefront-proxy/releases/tag/proxy-11.3) is now available. 

  {% include important.html content="Do not install Proxy version 11.2. If you already installed version 11.2, upgrade to version 11.3." %}

## 2022-22.x Release Notes

This release of the Wavefront service includes the following improvements:
* Accessibility improvements (keyboard access, color contrast, etc.) on integration pages.

In addition:
* **Integrations**: The June 2022 integrations release was made available! It includes significant improvements to the Snowflake and Jenkins integrations, and more. See the [Integration Release Notes](integrations_new_changed.html#june-2022) for details.
* **Videos**: We migrated [all videos](videos.html) to VMware TV and created playlists for easy access.


## Past Release Notes

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
