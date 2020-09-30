---
title: firstEnding and lastEnding Functions
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_firstEnding.html
summary: Reference to the firstEnding() and lastEnding() functions
---
## Summary
```
firstEnding(<eventsExpression>)
lastEnding(<eventsExpression>)
```
The `firstEnding()` function returns the event that ends earliest, from among the specified set of events.

The `lastEnding()` function returns  the event that ends latest, from among the specified set of events.


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

The `firstEnding()` event function inspects the specified event set, and returns the single event that has the earliest end time.

The `lastEnding()` event function inspects the specified event set, and returns the single event that has the latest end time.

**Note:** If multiple events match the condition, the result is non-deterministic. Each of these functions always returns just one event, although a different event might be returned if you run the query again with the same event set.


## See Also

* [`first()` and `last()` functions](event_first.html)
