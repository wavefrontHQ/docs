---
title: Release Notes and Announcements
keywords:
tags:
sidebar: doc_sidebar
permalink: wavefront_release_notes.html
summary: Announcements and new and updated features in Tanzu Observability by Wavefront.
---

This page lists new and updated features for the Tanzu Observability by Wavefront service.

* For **Wavefront Proxy**, your go-to place is the [Wavefront proxy github page](https://GitHub.com/wavefrontHQ/java/releases). On that page, you can see releases in progress and GA versions. If proxy changes are important for the service, we update this doc set, for example, with new configuration parameters, ports, etc.
* For the latest changes and releases of our **Integrations**, see the [Integrations Release Notes](integrations_new_changed.html).
* For **Observability for Kubernetes**, go to the [release notes for Wavefront Collector for Kubernetes GitHub repository](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/releases).

## Announcements

* **Upcoming Removal of the Service Accounts from the Everyone Group**

    In the next release(s), the service accounts that are still part of the predefined **Everyone** group will be removed from this group. This will not impact any existing functionality and integrations. Last year, all service accounts were added to the new predefined **Service Accounts** group. See the [2021-42.x Release Notes](2021.49.x_release_notes.html#2021-42x-release-notes) for details.

    {% include important.html content="Ensure that the service accounts in your organization do not depend on the **Everyone** group permissions."%}

* **Upcoming Deprecation of v1 Dashboards and Charts**

    In the next releases, all v1 dashboards and charts will be migrated to v2. Users can no longer select the v1 version of dashboards and charts.

    Most users are already using the v2 GUI. However, if your dashboards and charts are migrated, see [What's New in v2 Dashboards & Charts](ui_v2_faq.html) for info.

# 2022-11.x Release Notes

  <table>
  <tbody>
  <tr>
  <td width="50%"><strong>Toolbar improvements</strong>:<br/><br/>
  All objects and items related to the alerts are accessible through the <strong>Alerting</strong> menu. Instead of clicking <strong>Browse</strong> on the toolbar to access alert targets and maintenance windows, you can click <strong>Alerting</strong> and select:
  <ul><li><strong>All Alerts</strong> - to open the Alerts Browser page.</li>
  <li><strong>Alert Targets</strong> - to open the Alerts targets page.</li>
  <li><strong>Maintenance Windows</strong> - to open the Maintenance Windows page.</li>
  <li><strong>Create Alert</strong> - to create a new alert.</li>
  </ul>
  </td>
  <td width="50%"><img src="/images/create_alert_browser.png" alt="The new alerting menu on the toolbar."></td>
  </tr>
  <tr>
  <td width="50%"><strong>Improved user experience for slow loading queries</strong>:<br/><br/>
  You can stop and easily reload slow loading charts on dashboards. When you open a dashboard, and you see that a chart is slowly loading, instead of refreshing the whole browser page, you can click the <strong>Stop</strong> button on the chart to stop fetching the data. To reload the query request, simply click <strong>Reload</strong>. <br/>
  In addition, you can see a progress bar at the bottom of the chart.
  </td>
  <td width="50%"><img src="/images/stop-reload-chart.png" alt="A chart with reload button and a progress bar at the bottom."></td>
  </tr>
  <tr>
  <td width="50%"><strong>Sorting of columns in pinned legends</strong>:<br/><br/>
  You can now sort columns in the legend for most chart types after you pin a legend in a chart (Shift+P). See the screenshot on the right.
  </td>
  <td width="50%"><img src="/images/sort_legend.png" alt="A pinned legend with up and down arrows for each column."></td>
  </tr>
  </tbody>
  </table>


## 2022-09.x Release Notes

**Drilldown Links on Charts Improvement**: You can now use drilldown links to send users to a target section of a dashboard. See [How Do Drilldown Links Work](ui_charts_faq.html#how-do-drilldown-links-work).


## 2022-08.x Release Notes


**Usage Portal**: As more teams use the Tanzu Observability by Wavefront service within an enterprise, the central team (Super Admins) needs a better mechanism to track their points per second (PPS) usage, manage consumption, and also put limits to manage costs.

We have now made [monitoring](examine_usage.html) of the ingested PPS much easier. As a Wavefront Super Admin, you can track and monitor how ingested data is used, whether you will be billed for more data, and whether you will need to request more data. You can also create [ingestion policies](ingestion_policies.html) and monitor how different accounts contribute to the PPS usage.

{% include note.html content="The new Usage Portal and Ingestion Policy functionality is currently available to some of our customers. It will become available to all customers within the next releases."%}

![Example of the Usage Summary dashboard.](images/usage_overview.png)



## Past Release Notes

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
