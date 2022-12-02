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

While it's convenient to stop worrying about function execution, you might want to monitor the function. We offer these choices to monitor your AWS Lambda function:
* Use the Amazon CloudWatch integration. Using the CloudWatch integration allows access to the full set of standard metrics, but polling CloudWatch and send the data to Tanzu Observability introduces some lag.
* Use the [AWS Lambda Functions integration](aws-lambda-functions.html). The integration collects standard metrics available through the public API. It also allows you to monitor business metrics by using a wrapper in Python, Go, or Node.js.
  - [Wavefront Go SDK for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-go)
  - [Wavefront Node.js SDK for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-nodejs)
  - [Wavefront Python SDK for AWS Lambda](https://github.com/wavefrontHQ/wavefront-lambda-python)

## How to Use Tanzu Observability to Monitor AWS Lambda

To support monitoring serverless environments, Tanzu Observability includes a metric type called [delta counter](delta_counters.html). With delta counters, Tanzu Observability points are aggregated to the minute bucket. That avoids point collisions.

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

## Ingesting AWS Lambda Cold Start Metrics into Tanzu Observability

An AWS Lambda "cold start" is the first request that a new AWS Lambda instance handles. Once the request is complete, the instance stays up-and-running, so that it can handle the subsequent requests. There is no defined time when this first instance will be removed. If an instance has been accidentally removed, "cold start" will happen again. As a result, the response time increases, because "cold start" will keep happening and you won't be able to find the cause behind this.

You can overcome this situation, by reporting a new metric to the Wavefront service which allows you monitor the "cold start" duration. In many cases, the AWS Lambda "cold start" metrics are not being reported to CloudWatch. They are just logged.

Filter the metrics from the log and report these metrics to CloudWatch. Once the metrics are present in the CloudWatch external service, CloudWatch will ingest them into the Wavefront service. 

1. Log in to your AWS account and navigate to your Lambda function.
2. Click **Monitor** and click **Logs**.
   ![A screenshot of the AWS Lambda function screen with the Monitor and Logs tabs selected.](images/aws-lambda-1.png)
3. Click **View logs in CloudWatch**.
4. On the **Metric filters** tab, click **Create metric filter**.
   ![A screenshot of the AWS Lambda function screen with the Metrics filter tab selected.](images/aws-lambda-2.png)
5. In the **Filter pattern** text box, enter the following snippet.

    ```
    [
     report_label=REPORT,
     request_id_label="RequestId:", request_id_value,
     duration_label="Duration:", lambda_duration_ms, duration_unit=ms,
     billed_duration_label1=Billed, bill_duration_label2="Duration:", lambda_billed_duration_ms, billed_duration_unit=ms,
     memory_size_label1=Memory, memory_size_label2="Size:", lambda_memory_size_mb, memory_size_unit=MB,
     max_memory_used_label1=Max, max_memory_used_label2=Memory, max_memory_used_label3="Used:", lambda_max_memory_used_mb, max_memory_used_unit=MB,
     init_duration_label1=Init, init_duration_label2="Duration:", lambda_init_duration_ms, init_duration_unit=ms
    ]
    ```
6. Select the log data to test, and click **Test Pattern** to test the filter pattern. 
7. If it shows the test results, click **Next**.
8. On the **Assign metric** page, in the **Filter name** text box, enter a meaningful name of the filter.
9. In the **Metric details** section, enter the following metric details.
   1. In the **Metric namespace** text box, enter the namespace of the metric and leave the **Create new** option set to ON.
       ```
       aws.lambda.custom
       ```
   2. In the **Metric name** text box, enter the name of the metric.
      ```
      init.duration.ms
      ```
   3. In the **Metric value** text box, enter the value published to the metric name when a pattern match occurs.
   
      ```
      $lambda_init_duration_ms
      ```
    4. From the **Unit** drop-down menu, select  **Milliseconds** as the unit of the metric.
    
10. Click **Next**.
11. Review the data that you have entered, and click **Create metric filter**.
12. Navigate to your Wavefront cluster and in the Metrics Browser search for the `aws.lambda.custom.init.duration.ms metric`.

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
