---
title: if Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_if.html
summary: Reference to the if() function
---
## Summary
```
if(<conditionalExpression>, <thenExpression>, [<elseExpression>])
```
Returns the points from `thenExpression` while `conditionalExpression` returns values >0.
Otherwise, returns points from `elseExpression`.

## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span"> [conditionalExpression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series to be used as the condition for filtering points from the series described by the other parameters.  </td></tr>
<tr><td markdown="span"> [thenExpression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series . </td></tr>
<tr><td markdown="span"> [elseExpression](query_language_reference.html#expressions)</td>
<td>Expression describing the time series . </td></tr>
</tbody>
</table>


## Description

The `if()` conditional function returns the ceiling for each data value in the time series described by the expression. 


## Examples

Here's a query that returns a time series that reports positive fractional values between .2 and 1.2. 
![if before](images/ts_if_before.png)

Now we apply `if()` to our original query. Notice that the values below 1 are mapped to 1, and the values from 1 to 1.2 are mapped to 2.
  
![if after](images/ts_if_after.png)
