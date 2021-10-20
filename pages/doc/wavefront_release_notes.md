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

## 2021-42.x Release notes

* **New Service Accounts Group**: All existing service accounts are moved from the **Everyone** group to the new **Service Accounts** group. Make sure that you:

   1. Review your Dashboards and Alerts access control lists and include the new **Service Accounts** group, according to your needs. 
      
      For example, if you have granted service accounts with access to certain dashboards and alerts through the **Everyone** group, you must update the access list to include the **Service Accounts** group or specific service accounts, so that the service accounts can access the same dashboards and alerts after the migration.
   
   2. Review and adjust the permissions that are currently set on your **Service Accounts** group according to your needs.

## 2021-40.x Release Notes 
   
* **SYNTAX_ERROR Alert State**: Starting with this release, a SYNTAX_ERROR alert state indicates that the alert query resulted in a syntax error. This might happen, for example, if a text string with special characters is missing double quotes, but could be the result of other query errors.
   
   The error state is visible, for example, in the Alerts Browser and the Alerts Browser search bar.
   
* **Upcoming Service Accounts Changes**: Within the next releases all service accounts that you have created in your Wavefront environment will be moved out of the **Everyone** group and added to a new **Service Accounts** group.
   
   {% include important.html content="Any roles and groups with the name `Service Accounts` will be marked with the `(Existing)` suffix." %}

## Past Release Notes

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
