---
title: Alerting on Missing Data
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_missing_data.html
summary: Configure an alert to fire when a time series stops reporting.
---

Sometimes a time series stops reporting data points, for example, because the source of the metric has failed. Alerting on missing data can help you identify potential failures and resolve them before too much data is lost. 


## What is Missing Data?

When a time series stops reporting data points, a gap occurs where we otherwise expect data points to be. These expected but unreported data points are referred to as missing data. 

A time series might stop reporting for any number of reasons.


produce a gap of NO DATA in the time series. 

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

When you use `mcount()` in an alert condition to detect reporting gaps, you need to decide what you want your alert to do if your metric stops for longer than 2x the duration of the moving time window. You can arrange for the alert to 

* You could set up the alert condition so that the alert will continue for as long as the metric has stopped.

If you're using this technique to detect when a series stopped reporting, you should be aware that mcount will stop reporting, too. This will cause your alert to resolve after awhile, even if your data is still not reporting.  The alert will resolve on its own, because mcount stops reporting after 2x the time window duration. You might want this or you might not. But you should know it's happening.

For example, if alert fires = 2, and alert resolves = 10. mcount(10m). TS stops reporting at 8:30 and mcount declines for 10 min til 8:40, then reports 0 for 10 min til 8:50. Alert will fire at 8:42 or 43 (after 2 min of 0 values), and then mcount reports 0 for the next 8 minutes, then reports no data from 8:50 on. After 10 min of no data (i.e., at 9:00), the alert resolves, because there have been no false values for 10 min.  

If you don't want the alert to resolve when mcount stops reporting, wrap it in last(), which keeps the last value reporting even beyond when it would have stopped,  and causes the alert to keep firing.


The `mcount()` function returns the number of data points for 2x the duration of `timeWindow` after `expression` stops reporting data. 

Suppose `mcount(10m, ...)` reports a decreasing value for 10 minutes, then a value of 0 for 10 more minutes, and then stops reporting.

If your use case requires `mcount()` to report a value beyond the 2x time window, we recommend wrapping the `mcount()` function in `last()`, for example: `last(1h, mcount(5m, ts(my.metric)))`.

<!---
![mcount_demo-2](images/mcount_demo-2.png)
--->



<!---
## More Info

For more tips, see our blog post [Intelligent Alert Design: Three Simple Tips for Increasing Alert Robustness](https://www.wavefront.com/intelligent-alert-design-three-simple-tips-increasing-alert-robustness/){:target="_blank" rel="noopenner noreferrer"}
--->
