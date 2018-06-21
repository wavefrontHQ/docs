---
title: flapping Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_flapping.html
summary: Reference to the flapping() function
---

## Summary

```
flapping(<timeWindow>, <expression>)
```
Returns the number of times a counter has reset within the time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td >A clock/calendar time measurement (1s, 1m, 1h, 1d, 1w), time relative to the window length (vw), or time relative to the bucket size (bw) of the chart. Default is minutes if no unit is specified.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.  </td></tr>
</tbody>
</table>

## Description

You can use the `flapping()` function with counter metrics to determine how often a counter reset has occurred over a moving time window. You can see whether a service is flapping, that is, whether there are great fluctuations.

## Examples

The following image shows the fluctuations in the total number of requests for two different sources.

![flapping](images/ts_flapping.png)
