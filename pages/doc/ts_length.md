---
title: length Function
keywords: query language reference
tags: [reference page]
permalink: ts_length.html
summary: Reference to the length() string manipulation function
---
## Summary
```
length(<metric|source|tagk>, <expression>)
```
Returns the length of a string.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span"><metric|source|tagk></td>
<td>The metric, source, or point tag for which you need the string length.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example:
1. Uses `taggify()` for replacing the point tag `service` with the string `newPointTagValue`
2. Returns the length of the string (16 characters).

![ts length](images/ts_length.png)
