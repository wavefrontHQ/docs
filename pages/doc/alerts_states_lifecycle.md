---
title: Alert States and Lifecycle
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_states_lifecycle.html
summary: Learn about alert conditions and states, when alerts fire, and how alerts resolve.
---

## Alert Conditions

An alert condition is a conditional ts() expression that defines the threshold for an alert. 
* If an alert's [Condition](alerts_managing.html#alert-properties) field is set to a conditional expression, for example `ts("requests.latency") > 195`, then all reported values that satisfy the condition are marked as `true` (1) and all reported values that do not satisfy the condition are marked as `false` (0). 
* If the Condition field is set to a ts() expression, for example `ts("cpu.loadavg.1m")`, then all _non-zero_ reported values are marked as `true` and all zero reported values are marked as `false`. If there is _no reported data_, then values are evaluated as neither true nor false.

## Alert States

An alert can be in one of the following states:

* **CHECKING** - The alert is being checked whether the Condition and Alert fires properties are being met. 

  Alerts can't be in the CHECKING and the FIRING state at the same time even though firing alerts are being checked to determine if firing conditions are still being met.  An alert resolves (transitions back to CHECKING) when no true values present within the time window, or when the time window contains no data.
* **FIRING** - The alert is meeting the Condition and Alert fires properties. An alert transitions to FIRING when the condition evaluates to at least one true value and no false values during a fixed time window.
* **NO DATA** - The series for which an alert is defined is not reporting data. 

  You can set up an alert that triggers if the alert is in a NO DATA state for a specified amount of time. If you do, select Alert Has No Data in the corresponding [Alert Target](https://docs.wavefront.com/webhooks_alert_notification.html#creating-an-alert-target). For those alert targets, select Alert Has No Data Resolved if you want to send a notification when the alert exits the NO DATA state.  
* **IN MAINTENANCE** - The alert has an alert tag or a source or set of sources included in a source tag associated with an ongoing maintenance window. 

  If an alert has a subset of reporting sources associated with in an ongoing maintenance window, then the state displays as CHECKING/IN MAINTENANCE. If an alert has a subset of reporting sources associated with an ongoing maintenance window but the other sources are firing, the state displays as FIRING/IN MAINTENANCE.
* **INVALID** - The alert is timing out ( > 5 min query execution) or queries include inactive metrics or sources. When an alert is in the INVALID state, it is checked approximately every 15 minutes, instead of the specified checking frequency (see next section).
* **SNOOZED** - The alert is not checked.

## When Alerts Are Checked

The time series associated with an alert are checked to determine whether the alert should fire or not. Default for checking frequency is 1 minute. You can change the [Checking Frequency](alerts_managing.html#alert-properties) from the UI.
 
The exact time of the check for the same alert is not fixed and can vary slightly within the minute. For example, for a specific alert it’s possible that a check occurs at 1:01:17p and the next check occurs at 1:02:13p.

Alert checks evaluate minutely summarized (mean) data values. For example, if 5 data values are reported between 12:11:00p and 12:11:59p, then the average value of those 5 data values is displayed at 12:11:00p. If you want a different summarization strategy, then you can use a 1 minute `align()` function in your query and specify the summarization method.

## Alert Check Time Window

The time window that we evaluate at the default checking frequency interval depends on the state of the alert:

- When an alert is currently not firing, the Alert fires property determines the time window that is evaluated. For example, if the Alert fires property is set to 3 minutes, we evaluate a 3 minute time window.
- When an alert is currently firing, the Alert resolves property determines the time window that is evaluated.
- The last data point evaluated by an alert is determined by the following equation:

  `alert check time (rounded down to nearest minute) - 1 minute`
  
  We use this equation to ensure that the alert has a full minute's worth of data to evaluate. 
  For example, suppose the Alert fires property is set to 5 minutes. If the alert check time is 1:09:32p, then the last data point evaluated is 1:08:00p (("1:09:32" - "0:00:32") - "0:01:00"). The 5 minute time window covers data points in the 1:04:00p to 1:08:59p interval.

## When Alerts Fire

An alert fires when its [condition](#alert-conditions) evaluates to at least one true value and zero false values present within the given Alert fires time window.

### Example: ts(cpu.loadavg.1m) > 4 fires
- If the series has one reported data value of 5 in the last X minutes, and no other points (no data), the alert fires.
- If the series has two reported data values of 5 and 3, both anywhere in the last X minutes, the alert does not fire.
- If the series only has points <= 4 in the last X minutes, the alert does not fire.
- If the series has many points in the last X minutes, all of which are > 4, the alert fires.

Alert checks are based on data summarized every minute.  This means that if you have a series of 9, 9, 9, 3, 9 in the _same minute_ for the alert condition, then the condition evaluates to true for that particular minute although there is a value of 3 reported. All alert queries are checked according to the Checking Frequency property.

###  Detailed Example

In the following example, the threshold for the alert is set to 50%. The event window from 09:34-09:35 identifies the interval during which the metric crossed the threshold going up. The event window from 09:39-09:40 identifies the interval during with the metric crossed the threshold going down. The settings for the alert were Alert fires = 2 minutes, Alert resolves = 2 minutes, and Checking Frequency = 1 minute. The alert fires around 09:37:09 and resolves at 09:41:59.

![Alert fires](images/alert_fire.png)

## PagerDuty Notifications

If you use the out-of-the-box PagerDuty alert target, and you resolve the incident while the alert is still firing in Wavefront, two scenarios are possible:

- If there is a change to the set of sources being affected, that change triggers a new incident in PagerDuty. Changes to the set of sources being affected include:

  - Newly affected sources are added to the list of existing affected sources 
  - A subset of the existing sources being affected is no longer affected

- If all affected sources are no longer affected and the alert is resolved in Wavefront, then no new incident is logged into PagerDuty.

You can customize this behavior using the PagerDuty [alert target](webhooks_alert_notification.html). 

## Viewing Firing Alerts

The alerts icon in the task bar ![number of alerts](images/alerts.png#inline) shows the number of alerts firing and their severity. The filter bar at the left of the Alerts page shows the number of firing alerts. You can click the FIRING facet to filter the list of alerts:

![Tag path](images/alerts_filter.png)

## Misfiring Alerts

Sometimes an alert fires even though it looks like it shouldn't have fired. This can occur in the following situations:

- Late data values are reported after the alert fired. When this occurs, the alert check initially sees one true value and no false values within the Alert fires window at the time of firing, but the late data values that are reported change a true value to a false value. In these cases, the alert fires correctly but it's possible that the chart associated with the alert, which you view 5 or 10 minutes later, does not show the value that the alerting check originally saw.
- An aggregate function is used in the alert query and missing data was present for one or more underlying series at the time the alert fired. This tends to make up the majority of misfiring alerts. If there is at least one truly reported data value present at a given time window for one of the underlying series, then Wavefront attempts to apply an interpolated value for all underlying series that did not report a value at that given time slice. For example, suppose you are aggregating data for app-1, app-2, and app-3 using the sum() aggregate function. app-1 and app-3 reported values at 1:00:00p and 1:03:00p, while app-2 reported values at 1:00:00p, 1:01:00p, and 1:03:00p. In this case, an interpolated value is applied for app-1 and app-3 at 1:01:00p because app-2 reported a value at that time slice.

  In the example above, assume that the end of the alerting check time window is 1:02:00p. To apply accurate interpolated values, a reported value must exist before and after the interpolated time slice. Because app-1 and app-3 don't report a value until 1:03:00p, it's impossible to interpolate a value for them at 1:02:00p. At 1:03:00p, the data values for app-1 and app-3 are reported and therefore interpolated values are retroactively applied to 1:02:00p for these sources. If the alerting check evaluates the data before the interpolated values are applied, then it's possible that the chart you view 5 or 10 minutes later does not show the value that the alerting check originally saw.

## When Alerts Resolve

An alert resolves when there are either no true values present within the given Alert resolves time window, or when the Alert resolves time window contains no data. If the Alert resolves property is not set, the property defaults to the Alert fires value.

**Note** Setting Alert resolves to a value that is lower than Alert fires can result in  multiple resolve-fire cycles under certain circumstances. 

For example assume the following scenario: 
 1. The alert condition is `ts(metric.name) > 0”, alert fires = 10, alert resolves = 5`
 1. metric.name normally reports 0, but starts reporting 1. 
 1. After 10 minutes, the alert fires (because metric.name has been 1)
 1. At 10:30, metric.name returns to 0 and stops reporting new messages. 
 1. At 1:36, the alert resolves because the value was 0 for the last 5 minutes.
 1. At 1:37, the alert fires again because there were 1 values in the last 10 minutes. 
 1. Then the alert resolves again and fires again, until 1:41 when it finally resolves. 

