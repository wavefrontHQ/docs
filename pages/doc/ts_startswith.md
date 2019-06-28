---
title: startsWith and endsWith Functions
keywords: query language reference
tags: [reference page]
permalink: ts_startswith.html
summary: Reference to the startsWith() and endsWith() string manipulation functions
---
## Summary
```
startsWith(<metric|source|PointTag>, <string>, <expression>)
endsWith(<metric|source|PointTag>, <string>, <expression>)
```
The startsWith() function lets you check whether a string extracted from an expression starts with a specified string.

The endsWith() function lets you check whether a string extracted from an expression starts with a specified string.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|PointTag</td>
<td>The metric, source, or point tag for which you want to check whether it contains a specified value.</td></tr>
<tr>
<td markdown="span"><string></td>
<td>The string you want to check for.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>

## Description

The startsWith() and endsWith() functions allow you to check whether a string starts with or ends with a specified string. For example, you could check whether a host name starts with `aws` or ends with `2020`.

## Example

In the example below, we're replacing the service point tag key with the string `newPointTagValue`. Then we check whether that string starts with `newV` (false) or with `newP` (true)

![ts starts with](images/ts_starts_with.png)
