---
title: sqrt Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_sqrt.html
summary: Reference to the sqrt() function
---
## Summary
```
sqrt(<expression>)
```

Returns the square root of each data value described by the expression.


## Parameters

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>Expression describing the values to find the square root of. </td></tr>
</tbody>
</table>

## Description

The `sqrt()` function produces data points by taking the square root of the data points returned by the input expression.
* If `expression` is a constant, then `sqrt()` returns the square root of that constant.  
* If `expression` describes one or more time series, then `sqrt()` returns a new time series for each input time series. 
Each value in a new time series is obtained by taking the square root of the value of the corresponding point in the input time series. 


## Examples

In this example, your chart shows the values in the metric `~sample.process.num` for a single source. 

![ts sqrt before](images/ts_sqrt_before.png)

And here we see the result of applying the `sqrt` function to the expression.

![ts sqrt after](images/ts_sqrt_after.png)



Here we see what happens when the input expression returns data points for 2 sources, app-14 and db-8. Notice that `sqrt` returns two time series, one for each series returned by the expression. 

![ts sqrt multiple sources](images/ts_sqrt_multiple.png)
