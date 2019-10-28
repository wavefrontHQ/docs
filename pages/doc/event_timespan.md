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
timespan(<startTime>, <endTime>
    [, prettyName="<displayName>"]
    [, <eventTagKey>="<eventTagValue>"] ...)
```

Creates a single synthetic event with the specified start and end times, an optional display name, and any number of event tags.


## Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="35%">Parameter</th><th width="65%">Description</th></tr>
</thead>

<tr>
<td markdown="span"> startTime</td>
<td>Time when the new event starts. 
<ul>
<li>For a fixed start time, specify a number of epoch seconds.</li> 
<li>For a start time that is relative to the current time, use a time phrase such as <strong>"5 minutes ago"</strong> or <strong>".5 hour ago"</strong>.</li>
</ul>
</td>
</tr>

<tr>
<td markdown="span"> endTime</td>
<td>Time when the new event ends. 
<ul>
<li>For a fixed end time, specify a number of epoch seconds.</li> 
<li>For an end time that is relative to the current time, use a time phrase such as <strong>"5 minutes ago"</strong> or <strong>".5 hour ago"</strong>.</li>
</ul>

<strong>endTime</strong> must be of the same type (fixed or relative) as <strong>startTime</strong>.</td>
</tr>

<tr>
<td>prettyName="&lt;displayName&gt;"</td>
<td>Name to display for the new synthetic event when you hover over its icon on the X-axis of a chart. The keyword <strong>prettyName</strong> is case-sensitive. 
<br>Example:
<strong>prettyName="Computer turned on"</strong> 
</td>
</tr>

<tr>
<td>&lt;eventTagKey&gt;="&lt;eventTagValue&gt;"</td>
<td>Event tag key and value to be associated with the new synthetic event. Specify multiple event tags by separating them with commas. 
<br>Examples:
<br><strong>severity="info"</strong>
<br><strong>details="traceID: 52ab47e"</strong>
</td>
</tr>

</tbody>
</table>

## Description

The `timespan()` event creation function creates a single synthetic event that starts and ends at the specified times. You can optionally include a display name for the event, and any number of event tags. Synthetic events are displayed by the query, but not stored in Wavefront.

**Note:**  If you want to specify an event name that appears in the UI, you must use the `prettyName` keyword, for example, `prettyName="myEvent"`. In contrast, a parameter like `name="myEvent"` associates an event tag with the event, but does not affect the event's display.



## Examples

### Fixed Start and End Times

The following chart shows a single 5-minute synthetic event that was created by specifying 2 epoch timestamps.

![Event timespan fixed](images/event_timespan_epoch.png)

### Relative Start and End Times

The following chart shows a single synthetic 10-minute event that was created by specifying 2 relative times. In a chart that displays live data, the start time of the event will always be 12 minutes before the end of the chart, and the end time will always be 2 minutes before the end of the chart.

![Event timespan relative](images/event_timespan_relative.png)
