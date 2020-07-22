---
title: cs Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: cs_function.html
summary: Reference to the cs() function
---
## Summary
```
ts(<deltaMetricName> [and|or [not] <deltaMetricName2>] ...
  [,|and|or [not] source="<sourceName>"] ...
  [and|or [not] tag="<sourceTag>"] ...
  [and|or [not] <pointTagKey>="<pointTagValue>"] ...)
```

Returns the time series that match the specified delta metric name, optionally filtered by sources and point tags.
* Use `cs()` to display delta counter metrics in a time series chart or to specify the series to other functions.
* Use `ts()` to display the time series in a time series chart, or to specify the series to other functions.



## Parameters

Parameters are exactly the same as [parameters for the ts() function](ts_function.html#parameters).

Instead of the `metricName` parameters, you specify `deltaMetricName` parameters. The delta character is required for the incoming metrics, but not in a query.


## Description

The `cs()` function returns one or more delta counter time series.
* A time series is a sequence of data points that each consists of a data value and a timestamp. Every time series is identified by a unique combination of metric name, source name, and point tag values.
* [Delta counters](delta_counters.html) bin to a minute timestamp and treat write operations to the same bin as deltas.

You can group and filter `cs()` time series, just like [ts() time series](ts_function.html), to limit the search space.

## Examples

In the query editor, `cs()` supports autocomplete, which makes it straighforward to find tracing metric. (The Metrics browser does not currently distinguish between metrics and delta counter metrics). The following example illustrates this.

![cs query with menu of autocomplete options](images/cs_autocomplete.png)


Many of the metrics in the Beachshirts sample application are delta counter metrics for improved efficiency. The following screenshot includes the query:

```
sum(cs(tracing.derived.*), application,service)
```
That means we sum all `tracing.derived` metrics, and group the result by application and service.

![line chart for cs query](images/cs_example.png)
