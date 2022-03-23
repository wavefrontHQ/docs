---
title: exists Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_exists.html
summary: Reference to the exists() function
---
## Summary
```
exists(<tsExpression>)
```
Returns 1 if any time series described by the expression exists, and returns 0 otherwise.
A time series exists if it has reported a data value in the last day (24 hours).
## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series to be tested for existence.</td></tr>
</tbody>
</table>


## Description

The `exists()` function returns 1 if any time series described by the expression exists, and returns 0 otherwise. A time series exists if it has at least one value that was reported within the last day (24 hours). The returned constant series is continuous.

You can use `exists()` to see if a metric is obsolete or has never reported.

`exists()` is useful if you're creating a query that uses a metric that is planned but has not yet started reporting, for example, when you're building a dashboard before any data is sent. Unless you wrap the query in `exists()`, all your charts will show errors for the missing metric. Using `exists` allows any syntax errors to be reported, which help you make corrections, but suppresses the errors for the missing metric.

{% include note.html content="If you are querying with a time window in the past, and if the series **did not** report for 24 hours before or during the window but the series **is** reporting at present, the `exists()` function returns true. We are working on addressing this issue." %}

## Examples

You can wrap `exists()` around an expression that returns some number of time series, like this:

```
exists(ts(inv_1_get_count, status="7**" and operation="*" and cname="${environment}"))
```

This query returns 1 if at least one time series has a value reported within the 1d (24 hours). Otherwise, the query returns 0 if the values of all of the time series are older than 1d (24 hours).
Because this query returns either 1 or 0, it is useful as a conditional expression in an `if()` function.

For clarity, we'll name this query `hasData` so we can easily refer to it in the example below.

This example tests `hasData` to see whether its underlying metrics are reporting data, and uses the result to choose between two other previously defined queries named `queryOfInterest` and `substituteQuery`:

```
if(${hasData}, ${queryOfInterest}, ${substituteQuery})
```

In this example:
* `hasData` evaluates to 1 (true) if its underlying metrics are reporting, so `if()` returns the results of `queryOfInterest`.
* `hasData` evaluates to 0 (false) if its underlying metrics are not reporting, so `if()` returns the results of `substituteQuery`.

## See Also

The [`missing()` function](ts_missing.html) lets you check whether a function returned data in a specified time window.
