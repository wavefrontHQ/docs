---
title: indexOf and lastIndexOf Functions
keywords: query language reference
tags: [reference page]
permalink: ts_indexof.html
summary: Reference to the indexOf() and lastIndexOf() string manipulation functions
---
## Summary
```
indexOf(metric|source|<pointTagKey>, <subString>, <tsExpression>)
lastIndexOf(metric|source|<pointTagKey>, <subString>, <tsExpression>)
```
The `indexOf()` function finds the first occurrence of the specified substring in the metadata string, and returns the starting position of that occurrence.

The `lastIndexOf()` function finds the last occurrence of the specified substring in the specified metadata string, and returns the starting position of that occurrence. 

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to find the substring in.</td></tr>
<tr>
<td markdown="span">substring</td>
<td>The substring that you want to check for.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to find the substring in.</td></tr>
</tbody>
</table>

## Description

The `indexOf()` and `lastIndexOf()` function return a numeric index that indicates the starting position of a given substring in the specified metadata string: 
* `indexOf()` returns the index for the first occurrence of the substring. 
* `lastIndexOf()` returns the index for the last occurrence of the substring.


The returned indexes are displayed as metadata values in the chart legend or in a table column. 

Numeric indexes are counted from left to right, starting with 0. 

These functions return -1 if no occurrence of the specified substring are found.

## Example

The following example uses `taggify()` to add a `service=` point tag to the time series, and sets the point tag value to `data-engine-data points`.
* We use `indexOf()` to find the position (0) of the first occurrence of `data` in the point tag value.
* We use `lastIndexOf()` to find the position (12) of last occurrence of `data` in the point tag value.

![ts indexOf-lastIndexOf](images/ts_indexOf_lastIndexOf.png)

<!---
The following example uses `lastIndexOf()` to look at the string `newPointTagValue`.
* We check the position of `Tag` from the back, which is 8 (`tTag` would be 7).
* We check the position of `newP` from the back, which is 0.

![ts lastIndexOf](images/ts_last_index_of.png)
--->
