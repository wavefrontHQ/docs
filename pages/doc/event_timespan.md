---
title: timespan Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_timespan.html
summary: Reference to the timespan() function
---
## Summary
```
timespan(<startTimestamp>, <endTimestamp>)
```

Creates a single synthetic event with the specified start and end timestamps.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> startTimestamp</td>
<td markdown="span">Timestamp that specifies when the new event starts. For a fixed start time, specify a number of epoch seconds. For a start time that is relative to the current time, use a time phrase such as `"5 minutes ago"` or `".5 hour ago"`.</td>
</tr>
<tr>
<td markdown="span"> endTimestamp</td>
<td markdown="span">Timestamp that specifies when the new event ends. For a fixed end time, specify a number of epoch seconds. For an end time that is relative to the current time, use a time phrase such as `"5 minutes ago"` or `".5 hour ago"`. The `endTimestamp` must be of the same type (fixed or relative) as the `startTimestamp`.</td>
</tr>
</tbody>
</table>

## Description

The `timespan()` event creation function creates a single synthetic event that starts and ends at the specified timestamps.


**Note:** Synthetic events are displayed by the query, but not stored in Wavefront.

## Examples

### Fixed Start and End Times

The following chart shows a single 5-minute synthetic event that was created by specifying 2 epoch timestamps.

![Event timespan fixed](images/event_timespan_epoch.png)

### Relative Start and End Times

The following chart shows a single synthetic 10-minute event that was created by specifying 2 relative timestamps. In a chart that displays live data, the start time of the event will always be 12 minutes before the end of the chart, and the end time will always be 2 minutes before the end of the chart.

![Event timespan relative](images/event_timespan_relative.png)
