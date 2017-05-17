---
title: Alert States and Lifecycle
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_states_lifecycle.html
summary: Learn about alert states, when they fire and what happens, and how they resolve.
---

## Alert Condition

If an alert's [Condition](alerts_creating.html) field is set to a conditional expression, for example `ts("requests.latency") > 195`, then all reported values that satisfy the condition are marked as **true** (1's) and all reported values that do not satisfy the condition are marked as **false** (0's). If the Condition field has a ts() expression, for example `ts("cpu.loadavg.1m")`, then all _non-zero_ reported values are marked as **true** and all zero reported values are marked as **false**. If there is _no reported data_, then it is evaluated as neither true nor false.

## Alert States

An alert can be in 5 states:

- **CHECKING**: The alert is being checked to see if the Condition and Alert fires properties are being met. While firing alerts are still being checked to determine if the Condition and Alert resolves properties are still being met, they are not included when you filter for this state in the Alerts browser.  An alert resolves (transitions back to CHECKING) when there are either no true values present within the time window, or the time window contains no data.
- **FIRING**: The alert is meeting the Condition and Alert fires property. An alert transitions to firing when the condition evaluates to at least one true value and no false values during a fixed time window.
- **IN MAINTENANCE**: The alert has an alert tag or a source or set of sources included in a source tag associated with an ongoing maintenance window. If an alert has a subset of reporting sources associated with in an ongoing maintenance window, then the state displays as CHECKING/IN MAINTENANCE. If an alert has a subset of reporting sources associated with an ongoing maintenance window but whose other sources are firing, the state displays as FIRING/IN MAINTENANCE.
- **INVALID**: The alert is timing out ( > 5 min query execution) or queries include inactive metrics or sources. When an alert is in the INVALID state, it is checked approximately every 15 minutes, instead of the specified checking frequency (see next section).
- **SNOOZED**: The alert is not checked to determine if the Condition and Alert fires properties are being met.

## When Alerts are Checked

The series associated with that alert are checked according to the Checking Frequency property (default 1 minute) to determine whether the alert should fire or not. Additionally:

- When an alert is currently not firing, the time window evaluated according to the Checking Frequency is controlled by the Alert fires property. For example, if the Alert fires property is set to 3 minutes, the time window being evaluated at the Checking Frequency is 3 minutes.
- When an alert is currently firing, the time window evaluated according to the Checking Frequency is controlled by the Alert resolves property. The point in time where the Checking Frequency approximate check occurs is unique to each alert. For example, one alert could be checked at 1:01:04p while another alert could be checked at 1:01:17p.
- The end time for the time window being evaluated according to the Checking Frequency is determined by: "alert check time (rounded down to nearest minute) - 1 minute". Suppose the Alert fires property is set to 5 minutes. If the alert check time is 1:09:32p, then the end time for the time window being evaluated would be 1:08:00p (("1:09:32" - "0:00:32") - "0:01:00"). Therefore the 5 minute time window would be 1:03:00p to 1:08:00p.
- Alert checks evaluate minutely summarized (mean) data values. For example, if 5 data values are reported between 12:11:00p and 12:11:59p, then the average value of those 5 data values would be displayed at 12:11:00p. If you want a different summarization strategy, then you can use a 1 minute `align()` function in your query and specify the summarization method.

## When Alerts Fire

An alert fires when its condition evaluates to at least one true value and zero false values present within the given Alert fires time window.

### Example: ts(cpu.loadavg.1m) > 4 fires
- If the series has one reported data value of 5 in the last X minutes, and no other points (no data), the alert will fire.
- If the series has two reported data values of 5 and 3, both anywhere in the last X minutes, the alert will not fire.
- If the series only has points <= 4 in the last X minutes, the alert will not fire.
- If the series has many points in the last X minutes, all of which are > 4, the alert will fire.

Alert checks are based on data summarized every minute.  This means that if you have a series of 9, 9, 9, 3, 9 in the _same minute_ for the alert condition, the condition evaluates to true for that particular minute although there is a value of 3 reported. All alert queries are checked according to the Checking Frequency property.

###  Detailed Example

In the following example, the threshold for the alert is set to 50%. The event window from 09:34-09:35 identifies the interval during which the metric crossed the threshold going up. The event window from 09:39-09:40 identifies the interval during with the metric crossed the threshold going down. The settings for the alert were Alert fires = 2 minutes, Alert resolves = 2 minutes, and Checking Frequency = 1 minute. The alert fires around 09:37:09 and resolves at 09:41:59.

![Alert fires](images/alert_fire.png)

## Alert Notifications

When an alert fires, a notification containing the alert info is sent to targets listed in the [Targets](alerts_creating.html#alert-properties) property. Targets can be email addresses, PagerDuty and VictorOps API keys, HipChat rooms, Slack channels, and webhooks.

If one of the targets is PagerDuty and you resolve the incident while the alert is still currently firing in Wavefront two scenarios can occur:

- If there is a change to the set of sources being affected, those changes will trigger a new incident in PagerDuty. Changes to the set of sources being affected includes:

  - Newly affected sources are added to the list of existing affected sources 
  - A subset of the existing sources being affected are no longer affected

- If all affected sources are no longer affected and the alert is resolved in Wavefront, then no new incident will be logged into PagerDuty.

## Viewing Firing Alerts

The alerts icon in the task bar ![number of alerts](images/alerts.png#inline) shows the number of alerts firing and their severity. The filter bar at the left of the Alerts page shows the number of firing alerts and you can click the FIRING facet to filter the list of alerts:

![Tag path](images/alerts_filter.png)


Sometimes an alert fires even though it looks like it shouldn't have. This can occur in the following scenarios:

- Late data values are reported after the alert fired. When this occurs, the alert check initially sees one true value and no false values within the Alert fires window at the time of firing, but the late data values that are reported essentially change a true value to a false value. In these cases, the alert fires correctly but the chart associated with the alert that you view 5 or 10 minutes later may not show the value the alerting check originally saw.
- An aggregate function is used in the alert query and missing data was present for one or more underlying series at the time the alert fired. This tends to make up the majority of these cases. If there is at least one truly reported data value present at a given time window for one of the underlying series, then Wavefront attempts to apply an interpolated value for all underlying series that did not report a value at that given time slice. For example, suppose you are aggregating data for app-1, app-2, and app-3 using the sum() aggregate function. app-1 and app-3 reported values at 1:00:00p and 1:03:00p, while app-2 reported values at 1:00:00p, 1:01:00p, and 1:03:00p. In this case, an interpolated value would be applied for app-1 and app-3 at 1:01:00p since app-2 reported a value at that time slice.

  In the example above, assume that the end of the alerting check time window is 1:02:00p. In order to apply accurate interpolated values, there must be a reported value before and after the interpolated time slice. Since app-1 and app-3 don't report a value until 1:03:00p, it's impossible to interpolate a value for them at 1:02:00p. At 1:03:00p, the data values for app-1 and app-3 are reported and therefore interpolated values are retroactively applied to 1:02:00p for these sources. If the alerting check evaluates the data before the interpolated values are applied, then the chart you view 5 or 10 minutes later may not show the value the alerting check originally saw.

## When Alerts Resolve

An alert resolves when there are either no true values present within the given Alert resolves time window, or the Alert resolves time window contains no data. If the Alert resolves property is not set, the property defaults to the Alert fires value.



