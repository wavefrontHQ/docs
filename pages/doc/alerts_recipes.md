---
title: Alert Recipes
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_recipes.html
summary: Queries for common alert scenarios in VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront)
---

Our Customer Success team has found that customers use certain alerts frequently. For example, customers want to alert on point rate drops or on between specific times.

{% include note.html content="For improved legibility, we've included line breaks in some of the query examples." %}

## Alert on Point Rate Drop

Define an alert that compares the number of data points reported in the last time window to the number of data points reported in the window before that. If the last time window is X percent less, return 1 to alert.

For example, here's the query for an alert that fires if the number of processes for `app-5` drops by 5% in a 30-minute time window:

```
mcount(30m, (ts(~sample.process.num, source="app-5"))) <
mcount(30m,lag(30m,(ts(~sample.process.num, source="app-5")))) * 95/100
```

## Alert on Missing Data

Define an alert that compares the number of data points reported in the last time window to the number of data points reported in the window before that. An alert like that is useful for example, if you want to be notified when a service stops sending points.

For example, here's the query for an alert that fires if `app-2` sent bytes more than 30 seconds ago, but stopped sending bytes in the last 30 seconds.

```
mcount(30s, (ts(~sample.network.bytes.sent, source=app-2))) = 0 and mcount(30s,lag(30s,(ts(~sample.network.bytes.sent, source=app-2)))) != 0
```

**See Also:** [Alerting on Missing Data](alerts_missing_data.html)

## Alert on Exceeding a Threshold

Define an alert that fires when data exceeds a threshold.

For example, here's the query for an alert that fires if the number of sample processes for `app-5` is greater than 100.

`(ts(~sample.process.num, source="app-5")) > 100`

If you paste the query into the alert's DATA field as is, you create a single-threshold alert. Specify a severity and associated recipients to send notifications to the recipients when the condition is met.

To create a multi-threshold alert:

1. Use `(ts(~sample.process.num, source="app-5"))` in the alert's DATA field and click **Next**.
2. Select `greater than`.
3. Next to each severity, specify the threshold, for example, next to **Severe** type 100 and next to **Warn** type 90.
4. Specify recipients for each severity.

See [Create and Manage Alerts](alerts_manage.html) for details and a video. 

## Alert Only Between Specific Times

Define an alert that fires only between specified times.

For example, here's the query for an alert that fires only on Thursdays between 8 and 5 PST.

~~~
(ts(~sample.process.num, source="app-5")) > 100
and between(hour("US/Pacific"),8,5)
and between(weekday("US/Pacific"),4,4)
~~~

The following diagram shows the corresponding query in a chart.

![alert times](images/v2_alert_recipe_time.png)

## Alert When There Are More than X Points in a Time Window

Define an alert when there are more than a specified number of points in a specified time window.

For example, here's the query for an alert that fires if the number of sample processes for `app-5` is more than 100 in a 30-minute time window.

`mcount(30m, (ts(~sample.process.num, source="app-5"))) > 100`

## Alert on Wavefront Proxy

The data from agents such as collectd, Telegraf, etc., are sent to the Wavefront proxy and the proxy pushes the data to the Operations for Application service. Make sure that the proxy checks in with your service and that data is being pushed to the service. You can set up the following alert to monitor the proxy:

```
mcount(5m,sum(rate(ts(~proxy.check-in)), sources))=0 and mcount(1h, sum(rate(ts(~proxy.check-in)), sources)) !=0
```

This query uses the `~proxy.check-in` metric to verify that the agents are reporting. By applying a second argument to the alert query, you capture any time series that reported at least 1 value  in the last hour and that stopped reporting in the last 5 minutes.

[Monitor Wavefront Proxies](monitoring_proxies.html) discusses how to use the Proxies Browser and the out-of-the-box proxy dashboards, and lists the `~proxy` internal metrics.
