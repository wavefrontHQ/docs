---
title: Preventing Alerts from Firing
keywords: alerts
tags: [alerts, videos]
sidebar: doc_sidebar
permalink: maintenance_windows_managing.html
summary: Learn how snooze an alert, and how to use maintenance windows to prevent alerts from firing when systems are undergoing maintenance.
---

You can prevent alerts from firing by using one of the following techniques:

* To disable alert checking immediately, you can snooze an alert.
* To disable alerts from firing for a set of sources or alerts during a custom time window, you can create a maintenance window.
* To prevent an alert from ever firing for a set of sources, you can configure the alert condition to exclude those sources.
* To prevent an alert from firing outside of certain hours, you can [alert only between specific times](alerts_recipes.html#alert-only-between-specific-times).


## Snoozing and Unsnoozing Alerts

You can snooze an alert so it doesn't fire even if the condition is met. Wavefront allows you to snooze one or more alerts for 30 minutes, 1 hour, 6 hours, 1 day, 1 week, or Forever. If you choose Forever, the alert is snoozed until it is unsnoozed.

To snooze one or more alerts:

1. Check the check boxes next to the desired alert(s).
  * To snooze the alerts, click the **Snooze** dropdown, select the desired duration, and click **OK**.
  * To unsnooze the alerts, click **Snooze > Unsnooze**.

To snooze or unsnooze a single alert:

* Select **Snooze > \<Duration\>** at the far left of the alert to snooze it.
* Select **Snooze > Unsnooze** at the far left of the alert to unsnooze it.

## Using Maintenance Windows

You create maintenance windows to define a time window when disruptive operations occur as a result of system maintenance or testing. During such operations, it's likely that alerts will fire even--and you already know that, for example, several hosts are down. You can

* Create a maintenance window to prevent alerts from firing.
* Close (end) maintenance windows early or make them longer.
* Extend selected maintenance windows.

To view and manage maintenance windows, select **Browse > Maintenance Windows**.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view maintenance windows, you must have [Alert Management permission](permissions_overview.html) to [manage](maintenance_windows_managing.html) maintenance windows. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

Watch this video for an introduction to maintenance windows:
<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6b704f39-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_maintenance.png" style="width: 700px;"/></a>
</p>

### Creating a Maintenance Window

To create a maintenance window:

1. Click **Alerts** or **Browse > Maintenance Windows**.
1. Click the **Create Maintenance Window** button at the top of the filter bar.
1. Fill in the maintenance window properties:

    <table>
    <thead>
    <tr><th width="20%">Property</th><th width="80%">Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td>Name</td>
    <td>Name of the maintenance window.</td>
    </tr>
    <tr>
    <td>Description</td>
    <td>Additional information about the maintenance window. Information entered into this field appears directly below the maintenance window in the Maintenance Windows browser.</td>
    </tr>
    <tr>
    <td>Start Time</td>
    <td>Start time of the maintenance window:
    <ul><li><strong>Now</strong> - The maintenance window starts immediately.</li>
    <li><i class="fa fa-calendar"></i> - The maintenance window starts on the specified date and time. Click the text field and choose a date and time or type a date and time in the format MM/DD/YYYY HH:MM [AM|PM].</li></ul></td>
    </tr>
    <tr>
    <td>End Time</td>
    <td><i class="fa fa-calendar"></i>End time of the maintenance window. The end time must be after the start time. Click the text field and choose a date and time or type a date and time in the format MM/DD/YYYY HH:MM [AM|PM].</td>
    </tr>
    <tr>
    <td>Affected Alerts and Sources</td>
    <td>Required combination of affected alert tags, affected source tags, or affected sources. For example, you could specify a set of hosts that you plan on taking down, or a set of sources with a certain source tag, for example, if you know that an availability zone will be temporarily offline.
    <ul>
    <li>Suppress any alert that has one or more specified <a href="tags_overview.html">alert tags</a> in the <strong>Affected Alert Tags</strong> field.</li>
    <li>Suppress any alert on a source that has a matching <a href="tags_overview.html">source tags</a> in the <strong>Affected Source Tags</strong> field.  </li>
    <li>Suppress any alert that would meet an alert condition on a source specified in the <strong>Affected Sources</strong> field.  </li>
    </ul>
    To prevent any alert from firing on a specified source, specify just the source.
    Combine alert tags with source names and/or source tags to prevent any alert with a specified tag from firing on a specified source.
    </td>
    </tr>
    </tbody>
    </table>
1. Click **Save**.

### Example

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

### Editing or Deleting a Maintenance Window

To edit or delete a maintenance window, select the three dots on the left and click **Edit** or **Delete**.

## Excluding Sources from an Alert

You can exclude sources from an alert by configuring the alert condition so that it filters out source tags that are associated with the sources to be skipped. Doing so prevents the metrics on the source from triggering the alert.

Suppose an alert condition tests the metrics that flow from sources `app-1`, `app-2`, ..., `app-10`. You decide to decommission `app-2` and replace it with a new `app-11`. The following steps cause the alert to filter out the metrics from the decommissioned source:

1. [Add a source tag](tags_overview.html#add-source-tags) such as `decommissioned` to `app-2` when you are ready to take that source out of service.
2. Modify the alert condition to include `and not tag=decommissioned`, for example:
  ```ts(~sample.cpu.usage.percentage, source=app-* and not tag=decommissioned) > .5 ```
