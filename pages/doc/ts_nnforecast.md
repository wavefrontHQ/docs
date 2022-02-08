---
title: nnforecast Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_nnforecast.html
summary: Reference to the nnforecast() function
---
## Summary
```
nnforecast(<forecastPeriod>, [<confidenceFactor>,] <tsExpression>, [with_bounds])
```
Forecasts future data values for each time series described by the expression.
It uses hypothesis testing and neural networks for prediction.

{% include note.html content="You can specify up to 100 time series in an `nnforecast` query. If you specify more, an error results." %}

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span">forecastPeriod</td>
<td markdown="span">Period of time for the forecast.
</td></tr>
<tr><td markdown="span">confidenceFactor</td>
<td markdown="span"> A number from 0.0 to 1.00 (inclusive) that expresses the _confidence factor_ for determining the range of expected values. Default is 0.67. The **Note**. We consider this parameter _only_ if the **with_bounds** parameter is also specified.
</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series to forecast. </td></tr>
<tr><td markdown="span">with_bounds</td>
<td markdown="span">Enables confidence bounds. Disabled by default.
</td></tr>
</tbody>
</table>

## Description

The `nnforecast()` function predicts future data values for each time series described by the expression. The function uses hypothesis testing and neural networks for prediction.

The historical period has to be at least 2x the forecast period. If the function cannot find enough historical data to produce a forecast for the requested period, then the function returns no result.

## Examples

`nnforecast(7d, ts(my.metric))`

Simple forecasting of 7 days without confidence bounds.

`nnforecast(30d, 0.9, ts(my.metric), with_bounds)`

Forecasting of 30 days with confidence bounds enabled and with a confidence factor of 0.9.
