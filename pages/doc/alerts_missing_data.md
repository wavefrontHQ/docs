---
title: Alerting on Missing Data
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_missing_data.html
summary: Configure an alert to fire when a time series stops reporting.
---

Part of alert planning is to design alerts that let you know about machine or application faults. From a monitoring point of view, the main symptom of a crashed machine or application is that data from that source is no longer reported to Wavefront. In effect, the data we expect from that source is "missing".

This page can help you understand how to configure alerts to detect missing data, so you can identify potential failures and resolve them before too much data is lost. 


## What is Missing Data?

Sometimes a time series stops reporting data points. When this happens, a gap of NO DATA occurs where we otherwise expect data points to be. These expected but unreported data points are referred to as missing data. 

A time series might stop reporting for any number of reasons. The most common reason is that the source of the series -- an application, service, or host machine -- has crashed and can no longer send data points to Wavefront. (Sometimes network interruptions cause data loss, although more typically, the result is a data delay.) 

A time series might 

Minor network problems might cause a packet 


temporary (resolve on their own) or permanent 
brief insignificant interruption that resolves on its own, or a longer significant downtime


Delayed data points produce a temporary gap that is eventually backfilled.
Missing data points correspond to a permanent gap that is not backfilled later.



## Detecting Missing Data

You can use the [`mcount()`](ts_mcount.html) function in an alert condition to detect data gaps in a time series. `mcount()` returns a moving count of the points reported by a time series. A moving count is the number of reported data points that occur in a shifting time window of a particular duration.

* To find out whether a time series has stopped reporting, you can configure an alert to fire whenever the moving count drops to 0.
* To find out whether a time series is reporting inconsistently, you can configure an alert to fire whenever the moving count drops below some threshold. 

You must pick a shifting time window that is longer than the data-reporting interval of the time series, to avoid false positives.

**Examples** 

Suppose `my.metric` normally reports one data point per minute. 
* The following alert condition returns true if `my.metric` reported no data points at all over the last 3 minutes:

  ```mcount(3m, ts(my.metric)) = 0```

* The following alert condition returns true if there are 2 or more missing data points over the last 5 minutes:

  ```mcount(5m, ts(my.metric)) <= 3```

* The following alert condition is likely to be too sensitive, because even a slight delay can lead to a false positive:

  ```mcount(1m, ts(my.metric)) < 1```
  


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
