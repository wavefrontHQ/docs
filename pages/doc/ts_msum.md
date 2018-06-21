---
title: msum Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_msum.html
summary: Reference to the msum() function
---

## Summary

```
msum(<timeWindow>, <expression>)
```
Returns the moving sum of each series over the time window.

## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">[timeWindow](query_language_reference.html#query-elements)</td>
<td markdown="span">A clock/calendar time measurement (1s, 1m, 1h, 1d, 1w), time relative to the window length (vw), or time relative to the bucket size (bw) of the chart. Default is minutes.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression can be a constant, a wildcard, or an expression.</td>
</tr>
</tbody>
</table>

## Description

Returns the moving sum of each series over the time window. For example: `msum(10m, ts(my.metric))` returns, at each point, the sum of all the points over the last 10 minutes for each series in the expression.

At times, using `msum` instead of `mavg` can get you the information you want. In that case, use `msum` because performance is better.

## Example

The following example shows the sample requests latency for one of the sources.

![msum before](images/ts_msum_before.png)

And here's the information you see when you apply the `msum()` function In particular, you get a clearer pictures of the times where latency was consistently a problem because the function works on the last 10 minutes.

![msum after](images/ts_msum_after.png)

You can get an even clearer picture of trends if you pick a bigger time window, as in the following example that sums all points over the last 1d, and shows that information in an 8d view window.

![msum 1d](images/ts_msum_1d.png)

## Caveats

Wavefront pre-aligns metrics for performance reasons when more than 100 time series are used in an aggregate function and displays a warning. In most cases, for instance, where a metric reflects a parameter changing over time, you can ignore the warning.

However, for certain use cases, pre-alignment can cause undesirable side effects. Suppose you have a `http.requests.count` metric that reports values once a minute and represents the total number of HTTP requests per minute. You are trying to calculate the number of HTTP requests over the 1-hour sliding window (i.e. `msum(1h, rawsum(ts(http.requests.count, source="web*"`)). Your data set is pre-aligned to a 2-minute (120s) time window.
If you are using the default summarization method (Average), then `align(120s, mean)` averages the values for every 2-minute window, effectively cutting the number of values that are available to `msum()` in half and dramatically changing the result of the calculation.

In this case, doing an explicit `align()` with the `sum` aggregation method or changing the summarization method used by `align()` to Sum avoids the side effect.
