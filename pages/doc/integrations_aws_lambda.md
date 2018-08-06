---
title: AWS Lambda Integration
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_lambda.html
summary: Learn about viewing AWS Lambda metrics in Wavefront.
---
The Wavefront [AWS Lambda Functions integration](aws-lambda-functions.html) includes:
* Setup instructions
* Information about standard counters that the integration includes
* Instructions for collecting custom business metrics

On this page, we give some background and details not available on the integration page.

## AWS Lambda and Wavefront

AWS Lambda is ideal for situations when you want to run a function in response to an event. Use cases include generating thumbnails whenever users upload images to a website or similar scenarios. You define the function in one of the languages that AWS Lambda supports, and the function runs whenever a triggering event occurs. This model is called Function-as-a-Service or serverless.

While it's convenient to stop worrying about function execution, you might want to monitor the function. Wavefront offers these choices to monitor your Lambda function:
* Use the Amazon CloudWatch integration. Using the CloudWatch integration allows access to the full set of standard metrics, but has some drawbacks:
  - It can get expensive because AWS charges to extract metrics from Amazon CloudWatch.
  - Polling CloudWatch and send the data to Wavefront introduces some lag.
* Using the Wavefront AWS Lambda integration. The integration supports all standard metrics available through the API. It also allows you to monitor business metrics by using a wrapper in Python, Go, or Node.js.
  - Real-time metrics are sent directly from your AWS Lambda function to Wavefront.
  - You set up only the AWS Lambda integration -- setting up CloudWatch is not necessary.

## How To Monitor AWS Lambda

For AWS Lambda and other serverless environments, Wavefront supports a new type of metric called [delta counter](delta_counters.html). Wavefront performs server-side aggregation of related metrics for delta counters, eliminating potential issues with collision. See our blog [Monitoring Apps in the Serverless World](https://www.wavefront.com/monitoring-applications-in-the-serverless-world-part-1-of-2/)


### AWS Lambda Integration

The Wavefront AWS Lambda integration  supports out-of-the-box monitoring of many standard AWS Lambda metrics. The charts in the integration's dashboard query many of those metrics so you can get a good first impression of what's going on in your environment. You can also set up the alerts that are predefined as part of the integration

### Sending Business Metrics to the AWS Lambda Integration

If you want to go beyond standard metrics and monitor business metrics, that is, metrics associated with your AWS Lambda function, you can publish those directly from your Lambda function into Wavefront with very little additional code. You specify the metric(s) you want to send to Wavefront in a wrapper for your Lambda function. Instructions and links are in the AWS Lambda integration, or you can look at the [example on Github](https://github.com/wavefrontHQ/python-client/blob/master/wavefront_lambda/example.py).

Wavefront supports wrappers for Python, Go, and Node.js.

### Sending AWS Lambda Metrics to the Wavefront Proxy or Service

If you don't want to use the AWS Lambda integration, you can send metrics directly to the Wavefront proxy or directly to the Wavefront service (direct ingestions).

If you want to send delta metrics, you prefix each metric with a delta character, as shown in the following [sample code](https://github.com/wavefrontHQ/python-client/blob/master/wavefront_pyformance/wavefront_pyformance/delta.py) snippet.

```
DELTA_PREFIX = u"\u2206"
ALT_DELTA_PREFIX = u"\u0394"

...
name = name if _has_delta_prefix(name) else DeltaCounter.DELTA_PREFIX + name
```
See the [sample code](https://github.com/wavefrontHQ/python-client/blob/master/wavefront_pyformance/wavefront_pyformance/delta.py) for details.
