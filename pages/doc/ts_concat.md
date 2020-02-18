---
title: concat Function
keywords: query language reference
tags: [reference page]
permalink: ts_concat.html
summary: Reference to the concat string manipulation function
---
## Summary
```
concat(metric|source|<pointTagKey>, "<string>", <tsExpression>)
```
Concatenates the specified string by adding it to the end of the specified metadata string.


## Parameters
<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="30%">Parameter</th><th width="70%">Description</th></tr>
</thead>
<tr>
<td markdown="span">metric|source|&lt;pointTagKey&gt;</td>
<td>The metadata string (metric name, source name, or value of a point tag key) to add to.</td></tr>
<tr>
<td markdown="span">string</td>
<td>The string that you want to concatenate with the metadata string.</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>The expression that describes the time series with the metadata string to be added to.</td></tr>
</tbody>
</table>


## Example

The following example starts with the value of the `service` point tag, which is `dataingester` and concatenates `_by_wavefront`. You can see the result in the hover text.


![ts concat example](images/ts_concat.png)
