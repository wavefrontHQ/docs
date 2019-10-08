---
title: matches and contains Functions
keywords: query language reference
tags: [reference page]
permalink: ts_matches.html
summary: Reference to the matches() and contains() string manipulation functions
---
## Summary
```
matches(metric|source|<pointTagKey>, <string>, <tsExpression>)
contains(metric|source|<pointTagKey>, <string>, <tsExpression>)
```
The `matches()` function tests the specified metadata string against a comparison string, and returns true if the two strings match and false otherwise.

The `contains()` function tests the specified metadata string against a comparison string, and returns true if the metadata string contains the comparison string, and returns false otherwise.

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
<td markdown="span">string</td>
<td>Comparison string to test against the metadata string.</td></tr>
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
