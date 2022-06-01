---
title: mcorr Function
keywords: query language reference
tags: [reference page, videos]
sidebar: doc_sidebar
permalink: ts_mcorr.html
summary: Reference to the mcorr() function
---

## Summary

```
mcorr(<timeWindow>, <tsExpression1>, <tsExpression2> [,inner])
```
Returns the correlation between two time series, specified by `tsExpression1` and `tsExpression2`, over the specified time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td>Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression1](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the first set of time series to be correlated.   </td></tr><tr>
<td markdown="span"> [tsExpression2](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the second set of time series to be correlated.   </td></tr>
<tr>
<td markdown="span">inner</td>
<td markdown="span">If the number of unique series associated with either expression is dynamic, then you can force series matching by adding the optional **inner**  parameter.</td></tr>
</tbody>
</table>

## Description

The `mcorr()` function returns the moving correlation between pairs of time series specified by `expression1` and `expression2`.

When you run the query, `mcorr()` compares `expression1` to `expression2` during the specified time window, and displays the correlation between the two expressions as a value between -1 and 1.

* Values at or close to 1 are total positive correlations.
* 0 is no correlation.
* Values at or close to -1 are total negative correlations.

`mcorr()` applies [series matching](query_language_series_matching.html) between `tsExpression1` and `tsExpression2`.
* If the two expressions have 2 or more unique series associated with them, `mcorr()` evaluates only those unique series that appear in both expressions.
* If there are no overlapping unique series, `mcorr()` returns NO DATA.
* If `tsExpression1` or `tsExpression2` only have a single unique series associated with them, then `mcorr()` correlates that single unique series with every unique series in the other expression.
* If the number of unique series associated with either expression is dynamic, then you can force series matching by adding the optional `,inner`  parameter after `tsExpression2`.

## Examples

The following example shows the correlation between the total requests for app-19 and app-15 over a 10 minute time window.

![mcorr](images/ts_mcorr.png)

## See Also

[Using Moving and Tumbling Windows to Highlight Trends](query_language_windows_trends.html)

<!---
<p><a href="https://www.youtube.com/watch?v=bV9mGSAbD8s&feature=youtu.be"><img src="/images/v_correlation_functions.png" style="width: 700px;"/></a>
</p> --->
