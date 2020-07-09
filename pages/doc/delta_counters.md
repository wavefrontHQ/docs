---
title: Cumulative Counters and Delta Counters
keywords: metrics
tags:
sidebar: doc_sidebar
permalink: delta_counters.html
summary: Learn when and how to use cumulative counters and delta counters.
---
Wavefront supports [several types of metrics](metric_types.html), including 2 kinds of counters.
* **Cumulative counters** (usually called **counters** in this doc set) monotonically increasing counters. They're useful for aggregating metric information such as the number of hits on a web page, how many users log into a portal, etc. They're usually used with `rate()` or a similar function.
* **Delta counters** (sometimes called periodic counters) measure the **change** since a metric was last recorded. For example, metrics for request count could be delta counters. Each value records how many requests were received since the last data point was recorded.

## Counters and Delta Counters Basics

It often makes sense to collect both counter metrics and delta counter metrics, especially in serverless environments. Starting with release 2020.26, you use a different function for the different types of counters.

<table>
<tbody>
<thead>
<tr><th width="20%">Type</th><th width="60%">Description</th><th width="20%">Function</th></tr>
</thead>
<tr><td>Cumulative counter</td>
<td markdown="span">For monitoring over long periods of time, where a small number of metrics lost to collision are not a problem.
</td>
<td><strong>ts()</strong> </td></tr>
<tr>
<td markdown="span">Delta counter</td>
<td>Delta counters bin to a minute timestamp and treat writes to the same bin as deltas. Accurately accumulate points when shorts bursts of high-volume traffic is experienced and collisions can become a problem.</td>
<td><strong>cs()</strong></td>
</tr>
</tbody>
</table>

The following illustration compares a counter and a delta counter.
* The *counter* mycounter sends 3 data points to the Wavefront service. Wavefront stores each value with its timestamp. When you run a query, such as `integral()`, the Wavefront service fetches the stored values, aggregates them, and returns the result.
* In the *delta counter* use case, a FaaS environment runs the function in multiple function invocation instances and sends the points to the Wavefront service. The Wavefront service aggregates the points and stores the result. When the user runs a query, the Wavefront service fetches the already aggregated value.

![counters_delta_counters](images/counter_delta_counter.png)

### Where Are Cumulative Counters Useful?

Counters show information over time and are useful for aggregating metrics information. Counter metrics usually increase over time but might reset back to zero, for example, when a service or system restarts. Users can wrap [**rate()**](ts_rate.html) around a counter if they want to ignore temporary 0 values.

### Where Are Delta Counters Useful?

Users who are monitoring an environment where multiple sources perform the same function can't use cumulative counters. Lost points because of collision are likely. Wavefront solves the problem by performing the aggregation on the server side. Delta counters are therefore especially suitable for serverless Function-as-a-service environments and some other use cases.

Delta counters are useful if you want to combine points that come in at the same time from several sources. For example:

* You're monitoring a Function-as-a-Service (FaaS or serverless) environment, and many functions execute simultaneously. It's not possible to monitor bursty traffic like that without losing some reported metric points due to collision.
* You want to collect metrics from two sets of applications, each using a separate Telegraf instance behind a load balancer.
![telegraf and delta_counters](images/delta_metrics_telegraph.png)
* You want to aggregate counters across multiple apps. For example, Wavefront uses delta counters for the [logs to metrics Wavefront integration](integrations_log_data.html).

For more on delta counter use cases, see our blog [Monitoring Apps in the Serverless World: Introducing Wavefront Delta Counters](https://www.wavefront.com/monitoring-apps-in-the-serverless-world-part-2-introducing-wavefront-delta-counters/)


### Example: Monitoring AWS Lambda with Delta Counters

AWS Lambda allows you to specify functions that you want to run -- and then you can stop worrying about the function execution. For example, assume that you want to generate a thumbnail each time any of your users uploads images to a folder. You can write a Lambda function that monitors the folders and takes care of thumbnail generation for you. AWS runs as many of the functions as necessary to handle the current workload, and you don't have to worry about scaling up or down.

Delta counters make monitoring easy for this use case. The Wavefront service aggregates the metrics that come from different invocations of the same function. The Wavefront AWS Lambda Functions integration comes preconfigured with several delta counters and a gauge for standard metrics. In addition, you can monitor custom business metrics by using our SDK to define a wrapper for your AWS Lambda function. See the [AWS Lambda Functions Integration](aws-lambda-functions.html) for setup instructions.


## Using Delta Counters

To use delta counters, you have several options:
* Use the `cs()` function if you want to treat a set of metrics as delta counters.
* Use one of our sample libraries. See <strong>SDKs</strong> below.
* Send metrics as delta counters explicitly by specifying a delta character as the first letter of the metric name.

### The cs() Function

If you use the `cs()` function (instead of the `ts()` function) with a query, Wavefront treats the incoming data as delta counters:
* Bin to a minute timestamp
* Treat write operations to the same bin as deltas.

### SDKs

You can use our SDKs to make your metric a delta counter.

**AWS Lambda SDKs** - These AWS Lambda wrappers illustrate how to use delta counters:
  - [Wavefront Go Wrapper for AWS Lamda](https://github.com/wavefrontHQ/wavefront-lambda-go)
  - [Wavefront Node.js Wrapper for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-nodejs)
  - [Wavefront Python Wrapper for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-python)

**Python Client** - For an example of using delta counters without an integration, see the [delta.py file](https://github.com/wavefrontHQ/wavefront-pyformance/blob/master/wavefront_pyformance/delta.py), which is part of the [wavefront_pyformance module](https://github.com/wavefrontHQ/wavefront-pyformance).


### Delta Counter Proxy Configuration Properties

We support the following [proxy configuration properties](proxies_configuring.html#general-proxy-properties-and-examples) with delta counters.

- **deltaCounterPorts**: Comma-separated list of ports that accept only delta counter data.
- **deltaCounterAggregationInterval**: Time that the proxy spends aggregating data before sending them to the Wavefront Service. Default is 30 seconds.

### Delta Prefix

Before Wavefront supported the `cs()` function, it was necessary to use a delta (∆) character prefix to have data treated as delta counters. The prefix is still supported, but no longer necessary if you use the `cs()` function. If you want to send metrics as delta counters to the Wavefront proxy or directly to the Wavefront service, you must prefix each metric with a delta (∆) character, as shown in the following [sample code snippet](https://github.com/wavefrontHQ/wavefront-pyformance/blob/master/wavefront_pyformance/delta.py).

```
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"
```

{% include note.html content="In queries, you don't have to specify the delta character. For example, you query `∆aws.lambda.wf.invocations.count` as `ts(aws.lambda.wf.invocations.count)`." %}

### Best Practices

Delta counters are like other counters in many ways.
* You can apply query language functions such as `rate()` to a delta counter.
* You can create alerts that use delta counters in the condition, for example, to monitor whether the counter goes beyond a certain threshold.


Delta counters have some special characeristics.
* The timestamp of a delta counter is the time at which the point was *aggregated* by the Wavefront service. For regular counters, the timestamp is the time when the point is *emitted*.
* If the source for your delta counters stops reporting, Wavefront continues reporting once a minute for 1 hour. If the source does not report for an hour, Wavefront resets the delta counter to 0, stops aggregating, and stops reporting.

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
