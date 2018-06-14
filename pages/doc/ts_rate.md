---
title: rate Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_rate.html
summary: Reference to the rate() function
---
## Summary
```
rate(<expression>)
```
Returns the per-second change of `expression`. Automatically handles zero-resets in counters. Use `rate()` on monotonic counter metrics (metrics that have values that only increase).

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression to create the rate for. </td></tr>
</tbody>
</table>

## Description

Returns the per-second change of `<expression>`. The `rate` function takes any series and converts it into a rate (1/sec, or Hz). Use this function primarily for counter metrics. Counter metrics increase over time and never decrease (unless the counter resets to zero).

For example, consider a metric that counts the total number of logins for an application. If you're not interested in the total number but you want to see the total logins per second, you can use the `rate()` function.

## Example

Because our set of sample metrics does not include one that increases over time, we're using a random number to show how `rate()` works.

Here's the initial query:
![rate before](images/ts_rate_before.png)

And here's the result of the query after we've wrapped `rate()` around it:
![rate after](images/ts_rate_after.png)
