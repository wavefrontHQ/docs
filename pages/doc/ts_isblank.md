---
title: isBlank and isEmpty Functions
keywords: query language reference
tags: [reference page]
permalink: ts_isblank.html
summary: Reference to the isBlank() and isEmpty() string manipulation functions
---
## Summary
```
isBlank(<metric|source|PointTag>, <expression>)
isEmpty(<metric|source|PointTag>, <expression>)
```

The isBlank() function returns true if the value of the metric, source, or point tag string is a blank character (`" "`), and returns false otherwise.

The isEmpty() function returns true if the value of the metric, source, or point tag string is the empty string, and returns false otherwise.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|pointTag</td>
<td>The metric, source, or point tag for which you want to know whether it corresponds to an empty or blank string.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>


## Example

The following example illustrates how `isBlank()` works:

In the screenshot on the left, we've enabled the following queries:

`taggify(avg(rate(ts(dataingester.report-points, source=mon*))), service, "newPointTagValue")`

`isBlank(service, ${ts})`

Because the string "newPointTagValue" is not empty, the isBlank() query returns false.

In the screenshot on the right, we've enabled the following queries:

`taggify(avg(rate(ts(dataingester.report-points, source=mon*))), service, " ")`

`isBlank(service, ${ts_b})`


Because the string this query uses is the empty string (`" "`), this query returns true.


![ts isBlank](images/ts_isBlank.png)
