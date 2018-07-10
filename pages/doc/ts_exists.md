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
exists(<expression>)
```
Returns 1 if at least one value has been reported for the expression in the last 4 weeks. Returns 0 otherwise.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>A ts() expression.</td></tr>
</tbody>
</table>


## Description

Returns 1 if at least one value in the expression has been reported in the last 4 weeks. Returns 0 otherwise.

This function outputs continuous time series.

You can use `exists()` to see if a metric is obsolete or has never reported.

In addition, `exists()` is useful if you're creating a query that uses a metric that you will send in soon, for example, when you're building a dashboard before you're  sending the data. Unless you wrap the queries in `exists()`, all your charts will show errors. If you use `exists`, you get the syntax errors, which help you make corrections, but not the errors for the missing metric.

## Examples

You can wrap `exists()` around a query, like this:

`hasData:  exists(ts(inv_1_get_count, status="7**" and operation="*" and cname="${environment}"))`

If that time series returns data, the result of the query is `1`. You can use `if()` to return a constant, or to plug in a different query as in the following two examples. Both examples use the `exists()` query above which is named `hasData`.

**Note**: Be sure to name your queries to keep things clear.

### Example 1

`if(${hasData}, ts(inv_1_get_count, status="7**" and operation="*" and cname="${environment}"), 1)`

For this query:
* If `${hasData}` returns `1`, indicating it has data, then use the underlying query.
* If not, plug in the constant 1 or another value that makes sense for the use case.
*
### Example 2

`if(${hasData}, ${HDquery}, ${substituteQuery})`

This example illustrates that:
* You can use a query for the then clause of the `if` statement.
* You can also use a third query for the `else` clause. For example, the substitute query could use `lag(48,...)` to go back two days.
