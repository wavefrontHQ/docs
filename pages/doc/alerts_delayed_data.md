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
* [Looking for evidence of a data delay](#checking-for-a-data-delay) that caused the alert to fire. 
* Adjust your alert condition to [minimize the impact of data delays](#minimizing-the-impact-of-data-delays-on-alerts).

## Checking for a Data Delay

If you think an alert has fired or resolved without meeting the alert condition, you can look for evidence that a data delay occurred during the alert check time window. A data delay can change the set of data values that the alert checking process bases its decisions on.

### What is a Data Delay?

A data delay is a noticeable latency between the time that a source collects a data value and the time that Wavefront receives that value. Data delays can occur anywhere in the data pipeline. Data delays can be:
* Predictable - for example, when a source preprocesses or batches up the data values before sending them to Wavefront.
* Unpredictable - for example, when an sudden network slowdown or outage interferes with the flow of data. 

When the delayed data points finally arrive, Wavefront backfills them into their time series. Each backfilled point is stored with the timestamp that reflects when the source collected it, not when Wavefront actually received it. 

<!---
If backfilling does not occur,  we call it missing data – i.e., a permanent failure to report – and handle it differently.
--->

### Two Views of the Same Time Window

The process of backfilling data values causes Wavefront to revise the affected time series. In effect, there are now two views of the time window in which the delay occurred: 
* The original view exists before backfilling takes place. This view consists of the data values that caused the alert to respond. 
* The revised view exists after backfilling takes place. This view consists of the complete set of data values, which might obscure the reason for the alert’s response.

After backfilling takes place, you can see only the revised view in a Wavefront chart. 

### Did a Data Delay Affect My Alert?

If an alert has fired when you don't expect it, you can use an [alert notification](alerts_notifications.html#chart-images-in-alert-notifications) to help you determine whether a data delay was the cause: 

1. Obtain an alert notification that was triggered by the alert. 
2. Check whether the alert notification includes a [chart image](alerts_notifications.html#chart-images-in-alert-notifications). A chart image shows the original view of the data at the time the alert fired.
3. Use the alert notification to display an [interactive chart](alerts_notifications.html#interactive-charts-linked-by-alert-notifications) for the query that was used in the alert condition. By default, you can click a **View Alert** button to display the chart with a custom date that includes the alert time check window. 
4. Compare the chart image and the interactive chart.
  * A difference indicates that backfilling has occurred after a data delay, so the interactive chart now shows the revised view.

<!---
  * If the image and the interactive chart are identical, then it's possible that a data delay occurred, but backfilling has not yet taken place.
--->

**Note:** Comparing a chart image to a current interactive chart is the only direct way to determine whether a data delay has occurred in an alert check time window. If your alert notifications do not include chart images, or if you are trying to determine why an alert didn't fire when you expected it to, you might need to investigate your data pipeline for clues that might point to a data delay. 


<!---
You can also try adjusting your alert condition to limit the impact of data delays, and see if that makes a difference.
--->

## Minimizing the Impact of Data Delays on Alerts

You can minimize the impact of data delays by evaluating data from an earlier time window. Doing so improves the chances that the alert checker will base its decisions on a view of the data that was revised to include backfilled values.

You can use either of the following techniques (or a combination of them):
* Use the `lag()` function in the alert condition. 
* Specify a longer alert check time window.


### Use the `lag()` Function

You can use the [`lag()`](ts_lag.html) function in an alert condition to evaluate data values from an earlier time window, instead of evaluating the data values that arrive immediately before alert checking occurs.

Suppose you want to monitor the number of requests per second, and these requests are sharded across 10 machines. Each machine should be running about 150 requests/second, so the total should add up to more than 1000. You'd like to know if the total drops below 1000. You start with the following alert condition, which compares the current request count to 1000:

```
sum(ts("aws.elb.requestcount")) < 1000
```

But you know that preprocessing in the data pipeline normally causes a 15-minute reporting delay on 5 machines, so half of the more recent data values will be absent at any given alert check time. The temporarily absent data might cause the summarized request count to fall below the threshold and trigger the alert. 

You can correct for the data delay by applying `lag()` to the current request count, as in the following alert condition: 

```
lag(15m, sum(ts("aws.elb.requestcount"))) < 1000
```

By setting the time window to `15m`, you tell the alert condition to return data values whose timestamps are 15 minutes earlier than the alert check time. The 15 minute lag gives Wavefront a chance to receive and backfill the delayed values into the alert check time window so the values returned by the alert condition are likely to be complete.

**Note:** The alert condition in this example returns true whenever a delay lasts longer than 15 minutes, which might indicate a real problem, and not a predictable data delay.

### Adjust the Alert Check Time Window

You can increase the **Alert fires** or **Alert resolves** time window so that the window's duration is longer than the usual data delay. This allows the alert checker to consider data values that are old enough to include backfilled data. 

Suppose you want to monitor the number of requests per second sharded across 10 machines. You'd like to know if the total number of requests drops below 1000 for 2 minutes. If all series report on time, you can set **Alert fires** to 2.

Now suppose you know that the series on all 10 machines experience a predictable 15-minute reporting delay. If **Alert fires** is 2, the alert will never fire, because the alert check time window will always contain No Data, which is neither true nor false. The solution is to increase the **Alert fires** window to 15 + 2 = 17 minutes. The oldest 2 minutes in the alert check time window will have actual data values backfilled. If both of those minutes have a summarization point < 1000, the alert fires.

## How Data Delays Affect Alerts

Metrics from one or more sources might report their data points to Wavefront after a noticeable time delay. If the delayed values are temporarily absent at the time of an alert check, their absence can affect the decision to fire or resolve an alert. 

Here are several general ways that delayed data can affect the alert decision:

* Absent values could eliminate one or more summarization data points entirely, so the alert check would see No Data for those minutes.
* Absent values could affect the values of the summarization of data points in the alert check time window. When fewer actual values are present within a given minute, the resulting average for that minute might be lower than it would be if all the expected data were present.

Here are several specific ways that delayed data can affect the results of an alert condition that uses an aggregation function to combine values across multiple time series:
* Absent values could cause interpolated values to be used in their place. The results of the aggregation function might therefore be higher or lower than they would be if all the actual data values were present. 
* Absent values could prevent a value from being interpolated. Interpolation can occur only between 2 actual reported values. If the second such value is delayed and therefore absent, the expected interpolation might not occur in time for the alert check. The resulting aggregated value might be higher or lower than it would be if the interpolated value was present. 


<!--- 
A data delay can change the set of data values that the alert checking process bases its decisions on  

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
