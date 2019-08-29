---
title: isBlank and isEmpty Functions
keywords: query language reference
tags: [reference page]
permalink: ts_isblank.html
summary: Reference to the isBlank() and isEmpty() string manipulation functions
---
## Summary
```
isBlank(metric|source|<pointTagKey>, <expression>)
isEmpty(metric|source|<pointTagKey>, <expression>)
```

The `isBlank()` function returns true if the value of the metric, source, or point tag string is a blank character (`" "`), and returns false otherwise.

The `isEmpty()` function returns true if the value of the metric, source, or point tag string is the empty string, and returns false otherwise.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The part of the expression (metric name, source name, or value of a point tag key) to be tested.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#query-expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example illustrates how `isBlank()` works:

* In the screenshot on the left, we use `isBlank()` to see whether the string `"newPointTagValue"` is blank. The query returns false.

   `isBlank(service, ${ts})`

* In the screenshot on the right, we use `isBlank()` to see whether the string `" "` is blank.

   `isBlank(service, ${ts_b})`


Because the string this query uses is the empty string (`" "`), this query returns true.


![ts isBlank](images/ts_is_blank.png)
