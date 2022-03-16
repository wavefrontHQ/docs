---
title: AWS Lambda Function Integration Details
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_lambda.html
summary: Learn about AWS Lambda and Tanzu Observability by Wavefront.
---
The [AWS Lambda Functions integration](aws-lambda-functions.html) includes:
* Setup instructions
* Information about standard metrics that the integration includes
* Links to instructions for collecting custom business metrics

On this page, we give some background and details not available on the integration page.

## Tanzu Observability by Wavefront and AWS Lambda

AWS Lambda is ideal for situations when you want to run a function in response to an event. Use cases include generating thumbnails whenever users upload images to a website or similar scenarios. You define the function in one of the languages that AWS Lambda supports, and the function runs whenever a triggering event occurs. This model is called Function-as-a-Service or serverless.

While it's convenient to stop worrying about function execution, you might want to monitor the function. Tanzu Observability by Wavefront offers these choices to monitor your AWS Lambda function:
* Use the Amazon CloudWatch integration. Using the CloudWatch integration allows access to the full set of standard metrics, but polling CloudWatch and send the data to Tanzu Observability by Wavefront introduces some lag.
* Use the [AWS Lambda Functions integration](aws-lambda-functions.html). The integration collects standard metrics available through the public API. It also allows you to monitor business metrics by using a wrapper in Python, Go, or Node.js.
  - [Wavefront Go SDK for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-go)
  - [Wavefront Node.js SDK for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-nodejs)
  - [Wavefront Python SDK for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-python)

## How to Use Tanzu Observability by Wavefront to Monitor AWS Lambda

To support monitoring serverless environments, Tanzu Observability by Wavefront includes a metric type called [delta counter](delta_counters.html). With delta counters, Tanzu Observability by Wavefront points are aggregated to the minute bucket. That avoids point collisions.

The AWS Lambda Function integration and the SDKs listed above make it easy to collect standard metrics and custom metrics.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Use Case</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>AWS Lambda standard metrics</td>
<td markdown="span">We collect AWS Lambda standard metrics for you. You can see these metrics in the integration's dashboard, and use them in queries and alerts. 

Some metrics are counters, others are delta counters. </td></tr>
<tr>
<td>AWS Lambda custom business metrics</td>
<td markdown="span">The [AWS Lambda Functions integration](aws-lambda-functions.html) includes pointers to instructions for using Python, Go, or Node.js to retrieve business metrics for your Lambda function. </td></tr>

</tbody>
</table>

<!--
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
-->
