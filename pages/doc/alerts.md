---
title: Alerts
keywords: alerts
tags: [alerts, events, videos]
sidebar: doc_sidebar
permalink: alerts.html
summary: Learn how alerts work, and how to create and examine them.
---
With Wavefront, you can create smart alerts that dynamically filter noise and capture true anomalies.
* Specify one or more **alert targets** that receive the alert notification(s).
* Create a **multi-threshold alert** to notify different targets depending on alert severity.
* View an image of the chart in the alert notification and click a link to see the alert in context.
* Examine firing alerts in **Alert Viewer** to get context.

The end result is fewer false alerts and faster remediation when real issues occur.

{% include note.html content="All users can view alerts. You need [Alerts permissions](permissions_overview.html) to create and modify alerts. If some of the alerts in your environment are under [access control](access.html), you can view or view and modify those alerts only if they've been shared with you." %}


## Wavefront Alerts

An alert defines:
* The condition under which metric values indicate a system problem.
* One or more targets to notify when the condition evaluates to true or false for a specified period of time.
* Optionally, information about the alert notification format.

Wavefront supports classic alerts, where each alert has one preset severity, and multi-threshold alerts, where an alert can have different severities for different threshold values.

### How to Create an Alert -- The Basics

You can create an alert from any chart, or from the **Create Alert** page. The basic process is the same.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>Specify the alert condition, for example, CPU utilization is less than 70%. </li>
<li>Optionally use backtesting to see how often the alert fires and adjust the threshold. </li>
<li>Add an alert target, that is, specify who will receive the alert and how (e.g., email or PagerDuty), then save the alert. </li></ol></td>
<td width="50%"><a href="https://youtu.be/CDqUWDA9NBM
"><img src="/images/v_alert_creation_overview.png" alt="Video of alert creation overview"/></a></td>
</tr>
</tbody>
</table>

The rest of this page explains:
* How you can fine-tune the process to get just the right number of alerts to just the right people.
* How to create alerts and customize the condition and the target.
* How to create multi-threshold alerts, which can send notifications to different targets based on the severity of the problem.

### Alert Condition

The alert condition is a query language expression that defines the threshold for an alert.
* If an alert's Condition field is set to a conditional expression, for example `ts("requests.latency") > 195`, then all data values that satisfy the condition are marked as `true` (1) and all data values that do not satisfy the condition are marked as `false` (0).
* If the Condition field is set to a base ts(), hs(), etc. expression, for example `ts("cpu.loadavg.1m")`, then all _non-zero_ data values are marked as `true` and all zero data values are marked as `false`. If there is _no reported data_, then values are neither true nor false.

An alert [fires](alerts_states_lifecycle.html#when-do-alerts-fire) when a metric stays at a value that indicates a problem for the specified amount of time.
* A **classic alert** sends a notification with the specified severity to all specified targets.
* A **multi-threshold alert** allows you to specify multiple severities and a different target for each severity. Each target is notified if the condition is met when the alert changes state.

### Alert Target

Each alert is associated with one or more alert targets. The alert target specifies who to notify when the alert changes state.
* For classic alerts, you specify a (single) severity and one or more corresponding alert targets. You can set up email, PagerDuty, and custom alert targets.
* For multi-threshold alerts, you can specify a different alert target for each threshold, for example, an email target when the alert reaches the INFO threshold and a PagerDuty target when the alert reaches the SEVERE threshold. You can specify only custom alert targets, but it's easy to set up a custom email or PagerDuty alert target.

   {% include note.html content="Alert targets subscribe to all notifications at their severity and above. For example, an alert target for an INFO severity receives all notifications for INFO, SMOKE, WARN,  and SEVERE. Because notifications potentially go to targets of different severities, you cannot associate an alert target with more than one severity. " %}

The **maximum number** of email alert targets is 10 for classic alerts and 10 per severity for multi-threshold alerts. If you exceed the number, you receive a message like the following:


`{"status":{"result":"ERROR","message":"Invalid notification specified: null","code":400}}`



## How Alerts Work Video

In this video, Clement explains how classic alerts work:

<p><a href="https://www.youtube.com/watch?v=VjmWExKiYYg&index=1&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_alerting_clement.png" style="width: 700px;"/></a>
</p>


In this video, Jason explains classic alerts while he's showing them in the UI:
<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=68cd255b-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_monitor_with_alerts.png" style="width: 700px;"/></a>
</p>


## Creating an Alert

You can create a classic alert with a single severity level (e.g., SEVERE), or a [multi-threshold alert](#create-a-multi-threshold-alert), which allows you to customize alert behavior for different thresholds.


### Create a Classic Alert

**Required fields** for a classic alert are:
* Alert name (default is New Alert)
* Alert condition
* Alert severity

To notify alert targets when the alert changes state, you can specify targets during alert creation or later.

**To create a classic alert:**

<ol>

<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts Browser</strong> - Click <strong>Alerting</strong> from the taskbar and click the <strong>Create Alert</strong> button located above the filter bar.</li>
<li markdown="span">**Chart** - Click the ellipsis icon on the right of the query and select **Create Alert**.
![create_alert](images/v2_create_alert.png)</li>
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
<td>A conditional expression that defines the threshold for the alert. The condition expression can include any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> construct. The condition expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>true</em> before the alert fires. Minimum is 1.  For example, if you enter 5, the alerting engine reviews the value of the condition during the last 5-minute window to determine whether the alert should fire.</li>
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

<li>(Recommended) Specify a <strong>Display Expression</strong>. Defaults to the value of the condition expression, either 0 or 1. Specify a display expression to get more details when the alert changes state.

The display expression can include any valid Wavefront Query Language construct, and typically captures the underlying time series that the condition expression is testing. The results of the display expression are:
<ul>
<li>Shown in the <strong>Events Display</strong> preview chart on the page for creating or editing the alert.</li>
<li markdown="span">Shown in any [chart image](alerts_notifications.html#chart-images-in-alert-notifications) that is included in a notification triggered by the alert.</li>
<li  markdown="span">Shown in the [interactive chart](alerts_notifications.html#interactive-charts-linked-by-alert-notifications) you can visit from a notification triggered by the alert.</li>
<li markdown="span">Used as the basis for any [statistics](alert_target_customizing.html#alert-series-statistics) that you might include in a [custom notification](alert_target_customizing.html) triggered by the alert. </li>
</ul>

</li>

<li>
(Optional) To help you find the alert and information about it in the Alerts Browser, specify <strong>Additional Information</strong> and <strong>Tags</strong>.
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
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing Related Alerts](alerts_manage.html#organize-related-alerts-with-alert-tags). </td>
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
<tr><td><strong>Email</strong></td> <td>Valid email addresses. Alert notifications are sent to these addresses in response to a default set of triggering events, and contain default HTML-formatted content. You can specify up to 10 valid email addresses. </td></tr>

<tr><td><strong>PagerDuty Key</strong></td>
<td markdown="span">PagerDuty keys obtained by following the steps for the [PagerDuty integration](pagerduty.html). Alert notifications that use these keys are sent in response to a default set of triggering events, and contain default content.</td></tr>

<tr><td><strong>Alert Target</strong></td>
<td>Names of <a href="webhooks_alert_notification.html">custom alert targets</a> that you have previously created to:

<ul>
<li  markdown="span">Configure webhook notifications for pager services and communication channels. Follow the steps for the [VictorOps integration](victorops.html) or [Slack integration](slack.html) for notifications on these popular messaging platforms. </li>
<li>Configure email or PagerDuty notifications with nondefault content or triggers. </li>
</ul>
</td>
</tr>
</tbody>
</table>
</li>


<li>
(Optional) If you are protecting metrics with <a href="metrics_security.html">metrics security policies</a> in your environment, select the <strong>Secure Metrics Details</strong> check box. A simplified alert notification is sent.

<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Secure Metric Details</strong></td>
<td>If selected, alert notifications do not show metric details and alert images. </td>
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
</tr>
<tr>
<td><strong>Evaluation Strategy</strong></td>
<td markdown="span">Allows you to select <strong>Real-time Alerting</strong>. By default, Wavefront ignores values for the last 1 minutes to account for delays. Many data sources are updated only at certain points in time, so using the default evaluation strategy prevents spurious firings.  If you select this check box, we include values for the last 1 minute. The alert is evaluated strictly on the ingested data. See <a href="alerts_delayed_data.html">Limiting the Effects of Data Delays</a>. </td>
</tr>
<tr>
<td><strong>Resend Notifications</strong></td>
<td>Whether to resend notification of a firing alert. If enabled, you can specify the number of minutes to wait before resending the notification.</td>
</tr>
<tr>
<td><strong>Unique PagerDuty Incidents</strong></td>
<td>
  Select this option to receive separate PagerDuty notifications for each series that meets the alert conditions.
  <br/>For example, you get separate PagerDuty notifications for both the following series because the <code>env</code> tag is different.

  <pre>
#first series
app.errors source=machine env=prod

#second series
app.errors source=machine env=stage
  </pre>
</td>
</tr>
<tr>
<td><strong>Metrics</strong></td>
<td>Whether to include obsolete metrics. By default, alerts don't consider data that have  not reported for 4 weeks or more. Include obsolete metrics if you use queries that aggregate data in longer time frames.</td>
</tr>
</tbody>
</table>

</li>

<li>Click <strong>Save</strong>.</li>
</ol>

### Video: Create a Classic Alert
This video shows how Jason creates a classic alert:

<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6a27a841-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_alerts_creating.png" style="width: 700px;"/></a>
</p>

### Create a Multi-Threshold Alert

**Required fields** for a multi-threshold alert are:
* Alert name (defaults to New Alert)
* Alert condition and operator (e.g., greater than (**>**))
* At least one severity/threshold value pair.

For each severity, you can specify one or more alert targets to notify [when the alert changes state](alerts_states_lifecycle.html#when-threshold-alerts-notify-targets). Each target is notified if the condition is met when the alert changes state.

Only custom alert targets are supported, but you can initially create the alert without specifying a target.

{% include note.html content="You cannot associate an alert target with more than one severity. Alert targets subscribe to all notifications at their severity and above.

For example, an alert target for an INFO severity receives all notifications for INFO, SMOKE, WARN,  and SEVERE. Because notifications potentially go to targets of different severities, you cannot associate an alert target with more than one severity. "%}

For a multi-threshold alert, Wavefront creates a display expression that shows the alert condition.

**To create a multi-threshold alert:**

<ol>

<li>Do one of the following:
<ul>
<li markdown="span"><strong>Alerts Browser</strong> - Click <strong>Alerting</strong> from the taskbar and click the <strong>Create Alert</strong> button located above the filter bar.</li>
<li markdown="span">**Chart** - Click the ellipsis icon on the right of the query and select **Create Alert**.
![create_alert](images/v2_create_alert.png)</li>
</ul></li>
<li markdown="span">Next to **Type**, select **Threshold**.
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
<td>A query language expression that defines the threshold for the alert. The condition expression can include any valid <a href=
"query_language_getting_started.html">Wavefront Query Language</a> construct. The condition expression coupled with the <strong>Alert fires</strong> setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>true</em> before the alert fires. Minimum is 1.  For example, if you enter 5, the alerting engine reviews the value of the condition during the last 5 minute window to determine whether the alert should fire.</li>
<li><strong>Alert resolves</strong> - Length of time (in minutes) during which the <strong>Condition</strong> expression must be <em>not true</em> before the alert switches to resolved. Minimum is 1.  Omit this setting or pick a value that is greater than or equal to the <strong>Alert fires</strong> to avoid potential chains of resolve-fire cycles. </li>
</ul>

For details and examples, see <a href="alerts_states_lifecycle.html">Alert States and Lifecycle</a>.
</td>
</tr>
<tr><td><strong>Operator</strong></td>
<td>Select one of the operators, for example, greater than or &gt;. The operator determines which values to use for the different severity thresholds. For example, if the operator is greater than, then:
<ul><li>You don't have to specify all 4 severities.</li>
<li>SEVERE must be the highest number</li>
<li>INFO must be the lowest number</li>
<li>The numbers must increase from INFO to SEVERE. </li></ul></td>
</tr>
<tr>
<td><strong>Severity</strong></td>
<td>For multi-threshold alerts, specify more than one severity - or create a Classic alert. Associate a threshold value with each severity. The order must match the operator.
<br/><br/>For example, you can specify an Operator >=, SEVERE 6000, and WARN 5000, but you can't specify SEVERE 5000, and WARN 6000 with that operator.
</td>
</tr>
</tbody>
</table>
</li>

<li>(Recommended) Specify a list of alert targets for each severity. Wavefront notifies the targets when the alert changes state, for example, from CHECKING to FIRING, or when the alert is snoozed. Specify names of <a href="webhooks_alert_notification.html">custom alert targets</a> that you already created. You can specify up to ten different targets for each severity. You cannot specify an email address or PagerDuty key directly.<br/>
<br/>
{% include note.html content="You cannot associate an alert target with more than one severity. Alert targets subscribe to **all** notifications at their severity and above.<br/> <br/>

For example, an alert target for an INFO severity receives all notifications for INFO, SMOKE, WARN,  and SEVERE. Because notifications potentially go to targets of different severities, you cannot associate an alert target with more than one severity." %}
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
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing Related Alerts with Alert Tags](alerts_manage.html#organize-related-alerts-with-alert-tags). </td>
</tr>
</tbody>
</table>
</li>

<li>(Optional) If you are protecting metrics in your environment with <a href="metrics_security.html">metrics security policies</a>, select the <strong>Secure Metrics Details</strong> check box. A simplified alert notification is sent.

<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td><strong>Secure Metric Details</strong></td>
<td>If checked, alert notifications do not show metric details and alert images. </td>
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
</tr>
<tr>
<td><strong>Evaluation Strategy</strong></td>
<td markdown="span">Allows you to select <strong>Real-time Alerting</strong>. By default, Wavefront ignores values for the last 1 minutes to account for delays. Many data sources are updated only at certain points in time, so using the default evaluation strategy prevents spurious firings.  If you select this check box, we include values for the last 1 minute. The alert is evaluated strictly on the ingested data. See <a href="alerts_delayed_data.html">Limiting the Effects of Data Delays</a>. </td>
</tr>
<tr>
<td><strong>Resend Notifications</strong></td>
<td>Whether to resend notification of a firing alert. If enabled, you can specify the number of minutes to wait before resending the notification.</td>
</tr>
<tr>
<td><strong>Unique PagerDuty Incidents</strong></td>
<td>
  Select this option to receive separate PagerDuty notifications for each series that meets the alert conditions.
  <br/>For example, you get separate PagerDuty notifications for both the following series because the <code>env</code> tag is different.

  <pre>
#first series
app.errors source=machine env=prod

#second series
app.errors source=machine env=stage
  </pre>
</td>
</tr>
<tr>
<td><strong>Metrics</strong></td>
<td>Whether to include obsolete metrics. By default, alerts don't consider data that have  not reported for 4 weeks or more. Include obsolete metrics if you use queries that aggregate data in longer time frames.</td>
</tr>
</tbody>
</table>

</li>

<li>Click <strong>Save</strong>.</li>
</ol>


### Video: Create a Multi-Threshold Alert

This video shows how to create a multi-threshold alert:

<p><a href=" https://youtu.be/qWBP6PrkUrU"><img src="/images/v_threshold_alerts.png" style="width: 700px;" alt="threshold alerts"/></a>
</p>

## Do More!
* Use [Alert Viewer](alerts_manage.html#examine-an-alert-in-alert-viewer) to drill down to the root cause.
* Clone, delete, or edit an alert, discussed in [Manage Alerts](alerts_manage.html).
* Learn about [alert states and life-cycle](alerts_states_lifecycle.html).
