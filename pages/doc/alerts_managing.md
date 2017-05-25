---
title: Managing Alerts
keywords: alerts
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_managing.html
summary: Learn how to manage alerts.
---
To view and manage alerts, click the **Alerts** button or select **Browse > Alerts**.
 
{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

This topic describes how to manage alert objects, view alert history, and snooze and unsnooze alerts. 

For additional details about how alerts work in Wavefront, see [Alert States and Lifecycle](alerts_states_lifecycle.html).

## Creating an Alert
 
To create an alert:

<ol>
<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Select **Alerts** and click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
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
<ul><li><strong>Actual Firings (existing alerts only)</strong> - Display past alert-generated event icons on the chart. This tells you how often the given alert has actually fired within the given chart time window.</li>
<li><strong>Backtesting</strong> - Display hypothetical alert-generated events icons on the chart. This tells you how often an alert hypothetically would fire within the given chart time window based on the conditional threshold and the <strong>Alert fires</strong> field. Backtesting enables you to fine tune new or existing alert conditions before saving.</li></ul>
</td>
</tr>
<tr>
<td>Name</td>
<td>The name of the alert. The name must contain 1-255 characters. The name should be simple while still making it easy to identify its purpose.</td>
</tr>
<tr>
<td>Condition</td>
<td>A conditional ts() expression that defines the threshold for the alert. You can use any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> constructs in the expression. You can use free form query mode or the <a href="query_language_query_builder.html">Query Builder</a> to create the expression. The expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - The length of time during which the Condition expression must be true before the alert fires. The minimum number of minutes is 2.  If you enter 5 the alerting engine reviews the value of the Condition during the last 5 minute window to see if the alert should fire or not.</li>
<li><strong>Alert resolves</strong> - The length of time during which the Condition expression must be false before the alert switches to resolved. The minimum number of minutes is 2.  If you don't enable this field and specify a time, it defaults to the <strong>Alert fires</strong> setting.</li></ul>For details on theses settings and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
</td>
</tr>
<tr>
<td>Display Expression</td>
<td markdown="span">Optional. The query sent to targets when notified of alert state changes. You can use free form query mode or the [Query Builder](query_language_query_builder.html) to create the expression. If not set, the query sent is the expression in the Condition field.</td>
</tr>
<tr>
<td>Severity</td>
<td>How important the alert is. In decreasing importance:  SEVERE, WARN, SMOKE, and INFO.</td>
</tr>
<tr>
<td>Targets</td>
<td markdown="span">The targets to notify when the alert changes state.  For example, notifications are sent when an alert changes state from FIRING to CHECKING, and when an alert is snoozed. A list of: ten different email addresses, pager services such as [PagerDuty](alerts_integrating_pagerduty.html) and [VictorOps](alerts_integrating_victorops.html), communication channels such as [Slack](alerts_integrating_slack.html) and [HipChat](alerts_integrating_hipchat), and [webhooks](webhooks_managing.html) separated by commas.
</td>
</tr>
<tr>
<td>Additional Information</td>
<td>Any additional information pertinent to the alert. An example would be a link to a run book.</td>
</tr>
<tr>
<td>Tags</td>
<td>Assigned alert tags. You can enter existing alert tags or create new alert tags.</td>
</tr>
</tbody>
</table>

Click the <strong>Advanced</strong> link to configure the properties:

<table>
<tbody>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
<tr>
<td>Checking Frequency</td>
<td markdown="span">The number of minutes between checking whether <strong>Condition</strong> is true. Minimum and default is 1. When an alert is in the [INVALID state](alerts_states_lifecycle.html), it is checked approximately every 15 minutes, instead of the specified checking frequency.</td>
</tr><tr>
<td>Resend Notifications</td>
<td>Whether to resend notification of a firing alert and if enabled, the number of minutes to wait before resending the notification.</td>
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

Alert history provides you with changes that have been made to an alert over time. You can access the alert history by selecting ![action menu](images/action_menu.png#inline) **> Versions** from the menu located to the right of an alert on the Alerts page. When you select Versions, a page displays contain a list of versions of the alert. Alert history tells you which user made the changes, the date and time the changes were made, and a description of the changes. You can revert back to or clone a past alert version. Alert history was implemented in Q4 of 2015, so you may not see any change history prior to that time if the alert was created before that time.

<!--
[Alert metrics](alerts_hierarchies.html) allow you to view alert history in addition to refining the alert firing criteria. You view the count of all firing alerts for a period of time in the Alerts browser, similar to how the All Dashboards page shows the frequency of dashboard views over time. In addition, you can use ts() expressions on the alert counter metrics to analyze further. The following are examples of types of questions you can answer by looking at these metrics:

- What are the noisiest alerts? 
- What alerts fire the most out of all my alerts? I would them focus in on those alerts to determine if I can reduce the firing (maybe by fixing root cause, maybe by tuning alert conditions, etc.)
- What are the noisiest sources? What source have the most firing alerts associated with them?
- What is the firing history of a particular alert?
- What is the firing history of a particular source?
-->

## Snoozing and Unsnoozing Alerts

There are certain times when you want to silence an alert, whether the conditional is met or not. You can do this by snoozing an alert. Wavefront allows you to snooze one or more alerts for 30 minutes, 1 hour, 6 hours, 1 day, 1 week, or Forever. If you choose Forever, then the alert is snoozed until a user unsnoozes it.
 
To snooze one or more alerts:

1. Check the checkboxes next to the desired alert(s).
1. Click the **Snooze** dropdown and select the desired duration.
1. Click the Snooze confirmation.
 
To snooze a single alert, select **Snooze > \<Duration\>** at the far right of the alert.

To unsnooze alerts, check the checkboxes next to the alerts and select **Snooze > Unsnooze**. To unsnooze a single alert, select **Snooze > Unsnooze** at the far right of the alert.

## Managing Alert Tags

See [Organizing with Tags](tags_overview.html).


