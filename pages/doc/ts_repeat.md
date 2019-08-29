---
title: repeat Function
keywords: query language reference
tags: [reference page]
permalink: ts_repeat.html
summary: Reference to the repeat string manipulation function
---
## Summary
```
repeat(<metric|source|PointTag>, <integer>, <expression>)
```
Repeats a string extracted from an expression a specified number of times.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|PointTag</td>
<td>The metric, source, or point tag from the expression.</td></tr>
<tr>
<td markdown="span">integer</td>
<td>The integer that specifies how many times to repeat the expression. </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example extracts a string from an expression and replaces it with `newValue`. Then we use `repeat()` to repeat `newValue` 3 times (`newValuenewValuenewValue`) and twice (`newValuenewValue`).



![ts repeat example](images/ts_repeat.png)
