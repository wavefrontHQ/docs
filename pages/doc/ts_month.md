---
title: month Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_month.html
summary: Reference to the month() function
---
## Summary
```
month(<timeZone> [,<tsExpression])
```
Returns the month of the year in the specified time zone.

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

The `month()` standard time function returns the month of the year in the specified time zone. A month is represented as a whole number from 1 (January) through 12 (December), as defined by the Gregorian calendar.

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times from multiple months.
`month()` automatically adjusts its return values for daylight savings time.

`month()` is particularly useful when you want to define an alert that fires only during a specific month or range of months, such as quarters of the year (Q1, etc.). For example, you could use an expression such as `between(month("America/New_York"),4,6)` in an alert condition to ensure that the alert fires only in Q2 (April through June), Eastern Daylight Time.


## Examples

**Example 1: Showing Months**

In this chart, we have set a custom date that goes from August 12 to February 12. `month("America/New_York")` returns 8 (August), 9 (September)... and then 1 (January) and 2 (February.
![month](images/ts_month.png)

**Example 2: Defining an Alert that Fires in a Particular Month**

Here we include `(month("America/New_York"),2)` to define an alert that fires when the CPU load average rises above 2.0 in February.
![month alert](images/ts_month_alert.png)
