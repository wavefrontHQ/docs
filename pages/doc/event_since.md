---
title: since Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_since.html
summary: Reference to the since() function
---
## Summary
```
since(<eventsExpression>)

since(<timeWindow>)
```

You can use `since()` with an event set or with a time window.

<table style="width: 100%;">
<colgroup>
<col width="25%" />
<col width="75%" />
</colgroup>
<tbody>
<tr>
<td markdown="span">Event set transformation function</td>
<td markdown="span">Returns a set of synthetic ongoing events that start at the same time as the events described by `eventsExpression`, but have no end time.</td></tr>
<tr>
<td markdown="span">Event creation<br>function</td>
<td markdown="span">Creates a single synthetic event that started `timeWindow` ago and ended "now".</td>
</tr>
</tbody>
</table>



## Parameters

### Event Set Transformation Function

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [eventExpression](query_language_reference.html#query-expressions)</td>
<td>Set of events that determine the start times of the returned synthetic events.</td>
</tr>
</tbody>
</table>

### Event Creation Function

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [timeWindow](query_language_reference.html#common-parameters)</td>
<td>Length of the new event. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td>
</tr>
</tbody>
</table>

## Description

You can use the `since()` event function:
* With an `eventsExpression` to return a set of synthetic events.
* With a `timeWindow` to return a single synthetic event.

**Note:** Synthetic events are displayed by the query, but not stored in Wavefront.

### Event Set Transformation Function

The `since()` event set transformation function returns a set of synthetic ongoing events, where each synthetic event:
* Starts at the same time as a corresponding event described by the expression.
* Continues indefinitely.

In effect, `since()` transforms all input events to ongoing events.

The following diagram represents an `events()` query that returns 3 events (A, B, and C). Using that `events()` query as the input to `since()` produces 3 synthetic events that each start at the same time as the corresponding input event:

![Events since](images/since_events.png)

### Event Creation Function

The `since()` event creation function creates a single synthetic event that started a specified time earlier and continues to “now”. In a live data chart, the start time moves forward in time so that the event always ends at the current time.

The following screen shot shows a single synthetic event that started 15 minutes before "now", and continues up to the current time:

![Event since timewindow](images/event_since_timewindow.png)
