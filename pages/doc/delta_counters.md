---
title: Delta Counters
keywords: metrics
tags:
sidebar: doc_sidebar
permalink: delta_metrics.html
summary: Learn when and how to use delta metrics
---
Counters support aggregating metric information such as the number of hits on a web page, how many users log into a portal, etc. Delta counters make counter functionality available for serverless Function-as-a-service environments and some other use cases.

## Gauges, Counters, and Delta Counters
Wavefront users primarily look at two types of metrics:
* Gauges show the current state of something, such as the CPU or memory that's in use.
* Counters show information over time, such as how many network connections failed and succeded. It's also possible to wrap a gauge with certain functions such as `sum()` or `integral()` to get a counter metric.

   Counters increase over time but might briefly go to zero, for example, in case of a network outage. In many cases, users wrap `rate()` around a counter.

In most cases, basic gauges and counters meet the needs of Wavefront users. The client either sends counter metrics to Wavefront, or Wavefront Query Language functions aggregate or combine metrics. But if you're monitoring an environment where multiple sources perform the same function, delta counters are the solution because the aggregation of the metrics happens at he server side (the Wavefront service performs the aggregation for you).

## Where Are Delta Counters Userful?

Delta counters are useful in all situations where you want to combine metrics from several sources and there isn't an easy way to do so.

* If you're monitoring a Function-as-a-Service (FaaS or serverless) environment, a large number of functions execute simultaneously. It's not possible to monitor bursty traffic like that without losing significant parts of the metrics information to collision.
* Before the release of delta counters, it was not possible to collect metrics from two sets of application each using a separate Telegraf instance behind a load balancer,
* Delta counters also support log integration. See xref to blog

**Note**: Even in a serverless environment, not all metrics have to be delta counters.
* Use delta counters for metrics that run in short busts of high-volume traffic where collisions can become a big problem.
* Use regular counters for monitoring over long time spans. In that case, a small number of metrics lost to collision are less of a problem.

### Example: Monitoring AWS Lambda

AWS Lambda allows you to specify functions you want to run - and then you can stop worrying about the function execution. For example, assume you want to generate a thumbnail each time any of your users uploads images to their folder. You can write a Lambda function that monitors the folders, and takes care of thumbnail generation for you. AWS runs as many of the functions as necessary to handle the current workload at any time.

However, when Wavefront engineers developed the AWS integration to support monitoring AWS Lambda, they found that regular counters were not a good solution.
* If you use the name of the function as the source name, collision is highly likely.
* If you use an ephemeral UUID as the source, you create a series each time a Lambda function is invoked, but you admit only 1 point per series. In addition, collision can lead to lost points.
See XXLink to BlogXX for a detailed explanation of the shortcomings of using regular counters for monitoring AWS Lambda functions.

Delta counters offer a solution to the problem. Wavefront aggregates the metrics that come from different invocations of the same functions. The AWS Lambda integration allows you to monitor your Lambda environment with several delta counters and a few counters. You can also monitor business metrics by defining your own delta counters. See XXLink to Lambda pageXX for details.

### Other Examples

Delta Functions are also useful in some other situations where the Wavefront service cannot determine whether metrics from several sources are best grouped as one metric.

* Suppose your environment has several application execution environments, each with a Telegraf instance, behind a load balancer. For that case, you want to combine the metrics coming from one environment with the metrics from another environment.
* Similarly, you cannot currently have two instances of the Wavefront proxy behind a load balancer. With the support of delta counters, the aggregation can be done on the server and Wavefront can now support this use case.
* Finally,

## How to Set Up Delta Counters

You can set up delta counters in several ways:
* If integration, metrics collected
* If integration, custom metrics
* If no integration, directly to proxy or service. 

## Delta Counter Caveats

If you use delta counters in your environment, pay attention to the following special characeristics.
* When a counter is emitted with a timestamp, Wavefront uses that timestamp. In contrast, a delta counter has as its timestamp the time at which the point was aggregated on the Wavefront server side.
* If the source stops reporting, Wavefront initially continues reporting once a minute for 1 hour. If the source does not report for an hour, Wavefront resets a delta counter to 0 and stops aggregating.
