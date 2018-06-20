---
title: day Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_day.html
summary: Reference to the day() function
---
## Summary
```
day(<timeZone>)
```
Returns the day of the month in the specified time zone.
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
</tbody>
</table>


## Description

The `day()` standard time function returns the day of the month in the specified time zone. A day is represented as a whole number from 1 through 31, as defined by the Gregorian calendar.

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times from multiple days.
`day()` automatically adjusts its return values for daylight savings time.

`day()` is particularly useful when you want to define an alert that fires only on a specific day or range of days within a month. For example, you could use an expression such as `between(day("UTC"),7,10)` in an alert condition to ensure that the alert fires only on the 7th, 8th, 9th, or 10th day of every month in Coordinated Universal Time. 

`day()` does not automatically accommodate leap years. You can use the [`lead()`](ts_lead.html) function in an expression such as the following to return 1 on the last day of each month for a given time zone, regardless of whether the year is a leap year: `lead(1d, day(...)=1)` 


## Examples

This chart shows live data for 8 days. `day("Asia/Bangkok")` returns 11 through 18, representing the 11th through the 18th days of each month.
![day](images/ts_day.png)


Here we include `(day("Asia/Bangkok") = 10 or between(day("Asia/Bangkok"),14,21))` in a conditional expression to define an alert that fires when the CPU load average rises above 2.5 either on day 10 of the month or from day 14 through day 21. 
![day alert](images/ts_day_alert.png)

## See Also
[`weekday()` Function](ts_weekday.html)

[`dayOfYear()` Function](ts_dayOfYear.html)
