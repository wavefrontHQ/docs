---
title: equals and equalsIgnoreCase Functions
keywords: query language reference
tags: [reference page]
permalink: ts_equals.html
summary: Reference to the equals() and equalsIgnoreCase() string manipulation functions
---
## Summary
```
equals(<metric|source|PointTag>, <string>, <expression>)
equalsIgnoreCase(<metric|source|PointTag>, <string>, <expression>)
```
The equals() function compares a string extracted from an expression to a specified string.

The equalsIgnoreCase() function compares a string extracted from an expression to a specified string and ignores case. With this function `string` is equal to `StRiNg`

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|PointTag</td>
<td>The metric, source, or point tag that you want to compare to a string.</td></tr>
<tr>
<td markdown="span"><string></td>
<td>The string that you want to check equality for.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example checks whether the string `newPointTagValue` is equal to the string `newPointTagValue` (true) or to the string `dataingester` (false).

![ts equals](images/ts_equals.png)
