---
title: Wavefront Release Notes
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Learn about new and updated features in Wavefront.
---

This page lists new and updated features in the Wavefront service.

* For **Wavefront Proxy**, your go-to place is the [Wavefront proxy github page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.

* For the latest changes and releases of the **Wavefront Integrations**, see the [Integrations Release Notes](integrations_new_changed.html).

## 2021-27.x Release Notes

* **PromQL Compatibility Improvements**: Miscellaneous improvements. For example, the `percentile()`, `mpercentile()` and `variance()` functions now work as expected.
* **New Doc Page**: [Monitor Tanzu Mission Control with Wavefront](integrations_tmc_howto.html)

## 2021-26.x Release Notes


<!---Release Delayed
 * **Anomaly Detection on Charts**: With this release, we deprecate the support of AI Genie and replace it with the new [**Anomaly Detection**](anomaly_detection.html) feature, which is available for Line Plot chats.

  You can:
    * Turn anomaly detection on and off.
    * Explore all anomalies, which are highlighted in a different manner depending on their size.
    * Select a specific anomaly.
    * [Create alerts by using the `anomalous ()` function](ts_anomalous.html#using-the-anomalous-function-in-alerts), but note, that you must do that with caution, because queries with the `anomalous()` function are resource intensive.

  For example, in the line plot below you can see large and small anomalies. Large anomalies are highlighted with square purple borders and small anomalies are highlighted with cycle purple borders.

   ![Anomalies highlighted with purple square and purple circle](images/anomaly_hightlighting.png)
--->
* **Accessibility Improvements**:

  In addition to the already existing keyboard navigation for some of the Wavefront UI pages, now we have [**support for end-to-end keyboard navigation**](wavefront_keyboard_shortcuts.html) for the following UI pages:

  * [Create a dashboard wizard](ui_dashboards.html#create-a-dashboard)
  * Chart page
  * Integrations list page
  * Kubernetes integration page
  * Sources Browser pages
  * Maintenance Windows page
  * User profile page
  * Metrics Browser page

  We have also improved **drag-and-drop keyboard** navigation when you create or edit charts, or when you create or edit a metrics security policy. To use the drag-and-drop navigation:

  1. To enter drag mode, press **spacebar**.
  2. Use the arrow keys to move the item, for example a query line.
  3. Press **spacebar** to drop the item in its new position.

  You can rearrange:

  * Query lines
  * Functions within a query line in Query Builder
  * Variables
  * List values when you add variables to a dashboard
  * Metrics Security Policy rules


  **Colors** in all charts and dashboards, including service and operational dashboards, as well as Amazon Web Services dashboards, now support colorblind accessibility. Random chart colors are theme-specific. We also redesigned the color picker with a new color palette that is different for dark and light UI theme.

    ![Color picker for light theme](images/color-picker.png)

* **Azure AD Integration Improvements**: Updated the setup and the [setup instructions of the Azure AD Integration](azure_ad.html). You can now easily set up the Azure AD integration yourself without the need to contact our support team, so that users can authenticate to Wavefront through Azure AD instead of using a password.

* **New Metrics to Track RED Metrics**: Tracks delta counters, histograms, and points derived as [Tracing RED metrics](trace_data_details.html#red-metrics) that the collector receives. For details, see [Monitor Your Wavefront Service](wavefront_monitoring.html).
  * ~collector.delta_points.tracing_red.reported
  * ~collector.histograms.tracing_red.reported
  * ~collector.points.tracing_red.reported

  {% include note.html content="We have a corresponding direct ingestion metric for each metric. For example, corresponding to `collector.delta_points.tracing_red.reported` we have
  `collector.direct-ingestion.delta_points.tracing_red.reported`."%}


## Past Release Notes

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
