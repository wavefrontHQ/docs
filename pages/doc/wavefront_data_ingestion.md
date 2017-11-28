---
title: Getting Data into Wavefront
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_ingestion.html
summary: Learn how to get data into Wavefront.
---
You have three options for getting data into Wavefront:

- You ingest metrics data using one or more collector agents and the Wavefront proxy. A collector agent, such as Telegraf or Docker cAdvisor, collects metrics such as capacity and usage from your systems, and outputs them to the Wavefront proxy. The Wavefront proxy works with the Wavefront server to ensure security and end-to-end flow control.
- Your application sends metrics directly to a Wavefront proxy.
- Wavefront pulls your data directly from Amazon Web Services.

The diagram below shows all three options.

![Wavefront architecture](images/wavefront_architecture.svg)


## Tutorial

To quickly get going with getting data into Wavefront, do the in-product tutorial. See [Tutorial: Getting Data into Wavefront](tutorial_data_ingestion.html) for an overview.

## Proxy-Based Integrations

Wavefront offers many pre-built integrations for different data collection and monitoring tools. Some integrations are Wavefront specific. Others rely on an existing integration between that tool and Graphite. Wavefront natively accepts the Graphite data format. To see all currently available integration, select **Integrations** from the menu bar. This documentation has additional detail about some [integrations](integrations.html).

{% include shared/data_formats.html %}

## Amazon Web Services Integration

The Amazon Web Services integration directly supports ingesting CloudWatch, CloudTrail, and AWS service data. For details on setting up different types of AWS integrations and the metrics available, see:

- [AWS Metrics Integration](integrations_aws_metrics.html)
- [Amazon EC2 Container Service (AWS ECS) Integration](integrations_aws_ecs.html)
