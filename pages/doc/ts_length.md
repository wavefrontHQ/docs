---
title: length Function
keywords: query language reference
tags: [reference page]
permalink: ts_length.html
summary: Reference to the length() string manipulation function
---
## Summary
```
length(<metric|source|PointTag>, <expression>)
```
Returns the length of a string.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|PointTag</td>
<td>The metric, source, or point tag for which you need the string length.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example returns the length of the string `newPointTagValue` (16 characters). 

![ts length](images/ts_length.png)
