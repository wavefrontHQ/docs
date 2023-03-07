---
title: Customize Logs Settings
tags: [logs]
sidebar: doc_sidebar
permalink: logging_logs_settings.html
summary: Learn how you can customize log settings from the organization settings page. 
---

Users with **Accounts** permissions can map metrics tags to logs tags, traces tags to logs tags, and customize the time window you see on a chart or Traces Browser when drill into logs from an chart and trace.

## Map Tags

When you are on a chart, application map, or Traces Browser, and drill into the Log Browser, the tags associated with the metrics or trace are added as search filters on the Log Browser. If the logs tags are different from the metrics or traces tags, you don't see logs on the Log Browser. Therefore, it is important that you use the same tags for metrics, traces, and logs.

### Map the Traces Tags to Logs Tags

If your traces and logs use different tags, follow these steps to create a map between the tags:

1. From the gear icon, select **Organization Settings**.
1. Click **+ Map Traces Tags to Logs**.
1. Select the trace tags you want to map from the dropdown list.
1. Click **+ Choose tags** under **Logs Tags** and select the tag you want to map with the trace tag. 
1. Click **Save**.

Example:
![Create a map between the trace tags and logs tags](images/logging_traces_to_logs_map.png)

### Map the Metric Tags to Logs Tags

If your metrics and logs use different tags, follow these steps to create a map between the tags:

1. From the gear icon, select **Organization Settings**.
1. Click **+ Map Metrics Tags to Logs**.
1. Select the metrics tags you want to map from the dropdown list.
1. Click **+ Choose tags** under **Logs Tags** and select the tag you want to map with the trace tag. 
1. Click **Save**.

Example:
![Create a map between the metrics tags and logs tags](images/logging_metrics_to_logs_map.png)

## Customize the Time Window when Drilling Into Logs

When you drill into logs from a chart or trace, the Logs Browser sets the same time window on the chart, Traces Browser, or application map. Follow these steps to increase this time window. Choose between 0 and 3600 seconds.

1. From the gear icon, select **Organization Settings**.
1. Set the before and after buffer times under **Customize leading and trailing times for "Go to Logs"**. The values need to be between 0 and 3600 seconds.

For example, when you drill into logs from a chart, add a 30 second buffer time before and after the time window on a chart:
![A screenshot on how to customize the search time window](images/logging_customize_time_window_organization_settings.png)
 