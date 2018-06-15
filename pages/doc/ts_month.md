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
month(<timeZone>)
```
Returns the month in the specified time zone, plotted against the time on the chart's x-axis. 

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

The `month()` standard time function returns the month of the year in the specified time zone, represented as an integer from 1 (January) through 12 (December). 

The returned values are plotted against the times shown on the x-axis. The returned series is generally a straight line, unless you are looking at a chart that includes times from multiple months.
`month()` automatically adjusts its return values for daylight savings time.

`month()` is particularly useful when you want to define an alert that fires only during a specific month or range of months, such as quarters of the year (Q1, etc.). For example, you could use an expression such as `between(month("America/New_York"),4,6)` in an alert condition to ensure that the alert fires only in Q2 (April through June), Eastern Daylight Time. 


## Examples

In this chart, we have set custom dates spanning several months. `month("America/New_York")` returns integers 4, 5, and 6, representing April, May, and June, Eastern Daylight Time.
![month](images/ts_month.png)


Here we include `between(month("America/New_York"),4,6)` in a conditional expression to define an alert that fires when the CPU load average rises above 2.0 during the second quarter (April through June) of the current year. 
![month alert](images/ts_month_alert.png)
