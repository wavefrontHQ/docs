---
title: random Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_random.html
summary: Reference to the random() function
---
## Summary
```
random(<numberOfTimeSeries>, <tsExpression>)

random()
```
You can use `random()` with time series and with no parameters.

<table style="width: 100%;">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<tr>
<td markdown="span"> Time series filtering <br>function</td>
<td markdown="span">Returns the specified number of time series chosen randomly from the series described by `tsExpression`.</td></tr>
<tr>
<td markdown="span">Value generator <br>function</td>
<td markdown="span">Returns a series of random values between 0.0 and 1.0.</td>
</tr>
</tbody>
</table>


## Parameters
### Time-Series Filtering Function
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>numberOfTimeSeries</td>
<td>Number of time series in the random subset. You can express this parameter as a number (e.g. 10) or a percentage (e.g. 17%). </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression that describes the time series you want to filter.</td>
</tr>
</tbody>
</table>

## Description

You can use `random()`:
* With time series as a filtering function.
* With no parameters as a value generator function.

### Time-Series Filtering Function

The `random()` filtering function returns the specified number of time series chosen randomly from the time series described by the `tsExpression`. Repeated calls display different random subsets.

### Value Generator

The `random()` value generator returns a random value between 0.0 and 1.0 for every point in time on a chart. Repeated calls display different random values at each point.


## Example

### Time-Series Filtering Function

The following example shows first the result of a query that returns a fairly large number of time series.

![metric for sample function](images/ts_sample_before.png)

The following example chart shows how we use `random()` to pick 3 of the time series. Notice how the sources that were selected are not related.

![random](images/ts_random.png)
