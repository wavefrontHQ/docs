---
title: weekday Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_weekday.html
summary: Reference to the weekday() function
---
## Summary
```
weekday(<timeZone>)
```
Returns the day of the week in the specified time zone.
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

The `weekday()` standard time function returns the day of the week in the specified time zone. A day of the week is represented as a whole number from 1 through 7, as defined by the Gregorian calendar. Weekdays are represented from 1 (Monday) through 5 (Friday), and weekends are represented as 6 (Saturday) and 7 (Sunday).

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times from multiple days.
`weekday()` automatically adjusts its return values for daylight savings time.

`weekday()` is particularly useful when you want to define an alert that fires only on a specific day or range of days of a week.
For example, you could use an expression such as `between(weekday("America/Chicago"),6,7)` in an alert condition to ensure that the alert fires only on a weekend in Central Standard Time.


## Examples

**Example 1: Showing Days of the Week**

This chart shows data for several weeks. 1 represents Sunday and 7 represents Saturday.  
![weekday](images/ts_weekday.png)

**Example 2: Defining an Alert that Fires on Particular Days**

Here we include `(weekday("UTC") = 1 or weekday("UTC") = 3 or weekday("UTC") = 5)` in a conditional expression to define an alert that fires when the CPU load average rises above 2.5 on a Monday, Wednesday, or Friday of each week.
![weekday alert](images/ts_weekday_alert.png)

## See Also
[`day()` Function](ts_day.html)

[`dayOfYear()` Function](ts_dayOfYear.html)
