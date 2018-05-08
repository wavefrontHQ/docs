---
title: mpercentile Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_mpercentile.html
summary: Reference to the mpercentile() function
---

## Summary

```
mpercentile(<timeWindow>, <percentileValue>, <expression>)
```

Return the specied percentile value for the expression over a moving time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>A window of time specified in seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). If the unit is not specified, the default is minutes. Example: 1h.</td></tr>
<tr>
<td>percentileValue</td>
<td>A number greater than 0 and less than or equal to 100. You can include as many decimal points as you like.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.   </td>
</tr>
</tbody>
</table>

## Description

The `mpercentile()` function computes the percentile value of each data stream over a moving time window. The percentile value must be between 0 and 100.
Unlike other Moving Time functions, the `mpercentile()` function also requires a `percentileValue`.

## Example

The following simple example shows 75th percentile value for disk space during the last 10 days. We're showing an 8 day time window in this chart.

![mpercentile simple](images/ts_mpercentile.png)

The following example uses the same query but with a focus on the app servers. This chart also shows an 8 day time window.

![mpercentile grouped](images/ts_mpercentile_app.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](https://docs.wavefront.com/query_language_windows_trends.html)
