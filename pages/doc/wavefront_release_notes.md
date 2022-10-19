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


## 2022-40.x Release Notes

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
