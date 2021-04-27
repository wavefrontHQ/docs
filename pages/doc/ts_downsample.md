---
title: downsample Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_downsample.html
published: false
summary: Reference to the downsample() function
---
<!---Removing this page from the doc. The align() function does the same thing with more options.--->

## Summary
```
downsample(<timeWindow>, <tsExpression>)
```
Returns the values in the expression that occur in each time window. For example, `downsample(30m, ts(my.metric)` returns the values of `my.metric` every half hour.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>timeWindow</td>
<td>The filter time window. The function filters the data so you see only the data for the specified time window.  </td>
</tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the time series to downsample. </td>
</tr>
</tbody>
</table>

## Description

The `downsample()` function allows you to filter any time series to return just the values occurring every `timeWindow`.

For example, to see the values for every half-hour of a given time series,  enter a query such as the following:

``
downsample(30, ts(“my.metric”))
``

## Example

The following example shows the latency for a specified source as a blue line. The dashed black line shows only one value every 30 minutes.

![downsample example](images/ts_downsample.png)


## See Also

[Series Matching](query_language_series_matching.html)
