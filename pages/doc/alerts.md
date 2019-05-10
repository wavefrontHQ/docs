---
title: Alerts
keywords: alerts
tags: [alerts, events, videos]
sidebar: doc_sidebar
permalink: alerts.html
summary: Learn how alerts work, and how to create and examine them.
---
With Wavefront, you can create smart alerts that dynamically filter noise and capture true anomalies. When you create an alert, you specify one or more alert targets that receive the alert notification(s). You can view an image of the chart in the alert notification, and click a link to see the alert in context. The end result is fewer false alerts and faster remediation when real issues occur.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}


## Wavefront Alerts

An alert defines:
* The condition under which metric values indicate a system problem.
* One or more targets to notify when the condition evaluates to true or false for a specified period of time.
* Optionally, information about the alert notification format.

Wavefront supports classic alerts, where each alert has one preset severity, and multi-threshold alerts, where an alert can have different severities for different threshold values.

### Alert Condition

The alert condition is a ts() expression that defines the threshold for an alert.
* If an alert's Condition field is set to a conditional expression, for example `ts("requests.latency") > 195`, then all data values that satisfy the condition are marked as `true` (1) and all data values that do not satisfy the condition are marked as `false` (0).
* If the Condition field is set to a ts() expression, for example `ts("cpu.loadavg.1m")`, then all _non-zero_ data values are marked as `true` and all zero data values are marked as `false`. If there is _no reported data_, then values are neither true nor false.

An alert [fires](alerts_states_lifecycle.html#when-alerts-fire) when a metric stays at a value that indicates a problem for the specified amount of time.
* A **classic alert** send a notification with the specified severity to all specified targets.
* A **multi-threshold alert** allows you to specify multiple severities and a different target for each severity.

### Alert Target

Each alert is associated with one or more alert targets. The alert target specifies who to notify when the alert changes state.
* For classic alerts, you specify a severity and one or more corresponding alert targets. You can set up email, PagerDuty, and custom alert targets.
* For multi-threshold alerts, you can specify a different alert target for each threshold, for example, an email target when the alert reaches the INFO threshold and a PagerDuty target when the alert reaches the SEVERE threshold. You can specify only custom alert targets, but it's easy to set up a custom email or PagerDuty alert target.

## Alert Basics Videos
In this video, Clement explains how classic alerts work:
<p><a href="https://www.youtube.com/watch?v=VjmWExKiYYg&index=1&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_alerting_clement.png" style="width: 700px;"/></a>
</p>


In this video, Jason explains classic alerts while he's showing them in the UI:
<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=68cd255b-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_monitor_with_alerts.png" style="width: 700px;"/></a>
</p>



## Creating an Alert

You can create a classic alert with a single severity level (e.g. SEVERE) or a multi-threshold alert, which allows you to customize alert behavior for different thresholds. For each threshold, you select a corresponding severity and one or more targets to notify in case the threshold is met.


### Creating a Classic Alert
Required fields for a classic alert are:
* Alert name (default is New Alert)
* Alert condition
* Alert severity

You also specify one or more alert targets to notify when the alert fires.

To create a classic alert:

<ol>

<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Select <strong>Alerts</strong> and click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li markdown="span">**Chart** - Hover over a query field and click the **Create Alert** link below the query field.
![create_alert](images/create_alert.png)</li>
</ul></li>

<li>Specify the following required alert properties.
<table id="alert-properties">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Name</strong></td>
<td>Name of the alert. 1-255 characters. </td>
</tr>

<tr>
<td><strong>Condition</strong></td>
<td>A conditional ts() expression that defines the threshold for the alert. The condition expression can include any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> construct. The condition expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>true</em> before the alert fires. Minimum is 1.  For example, if you enter 5, the alerting engine reviews the value of the condition during the last 5 minute window to determine whether the alert should fire.</li>
<li><strong>Alert resolves</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>not true</em> before the alert switches to resolved. Minimum is 1.  Omit this setting or pick a value that is greater than or equal to the <strong>Alert fires</strong> value to avoid resolve-fire cycles. </li>
</ul>

For details and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
</td>
</tr>

<tr>
<td><strong>Severity</strong></td>
<td>How important the alert is. In decreasing importance:  SEVERE, WARN, SMOKE, and INFO.</td>
</tr>

</tbody>
</table>
</li>

<li>(Recommended) Specify a list of alert targets to notify when the alert changes state, for example, from CHECKING to FIRING, or when the alert is snoozed. You can specify up to ten different targets across the following types. Use commas to separate targets of the same type.
<table id="alert-targets">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr><td><strong>Email</strong></td> <td>Valid email addresses. Alert notifications are sent to these addresses in response to a default set of triggering events, and contain default HTML-formatted content.</td></tr>

<tr><td><strong>PagerDuty Key</strong></td>
<td markdown="span">PagerDuty keys obtained by following the steps for the [PagerDuty integration](pagerduty.html). Alert notifications that use these keys are sent in response to a default set of triggering events, and contain default content.</td></tr>

<tr><td><strong>Alert Target</strong></td>
<td>Names of <a href="webhooks_alert_notification.html">custom alert targets</a> that you have previously created to:

<ul>
<li  markdown="span">Configure webhook notifications for pager services and communication channels. Follow the steps for the [VictorOps integration](victorops.html), [Slack integration](slack.html), or [HipChat integration](hipchat.html) for notifications on these popular messaging platforms. </li>
<li>Configure email or PagerDuty notifications with nondefault content or triggers. </li>
</ul>
</td>
</tr>

</tbody>
</table>
</li>
<li>(Recommended) Specify a <strong>Display Expression</strong>. Defaults to the value of the condition expression, either 0 or 1. Specify a display expression to get more details when the alert changes state.

The display expression can include any valid Wavefront Query Language construct, and typically captures the underlying time series that the condition expression is testing. The results of the display expression are:
<ul>
<li>Shown in the <strong>Events Display</strong> preview chart on the page for creating or editing the alert.</li>
<li markdown="span">Shown in any [chart image](#chart-images-in-alert-notifications) that is included in a notification triggered by the alert.</li>
<li  markdown="span">Shown in the [interactive chart](#interactive-charts-linked-by-alert-notifications) you can visit from a notification triggered by the alert.</li>
<li markdown="span">Used as the basis for any [statistics](alert_target_customizing.html#alert-series-statistics) that you might include in a [custom notification](alert_target_customizing.html) triggered by the alert. </li>
</ul>

</li>

<li>
(Optional) To help you find the alert and information about it in the Alerts browser, specify <strong>Additional Information</strong> and <strong>Tags</strong>.
<table id="alert-tags">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Additional Information</strong></td>
<td>Any additional information, such as a link to a run book.</td>
</tr>
<tr>
<td><strong>Tags</strong></td>
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing Related Alerts](#organizing-related-alerts.html). </td>
</tr>
</tbody>
</table>
</li>

<li>(Optional) Click the <strong>Advanced</strong> link to configure the following alert properties. The defaults for those properties are often appropriate.
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
<td>Whether to include obsolete metrics. If enabled, the alert considers metrics that have not reported for 4 weeks or more. Customers who use queries that aggregate data in longer time frames sometimes want to include those older metrics.</td>
</tr>
</tbody>
</table>

</li>

<li>Click <strong>Save</strong>.</li>
</ol>

### Video: Creating a Classic Alert
This video shows how Jason creates a classic alert:

<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6a27a841-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_alerts_creating.png" style="width: 700px;"/></a>
</p>

### Creating a Multi-Threshold Alert

Required fields for a multi-threshold alert are:
* Alert name (defaults to New Alert)
* Alert condition and operator (e.g. greater than>)
* At least one severity and corresponding threshold value.

For each severity, you can specify one or more alert targets to notify [when the alert changes state](alerts_states_lifecycle.html#when-threshold-alerts-notify-targets). Only custom alert targets are supported, but you can initially create the alert without specifying a target.

**Note:** You cannot associate an alert target with more than one severity.

In contrast to classic alerts, Wavefront creates a display expression for a multi-threshold alert. The expression shows the alert condition.

To create a multi-threshold alert:

<ol>

<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Click the <strong>Alerts</strong> button, then click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li markdown="span">**Chart** - Hover over a query field and click the **Create Alert** link below the query field.
![create_alert](images/create_alert.png)</li>
</ul></li>
<li markdown="span">Next to **Type**, click **Threshold**.
</li>
<li>Fill in the following required alert properties.
<table id="alert-properties">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Name</strong></td>
<td>Name of the alert. 1-255 characters. </td>
</tr>

<tr>
<td><strong>Condition</strong></td>
<td>A ts() expression that defines the threshold for the alert. The condition expression can include any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> construct. The condition expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>true</em> before the alert fires. Minimum is 1.  For example, if you enter 5, the alerting engine reviews the value of the condition during the last 5 minute window to determine whether the alert should fire.</li>
<li><strong>Alert resolves</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>not true</em> before the alert switches to resolved. Minimum is 1.  Omit this setting or pick a value that is greater than or equal to the <strong>Alert fires</strong> to avoid potential chains of resolve-fire cycles. </li>
</ul>

For details and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
</td>
</tr>
<tr><td><strong>Operator</strong></td>
<td>Select one of the operators, for example, greater than or . The operator determines which values are allowed for the different severity thresholds. For example, if the operator is greater than, then SEVERE must be the highest number and INFO must be the lowest number, and the numbers must increase from INFO to SEVERE. You don't have to specify all 4 severities.</td>
</tr>
<tr>
<td><strong>Severity</strong></td>
<td>For multi-threshold alerts, specify more than one severity - or create a Classic alert. Associate a threshold value with each severity. The order must match the operator. For example, you can specify a Operator =>, SEVERE 6000, and WARN 5000, but you can't specify SEVERE 5000, and WARN 6000 with that operator.
</td>
</tr>
</tbody>
</table>
</li>

<li>(Recommended) Specify a list of alert targets for each severity. Wavefront notifies the target(s) when the alert changes state, for example, from CHECKING to FIRING, or when the alert is snoozed. You can specify up to ten different targets for each severity. Use commas to separate targets. You cannot specify an email address or PagerDuty key. Instead, you specify names of <a href="webhooks_alert_notification.html">custom alert targets</a> that you already created. <br/>
<br/>
<strong>Note:</strong> You can associate each alert target only with one severity. For example, suppose you set up an alert to notify target T1 for the SEVERE severity. You cannot specify target T1 for any other severity in that alert.

</li>

<li>
(Optional) To help you find the alert and information about it, specify <strong>Additional Information</strong> and <strong>Tags</strong>.
<table id="alert-tags">
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Additional Information</strong></td>
<td>Any additional information, such as a link to a run book.</td>
</tr>
<tr>
<td><strong>Tags</strong></td>
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing Related Alerts](#organizing-related-alerts.html). </td>
</tr>
</tbody>
</table>
</li>

<li>(Optional) Click the <strong>Advanced</strong> link to configure the following alert properties. The defaults for those properties are often appropriate.
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

### Video: Creating a Multi-Threshold Alert

This video shows how to create a multi-threshold alert:

<p><a href=" https://youtu.be/qWBP6PrkUrU"><img src="/images/v_threshold_alerts.png" style="width: 700px;" alt="threshold alerts"/></a>
</p>


## Cloning or Deleting an Alert

If you want to make copies of an existing alert, then change the copy slightly, you can clone the alert.
1. Cick the **Alerts** button to display the Alerts page.
2. Click the 3 dots to the left of the alert.

   ![Alert cloning](images/clone_alert.png)

   * To clone an alert, click **Clone**, make changes when prompted, and click **Save**.
   * To delete an alert, click **Delete** and confirm the deletion.

## Viewing Alerts and Alert History

To view alerts click the **Alerts** button to display the Alerts browser. You can use alert names or alert tags to [search or filter](wavefront_searching.html) the list of alerts. You can also filter the list by **State** and **Severity**, to view, for example, just the alerts that are both FIRING and SEVERE. 

### View an Alert
The Alert browser shows the properties and current state of an alert. For example, an alert that is firing looks like this:

![Alert firing](images/alert_firing.png)

<!---
The **Firings** column shows how many times an alert changed from non-firing to firing in the last day, week, and month.
--->

### View Alert Details

To view alert details, click the chart icon in the State column in the Alerts browser. A chart displays with these queries:

- **&lt;Alert name&gt;** - the alert's Display Expression, if there is one. Otherwise, the alert condition.
- **Past Firings** - an [events() query](events_queries.html) that shows past firings of the alert.

For example, for the alert shown above, the chart displays:

![Alert queries](images/alert_queries.png)


### View Alert History

Alert history shows the changes that have been made to an alert over time. To access the alert history, click the three dots to the left of the alert in the Alerts browser and click **Versions**: 

![Alert queries](images/alert_history.png)


Alert history shows:
* Which user made the changes.
* The date and time the changes were made.
* A description of the changes.
You can revert back to or clone a past alert version.

You can also see at a glance [all firing alerts](alerts_states_lifecycle.html#viewing-firing-alerts) from the alert icon in the task bar.

## Editing an Alert

You can change an alert at any time.

1. Click the **Alerts** button to display the Alerts browser.
2. Click the name of the alert you want to change to display the Edit Alert page.
3. Update the properties you want to change, and click **Save**.

## Organizing Related Alerts

You can use alert tags to organize related alerts into categories. Alert tags are one of several kinds of [object tags](tags_overview.html) that Wavefront supports. Alert tags let you: 
* [Search or filter](wavefront_searching.html) the list of alerts in the Alerts browser to show only a category of alerts. 
* Suppress a category of alerts during a [maintenance window](maintenance_windows_managing.html). 
* [Reference a group of alert metrics](alerts_dependencies.html#referencing-alert-metrics) in a single expression. 

You can add a new or existing alert tag at any time:
* When you create or edit the alert, set the **Tags** property. 
* When you view the alert in the Alerts browser, click **+** at the bottom (next to existing alert tags, if any). 

You can use alert tags to establish the categories that are meaningful for your use cases. For example, you might assign tags like `networkOps`, `underDevelopment`, and `eastCoast` to indicate that an alert is maintained by the Network Operations team, is still experimental, and obtains metrics from a particular geographic region. You can search for one or more of these tags to find any other alerts that are in the same category or combination of categories.

You can use alert tag paths for categories that have multiple levels. For example, suppose you have created a group of alerts that you use as demo examples, and: 
* Within the demo group, some alerts monitor network activity, while others monitor request latency. 
* Within each subgroup, some alerts monitor production applications, while others monitor development applications. 

To help you manage these alerts, you assign the tag paths `example.network.prod`, `example.network.dev`, `example.latency.prod`, and `example.latency.dev`. The Alerts browser below shows the tag paths as a hierarchy under **Tag Paths** in the filter bar on the left. You can click **example** and then **network** to view all alerts that have a tag path that starts with `example.network`.

![Alert tag path](images/alert_tag_path.png)

In tasks such as creating a maintenance window, you can use a wildcard to match tag path components:
* `example.*.*` matches the entire group of demo alerts.
* `example.latency.*` matches all of the alerts that monitor request latency.
* `example.*.prod` matches all of the production alerts.

<!---
**Note** In simple use cases, you can organize related alerts by assigning them names that contain a common string. You can view just the related alerts by typing the common string in the search field. For example, searching for the string `Latency` might let you view alerts named `Latency Alert`, `Latency Dev Alert`, `Realtime latency`, and so on. 
--->




## Alert Events

As alerts fire, update, and resolve, [events](events.html) are created in Wavefront. You can optionally display those events as [icons](charts_events_displaying.html) on a chart's X-axis:

![event icons](images/event_icons.png)

## Backtesting

Wavefront can display actual firings or hypothetical alert-generated events using backtesting. Backtesting enables you to fine tune new or existing alert conditions before you save them.

When you create an alert, the Events Display is set to **Backtesting**. You can later edit the alert.

To change the events display:

1. Select the alert and click **Edit**.
2. Change the **Events Display**:
   - **Actual Firings**  - Displays past alert-generated event icons on the chart. You will see how often the alert actually fired within the given chart time window.
   - **Backtesting** - Displays hypothetical alert-generated event icons on the chart. You can see how often an alert  would fire within the chart time window based on the condition and the **Alert Fires** field.

Backtesting does not always exactly match the actual alert firing. For example, if data comes in late, backtest events won't match the actual alert firing. And even if data are meeting the alert condition for the "condition is true for x mins" amount of time, the alert itself might not fire because the alert check, determined by the alert check interval, happens too soon or too late. For both cases, backtesting shows the alert as firing while the actual alert might not show as firing.
