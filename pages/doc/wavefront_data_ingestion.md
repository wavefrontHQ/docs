---
title: Getting Data into Wavefront
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_ingestion.html
summary: Learn how to get data into Wavefront.
---
You have several options for getting data into Wavefront:

- You use one or more collector agents and the Wavefront proxy. A collector agent, such as Telegraf or Docker cAdvisor, collects metrics such as capacity and usage from your systems, and outputs them to the Wavefront proxy. The Wavefront proxy works with the Wavefront service to ensure security and end-to-end flow control. See [Wavefront Proxies](proxies.html)
- If you have a metrics collection infrastructure, your application uses the metrics library to send log files or metrics directly to a Wavefront proxy.
- Wavefront pulls data directly from the cloud, for example, from Amazon Web Services.

The diagram below shows all options.

![Wavefront architecture](images/wavefront_architecture.svg)

## Proxy-Based Integrations

Wavefront offers many pre-built integrations for different data collection and monitoring tools. Some integrations are Wavefront specific. Others rely on an existing integration between that tool and Graphite. Wavefront natively accepts the Graphite data format. To see all currently available integration, select **Integrations** from the menu bar. This documentation has additional detail about some [integrations](integrations.html).

{% include shared/data_formats.html %}

## Amazon Web Services Integration

The Amazon Web Services integration directly supports ingesting CloudWatch, CloudTrail, and AWS service data. For details on setting up different types of AWS integrations and the metrics available, see:

- [AWS Metrics Integration](integrations_aws_metrics.html)
- [Amazon EC2 Container Service (AWS ECS) Integration](integrations_aws_ecs.html)

## Tutorial

To quickly get going with getting data into Wavefront, follow the steps in the in-product Getting Started workflow. This workflow explains how to get data flowing from your local machine or from an Amazon Web Service. 
