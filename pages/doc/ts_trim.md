---
title: trim, strip, stripLeading, and stripTrailing Functions
keywords: query language reference
tags: [reference page]
permalink: ts_trim.html
summary: Reference to the length() string manipulation function
---
## Summary
```
trim(<metric|source|PointTag>, <expression>)
strip(<metric|source|PointTag>, <expression>)
stripLeading(<metric|source|PointTag>, <expression>)
stripTrailing(<metric|source|PointTag>, <expression>)
```

Functions for stripping white space (blank) from a string.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|PointTag</td>
<td>The metric, source, or point tag for which you need the string length.</td></tr><tr>
<td markdown="span"> [expression](query_language_reference.html#expressions)</td>
<td>The expression that contains the metric, source, or point tag.</td></tr>
</tbody>
</table>

## Description

We support several functions for handling white spaces (blank).

* isBlank() returns true if a string contains only white spaces and returns false otherwise.
* trim() removes a single leading white space and a single trailing white space, but does not remove multiple leading or trailing white spaces.
* strip() removes both leading and trailing white spaces from a string.
* stripLeading() removes leading white spaces but leaves trailing white spaces.
* stripTrailing() removes trailing white spaces but leaves leading white spaces.

<!---Example doesn't show anything you'd have to use the function...--->
