---
title: charAt Function
keywords: query language reference
tags: [reference page]
permalink: ts_charat.html
summary: Reference to the charAt string manipulation function
---
## Summary
```
charAt(metric|source|<pointTagKey>, <integer>, <expression>)
```
The `charAt()` function retrieves the character at the position specified by an integer from a string extracted from an expression.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The part of the expression (metric name, source name, or value of a point tag key) from which you want to extract a character.</td></tr>
<tr>
<td markdown="span">integer</td>
<td>The location of the character that you want to extract.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>

## Example

In the example below, we use `charAt()` to extract:
* The character at position 4 in `newPointTagValue` (o)
* The character at position 8 in `newPointTagValue` (T).

The returned characters are case sensitive.


![ts charAt](images/ts_char_at.png)
