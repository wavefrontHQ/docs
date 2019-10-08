---
title: contains Function
keywords: query language reference
tags: [reference page]
permalink: ts_contains.html
summary: Reference to the contains() string manipulation functions
---
## Summary
```
contains(metric|source|<pointTagKey>, "<subString>", <tsExpression>)
```

Returns true if the specified metadata string contains the substring, and returns false otherwise.

## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to be tested.</td></tr>
<tr>
<td markdown="span">subString</td>
<td>String to test for containment in the metadata string.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be tested.</td></tr>
</tbody>
</table>


## Example

The following example checks:

* Whether `newPointTagValue` contains `newV` (false)
* Whether `newPointTagValue` contains `newP` (true)

![ts contains](images/ts_contains.png)
