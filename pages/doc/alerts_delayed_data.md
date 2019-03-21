---
title: Alerts and Delayed Data Points
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_delayed_data.html
summary: Diagnose and avoid spurious alerts and other effects of delayed data reporting.
---

An alert fires or resolves based on the data values that are present during an alert checking time window. If data reporting is delayed, an alert checking decision might be made on a temporarily incomplete set of data values. This can lead to a false positive (the alert fires when you don't expect it) or a false negative (the alert does not fire as expected).

This page can help you understand, diagnose, and prevent the impact of delayed data reporting on alerts. Preventing false positives, in particular, can help you reduce alert noise, and enable your teams to respond to real problems in a timely fashion. 

## A Sample Scenario

Suppose you need to monitor the total number of users that are sharded across 3 sources (`app-1`, `app-2`, `app-3`). You know that each source has about 35 users, so the sum is normally higher than 100. You set up an alert to notify you if the total number of users drops below 100 for 2 minutes. Now consider what happens:

* An alert check time occurs at 9:30:02, and for the preceding 2 minutes, only 2 sources (`app-1` and `app-2`) have reported any data. This brings the average number of users to about 70 for each of these minutes, so the alert fires. 

* At about 9:35, `app-3` finally sends its data points, and these delayed points are backfilled into the time series. 

* A few minutes later, you investigate the alert using a Wavefront chart. You query for the total number of users, and adjust the custom time window so you can view the data points in the minutes around the alert check (9:28 to 9:30). 

* You are surprised to see that the chart shows a total of about 105 users during the alert check window. 

It appears that the alert fired at 9:30:02, even though its condition was not met. If you were not aware that `app-3` experience a reporting delay, you might conclude that the alert was a false positive. 

You can proceed by: 
* Checking whether a reporting delay caused the alert. 
* Adjusting your alert condition to minimize the impact of reporting delays.

## Checking for a Reporting Delay

in most cases, alert fired correctly, and the false positive is only apparent.

## Limiting the Impact of Reporting Delays on Alerts

Network delays or slow processing of application metrics at the backend can negatively impact alert processing -- and that can lead to false triggers. These false triggers (false positives) happen if the alerting mechanism is too sensitive.
If backtesting shows that the alert should not have fired, delayed points are often the reason.

You can reduce the impact of delayed data points by using the `lag()` function in the alert condition. This function enables alert checking to evaluate data values from an earlier moment in time. Looking back to the earlier time improves the chances of evaluating the complete set of data, including any data points that arrived later and were backfilled.

**Example**

Suppose you want to monitor the number of requests per second, and these requests are sharded across 10 machines. Each machine should be running about 150 requests/second, so the total should add up to more than 1000. You'd like to know if the total drops below 1000. 

You could use the following alert condition, which compares the current request count to 1000:

```
sum(ts("aws.elb.requestcount")) < 1000
```

But you know that preprocessing in the data pipeline normally causes a 15-minute reporting delay, so some recent values will be missing at the time of alert checking. If these missing values cause the current request count to fall below the threshold, the alert will fire. 

You correct for the delay by applying `lag()` to the current request count, as in the following alert condition: 

```
lag(15m, sum(ts("aws.elb.requestcount"))) < 1000
```

By setting the time window to `15m`, you enable alert checking to consider the complete set of values after they have been received and backfilled. When this alert condition is met, the firing alert is likely to indicate a real problem, and not just a temporary data delay.

**Alternative Technique**

Another way to reduce the impact of delayed data points is to increase the **Alert fires** time window. A longer **Alert fires** window enables alert checking to look back at earlier time that might contain backfilled data. 

## How Reporting Delays Affect Alerts

Metrics from one or more sources might report their data points to Wavefront after a noticeable time delay.

delay queue

Delays can occur for a variety of reasons at any point in the data pipeline. 

Delays can be:
Predictable - for example, a known pipeline delay due to processing done before data is sent to Wavefront.
Unpredictable - for example, an unexpected network slowdown or outage. Load balancing issues.

Delays are temporary. 
When the delay is over and the data points finally arrive, Wavefront backfills the delayed points into the time series. 
Each backfilled point is stored with the timestamp that reflects when it was reported, not when it was actually received. 
If delay is not temporary, we call it missing data – i.e., a permanent failure to report – and handle it differently.


<!--- 
For example, suppose you want your alert to fire 1 true value followed by a predictable 15-minute reporting delay. You can 

This setting depends on how often data points arrive, and it accounts for any delays in the application metrics delivery pipeline. 
Changing **Alert fires** can compensate for external delays of metrics. --->


## Account for Missing Data Points

Using `mcount()` can help you account for missing data points. `mcount()` shows you the number of points reported in a specified moving time window.

A general query with `mcount()` might be:
`mcount(5m, ts(my.metric)) = 0`.

You can tweak a few things:

- Ensure that the time interval associated with `mcount()` is appropriate for your set of data. For example, if you expect that data will arrive once a minute, using `mcount(30s)` is not a good approach. If you want to avoid false positives, `mcount(1m)` won't work either because even a slight delay can affect the alert. However, `mcount(5m)` works well -- it triggers after 5 minutes of NO DATA.
- You can also tweak the = 0 clause in the query.
    - If you want to know when no data at all was reported, then using = 0 is the right approach.
    - However, if you expect data to be reported once a minute, and you'd like to know when data are not consistently reported, then `mcount(5m, ts(my.metric)) <= 3` works better. With that query, you trigger the alert if there are 2 or more missing data points in the last 5 minutes.

The `mcount()` function returns the number of data points for 2x the duration of `timeWindow` after `expression` stops reporting data. The example below shows how `mcount(10m, ...)` reports a decreasing value for 10 minutes, then a value of 0 for 10 more minutes, and then stops reporting.

![mcount_demo-2](images/mcount_demo-2.png)

`mcount(5m, ts(metric2))` stops reporting values after 10 minutes when the time series stops. In the example below, reporting stops after 8:30.

![mcount_demo-1](images/mcount_demo-1.png)

but it fills in 0 values for all previous gaps, even if the gaps were much larger than 10 minutes. That means if metric2 reports 1 value every hour, then  `mcount(5m, ts(metric2))` stops reporting values after 10 minutes -- but if a new value comes in after 50 more minutes, `mcount` will backfill the entire hour.

The example below shows how `mcount` fills in gaps and continues reporting values.

![mcount_demo-4](images/mcount_demo-4.png)

If your use case requires `mcount()` to report a value beyond the 2x time window, we recommend wrapping the `mcount()` function in `last()`, for example: `last(1h, mcount(5m, ts(my.metric)))`.


<!---
## More Info

For more tips, see our blog post [Intelligent Alert Design: Three Simple Tips for Increasing Alert Robustness](https://www.wavefront.com/intelligent-alert-design-three-simple-tips-increasing-alert-robustness/){:target="_blank" rel="noopenner noreferrer"}
--->
