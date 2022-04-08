---
title: year Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_year.html
summary: Reference to the year() function
---
## Summary
```
year(<timeZone> [,<tsExpression])
```
Returns the year in the specified time zone.

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

The `year()` standard time function returns the year in the specified time zone, represented as a 4-digit number in the Gregorian calendar.

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times around 12:00am on January 1.
`year()` automatically adjusts its return values for daylight savings time.

`year()` is particularly useful when you want to define an alert that fires only during a specific year or range of years. For example, you could use an expression such as `year("US/Pacific")=2018` in an alert condition to ensure that the alert fires only during the year 2018 Pacific Time, and stops firing at the end of that year.


## Examples

**Example: Showing Years**

This chart shows live data, so `year("UTC")` shows the current year in Coordinated Universal Time. Notice that the year is displayed in SI units (2.018k) on this particular y-axis.  For details on SI units, see Wikipedia or a similar source.
![year](images/ts_year.png)

If we set a custom date for the chart from December to May, the series returned by `year("UTC")` shows the change in year.
![year change](images/ts_year_change.png)
