---
title: Alerts
keywords: alerts
tags: [alerts, events]
sidebar: doc_sidebar
permalink: alerts.html
summary: Learn how alerts work, and how to create and examine them.
---
Legacy monitoring systems are limited to simple, threshold-based alerts. With Wavefront, you can create smart alerts that dynamically filter noise and capture true anomalies. The end results is fewer false alarms and faster remediation when real issues occur.

## How Alerts Work

An alert defines:
* The conditions under which metric values indicate a system problem and
* One or more targets to notify when the condition evaluates to true or false
* For a specified period of time.

An alert [fires](alerts_states_lifecycle.html#when-alerts-fire) when a metric reaches a value that indicates a problem.

You express alert [conditions](alerts_states_lifecycle.html#alert-conditions) using [Wavefront Query Language](query_language_getting_started.html) expressions.

Wavefront can display actual firings or hypothetical alert-generated events using backtesting. Backtesting enables you to fine tune new or existing alert conditions before you save them.

### Backtesting

Backtesting does not always exactly match the actual alert firing. For example, if data comes in late, backtest events won't match the actual alert firing. And even if data are meeting the alert condition for the "condition is true for x mins" amount of time, the alert itself might not fire because the alert check, determined by the alert check interval, happens too soon or too late. For both cases, backtesting shows the alert as firing while the actual alert might not show as firing.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## Creating an Alert

To create an alert:

<ol>
<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Select <strong>Alerts</strong> and click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li markdown="span"><strong>Chart</strong> - Hover over a query field and click the <strong>Create Alert</strong> link below the query field. </li>
</ul></li>
<li>Fill in the alert properties.
<table id="alert-properties">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>Events Display</td>
<td>Whether to display actual or hypothetical alert firing <a href="charts_events_displaying.html">event icons</a> on the preview chart.
<ul><li><strong>Actual Firings (existing alerts only)</strong> - Displays past alert-generated event icons on the chart. You will see how often the alert actually fired within the given chart time window.</li>
<li><strong>Backtesting</strong> - Displays hypothetical alert-generated events icons on the chart. You will see how often an alert hypothetically would fire within the given chart time window based on the conditional threshold and the <strong>Alert fires</strong> field. See <strong>Backtesting</strong> above. </li></ul>
</td>
</tr>
<tr>
<td>Name</td>
<td>Name of the alert. The name must contain 1-255 characters. Pick a name that makes it easy to identify the alert's purpose. </td>
</tr>
<tr>
<td>Condition</td>
<td>A conditional ts() expression that defines the threshold for the alert. You can use any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> construct in the expression. The expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time during which the Condition expression must be true before the alert fires. The minimum number of minutes is 1.  For example, if you enter 5, the alerting engine reviews the value of the Condition during the last 5 minute window to determine if the alert should fire or not.</li>
<li><strong>Alert resolves</strong> - Length of time during which the Condition expression must be false before the alert switches to resolved. The minimum number of minutes is 1.  If you don't specify a time, defaults to the <strong>Alert fires</strong> setting.</li></ul>For details on theses settings and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
<div><strong>Note:</strong> Setting Alert resolves to a value that is lower than Alert fires can result in  multiple resolve-fire cycles under certain circumstances. </div>
</td>
</tr>
<tr>
<td>Display Expression</td>
<td markdown="span">Optional. The query that is sent to targets when notified of alert state changes. Use this field to show a more helpful query, for example, the underlying time series. If not set, the query sent is the expression in the Condition field.</td>
</tr>
<tr>
<td>Severity</td>
<td>How important the alert is. In decreasing importance:  SEVERE, WARN, SMOKE, and INFO.</td>
</tr>
<tr>
<td>Targets</td>
<td markdown="span">Targets to notify when the alert changes state.  For example, notifications are sent when alert state changes from FIRING to CHECKING, and when an alert is snoozed. A list of: ten different email addresses, pager services such as [PagerDuty](integrations.html#in-product-integrations) and [VictorOps](integrations.html#in-product-integrations), communication channels such as [Slack](integrations.html#in-product-integrations) and [HipChat](integrations.html#in-product-integrations), and [webhooks](webhooks_alert_notification.html) separated by commas. See [Using Alert Targets](webhooks_alert_notification.html) for details.
</td>
</tr>
<tr>
<td>Additional Information</td>
<td>Any additional information, such as a link to a run book.</td>
</tr>
<tr>
<td>Tags</td>
<td>Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing with Tags](tags_overview.html).</td>
</tr>
</tbody>
</table>

Click the <strong>Advanced</strong> link to configure the following alert properties:

<table>
<tbody>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
<tr>
<td>Checking Frequency</td>
<td markdown="span">Number of minutes between checking whether <strong>Condition</strong> is true. Minimum and default is 1. When an alert is in the [INVALID state](alerts_states_lifecycle.html), it is checked approximately every 15 minutes, instead of the specified checking frequency.</td>
</tr><tr>
<td>Resend Notifications</td>
<td>Whether to resend notification of a firing alert. If enabled, you can specify the number of minutes to wait before resending the notification.</td>
</tr>
<tr>
<td>Metrics</td>
<td>Click the <strong>Obsolete Metrics</strong> check box to include metrics that did not report for 4 weeks or more. Customers who use queries that aggregate data in longer timeframes sometimes want to include those older metrics.</td>
</tr>
</tbody>
</table>
</li>
<li>Click <strong>Save</strong>.</li>
</ol>

## Viewing Alerts and Alert History

To view alerts, click the **Alerts** button or select **Browse > Alerts**. A list of alerts displays. Here's an example that shows when the alert fires that is described in [Tutorial: Getting Started](tutorial_getting_started.html#create-an-alert):

![Alert firing](images/alert_firing.png)

To view alert details, click the <i class="fa-bar-chart fa" style="color: #337ab7;"/> icon in the State column. A chart displays with two queries:

- **&lt;Alert name&gt;** - the alert condition.
- **Past Firings** - an [events() query](events_queries.html) that shows past firings of the alert.

For example, for the alert shown above, the chart displays:

![Alert queries](images/alert_queries.png)

The Firings column shows how many times an alert changed from non-firing to firing in the last day, week, and month.

Alert history shows the changes that have been made to an alert over time. To access the alert history, select ![action menu](images/action_menu.png#inline) **> Versions** from the menu located to the right of an alert on the Alerts page. Alert history shows:
* Which user made the changes
* The date and time the changes were made,
* A description of the changes.
You can revert back to or clone a past alert version. Alert history was implemented in Q4 of 2015. Even if the alert was created before that time, you won't see history before Q4 of 2015.

## Alert Notifications and Alerts

When an alert changes state, a notification containing alert information and a link to a chart is sent to the alert targets.

* You can add simple targets (email and PagerDuty) directly in the alert's Targets field.
* You can explicitly create an [alert target](webhooks_alert_notification.html) and add that target to your alert.

For example, if you have configured an email address as the alert target, you receive an email like the following whenever the alert fires, adds or removes an affected source, resolves, or is updated:

![alert_email](images/alert_email.png)

When you click the link in the notification, you see the following queries:

{% include shared/alert_details.html %}

![Alert notification](images/alert_notification_queries.png)

## Alert Events

As alerts fire, update, and resolve, [events](events.html) are created in Wavefront. You can optionally display those events as [icons](charts_events_displaying.html) on a chart's X-axis:

![event icons](images/event_icons.png)
