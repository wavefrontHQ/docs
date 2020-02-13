---
title: isBlank and isEmpty Functions
keywords: query language reference
tags: [reference page]
permalink: ts_isblank.html
summary: Reference to the isBlank() and isEmpty() string manipulation functions
---
## Summary
```
isBlank(metric|source|<pointTagKey>, <tsExpression>)

isEmpty(metric|source|<pointTagKey>, <tsExpression>)
```

The `isBlank()` function returns true if the specified metadata string is a blank character (`" "`), and returns false otherwise.

The `isEmpty()` function returns true if the specified metadata string is the empty string, and returns false otherwise.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to be tested.</td></tr><tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be tested.</td></tr>
</tbody>
</table>


## Example

The following examples illustrate how `isBlank()` works:

* In this first screenshot, we check whether the value of the `service` point tag is the empty string. In this case, the result is `false`.

![is blank false](images/ts_is_blank_false.png)
* In the second example, we're using the `taggify()` function to replace the result of the query with the empty string, and then we call `isBlank()`. Now the result is true.

![is blank true](images/ts_is_blank_true.png)
