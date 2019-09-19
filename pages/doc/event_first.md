---
title: first and last Functions
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_first.html
summary: Reference to the first() and last() functions
---
## Summary
```
first(<eventsExpression>)
last(<eventsExpression>)
```
The `first()` function returns the event that starts earliest, from among the specified set of events.

The `last()` function returns  the event that starts latest, from among the specified set of events.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [eventExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the events from which to select the event to be returned.</td>
</tr>
</tbody>
</table>

## Description

The `first()` event function inspects the specified event set, and returns the single event that has the earliest start time.

The `last()` event function inspects the specified event set, and returns the single event that has the latest start time.

**Note:** If multiple events match the condition, the result is non-deterministic. Each of these functions always returns just one event, although a different event might be returned if you run the query again with the same event set.

## See Also

* [`firstEnding()` and `lastEnding()` functions](event_firstEnding.html)
