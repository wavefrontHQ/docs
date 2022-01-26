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

In February, all v1 dashboards and charts will be migrated to v2. Users can no longer select the v1 version of dashboards and charts.

{% include important.html content="Most Wavefront users are already using the v2 GUI. However, if your dashboards and charts are migrated, see [What's New in v2 Dashboards & Charts](ui_v2_faq.html) for info. "%}


## 2022-03.x Release Notes

We have added a new **API Tokens** permission for user accounts only.

{% include important.html content="All existing users, who were previously able to generate their own API tokens, can still use and manage their existing API tokens. However, to generate new API tokens for their accounts, users now need to be granted the **API Tokens** permission. "%}

To enable users to generate API tokens:
1. Log in to Wavefront as an administrator.
2. Click the gear icon and select **Accounts**.
4. On the **User Accounts** tab, select one or more users.
5. Click **+Permission** and select **API Tokens**.


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
<tr>
<td width="50%">
<strong>UI Updates and Improvements</strong>:
<ul>
<li>After you pin a legend in a chart (Shift-P), you can now sort the columns in the legend. See the screenshot on the right.</li>
<li>Changed the name of the <strong>Accounts, Groups & Roles</strong> permission to <strong>Accounts</strong> and changed the name of the <strong>Account Management</strong> menu item to <strong>Accounts</strong>. </li>
<li>Keyboard navigation improvements in the <strong>Create Dashboard</strong> wizard and in the Chart UI pages. The sections that you add are now numbered, e.g. Section 1 instead of New Section. </li>
</ul>
</td>
<td width="50%"><img src="/images/sort_legend.png" alt="A pinned legend with up and down arrows for each column."></td>
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

<!---
* **UI Updates and Improvements**:
  - Changed the name of the **Accounts, Groups & Roles** permission to **Accounts** and changed the name of the **Account Management** menu item to **Accounts**.
  - Keyboard navigation fixes in the Create Dashboard wizard and in the Chart UI pages. The sections that you add are now numbered, e.g. Section 1 instead of New Section.
  - After you pin a legend in a chart, you can sort the columns in the legend.--->

<!---
* **Chart Builder UI Improvements**: When you create a chart and enter a query, you can click the lightbulb icon on the right to get some hints and insights on the functions that you're using. These hints and insights will help you to understand the Wavefront query language, predict cardinality issues, and improve performance. In addition, we show a pop-up window with definitions and tips when you hover over the data displayed in the chart. This pop-up window includes:
  - Points Scanned: Raw metric points for a query.
  - Duration: Time between query start and return of result.
  - Cardinality: Number of unique time series. A unique time series has unique metric name, source name and point tags (key and value).
--https://jira.eng.vmware.com/browse/MONIT-23306 Ask Renate to confirm about this feature and https://jira.eng.vmware.com/browse/MONIT-25866--->





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
