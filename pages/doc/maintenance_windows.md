---
title: Managing Maintenance Windows
keywords: alerts
tags: [alerts]
datatable: true
sidebar: doc_sidebar
permalink: maintenance_windows.html
summary: This describes how to manage maintenance windows.
---
## Creating a Maintenance Window

You create an alert by:
<ul>
<li><strong>Events browser</strong> - Clicking the <strong>Create Alert</strong> button located at the top of the filter bar.</li>
<li><strong>Chart</strong> - Hovering over the query field and click the <strong>Create Alert</strong> link below the query field.</li>
</ul>

### Maintenance Window Properties

<table>
<tbody>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
<tr>
<td>Name</td>
<td>The name of the maintenance window.</td>
</tr>
<tr>
<td>Description</td>
<td>Additional information about the maintenance window. Information entered into this field appears directly below the maintenance window in the Maintenance Windows browser.</td>
</tr>
<tr>
<td>Start Time</td>
<td>The start time of the maintenance window:
<ul><li><strong>Now</strong> - The maintenance window starts immediately.</li>
<li><i class="fa fa-calendar"></i> - The maintenance window starts on the specified date and time. Click the text field and choose a date and time or type a date and time in the format MM/DD/YYYY HH:MM [AM|PM].</li></ul></td>
</tr>
<tr>
<td>End Time</td>
<td><i class="fa fa-calendar"></i> The end time of the maintenance window. The end time must be after the start time. Click the text field and choose a date and time or type a date and time in the format MM/DD/YYYY HH:MM [AM|PM].</td>
</tr>
<tr>
<td>Affected Alerts and Sources</td>
<td>The alerts and sources to suppress during the maintenance window. All alerts that have tags in the <strong>Alert Tags</strong> field are suppressed. An alert is suppressed if at least one of sources identified by the <strong>Source Tags</strong> and <strong>Sources</strong> fields causes the alert condition to be met. You must configure at least one alert tag, source, or source tag.</td>
</tr>
</tbody>
</table>
