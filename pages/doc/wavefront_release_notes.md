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

## Announcing Deprecation of v1 Dashboards and Charts

In March, all v1 dashboards and charts will be migrated to v2. Users can no longer select the v1 version of dashboards and charts.

{% include important.html content="Most Wavefront users are already using the v2 GUI. However, if your dashboards and charts are migrated, see [What's New in v2 Dashboards & Charts](ui_v2_faq.html) for info. "%}

## 2022-06.x Release Notes

**UI Updates and Improvements**
<tr>
<td width="50%">
<ul>
<li>After you pin a legend in a chart (Shift-P), you can now sort the columns in the legend. See the screenshot on the right.</li>
<li>Changed the name of the <strong>Accounts, Groups & Roles</strong> permission to <strong>Accounts</strong> and changed the name of the <strong>Account Management</strong> menu item to <strong>Accounts</strong>. </li>
<li>Keyboard navigation improvements in the <strong>Create Dashboard</strong> wizard and in the Chart UI pages. The sections that you add are now numbered, e.g. Section 1 instead of New Section. </li>
</ul>
</td>
<td width="50%"><img src="/images/sort_legend.png" alt="A pinned legend with up and down arrows for each column."></td>
</tr>


## 2022-05.x Release Notes

* **Create and Manage Alerts Revamp**: Streamlined experience that improves usability and gives alert creators more options.
  - Straightforward settings during creation and edit.
  - New Runbooks and Triage Dashboard fields help alert recipients resolve the alert.
  - Alert notifications include actionable insights.

  See the [FAQ for the New Alert GUI](alerts_v2_faq.html), watch the [Create Alert Video](https://bcove.video/3o9bu6L), or look at the new [Create Alert Tutorial](alerts_manage.html#create-alert-tutorial).

  {% include tip.html content="When you open an existing alert for edit, you'll see it in alerts v2 GUI. However, all APIs work as before. See [FAQ for the New Alert GUI](alerts_v2_faq.html). "%}
  {% include note.html content="There will be a staggered rollout of this feature over the next few weeks. "%}

* **Turn off Dynamic Dashboard Variable Live Refresh**: Users with **Dashboard** permissions can now toggle whether a dashboard that shows live data performs [refresh of dynamic variables](ui_dashboards.html#turn-off-dynamic-dashboard-variable-live-refresh).

* **Decimal Precision in Charts**: We have included the **Decimal Precision** setting, and you can specify how many digits to show after the decimal point for a number of charts, such as:
    * Line Plot
    * Point Plot
    * Stacked Area
    * Stacked Column
    * Table

  See the [Chart Reference](ui_chart_reference.html) for details.

## 2022-04.x Release Notes

<!--* **Usage Portal**: As more teams use the Tanzu Observability by Wavefront service within an enterprise, the central team (Super Admins) needs a better mechanism to track their points per second (PPS) usage, manage consumption, and also put limits to manage costs.

   We have now made [monitoring](examine_usage.html) of the ingested PPS much easier. As a Wavefront Super Admin, you can track and monitor how ingested data is used, whether you will be billed for more data, and whether you will need to request more data. You can also create [ingestion policies](ingestion_policies.html) and monitor how different accounts contribute to the PPS usage.

   {% include note.html content="The new Usage Portal and Ingestion Policy functionality is currently available to some of our customers. It will become available to all customers within the next releases."%}

   ![Example of the Usage Summary dashboard.](images/usage_overview.png)-->

* **Obsolete Metrics Toggle for Dashboards**: You can now [include obsolete metrics](ui_examine_data.html#include-or-exclude-obsolete-metrics) in all charts within a dashboard. Doing so, data that have not been reported for 4 weeks or more are included for all the charts on the dashboard.

   {% include important.html content="Dashboard performance might suffer if you include obsolete metrics. Using the setting for individual charts is recommended."%}

* **New Sample Data Dashboards**: We have added new sample data dashboards, that allow you to investigate integrations dashboards and charts that contain sample data for our most used integrations. For details see: [Get to know our integration dashboards](https://docs.wavefront.com/integrations.html#get-to-know-the-integration-dashboards).

   {% include note.html content="The Sample Data Dashboards are currently available to some of our customers. They will become available to all customers within the next releases."%}

* **Set Up and Manage the AWS Integration by Using the API**: Learn how you can [use the Wavefront API to set up and manage the AWS integration](integrations_aws_overview_API.html).

## 2022-03.x Release Notes

We have added a new **API Tokens** permission for user accounts. This change **does not** affect service accounts.

{% include important.html content="All existing users, who were previously able to generate their own API tokens, can still use and manage their existing API tokens. However, going forward, only users who have the **API Tokens** permission can generate new API tokens. "%}

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
To enable users to generate API tokens:
<ol><li>Log in to Wavefront as a user with <strong>Accounts</strong> permission.</li>
<li>Click the gear icon and select <strong>Accounts</strong></li>
<li>On the <strong>User Accounts</strong> tab, select one or more users.</li>
<li>Click <strong>+Permission</strong> and select <strong>API Tokens</strong>.</li></ol>
</td><td width="40%">
<img src="/images/API_Tokens_permission_add.png" alt="API Tokens permission.">
</td>
</tr>
</tbody>
</table>

## 2022-01.x Release Notes

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>Query Editor Insights for Queries and Charts</strong>:
<ul><li>Click the ellipsis icon for the chart to see <a href="query_language_performance.html#use-statistics-and-suggestions">statistics for all queries in the chart</a>.</li>
<li>Click the lightbulb icon next to a query for <a href="query_language_performance.html#query-stats-and-suggestions">query stats and suggestions</a>.</li></ul>
</td>
<td width="50%"><img src="/images/stats_all.png" alt="Chart stats and query stats."></td>
</tr>
<tr>
<td width="50%">
<strong>Integration Improvements</strong>: You can now easily filter the integrations by state. See <a href="integrations.html#supported-states">Supported States</a>.
</td>
<td width="50%"><img src="/images/integration_state_relnotes.png" alt="List of integrations filtered by active state."></td>
</tr>
<!---
<tr>
<td width="50%">
<strong>Application Map Performance Improvements</strong>: The team has improved the App Map performance significantly. <br><br>As part of that effort, the App Map no longer shows the node count by default. Check <strong>Show Node Counts</strong> in the App Map settings to change the default.
</td>
<td width="50%"><img src="/images/show_node_counts.png" alt="App Map settings screenshot, show node count not checked."></td>
</tr>
--->
</tbody>
</table>







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
