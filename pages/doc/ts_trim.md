---
title: trim, strip, stripLeading, and stripTrailing Functions
keywords: query language reference
tags: [reference page]
permalink: ts_trim.html
summary: Reference to the trim, strip, stripLeading, and stripTrailing string manipulation function
---
## Summary
```
trim(metric|source|<pointTagKey>, <tsExpression>)
strip(metric|source|<pointTagKey>, <tsExpression>)
stripLeading(metric|source|<pointTagKey>, <tsExpression>)
stripTrailing(metric|source|<pointTagKey>, <tsExpression>)
```

Functions for removing white space (blanks) from the specified metadata string.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to remove white space from.</td></tr><tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be trimmed or stripped.</td></tr>
</tbody>
</table>

## Description

We support several functions for handling white spaces (blank) in a metadata string of a time series.

* `isBlank()` returns true if a string contains only white spaces and returns false otherwise.
* `trim()` removes a single leading white space and a single trailing white space, but does not remove multiple leading or trailing white spaces.
* `strip()` removes both leading and trailing white spaces from a string.
* `stripLeading()` removes leading white spaces but leaves trailing white spaces.
* `stripTrailing()` removes trailing white spaces but leaves leading white spaces.

<!---Example doesn't show anything you'd have to use the function...--->
