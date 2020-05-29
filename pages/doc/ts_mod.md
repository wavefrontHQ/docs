---
title: mod Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mod.html
summary: Reference to the mod() function
---
## Summary
```
mod(<base-tsExpression>, <div-tsExpression>[, inner])
```

Modulo arithmetic function.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [base-tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing a constant or a time series to divide by the second expression. </td></tr>
<tr>
<td markdown="span"> [div-tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression to use as the divisor. </td></tr>
<tr>
<td>inner</td>
<td>Results in an inner join.</td></tr>
</tbody>
</table>

## Description

The `mod()` returns the remainder after dividing one number by another. For example, `mod(10, 3)` returns 1 and `mod(4, 2)` returns 0.

Either or both parameters may describe a time series or a constant value, and either may be fractional or negative.


<!---
## Examples
--->
