---
title: Cumulative Counters and Delta Counters
keywords: metrics
tags:
sidebar: doc_sidebar
permalink: delta_counters.html
summary: Learn when and how to use cumulative counters and delta counters.
---
VMware Tanzu Observability (formerly known as VMware Aria Operations for Applications) supports [several types of metrics](metric_types.html), including 2 kinds of counters.

* **Cumulative counters** (usually called **counters** in this doc set) monotonically increasing counters. They're useful for aggregating metric information such as the number of hits on a web page, how many users log into a portal, etc. They're usually used with `rate()` or a similar function.
* **Delta counters** (sometimes called periodic counters) measure the **change** since a metric was last recorded. For example, metrics for request count could be delta counters. Each value records how many requests were received since the last data point was recorded.

## Video

Learn the difference between cumulative counters and delta counters and see how to manage delta counters from the UI. Note that this video was created in 2020 and some of the information in it might have changed. It also uses the 2020 version of the UI.

<p>
<iframe id="kmsembed-1_khsugqea" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_khsugqea/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="delta counters video, part animation, part screen capture"></iframe>
</p>

## Counters and Delta Counters Basics

It often makes sense to collect both counter metrics and delta counter metrics -- though in some serverless environments only delta counters are available. You use a different function for the different types of counters.

<table>
<tbody>
<thead>
<tr><th width="20%">Type</th><th width="60%">Description</th><th width="20%">Function</th></tr>
</thead>
<tr><td>Cumulative counter</td>
<td markdown="span">Counters that increase in value over time, for example, the total number of errors or bytes received.
</td>
<td><strong>ts()</strong> </td></tr>
<tr>
<td markdown="span">Delta counter</td>
<td>Delta counters bin to a minute timestamp and treat writes to the same bin as deltas. Accurately accumulate points when shorts bursts of high-volume traffic is experienced and collisions can become a problem.</td>
<td><strong>cs()</strong></td>
</tr>
</tbody>
</table>

### Example

The following illustration contrasts cumulative counters and delta counters with a simple example:

* Error data are being sent to Tanzu Observability. 5 errors in the first minute, 17 in the second, and 8 in the third.
* The top row shows cumulative counter behavior. In many cases, the data actually come in as cumulative counters:
  - The running total of the errors (5, 22, 30) is ingested and stored.
  - The `ts()` query shows a chart with values increasing over time.
  - To get the rate (errors per second) we wrap the query with `rate()`
* The bottom row shows delta counter behavior.
  - The delta for the errors is ingested. In addition, all errors for 1 minutes are binned (not shown here).
  - The `cs()` query shows a chart with the delta values.
  - To get the rate (errors per second) we divide the query by 60. The result is the same as using `rate()` with the `ts()` query.

![counter ingestion, query with ts and cs, and getting the rate for each. Details in explanation](images/counters_and_delta_counters.png)

### Where Are Cumulative Counters Useful?

Counters show information over time and are useful for aggregating metrics information. Counter metrics usually increase over time but might reset back to zero, for example, when a service or system restarts. Users can wrap [**rate()**](ts_rate.html) around a counter if they want to ignore temporary 0 values.

### Where Are Delta Counters Useful?

Users who are monitoring an environment where multiple sources perform the same function can't use cumulative counters. Lost points because of collision are likely. We solve the problem by performing the aggregation on the server side. Delta counters are therefore especially suitable for serverless Function-as-a-service environments and some other use cases.

Delta counters are useful if you want to combine points that come in at the same time from several sources. For example:

* You're monitoring a Function-as-a-Service (FaaS or serverless) environment, and many functions execute simultaneously. It's not possible to monitor bursty traffic like that without losing some reported metric points due to collision.
* You want to collect metrics from two sets of applications, each using a separate Telegraf instance behind a load balancer.
![telegraf and delta_counters](images/delta_metrics_telegraph.png)
* You want to aggregate counters across multiple apps. For example, the [logs to metrics integration](integrations_log_data.html) uses delta counters.

For more on delta counter use cases, see the blog [Monitoring Apps in the Serverless World: Introducing Delta Counters](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/monitoring-apps-in-the-serverless-world-part-2-introducing-wavefront-delta-counters)


### Example: Monitoring AWS Lambda with Delta Counters

AWS Lambda allows you to specify functions that you want to run -- and then you can stop worrying about the function execution. For example, assume that you want to generate a thumbnail each time any of your users uploads images to a folder. You can write a Lambda function that monitors the folders and takes care of thumbnail generation for you. AWS runs as many of the functions as necessary to handle the current workload, and you don't have to worry about scaling up or down.

Delta counters make monitoring easy for this use case. Tanzu Observability aggregates the metrics that come from different invocations of the same function. The AWS Lambda Functions integration comes preconfigured with several delta counters and a gauge for standard metrics. In addition, you can monitor custom business metrics by using our SDK to define a wrapper for your AWS Lambda function. See the [AWS Lambda Functions Integration](aws-lambda-functions.html) for setup instructions.


## Using Delta Counters

You have to send and query delta counters like this:

To <strong>send</strong> metrics as delta counters explicitly specify a delta character as the first letter of the metric name. 
{% include note.html content="If a delta counter is older than 15 minutes (when our service receives the data), the data is not ingested, and you won't see the data in our service. " %}
<table style="width: 100%;">
<tbody>
<tr>
<td>To <strong>query</strong> delta counter metrics
<ul>
<li>Use an SDK</li>
<li>Use <strong>cs()</strong> (instead of <strong>ts()</strong> in the Query Editor, as discussed next.</li>
<li>Select <strong>Delta Counters</strong> in Chart Builder. </li></ul></td>
<td><img src="/images/v2_add_metric.png" alt="Chart Builder with delta counters selected"/> </td>
</tr>
<tr>
<td width="60%">To <strong>examine all delta counters</strong> in your environment, select <strong>Browse &gt; Delta Counters</strong>. The process is the same as examining metrics in the <a href="metrics_managing.html#metrics-browser"> Metrics Browser</a>.
</td>
<td width="40%"><img src="/images/delta_counters_browse.png" alt="Screenshot showing Browse > Delta Counters"/></td>
</tr>
</tbody>
</table>

{% include important.html content="If a delta counter records 0 (no values received or zero value ingested) for any minute bucket, that value doesn’t show up in the chart until a non-zero value appears. For example assume t1=1, t2-t5 (no data or zero value ingested), t6=1. The 0 value for t2-t5 shows up in the chart after t6=1 arrives even though either no value or 0 value were ingested during t2-t5 hence the corresponding count is 0." %}


### The cs() Function

If you use the `cs()` function (instead of the `ts()` function) with a query, the query engine treats the incoming data as delta counters:
* Bin to a minute timestamp
* Treat write operations to the same bin as deltas.

### SDKs and Examples

You can use our SDKs to make your metric a delta counter.

<strong>SDKs</strong>

* Java - [Dropwizard Metrics SDK](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java)
* Java - [Spring Micrometer](https://micrometer.io/)
* C# - [App Metrics Reporter](https://github.com/wavefrontHQ/wavefront-appmetrics-sdk-csharp)
* Python - [wavefront-pyformance](https://github.com/wavefrontHQ/wavefront-pyformance)
* Go - [go-metrics-wavefront](https://github.com/wavefrontHQ/go-metrics-wavefront)

<strong>Examples</strong>

* **AWS Lambda SDKs** - These AWS Lambda wrappers illustrate how to use delta counters:
  - [Go Wrapper for AWS Lamda](https://github.com/wavefrontHQ/wavefront-lambda-go)
  - [Node.js Wrapper for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-nodejs)
  - [Python Wrapper for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-python)

* **Python Client** - For an example of using delta counters without an integration, see the [delta.py file](https://github.com/wavefrontHQ/wavefront-pyformance/blob/master/wavefront_pyformance/delta.py), which is part of the [wavefront-pyformance module](https://github.com/wavefrontHQ/wavefront-pyformance).


### Delta Counter Proxy Configuration Properties

We support the following [proxy configuration properties](proxies_configuring.html#configuration-properties) with delta counters.

- **deltaCounterPorts**: Comma-separated list of ports that accept only delta counter data.
- **deltaCounterAggregationInterval**: Time that the proxy spends aggregating data before sending them to Tanzu Observability. Default is 30 seconds.

### Delta Prefix

If you want to send metrics as delta counters to the Wavefront proxy or directly to Tanzu Observability, prefix each metric with a delta (∆) character, as shown in the following [sample code snippet](https://github.com/wavefrontHQ/wavefront-pyformance/blob/master/wavefront_pyformance/delta.py).

```
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"
```

{% include note.html content="In queries, you don't have to specify the delta character prefix. For example, you query `∆aws.lambda.wf.invocations.count` as `cs(aws.lambda.wf.invocations.count)`." %}


## Using Cumulative Counters

Cumulative counters are for incrementally increasing values such as the number of bytes received.

### Counter Example (Count Total)

In most cases, you can get the information you need from a counter as follows:

1. A counter usually represents something like "how many requests have been processed" or "how many errors happened". You get the metric like this:
```
   ts(~sample.network.bytes.received)
```
2. You use the `rate()`function to get the corresponding per-second rate so you know, for example, "how many requests have been processed per second?"  or "How many errors are happening per second":
```
   rate(ts(~sample.network.bytes.received))
```
3. There are often multiple time series that have the counter (e.g. coming from different sources). Each time series reports the count of the requests received or errors. If you're interested in the total count across your system, you can use `sum()` to sum it up into a single time series.
```
sum(rate(ts(~sample.network.bytes.received)))
```

###  Counter Example (Count Total Over Time Period)

If you want to count the total number of occurrences of a certain time period, the syntax is slightly more complex. Because counters commonly reset to zero, you need a query that counts the total number of increments over the time period you're looking at. You want to ignore any counter resets.

Here, we want to get the number of errors for 1 day.

1. We start by wrapping the counter with `ratediff()`, which, in contrast to `rate()` returns the absolute difference between incrementing data points without dividing by the number of seconds between them.
```
   ratediff(ts(the.counter))
```
2. We use `align` to group the data values of the time series into buckets 1 minute.
```
   align(1m, sum, ratediff(ts(the.counter)))
```
3. We use `rawsum()` to combine all time series into one series, and to not use interpolation.
```
    rawsum(align(1m, sum, ratediff(ts(the.counter))))
```
4. Finally, we get the result for 1 day by using the `msum()` function.
```
    msum(1d, rawsum(align(1m, sum, ratediff(ts(the.counter)))))
```

### Gauge into Counter

To turn a gauge into a counter, you can use query language functions such as [integral](ts_integral.html). For example, you could convert a `~alert.checking_frequency.My_ID` to see the trend in checking frequency instead of the raw data.
```
    integral(ts(~alert.checking_frequency.My_ID))
```
