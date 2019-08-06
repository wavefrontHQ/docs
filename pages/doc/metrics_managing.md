---
title: Hiding and Unhiding Metrics
keywords: metrics
tags: [administration]
published: false
sidebar: doc_sidebar
permalink: metrics_managing.html
summary: Learn how to hide and redisplay metrics.
---

You can _manually_ hide metrics from the Metrics browser and in the autocomplete dropdown associated with queries. Manually hiding metrics does not permanently delete a particular metric or metric namespace from Wavefront.

To view, hide, and redisplay metrics, select **Browse > Metrics**.

{% include shared/permissions.html entity="metrics" entitymgmt="Metric" %}

## Hiding Multiple Metrics

1. In the Metrics browser, click the **Manage Hidden Metrics** button.
1. In the dialog type a complete metrics name (e.g. `requests.latency`) or a metric prefix (e.g. `requests.`, `cpu.loadavg.`).

   - This field does not support auto-complete, so you have to type the entire metric name or metric prefix.
   - The text is case sensitive.
   - Wildcards are not supported. The `*` character is considered part of the text string.

1. Press **Enter** to add the metric or metric prefix to the list. The list takes effect only after you save.

   ![hidden metrics](images/viewing_hidden_metrics.png)

1. Repeat to add more metrics and metric prefixes to the list and click **Save**.

## Hiding Single Metrics

1. In the Metrics browser, hover over a metric folder or metric name.

   A Hide Metrics button displays at the far right of that row on the list. If you are hovering over a metric name, the Hide Metrics button appears directly to the left of the Info button.

   ![metrics list hide](images/metrics_list_hide.png)

1. Click the **Hide Metrics** button. The metric or metric prefix is added to the hidden metrics list.

## Viewing Manually Hidden Metrics

To view all manually hidden metrics and metric prefixes, click the **Manage Hidden Metrics** button.

A list of metrics and metric prefixes that have been manually hidden displays.

![viewing hidden metrics](images/viewing_hidden_metrics.png)

This list displays only metrics and metric prefixes that were manually hidden. If a metric or metric prefix has not had a single data value reported in the last 4 weeks, Wavefront considers the metric or metric prefix obsolete and hides it. Metrics and metric prefixes that are automatically hidden displayed in this list only if they were also manually hidden.

## Unhiding Metrics

To unhide a metric or metric prefix:

1. In the Metrics browser, click the **Manage Hidden Metrics** button to view the list of manually hidden metrics and metric prefixes.
1. Click the **Unhide** button to the right of the metric or metric prefix to unhide.
1. Click **Save**.
   The selected metric and metric prefixes appear in the list of metrics in the Metrics browser and in the autocomplete dropdown associated with metric names.

   The selected metrics and metric prefixes only appear again in these cases if they have had at least 1 reported data value in the last 4 weeks. Otherwise, these metric/metric prefixes are considered obsolete metrics and Wavefront automatically hides them by default.
