---
title: Create and Manage Alerts
keywords: alerts
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_manage.html
summary: Learn how to create and manage alerts.
---

Most Wavefront users [examine alerts and drill down to find the problem](alerts.html). A subset of Wavefront users create and manage alerts.

{% include note.html content="All users can view and examine. You need [Alerts permissions](permissions_overview.html) to create and modify alerts. If some of the alerts in your environment are under [access control](access.html), you can view or view and modify those alerts only if they've been shared with you." %}

## How to Create an Alert -- The Basics

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


## Create a Classic Alert

### Prerequisites

**Required fields** for a classic alert are:
* Alert name (default is New Alert)
* Alert condition
* Alert severity

To notify alert targets when the alert changes state, you can specify targets during alert creation or later.

### Procedure

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
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing Related Alerts](alerts.html#step-5-organize-related-alerts-with-tags). </td>
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
<!---
### Video: Create a Classic Alert. TBD --->

## Create a Multi-Threshold Alert

### Prerequisites

Ensure that you have the information for the **required fields** for your multi-threshold alert:
* Alert name (defaults to New Alert)
* Alert condition and operator (e.g., greater than (**>**))
* At least one severity/threshold value pair.

For each severity, you can specify one or more alert targets to notify [when the alert changes state](alerts_states_lifecycle.html#when-threshold-alerts-notify-targets). Each target is notified if the condition is met when the alert changes state.

Only custom alert targets are supported, but you can initially create the alert without specifying a target.

{% include note.html content="You cannot associate an alert target with more than one severity. Alert targets subscribe to all notifications at their severity and above.

For example, an alert target for an INFO severity receives all notifications for INFO, SMOKE, WARN,  and SEVERE. Because notifications potentially go to targets of different severities, you cannot associate an alert target with more than one severity. "%}

For a multi-threshold alert, Wavefront creates a display expression that shows the alert condition.

### Procedure

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
<td markdown="span">Tags assigned to the alert. You can enter existing alert tags or create new alert tags. See [Organizing Related Alerts with Alert Tags](alerts.html#step-5-organize-related-alerts-with-tags). </td>
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



## Delete an Alert

Users with **Alerts** permissions can delete an alert.

1. Click **Alerting** in the taskbar to display the Alerts Browser.
2. Click the ellipsis icon next to the alert.
3. Select **Delete** and confirm the deletion.


## Edit an Alert

You can change an alert at any time.

1. Click **Alerting** in the taskbar to display the Alerts Browser.
2. Click the name of the alert you want to edit to display the Edit Alert page.
3. Update the properties you want to change, and click **Save**.

## Use Backtesting to Fine-Tune Conditions

Wavefront can show hypothetical alert-generated events using backtesting. Backtesting enables you to fine tune new or existing alert conditions before you save them.

When you create a classic alert, the Events Display is set to **Backtesting**. You can later edit the alert.

To change the events display:

1. Select the alert and click **Edit**.
2. Change the **Events Display**:
   - **Actual Firings**  - Displays past alert-generated event icons on the chart. You will see how often the alert actually fired within the given chart time window.
   - **Backtesting** - Displays hypothetical alert-generated event icons on the chart. You can see how often an alert  would fire within the chart time window based on the condition and the **Alert Fires** field.

Backtesting does not always exactly match the actual alert firing. For example:
* If data comes in late, backtesting won't match the actual alert firing.
* If data are meeting the alert condition for the "condition is true for x mins" amount of time, the actual alert might not fire because the alert check, determined by the alert check interval, happens too soon or too late.
For both cases, backtesting shows the alert as firing while the actual alert might not show as firing.

## Do More!

* The [Alert Viewer Tutorial](alerts.html#alert-viewer-tutorial) shows how to examine a single alert.
* The [Alerts Browser Tutorial](alerts.html#alerts-browser-tutorial)
* Learn about [alert states and life-cycle](alerts_states_lifecycle.html).
* Share access to an [individual alert](access.html#changing-access-for-individual-dashboards-or-alerts).
