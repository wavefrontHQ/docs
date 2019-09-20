---
title: matches and contains Functions
keywords: query language reference
tags: [reference page]
permalink: ts_matches.html
summary: Reference to the matches() and contains() string manipulation functions
---
## Summary
```
matches(metric|source|<pointTagKey>, <string>, <expression>)
contains(metric|source|<pointTagKey>, <string>, <expression>)
```
The matches() function compares a string extracted from an expression to a specified string, and returns true if the two strings match and false otherwise.

The contains() function compares a string extracted from an expression to a specified string, and returns true if the extracted string contains the specified string, and returns false otherwise.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The part of the expression (metric name, source name, or value of a point tag key) that you want to compare to a string.</td></tr>
<tr>
<td markdown="span">string</td>
<td>String for which you want to check matching or equality.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example checks

* Whether `newPointTagValue` contains `newV` (false)
* Whether `newPointTagValue` contains `newP` (true)

![ts contains](images/ts_contains.png)
