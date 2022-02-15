---
title: Troubleshooting Missing Data
keywords: query language
tags: [query language]
sidebar: doc_sidebar
permalink: missing_data_troubleshooting.html
summary: Learn how to use metadata functions  to rename metrics and sources and create point tags.
---

Sometimes users expect to see certain data in Tanzu Observability by Wavefront but, for some reason, it doesn't show up!  This can be a frustrating and confusing experience, especially when you require the data quickly. Wavefront does not delete data, and retains raw data for 18 months. What could be the problem?

This doc page, based on the extensive experience of our customer success team, helps you
investigate and understand possible causes.


## Step 1: Check the Time Window

At times, you're looking at a chart and the chart's time window does not show the time when data were flowing. For example, suppose you discovered a week ago that there were problems with networking data for a certain host. You replaced the host, and want to show last week's problem to a co-worker. You have to make sure that you look at a time window before the host was replaced.

As a first step, [expand the time window](ui_examine_data.html#set-the-time-window) and see if the data of interest shows up.



## Step 2: Consider Include Obsolete Metrics

If a time series hasn't ingested any data points in the last 28 or more days, Wavefront considers the time series obsolete. By default, obsolete data are not included in charts to improve chart loading. If you want to see the data:

* In the chart, click **Advanced** and select **Obsolete Metrics**.
* In the dashboard, you can [turn on obsolete metrics for each chart](ui_examine_data.html#include-or-exclude-obsolete-metrics), but performance can suffer.

<!---rk: Might have to change the link above--->

![Advanced tab is selected, include obsolete metrics is checked](images/include_obsolete.png)


<!---
Recommend we don't link to this. Duplicate. See Where is My Old Data? for more details and tips.--->



## Step 3: Check if Sampling or Filtering Excludes Data

Both the chart UI and the query language support for sampling and filtering data. It's possible that the data you are expecting to see is being sampled or filtered.

### Chart-Level Sampling Hides Your Data

You can [improve the display speed](ui_charts.html#improve-display-speed-with-the-sampling-option) for any chart by turning on Sampling. When you do, Wavefront limits the number of time series to 100 for each chart. If your time series wasn't among the first 100, the chart doesn't show it.

You can toggle sampling as a user preference for all charts. If sampling is on, you can explicitly turn it off for individual charts.

{% include tip.html content="Having sampling **on** globally and **off** for certain individual charts results in best performance with insight into the data you need." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
To turn on Sampling globally:
<ol><li>Click the gear icon and select your user name. </li>
<li>Under <strong>Display Settings</strong>, toggle the setting.</li>
</ol></td>
<td width="60%"><img src="/images/sampling_preference.png" alt="gear icon options, sampling pref selected"></td>
</tr>
<tr>
To turn off sampling for individual charts (if sampling has been turned on globally) you have these options:
<td width="40%">
<ol><li>Select <strong>Always off</strong> to turn off sampling for that chart. </li>
<li>Select <strong>Turn off sampling</strong> to temporarily turn off sampling.</li>
<li>Temporarily turn off the option from the task bar.</li>
</ol></td>
<td width="60%"><img src="/images/sampling_during_chart_cropped.png" alt="prompt user gets during chart creation"></td>
</tr>
</tbody>
</table>


### Query-Level Sampling Hides Your Data

Several Wavefront Query Language (WQL) functions can be used to return only a sampling of data, and not all underlying data. If you don't see your data, check if any of the queries for the chart includes the following functions:
* downsample
* limit
* random
* sample

A second set of functions, listed under Query-Level Filtering Hides Your Data, filters the data. The result is the same: you might not see the data that you expect to see.

### Dashboard-Level Filtering Hides Your Data

Users can [apply global variables or filters](dashboards_variables.html) to a dashboard to explicitly filter out data. If you don't see the data you expect to see in a dashboard, check if a filter is set for the dashboard. For example, if the filter is set to `env = production`, as in the following screenshot, then you won't see data for `env = dev` or `env = qa`.

![screenhot with env=production set](images/global_filter.png)



### Query-Level Filtering Hides Your Data

Several Wavefront Query Language (WQL) functions can be used to filter the data that a query returns before it's displayed on the chart. If you don't see your data, check if any of the queries for the chart includes the following functions:

* align
* bottom
* bottomk
* filter
* globalFilter
* lowpass
* highpass
* retainSeries
* removeSeries
* top
* topk


## Step 4: Find Data Delays at the Proxy

One of the most common reasons data that you don't see data that you expect to see is ingestion delays. If ingestion delays are the problem, the data eventually show up in Tanzu Observability. However, you'll see a discrepancy between the timestamp of the data point and when the data point is actually visible on a chart.

For example:
* A data point is timestamped for 12:00:01 UTC
* Becaus of data delays, that point does not show up on charts until 12:04:35 UTC.

Here are some possible causes for ingestion delays:

Proxy Queues
Data Pipeline
High Rate of New IDs

### Check for Data Delays Caused by Proxy Queues

In certain situations, the Wavefront proxy queues data and those data are ingested by the Wavefront service with a delay. The Proxy prioritizes live incoming data and processes data in the queues (backlog) only when possible.

There are several possible reasons for queues at the Proxy. The [Monitoring Wavefront Proxies](monitoring_proxies.html) and the **Queuing Reasons** chart in the **Wavefront Service and Proxy Data** dashboard are especially helpful for identifying the cause for queuing:

<!---Make me links!--->
* Pushback from Backend
* Proxy Rate Limit
* Bursty Data
* Memory Buffer Overflow
* Network Latency
* Memory Pressure

#### Proxy Queue Issues: Pushback from Backend

If the rate of data ingestion is higher than backend limit, the proxy queues data.  The backend limit typically depends on the commit rate specified in your company's contract. When you attempt to ingest data at a higher rate than the backend limit, data is queued up at the proxy.

**Troubleshooting & Further Investigation**

1. Look for pushback in the **Queuing Reasons** chart of the **Wavefront Service and Proxy Data** dashboard.
2. Use the query in the **Data Ingestion Rate (Points)** chart of the **Wavefront Service and Proxy Data** dashboard to keep track of your ingestion rate. Ensure the ingetion rate is within contractual limits to avoid overages. While it's possible to ask Wavefront Support to raise the backend limit such a change can result in overages.


#### Proxy Queue Issues: Proxy Rate Limit

If the rate of data sent to the proxy too high, the proxy starts queuing data. The **Proxy Rate Limiter Active** chart in the **Wavefront Service and Proxy Data** dashboard provides insight into whether data are coming in faster than the proxy rate limit supports.

<!---So, is the solution more proxies, limit the data, or both?? How can I direct my data to a proxy that can handle it?? HA solution??--->

**Troubleshooting & Further Investigation**

1. Confirm whether data are coming in faster than the proxy's rate limit configuration (`pushRateLimit`). If so, look into ways to reduce your data rate.
2. Go to the **Received Points/Distributions/Spans Per Second** charts in the **Wavefront Service and Proxy Data** dashboard
  1. Examine the ingest rate for the Proxy that seems to have rate limit problems.
  2. Use the Filter feature at the top of each dashboard or chart or specifying a specific source name in the underlying queries to filter for the proxy you are interested in.


#### Proxy Queue Issues: Bursty Data

This can be related to either of the two points above. If your rate of data is very bursty, you may also experience queueing. "Burstiness" means that data is sent in bursts rather than being sent evenly over time. For instance, the average PPS (points per second) over a minute may be 1000. That could be the result of 1000 data points sent for each of the 60 seconds within that minute. But, that could also be the result of 60,000 data points sent at one particular second within that minute and no data sent for the rest of the minute. Since rate limits are set assuming a steady rate, that burst of 60,000 PPS for that one second will result in data being queued.

Troubleshooting & Further Investigation:
The Received Points/Distributions/Spans Max Burst Rate (top 20) charts in the Wavefront Service and Proxy Data dashboard provides insight into the burstiness of your data rate. The queuing ability of the Proxy normally helps smooth out the data rate through momentary queuing. However, if you find that the Proxy queues sustain and continue to grow, the overall data ingest rate is too high. You can either reduce the ingest rate or request that the backend limit be raised (possibly resulting in overages).

#### Proxy Queue Issues: Memory Buffer

If the data ingestion rate is so high that the memory buffer fills too quickly, the proxy queues data. The proxy:
* Holds a certain number of data points in memory (set through the `pushMemoryBufferLimit` [configuration property](proxies_configuring.html))
* Stores data points on disk if the rate gets too high.

As the proxy processes data in the memory buffers, space is freed up for new incoming points. However, when the rate of ingest is so high that the buffer fills up more quickly than it is drained, more and more data points are queued up.

Troubleshooting & Further Investigation:
Look for "bufferSize" in the Queuing Reasons chart. Consider lowering the rate of ingest or distributing the load among several Proxies. It is not typically necessary to adjust the pushMemoryBufferLimit Proxy property. However, if you choose to do so, understand that raising this value results in higher memory usage while lowering this value results in more frequent spooling to disk.

#### Proxy Queue Issues: Network

If network issues prevent or slow down the proxy as it sends data to the Wavefront service, the proxy queue fills up.

**Troubleshooting & Further Investigation:**

1. Go to the **Network Latency** charts in the **Proxy Troubleshooting** section of the **Wavefront Service and Proxy Data** dashboard. Thse charts track the amount of time from when the Proxy sends out a data point to when it receives an acknowledgment from the backend.
2. Ensure that this amount of time is in the range of hundreds of milliseconds. If the time reaches the range of seconds, check for network latency issues.


#### Proxy Queue Issues: Memory Low on Proxy Host

The proxy configuration property `memGuardFlushThreshold` is meant to protect against out of memory situations. If heap usage on the Proxy exceeds this threshold, data in memory will be flushed to disk and queued.

**Troubleshooting & Further Investigation:**
<!---Would we recommend changing memGuardFlushThreshold? I don't understand-- do we get a host with more memory, or do we change what the proxy can consume?--->

1. Find the  **Queueing Reasons** chart in the **Wavefront Service and Proxy Data** dashboard and examine the `memoryPressure` metric.
2. If there's a problem, consider increasing memory limits for the host server.


## Find Data Delays Caused by Data Pipeline Issues

If your data travels through a pipeline before reaching the Wavefront Proxy or before being direct ingested to the Tanzu Observability backend, the pipeline itself may introduce delays to the ingestion process.

Troubleshooting & Further Investigation:
One area that may provide a clue is looking at the Data Received Lag charts in the Proxy Troubleshooting section of the Wavefront Service and Proxy Data dashboard. This helps if the data points are timestamped at or near the source of the data. The underlying metric used in these charts tracks the difference between the system time of the Proxy host and the timestamp of data points. This difference could provide some insight into how long it takes a data point to traverse through the data pipeline and reach the Proxy. Every pipeline will inherently have its own latencies. Understanding this will help with expectations on when data should show up in charts. It will also help with crafting queries so that this latency is taken into account.



## Find Data Delays Caused by High Rate of New IDs

Components of each data point are converted into IDs at the backend prior to persistence in storage. These components include metric name, source name, and the point tag key and value combination. Whenever a new name is detected by the backend, a new ID will need to be generated. This adds to the ingestion time. This is negligible when the rate of new IDs is relatively low. However, when the rate is high, this can lead to a backlog of items that need an ID. This backlog results in delays in ingestion.


Troubleshooting & Further Investigation:
The Wavefront Usage integration includes several alert examples that can be used to catch when there is a high rate of new IDs. A high rate of new IDs could indicate a cardinality issue with your data shape. For instance, if a timestamp was included as a point tag, this would lead to a high number of unique point tags, inflating the cardinality of the applicable timeseries. This would be problematic when it comes time to query that data. See Tanzu Observability Data Naming Best Practices for best practices.



## Find Blocked Data Issues

The Wavefront proxy or the Wavefront service block data for a variety of reasons. When this happens, the data is dropped and is be ingested. If data is blocked at the proxy, the Proxy log includes a message indicating the reason.

* Blocked Data: Incorrect Timestamps
* Invalid Data Format
* Proxy Preprocessor Rules

### Blocked Data: Incorrect Timestamps

By default, the proxy and the Wavefront service allow data points that are timestamped between:
* 8760 hours (1 year) ago
* 24 hours (1 day) ahead of the current time

This functionality supports back-fill of old data or pre-fill of data. Make sure that the timestamp of your data points is within this range since anything outside this range will be rejected at the proxy or not ingested by the Wavefront service.


### Blocked Data: Invalid Data Format

The Proxy supports a variety of data formats. Typically different ports would be set up to support different formats. Ensure that data is being sent to the proper port.

For data that is in the Tanzu Observability Data Format, see this page for more information on what is and is not valid. To summarize, each component of the data point has a set of allowed characters and length limits. There is also a limit, by default, of 20 point tags per data point.



### Blocked Data: Proxy Preprocessor Rules

The Proxy supports setting up custom preprocessor rules to allow or block certain data. Ensure that your data meets all the rules set-up at the Proxy. You may need to reach out to the team that manages the Proxy and/or those rules.
