---
title: charAt Function
keywords: query language reference
tags: [reference page]
permalink: ts_charat.html
summary: Reference to the charAt string manipulation function
---
## Summary
```
charAt(metric|source|<pointTagKey>, <integer>, <tsExpression>)
```

Returns the character at the specified position in the specified metadata string.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to extract a character from.</td></tr>
<tr>
<td markdown="span">integer</td>
<td>The position of the character that you want to extract. Positions are counted from left to right, starting with 0. </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to extract a character from.</td></tr>
</tbody>
</table>

## Example

In the example below, we use `charAt()` to extract:
* The character at position 4 in `newPointTagValue` (o)
* The character at position 8 in `newPointTagValue` (T).

The returned characters are case sensitive.


![ts charAt](images/ts_char_at.png)
