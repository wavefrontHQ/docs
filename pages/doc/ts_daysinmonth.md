---
title: daysInMonth Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_daysInMonth.html
summary: Reference to the daysInMonth() function
---
## Summary

```
daysInMonth(<timeZone> [,<tsExpression])
```

Returns the number of days in a month for the timestamp of the specified time zone. The values returned are integer only and are in the range 28-31.


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

The `daysInMonth()` standard time function returns number of days in a month for the timestamp of the specified time zone. The values returned are integer only and are in the range 28-31.

You can optionally pass in an expression.
