---
title: until Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_until.html
summary: Reference to the until() function
---
## Summary
```
until(<eventsExpression>)
```
Returns synthetic events that start at the beginning of epoch time (Jan 1, 1970) and end where the input events start.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [eventExpression](query_language_reference.html#query-expressions)</td>
<td>Set of events that determine the ends of the returned synthetic events.</td>
</tr>
</tbody>
</table>

## Description

The `until()` event function returns a set of synthetic events, where each synthetic event:
* Starts at the beginning of epoch time (Jan 1, 1970)
* Ends at the start time of a corresponding event described by the expression.


The following diagram represents an `events()` query that returns 3 events (A, B, and C). Using that `events()` query as the input to `until()` produces 3 synthetic events that each end when the corresponding input event begins:

  ![Events until](images/until_events.png)

**Note:** Synthetic events are displayed by the query, but are not stored.
