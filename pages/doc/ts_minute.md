---
title: minute Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_minute.html
summary: Reference to the minute() function
---
## Summary
```
minute(<timeZone> [,<tsExpression])
```

Returns the minute of the hour for the timestamp specified by timeZome. The values returned are integer only and are in the range 0-59.


## Parameters
<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr><td>timeZone</td>
<td markdown="span">
String identifier or alias for a time zone, such as `"US/Pacific"`. Names are case sensitive and must be enclosed in quotes. For a list of valid time zone identifiers and their aliases, see  [http://joda-time.sourceforge.net/timezones.html](http://joda-time.sourceforge.net/timezones.html).
</td></tr>
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Optional expression to which you want to apply this function. </td>
</tr>
</tbody>
</table>


## Description

The `minute()` standard time function returns the minute of the hour for the timestamp specified by `timeZome`. The values returned are integer only and are in the range 0-59.

You can optionally pass in an expression.

## Examples

The following two single-stat charts show how many minutes after the hour it is in Berlin and in Darwin using the following 2 queries:
* `minute("Australia/Darwin")`
* `minute("Europe/Berlin")`


![minute](images/ts_minute.png)
