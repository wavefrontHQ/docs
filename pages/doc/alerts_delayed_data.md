---
title: Limiting the Impact of Data Delays
keywords: alerts
tags: [alerts, best practice]
sidebar: doc_sidebar
permalink: alerts_delayed_data.html
summary: Diagnose and avoid spurious alerts due to delayed data reporting.
---

An alert fires or resolves based on the data values that are present in VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) during the alert checking time window. If data reporting is delayed, an alert checking decision might be made on a temporarily incomplete set of data values. This can lead to an apparent false positive (the alert fires when you don't expect it) or false negative (the alert does not fire as expected).

This page can help you understand, diagnose, and prevent the impact of data delays on alerts. Buffering alerts against false positives, in particular, can help you reduce alert noise.

## A Sample Scenario

Suppose you need to monitor the total number of users that are sharded across 3 sources (`app-1`, `app-2`, `app-3`). You know that each source has about 35 users, so the sum is normally higher than 100. You set up an alert to notify you if the total number of users drops below 100 for 2 minutes. Now consider what happens:

* An alert check occurs at 9:30:02. For the preceding 2 minutes, only 2 sources (`app-1` and `app-2`) have reported any data. The average number of users is about 70 for each of these minutes, so the alert fires.

* At about 9:35, `app-3` finally sends its data points, and these delayed points are backfilled into the time series.

* A few minutes later, you investigate the alert by using an Operations for Applications chart. You query for the total number of users, and adjust the custom time window so you can view the data points in the minutes around the alert check (9:28 to 9:30).

* You are surprised to see that the chart shows a total of about 105 users during the alert check window.

It appears that the alert fired even though its condition was not met at 9:30:02. Should you conclude that the alert misfired?

You can proceed by:
* [Checking whether a data delay](#check-for-a-data-delay) caused the alert to fire.
* Taking steps to [minimize the impact of data delays](#minimize-the-impact-of-data-delays-on-alerts).

## Check for a Data Delay

If you think an alert has fired or resolved by mistake, it's possible that a data delay occurred during the alert check time window. A data delay can change the set of data values that the alert checking process bases its decisions on.

### What is a Data Delay?

A data delay is a noticeable latency between the time that a source collects a data value and the time that Operations for Applications receives that value. Data delays can occur anywhere in the data pipeline. Data delays can be:
* Predictable - for example, when a source preprocesses or batches the data values before sending them.
* Unpredictable - for example, when a sudden network slowdown or outage interferes with the flow of data.

When delayed data points arrive, Operations for Applications backfills them into their time series. Each backfilled point is stored with the timestamp that reflects when the source collected it, not when we received it.

<!---
If backfilling does not occur,  we call it missing data – i.e., a permanent failure to report – and handle it differently.
--->

### Did a Data Delay Affect My Alert?

The process of backfilling data values causes Operations for Applications to revise the affected time series. In effect, there are now two views of the time window in which the delay occurred:
* The original view, which exists before backfilling takes place.
* The revised view, which exists after backfilling takes place. This view consists of the complete set of reported data values.

After backfilling takes place, you can see only the revised view in an Operations for Applications chart.

If an alert has fired when you didn't expect it, use one of these approaches to determine whether a data delay was the cause:

Option 1: Examine the chart:

1. On the chart associated with the alert, select a 10 minute live window by zooming in.
2. Check if the points in the chart arrive a few minutes <i>after</i> the current timestamp. If they do, a data delay is affecting your alert.

Option 2: Examine an alert notification:

1. Obtain an alert notification that was triggered by the alert.
2. Check whether the alert notification includes a [chart image](alerts_notifications.html#static-chart-image-in-notifications). A chart image shows the original view of the data at the time the alert fired.
3. Use the alert notification to display a current, [interactive chart](alerts_notifications.html#link-to-interactive-chart-in-alert-viewer) for the query that was used in the alert condition. By default, you can click a **View Alert** button to display the chart with a custom date that includes the alert time check window.
4. Compare the chart image and the interactive chart.
  * A difference indicates that a data delay and backfilling have occurred, so the interactive chart now shows a revised view.

<!---
  * If the image and the interactive chart are identical, then it's possible that a data delay occurred, but backfilling has not yet taken place.
--->

{% include note.html content="Comparing a chart image to a current interactive chart is the most direct way to determine whether a data delay has occurred in an alert check time window. If your alert notifications do not include chart images, or if you are trying to determine why an alert didn't fire when you expected it to, you might need to investigate your data pipeline for clues that might point to a data delay. You can also try techniques for [minimizing the impact of data delays (below)](#minimize-the-impact-of-data-delays-on-alerts) to see if that helps prevent further false positives or negatives." %}

<!---
You can also try adjusting your alert condition to limit the impact of data delays, and see if that makes a difference.
--->

## Minimize the Impact of Data Delays on Alerts

You can minimize the impact of data delays by evaluating data from an earlier time window. Doing so improves the chances that the alert checker will base its decisions on data that has been backfilled.

You can use either of the following techniques (or both):
* Use the `lag()` function in the alert condition.
* Increase the length of the alert check time window.


### Adjust the Alert Condition

You can use the [`lag()`](ts_lag.html) function in an alert condition to shift the alert check time window back in time. Pick a time window that you think might be old enough to contain backfilled values. Without `lag()`, the alert check time window ends immediately before alert checking occurs, which is too soon for backfilling to occur.

**Example**

Suppose you want to monitor the number of requests per second, and these requests are sharded across 10 machines. Each machine should be running about 150 requests/second, so the total should add up to more than 1000. You'd like to know if the total drops below 1000 for 2 minutes, so you set **Trigger Window** to 2.

The following alert condition compares the current request count to 1000:

```
sum(ts("aws.elb.requestcount")) < 1000
```

But you know that preprocessing in the data pipeline normally causes a 15-minute reporting delay on 5 machines, so half of the more recent data values will be absent at any given alert check time. The temporarily absent data might cause the summarized request count to fall below the threshold and trigger the alert.

You can correct for the data delay by applying `lag()` to the current request count, as in the following alert condition:

```
lag(15m, sum(ts("aws.elb.requestcount"))) < 1000
```

By setting the lag time to `15m`, you tell the alert condition to return data values whose timestamps are 15 minutes earlier than the alert check time. The alert checking process evaluates 2 minutes' worth of these older values (from 15 to 17 minutes before checking occurs). The 15-minute lag gives us a chance to backfill the delayed values into the alert check time window.

{% include note.html content="If a data delay lasts longer than 15 minutes, the sample alert condition will return data values before backfilling has a chance take place." %}

### Lengthen the Alert Check Time Window

You can increase the **Trigger Window** or **Resolve Window** so that the window is longer than the default. This allows the alert checker to consider data values that are old enough to include backfilled data. A good estimate is:
```  (Number of minutes in delay) + (Number of minutes you want to test) ```

**Example**

Suppose you want to monitor the number of requests per second sharded across 10 machines. You'd like to know if the total number of requests drops below 1000 for 2 minutes. If all series report on time, you can set **Trigger Window** to 2.

Now suppose you know that the series on all 10 machines experience a predictable 15-minute reporting delay. If **Trigger Window** is 2, the alert will never fire, because the alert check time window will always contain NO DATA, which is neither true nor false.

The solution is to increase the **Trigger Window** window to 15 + 2 = 17 minutes. The oldest 2 minutes in the alert check time window will have actual data values backfilled. If both of those minutes have a summarization point < 1000, the alert fires.

## How Data Delays Affect Alerts

When delayed data values are temporarily absent at the time of an alert check, their absence can affect the decision to fire or resolve an alert.

Here are several ways that delayed data can affect the alert decision for any alert condition:

* Absent values might eliminate one or more summarization data points entirely, so the alert check will see NO DATA for those minutes.
* Absent values might affect the values of the summarization of data points in the alert check time window. When fewer actual values are present within a given minute, the resulting average for that minute might be lower than if all the expected data were present.

Here are several ways that delayed data can affect the alert decision when the alert condition uses an aggregation function:
* The aggregation function might interpolate values in place of the expected, but absent, reported values. The results of the aggregation function might therefore be higher or lower than if all the actual data values were present.
* The aggregation function might be prevented from interpolating values in some cases. Interpolation can occur only between 2 actual reported values. If the second such value is delayed and therefore absent, the expected interpolation might not occur in time for the alert check. The result without the interpolated value might be NO DATA, or an aggregated value that is higher or lower than if the interpolated value was present.


<!---
A data delay can change the set of data values that the alert checking process bases its decisions on

For example, suppose you want your alert to fire 1 true value followed by a predictable 15-minute reporting delay. You can

This setting depends on how often data points arrive, and it accounts for any delays in the application metrics delivery pipeline.
Changing **Trigger Window** can compensate for external delays of metrics. --->
