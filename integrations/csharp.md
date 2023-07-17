---
title: C Sharp Integration
tags: [integrations list]
permalink: csharp.html
summary: Learn about the C Sharp Integration.
---

This page provides an overview of what you can do with the C Sharp integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the C Sharp integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **C Sharp** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# C Sharp Integration

This Wavefront C# integration explains how to send C# application metrics to Wavefront.

Wavefront provides several C# SDKs for different purposes on Github:

- **[wavefront-sdk-csharp](https://github.com/wavefrontHQ/wavefront-sdk-csharp)**: Core SDK for sending different telemetry data to Wavefront. Data include metrics, delta counters, distributions and spans.
- **[wavefront-appmetrics-sdk-csharp](https://github.com/wavefrontHQ/wavefront-appmetrics-sdk-csharp)**: Provides reporters and constructs such as counters, meters and histograms to periodically report application metrics and distributions to Wavefront.
- **[wavefront-opentracing-sdk-csharp](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)**: Wavefront OpenTracing C# SDK. See [our tracing documentation](https://docs.wavefront.com/tracing_basics.html) for background.
- **[wavefront-aspnetcore-sdk-csharp](https://github.com/wavefrontHQ/wavefront-aspnetcore-sdk-csharp)**: Provides out-of-the-box metrics for your ASP.NET core application and periodically reports them to Wavefront.

In the Setup tab, the integration includes sample code based on `wavefront-appmetrics-sdk-csharp` for sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

This is a custom integration. You can send your own metrics and create your own dashboards.



