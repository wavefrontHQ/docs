---
title: after Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_after.html
summary: Reference to the after() function
---
## Summary
```
after(<eventsExpression>)
```
Returns synthetic ongoing events that start when the input events end.

## Parameters
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

## Description

The `after()` event function returns a set of synthetic ongoing events, where each synthetic event:
* Starts at the end time of a corresponding event described by the expression. 
* Continues indefinitely.


The following diagram represents an `events()` query that returns 3 events (A, B, and C). Using that `events()` query as the input to `after()` produces 3 synthetic events that each start when the corresponding input event ends:

![Events after](images/after_events.svg)

**Note:** Synthetic events are displayed by the query, but not stored in Wavefront.
