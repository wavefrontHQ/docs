---
title: orElse Operator
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
published: true
permalink: ts_orelse.html
summary: Reference to the orElse operator
---
## Summary

```
.orElse(<tsExpression>)
```

You can use the `.orElse()` operator to force a query to return a default value.


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

You can use the `.orElse()` operator to force the query to return a default value even if the time series is obsolete or nonexistent. You can enter a constant value, for example `orElse(5)`. You can also enter a timeseries for chained `.orElse` statements, for example `.orElse(ts('my.metric'))`.


## Examples

When a query returns some data, you can use a query of the type to return the same data:

```
ts(~sample.disk.bytes.read, source="app-1").orElse(1)
```

When a query returns some data and you want to return some other time series, use a query of the type:

```
if(ts(~sample.disk.bytes.read, source="app-1"), ts(~sample.mem.page.reads, source="app-1*")).orElse(1)
```

Considering you don't know whether the query returns data, and you want to return some other value in the gaps, use a query of the type:

```
default(0, ts(~sample.mem.page.reads, source="app-1*")).orElse(0)
```

The `default(0,<tsExpression>)` part of the query returns the values when the query has reported them. The `.orElse` portion takes care of the time series when the query returns NO DATA.

Considering the query returns no data, and you want to display a constant, use a query of the type:

```
ts(nonexistent).orElse(0)
```

If you want to display another series, use a query of the type:

```
ts(nonexistent).orElse(ts(~sample.disk.bytes.read, source=app-1))
```

You can chain multiple `.orElse` operators. For example:
```
ts(<metric_not_there>).orElse(ts(<metric_sometimes_there>)).orElse(25)
```
For this example:
* If `metric_not_there` has no value, the function returns the value of `(ts(<metric_sometimes_there>))`.
* If `(ts(<metric_sometimes_there>))` also has no value, the function returns 25.

## Caveats

{% include tip.html content="You cannot apply `orElse()` to a histogram. Even if you convert the histogram to a tsExpression, an error results if you then apply `orElse()`." %}

## See Also


The [`default()` function](ts_default.html) lets you fill in gaps in the time series described by `tsExpression`.
