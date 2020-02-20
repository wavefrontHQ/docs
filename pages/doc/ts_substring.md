---
title: substring Function
keywords: query language reference
tags: [reference page]
permalink: ts_substring.html
summary: Reference to the substring string manipulation function
---
## Summary
```
substring(metric|source|<pointTagKey>, <startInteger>, [<endInteger>,] <tsExpression>)

```
Returns a substring that is extracted from the specified metadata string.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td>metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to extract a substring from.</td></tr>
<tr>
<td>startInteger</td>
<td>Starting position of the substring that you want to extract. Positions are counted from left to right, starting with 0. </td></tr>
<tr>
<td>endInteger</td>
<td markdown="span">Position that immediately follows the last character of the substring to be extracted. Omit this parameter to extract all characters from `startString` to the end of the metadata string.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to extract a substring from.</td></tr>
</tbody>
</table>

## Description

The `substring()` function returns a substring that is extracted from the specified metadata string. The extracted substring starts at the position specified by `startInteger` and ends just before the position specified by `endInteger`. You can omit `endInteger` if you want to remove a prefix from the metadata string.


## Example

The following example extracts substrings from the value of the `service` point tag, which is `dataingester`.

* The first query specifies 0, 4, to extract the string `data`
* The second query specifies 4, 10 to extract the string `ingest`


![ts substring example](images/ts_substring.png)
