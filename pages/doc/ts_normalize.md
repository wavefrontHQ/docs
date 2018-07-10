---
title: normalize Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_normalize.html
summary: Reference to the normalize() function
---
## Summary
```
normalize(<expression>)
```
Returns every series in expression scaled, so that each series has a minimum of 0 and a maximum of 1.0.

## Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>Expression you want to normalize. </td>
</tr>
</tbody>
</table>

## Description

The `normalize()` function scales every time series so that it has a minimum value of 0 and maximum value of 1. Normalizing is useful if you want to see shape correlation between time series of very different scale. After normalizing, all the time series fit in the same vertical space.

## Examples

The following diagram shows the request latency for app-2 and app-20.

![normalize before](images/ts_normalize_before.png)

When you normalize the data, the metrics for both time series are mapped to values between 0 and 1.

![normalize](images/ts_normalize.png)
