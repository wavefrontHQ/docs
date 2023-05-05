---
title: Operations for Applications Permissions in VMware Cloud Services
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: csp_permissions_overview.html
summary: Learn about the permissions in VMware Aria Operations for Applications on VMware Cloud services.
---
All users can perform certain default tasks. However, you must have the appropriate permissions to manage objects. If you do not have permission, UI menu selections and buttons required to perform management tasks are not visible.

## Default Tasks

All users can:

  * View the dashboards, alerts, metrics, sources, events, maintenance windows, and alert notification pages.

      {% include note.html content="It's possible that [access to dashboards and alerts](csp_access.html#how-access-control-works) is limited." %}
  * Add dashboards to the list of favorites.
  * View existing dashboards and charts.
  * Create and interact with charts – but NOT save charts.
  * Share links to dashboards and charts with other users.
  * Access the user profile from the gear icon <i class="fa fa-cog"/> on the toolbar.

## Operations for Applications Permissions

VMware Cloud services allows users with the **Organization Owner** and **Organization Administrator** roles to perform access control for object management based on Operations for Applications permissions. 
- Permissions can be assigned to roles only, and roles can be assigned users, user groups, and server-to-server apps.
- For each permission, there is a corresponding built-in [Operations for Applications service role](csp_getting_started.html#what-operations-for-applications-service-roles-are-available) with assigned only that permission.
- Permissions can be assigned to [custom roles](csp_getting_started.html#what-is-a-custom-role).

<table>
    <tr>
      <th width="30%">Permission</th>
      <th width="70%">Description</th>
    </tr>
    <tr>
      <th>Alerts</th>
      <td>Can create, edit, and delete <a href="alerts.html">alerts</a>, <a href="webhooks_alert_notification.html">alert targets</a>, and <a href="maintenance_windows_managing.html">maintenance windows</a>. Also, can manage alert tags and view alert history.</td>
    </tr>
    <tr>
      <th>Applications</th>
      <td>Can <a href="tracing_apdex.html">update the threshold (T)</a> of the Application Performance Index (Apdex) score and <a href="trace_sampling_policies.html">create sampling policies</a>.</td>
    </tr>
    <tr>
      <th>Batch Query Priority</th>
      <td>When an account with that permission runs a query, the query engine treats that query as if it was wrapped in the <a href="trace_sampling_policies.html">bestEffort() function</a>.</td>
    </tr>
    <tr>
      <th>Chart Embedding</th>
      <td>Can <a href="ui_sharing.html#embed-a-chart-in-other-uis">generate HTML snippets of charts</a> in Operations for Applications and embed a corresponding interactive chart outside of Operations for Applications. Embedded chart URLs are associated with a specific user account. If a user embeds a chart and later that user’s account is removed, the embedded chart no longer works.</td>
    </tr>
    <tr>
      <th>Dashboards</th>
      <td>Can create, manage, and delete <a href="ui_dashboards.html">dashboards</a> and <a href="ui_charts.html">charts</a> and manage dashboard tags.</td>
    </tr>
    <tr>
      <th>Derived Metrics</th>
      <td>Can create and manage registered queries. <a href="derived_metrics.html">Derived metrics</a> support reingesting a query.</td>
    </tr>
    <tr>
      <th>Direct Data Ingestion</th>
      <td>Can <a href="direct_ingestion.html">directly ingest metrics</a> using the REST API or one of the SDKs, bypassing the proxy. Grant this permission only to users who have a deep understanding of APIs and the Operations for Applications ingestion path.</td>
    </tr>
    <tr>
      <th>Events</th>
      <td>Can create, manage, and close user <a href="events.html">events</a> and manage event tags.</td>
    </tr>
    <tr>
      <th>External Links</th>
      <td>Can create, update, and delete <a href="external_links_managing.html">external links</a>.</td>
    </tr>
    <tr>
      <th>Ingestion Policies</th>
      <td>Can create, edit, and delete <a href="ingestion_policies.html">ingestion policies</a>.</td>
    </tr>
    <tr>
      <th>Integrations</th>
      <td>Can install and uninstall <a href="integrations.html">integration dashboards and alerts</a>.</td>
    </tr>
    <tr>
      <th>Logs</th>
      <td>Can <a href="logging_log_browser.html">view logs</a> and <a href="logging_drill_into_logs.html">drill into logs</a> from charts, alerts, and traces. In combination with the <strong>Dashboards</strong> service role or permission, can <a href="logging_logs_chart.html">create logs charts</a>.
      <p><strong>Note:</strong> Logs (Beta) is enabled only for selected customers. To participate, contact your Operations for Applications account representative.</p></td>
    </tr>
    <tr>
      <th>Metrics</th>
      <td>Can manually <a href="metrics_managing.html#hide-and-redisplay-metrics">hide and unhide</a> metrics and metric prefixes. Also, can create and modify <a href="metrics_managing.html">metrics security policy rules</a>.
      <p><strong>Important:</strong> Server to server apps must have this permission to run queries. </p></td>
    </tr>
    <tr>
      <th>Proxies</th>
      <td>Can view, create, and manage <a href="proxies_installing.html">proxies</a> and set up external <a href="label_integrations%20list.html">integrations</a> with AWS and other cloud services.</td>
    </tr>
    <tr>
      <th>Source Tags</th>
      <td>Can manage <a href="sources_managing.html">sources</a> and source tags. If you don’t have this permission, source tags will be rejected with a 403 error.</td>
    </tr>
  </table>