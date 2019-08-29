---
title: indexOf and lastIndexOf Functions
keywords: query language reference
tags: [reference page]
permalink: ts_indexof.html
summary: Reference to the indexOf() and lastIndexOf() string manipulation functions
---
## Summary
```
indexOf(<metric|source|PointTag>, <string>, <expression>)
lastIndexOf(<metric|source|PointTag>, <string>, <expression>)
```
The indexOf() function compares a string extracted from an expression to a specified string and returns where the specified string starts in the extracted string.

The lastIndexOf() function compares a string extracted from an expression to a specified string starting at the end and returns where the specified string starts in the extracted string. See the Example below.

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
<td>The string that you want to check for.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example uses `lastIndexOf()` to look at the string `newPointTagValue`.
* We check the position of `Tag` from the back, which is 8 (`tTag` would be 7).
* We check the position of `newP` from the back, which is 0.

![ts lastIndexOf](images/ts_last_index_of.png)
