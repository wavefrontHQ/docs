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

Wavefront users primarily look at two types of metrics:
* Gauges show the current state of something, such as the CPU or memory that's in use.
* Counters show information over time, such as how many network connections failed and succeded. It's also possible to wrap a gauge with certain functions such as `sum()` or `integral()` to get a counter metric.

   Counters increase over time but might briefly go to zero, for example, in case of a network outage. In many cases, users wrap `rate()` around a counter.

In most cases, basic gauges and counters meet the needs of Wavefront users. The data source might send counter metrics to Wavefront, or Wavefront Query Language functions aggregate or combine metrics. But if you're monitoring an environment where multiple sources perform the same function, delta counters are the solution because the aggregation of the metrics happens at the server side (the Wavefront service performs the aggregation for you).

## Where Are Delta Counters Userful?

Delta counters are useful in all situations where you want to combine metrics from several sources.

* If you're monitoring a Function-as-a-Service (FaaS or serverless) environment, a large number of functions execute simultaneously. It's not possible to monitor bursty traffic like that without losing significant parts of the metrics information to collision.
* Before the release of delta counters, it was not possible to collect metrics from two sets of application each using a separate Telegraf instance behind a load balancer.
* Delta counters also support log integration. See xref to blog

Even in a serverless environment, it makes sense to collect counter metrics and delta counter metrics.
* Use regular counters for monitoring over long time spans. In that case, a small number of metrics lost to collision are not a problem.
* Use delta counters for metrics that run in short busts of high-volume traffic where collisions can become a big problem.


### Example: Monitoring AWS Lambda

AWS Lambda allows you to specify functions you want to run - and then you can stop worrying about the function execution. For example, assume you want to generate a thumbnail each time any of your users uploads images to their folder. You can write a Lambda function that monitors the folders, and takes care of thumbnail generation for you. At any time, AWS runs as many of the functions as necessary to handle the current workload.

When Wavefront engineers developed the AWS integration to support monitoring AWS Lambda, they found that regular counters were not a good solution.
* If you use the name of the function as the source name, collision is highly likely.
* If you use an ephemeral UUID as the source, you create a series each time a Lambda function is invoked, but you admit only 1 point per series. In addition, collision can lead to lost points.
See XXLink to BlogXX for a detailed explanation of the shortcomings of using regular counters for monitoring AWS Lambda functions.

Delta counters offer a solution to the problem. The Wavefront service aggregates the metrics that come from different invocations of the same functions. The AWS Lambda integration allows you to monitor your Lambda environment with several delta counters and a few counters. You can also monitor business metrics by defining your own delta counters. See XXLink to Lambda pageXX for details.

### Other Examples

Delta Functions are also useful in some other situations where the Wavefront service cannot determine whether metrics from several sources are best grouped as one metric.

* Suppose your environment has several application execution environments, each with a Telegraf instance, behind a load balancer. For that case, you want to combine the metrics coming from one environment with the metrics from another environment.
* Before delta counters, it was not possible to have two instances of the Wavefront proxy behind a load balancer. With the support of delta counters, the aggregation can be done on the server and Wavefront can now support this use case if you use delta counters.
* Using the delta counters, we were able to solve our aggregation of counters across multiple apps for our logs to metrics Wavefront integration. We switched from raw counters to delta counters in the logs-to-metrics integration and report those deltas to Wavefront. The Wavefront service does the aggregation from multiple log sources.

## How to Set Up Delta Counters

You can set up delta counters in several ways:
* If you are using the Wavefront AWS Lambda integration, we collect some standard metrics for you as delta counters. You can see these counters in the integration's dashboard, and use them in queries and alerts just like other counters. For example, you can wrap a `rate()` function around your delta counter if you want to avoid 0 results in case of counter reset.
* The AWS Lambda integration includes instructions for using Python, Go, or Node.js to retrieve business metrics for your Lambda function.
* If you want to send metrics directly to the Wavefront proxy or the Wavefront service, you prefix each metric with a delta character so the Wavefront service knows these metrics are part of a delta counter, as shown in the following sample code snippet from https://github.com/wavefrontHQ/python-client/blob/master/wavefront_pyformance/wavefront_pyformance/delta.py

```
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"

...
name = name if _has_delta_prefix(name) else DeltaCounter.DELTA_PREFIX + name
```

## Using Delta Counters

Delta counters are like other counters in many ways.
* You can apply query language functions such as `rate()` to a delta counter.
* You can create alerts that use delta counters in the condition, for example, to monitor whether the counter goes beyond a certain threshold.


Delta counters have some special characeristics.
* A delta counter has as its timestamp the time at which the point was aggregated on the Wavefront service side. When a regular counter is emitted with a timestamp, Wavefront uses that timestamp.
* If the source for your delta counters stops reporting, Wavefront initially continues reporting once a minute for 1 hour. If the source does not report for an hour, Wavefront resets a delta counter to 0 and stops aggregating.
