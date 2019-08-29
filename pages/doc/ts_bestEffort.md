---
title: bestEffort Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_bestEffort.html
summary: Reference to the bestEffort() function
---
## Summary
```
bestEffort(<expression>)
```
Allows you to tell the Wavefront service to use conservative targets for scheduling workloads for a query.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>A query expression. </td></tr>
</tbody>
</table>


## Description

Wrapping any query expression in `bestEffort()` tells Wavefront to use conservative targets for scheduling workloads. That means we limit thread use and asynchronous operations.

This function is associated with the Batch Query Priority permission. When an account with that permission runs queries, then Wavefront treats each of those queries that is run by that account as if it is wrapped in `bestEffort()`.

For example, use the new permission if you’ve specified a reporter account that performs Wavefront reporting queries. By giving the reporter account the Batch Query Priority permission, you can ensure that the lower priority reporting queries don’t interfere with higher priority queries such as alerts or interactive user queries.
