---
title: concat Function
keywords: query language reference
tags: [reference page]
permalink: ts_concat.html
summary: Reference to the concat string manipulation function
---
## Summary
```
concat(<metric|source|PointTag>, <string>, <expression>)
```
The concat() function lets you concatenate a specified string with a extracted from an expression. That means we add the specified string at the end of the extracted string.


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
<td markdown="span">string</td>
<td>The string that you want to concatenate with the extracted string.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example concatenates `newPointTagValue` with `_newStr`. The result is `newPointTagValue_newStr`.


![ts concat example](images/ts_concat.png)
