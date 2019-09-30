---
title: ongoing Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_ongoing.html
summary: Reference to the ongoing() function
---
## Summary
```
ongoing(<eventsExpression>)
```
Returns a continuous time series that represents the number of ongoing events at any given moment in the chart's time window.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [eventExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the events to be considered.</td>
</tr>
</tbody>
</table>

## Description

The `ongoing()` events conversion function returns a time series that represents the number of ongoing events at each moment in time in the chart's time window. 

An event is counted as ongoing at a given moment in time if it is in an [Ongoing state](events.html#event-states):
* The event has no end time defined for it.
* The event has a defined end time, but has not yet reached it. 

The returned time series is continuous, which means a count of currently active events is reported every second.
