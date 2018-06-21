---
title: mdiff Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mdiff.html
summary: Reference to the mdiff() function
---

## Summary

```
mdiff(<timeWindow>, <expression>)
```
Returns the difference between the expression's value and the expression's value `timeWindow` ago.

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

The `mdiff()` (moving diff) function returns the difference between the expression's current value and the expression's value `timeWindow` ago.

For example: `expression` minus `expression's value 5 minutes ago`.

This function does not interpolate the points before doing the subtraction.

We created the `mdiff()` function to return a moving sum of rates. Users found it difficult to understand what a moving sum of rates is.
 

## Examples

In the following image, the value at 5pm is 462 and the value 15 minutes before that was 258, resulting in a difference of 204

![ts mdiff](images/ts_mdiff.png)

## See Also

See [Using Moving and Tumbing Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html) for background information. 
