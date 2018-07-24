---
title: AWS Lambda Integration
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_lambda.html
summary: Learn how view AWS Lambda metrics in Wavefront.
---

## AWS Lambda and Wavefront

AWS Lambda is ideal for situations when you want to run a function in response to an event. Use cases include generating thumbnails whenever users upload images to a website or similar scenarios. You define the function in one of the languages that AWS Lambda supports, and the function runs whenever a triggering event occurs. This model is called Function-as-a-Service or serverless.

While it's convenient to stop worrying about function execution, you might want to monitor the function. Wavefront offers these choices to monitor your Lambda function:
* Use the Amazon CloudWatch integration. Using the CloudWatch integration allows access to the full set of standard metrics, but it can get expensive.
  - First you pay to extract the metrics from Amazon CloudWatch.
  - Then you pay to analyze the metrics in Wavefront
* Using the Wavefront AWS Lambda integration. The integration supports all standard metrics available through the API. It also allows you to monitor business metrics by using a wrapper in Python, Go, or Node.js.
  - Real-time metrics are sent directly from your AWS Lambda function to Wavefront. (With Cloudwatch, you have to poll Cloudwatch and send the data to Wavefront)
  - You set up only the AWS Lambda integration - setting up CloudWatch is not necessary.

## How to Monitor AWS Lambda

Monitoring AWS Lambda is somewhat different from monitoring other environments.
* By default, the [Wavefront Data Format](wavefront_data_format.html) , requires that you specify the source as a required field of any query.
* In AWS Lambda and other serverless environments, using the name of the lambda function or a UUID yields incorrect results. Instead, Wavefront supports a new type of metric called [delta counter](delta_counters.html). Wavefront performs server-side aggregation of related metrics for delta counters.

### AWS Lambda Integration

The Wavefront AWS Lambda integration XXLink supports out-of-the-box monitoring of many standard AWS Lambda metrics. The charts in the integration's dashboard query many of those metrics so you can get a good first impression of what's going on in your environment. You can also set up the alerts that are predefined as part of the integration

### Sending Business Metrics to the AWS Lambda Integration

If you want to go beyond standard metrics and monitor business metrics, that is, metrics associated with your AWS Lambda function, you can publish those directly from your lambda function into Wavefront with very little additional code. You specify the metric(s) you want to send to Wavefront in the wrapper. Instructions and links are in the AWS Lambda integration, you you can look at the [example on Github](https://github.com/wavefrontHQ/python-client/blob/master/wavefront_lambda/example.py).

Wavefront supports wrappers for Python, Go, and Node.js.

### Sending AWS Lambda Metrics to the Wavefront Proxy or Service

If you don't want to use the AWS Lambda integration, you can send metrics directly to the

If you want to send delta metrics, you prefix each metric with a delta character, as shown in the following sample code snippet from https://github.com/wavefrontHQ/python-client/blob/master/wavefront_pyformance/wavefront_pyformance/delta.py

```
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"

...
name = name if _has_delta_prefix(name) else DeltaCounter.DELTA_PREFIX + name
```
See the sample code for details.
