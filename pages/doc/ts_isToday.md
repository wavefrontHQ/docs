---
title: isToday Function
keywords: query language reference
tags: [reference page]
sidebar: doc_sidebar
permalink: ts_isToday.html
summary: Reference to the isToday() function
---
## Summary
```
isToday(<timeZone>)
```
Tests for the current day in the specified time zone.
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

The `isToday()` standard time function test whether the times shown on the chart's x-axis occur on the current day in the specified time zone. This function returns 1 for times from 12:00:00am through 11:59:59 of the current day, and returns 0 for all other times.

`isToday()` automatically adjusts its return values for daylight savings time.

`isToday()` is particularly useful when you want to see data values that are reported only on the current day. 



## Examples

**Example 1: Results of isToday()**

This chart shows the results of `isToday("US/Eastern")`. The function returns 0 up until midnight this morning (Eastern Time), and then returns 1 for the current day. Notice that the change occurs at 9pm on the chart, because the chart's times are shown in  Pacific Time. 
![isToday](images/ts_isToday.png)

**Example 2: Using Only Today's Values in a Function**

Consider the moving maximum for CPU load averages over a shifting 1-hour window (the orange line).  
![isToday before](images/ts_isToday_before.png)

Now we want to see the moving maximum, but only for CPU load averages that are reported during the current day, Eastern Time.
We do this by adding a new query in which we use the conditional `if(isToday("US/Eastern"), ts(...))` as a parameter to `mmax()`. The conditional expression returns only today's CPU load averages. 

The results of the new query appear on the chart below as a green line starting at 9pm local time (midnight Eastern Time). Notice that the moving maximums returned by the new and old queries differ at first, because they are based on different shifting time windows. Eventually the shifting time windows coincide, and the orange and green lines converge.

![isToday before](images/ts_isToday_after.png)
