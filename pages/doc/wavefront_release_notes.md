---
title: Wavefront Release Notes
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Learn about new and updated features in Wavefront.
---

This page lists new and updated features for the Wavefront service. 

* For **Wavefront Proxy**, your go-to place is the [Wavefront proxy github page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
* For the latest changes and releases of the **Wavefront Integrations**, see the [Integrations Release Notes](integrations_new_changed.html).
* For  **Observability for Kubernetes**, go to the [release notes for Wavefront Collector for Kubernetes GitHub repository](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/releases).


## 2022-01.x Release Notes

* **Chart Builder UI Improvements**: When you create a chart and enter a query, you can click the lightbulb icon on the right to get some hints and insights on the functions that you're using. These hints and insights will help you to understand the Wavefront query language, predict cardinality issues, and improve performance. In addition, we show a pop-up window with definitions and tips when you hover over the data displayed in the chart. This pop-up window includes:
  - Points Scanned: Raw metric points for a query.
  - Duration: Time between query start and return of result.
  - Cardinality: Number of unique time series. A unique time series has unique metric name, source name and point tags (key and value).
<!--https://jira.eng.vmware.com/browse/MONIT-23306 Ask Renate to confirm about this feature and https://jira.eng.vmware.com/browse/MONIT-25866--> 
  
* **Integration Improvements**: Made a fix on how the status of integrations is loaded, so that you can filter the integrations by state.
* **UI Updates and Improvements**: 
  - Updated the name of the **Accounts, Groups & Roles** permission to **Accounts**.
  - Updated the name of the **Account Management** menu item to **Accounts**.
  - Made a number of keyboard navigation fixes of the Create a dashboard wizard and the Chart UI pages. The sections that you add are now numbered, e.g. Section 1 instead of New Section.
  - After you pin a legend in a chart, you can sort the columns in the legend.

  
## Past Release Notes

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
