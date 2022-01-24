---
title: FAQ for Alerts v2
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_v2_faq.html
summary: What has changed? What are some tips and tricks?
---

Wavefront users have asked for a more streamlined alert creation experience, and we're rolling it out to all users.
* Going forward, all alerts will show up in the new alert GUI.
* Under the covers, alerts work the same. But we're including this FAQ to help current alert users.

{% include note.html content="Every Wavefront user can view alerts and make temporary changes. You must have the Alerts permission to save changes to alerts." %}

## What Are the Main Improvements?

The team has talked to customers and we've  addressed a significant number of requests. We now have a streamlined design and better notifications.

### Create and Edit Alerts More Easily

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Straightforward stepper for <strong>Create Alert</strong> and <strong>Edit Alert</strong> flows.
<ol><li>Chart shows alert metrics and thresholds. Format the chart for insight into your data. </li>
<li>Multi-query option supports using query results as variables in the condition query.</li>
<li>Simple <strong>Start Testing</strong> and <strong>Stop Testing</strong> button.</li></ol></td>
<td width="50%"><img src="/images/alert_new_data.png" alt="create alert"></td>
</tr>
</tbody>
</table>


### Help Alert Recipients

If you have information that helps alert recipients find and resolve the causes for the alert, specify them in the **Contents** section:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ul>
<li><strong>Runbook: </strong>A URL or a wiki page, or another document that helps the alert recipient resolve the alert.</li>
<li><strong>Triage Dashboard(s): </strong>Start typing to select from dashboards on your Wavefront instance that have useful information and pass in information. See <a href="alerts_manage.html#how-do-i-pass-values-to-triage-dashboards">How Can I Pass a Value to a Triage Dashboard</a></li>
<li><strong>Additional Information: </strong>Any other information that is useful to the alert recipient. This field supports Markdown. Click <strong>Preview</strong> to preview the Markdown output.</li>
</ul>
</td>
<td width="50%" markdown="span">![create_alert](images/alert_content_1.png) </td></tr>
</tbody>
</table>

### Preview Notifications

You can now preview alert notifications directly from the <strong>Create Alert</strong> and <strong>Edit Alert</strong> workflow.

## FAQs for v2 Alerts

### Can I pick the alert GUI version?
A: No. All alerts are updated to the v2 format.

### Do I have to change my API requests when creating v2 alerts?
A: No. The existing API still works. To take advantage of the new multi-query request format, use the `useMultiQuery` option in the POST of  `/api-docs/ui/#!/Alert/createAlert`

## FAQs for Alert Migration


### How Can I Set a Display Expression?

A: For alerts that return 0 or 1, it makes sense to include information about the query, not just the query result, in the alert notification. With v1 alerts, you set a display expression explicitly. With v2 alerts, all non-hidden queries are included in the notification.

In the example below:
* The alert condition query is `variance(${A}) > 2`.
* The display expression is `ts(~sample.cpu.loadavg.1m, source=app-1*)`.

![selected query is variance(${A})>2 but non-hidden query is ts(~sample.cpu.loadavg.1m, source=app-1*)](images/display_expression.png)


### Where Is Included Obsolete Metrics?

A: Include Obsolete Metrics is now in the same place for charts on dashboards and charts for alerts.
* For v1 alerts, **Include Obsolete Metrics** was under **Advanced**, at the bottom of the page.
* For v2 alerts, **Include Obsolete Metrics** is under **Data**. Just as for charts in dashboards, you click the **Advanced** tab to turn on **Include Obsolete Metrics**.

### Where Is Backtesting?

A: Instead of backtesting, you can now use the  **Test Condition** and **Stop Testing** button as part of the alert create/edit flow.

### What happens if I save a v1 alert after the migration to v2?

The alert is converted to v2 format with multi-queries. The alert behavior does not change.

### What’s the alert condition?

A: The alert condition is the selected query. This query can include the result of other queries as variables. Notifications show the condition if it’s not hidden, but you can hide the condition and create a different query to show in notifications.

### How will the chart images in notification emails look now that there’s no display expression?

The chart image will show all the series from all the visible queries.
