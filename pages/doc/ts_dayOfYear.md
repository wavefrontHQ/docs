---
title: dayOfYear Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_dayOfYear.html
summary: Reference to the dayOfYear() function
---
## Summary
```
dayOfYear(<timeZone> [,<tsExpression])
```
Returns the day of the year in the specified time zone.
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

The `dayOfYear()` standard time function returns the day of the year in the specified time zone. A day is represented as a whole number from 1 through 366, as defined by the Gregorian calendar. 366 is returned only during a leap year.

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times from multiple days.
`dayOfYear()` automatically adjusts its return values for daylight savings time.

`dayOfYear()` is particularly useful when you want to define an alert that fires only on a specific day or range of days within a year, such as a range that starts in the middle of a month and includes multiple weeks or months.
For example, you could use an expression such as `between(dayOfYear("America/Chicago"),304,359)` in an alert condition to ensure that the alert fires only between Halloween and Christmas in a non-leap year in Central Standard Time.

`dayOfYear()` does not automatically accommodate leap years. You can use the [`lead()`](ts_lead.html) function in an expression such as the following to return 1 on the last day of the year for a given time zone, regardless of whether the year is a leap year: `lead(1d, dayOfYear(...)=1)`.


## Examples

**Example 1: Showing Days of the Year**

This chart shows live data for 8 days. `dayOfYear("Europe/Berlin")` returns 37 through 45 when starting on February 5. The legend shows that 38 is returned for February 06 2020.
![dayOfYear](images/ts_dayOfYear.png)

**Example 2: Defining an Alert that Fires on Particular Days**

Here we include `(dayOfYear("America/Los_Angeles") = 15)` to create an alert that fires when the CPU load average rises above 2.5 on the 15th day of the year (Jan 15).
![dayOfYear alert](images/ts_dayOfYear_Alert.png)

## See Also
[`weekday()` Function](ts_weekday.html)

[`day()` Function](ts_day.html)
