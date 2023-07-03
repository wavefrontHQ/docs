---
title: Go Integration
tags: [integrations list]
permalink: go.html
summary: Learn about the Go Integration.
---

This page provides an overview of what you can do with the Go integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Go integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Go** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# Go Integration

This Wavefront Go integration explains how to send Go application metrics to Wavefront.

Wavefront provides several Go SDKs for different purposes on Github:

- **[wavefront-sdk-go](https://github.com/wavefrontHQ/wavefront-sdk-go)**: Core SDK for sending different telemetry data to Wavefront. Data include metrics, delta counters, distributions, and spans.
- **[go-metrics-wavefront](https://github.com/wavefrontHQ/go-metrics-wavefront)**: Provides reporters and constructs such as counters, meters and histograms to periodically report application metrics and distributions to Wavefront.
- **[wavefront-lambda-go](https://github.com/wavefrontHQ/wavefront-lambda-go)**: Wavefront Go wrapper for AWS Lambda to enable reporting of standard lambda metrics and custom app metrics directly to Wavefront.
- **[wavefront-opentracing-sdk-go](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)**: Wavefront OpenTracing Go SDK. See [our tracing documentation](https://docs.wavefront.com/tracing_basics.html) for background.

In the Setup tab, the integration includes sample code based on `go-metrics-wavefront` for sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). The Setup tab includes both a simple example and an extended example for adding metric-level tags.

The steps in the Setup tab explain how to collect Go runtime metrics. This integration provides a dashboard based on the collected Go runtime metrics.




