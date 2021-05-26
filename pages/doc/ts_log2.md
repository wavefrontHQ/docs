---
title: log2 Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_log2.html
summary: Reference to the log2() function
---
## Summary
```
log2(<tsExpression>)
```

Returns the logarithm base 2 of each data value described by the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression describing a constant or a time series of values to take the logarithm of. </td></tr>
</tbody>
</table>

## Description

The `log2()` function produces a  time series in which each data value is equal to the decimal logarithm (log base 10) of the value or values specified by the expression. The decimal logarithm is the power to which you need to raise 10 to obtain the value of the expression.

* If `tsExpression` describes a constant value _`N`_, then `log2()` returns a continuous series where every data value is <code>log<sub>10</sub> <em>N</em></code>.
* If `tsExpression` describes one or more time series, then `log2()` returns a new time series for each input time series.
Each value in a new time series is calculated as <code>log<sub>10</sub> <em>V</em></code>, where _`V`_ is the value of the corresponding point in the input time series.

By default, the chart legend displays a rounded version of the result. You can cause the legend to display the result with more precision by holding down the shift key when you hover over the time series.

## Examples

Here we see the result (in orange) of using `log2()` to take the decimal log of a time series (in purple).

![ts log2 ts](images/ts_log10_time_series.png)


## See also
* [log()](ts_log.html)
* [log10()](ts_log10.html)
