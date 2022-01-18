---
title: Wavefront Alerts FAQ
keywords: alerts
tags: [getting started, alerts]
sidebar: doc_sidebar
permalink: alerts_faq.html
summary: Learn alert customization from experts.
---
## Who can view and modify alerts?
All users can view and examine alerts. You need **Alerts** permission to create and modify alerts.

As an administrator, you can [restrict access for new dashboards and alerts](access.html#changing-access-for-individual-dashboards-or-alerts).

If some of the alerts in your environment are under [access control](access.html), you can view or view and modify those alerts only if they’ve been shared with you.

## How often Wavefront evaluates the alert condition?
The minimum and default **Checking Frequency** is 1 minute. You can adjust this property from the *Advanced* settings of the alert depending on your data reporting frequency.

## How Wavefront evaluates whether the alert condition is `true` or `false`?
If the conditional expression is *met* or returns a *non-zero* value, the result is `true`. If the conditional expression is *not met* or returns a *zero* value, the result is `false`. If there's no data reported during the checking frequency interval, there's no result from the evaluation.

If your metrics do not report at a fixed interval or if your metrics report more than 1 value per checking frequency interval, by default, Wavefront performs an *average* aggregation of the values before evaluating the result. In such cases, you can base your conditional expression on the last value reported, the sum of the values, the minimum or the maximum value, or the average of the values depending on what nuance you want your query to capture.

## When does an alert fire?
If the conditional expression returned at least one `true` value during the alert firing time window, Wavefront switches the alert state from CHECKING to FIRING.

The default alert firing time window is 5 minutes. You can adjust this property from the **Alert fires** setting of the condition.

If your metric is backfilled in chunks, for example, if the metric is backfilled in 10-minute chunks, avoid setting **Alert fires** to less than 10 minutes, or use moving time window functions to make sure all the incoming data is visible to the alert.

## When does an alert resolve?
If the conditional expression didn't return any `true` values during the alert resolving time window, Wavefront switches the alert state from FIRING to CHECKING.

The default alert resolving time window is the same as the alert firing time window. You can adjust this property from the **Alert resolves** setting of the condition.

## Can alerts use multiple metrics?
Yes. You can [aggregate points from multiple time series](query_language_aggregate_functions.html) with or without interpolation depending on your use case. If metrics report at the same time, it might be better to use raw aggregate functions and not interpolating aggregate functions. With standard aggregation functions, interpolation will occur.

## Do data delays impact alert behavior?
Yes. Data coming from certain sources, such as cloud applications, are often batched and arrive at your alert at unpredictable times. You can [limit the impact of data delays](alerts_delayed_data.html) by making sure you understand the issue and by fine-tuning the query and time window.

## Why did my alert miss firing or misfire?
False negative or false positive alerts could be due to:
* [Delayed data reporting](alerts_delayed_data.html#check-for-a-data-delay). You can [adjust your alert condition](alerts_delayed_data.html#minimize-the-impact-of-data-delays-on-alerts) to prevent the alert from responding until data reporting is complete.
* Utilizing [functions that can introduce interpolation](query_language_discrete_continuous.html#functions-that-use-interpolation-to-create-continuous-data). In Tanzu Observability, interpolation is the process of generating a made-up data value for 1 or more time series where they don't exist, and can only occur between two truly reported values within a series. The process of interpolation can increase a displayed value in the past by including more made-up values in the calculation once a newly reported value comes into the system.
* Alert evaluation on aggregated values when data is reported more often. If your alert query is reporting values more often than once per checking interval, then you may want to consider applying the [align() function](ts_align.html) to the entire alert query.

## What if a metric doesn't report values for a long time?
Wavefront considers a metric *obsolete* after it hasn’t reported any values for 4 weeks.

When a machine or application crashes, it stops reporting data to Wavefront – the data from that source is missing. You can configure [alerts on missing data](alerts_missing_data.html).

If an alert uses an error metric, when no errors occurred during a reporting interval, reported value can be `0` or can be omitted. The latter may require the [default() missing data function](ts_default.html) in order to correctly handle the omitted value. Another option is to wrap `count` around the metric, so that the metric is cumulative and does not become obsolete.

If you want an alert to use obsolete metrics, select the *Advanced* check box **Include Obsolete Metrics**.
