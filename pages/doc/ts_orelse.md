---
title: orElse Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
published: false
permalink: ts_orelse.html
summary: Reference to the orElse function
---
## Summary

```
.orElse(<tsExpression>)
```

You can use the `.orElse()` operator to force the query to return a default value.



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

You can use the `.orElse()` operator to force the query to return a default value even if the time series did not report any data in the specified time window. You can enter a constant value wrapped in brackets, such as `orElse(5)`. You can also enter a timeseries for chained `.orElse` statements, for example `.orElse(ts('my.metric'))`. 


## Examples

When a query returns data, you can use the following query to return the same data:

```
ts(~sample.disk.bytes.read, source="app-1").orElse(1)
```

When a query returns data and you want to return some other time series, use the following query:

```
if(ts(~sample.disk.bytes.read, source="app-1"), ts(~sample.mem.page.reads, source="app-1*")).orElse(1)
```

Considering you don't know query {hasData} returns data and you want to return some other value in the gaps use

```
default(0, ts(~sample.mem.page.reads, source="app-1*")).orElse(0)
```

The default portion takes care of when {hasData} returns values and the orElse portion takes care of when {hasData} returns NO DATA.

Considering a query {hasData} returns no data, and you want to display a constant

```
ts(nonexistent).orElse(0)
```

and if you want to display another series, use

```
ts(nonexistent).orElse(ts(~sample.disk.bytes.read, source=app-1))

```

## See Also


The [`default()` function](ts_default.html) lets you fill in gaps in the time series described by `tsExpression`.
