---
title: Preventing Alerts from Firing
keywords: alerts
tags: [alerts, videos]
sidebar: doc_sidebar
permalink: maintenance_windows_managing.html
summary: Learn how snooze an alert, and how to use maintenance windows to prevent alerts from firing when systems are undergoing maintenance.
---

You can prevent alerts from firing by using one of the following techniques:

* To disable one or more individual alert, you can snooze the alert(s).
* To disable alerts from firing during a time window, create a maintenance window. You can set the scope to, for example, only disable alerts for a set of sources or point tags.
* To prevent an alert from firing for a set of sources, configure the alert condition to exclude those sources.
* To prevent an alert from firing during certain times, [specify the firing time window](alerts_recipes.html#alert-only-between-specific-times).


## Snoozing and Unsnoozing Alerts

When you snooze an alert, it doesn't fire even if the condition is met. Wavefront allows you to snooze one or more alerts for 30 minutes, 1 hour, 6 hours, 1 day, 1 week, or Forever. If you choose Forever, the alert is snoozed until it is unsnoozed.



<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
To snooze one or more alerts:
<ol><li>Select <strong>Browse > Alerts</strong>. </li>
<li>Check the check boxes next to the desired alert(s).</li>
<li>Click the <strong>Snooze</strong> dropdown, select the desired duration and click <strong>OK</strong>.</li>
</ol></td>
<td width="50%"><img src="/images/snooze_unsnooze_alert.png" alt="Alert browser with alert selected and Snooze menu"></td>
</tr>
<tr>
<td width="50%">
To snooze one or more alerts:
<ol><li>Select <strong>Browse > Alerts</strong>. </li>
<li>Check the check boxes next to the desired alert(s).</li>
<li>Click the <strong>Snooze</strong> dropdown, select the desired duration and click <strong>OK</strong>.</li>
</ol></td>
<td width="50%"><img src="/images/snooze_single.png" alt="Alert ellipsis menu with Snooze selected and snooze time options"></td>
</tr>
</tbody>
</table>


## Maintenance Windows

You create maintenance windows to temporarily prevent alerts from firing when disruptive operations occur as a result of system maintenance or testing. During such operations, you know it's likely that alerts will fire. You can:

* Create a maintenance window to prevent alerts from firing. You can target the maintenance window only to certain sources, alert tags, point tags, etc.
* Close (end) maintenance windows early or make them longer.
* Extend selected maintenance windows.
* Send alert notifications to an alternate alert target during the maintenance window.

To view and manage maintenance windows, select **Browse > Maintenance Windows**.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view maintenance windows, you must have [Alert Management permission](permissions_overview.html) to [manage](maintenance_windows_managing.html) maintenance windows. If you do not have permission, the UI menu
selections, buttons, and links you use to perform management tasks are not visible.</div>

<!---
Watch this video for an introduction to maintenance windows:
<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6b704f39-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_maintenance.png" style="width: 700px;"/></a>
</p>--->

### Create a Maintenance Window

Creating a maintenance consists of these simple steps discussed below:
1. Specify required fields including description and start/end dates.
2. Narrow down the scope. By default, no alerts fire during the maintenance window. You can target only alerts specific alerts, for example, alerts for sources or environments that will be in maintenance.
3. Optionally, specify an alternate alert target during the maintenance window. By default, no notifications are sent during the maintenance window.

#### Step 1: Specify Required Maintenance Window Fields

<ol><li>Click <strong>Alerts</strong> or select <strong>Browse > Maintenance Windows</strong> from the task bar. </li>
<li>Click the <strong>Create Maintenance Window</strong> button.</li>
<li>Specify the <strong>Name</strong> and <strong>Description</strong> for the maintenance window.</li>
<li>Specify the <strong>Start Time</strong> and <strong>End Time</strong> for the maintenance window.</li>
</ol>

![set maintenance window basic properties](/images/maint_window_1.png)

#### Step 2: Narrow Down the Scope

By default, the maintenance window stops all alerts during the specified time. Usually, you'll want to stop only alerts from a specific set of sources, or in a certain availability zone or environment. For example, you could specify a set of hosts that you expect to take down, or decide not to alert for a certain point tag (e.g. env=dev). You could also specify a set of sources with a certain source tag, for example, if you know that an availability zone will be temporarily offline.

Specify one or more of the following:

<ul>
<li><strong>Alert Tags: </strong>Type alert tag name(s) to suppress any alert that has one or more specified <a href="tags_overview.html">alert tags</a>. All alerts are included if you don't specify alert tags. </li>
<li><strong>Point Tags: </strong>Suppress any alert that has the specified alert tag(s) and one or more specified point tag. Example: "dev"</li>
<li><strong>Sources: </strong>Type source name(s) to suppress any alert on a source that has a matching source. Example: "app-14"</li>
<li><strong>Source Tags: </strong>Type source tag name(s) to suppress any alert on a source that has a matching <a href="tags_overview.html">source tag</a>. </li>
</ul>

![set maintenance window scope](/images/maint_window_2.png)

#### Step 3: Specify Alert Notification Behavior

By default, no alert notifications are sent during the maintenance window. The alert is mute. You can instead specify alternate alert target(s) to notify during the maintenance window.

![set maintenance window alert notification behavior](/images/maint_window_3.png)

<!---
<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>Start to create a maintenance window</strong>:
<ol><li>Click <strong>Alerts</strong> or select <strong>Browse > Maintenance Windows</strong> from the task bar. </li>
<li>Click the <strong>Create Maintenance Window</strong> button.</li>
<li>Specify the <strong>Name</strong> and <strong>Description</strong> for the maintenance window.</li>
<li>Specify the <strong>Start Time</strong> and <strong>End Time</strong> for the maintenance window.</li>
</ol></td>
<td width="50%"><img src="/images/maint_window_1.png" alt="set maintenance window basic properties"></td>
</tr>
<tr>
<td width="50%">
<strong>Narrow down the Alert Scope</strong>.<br/> <br/> For example, you could specify a set of hosts that you expect to take down, or decide not to alert for a certain point tag (e.g. env=dev). You could also specify a set of sources with a certain source tag, for example, if you know that an availability zone will be temporarily offline.
<ul>
<li><strong>Alert Tags: </strong>Type alert tag name(s) to suppress any alert that has one or more specified <a href="tags_overview.html">alert tags</a>. All alerts are included if you don't specify alert tags. </li>
<li><strong>Point Tags: </strong>Suppress any alert that has the specified alert tag(s) and one or more specified point tag. Example: "dev"</li>
<li><strong>Sources: </strong>Type source name(s) to suppress any alert on a source that has a matching source. Example: "app-14"</li>
<li><strong>Source Tags: </strong>Type source tag name(s) to suppress any alert on a source that has a matching <a href="tags_overview.html">source tag</a>. </li>
</ul></td>
<td width="50%"><img src="/images/maint_window_2.png" alt="set maintenance window scope"></td>
</tr>
<tr>
<td width="50%">
<strong>Specify Alert Notification Behavior</strong>.
By default, no alert notifications are sent during the maintenance window. The alert is mute. You can instead specify alternate alert target(s) to notify during the maintenance window. </td>
<td width="50%"><img src="/images/maint_window_3.png" alt="set maintenance window alert notification behavior"></td>
</tr>
</tbody>
</table>
--->



### Maintenance Window Example

Suppose you have a group of alerts that are used primarily as demo examples. These alerts have [alert tag paths](alerts_manage.html#organize-related-alerts-with-alert-tags) like `example.latency.dev`, `example.latency.prod`, `example.network.dev`, `example.network.prod`, and so on.

To suppress the example alerts, you create a maintenance window as shown above, and fill in `Affected Alerts and Sources` according to your use case:

* To suppress all of the example alerts from firing on any source:
  - In **Affected Alert Tags**, specify the tag path `example.*`.

* To suppress just the example production alerts from firing on the source named `app-1`:
  - In **Affected Alert Tags**, specify the tag path `example.*.prod`.
  - In **Affected Sources**, specify `app-1`.

* To suppress just the example latency alerts from firing either on a source that has the source tag `EastCoastSources` or on the source named `app-1`:
  - In **Affected Alert Tags**, specify the tag path `example.latency.*`.
  - In **Affected Source Tags**, specify the source tag `EastCoastSources`.
  - In **Affected Sources**, specify `app-1`.
{% include note.html content="If you wanted to suppress the alerts from firing on `app-1` only if that source also has the source tag `EastCoastSources`, you can click on **OR** and select **AND**." %}


### Extend a Maintenance Window

You can extend the duration of one or more maintenance window.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<ol><li>Select <strong>Browse > Maintenance Windows</strong>. </li>
<li>Check the checkboxes next to the maintenance windows to be extended.</li>
<li>Click the <strong>Extend</strong> dropdown and select the desired duration and confirm.</li>
</ol></td>
<td width="40%"><img src="/images/extend_maintenance_window.png" alt="extend menu with extend time choices"></td>
</tr>
</tbody>
</table>


### Close a Maintenance Window

You can close the window before it is scheduled to finish. To close one or more maintenance windows:

1. Select **Browse > Maintenance Windows**.
1. Check the checkboxes next to the maintenance windows to be closed.
1. Click the **Close** button.
1. Click the confirmation.

To close a single maintenance window, select the three dots on the left, and click **Close**.

### Edit or Delete a Maintenance Window

To edit or delete a maintenance window, select the three dots on the left and click **Edit** or **Delete**.

## Excluding Some Sources from an Alert

You can exclude sources from an alert by configuring the alert condition so that it filters out source tags that are associated with the sources to be skipped. Doing so prevents the metrics on the source from triggering the alert.

Suppose an alert condition tests the metrics that flow from sources `app-1`, `app-2`, ..., `app-10`. You decide to decommission `app-2` and replace it with a new `app-11`. The following steps cause the alert to filter out the metrics from the decommissioned source:

1. [Add a source tag](tags_overview.html#add-source-tags) such as `decommissioned` to `app-2` when you are ready to take that source out of service.
2. Modify the alert condition to include `and not tag=decommissioned`, for example:
  ```ts(~sample.cpu.usage.percentage, source=app-* and not tag=decommissioned) > .5 ```
