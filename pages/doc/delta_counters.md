---
title: Delta Counters
keywords: metrics
tags:
sidebar: doc_sidebar
permalink: delta_counters.html
summary: Learn when and how to use delta counters
---
Counters support aggregating metric information such as the number of hits on a web page, how many users log into a portal, etc. Delta counters make counter functionality available for serverless Function-as-a-service environments and some other use cases.


## Gauges, Counters, and Delta Counters

Wavefront users primarily look at gages and counters:
* Gauges show the current state of something, such as the CPU or memory that's currently in use.
* Counters show information over time, such as how many network connections failed and succeded. It's also possible to wrap a gauge with certain functions such as `sum()` or `integral()` to get a counter metric.

   Counters increase over time but might briefly go to zero, for example, in case of a network outage. In many cases, users wrap `rate()` around a counter because counter resets are irrelevant to the actual count.

Users who are monitoring an environment where multiple sources perform the same function can't use regular counters because of collision. For those users, we offer delta counters. For delta counters Wavefront performs the aggregation at the server side. You get the exact number, for example, for how often a Lambda function executes.

## Where Are Delta Counters Useful?

Delta counters are useful if you want to combine metrics from several sources, and if the name of the source is irrelevant. For example:

* If you're monitoring a Function-as-a-Service (FaaS or serverless) environment, many functions execute simultaneously. It's not possible to monitor bursty traffic like that without losing significant parts of the metrics information to collision. You want to know how often a FaaS function executed, but you don't care which source executed the function.
* You want to collect metrics from two sets of application each using a separate Telegraf instance behind a load balancer. Again, the source is irrelevant -- you want to know the actual metrics.
![telegraf and delta_counters](images/delta_metrics_telegraph.svg)
* Delta counters also support log integration.

{::comment}See xref to blog{:/comment}

Even in a serverless environment, it makes sense to collect counter metrics and delta counter metrics.
* Use regular counters for monitoring over long time spans. In that case, a small number of metrics lost to collision are not a problem.
* Use delta counters for metrics that run in short busts of high-volume traffic where collisions can become a big problem.


### Example: Monitoring AWS Lambda

AWS Lambda allows you to specify functions you want to run -- and then you can stop worrying about the function execution. For example, assume you want to generate a thumbnail each time any of your users uploads images to their folder. You can write a Lambda function that monitors the folders, and takes care of thumbnail generation for you. At any time, AWS runs as many of the functions as necessary to handle the current workload.

When Wavefront engineers developed the AWS integration to support monitoring AWS Lambda, they found that regular counters were not a good solution.
* If you use the name of the function as the source name, collision is highly likely.
* If you use an ephemeral UUID as the source, you create a series each time a Lambda function is invoked, but you admit only 1 point per series. In addition, collision can lead to lost points.
{::comment}See Link to Blog for a detailed explanation of the shortcomings of using regular counters for monitoring AWS Lambda functions.{:/comment}

Delta counters offer a solution to the problem. The Wavefront service aggregates the metrics that come from different invocations of the same functions. The AWS Lambda integration allows you to monitor your Lambda environment with several delta counters and a few counters. You can also monitor business metrics by defining your own delta counters. {::comment}See Link to Lambda pageXX for details.{:/comment}

### Other Examples

Delta Functions are also useful in some other situations where the Wavefront service cannot determine whether metrics from several sources are best grouped as one metric.

* Suppose your environment has several application execution environments, each with a Telegraf instance, behind a load balancer. For that case, you want to combine the metrics coming from one environment with the metrics from another environment.
* Before delta counters, it was not possible to have two instances of the Wavefront proxy behind a load balancer. With the support of delta counters, the aggregation can be done on the server and Wavefront can now support this use case if you use delta counters.
* Using the delta counters, we were able to solve our aggregation of counters across multiple apps for our logs to metrics Wavefront integration. We switched from raw counters to delta counters in the logs-to-metrics integration and report those deltas to Wavefront. The Wavefront service does the aggregation from multiple log sources.

## How to Set Up Delta Counters

Wavefront already collects some delta counters, and makes it easy to collect custom metrics with delta counters:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Use Case</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>AWS Lambda standard metrics</td>
<td>We collect AWS Lambda standard metrics for you. Some metrics are counters, others are delta counters. You can see these counters in the integration's dashboard, and use them in queries and alerts just like other counters. For example, you can wrap a <code>rate()</code> function around your delta counter if you want to for the counter to continue increasing case of counter reset.</td></tr>
<tr>
<td>AWS business metrics</td>
<td>The AWS Lambda integration includes instructions for using Python, Go, or Node.js to retrieve business metrics for your Lambda function. </td></tr>
<tr>
<td>Send metrics directy to Wavefront</td>
<td>If you want to send metrics directly to the Wavefront proxy or the Wavefront service, you prefix each metric with a delta character so the Wavefront service knows these metrics are part of a delta counter, as shown in the following sample code snippet from https://github.com/wavefrontHQ/python-client/blob/master/wavefront_pyformance/wavefront_pyformance/delta.py

<code>
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"

...
name = name if _has_delta_prefix(name) else DeltaCounter.DELTA_PREFIX + name</code></td></tr>
</tbody>
</table>

## Using Delta Counters

Delta counters are like other counters in many ways.
* You can apply query language functions such as `rate()` to a delta counter.
* You can create alerts that use delta counters in the condition, for example, to monitor whether the counter goes beyond a certain threshold.


Delta counters have some special characeristics.
* The timestamp of a delta counter is the time at which the point was *aggregated* on the Wavefront service side. For regular counters, the timestamp is the time when the counter is *emitted*.
* If the source for your delta counters stops reporting, Wavefront initially continues reporting once a minute for 1 hour. If the source does not report for an hour, Wavefront resets a delta counter to 0 and stops aggregating.
