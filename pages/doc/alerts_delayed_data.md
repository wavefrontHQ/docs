---
title: Alerts and Delayed Data Points
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_delayed_data.html
summary: Diagnose and avoid spurious alerts and other effects of delayed data reporting.
---

An alert fires or resolves based on the data values that are present during an alert checking time window. If data reporting is delayed, an alert checking decision might be made on a temporarily incomplete set of data values. This can lead to an apparent false positive (the alert fires when you don't expect it) or false negative (the alert does not fire as expected).

This page can help you understand, diagnose, and prevent the impact of data delays on alerts. Preventing false positives, in particular, can help you reduce alert noise, and enable your teams to focus on real problems in a timely fashion. 

## A Sample Scenario

Suppose you need to monitor the total number of users that are sharded across 3 sources (`app-1`, `app-2`, `app-3`). You know that each source has about 35 users, so the sum is normally higher than 100. You set up an alert to notify you if the total number of users drops below 100 for 2 minutes. Now consider what happens:

* An alert check time occurs at 9:30:02, and for the preceding 2 minutes, only 2 sources (`app-1` and `app-2`) have reported any data. This brings the average number of users to about 70 for each of these minutes, so the alert fires. 

* At about 9:35, `app-3` finally sends its data points, and these delayed points are backfilled into the time series. 

* A few minutes later, you investigate the alert using a Wavefront chart. You query for the total number of users, and adjust the custom time window so you can view the data points in the minutes around the alert check (9:28 to 9:30). 

* You are surprised to see that the chart shows a total of about 105 users during the alert check window. 

It appears that the alert fired even though its condition was not met at 9:30:02. Should you conclude that the alert misfired? 

You can proceed by:
* Looking for evidence of a data delay that caused the alert to fire. 
* Adjust your alert condition to minimize the impact of data delays.

## Checking for a Data Delay

If you think an alert has fired or resolved without meeting the alert condition, you can look for evidence that a data delay occurred during the alert check time window. A data delay can change the set of data values that the alert checking process bases its decisions on.

### What is a Data Delay?

A data delay is a noticeable latency between the time that a source collects a data value and the time that Wavefront receives that value. Data delays can occur anywhere in the data pipeline and can be:
* Predictable - for example, when a source preprocesses or batches up the data values before sending them to Wavefront.
* Unpredictable - for example, when an sudden network slowdown or outage interferes with the flow of data. 

When the delayed data points finally arrive, Wavefront backfills them into their time series. Each backfilled point is stored with the timestamp that reflects when the source collected it, not when Wavefront actually received it. 

<!---
If backfilling does not occur,  we call it missing data – i.e., a permanent failure to report – and handle it differently.
--->

### Two Views of the Same Time Window

The process of backfilling data values causes Wavefront to revise the affected time series. In effect, Wavefront creates a new view of the time window in which the delay occurred: 
* The original view contains the data values before backfilling takes place. (These are the data values that caused the alert to respond.) 
* The revised view contains the data values after backfilling takes place. (This view has the complete set of data values but might obscure the reason for the alert’s response.)

After backfilling takes place, Wavefront charts show only the revised view.

### Did a Data Delay Affect My Alert?

You can use an [alert notification](alerts_notifications.html#chart-images-in-alert-notifications) to help you determine whether a data delay has caused an alert to fire: 

1. Find an alert notification that was triggered by the alert. 
2. Check whether the alert notification includes a [chart image](alerts_notifications.html#chart-images-in-alert-notifications). A chart image shows the original view of the data at the time the alert fired.
3. Use the alert notification to display an [interactive chart](alerts_notifications.html#interactive-charts-linked-by-alert-notifications) for the query that was used in the alert condition. By default, you can click a **View Alert** button to display the chart with a custom date that includes the alert time check window. 
4. Compare the chart image and the interactive chart.
  * If a data delay and backfilling have occurred, the chart image and the interactive chart are different, because the interactive chart now shows the revised view.

<!---
  * If the image and the interactive chart are identical, then it's possible that a data delay occurred, but backfilling has not yet taken place.
--->

**Note:** Without a chart image, there is no straightforward way to determine whether a data delay occurred in an alert check time window. If, for example, you are trying to determine why an alert didn't fire when you expected it to, you might need to investigate your data pipeline for possible clues. 

<!---
You can also try adjusting your alert condition to limit the impact of data delays, and see if that makes a difference.
--->

## Limiting the Impact of Data Delays on Alerts

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

## How Data Delays Affect Alerts

Metrics from one or more sources might report their data points to Wavefront after a noticeable time delay.

A data delay can change the set of data values that the alert checking process bases its decisions on.



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
