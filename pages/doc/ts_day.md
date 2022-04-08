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
day(<timeZone> [,<tsExpression])
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
<tr>
<td markdown="span"> [tsExpression](query_language_reference.html#query-expressions)</td>
<td>Optional expression to which you want to apply this function. </td>
</tr>
</tbody>
</table>


## Description

The `day()` standard time function returns the day of the month in the specified time zone. A day is represented as a whole number from 1 through 31, as defined by the Gregorian calendar.

You can optionally pass in an expression.

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times from multiple days.
`day()` automatically adjusts its return values for daylight savings time.

`day()` is particularly useful when you want to define an alert that fires only on a specific day or range of days within a month. For example, you could use an expression such as `between(day("UTC"),7,10)` in an alert condition to ensure that the alert fires only on the 7th, 8th, 9th, or 10th day of every month in Coordinated Universal Time.

`day()` does not automatically accommodate leap years. You can use the [`lead()`](ts_lead.html) function in an expression such as the following to return 1 on the last day of each month for a given time zone, regardless of whether the year is a leap year: `lead(1d, day(...)=1)`


## Examples

**Example 1: Showing Days of the Month**

This chart shows live data for 8 days. `day("Asia/Tokyo")` returns 9 through 16.
![day](images/ts_day.png)

**Example 2: Defining an Alert that Fires on Particular Days**

Here we include `day("Asia/Bangkok") = 31` in the DATA to define an alert that fires when the CPU load average rises above 0.5 either on day 31 of the month. We specify the threshold in the DATA and a corresponding threshold (0.5) for the desired severity in the CONDITION.
![day alert](images/ts_day_alert.png)

## See Also
[`weekday()` Function](ts_weekday.html)

[`dayOfYear()` Function](ts_dayOfYear.html)
