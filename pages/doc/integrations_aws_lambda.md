---
title: AWS Lambda Integration
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_aws_lambda.html
summary: Learn how view AWS Lambda metrics in Wavefront.
---

## AWS Lambda and Wavefront

AWS Lambda is ideal for situations when you want to run a function in response to an event. Use cases include generating thumbnails whenever users upload images to a website or similar scenarios. You only define the function in one of the languages that AWS Lambda supports, and the function runs whenever it's needed. This model is called Function-as-a-Service or serverless.

While it's convenient to stop worrying about function execution, you might want to monitor the function. Wavefront offers these choices to monitor your Lambda function:
* Use the Amazon CloudWatch integration. Using the CloudWatch integration allows access to the full set of standard metrics, but it can get expensive.
  - First you pay to extract the metrics from Amazon CloudWatch.
  - Then you pay to analyze the metrics in Wavefront.
* Using the Wavefront AWS Lambda integration. The integration supports all standard metrics available through the API. It also allows you to monitor business metrics by using a wrapper in Python, Go, or Node.js.

## How to Monitor AWS Lambda

Monitoring AWS Lambda is somewhat different from monitoring other environments.
* In other environments, the source is a required part of any query. See the [Wavefront Data Format](wavefront_data_format.html) documentation.
* In AWS Lambda and other serverless environments, it's impossible to know the source. Instead, Wavefront supports a new type of metric called [delta counter](delta_counters.html). Wavefront performs server-side aggregation of related metrics for delta counters.

### AWS Lambda Integration

The Wavefront AWS Lambda integration XXLink supports out-of-the-box monitoring of many standard AWS Lambda metrics. Some metrics are counters, other metrics are delta counters. See XXintegrationLink. The charts in the integration's dashboard query many of those metrics so you can get a good first impression of what's going on in your environment. You can also set up the alerts that are predefined as part of the integration

### Sending Business Metrics to the AWS Lambda Integration

If you want to go beyond standard metrics and monitor business metrics, that is, metrics associated with your AWS Lambda function, you can write a wrapper for the AWS Lambda function. You specify the metric(s) you want to send to Wavefront in the wrapper. The integration includes code examples, and you do not have to include

Wavefront supports wrappers for Python, Go, and Node.js.

### Sending AWS Lambda Metrics to the Wavefront Proxy or Service

If you don't want to use the AWS Lambda integration, you can send metrics directly to the

If you want to send delta metrics, you prefix each metric with Lambda, as shown in the following sample code.
