---
title: substring Function
keywords: query language reference
tags: [reference page]
permalink: ts_substring.html
summary: Reference to the substring string manipulation function
---
## Summary
```
substring(<metric|source|PointTag>, <integer>, <expression>)
substring(<metric|source|PointTag>, <integer1>, <integer2>, <expression>)
```
The substring() function has two options:
* Extract a substring that starts at a position specified by an integer from a string extracted from an expression.
* Extract a substring that starts at the position specified by integer1 and that ends at the position specified by integer2 from a string extracted from an expression.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td>metric|source|PointTag</td>
<td>The metric, source, or point tag from the expression.</td></tr>
<tr>
<td>integer</td>
<td>The integer that specifies the position to start extracting a substring. </td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example uses two integers to specify where to start and end extracting a substring from a string extracted from an expression.

The example
* Extracts the string `Point` from `newPointTagValue` by specifying 3, 8
* Extracts the string `Tag` from `newPointTagValue` by specifying 8, 11


![ts substring example](images/ts_substring.png)
