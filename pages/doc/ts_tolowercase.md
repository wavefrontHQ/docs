---
title: toLowerCase and toUpperCase Functions
keywords: query language reference
tags: [reference page]
permalink: ts_tolowercase.html
summary: Reference to the toLowerCase() and toUpperCase() string manipulation functions
---
## Summary
```
toLowerCase(metric|source|<pointTagKey>, <tsExpression>)
toUpperCase(metric|source|<pointTagKey>, <tsExpression>)
```
The `toLowerCase()` function converts all upper case characters to lower case, in the specified metadata string.

The `toUpperCase()` function converts all lower case characters to upper case, in the specified metadata string.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to be converted to all lower case or all upper case.</td></tr><tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string that you want to convert.</td></tr>
</tbody>
</table>


## Example

The following example uses `toUpperCase()` to convert all lower-case characters in the value of the `service` point tag to upper case. Because that value is `dataingester`, we see `DATAINGESTER` in the hover text. 


![ts toLowerCase](images/ts_to_upper_case.png)
