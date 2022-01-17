---
title: Wavefront Alerts FAQ
keywords: alerts
tags: [getting started, alerts]
sidebar: doc_sidebar
permalink: alerts_faq.html
summary: Learn alert customization from experts.
---

## How often Wavefront checks the result of the alert condition?
The minimum and default **Checking Frequency** interval is 1 minute. You can adjust this property from the *Advanced* settings of the alert depending on your data reporting frequency.

## How Wavefront decides whether the result of the alert condition is `true` or `false`?
If the conditional expression is *met* or returns a *non-zero* value, the result is `true`. If the conditional expression is *not met* or returns a *zero* value, the result is `false`. If there's no data reported during the checking frequency interval, there's no result from the evaluation.

If your metrics do not report at a fixed interval or if your metrics report more than 1 value per checking frequency interval, by default, Wavefront performs an *average* aggregation of the values before evaluating the result. In such cases, you can base your conditional expression on the last value reported, the sum of the values, the minimum or the maximum value, or the average of the values depending on what nuance you want your query to capture.

## When does an alert fire?
If the conditional expression returned at least one `true` value during the alert firing time window, Wavefront fires the alert.

The default alert firing time window is 5 minutes. You can adjust this property from the **Alert fires** setting of the condition.

## When does a firing alert resolve?
If the conditional expression returned only `false` values during the alert resolving time window, Wavefront resolves the firing alert.

The default alert resolving time window is the same as the alert firing time window. You can adjust this property from the **Alert resolves** setting of the condition.

## What happens if there is a data delay and what should I do?

## Why did my alert miss firing or misfire?
False negative or false positive alerts could be due to
* [Delayed data reporting](alerts_delayed_data.html#check-for-a-data-delay). You can [adjust your alert condition](alerts_delayed_data.html#minimize-the-impact-of-data-delays-on-alerts) to prevent the alert from responding until data reporting is complete.
* Utilizing functions that can introduce interpolation
* Alert evaluation on aggregated values when data is reported more often.

## Who can view and modify an alert?
All users can view and examine. You need **Alerts** permission to create and modify alerts.

As an administrator, you can [restrict access for new dashboards and alerts](access.html#changing-access-for-individual-dashboards-or-alerts).

If some of the alerts in your environment are under [access control](access.html), you can view or view and modify those alerts only if they’ve been shared with you.

## How can I stop receiving a specific alert?

## What if a metric doesn't report values for a long time?

## How to handle obsolete metrics?
