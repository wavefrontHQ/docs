---
title: Tips for Increasing Alert Robustness
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_robustness_increasing.html
summary: Learn how to develop alert conditions and properties that limit spurious alerts.
---
Monitoring a production environment can be a challenging task. But if you have the right alert strategy, you can prevent alert fatigue and ensure that teams respond and fix the problem. As a result, the alert event doesn't escalate into a full-blown outage.

Because each environment is different, Wavefront supports fine-grained customization.  Here are some tips to help you improve alert robustness and prevent false positives.

## Correcting for Delayed Data

Network delays or slow processing of application metrics at the backend can negatively impact alert processing -- and that can lead to false triggers. These false triggers (false positives) happen if the alerting mechanism is too sensitive.
If backtesting shows that the alert should not have fired, delayed points are often the reason.

You can reduce the impact of delayed data points by using the `lag()` function in the alert condition. This function enables alert checking to evaluate data values from an earlier moment in time. Looking back to the earlier time improves the chances of evaluating the complete set of data, including any data points that arrived later and were backfilled.

**Example**

Suppose you want to compare a recent total request count to the value that was measured one week ago, to determine whether the request count has dropped below 30%. You could use the following alert condition, which uses the current request count in the comparison:

```
sum(ts("aws.elb.requestcount")) < 0.3 * lag(1w, sum(ts("aws.elb.requestcount")))
```

But you know that preprocessing in the data pipeline normally causes a 15-minute reporting delay, so some recent values will be missing at the time of alert checking. If these missing values cause the current request count to fall below the threshold, the alert will fire. 

You correct for the delay by applying `lag()` to the current request count, as in the following alert condition. 

```
lag(15m, sum(ts("aws.elb.requestcount"))) < 0.3 * lag(1w, sum(ts("aws.elb.requestcount")))
```

By setting the time window to `15m`, you enable alert checking to consider the complete set of values after they have been received and backfilled. When this alert condition is met, the firing alert is likely to indicate a real problem, and not just a temporary data delay.

**Alternative Technique**

Another way to reduce the impact of delayed data points is to increase the **Alert fires** time window. A longer **Alert fires** window enables alert checking to look back at earlier time that might contain backfilled data. 

For example, suppose you want your alert to fire 1 true value followed by a predictable 15-minute reporting delay. You can 


<!--- 

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
