---
title: Wavefront SDKs
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_sdks.html
summary: Learn about reporting metrics from your application.
---

Wavefront supports a [REST API for management](wavefront_api.html) and several SDKs for sending metrics.
* The [Wavefront REST API](wavefront_api.html) allows you to perform management tasks that you'd perform from the UI, such as creating events. You can use Swagger to create an API client or a CLI client from this API.
* The SDKs allow you to send metrics to the Wavefront proxy or directly to the Wavefront service. These SDKs are available through different integrations and in GitHub.

The focus of this page is on the Wavefront SDKs. Wavefront supports integrations that facilitate setup for some of the SDKs. Other SDKs are available directly from GitHub.

## Integrations for Application Metrics

Wavefront supports several out-of-the-box integrations for sending metrics either to the Wavefront proxy, or to the Wavefront service directly.

1. Log in to your Wavefront instance and click **Integrations**.
2. Search for **Application Instrumentation**, and select one of the integrations.
3. Click **Setup** and follow the steps to register metrics and configure metric reporters. 


![app instrument](images/app_instrumentation.png)


## Other SDKs

You can access our SDKs from our public GitHub repository. We're constantly adding functionality to existing SDKs, and adding new SDKs. For example:

* [Wavefront Java Top-Level Project](https://github.com/wavefrontHQ/java) - several independent projects for sending metrics from your Java application to Wavefront. The project includes a Java client, dropwizard metrics project, and more.
* The [wavefront-kubernetes Github repository](https://www.github.com/wavefrontHQ/wavefront-kubernetes) - a new SDK that includes a Horizontal Pod Autoscaler Adapter that allows you to scale pods based on metrics available from the Wavefront Service.
* The [Wavefront AWS Lambda integration](integrations_aws_lambda.html) - allows you to extract standard metrics, and use the code and samples in GitHub to extract business metrics using Python, node.js, and Go.
