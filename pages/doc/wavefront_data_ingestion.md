---
title: Getting Data into Wavefront Overview
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_ingestion.html
summary: Learn how to get data into Wavefront.
---
Wavefront makes it easy to stream your telemetry data to the service.
 
For data from most systems we use a push model and provide a proxy that runs within your infrastructure. You push data to the proxy and the proxy forwards the data to Wavefront.
 
For data from Amazon Web Services (AWS), Wavefront supports cloud integrations. These allow you to pull data directly into Wavefront. Cloud integrations currently support AWS CloudWatch, CloudTrail, and AWS Metrics+ data.
 
This diagram illustrates the concepts:
 
![wavefront architecture](images/wavefront_architecture.png)
 
## Tutorials

To quickly get going with getting data into Wavefront, see the tutorials:

- [Tutorial: Getting Started with Host, Application, and Custom Data](tutorial_proxy_data_ingestion.html)
- [Tutorial: Getting Started with Amazon Web Services Data](tutorial_aws_data_ingestion.html)

For details on these two approaches, see the following sections.

## Proxy-Based Integrations
[Installing Wavefront Proxies](proxies_installing.html) has information on all the supported installation options. Once you have installed a proxy, you can send data in the following formats:

- [Wavefront data format](wavefront_data_format.html)
- [Graphite data format (plaintext)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol) and [Graphite data format (pickle)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-pickle-protocol)
- [OpenTSDB data format (Telnet interface and HTTP API (JSON))](http://opentsdb.net/docs/build/html/user_guide/writing.html)

Before streaming data, we recommend that you understand [best practices for naming your data](wavefront_data_naming.html).

There are numerous pre-built integrations available for various data collection and monitoring tools. Some are Wavefront specific, and others rely on an existing integration between that tool and Graphite, which is straightforward since the Wavefront proxy natively accepts the Graphite and OpenTSDB data formats. To add an integration, follow the instructions available at [Wavefront Integrations](wavefront_integrations.html).

## Amazon Web Services Integrations

For details on the metrics available with Wavefront's AWS integrations, see:

- [AWS Metrics Integration](integrations_aws_metrics.html)
- [Amazon EC2 Container Service (AWS ECS) Integration](integrations_aws_ecs.html)