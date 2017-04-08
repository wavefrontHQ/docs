---
title: Getting Data into Wavefront
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_ingestion.html
summary: Learn how to get data into Wavefront.
---
Wavefront makes it easy to stream your telemetry data to the service.
 
For data from most systems we use a push model and provide a proxy that runs within your infrastructure. You push data to the proxy and the proxy forwards the data to Wavefront.  Before streaming data, we recommend that you review [best practices for naming your data](wavefront_data_naming).
 
For data from Amazon Web Services (AWS), Wavefront supports cloud integrations. These allow you to pull data directly into Wavefront. Cloud integrations currently support AWS CloudWatch, CloudTrail, and AWS API data. For more details, see [AWS Metrics Integration](integrations_aws_metrics).
 
This diagram illustrates the concepts:
 
![wavefront architecture](images/wavefront_architecture.png)
 
This article gives an overview of how to install the proxy and introduces the integrations that work with the proxy to stream your data to Wavefront.
 
## Set up the Wavefront Proxy
To send data to Wavefront, first set up the Wavefront proxy as described in [Installing Wavefront Proxies](proxies_installing).
 
## Add Integrations
There are numerous pre-built integrations available for various data collection and monitoring tools. Some are Wavefront specific, and others rely on an existing integration between that tool and Graphite, which is straightforward since the Wavefront proxy natively accepts the Graphite and OpenTSDB data formats. To add an integration follow the instructions provided by [Wavefront Integrations](integrations_wavefront).

{% include links.html %}