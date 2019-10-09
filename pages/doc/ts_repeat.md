---
title: repeat Function
keywords: query language reference
tags: [reference page]
permalink: ts_repeat.html
summary: Reference to the repeat string manipulation function
---
## Summary
```
repeat(metric|source|<pointTagKey>, <integer>, <tsExpression>)
```
Repeats the specified metadata string a specified number of times.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to be repeated.</td></tr>
<tr>
<td markdown="span">integer</td>
<td>The integer that specifies how many times to repeat the metadata string. </td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be repeated.</td></tr>
</tbody>
</table>


## Example

The following example creates a synthetic `service` tag and assigns it the value `newValue`. Then we use `repeat()` to repeat `newValue` 3 times (`newValuenewValuenewValue`) and twice (`newValuenewValue`).



![ts repeat example](images/ts_repeat.png)
