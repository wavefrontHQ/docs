---
title: startsWith and endsWith Functions
keywords: query language reference
tags: [reference page]
permalink: ts_startswith.html
summary: Reference to the startsWith() and endsWith() string manipulation functions
---
## Summary
```
startsWith(metric|source|<pointTagKey>, "<string>", <tsExpression>)

endsWith(metric|source|<pointTagKey>, "<string>", <tsExpression>)
```
The `startsWith()` function returns true if the specified metadata string starts with the given string, and returns false otherwise.

The `endsWith()` function returns true if the specified metadata string ends with the given string, and returns false otherwise.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to test for the specified starting or ending string.</td></tr>
<tr>
<td markdown="span">string</td>
<td>The starting or ending string to be tested for.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be tested.</td></tr>
</tbody>
</table>

## Description

The `startsWith()` and `endsWith()` functions allow you to check whether a metadata string starts with or ends with a specified string. For example, you could check whether a host name starts with `aws` or ends with `2020`.

The returned values (`true` or `false`) are displayed as metadata values in the chart legend or in a table column.


## Example

In the example below, we check whether the string that's the value of the `service` point tag starts with `data` or starts with `ingester`. In the hover text, we can see that the result is `true` for the first query and `false` for the second. 

![ts starts with](images/ts_starts_with.png)
