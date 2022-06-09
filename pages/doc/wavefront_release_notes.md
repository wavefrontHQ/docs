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

## 2022-22.x Release Notes

This release of the Wavefront service includes the following improvements:
* Accessibility improvements (keyboard access, color contrast, etc.) on integration pages.

In addition:
* **Integrations**: The June 2022 integrations release was made available! It includes significant improvements to the Snowflake and Jenkins and more. See the [Integration Release Notes](integrations_new_changed.html#june-2022) for details.
* **Videos**: We migrated [all videos](videos.html) to VMware TV and created playlists for easy access. 



## 2022-20.x Release Notes

<table>
  <tbody>
    <tr>
      <td width="50%">
        <strong>Improved Help Panel</strong>:<p>
        You can now expand and collapse the help panel from the question mark icon on the toolbar.</p>
        <p>In addition, we have improved most of our help pages with the following sections.
        <ul>
        <li>The <strong>Read More</strong> section contains links which will bring you to relevant doc pages on <a href="index.html">docs.wavefront.com</a>.</li>
        <li>The <strong>Watch Videos</strong> section contains links to videos that will help you understand various Tanzu Observability concepts and tasks.</li>
        </ul></p>
      </td>
      <td width="50%">
        <img src="/images/help.png" alt="Question mark button at the top right on the toolbar.">
      </td>
    </tr>
  </tbody>
</table>

## 2022-19.x Release Notes

This release includes the following improvements in Tanzu Observability components:

* **Wavefront Proxy 11.1**: The Wavefront Proxy is now using a 6 week release cadence. We made the following improvements to [release 11.1](https://github.com/wavefrontHQ/wavefront-proxy/releases) last week:
    * Set span future fill limit to 24 hours: Spans sent with a timestamp that's more than 24 hours ahead of the current timestamp will be blocked.
    * Improved visibility for chained proxies: Client proxies chained to relay proxies now have visible status.
    * Added new `metric_length` metric related to memory buffer. To view: `ts(~proxy.*.metric_length.*)`
    * Updated dependencies versions.
* **OpenTelemetry metrics exporter**: Send metrics data from your applications to Tanzu Observability using the [Tanzu Observability (Wavefront) metrics exporter](opentelemetry_tracing.html#send-metrics-data) for OpenTelemetry, and use Charts and Dashboards to visualize the data.
* **May Integrations Release**: The May integrations release includes important updates to the Fluentd, Dynatrace, and Kubernetes integrations and other enhancements. See the [Integrations Release Notes](integrations_new_changed.html#may-2022) for details.
* **Updates for Customers with Service Accounts in the Everyone Group**: We removed all service accounts from the predefined **Everyone** group. With the previous release, we prepared for this removal, so that there's no impact on any existing functionality and integration.


## 2022-18.x Release Notes

**Updates for Customers with Service Accounts in the Everyone Group**

Last year, we [introduced](2021.49.x_release_notes.html#2021-42x-release-notes) the **Service Accounts** system group and added all [service accounts](service-accounts.html#what-are-service-accounts) to this group. To prepare for the upcoming removal of the remaining service accounts from the **Everyone** group, we did the following changes:

* For all dashboards and alerts that have the **Everyone** group in their view or view & modify access lists, we added the **Service Accounts** group to these lists. See [Managing Access to Dashboards and Alerts](access.html) for details.
* For all metrics security rules that have the **Everyone** group in their allow or deny access lists, we added the **Service Accounts** group to these lists. See [Metrics Security Policy Rules](metrics_security.html) for details.
* To preserve the current behavior for existing customers, we changed the default permissions for the service accounts to have view and modify access to newly created dashboards and alerts. To revoke these permissions for the service accounts, navigate to the **Organization Settings** page and on the **Security** tab, deselect the **Service Accounts** check box. See [Change the Access Control Security Organization Setting](access.html#change-the-access-control-security-organization-setting) for details.

## 2022-17.x Release Notes

<table>
<tbody>
<tr>
  <td width="50%">
  <strong>API Tokens Management</strong>:<p>
  Users with the <strong>Accounts</strong> permission can now view and revoke API tokens of any user or service account in the organization.</p>
  <p>See <a href="wavefront_api.html#view-and-manage-the-api-tokens-in-your-organization">View and Manage the API Tokens in Your Organization</a> for details.</p>
  </td>
  <td width="50%">
  <br/>
  <img src="/images/API_Tokens_admin.png" alt="The new API Tokens tab under the Accounts menu item.">
  </td>
</tr>
<tr>
  <td width="50%">
    <strong>Full Support for Embedded Charts</strong>:
    <br/>You can now <a href="ui_sharing.html#embed-a-chart-in-other-uis">embed all types of charts in other UIs</a>. For example, you can embed a chart in an internal or external website. With this release, we have added support for embedding the following types of charts:
    <ul>
    <li>Stacked Column</li>
    <li>Table</li>
    <li>TopK</li>
    <li>Node Map</li>
    <li>Histogram</li>
    <li>Heatmap</li>
    <li>Gauge</li>
    <li>Pie</li>
    </ul>
    See the screenshot on the right.
  </td>
  <td width="50%">
  <br />
  <img src="/images/embedded_chart_legend.png" alt="A screenshot of an embedded pie chart.">
  </td>
</tr>
<tr>
  <td width="50%">
  <strong>Chart Support in Alert Notifications and Other Systems</strong>:
  <p> We now support all types of chart images in all <a href="alerts_notifications.html#static-chart-image-in-notifications">alert notifications</a>, as well as Slack messages, etc. See the sample screenshot on the right.</p>
  </td>
  <td width="50%">
  <br/>
  <img src="/images/chart_embed_slack.png" alt="A screenshot of a chart included in a slack message.">
  </td>
  </tr>
<tr>
  <td width="50%">
  <strong>Importing Dashboard Sections From Other Dashboards</strong>:<p>
  When you create or edit a dashboard, you can import sections from other dashboards. In dashboard edit mode:</p>
  <ol>
  <li>Click <strong>Dashboard Templates</strong>.</li>
  <li>Select a section.</li>
  <li>Navigate through the provided <strong>Dashboard list filters</strong>, or search for the dashboard from which you want to import a section.</li>
  </ol>
  See <a href="ui_dashboards.html#create-a-dashboard-by-importing-sections-from-other-dashboards">here</a> for details on how to create a dashboard by importing sections from other dashboards.
  </td>
  <td width="50%">
  <br/>
  <img src="/images/import_dashboard_section.png" alt="The new Dashboard Templates button allowing you to select and import dashboard sections.">
  </td>
</tr>
<tr>
   <td width="50%">
   <strong>Improved Charts Experience</strong>:
   <p>
   <ul><li>
   We have improved the query stats experience. When you click the <strong>lightbulb icon</strong> for a query and hover over Cardinality, Points Scanned, or Duration, you can also see how much the query contributes to that chart stat. See the screenshot on the right. </li>
   <li>You can now enter SI or IEC units in the <strong>Min</strong> and <strong>Max</strong> fields for the Y Axis across different chart types.</li>
   </ul>
   </p>
   </td>
  <td width="50%">
  <br/>
  <img src="/images/improved-query-stats.png" alt="A screenshot of the cardinality tooltip for a query.">
  </td>
</tr>
<tr>
  <td width="50%">
  <strong>Documentation Improvements</strong>:
  <p>
  We updated the doc set with more information that comes from our Tanzu Observability SaaS Value Engineering team. Some information was added, some new doc pages are listed on the right.
  </p>
  </td>
  <td width="50%">
  <strong>Read More:</strong>
  <br />
  <ul>
  <li><a href="alerts_faq.html">Alerts FAQ (Expanded)</a></li>
  <li><a href="wavefront_usage_info.html#how-can-i-optimize-my-ingestion-rate">How Can I Optimize My Ingestion Rate?</a></li>
  <li><a href="proxies_troubleshooting.html">Proxy Troubleshooting</a></li>
  <li><a href="telegraf_details.html">Telegraf Troubleshooting</a></li>
  <li><a href="integrations_bigpanda_troubleshooting.html">Troubleshooting Alert Notifications to BigPanda Webhook Targets</a></li>
  </ul>
  </td>
</tr>
  </tbody>
</table>


## 2022-11.x Release Notes

  <table>
  <tbody>
  <tr>
    <td width="50%">
      <strong>Wavefront Proxy 11.0</strong>:
      <ul><li>We recently released Wavefront Proxy version 11.</li>
      <li>You can now <strong>send OpenTelemetry trace data directly</strong> from your applications to the Wavefront proxy. This is the recommended and simplest approach to get your data into Tanzu Observability.</li>
      </ul>
      </td>
    <td width="50%">
    <strong>Read More:</strong>
    <ul>
        <li><a href="https://github.com/wavefrontHQ/wavefront-proxy/releases">Wavefront Proxy Release Notes on GitHub</a></li>
        <li><a href="opentelemetry_tracing.html#directly-send-data-using-the-wavefront-proxy---recommended">Send OpenTelemetry Trace Data Directly Using the Wavefront Proxy</a></li>
        <li><a href="opentelemetry_logs.html">Enable Proxy Debug Logs for OpenTelemetry Data</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>New integrations</strong>:
      <ul><li>
      We just released several new integrations and integrations dashboards including a VMware Blockchain integration and a Control Plane dashboard for the Kubernetes integration. See the <a href="integrations_new_changed.html#march-2022">Integrations Release Notes</a> for details.</li></ul>
      </td>
    <td width="50%">
    <br/><img src="/images/kubernetes_control_plane.png" alt="The new alerting menu on the toolbar.">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>Documentation Improvements</strong>:<p>
      We updated the doc set with information that comes from the Tanzu Observability SaaS Value Engineering team. Some information was added, some new doc pages are listed on the right.</p>
    </td>
    <td width="50%">
      <strong>Read More:</strong>

      <ul>
        <li><a href="optimize_data_shape.html">Optimizing the Data Shape to Improve Performance</a></li>
        <li><a href="missing_data_troubleshooting.html">Troubleshooting Missing Data</a></li>
        <li><a href="query_language_metadata_functions.html">Metadata (Label Manipulation) Functions</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>Toolbar Improvements</strong>:<br/><br/>
      All objects and items related to alerts are available from the <strong>Alerting</strong> menu. Instead of clicking <strong>Browse</strong> on the toolbar to access alert targets and maintenance windows, you can click <strong>Alerting</strong> and select:
      <ul>
        <li><strong>All Alerts</strong> - to open the Alerts Browser page.</li>
        <li><strong>Alert Targets</strong> - to open the Alert Targets page.</li>
        <li><strong>Maintenance Windows</strong> - to open the Maintenance Windows page.</li>
        <li><strong>Create Alert</strong> - to create a new alert.</li>
        </ul>
    </td>
    <td width="50%">
      <br/><br/><img src="/images/create_alert_browser.png" alt="The new alerting menu on the toolbar.">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>Improved User Experience for Slow Loading or Failed Queries</strong>:
      <ul>
      <li>New <strong>progress bar</strong> at the bottom of each chart. </li>
      <li><strong>Slow Loading Queries</strong>: If you see that a chart on a dashboard is loading slowly, you can click a <strong>Stop</strong> button on the chart to stop fetching the data (instead of refreshing the whole browser page). To update the chart, click <strong>Reload</strong>.</li>
      <li><strong>Failed Queries</strong>: If a query on a chart <strong>fails to load data</strong>, click the <strong>Reload</strong> button to rerun the query.</li>
      <li>Hovering over the <strong>Stop</strong> button shows information about the <strong>state of the queries</strong> in the chart, such as loading time series, events, and so on.</li></ul>
    </td>
    <td width="50%">
      <br/><br/><br/><img src="/images/stop-reload-chart.png" alt="A chart with reload button and a progress bar at the bottom.">
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>Sorting of Columns in Pinned Legends</strong>:<br/><br/>
      You can now sort columns in the legend for most chart types after you pin a legend in a chart (Shift+P). See the screenshot on the right.
    </td>
    <td width="50%">
      <br/><img src="/images/sort_legend.png" alt="A pinned legend with up and down arrows for each column.">
    </td>
  </tr>
    </tbody>
  </table>

## 2022-09.x Release Notes

**Drilldown Links on Charts Improvement**: You can now use drilldown links to send users to a target section of a dashboard. See [How Do Drilldown Links Work](ui_charts_faq.html#how-do-drilldown-links-work).


## 2022-08.x Release Notes


**Usage Portal**: As more teams use the Tanzu Observability by Wavefront service within an enterprise, the central team (Super Admins) needs a better mechanism to track their points per second (PPS) usage, manage consumption, and also put limits to manage costs.

We have now made [monitoring](examine_usage.html) of the ingested PPS much easier. As a Wavefront Super Admin, you can track and monitor how ingested data is used, whether you will be billed for more data, and whether you will need to request more data. You can also create [ingestion policies](ingestion_policies.html) and monitor how different accounts contribute to the PPS usage.

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
