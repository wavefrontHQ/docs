---
title: Alerts
keywords: alerts
tags: [alerts, events]
sidebar: doc_sidebar
permalink: alerts.html
summary: Learn how alerts work, and how to create and examine them.
---
Legacy monitoring systems are limited to simple, threshold-based alerts. With Wavefront, you can create smart alerts that dynamically filter noise and capture true anomalies. The end results is fewer false alarms and faster remediation when real issues occur.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## How Alerts Work

An alert defines:
* The condition under which metric values indicate a system problem.
* One or more targets to notify when the condition evaluates to true or false for a specified period of time.

An alert [fires](alerts_states_lifecycle.html#when-alerts-fire) when a metric reaches a value that indicates a problem.

You express alert [conditions](alerts_states_lifecycle.html#alert-conditions) using [Wavefront Query Language](query_language_getting_started.html) expressions.

View this video for an overview:
[Monitoring Your Data With Alerts](https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=68cd255b-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true)

### Backtesting

Wavefront can display actual firings or hypothetical alert-generated events using backtesting. Backtesting enables you to fine tune new or existing alert conditions before you save them.

Backtesting does not always exactly match the actual alert firing. For example, if data comes in late, backtest events won't match the actual alert firing. And even if data are meeting the alert condition for the "condition is true for x mins" amount of time, the alert itself might not fire because the alert check, determined by the alert check interval, happens too soon or too late. For both cases, backtesting shows the alert as firing while the actual alert might not show as firing.

## Creating an Alert

To create an alert:

<ol>

<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Select <strong>Alerts</strong> and click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li markdown="span"><strong>Chart</strong> - Hover over a query field and click the <strong>Create Alert</strong> link below the query field. </li>
</ul></li>

<li>Fill in the following required and recommended alert properties.
<table id="alert-properties">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Name</strong></td>
<td>Name of the alert. The name must contain 1-255 characters. Pick a name that makes it easy to identify the alert's purpose. </td>
</tr>

<tr>
<td><strong>Condition</strong></td>
<td>A conditional ts() expression that defines the threshold for the alert. The condition expression can include any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> construct. The condition expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be true before the alert fires. Minimum is 1.  For example, if you enter 5, the alerting engine reviews the value of the condition during the last 5 minute window to determine whether the alert should fire.</li>
<li><strong>Alert resolves</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be false before the alert switches to resolved. Minimum is 1.  Omit this setting to use the <strong>Alert fires</strong> setting.
Pick a value that is greater than or equal to the <strong>Alert fires</strong> to avoid potential chains of resolve-fire cycles. </li>
</ul>

For details and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
</td>
</tr>

<tr>
<td><strong>Display Expression</strong></td>
<td><em>Recommended.</em> A ts() expression that returns the data you want to inspect when the alert fires. The display expression can include any valid <a href="query_language_getting_started.html">Wavefront Query Language</a> construct, and typically returns the underlying time series being tested by the condition expression. The results of the display expression are shown:
<ul>
<li>In the <strong>Events Display</strong> preview chart on the page for creating or editing the alert.</li>
<li markdown="span">In any [chart image](#chart-images-in-alert-notifications) that is included in a notification triggered by the alert.</li>
<li  markdown="span">In the [interactive chart](#interactive-charts-linked-by-alert-notifications) you can visit from a notification triggered by the alert.</li>
</ul>

If you leave this field blank, the condition expression is used. Note, however, that the values returned by the condition expression are either 0 or 1, which might not provide the information you want to inspect when the alert changes state. </td>
</tr>

<tr>
<td><strong>Severity</strong></td>
<td>How important the alert is. In decreasing importance:  SEVERE, WARN, SMOKE, and INFO.</td>
</tr>

<tr>
<td><strong>Target List</strong></td>
<td>Targets to notify when the alert changes state, for example, from CHECKING to FIRING, or when the alert is snoozed. You can specify up to ten different targets across the following types. Use commas to separate targets of the same type.
<ul>
<li><strong>Email</strong> - Valid email addresses. Alert notifications are sent to these addresses in response to a default set of triggering events, and contain default HTML-formatted content.</li>

<li  markdown="span"><strong>PagerDuty Key</strong> - PagerDuty keys obtained by following the steps for the [PagerDuty integration](pagerduty.html). Alert notifications that use these keys are sent in response to a default set of triggering events, and contain default content.</li>

<li><strong>Alert Target</strong> - Names of <a href="webhooks_alert_notification.html">custom alert targets</a> that you have previously created to:

<ul>
<li  markdown="span">Configure webhook notifications for pager services and communication channels. Follow the steps for the [VictorOps integration](victorops.html), [Slack integration](slack.html), or [HipChat integration](hipchat.html) for notifications on these popular messaging platforms. </li>
<li>Configure email or PagerDuty notifications with nondefault content or triggers. </li>
</ul>

</li>
</ul>
</td></tr>
</tbody>
</table>
</li>


<li>Optionally fill in the following additional alert properties.
<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr><td><strong>Events Display</strong></td>
<td>Whether to display actual or hypothetical alert firing <a href="charts_events_displaying.html">event icons</a> on the preview chart.
<ul><li><strong>Actual Firings (existing alerts only)</strong> - Displays past alert-generated event icons on the chart. You will see how often the alert actually fired within the given chart time window.</li>
<li><strong>Backtesting</strong> - Displays hypothetical alert-generated events icons on the chart. You will see how often an alert hypothetically would fire within the given chart time window based on the conditional threshold and the <strong>Alert fires</strong> field. See <strong>Backtesting</strong> above. 
</li></ul>
</td></tr>

<tr>
<td><strong>Additional Information</strong></td>
<td>Any additional information, such as a link to a run book.</td>
</tr>
<tr>
<td><strong>Tags</strong></td>
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing with Tags](tags_overview.html). </td>
</tr>
</tbody>
</table>
</li>

<li>Optionally click the <strong>Advanced</strong> link to configure the following alert properties:
<table>
<tbody>
<thead><tr><th width="20%">Property</th><th width="80%">Description</th></tr></thead>
<tr>
<td><strong>Checking Frequency</strong></td>
<td markdown="span">Number of minutes between checking whether <strong>Condition</strong> is true. Minimum and default is 1. When an alert is in the [INVALID state](alerts_states_lifecycle.html), it is checked approximately every 15 minutes, instead of the specified checking frequency.</td>
</tr><tr>
<td><strong>Resend Notifications</strong></td>
<td>Whether to resend notification of a firing alert. If enabled, you can specify the number of minutes to wait before resending the notification.</td>
</tr>
<tr>
<td><strong>Metrics</strong></td>
<td>Whether to include obsolete metrics. If enabled, the alert considers metrics that have not reports for 4 weeks or more. Customers who use queries that aggregate data in longer timeframes sometimes want to include those older metrics.</td>
</tr>
</tbody>
</table>

</li>

<li>Click <strong>Save</strong>.</li>
</ol>

Watch this video to see the process:
[Creating an Alert](https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6a27a841-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true)

## Viewing Alerts and Alert History

To view alerts, click the **Alerts** button or select **Browse > Alerts**. A list of alerts displays. Here's an example that shows when the alert fires that is described in [Tutorial: Getting Started](tutorial_getting_started.html#create-an-alert):

![Alert firing](images/alert_firing.png)

To view alert details, click the chart icon in the State column. A chart displays with two queries:

- **&lt;Alert name&gt;** - the alert condition.
- **Past Firings** - an [events() query](events_queries.html) that shows past firings of the alert.

For example, for the alert shown above, the chart displays:

![Alert queries](images/alert_queries.png)

The **Firings** column shows how many times an alert changed from non-firing to firing in the last day, week, and month.

Alert history shows the changes that have been made to an alert over time. To access the alert history, click he three dots to the left of the alert on the Alerts page and click **Versions**. Alert history shows:
* Which user made the changes.
* The date and time the changes were made.
* A description of the changes.
You can revert back to or clone a past alert version.

## Editing an Alert

You can change an alert at any time.

1. Click the **Alerts** button or select **Browse > Alerts** to display the Alerts page. 
2. Click the name of the alert you want to change to display the Edit Alert page.
3. Update the properties you want to change, and click **Save**.


## Alert Notifications

Alerts report their significant state changes by sending notifications to the alert targets in their target lists. Each such notification contains information extracted from the alert about its state change.

The timing of an alert notification depends on the alert target: 

* For simple targets (email addresses and PagerDuty keys added directly in the alert's **Target List**), notifications are sent whenever the alert is firing, updated, resolved, snoozed or in a maintenance window.
* For [custom alert targets](webhooks_alert_notification.html), notifications are sent in response to the particular triggering events that were specified for the target.

### Sample Alert Notification

If you have specified your email address as the alert target, you receive an email like the following whenever the alert fires:

![alert_email](images/alert_email.png)


### Chart Images in Alert Notifications

When an alert starts firing or is updated, the resulting alert notification can include an image of a chart showing data at the time the alert was triggered. The [sample email notification](#sample-alert-notification) above includes the following chart image:

![alert_chart_only](images/alert_chart_only.png)

Chart images show the results of an alert's display expression. If you have set the alert's [**Display Expression** field](#alert-properties) as recommended, the chart image provides a snapshot of the time series being tested by the alert. 

A chart image is a static snapshot that captures the state of the data at the time the alert was triggered. Such a snapshot can be helpful for diagnosing a possible [misfiring alert](alerts_states_lifecycle.html#misfiring-alerts), because the chart image can show you the exact state of the data that caused the alert to fire. (In contrast, an [interactive chart](#interactive-charts-linked-by-alert-notifications) viewed through the notification shows the data at the time you bring up the chart, which might include data that was backfilled after a delay.) Note that all chart images are shown in Coordinated Universal Time (UTC), regardless of the time zone set for your live data charts.

For performance reasons, a chart image is included only if the alert's conditional query takes a minute or less to return. The chart image itself can take a few moments to create, in which case you'll briefly see a placeholder image in your notification until the chart image is ready. 

Chart images are automatically included in notifications for: 
* Simple alert targets -- that is, email addresses and PagerDuty keys that are added directly in the alert's target list. 
* [Custom alert targets](webhooks_alert_notification.html) for PagerDuty notifications.

You can optionally include chart images in notifications for [custom alert targets](webhooks_alert_notification.html) for other messaging platforms. As of 2018-26.x, chart images are included in the predefined templates for custom HTML email targets and for Slack targets.

**Note** If you created a custom alert target before 2018-26.x and you want to include chart images in notifications to that target, you must edit the alert target's template.  See [Adding Chart Images to Older Custom Alert Targets](alert_target_customizing.html#adding-chart-images-to-older-custom-alert-targets) for sample setup instructions for updating an email alert target.

### Interative Charts Linked by Alert Notifications

An alert notification includes a URL that links to an interactive chart showing data at the time the alert was triggered. The [sample email notification](#sample-alert-notification) above displays the URL as a **View Alert** button that you can click to see the following interactive chart:

![alert_interactive_chart](images/alert_interactive_chart.png)

The interactive chart viewed through an alert notification shows the results of the alert's display expression. If you have [set the alert's **Display Expression** field](#alert-properties) as recommended, the interactive chart shows the time series being tested by the alert. Depending on the state change that triggered the alert, the interactive chart provided for it can display additional queries for alert events and alert metrics:

{% include shared/alert_details.html %}

Interactive charts enable you to investigate your data by performing additional queries, changing the time window, and so on. Note that interactive charts always show the current state of your data as of the time you bring up the chart, which could be somewhat later than the event triggering the alert. This time difference can allow delayed data to be backfilled, which could obscure the reason why the alert fired. If you suspect a [misfiring alert](alerts_states_lifecycle.html#misfiring-alerts), you can inspect a [chart image](#chart-images-in-alert-notifications) included in the notification.

## Alert Events

As alerts fire, update, and resolve, [events](events.html) are created in Wavefront. You can optionally display those events as [icons](charts_events_displaying.html) on a chart's X-axis:

![event icons](images/event_icons.png)
