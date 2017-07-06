---
title: Getting Data into Wavefront Overview
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_ingestion.html
summary: Learn how to get data into Wavefront.
---
Wavefront makes it easy to stream your telemetry data to the Wavefront service.
 
For data from most systems we use a push model and provide a [proxy](proxies.html) that runs within your infrastructure. You push data to the proxy and the proxy forwards the data to Wavefront.
 
For Amazon Web Services (AWS) services, the Wavefront application pulls data directly.
 
This diagram illustrates the concepts:
 
![wavefront architecture](images/integrations_data_collector.png)
 
## Tutorial

To quickly get going with getting data into Wavefront, see [Tutorial: Getting Data into Wavefront](tutorial_data_ingestion.html).

## Proxy-Based Integrations

There are numerous pre-built integrations available for various data collection and monitoring tools. Some are Wavefront specific, and others rely on an existing integration between that tool and Graphite, which is straightforward since the Wavefront proxy natively accepts the Graphite data format. To learn all about proxy-based integrations, see [Integrations](integrations.html).

{% include shared/data_formats.html %}

## Amazon Web Services Integration

The Amazon Web Services integration directly supports ingesting CloudWatch, CloudTrail, and AWS service data. For details on setting up different types of AWS integrations and the metrics available, see:

- [AWS Metrics Integration](integrations_aws_metrics.html)
- [Amazon EC2 Container Service (AWS ECS) Integration](integrations_aws_ecs.html)