---
title: C Sharp Integration
tags: [integrations list]
permalink: csharp.html
summary: Learn about the C Sharp Integration.
---
# C Sharp Integration

This Wavefront C# integration explains how to send C# application metrics to Wavefront.

Wavefront provides several C# SDKs for different purposes on Github:

- **[wavefront-sdk-csharp](https://github.com/wavefrontHQ/wavefront-sdk-csharp)**: Core SDK for sending different telemetry data to Wavefront. Data include metrics, delta counters, distributions and spans.
- **[wavefront-appmetrics-sdk-csharp](https://github.com/wavefrontHQ/wavefront-appmetrics-sdk-csharp)**: Provides reporters and constructs such as counters, meters and histograms to periodically report application metrics and distributions to Wavefront.
- **[wavefront-opentracing-sdk-csharp](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)**: Wavefront OpenTracing C# SDK. See [our tracing documentation](https://docs.wavefront.com/tracing_basics.html) for background.
- **[wavefront-aspnetcore-sdk-csharp](https://github.com/wavefrontHQ/wavefront-aspnetcore-sdk-csharp)**: Provides out-of-the-box metrics for your ASP.NET core application and periodically reports them to Wavefront.

In the Setup tab, the integration includes sample code based on `wavefront-appmetrics-sdk-csharp` for sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

This is a custom integration. You can send your own metrics and create your own dashboards.
## C# Setup

The Wavefront plugin for [AppMetrics](https://www.app-metrics.io/) adds [Wavefront reporters](https://github.com/wavefrontHQ/wavefront-appmetrics-sdk-csharp) and an abstraction that supports tagging at the reporter level. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).



### Install [NuGet package](https://www.nuget.org/packages/Wavefront.AppMetrics.SDK.CSharp/)

Using `Package Manager Console`{% raw %}
```
PM> Install-Package Wavefront.AppMetrics.SDK.CSharp
```
{% endraw %}

Using `.NET CLI Console`{% raw %}
```
> dotnet add package Wavefront.AppMetrics.SDK.CSharp
```
{% endraw %}

### Option 1. Create a Wavefront Proxy Reporter and Register Metrics

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.

#### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your C# application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you create the reporter.

#### Step 2. Create a Wavefront Proxy Reporter and Register Metrics

To create a reporter which will emit data to a Wavefront proxy every 5 seconds:{% raw %}
```
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using App.Metrics;
using App.Metrics.Counter;
using App.Metrics.Reporting.Wavefront.Builder;
using App.Metrics.Scheduling;
using Wavefront.SDK.CSharp.Common;
using Wavefront.SDK.CSharp.Proxy;

string proxyHost = "wavefront.proxy.hostname";
int metricsPort = 2878;

IWavefrontSender wavefrontProxyClient = new WavefrontProxyClient.Builder(proxyHost)
    .MetricsPort(metricsPort)
    .Build();

IMetricsRoot metrics = new MetricsBuilder()
    .Configuration.Configure(options =>
    {
        options.DefaultContextLabel = "service";
        options.GlobalTags = new GlobalMetricTags(new Dictionary<string, string>
        {
                        { "dc", "us-west-2" },
                        { "env", "staging" }
        });
    })
    .Report.ToWavefront(options =>
    {
        options.WavefrontSender = wavefrontProxyClient;
        options.Source = "app-1.company.com";
    })
    .Build();

CounterOptions evictions = new CounterOptions
{
    Name = "cache-evictions"
};
metrics.Measure.Counter.Increment(evictions);

var scheduler = new AppMetricsTaskScheduler(TimeSpan.FromSeconds(5), async () =>
{
    await Task.WhenAll(metrics.ReportRunner.RunAllAsync());
});
scheduler.Start();
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter and Register Metrics

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

To create a reporter which will emit data to a Wavefront service every 5 seconds:
{% raw %}
```
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using App.Metrics;
using App.Metrics.Counter;
using App.Metrics.Reporting.Wavefront.Builder;
using App.Metrics.Scheduling;
using Wavefront.SDK.CSharp.Common;
using Wavefront.SDK.CSharp.DirectIngestion;

string wavefrontServer = "https://YOUR_CLUSTER.wavefront.com";
string token = "YOUR_API_TOKEN";

IWavefrontSender wavefrontDirectIngestionClient =
    new WavefrontDirectIngestionClient.Builder(wavefrontServer, token).Build();

IMetricsRoot metrics = new MetricsBuilder()
    .Configuration.Configure(options =>
    {
        options.DefaultContextLabel = "service";
        options.GlobalTags = new GlobalMetricTags(new Dictionary<string, string>
        {
                        { "dc", "us-west-2" },
                        { "env", "staging" }
        });
    })
    .Report.ToWavefront(options =>
    {
        options.WavefrontSender = wavefrontDirectIngestionClient;
        options.Source = "app-1.company.com";
    })
    .Build();

CounterOptions evictions = new CounterOptions
{
    Name = "cache-evictions"
};
metrics.Measure.Counter.Increment(evictions);

var scheduler = new AppMetricsTaskScheduler(TimeSpan.FromSeconds(5), async () =>
{
    await Task.WhenAll(metrics.ReportRunner.RunAllAsync());
});
scheduler.Start();
```
{% endraw %}


