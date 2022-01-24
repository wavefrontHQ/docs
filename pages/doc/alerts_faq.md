---
title: Wavefront Alerts FAQ
keywords: alerts
tags: [getting started, alerts]
sidebar: doc_sidebar
permalink: alerts_faq.html
summary: Learn alert customization from experts.
---
## Who Can View and Manage Alerts?
Permissions and access control determine who can view, create, and modify an alert.
  * [Permissions](permissions_overview.html) apply to **all alerts**. Users with the **Alerts** permission can create and modify alerts. Users who don’t have the **Alerts** permissions can only view alerts.
  *	[Access control](access.html) applies to **individual alerts**. To view an alert that is under access control, you should be granted **View** or **View & Modify** access for this alert. To modify an alert that is under access control, you should be granted **View & Modify** access for this alert and you should have the **Alerts** permission.
  
## What’s the Alert Condition
The alert condition is the query of the selected query. In multi-query alerts, you can define several queries and use the results of these queries in the condition query, but only the selected query can be the condition. 

## How Often Does Wavefront Evaluate the Alert Condition?
The minimum and default **Checking Frequency** interval is 1 minute. You can adjust this property from the **Additional Settings** in the **Conditions** section of the alert.

  * If your data points are coming much less frequently than once a minute, consider increasing the checking frequency interval. For example, if the query metrics report every 10m, set the **Checking Frequency** interval to 10m.
  * If an alert is non-critical, you can check only as much as needed.
  * If an alert condition uses larger moving time windows or aligns to a large interval, you can check less frequently. For example, an alert that compares a `mavg(6h, ...)` to `mavg(48h, ...)` can be safely checked once an hour or even less.

## How Does Wavefront Evaluate the Alert Condition?
For each checking interval, Wavefront evaluates the reported value against the alert condition. If your metric reports more than one value per checking interval, Wavefront first evaluates each reported value against the alert condition, then performs an *average* aggregation of the results.
  * If the alert condition is *met* or returns a *non-zero* value, the result is `1` (`true`).
  
    Suppose your alert condition is `ts(my.metric) > 8`.
    * If `my.metric` reported the data value of `15` during the checking interval, Wavefront evaluates the alert condition for this checking interval as `1` because the statement `15 > 8` is `true`, i.e. the condition is *met*.
    * If `my.metric` reported the data values of `15`, `6`, and `2` during the checking interval, Wavefront evaluates the alert condition for this checking interval as `1` because the aggregated average value of the three results (`1`,`0`,`0`) is `0.3`, i.e. the result is a *non-zero* value.
  * If the alert condition is *not met* or returns a *zero* value, the result is `0`(`false`).
  
    Suppose your alert condition is `ts(my.metric) > 8`.
    * If `my.metric` reported the data value of `6` during the checking interval, Wavefront evaluates the alert condition for this checking interval as `0` because the statement `6 > 8` is `false`, i.e. the condition is *not met*.
    * If `my.metric` reported the data values of `6`, `6`, and `2` during the checking interval, Wavefront evaluates the alert condition for this checking interval as `0` because the aggregated average value of the three results (`0`,`0`,`0`) is `0`, i.e. the result is a *zero* value.
  * If there's no data reported during the checking interval, there's no result from the evaluation.

## When Does an Alert Fire?
If the alert condition returned *at least one* `true` value and *none* `false` values during the alert trigger window, Wavefront switches the alert state from CHECKING to FIRING. 

The default **Trigger Window** is 5 minutes. You can adjust this property from condition settings.

If your metric is backfilled in chunks, for example, if the metric is backfilled in 10-minute chunks, avoid setting **Trigger Window** to less than 10 minutes, or use [moving time window functions](query_language_reference.html#moving-window-time-functions) to make sure that all the incoming data is visible to the alert.

## When Does an Alert Resolve?
If the alert condition didn't return *any* `true` values during the alert resolve time window, Wavefront switches the alert state from FIRING to CHECKING.

The default **Resolve Window** is the same as the **Trigger Window**. You can adjust this property from the condition setting.

## Can Alerts Use Multiple Metrics?
Yes, you can [aggregate points from multiple time series](query_language_aggregate_functions.html) with or without interpolation depending on your use case. In Wavefront, interpolation is the process of generating a made-up data value for one or more time series where they don't exist, and can only occur between two truly reported values within a series.

If metrics report at the same time, it might be better to use raw aggregate functions and not interpolating aggregate functions. With standard aggregation functions, interpolation will occur.

## Why Did My Alert Not Fire?
False negative alerts could be due to:
  * [Delayed data reporting](alerts_delayed_data.html#check-for-a-data-delay), which can result in short alert trigger time window and jump over a problem spot and not fire. Assume an alert checks the condition and it isn’t met. 1 minute later, data for the last 15 minutes arrive, and it’s obvious the alert should have fired – but the data to trigger the alert weren’t available. You can [adjust your alert condition](alerts_delayed_data.html#minimize-the-impact-of-data-delays-on-alerts) to prevent the alert from responding until data reporting is complete.
  * A checking frequency interval that is higher than the alert trigger time window. For example, if the **Trigger Window** interval is 5m and the **Checking Frequency** interval is 10m, data might meet the condition within the 5-minute time interval, but the alert never fires because the checking frequency interval is too high.
  * Alert evaluation on aggregated values when data is reported more often. If your alert query is reporting values more often than once per checking interval, the default average aggregation can mask some problems. You may consider applying the [align() function](ts_align.html) to the entire alert condition and base your query on the last value reported, the sum of the values, the minimum or the maximum value of the values depending on what nuance you want your query to capture.

## Why Did My Alert Misfire?
False positive alerts could be due to:
  * Utilizing [functions that can introduce interpolation](query_language_discrete_continuous.html#functions-that-use-interpolation-to-create-continuous-data). The process of interpolation can increase a displayed value in the past by including more made-up values in the calculation once a newly reported value comes into the system.
  * [Delayed data reporting](alerts_delayed_data.html#check-for-a-data-delay). You can [limit the impact of data delays](alerts_delayed_data.html) by making sure you understand the issue and by fine-tuning the query and time window.

## What If a Metric Doesn't Report Values for a Long Time?
Wavefront considers a metric *obsolete* after it hasn’t reported any values for 4 weeks.

If an alert uses an error metric, when no errors occurred during a reporting interval, reported value can be `0` or can be omitted. The latter may require the [default() missing data function](ts_default.html) in order to correctly handle the omitted value. Another option is to wrap `count` around the metric, so that the metric is cumulative and does not become obsolete.

If you want an alert to use obsolete metrics, on the **Advanced** tab of the **Data** settings of the alert, select the **Include Obsolete Metrics** check box.
