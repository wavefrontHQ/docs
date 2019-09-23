---
title: length Function
keywords: query language reference
tags: [reference page]
permalink: ts_length.html
summary: Reference to the length() string manipulation function
---
## Summary
```
length(metric|source|<pointTagKey>, <expression>)
```
Returns the length of a string.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The part of the expression (metric name, source name, or value of a point tag key) for which you need the string length.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example returns the length of the string `newPointTagValue` (16 characters). 

![ts length](images/ts_length.png)
