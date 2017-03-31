---
title: Creating an Alert
keywords: alerts
tags: [alerts]
datatable: true
sidebar: doc_sidebar
permalink: alerts_creating.html
summary: Learn how to create an alert.
---
## What is an Alert?

An alert is triggered when a monitored metric reaches a value that indicates a problem. When an alert triggers, notifications are sent to targets such as email addresses, pager services, and real-time communication channels.

To disable alert checking for a set of sources during a specific time window you can put them in a [maintenance window](maintenance_windows_managing). Snoozing alerts disables alert checking for a fixed time window.

While every Wavefront user can view alerts and maintenance windows, you must have [Alert Management permission](permissions) to create and [manage](alerts_managing) alerts. If you do not have permission, UI menu selections and buttons required to perform the tasks will not be visible.

## Creating an Alert

You create an alert by:
<ul>
<li markdown="span"><strong>Alerts browser</strong> - Select **Alerts** and click the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li markdown="span"><strong>Chart</strong> - Hover over a query field and click the <strong>Create Alert</strong> link below the query field. ![create_alert_chart](images/create_alert_chart.png)<br />The ts() expression in the selected query field populates the alert's Condition field.</li>
</ul>

### Alert Properties

<table>
<tbody>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
<tr>
<td>Events Display</td>
<td>Whether to display actual or hypothetical alert firing [event icons](charts_events_displaying) on the preview chart.
<ul><li><strong>Actual Firings (existing alerts only)</strong> - Display past alert-generated event icons on the chart. This tells you how often the given alert has actually fired within the given chart time window.</li>
<li><strong>Backtesting</strong> - Display hypothetical alert-generated events icons on the chart. This tells you how often an alert hypothetically would fire within the given chart time window based on the conditional threshold and the <strong>Alert fires</strong> field. Backtesting enables you to fine tune new or existing alert conditions before saving.</li></ul>
</td>
</tr>
<tr>
<td>Name</td>
<td>The name of the alert. The name must contain 1-100 characters. The name should be simple while still making it easy to identify its purpose.</td>
</tr>
<tr>
<td>Condition</td>
<td>A conditional ts() expression that defines the threshold for the alert. You can use any valid ts() language constructs in the expression.
You can use free form query mode or the [Query Builder](query_language_query_builder) to create the expression. The expression coupled with the <strong>Alert fires</strong>
setting determines when the alert fires.
<ul><li><strong>Alert fires</strong> - The length of time during which the Condition expression must be true before the alert fires. The minimum number of minutes is 2.  If you enter 5 the alerting engine reviews the value of the Condition during the last 5 minute window to see if the alert should fire or not.</li>
<li><strong>Alert resolves</strong> - The length of time during which the Condition expression must be false before the alert switches to resolved. The minimum number of minutes is 2.  If you don't enable this field and specify a time, it defaults to the <strong>Alert fires</strong> setting.</li></ul>
</td>
</tr>
<tr>
<td>Display Expression</td>
<td>Optional. The query sent to targets when notified of alert state changes by email. You can use free form query mode
or the [Query Builder](query_language_query_builder) to create the expression. If not set, the query sent is the expression in the Condition field.</td>
</tr>
<tr>
<td>Severity</td>
<td>How important the alert is. In decreasing importance:  SEVERE, WARN, SMOKE, and INFO.</td>
</tr>
<tr>
<td>Targets</td>
<td>The targets to notify when the alert changes state.  For example, notifications are sent when an alert changes state from FIRING to CHECKING, and when an alert is snoozed. A list of ten different email atdresses, [PagerDuty keys​](), [VictorOps keys](), and [webhooks]() separated by commas. An alert can be in 5 states:
<ul><li><strong>FIRING</strong> - The alert is meeting the condition and timing properties.</li>
<li><strong>CHECKING</strong> - The alert is being checked to see if the condition and timing properties are being met.</li>
<li><strong>SNOOZED</strong> - The alert is not being checked to determine if the condition and timing properties are being met.</li>
<li><strong>IN MAINTENANCE</strong> - The alert has an alert tag or a source or set of sources included in a source tag associated
with an ongoing maintenance window. If an alert has a subset of reporting sources associated with in an ongoing maintenance window,
the state displays as CHECKING/IN MAINTENANCE.</li>
<li><strong>INVALID</strong> - A ts() query in the alert condition is timing out (> 5 min execution) or includes inactive metrics or sources.</li></ul>
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

Click the **Advanced** link to configure the properties:

<table>
<tbody>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
<tr>
<td>Checking Frequency</td>
<td>The number of minutes between checking whether <strong>Condition</strong> is true. Minimum and default is 1.</td>
</tr><tr>
<td>Resend Notifications</td>
<td>Whether to resend notification of a firing alert and if enabled, the number of minutes to wait before resending the notification.</td>
</tr>
</tbody>
</table>


{% include links.html %}
