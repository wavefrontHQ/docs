---
title: missing Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_missing.html
summary: Reference to the missing() function
---
## Summary
```
missing(<timeWindow>, <tsExpression>)
```
Checks whether there are any data points in the specified time window.
* If there are no data points, returns 1.
* Otherwise, returns 0.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#common-parameters)</td>
<td markdown="span">Amount of time in the moving time window. You can specify a time measurement based on the clock or calendar (1s, 1m, 1h, 1d, 1w), the window length (1vw) of the chart, or the bucket size (1bw) of the chart. Default is minutes if the unit is not specified.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series to be tested.</td></tr>
</tbody>
</table>


## Description

Checks whether a time series returned data in a specified time window. For example `missing(5m, ts(my_metric))` returns 1 if `my_metric` returned no data in the last 5 minutes.

Using `mcount(<window>, <exp>) = 0` in a query gives you similar results, however, such a query does not work if the expression doesn't exist at all. In contrast, `missing()` works with non-existing metrics.

<!---
## Examples


### Example 1

This example tests `hasData` to see whether its underlying metrics are reporting data, and if so, returns that data:

```
if(${hasData}, ts(inv_1_get_count, status="7**" and operation="*" and cname="${environment}"), 100)
```

In this example,
* `hasData` evaluates to 1 (true) if its underlying metrics are reporting, so `if()` returns that time series.
* `hasData` evaluates to 0 (false) if its underlying metrics are not reporting, so `if()` returns the constant 100.


### Example 2

This example tests `hasData` to see whether its underlying metrics are reporting data, and uses the result to choose between two other previously defined queries named `queryOfInterest` and `substituteQuery`:

```
if(${hasData}, ${queryOfInterest}, ${substituteQuery})
```

In this example:
* `hasData` evaluates to 1 (true) if its underlying metrics are reporting, so `if()` returns the results of `queryOfInterest`.
* `hasData` evaluates to 0 (false) if its underlying metrics are not reporting, so `if()` returns the results of `substituteQuery`.--->

## See Also

The [exists() function](ts_exists.html) returns 1 if any time series described by the expression exists, and returns 0 otherwise. That function doesn't use a time window.
