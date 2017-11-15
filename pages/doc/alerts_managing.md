---
title: Managing Alerts
keywords: alerts
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_managing.html
summary: Learn how to manage alerts.
---

You can create and edit alerts, view alert history, and snooze and unsnooze alerts. 

For details about how alerts work in Wavefront, see [Alert States and Lifecycle](alerts_states_lifecycle.html).

To view and manage alerts, click the **Alerts** button or select **Browse > Alerts**.


{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## Creating an Alert

To create an alert:

<ol>
<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Select <strong>Alerts</strong> and click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li markdown="span"><strong>Chart</strong> - Hover over a query field and click the <strong>Create Alert</strong> link below the query field. ![create_alert_chart](images/create_alert_chart.png)<br />The ts() expression in the selected query field populates the alert's Condition field.</li>
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
<ul><li><strong>Actual Firings (existing alerts only)</strong> - Select this radio button to display past alert-generated event icons on the chart. You will see how often the alert actually fired within the given chart time window.</li>
<li><strong>Backtesting</strong> - Select this radio button to display hypothetical alert-generated events icons on the chart. You will see how often an alert hypothetically would fire within the given chart time window based on the conditional threshold and the <strong>Alert fires</strong> field. Backtesting enables you to fine tune new or existing alert conditions before you save them.

Backtesting does not always exactly match the actual alert firing. For example, if data comes in late, backtest events won't match the actual alert firing. And even if data are meeting the alert condition for the "condition is true for x mins" amount of time, the alert itself might not fire because the alert check, determined by the alert check interval, happens too soon or too late. For both cases, backtesting shows the alert as firing while the actual alert might not show as firing. </li></ul>
</td>
</tr>
<tr>
<td>Name</td>
<td>Name of the alert. The name must contain 1-255 characters. Pick a simple name that makes it easy to identify the alert's purpose. </td>
</tr>
<tr>
<td>Condition</td>
<td>A conditional ts() expression that defines the threshold for the alert. You can use any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> constructs in the expression. You can use free form query mode or the <a href="query_language_query_builder.html">Query Builder</a> to create the expression. The expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time during which the Condition expression must be true before the alert fires. The minimum number of minutes is 1.  For example, if you enter 5, the alerting engine reviews the value of the Condition during the last 5 minute window to determine if the alert should fire or not.</li>
<li><strong>Alert resolves</strong> - Length of time during which the Condition expression must be false before the alert switches to resolved. The minimum number of minutes is 1.  If you don't specify a time, defaults to the <strong>Alert fires</strong> setting.</li></ul>For details on theses settings and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
<div><strong> Setting Alert resolves to a value that is lower than Alert fires can result in  multiple resolve-fire cycles under certain circumstances. </strong></div>
</td>
</tr>
<tr>
<td>Display Expression</td>
<td markdown="span">Optional. The query that is sent to targets when notified of alert state changes. You can use free form query mode or the [Query Builder](query_language_query_builder.html) to create the expression. Use this field to show a more helpful query, for example, the underlying time series. If not set, the query sent is the expression in the Condition field.</td>
</tr>
<tr>
<td>Severity</td>
<td>How important the alert is. In decreasing importance:  SEVERE, WARN, SMOKE, and INFO.</td>
</tr>
<tr>
<td>Targets</td>
<td markdown="span">Targets to notify when the alert changes state.  For example, notifications are sent when an alert changes state from FIRING to CHECKING, and when an alert is snoozed. A list of: ten different email addresses, pager services such as [PagerDuty](integrations.html#in-product-integrations) and [VictorOps](integrations.html#in-product-integrations), communication channels such as [Slack](integrations.html#in-product-integrations) and [HipChat](integrations.html#in-product-integrations), and [webhooks](webhooks_alert_notification.html) separated by commas. See [Using Alert Targets](webhooks_alert_notification.html) for details.
</td>
</tr>
<tr>
<td>Additional Information</td>
<td>Any additional information about the alert, such as a link to a run book.</td>
</tr>
<tr>
<td>Tags</td>
<td>Assigned alert tags. You can enter existing alert tags or create new alert tags.</td>
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
<td>Click the <strong>Obsolete Metrics</strong> check box to include metrics that did not report for 4 weeks or more. Customers who use queries that aggregate data in longer timeframes sometimes want to include those obsolete metrics.</td>
</tr>
</tbody>
</table>
</li>
<li>Click <strong>Save</strong>.</li>
</ol>

## Editing an Alert

To edit an alert, click the alert name in the Alerts browser or select ![action_menu](images/action_menu.png#inline) **> Edit** at the far right of the alert.

## Cloning and Deleting Alerts

To clone or delete an alert, select ![action_menu](images/action_menu.png#inline) **> \[Clone \| Delete\]** at the far right of the alert.

To delete one or more alerts, select the checkboxes next to one or more alerts and click <i class="fa-trash fa"/>.

## Exploring Alert History

Alert history shows the changes that have been made to an alert over time. To access the alert history, select ![action menu](images/action_menu.png#inline) **> Versions** from the menu located to the right of an alert on the Alerts page. Alert history shows:
* Which user made the changes
* The date and time the changes were made, 
* A description of the changes. 
You can revert back to or clone a past alert version. Alert history was implemented in Q4 of 2015, so you may not see any change history prior to that time if the alert was created before that time.

## Snoozing and Unsnoozing Alerts

There are certain times when you want to silence an alert, whether the conditional is met or not. You can do this by snoozing an alert. Wavefront allows you to snooze one or more alerts for 30 minutes, 1 hour, 6 hours, 1 day, 1 week, or Forever. If you choose Forever, the alert is snoozed until it is unsnoozed.

To snooze one or more alerts:

1. Check the checkboxes next to the desired alert(s).
1. Click the **Snooze** dropdown and select the desired duration.
1. Click the Snooze confirmation.

To snooze a single alert, select **Snooze > \<Duration\>** at the far right of the alert.

To unsnooze alerts, check the checkboxes next to the alerts and select **Snooze > Unsnooze**. To unsnooze a single alert, select **Snooze > Unsnooze** at the far right of the alert.

## Managing Alert Tags

See [Organizing with Tags](tags_overview.html).
