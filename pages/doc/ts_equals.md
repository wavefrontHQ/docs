---
title: equals, equalsIgnoreCase, and matches Functions
keywords: query language reference
tags: [reference page]
permalink: ts_equals.html
summary: Reference to the equals(), equalsIgnoreCase(), and matches() string manipulation functions
---
## Summary
```
equals(metric|source|<pointTagKey>, "<string>", <tsExpression>)

equalsIgnoreCase(metric|source|<pointTagKey>, "<string>", <tsExpression>)

matches(metric|source|<pointTagKey>, "<stringOrRegex>", <tsExpression>)
```
The `equals()` function returns true if the specified metadata string is equal to the comparison string, and otherwise false. Both strings must match exactly.

The `equalsIgnoreCase()` function ignores case, and returns true if the specified metadata string matches the comparison string, and otherwise false. With this function, `string` is equal to `StRiNg`.

The `matches()` function returns true if the specified metadata string matches the comparison string, and false otherwise. The comparison string can be a regular expression.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to be compared.</td></tr>
<tr>
<td markdown="span">string</td>
<td>The comparison string.</td></tr>
<tr>
<td markdown="span">stringOrRegex</td>
<td markdown="span">The comparison string, which can be a regular expression, for example, `"us.*"` matches `"us-west-1"`.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be compared.</td></tr>
</tbody>
</table>


## Example

The following example checks whether the string `newPointTagValue` is equal to the string `newPointTagValue` (true) or to the string `dataingester` (false).

![ts equals](images/ts_equals.png)
