---
title: length Function
keywords: query language reference
tags: [reference page]
permalink: ts_length.html
summary: Reference to the length() string manipulation function
---
## Summary
```
length(metric|source|<pointTagKey>, <tsExpression>)
```
Returns the length of a metadata string from the specified time series.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td markdown="span">The metadata string (metric name, source name, or value of a point tag key) to get the length of.</td></tr><tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string that you want the length of.</td></tr>
</tbody>
</table>


## Example

The following example returns the length of the string `newPointTagValue` (16 characters). 

![ts length](images/ts_length.png)
