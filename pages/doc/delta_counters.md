---
title: Delta Counters
keywords: metrics
tags:
sidebar: doc_sidebar
permalink: delta_counters.html
summary: Learn when and how to use delta counters
---
Wavefront supports [several types of metrics](metric_types.html). For example, counters support aggregating metric information such as the number of hits on a web page, how many users log into a portal, etc. Delta counters make counter functionality available for serverless Function-as-a-service environments and some other use cases.

For example, users who are monitoring an environment where multiple sources perform the same function can't use regular counters. Lost points because of collision are likely. Wavefront solves the problem by performing the aggretation on the server side.


## Where Are Delta Counters Useful?

Delta counters are useful if you want to combine points come in at the same time from several sources. For example:

* If you're monitoring a Function-as-a-Service (FaaS or serverless) environment, many functions execute simultaneously. It's not possible to monitor bursty traffic like that without without losing reported metric points due to collision.
* You want to collect metrics from two sets of application each using a separate Telegraf instance behind a load balancer.
![telegraf and delta_counters](images/delta_metrics_telegraph.svg)
* Wavefront uses delta counters to aggregate counters across multiple apps for the [logs to metrics Wavefront integration](integrations_log_data.html).

For more on delta counter use cases, see our blog [Monitoring Apps in the Serverless World: Introducing Wavefront Delta Counters](https://www.wavefront.com/monitoring-apps-in-the-serverless-world-part-2-introducing-wavefront-delta-counters/)


Even in a serverless environment, it makes sense to collect both counter metrics and delta counter metrics.
* Use regular counters for monitoring over long time spans. For long spans, a small number of metrics lost to collision are not a problem.
* Use delta counters to accurately accumulate points where shorts bursts of high-volume traffic is experienced and collisions can become a problem.


### Example: Monitoring AWS Lambda

AWS Lambda allows you to specify functions you want to run -- and then you can stop worrying about the function execution. For example, assume you want to generate a thumbnail each time any of your users uploads images to their folder. You can write a Lambda function that monitors the folders and takes care of thumbnail generation for you. AWS runs as many of the functions as necessary to handle the current workload, and you don't have to worry about scaling up or down.

Delta counters make it easy to do monitoring for this use case. The Wavefront service aggregates the metrics that come from different invocations of the same functions. The Wavefront AWS Lambda Functions integration comes preconfigured with several delta counters and several counters for standard metrics. In addition, you can monitor business metrics by using our SDK to define a wrapper for your AWS Lambda function. See [AWS Lambda Functions Integration](aws-lambda-functions.html) for setup instructions.


## Using Delta Counters
Start with our sample libraries - or you can send metrics as delta counters explicitly if you specify a delta character as the first letter.

### APIs
You can use the APIs in our libraries to make your metric a delta counter.

**AWS Lambda SDKs** - These AWS Lambda wrappers illustrate how to use delta counters:
  - [Wavefront Go Wrapper for AWS Lamda](https://github.com/wavefrontHQ/wavefront-lambda-go)
  - [Wavefront Node.js Wrapper for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-nodejs)
  - [Wavefront Python Wrapper for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-python)

**Python Client** - For an example of using delta counters without an integration, see the [delta.py file](https://github.com/wavefrontHQ/wavefront-pyformance/blob/master/wavefront_pyformance/delta.py), which is part of the [wavefront_pyformance module](https://github.com/wavefrontHQ/wavefront-pyformance).

### Delta Prefix

If you want to send metrics as delta counters to the Wavefront proxy or directly to the Wavefront service, you must prefix each metric with a delta (∆) character, as shown in the following [sample code snippet](https://github.com/wavefrontHQ/wavefront-pyformance/blob/master/wavefront_pyformance/delta.py).

```
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"
```

**Note:** In queries, you don't have to specify the delta character. For example, you query `∆aws.lambda.wf.invocations.count` as `ts(aws.lambda.wf.invocations.count)`.

### Best Practices

Delta counters are like other counters in many ways.
* You can apply query language functions such as `rate()` to a delta counter.
* You can create alerts that use delta counters in the condition, for example, to monitor whether the counter goes beyond a certain threshold.


Delta counters have some special characeristics.
* The timestamp of a delta counter is the time at which the point was *aggregated* by the Wavefront service. For regular counters, the timestamp is the time when the counter is *emitted*.
* If the source for your delta counters stops reporting, Wavefront initially continues reporting once a minute for 1 hour. If the source does not report for an hour, Wavefront resets a delta counter to 0, stops aggregating, and stops reporting.
