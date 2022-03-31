---
title: Alerts FAQ
keywords: alerts
tags: [getting started, alerts]
sidebar: doc_sidebar
permalink: alerts_faq.html
summary: Get help with common problems
---
## Why Can't I View and Edit This Alert?

As a rule, all users can view all alerts. But permissions and access control affect this default.

  * You must have **Alerts** permission to edit alerts. [Permissions](permissions_overview.html) apply to **all alerts**. Users with the **Alerts** permission can create and modify alerts. Users who don’t have the **Alerts** permissions can only view alerts.

    A user with **Accounts** permissions can assign the permission to you.
  *	If an individual alert is protected by [Access Control](access.html), you might not be able to edit or even view that alert.
    - To view an alert that is under access control, you must have **View** access for the alert.
    - To modify an alert that is under access control, you must have **View & Modify** access for this alert. You also need the **Alerts** permission.

    The creator of the alert or a SuperAdmin user can grant access.

## Why Did My Alert Not Fire?

You think that your alert should have fired, but it didn't. Here's what you can do:

### Check for Delayed Data Reporting



<p><span style="font-size: medium; font-weight: 600">Problem</span></p>

If you examine an alert that should have fired in the past, [delayed data reporting](alerts_delayed_data.html#check-for-a-data-delay) might have caused the problem, especially if the data is delayed for longer than the alert trigger time window.
* The alert query might not have the data that would trigger the alert.
* A reporting lag can also reduce the set of data values being evaluated.

<p><span style="font-size: medium; font-weight: 600">Examples</span></p>

* Consider an alert that has a trigger window of 1 minute, but the data it relies on typically arrives 3 minutes late. In this case, every time the alert is checked, it does not see any data in the trigger window, meaning the alert never fires. However, a user later checking the time series for the alert would see the data as it was backfilled after the alert check.

* Consider an alert that is evaluating a 5-minute time window, but there is a 4-minute lag in reporting. In this case, the alert evaluates only 1 value during each check. Even if a "true" value is going to eventually be followed by 4 "false" values, the alert can still trigger if the "false" values haven't been reported into the system yet because alerts trigger when there is at least 1 "true" value and no "false" values.

<p><span style="font-size: medium; font-weight: 600">Action</span></p>

Here's how you can take action:
1.Review the alert query on a live data chart to find out if there's lag in reported data.
2.[Refine your alert condition](alerts_delayed_data.html#minimize-the-impact-of-data-delays-on-alerts) to prevent the alert from evaluating the query until data reporting is complete.



### Consider Checking Frequency and Trigger Window Mismatch

<p><span style="font-size: medium; font-weight: 600">Problem</span></p>
If the checking frequency interval that is higher than the alert trigger time window, the alert might not fire.

<p><span style="font-size: medium; font-weight: 600">Example</span></p>
Suppose the **Trigger Window** interval is 5m and the **Checking Frequency** interval is 10m, data might meet the condition within the 5-minute time interval, but the alert never fires because the checking frequency interval is too high.

<p><span style="font-size: medium; font-weight: 600">Action</span></p>

[Edit the alert](alerts_manage.html)  to either change the **Checking Frequency** or **Trigger Window**.

### Consider If Aggregation Masks Spikes

Aggregation can mask spikes in your data in several ways.

<p><span style="font-size: medium; font-weight: 600">Problem</span></p>

* **Avarage aggregation**. If your alert query is reporting values more often than once per minute, the query engine aggregates those values using an average. This default average aggregation can mask irregularities with data that should have triggered the alert.

* **Non-raw aggregation functions**.  With non-raw aggregation, the process of interpolation can increase a displayed value in the past by including more made-up values in the calculation once a newly reported value comes into the system.

<p><span style="font-size: medium; font-weight: 600">Example</span></p>

Imagine you are using sum() to aggregate 3 time series together. Each time series reports a value every 5 minutes, but the reporting interval is staggered. In this case,
* app-1 reports on the :00 and :05 minute boundaries
* app-2 reports on the :01 and :06 minute boundaries
* app-3 reports on the :02 and :07 minute boundaries.

Assume you review this data in real-time at 12:02p.
* The aggregated value at 12:00p represents the sum of 3 values because the query engine generates interpolated values at 12:00p for app-2 and app-3.
* However, the value at 12:02p only represents the sum of 1 value. The query engine can't generate interpolated values for app-1 or app-2 because the next reported values have not come in yet.

In this scenario, your most recent aggregated values at the time of the alert evaluation are typically  less than the value you'd expect to see for all 3 time series were accounted for.
* The temporary lower values can fall below a specified limit or condition and cause an alert not to fire.
* But reviewing the data after the fact might show they exceed a limit due to interpolation.

<p><span style="font-size: medium; font-weight: 600">Action</span></p>

* Using missing data functions or raw aggregation functions can help in these cases.
* Consider applying the [align() function](ts_align.html) to the entire alert condition and base your query on the last value reported, the sum of the values, the minimum or the maximum value of the values depending on what nuance you want your alert condition query to capture.

## Why Did My Alert Misfire?

False positive alerts can be a big problem because the can lead to alert fatigue--the alert recipients stop paying attention to alerts. Here are some things you can do:

### Check If the Alert Condition Query Uses Interpolation

**Problem**: Some functions, e.g. `if()`, non-raw aggregation function like `sum()`, and operators (`+` or `-``) [perform interpolation](query_language_discrete_continuous.html#functions-that-use-interpolation-to-create-continuous-data). Interpolation is the process of generating a data value for 1 or more time series. Interpolation occurs between two reported values within a series. Interpolation can increase a displayed value in the past by including more interpolated values in the calculation when a newly reported value comes into the system.

When using non-raw aggregation functions in your query, the process of interpolation can increase a displayed value in the past by including more made-up values in the calculation once a newly reported value comes into the system.

**Example**: Imagine you are using sum() to aggregate 3 time series together. Each time series reports a value every 5 minutes, but the reporting interval is staggered. In this case, app-1 reports on the :00 and :05 minute boundaries, app-2 reports on the :01 and :06 minute boundaries, and app-3 reports on the :02 and :07 minute boundaries. If we were reviewing this data in real-time at 12:02p, then the aggregated value at 12:00p would represent the sum of 3 values. This occurs because Tanzu Observability could generate interpolated values at 12:00p for app-2 and app-3. However, the value displayed at 12:02p would only represent the sum of 1 value. This is because Tanzu Observability can't generate interpolated values for app-1 or app-2 at that boundary because the next reported values have not come in yet for either.

In this scenario, your most recent aggregated values at the time of the alert evaluation are going to typically be less than the value you'd expect to see if all 3 time series were accounted for. These temporary lower values can often fall below a specified limit or condition and cause an alert not to fire, but reviewing the data after the fact may show them exceed that specified limit due to interpolation.

**Action**: Using [missing data functions](query_language_reference.html#missing-data-functions) or raw aggregation functions (like `rawsum()`) can solve the problem in these cases.


### Investigate Delayed Data Reporting
In many situations, for example, if the data come from a cloud provided, [delayed data](alerts_delayed_data.html#check-for-a-data-delay) can be a problem. [Delayed data reporting] means that the alert sees the wrong data. You can [limit the impact of data delays](alerts_delayed_data.html) by making sure you understand the issue and by fine-tuning the query and time window.

## Any Tips for Creating an Alert that Works?

[Creating an alert](alerts_manage.html) isn't hard, but creating an effective alert is less trivial. Here are some tips from our SaaS Value Engineering team team.

### Consider How Your Alert Will Evaluate the Condition

Tanzu Observability evaluates the reported value against the alert condition for each minute in the checking interval. If your metric reports more than one value during a particular minute, the query engine first performs an *average* aggregation of the values for that minute, then evaluates the aggregated value against the alert condition.

* If the alert condition is *met* or returns a *non-zero* value, the result is `true`.
* If the alert condition is *not met* or returns a *zero* value, the result is `false`.
* If there's no data reported during the minute, there's no result from the evaluation.

Let’s look at an example over a single minute in the checking interval. Suppose your alert condition is `ts(my.metric) > 8`.

* If `my.metric` reported the data value of `15` during the minute, the query engine evaluates the alert condition for this minute as `true` because the condition is *met*, i.e. the statement `15 > 8` is `true`.
* If `my.metric` reported the data values of `15`, `6`, and `2` during the minute, query engine evaluates the alert condition for this minute as `false` because the condition for the aggregated average value is *not met*, i.e. the statement `7.6 > 8` is `false`.

After the alert evaluation, Tanzu Observability has a list of `N` minutely values, one value for each minute in the checking interval. Each of the `N` values can be either `true`, `false`, or `no data`.

### Explore When Your Alert Will Fire

If the alert condition returned *at least one* `true` value and *no* `false` minutely values during the alert trigger window, Tanzu Observability switches the alert state from CHECKING to FIRING.

The default **Trigger Window** is 5 minutes. You can adjust this property from condition settings.

If your metric is backfilled in chunks, for example, if the metric is backfilled in 10-minute chunks, avoid setting **Trigger Window** to less than 10 minutes, or use [moving time window functions](query_language_reference.html#moving-window-time-functions) to make sure that all the incoming data is visible to the alert.

### Understand When Your My Firing Will Alert Resolve

If the alert condition didn't return *any* `true` minutely values during the alert resolve window, Tanzu Observability returns the alert state from FIRING to CHECKING.

The default **Resolve Window** is the same as the **Trigger Window**. You can adjust this property from the condition setting.

### Use Aggregation to Alert on Points from Different Time Series

Yes, you can [aggregate points from multiple time series](query_language_aggregate_functions.html) with or without interpolation depending on your use case. In Tanzu Observability, interpolation is the process of generating a made-up data value for one or more time series where they don't exist, and can only occur between two truly reported values within a series.

If metrics report at the same time, it might be better to use raw aggregate functions and not interpolating aggregate functions. With standard aggregation functions, interpolation will occur.







<!---

## What’s the Alert Condition?
The alert condition is the currently selected query. In multi-query alerts, you can define several queries and use the results of these queries in the condition query, but only the currently selected query will be used as the condition.

## How Often Does Tanzu Observability Evaluate the Alert Condition?
The minimum and default **Checking Frequency** interval is 1 minute. You can adjust this property from the **Additional Settings** in the **Conditions** section of the alert.

  * If your alert condition query runs for more than a minute, consider increasing the checking frequency interval. For example, if the query runs for 2-4 minutes, set the **Checking Frequency** interval to 5 minutes.
  * If your data points are coming much less frequently than once a minute, consider increasing the checking frequency interval. For example, if the query metrics report every 10 minutes, set the **Checking Frequency** interval to 10 minutes.
  * If an alert is non-critical, you can check only as often as needed.
  * If an alert condition uses larger moving time windows or aligns to a large interval, you can check less frequently. For example, an alert that compares a `mavg(6h, ...)` to `mavg(48h, ...)` can be safely checked once an hour or even less.




## Why Did My Alert Misfire?
False positive alerts could be due to:
  * Utilizing [functions that can introduce interpolation](query_language_discrete_continuous.html#functions-that-use-interpolation-to-create-continuous-data). The process of interpolation can increase a displayed value in the past by including more interpolated values in the calculation once a newly reported value comes into the system.
  * [Delayed data reporting](alerts_delayed_data.html#check-for-a-data-delay). You can [limit the impact of data delays](alerts_delayed_data.html) by making sure you understand the issue and by fine-tuning the query and time window.

## What If a Metric Doesn't Report Values for a Long Time?

* If your alert monitors an *exception* metric, often the alert doesn’t see any data during its trigger window and enters the NO DATA state. For example, suppose your alert condition query is `ts(bad.exception)`, where the `bad.exception` metric reports a value of `1` when an exception occurs and reports no data when there's no exception happening.

  In such cases, you can use one of the following approaches:
  * Consider the NO DATA state to be normal and take action only when the alert triggers to FIRING, which means the alert sees the presence of reported error data.

    {% include note.html content="Tanzu Observability considers a metric *obsolete* after it hasn’t reported any values for 4 weeks, and obsolete metrics *are not* included in alert evaluations by default. To handle alerting on very infrequently reported errors series, on the **Advanced** tab of the **Data** settings of the alert, select the **Include Obsolete Metrics** check box." %}
  * Use the [default() missing data function](ts_default.html) to insert a default value depending on how you want to handle the situation where data isn’t being reported.
  * Use the counter metric rather than the gauge metric, if applicable, so that the metric is cumulative and does not become obsolete. For example, use the `bad.exception.count` metric rather than the `bad.exception` metric.

* If your alert monitors *heartbeat* metrics, you should treat the NO DATA state as an *erroneous* state. Consider [configuring an alert to fire when a time series stops reporting](alerts_missing_data.html).

## Troubleshooting
For troubleshooting, see the KB article [Why did my alert fire or not fire?](https://help.wavefront.com/hc/en-us/articles/360049071471-Why-did-my-alert-fire-or-not-fire-).
--->
