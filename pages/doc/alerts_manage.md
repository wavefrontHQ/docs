---
title: Create and Manage Alerts
keywords: alerts
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_manage.html
summary: Learn how to create and manage alerts.
---

All Wavefront users can [examine alerts and drill down to find the problem](alerts.html). Administrators can create and manage alerts.

{% include note.html content="You need the [Alerts permissions](permissions_overview.html) to create and manage alerts. If some of the alerts in your environment are under [access control](access.html), you can view or view and modify those alerts only if they've been shared with you." %}

## Create Alert Video

Users with Alerts permission follow a step-by-step process to create an alert. Watch this 90 second video.

<p>
<iframe src="https://bcove.video/3o9bu6L" width="700" height="400" allowfullscreen="true" alt="creating alerts with step-by-step process"></iframe>
</p>


## Create Alert Tutorial

This tutorial creates an alert that allows you to specify the severity for each threshold.  For example, you can:
* Send an alert email of type Info to a group of engineers when a certain value is close to the SLO (e.g. 90% of budgeted CPU)
* Send an alert Slack message of type Severe to engineers and engineering managers when the value has crossed that threshold (e.g. 95% of budgeted CPU).

Before you begin, ensure that you have the information for the **required fields**:

* Alert data. For example, CPU of all production clusters. Be as specific as possible to speed up query execution.
* Alert condition and associated severity. For example, it could be INFO severity if CPU of at least 1 cluster is at 90% for 5 minutes, but SEVERE if CPU of 75% of all clusters is at 90%.
* Recipients. For each severity, you can specify an email, Slack notification, or one or more alert targets to notify [when the alert changes state](alerts_states_lifecycle.html#when-threshold-alerts-notify-targets). When the alert changes state, each target that meets the condition is notified with the specified severity.

  {% include tip.html content="Alert targets subscribe to all notifications at their severity and above. For example, a recipient associated with INFO severity receives all notifications for INFO, SMOKE, WARN,  and SEVERE. You cannot associate an alert target with more than one severity. "%}


### Step 0: Start Alert Creation

To start alert creation, do one of the following:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ul>
<li markdown="span"><strong>Alerts Browser</strong> - Click <strong>Alerting</strong> from the taskbar and click the <strong>Create Alert</strong> button located above the filter bar.</li>
</ul></td>
<td width="50%" markdown="span">![create_alert](images/create_alert_browser.png) </td></tr>
<tr>
<td width="50%">
<ul>
<li markdown="span">**Chart** - Click the ellipsis icon on the right of the query and select **Create Alert** from the menu.</li>
</ul></td>
<td width="50%" markdown="span">![create_alert](images/v2_create_alert.png) </td></tr>
</tbody>
</table>



### Step 1a: Specify the Data to Watch and Alert On

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">In the <strong>Data</strong> section, specify the data that you want to monitor and click <strong>Next</strong>. You have many options:
<ul>
<li>Keep it simple, e.g. just specify <code>ts()</code> and a metric: <code>ts(~sample.mem.used.percentage)</code> </li>
<li>Use multiple queries, optionally with variables, to take advantage of the full power of Wavefront Query Language (WQL).<br>
<strong>Note:</strong> You must select one query as the alert query using the radio button. You can use results of other queries as <a href="query_editor.html#use-chart-variables">chart variables</a> in the selected query. </li>
<li>Use either WQL or <a href="wavefront_prometheus.html">PromQL</a>.  </li>
</ul> </td>
<td><img src="images/alert_new_data.png" alt="Specify data the alert is monitoring"></td>
</tr>
</tbody>
</table>

### Step 1b: Customize the Chart (Optional)

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">By default, each alert includes a line chart with a two hour time window. You can modify the chart type, format, axis, and some other aspects of the chart. See the <a href="ui_chart_reference.html">Chart Reference</a> for background. <br/><br/>
<strong>Important</strong>: The customizations for alert charts are more limited than the customizations for charts in dashboards. </td>
<td><img src="images/alerts_chart_cust.png" alt="Selection of chart type"></td>
</tr>
</tbody>
</table>


### Step 2: Specify Thresholds and Severities

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
1. In the <strong>Conditions</strong> section, specify thresholds for the alert. The threshold becomes visible in the chart. <br><br>
You can alert when the query result is greater than or less than the specified threshold. Specify at least 1 threshold. <br><br>
<strong>Note</strong>: If your <strong>Data</strong> query is a boolean expression that includes a comparison operator, you can specify only one severity.</td>
<td><img src="images/new_alert_condition.png" alt="Specify data the alert is monitoring">
</td></tr>
<tr>
<td>
2. Click <strong>Test Condition</strong> to check if the alert would have fired in the current time window. Examine the test result, shown above the chart.
<img src="images/test_results.png" alt="Test results. Alert would have fired once in the last 2 hours">
<strong>Tip: </strong>Test Condition looks backwards, and does not always match the actual alert firing in the future. See <a href="#my-alert-fires-with-test-condition-but-not-in-production">the FAQ</a> below.</td>
<td>
&nbsp;
</td>
</tr>
<tr>
<td>3. Optionally, fine-tune and test the condition.
<ul>
<li><strong>Trigger Window</strong>: Length of time (in minutes) during which the <strong>Condition</strong> expression must be true before the alert fires. Minimum is 1. For example, if you enter 5, the alerting engine reviews the value of the condition during the last 5-minute window to determine whether the alert should fire. </li>
<li><strong>Resolve Window</strong>: Length of time (in minutes) during which the <strong>Condition</strong> expression must be NOT true before the alert switches to resolved. Minimum is 1.  <br><br>
By default, the <strong>Resolve Window</strong> is set to the same number of minutes as the Trigger Window, but you can override it. Set the <strong>Resolve Window</strong> to greater than or equal to the <strong>Trigger Window</strong> to avoid resolve-fire cycles.</li>
</ul></td>
<td><img src="images/condition_options.png" alt="Condition options discussed in left column"></td>
</tr>
<tr>
<td>4. For special cases, click <strong>Additional Settings</strong> to also specify the following settings. The default is often best.
<ul>
<li><strong>Checking Frequency</strong>: Number of minutes between checks whether the condition is true. Minimum and default is 1. When an alert is in the <a href="alerts_states_lifecycle.html">INVALID</a> state, the alert is checked approximately every 15 minutes, and not with the specified checking frequency. </li>
<li><strong>Evaluation Strategy</strong>: Allows you to select <strong>Real-time Alerting</strong>. By default, Wavefront ignores values for the last 1 minutes to account for delays. This default evaluation strategy prevents spurious firings because many data sources are updated only at certain points in time. If you select this check box, the alerting engine considers values in the last 1 minute (the alert is evaluated strictly on the ingested data). See <a href="alerts_delayed_data.html">Limiting the Effects of Data Delays</a> for some background. </li>
</ul></td>
<td><img src="images/condition_options_2.png" alt="Condition options discussed in left column"></td>
</tr>
</tbody>
</table>

### Step 3: Specify Recipients

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Alert recipients receive notifications when the alert changes state. You can:
<ul>
<li>Specify any email address</li>
<li>Specify a PagerDuty key</li>
<li markdown="span">Select from predefined alert targets. [Alert targets](webhooks_alert_notification.html) allow fine-grained notification settings for a variety of messaging platforms (email, pager services) and communication channels.</li>
</ul>
</td>
<td width="50%" markdown="span">![create_alert](images/alert_recipients.png) </td></tr>
</tbody>
</table>

{% include tip.html content="You can associate an alert target only with one severity. Alert targets subscribe to **all** notifications at their severity and above. For example, an alert target with INFO severity receives all notifications for INFO, SMOKE, WARN, and SEVERE." %}

### Step 4 (Optional): Help Alert Recipients Resolve the Alert

<!---Replace 1st screenshot to show a different triage dashboard--->

If you already have information that helps recipients find the causes for the alert, specify them in the **Contents** section:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ul>
<li><strong>Runbook: </strong>A URL or a wiki page, or another document that helps the alert recipient resolve the alert.</li>
<li><strong>Triage Dashboard(s): </strong>Start typing to select from dashboards on your Wavefront instance that have useful information and pass in information. See <a href="#how-do-i-pass-values-to-triage-dashboards">How Can I Pass a Value to a Triage Dashboard</a>.</li>
<li><strong>Additional Information: </strong>Any other information that is useful to the alert recipient. This field supports Markdown. Click <strong>Preview</strong> to preview the Markdown output.</li>
</ul>
</td>
<td width="50%" markdown="span">![create_alert](images/alert_content_1.png) </td></tr>
<tr><td>Click <strong>Additional Settings</strong> to further customize the notifications for special cases.
<ul><li><strong>Resend Notifications</strong>: If checked, Wavefront resends the notification of a firing alert. You can specify interval at which the alert is resent. By default, notifications are sent only when the alert changes state. </li>
<li><strong>Unique PagerDuty Incidents</strong>: Check this option to receive separate PagerDuty notifications for each series that meets the alert conditions.
<br/>For example, you get separate PagerDuty notifications for both the series on the right because the <code>env</code> tag is different.<br>
<pre>
#first series
app.errors source=machine env=prod

#second series
app.errors source=machine env=stage
</pre>
</li>
<li><strong>Secure Metrics Details</strong>: If you are protecting metrics in your environment with <a href="metrics_security.html">metrics security policies</a>, select this  check box to send a simplified alert notification without metric details and alert images.</li></ul>
</td>
<td width="50%" markdown="span"> ![screenshot of options in Step 4](images/alert_content_2.png)
</td>
</tr>
</tbody>
</table>

Click <strong>Preview Notification</strong> for a preview of the notification that users will see.

### Step 5: Name and Activate the Alert

As a final step, you name the alert, optionally add alert tags, and activate the alert.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>(Required) Specify a <strong>Name</strong> that uniquely identifies the alert. </li>
<li markdown="span">(Optional) Specify one or more [**Alert tags**](tags_overview.html#object-tags-tags-on-alerts-dashboards-events-and-sources). Tags make it easy to find alerts, for example, in the Alerts Browser.</li>
</ol>
</td>
<td width="50%" markdown="span">![screenshot of options in step 5](images/alert_activate.png) </td></tr>
</tbody>
</table>


## Alert FAQs

Here are some frequently asked questions about alerts.

### Why Can I Specify Only 1 Severity?

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
If your data query follows the format <code>&lt;expression&gt; &lt;comparisonOperator&gt; &lt;constant&gt;</code>, for example <code>myCPU &lt; 45000</code>, the query itself already includes the query.<br><br> In the example screenshot on the right, the threshold is 6000. Notice how the hover text shows either 0 or 1 for the different time series.
</td>
<td width="60%" markdown="span">![screenshot of options in step 5](images/alert_boolean_query.png) </td></tr>
<tr>
<td width="40%">
Because the threshold is predefined, you can select only 1 severity. All notifications will go to the same set of recipients with that severity.
</td>
<td width="60%" markdown="span">![screenshot of options in step 5](images/alert_boolean_thresholds.png) </td></tr>
</tbody>
</table>

If your query does NOT follow the `<expression> <comparisonOperator> <constant>` pattern, you can specify different thresholds and different severities.

{% include tip.html content="Most alert creation steps are the same for multi-threshold alerts and single-threshold alerts. " %}

### Who Gets Notified When the Alert Changes State?

Wavefront sends alert notifications when the alert changes state.
* An alert with a query that follows the pattern `<expression> <comparisonOperator> <constant>` sends a notification with the specified severity to all specified targets. This page calls this type of query **boolean query**.
* A **multi-threshold alert** allows you to specify multiple severities and a different target for each severity. Each target is notified if the condition is met when the alert changes state. Lower severity targets receive notifications for all higher severities.

For example, an alert [fires](alerts_states_lifecycle.html#when-do-alerts-fire) when a metric stays at a value that indicates a problem for the specified amount of time. But you might also want to be notified when the alert is resolved or when the alert is snoozed. The alert target gives fine-grained control over which state changes trigger a notification.

### What's an Alert Target?

Each alert is associated with one or more recipients: an email address, PagerDuty key, or [alert target](webhooks_alert_notification.html).

When the alert changes state, the recipients are notified. Customize which state changes trigger a notification:
* When you [create the alert target](webhooks_alert_notification.html#create-a-custom-alert-target)
* When you edit an alert target.

![screenshot of Create Alert target shows several options e.g Alert Status Updated and Alert Resolved](images/create_alert_target.png)

   {% include note.html content="Alert targets subscribe to all notifications at their severity and above. For example, an alert target for an INFO severity receives all notifications for INFO, SMOKE, WARN,  and SEVERE. Because notifications potentially go to targets of different severities, you cannot associate an alert target with more than one severity. " %}

The **maximum number** of email alert targets is:
* 10 for alerts with boolean queries that follow the pattern `<expression> <comparisonOperator> <constant>`.
* 10 per severity for multi-threshold alerts.

If you exceed the number, you receive a message like the following:

`{"status":{"result":"ERROR","message":"Invalid notification specified: null","code":400}}`

### My Alert Fires with Test Condition, But Not In Production

**Test Condition** is useful in fine-tuning an alert, but doesn't always match what happens in production.

For example:
<ul><li>If data comes in late, Test Condition won't match the actual alert firing. Data are visible looking back, but might not be there in real time.</li>
<li>If data are meeting the alert condition for the "condition is true for x mins" amount of time, the actual alert might not fire because the alert check, determined by the alert check interval, happens too soon or too late.</li></ul>
For both cases, test condition shows that the condition was met, but the actual alert might not fire.

### How Do I Pass Values to Triage Dashboards?

The **Content** section allows you to specify one or more triage dashboards. For each dashboard, you can preset one or more dashboard variables so that the user sees what they're interested in when they go to the triage dashboard. Here's an example that uses the predefined Cluster Metrics Exploration dashboard that's part of the Tour Pro integration as the target dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<ol>
<li>In the target dashboard, show the predefined dashboard variables. <img src="images/show_variables.png" alt="screenshot Variables icon"></li>
<li>Ensure that you know the variable names and possible values. In this example, the variable name is <code>env</code> and the value we want to set is <code>dev</code>.</li>
<li>In the alert dialog, specify the name and value to set.</li>
</ol>
</td>
<td width="40%" markdown="span">![screenshot ](images/variables_and_values.png)</td></tr>
</tbody>
</table>



## Edit Alerts

Users with **Alerts** permission can change an alert at any time. The options are similar to what you see when you create an alert, but you can quickly focus on the things that you want to change.

### Start the Alert Edit

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol>
<li>Click <strong>Alerting</strong> in the taskbar to display the Alerts Browser. </li>
<li>Click the alert name, or click the ellipsis icon next to the alert and select <strong>Edit</strong>. <br><br>You can search for the alert by name, status, alert tag, etc. See <a href="wavefront_searching.html">Searching Wavefront</a>.</li>
</ol>
</td>
<td width="60%" markdown="span">![screenshot ellipsis menu to the left of alert in alerts browser](images/edit_alert.png) </td></tr>
<tr>
<td width="40%">
<ol>
<li>Make changes (see next section).   </li>
<li>Click <strong>Show Firings</strong> at any time to see when the alert fired and fine-tune the behavior based on that information.</li>
</ol>
</td>
<td width="60%" markdown="span">![screenshot ellipsis menu to the left of alert in alerts browser](images/show_firings.png) </td></tr>
</tbody>
</table>

{% include warning.html content="If you navigate away from the page or close the browser tab without saving, your changes are lost!"%}

### Make Changes to the Alert

You can change the alert properties when you edit the alert.

<table style="width: 100%;">
<tbody>
<td width="55%">
<strong>Alert Name and Tags</strong><br><br>
In this section:
<ul>
<li>Change the alert name.</li>
<li>Click the X on any tag to remove it from the alert.</li>
<li>Click <strong>+Tag</strong> to add a tag to the alert. </li>
</ul>
</td>
<td width="45%" markdown="span">![screenshot ellipsis menu to the left of alert in alerts browser](images/alert_name_tags.png) </td></tr>
<tr>
<td>
<strong>Data</strong><br><br>
In this section:
<ul>
<li>Change the data to alert on.</li>
<li>Edit the existing alert query. For example, add filters to fine-tune the query. See <a href="query_language_getting_started.html">Query Language Quickstart</a> for background and a video or <a href="query_language_reference.html">Query Reference</a> if you're an advanced user.</li>
<li>Fine-tune the alert image. See the <a href="ui_chart_reference.html">Chart Reference</a> for details.</li>
</ul>
</td>
<td markdown="span">![screenshot of data section showing a single query](images/alert_edit_data.png) </td></tr>
<tr>
<td>
<strong>Conditions</strong><br><br>
In this section, you can fine-tune the alert condition and test the condition.
<ul>
<li>Change the alert threshold or thresholds and severity. </li>
<li>Change the <strong>Trigger Window</strong> and <strong>Resolve Window</strong> values. </li>
<li>Change the <strong>Checking Frequency</strong> and <strong>Evaluation Strategy</strong> values. </li>
</ul>
See <a href="alerts_manage.html#step-2-specify-thresholds-and-severities">Specify Thresholds and Severities</a> for details on each option.
</td>
<td markdown="span">![Screenshot of a few Conditions options. Details are under Create Alert.](images/edit_alert_conditions.png) </td></tr>
<tr>
<td>
<strong>Recipients</strong><br><br>
In this section, you can view, change, or add recipients of alert notifications.
<ul>
<li>Specify one or more recipient for each severity.</li>
<li>You can specify an email address, PagerDuty key, or alert target that has already been created. </li>
<li>Notifications for each severity are sent to the recipients of that severity and higher. </li>
<li>As a result, you cannot specify a recipient for multiple severities. Most likely, the recipient already receives the notification because, for example, when an alert notification is sent at the SEVERE level, it also goes to all recipients at lower levels.</li>
</ul>
</td>
<td markdown="span">![Screenshot of Recipients section with 1 email and 1 alert target included](images/edit_alert_recipients.png) </td></tr>
<tr>
<td>
<strong>Content</strong><br><br>
In this section, you can add runbook URLs and specify other information that can help with alert resolution.
<ul>
<li>The Runbook URL can point to internal information.</li>
<li>Start typing to select from dashboards in your environment. You can set environment variables for the dashboard with the <strong>Pass</strong> option. See <a href="#how-do-i-pass-values-to-triage-dashboards">How Do I Pass Values to Triage Dashboards</a>.</li>
<li>Specify other information you want included in the notification in the <strong>Additional Information</strong> section.</li>
</ul>
</td>
<td markdown="span">![Screenshot of Recipients section with 1 email and 1 alert target included](images/edit_alert_content.png) </td></tr>
</tbody>
</table>

### Save Your Changes

Click **Save** in the top right to save your changes.

{% include warning.html content="If you navigate away from the page or close the browser tab without saving, your changes are lost!"%}


## Delete an Alert

You delete an alert from the Alerts Browser page. Only users with **Alerts** permission can delete an alert.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol>
<li>Click <strong>Alerting</strong> in the taskbar to display the Alerts Browser. </li>
<li>Click the ellipsis icon next to the alert.</li>
<li>Select <strong>Delete</strong> and confirm the deletion.</li>
</ol>
</td>
<td width="60%" markdown="span">![screenshot ellipsis menu to the left of alert in alerts browser](images/delete_alert.png) </td></tr>
</tbody>
</table>

## Restore an Alert Version

Each time you save an alert, you create an alert version. Up to 100 versions are supported.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<ol>
<li>Find the alert in the Alerts Browser. </li>
<li>Click the ellipsis icon and select <strong>Versions</strong>.</li>
<li>Select a version.</li>
</ol>
</td>
<td width="40%" markdown="span">![screenshot ellipsis menu to the left of alert in alerts browser](images/alert_versions.png) </td></tr>
</tbody>
</table>

## Do More!

* Learn about [alert states and life-cycle](alerts_states_lifecycle.html).
* The [Alert Viewer Tutorial](alerts.html#alert-viewer-tutorial) shows how to examine a single alert.
* The [Alerts Browser Tutorial](alerts.html#alerts-browser-tutorial) explains how you can examine and manage all alerts in your environment.
* Use ACLs to limit or share access to an [individual alert](access.html#changing-access-for-individual-dashboards-or-alerts).
