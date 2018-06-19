---
title: hour Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_hour.html
summary: Reference to the hour() function
---
## Summary
```
hour(<timeZone>)
```
Returns the hours of the day in the specified time zone. 

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

The `hour()` standard time function returns the hours within a day for the specified time zone, represented as decimal values on a 24-hour clock. For example, 12am is represented as 0.000; 2pm is represented as 14.000; 2:15pm is represented as 14.250; and 2:32pm is represented as 14.533. 

The returned values are plotted against the corresponding hours of the day shown in the time zone that is currently set for the dashboard. `hour()` automatically adjusts its return values for daylight savings time.

`hour()` is particularly useful when you want to define an alert that fires only during specific times of day. For example, you could use an expression such as `between(hour("US/Pacific"), 22,8)` in an alert condition to ensure that the alert fires only between 10pm and 8am Pacific Time. 



## Examples

`hour("Europe/London")` lets you compare times in your dashboard's current time zone with times in another time zone. In this example, we can find 12 noon in the current time zone (along the x-axis) and see that it is 20.000 (8:00pm) in the Europe/London time zone (along the y-axis). 
![hour](images/ts_hour.png)

Here we include `between(hour("Europe/London"),22,8)` in a conditional expression to define an alert that fires when the CPU load average rises above 1.5 between the hours of 10pm and 8am in the Europe/London time zone. 
![hour alert](images/ts_hour_alert.png)
