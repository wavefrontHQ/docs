---
title: Getting Data into Wavefront
keyswords: [getting started]
sidebar: doc_sidebar
toc: false
permalink: get_data_help.html
---
Wavefront makes it easy to stream your telemetry data into Wavefront.

For data from most systems we use a push model and provide a proxy that runs within your infrastructure. You push data to the proxy and the proxy forwards the data to Wavefront.

For data from [Amazon Web Services (AWS)](https://aws.amazon.com), Wavefront supports clouds integrations. These allow you to pull data directly into Wavefront. Cloud integrations currently support AWS CloudWatch, CloudTrail, and EC2 data. For  details, see [AWS Metrics Integration](https://community.wavefront.com/docs/DOC-1032).

{% include links.html %}
