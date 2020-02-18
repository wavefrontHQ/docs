---
title: indexOf and lastIndexOf Functions
keywords: query language reference
tags: [reference page]
permalink: ts_indexof.html
summary: Reference to the indexOf() and lastIndexOf() string manipulation functions
---
## Summary
```
indexOf(metric|source|<pointTagKey>, "<subString>", <tsExpression>)

lastIndexOf(metric|source|<pointTagKey>, "<subString>", <tsExpression>)
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

The following example uses string functions to get information about the value of the `service` point tag, which is `dataingester`.
* We check where the string `"ta"` occurs in `dataingester` and get 2 (the index starts at 0).
* We check for the last occurrence of `"e"` in `dataingester` and get 10, as shown in the hover text.

![ts indexOf-lastIndexOf](images/ts_indexOf_lastIndexOf.png)
