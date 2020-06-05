---
title: linearforecast Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_linearforecast.html
summary: Reference to the linearforecast function
---

## Summary
```
linearforecast(<forecastOffset>, <historyLength>, <tsExpression>)
```
Predicts the value of the time series using simple linear regression.


<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>forecastOffset</td>
<td>Specifies how far into the future you want to forecast.
</td>
</tr>
<tr>
<td>historyLength</td>
<td>Specifies how far back the algorithm should to for data to use in the prediction. </td>
</tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Optional expression to which you want to apply this function. </td>
</tr>
</tbody>
</table>

## Description

Predicts the value for `tsExpression` using simple linear regression. The query goes `forecastOffset`  into the future and uses `historyLength` to specify how far back the prediction algorithm should go to do the forecast. 

This function can be useful for resource limit alerts, where fixed thresholds or percentage thresholds tend to have false positives and false negatives depending on the size of the resource you are working with.  Here `linearforecast()` works better for all sizes.

## Example

The following screenshot shows the forecast for a simple metric. The screenshot was taken at 10:15 a.m., and we moved out the time to see the predictive data.

![forecast function](images/ts_forecast.png)

## See Also

* Use [hw()](ts_hw.html) to perform prediction and smoothing on seasonal or non-seasonal data.
