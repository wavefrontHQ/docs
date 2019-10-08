---
title: equals and equalsIgnoreCase Functions
keywords: query language reference
tags: [reference page]
permalink: ts_equals.html
summary: Reference to the equals() and equalsIgnoreCase() string manipulation functions
---
## Summary
```
equals(metric|source|<pointTagKey>, <string>, <tsExpression>)
equalsIgnoreCase(metric|source|<pointTagKey>, <string>, <tsExpression>)
```
The `equals()` function compares the specified metadata string to another string.

The `equalsIgnoreCase()` function compares the specified metadata string to another string, and ignores case. With this function, `string` is equal to `StRiNg`.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to compare to a string.</td></tr>
<tr>
<td markdown="span">string</td>
<td>The string that you want to check equality for.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be compared.</td></tr>
</tbody>
</table>


## Example

The following example checks whether the string `newPointTagValue` is equal to the string `newPointTagValue` (true) or to the string `dataingester` (false).

![ts equals](images/ts_equals.png)
