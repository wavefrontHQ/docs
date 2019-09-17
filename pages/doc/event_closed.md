---
title: closed Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: event_closed.html
summary: Reference to the closed() function
---
## Summary
```
closed(<eventsExpression>)
```
Filters the set of events described by the expression, and returns just the events that have ended.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [eventExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the events to be filtered.</td>
</tr>
</tbody>
</table>

## Description

The `closed()` event function filters the specified event set, and returns only events that have ended and instantaneous events that occurred in the past. No ongoing or future events are included in the result set.
