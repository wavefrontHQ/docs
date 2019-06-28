---
title: matches and contains Functions
keywords: query language reference
tags: [reference page]
permalink: ts_matches.html
summary: Reference to the matches() and contains() string manipulation functions
---
## Summary
```
matches(<metric|source|PointTag>, <string>, <expression>)
contains(<metric|source|PointTag>, <string>, <expression>)
```
The matches() function compares a string extracted from an expression to a specified string, and returns 1 if the two strings match and 0 otherwise.

The contains() function compares a string extracted from an expression to a specified string, and returns 1 if the extracted string contains the specified string, and returns 0 otherwise.

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
<td markdown="span">string</td>
<td>String for which you want to check matching or equality.</td></tr>
<tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example extracts the `service` point tag from an expression and replaces it with the string `newPointTagValue`. Then the example checks

* Whether the string that `taggify()` returns contains `newV` (false)
* Whether the string that `taggify()` returns contains `newP` (true)

![ts contains](images/ts_contains.png)
