---
title: Wavefront Release Notes
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Learn about new and updated features in Wavefront.
---

This page lists new and updated features in the Wavefront service. 

## 2021-25.x Release Notes

* **Anomaly Detection on Charts**: With this release, we deprecate the support of AI Genie and replace it with new functionality. You can now use the [**Anomaly Detection**](anomaly_detection.html), which is available for Line Plot chats and turn anomaly detection on. You can investigate the anomalies, which are highlighted in a different manner depending on their size, you can also select a specific anomaly. You can also [create alerts by using the `anomalous ()` function](ts_anomalous.html#using-the-anomalous-function-in-alerts), but note, that you must do that with caution.

![Anomalies highlighted with purple square and purple circle](images/anomaly_hightlighting.png)

* **Accessibility Improvements**: 

  In addition to the already existing keyboard navigation for some of the Wavefront UI pages, now we add [support for end-to-end keyboard navigation](wavefront_keyboard_shortcuts.html) for the following UI pages:

  * Dashboard editor to create a new dashboard page
  * Chart page
  * Integrations list page
  * Kubernetes integration page
  * Sources Browser pages
  * Maintenance Windows page
  * User profile page
  * Metrics Browser page

  We also include drag-and-drop keyboard navigation when you create or edit charts. To enter drag mode, press **Space**, use the arrow keys to move the item, for example a query line, and press **Space** to drop it in its new position. You can rearrange query lines, functions within a query line in Query Builder, variables, and so on.

* **Azure AD Integration Improvements**: Updated the setup and the [setup instructions in the Azure AD Integration](azure_ad.html). Now you can easily set up the Azure AD integration without the need to contact our support team so that users can authenticate to Wavefront through Azure AD instead of using a password.  


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

## Release Notes of Other Wavefront Components

* For Wavefront Proxy, your go-to place is the [Wavefront proxy github page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.

* For the latest changes and releases of the Wavefront Integrations, see [New and Changed Integrations](integrations_new_changed.html).
