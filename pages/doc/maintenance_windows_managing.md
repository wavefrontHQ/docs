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

A maintenance window defines a time window when disruptive operations occur as a result of system maintenance or testing. During such operations, it's likely that alerts will fire. You can create a maintenance window to prevent alerts from firing.

You can close (end) maintenance windows early or you can make them longer.

To view and manage maintenance windows, select **Browse > Maintenance Windows**.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view maintenance windows, you must have [Alert Management permission](permissions_overview.html) to [manage](maintenance_windows_managing.html) maintenance windows. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

Watch this video for an introduction to maintenance windows:
<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6b704f39-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_maintenance.png" style="width: 700px;"/></a>
</p>

### Creating a Maintenance Window

To create a maintenance window:

1. Click **Alerts** or **Browse > Maintenance Windows**.
1. Click the **Create Maintenance Window** button located at the top of the filter bar.
1. Fill in the maintenance window properties:

    <table>
    <thead>
    <tr><th width="20%">Property</th><th width="80%">Description</th></tr>
    </thead>
    <tbody>
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
    <td>The alerts to be suppressed during the maintenance window. You must specify at least one alert tag, source, or source tag. 
    <ul>
    <li>Specify one or more alert tags or <a href="tags_overview.html">tag paths</a> in the <strong>Affected Alert Tags</strong> field to suppress any alert that has a matching alert tag.</li>
    <li>Specify one or more source tags or <a href="tags_overview.html">tag paths</a> in the <strong>Affected Source Tags</strong> field to suppress any alert that would have met its alert condition on a source that has a matching source tag. </li> 
    <li>Specify one or more source names in the <strong>Affected Sources</strong> field to suppress any alert that would have met its alert condition on a matching source.  </li>
    </ul>
    You can omit alert tags to prevent any alert from firing on a specified source.
    You can combine alert tags with source names and/or source tags to prevent any alert with a specified tag from firing on a specified source.
    </td>
    </tr>
    </tbody>
    </table>
1. Click **Save**.

### Example

Suppose you have a group of alerts that are used primarily as demo examples. These alerts have [alert tag paths](alerts.html#organizing-related-alerts) like `example.latency.dev`, `example.latency.prod`, `example.network.dev`, `example.network.prod`, and so on. 

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
  - **Note:** If you wanted to suppress the alerts from firing on `app-1` only if that source also has the source tag `EastCoastSources`, you can click on **OR** and select **AND**.



### Managing Maintenance Windows

You can extend the duration of a maintenance window or close the window before it is scheduled to finish. To extend or close one or more maintenance windows:

1. Select **Browse > Maintenance Windows**.
1. Check the checkboxes next to the maintenance windows.
1. Click the **Extend** dropdown and select the desired duration or click the **Close** button.
1. Click the confirmation.

To extend the duration of a single maintenance window, select **Extend > Duration**.

To close, edit, or delete a single maintenance window, select the three dots on the left and click **Close**, **Edit**, or **Delete**.


## Excluding Sources from an Alert

You can exclude sources from an alert by configuring the alert condition so that it filters out source tags that are associated with the sources to be skipped. Doing so prevents the metrics on the source from triggering the alert. 

Suppose an alert condition tests the metrics that flow from sources `app-1`, `app-2`, ..., `app-10`. You decide to decommission `app-2` and replace it with a new `app-11`. The following steps cause the alert to filter out the metrics from the decommissioned source:

1. [Add a source tag](source_tags.html) such as `decommissioned` to `app-2` when you are ready to take that source out of service.
2. Modify the alert condition to include `and not tag=decommissioned`, for example:
  ```ts(~sample.cpu.usage.percentage, source=app-* and not tag=decommissioned) > .5 ```
