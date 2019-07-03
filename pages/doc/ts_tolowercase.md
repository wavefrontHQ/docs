---
title: toLowerCase and toUpperCase Functions
keywords: query language reference
tags: [reference page]
permalink: ts_tolowercase.html
summary: Reference to the toLowerCase() and toUpperCase() string manipulation functions
---
## Summary
```
toLowerCase(<metric|source|PointTag>, <expression>)
toUpperCase(<metric|source|PointTag>, <expression>)
```
The toLowerCase() function converts all upper case function in the string extracted from the expression to lower case.

The toUpperCase() function converts all lower case function in the string extracted from the expression to upper case.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span"><metric|source|PointTag></td>
<td>The metric, source, or point tag that you want to convert to all lower case or all upper case.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example uses `toUpperCase()` to convert all lower-case characters in `newPointTagValue` to upper case, resulting in `NEWPOINTTAGVALUE` as shown in the screen shot below.


![ts toLowerCase](images/ts_to_upper_case.png)
