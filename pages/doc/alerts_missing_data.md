---
title: Alerting on Missing Data
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_missing_data.html
summary: Configure an alert to fire when a time series stops reporting.
---

Part of monitoring a system is to configure alerts to let you know about machine or application faults. When a machine or application crashes, it stops reporting data to Wavefront. In effect, the data we expect from that source is "missing".

This page can help you understand how to configure alerts to detect missing data, so you can identify potential failures and resolve them before too much data is lost. 


## What is Missing Data?

Whenever a time series stops reporting data points, a gap of NO DATA occurs where we normally expect data points to be. We refer to these expected but unreported data points as missing data. 

Missing data might result from:  

* Serious faults that require intervention to correct. For example, a time series might stop reporting data because the source of the series (an application, service, or host machine) has crashed and can no longer generate data points or send them to Wavefront. Or an application might malfunction intermittently so that it stops sending points for short periods of time before resuming.
 
* Brief interruptions that resolve on their own. For example, a time series might skip a few data points here and there because a minor network problem has dropped a few packets.

You normally alert on missing data to discover any serious faults that might occur. That is, you want to configure your alerts to be:  

* Sensitive enough to detect missing data in time to avoid significant downtime.
* Robust enough to ignore brief, insignificant interruptions.

The sections below describe 2 main techniques for alerting on missing data: 
* [Alerting on an entire group of time series that fail together.](#alerting-on-time-series-that-fail-together)
* [Alerting on one or more individual time series within a group.](#alerting-on-missing-data-in-individual-time-series)

**Note:** Sometimes a gap of NO DATA in a time series means that data reporting has been delayed, but not completely stopped. Whereas a gap of missing data is permanent, a gap from a data delay is temporary and is eventually backfilled. If you need to alert on a time series that is subject to data delays, you can [configure the alert to minimize their impact](alerts_delayed_data.html#minimize-the-impact-of-data-delays-on-alerts).

## Alerting on Time Series that Fail Together

You can configure an alert to fire and notify you when a group of time series all stop reporting data. To do so, you create a [custom alert target](webhooks_alert_notification.html#creating-a-custom-alert-target) with the trigger set to **Alert Has No Data**. 

**Example**

Suppose you are collecting a metric `my.metric` from 2 copies of a service that are each running on a different host machine (`app-1`, `app-2`). You aren't concerned if either `app-1` or `app-2` fails by itself, but you need to know if both sources fail concurrently. 

1. Create a custom alert target whose trigger is set to **Alert Has No Data**. 
2. Create the alert with **Condition** set to `ts(my.metric)`, and **Alert Target** set to the custom target. 

## Alerting on Missing Data in Individual Time Series

You can configure an alert to fire when at least one individual time series in a group stops reporting data. To do so, you use the [`mcount()`](ts_mcount.html) function in the alert condition to detect missing data in each time series you specify. `mcount()` measures the number of data points reported by a time series, relative to a chosen time interval, and returns the number (the "moving count") once per second. 

* To find out whether a time series has stopped reporting, you can configure an alert to fire whenever the moving count drops to 0.
* To find out whether a time series is reporting inconsistently, you can configure an alert to fire whenever the moving count drops below some threshold. 

We recommend that you pick a shifting time window that is longer than the data-reporting interval of the time series.

**Examples** 

Suppose `my.metric` normally reports one data point per minute. 
* The following alert condition returns true if `my.metric` reported no data points at all for 3 minutes:

  ```mcount(3m, ts(my.metric)) = 0```

* The following alert condition returns true if there are 2 or more missing data points over the last 5 minutes:

  ```mcount(5m, ts(my.metric)) <= 3```

* The following alert condition is likely to be too sensitive, because even a slight delay can lead to a false positive:

  ```mcount(1m, ts(my.metric)) < 1```
  
![Alert mcount](images/alerts_mcount_fire.png)


## Responding to Long Data Gaps

When you use `mcount()` in an alert condition to detect gaps in a time series, you need to decide what you want your alert to do if a time series stops for longer than 2x the duration of the moving time window. 

You can:
* Allow the alert to resolve after an **Alert resolves** time window of no data. 
* Configure the alert to continue firing as long as the time series has stopped reporting.

### Allow the Alert to Resolve

The `mcount()` function returns the number of data points for 2x the duration of the time window, after the time series stops reporting data. At this point, `mcount()` also stops reporting, and the alert will resolve after detecting NO DATA for the **Alert resolves** time window.

**Example**

Suppose: 
* An alert is configured with **Alert fires** = 2 minutes and **Alert resolves** = 2 minutes. The alert condition tests whether the reporting rate falls to 0 using a rate-testing window of 3 minutes: `mcount(3m, ts(my.metric))=0`
* The time series `my.metric` normally reports once a minute, and stops reporting at 10:30. 

`mcount()` declines over the next 3 min til 10:33, then reports 0 for another 3 minutes, then stops reporting.

The alert fires at 10:35 after 2 minutes of 0 values. After 2 min of no data (i.e., at 10:38), the alert resolves, because there have been no false values for 2 minutes.  


![Alert mcount](images/alerts_mcount_fire_resolve.png)



If you don't want the alert to resolve when mcount stops reporting, wrap it in last(), which keeps the last value reporting even beyond when it would have stopped,  and causes the alert to keep firing.




### Configure the Alert to Continue Firing

The `mcount()` function returns the number of data points for 2x the duration of `timeWindow` after `expression` stops reporting data. 


If your use case requires `mcount()` to report a value beyond the 2x time window, we recommend wrapping the `mcount()` function in `last()`, for example: `last(1h, mcount(5m, ts(my.metric)))`.



<!---
![mcount_demo-2](images/mcount_demo-2.png)
--->



<!---
## More Info

For more tips, see our blog post [Intelligent Alert Design: Three Simple Tips for Increasing Alert Robustness](https://www.wavefront.com/intelligent-alert-design-three-simple-tips-increasing-alert-robustness/){:target="_blank" rel="noopenner noreferrer"}
--->
