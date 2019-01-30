---
title: Alert Recipes
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alert_recipes.html
summary: Queries for commonly used alert conditions
---

The Wavefront Customers Success team has found certain kinds of alerts are used frequently by customers. For example, customers might want to alert on point rate drops or on threshold. This page gives some recipes. You can generate several of these recipes interactively using the [Query Wizard](query_language_query_wizard.html).

## Alert on Point Rate Drops

Define an alert that compares the number of data points reported in the last time window to the number of data points reported in the window before that. If the last time window is X percent less, return 1 to alert.

The following example query can be used in an alert that fires if the number of processes for `app-5` drops by 5% in a 30 minute time window.

`mcount(30m, (ts(~sample.process.num, source="app-5"))) < mcount(30m, lag(30m,(ts(~sample.process.num, source="app-5")))) * 5/100`

## Alert on Missing Data

Define an alert that compares the number of data points reported in the last time window to the number of data points reported in the window before that. An alert like that can helps you figure out if something stopped sending points.

The following example query can be used in an alert that fires if app-2 sent bytes more than 30 seconds ago, but stopped sending bytes in the last 30 seconds.

`mcount(30s, (ts(~sample.network.bytes.sent, source=app-2))) = 0 and mcount(30s,lag(30s,(ts(~sample.network.bytes.sent, source=app-2)))) != 0`

## Alert on Exceeding a Threshold

Define an alert that fires if data exceeds a threshold.

The following example query can be used in an alert that fires if the number of sample processed for `app-5` is greater than 100.

`(ts(~sample.process.num, source="app-5")) > 100`


## Alert Only Between Specific Times

Define an alert that fires only between pre-specified times.

The following example query uses a threshold alert, but specifies that the alert should fire only on Monday between 8 and 5 PST.

`(ts(~sample.process.num, source="app-5")) > 100 and between(hour("US/Pacific"),8,5) and between(weekday("US/Pacific"),1,1)`

The following diagram shows how Query Wizard makes it easy to set up an alert like this:

![alert times](images/alert_recipe_time.png)

## Alert When There Are More Than X Points in a Time Window

Define an alert when there are more than a specified number of points in a prespecified time window.

The following example query can be used in an alert that fires if the number of sample processes for app-5 is more than 100 in a 30 minute time window.

`mcount(30m, (ts(~sample.process.num, source="app-5"))) > 100
Alerts when there are at least X points in a time window`
