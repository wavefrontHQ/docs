---
title: Java Integration
tags: [integrations list]
permalink: java.html
summary: Learn about the Wavefront Java Integration.
---
# Java Integration

This Wavefront Java integration explains how to send Java application metrics to Wavefront.

Wavefront provides several Java SDKs for different purposes on Github:

- **[wavefront-sdk-java](https://github.com/wavefrontHQ/wavefront-sdk-java)**: Core SDK for sending different telemetry data to Wavefront. Data include metrics, delta counters, distributions, and spans.
- **[wavefront-dropwizard-metrics-sdk-java](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java)**: Provides reporters and constructs such as counters, meters and histograms to periodically report application metrics and distributions to Wavefront.
- **[wavefront-dropwizard-sdk-java](https://github.com/wavefrontHQ/wavefront-dropwizard-sdk-java)**: Provides out-of-the-box metrics for your Dropwizard application and periodically report them to Wavefront.
- **[wavefront-runtime-sdk-jvm](https://github.com/wavefrontHQ/wavefront-runtime-sdk-jvm)**: Wavefront JVM SDK. Provides out of the box metrics for the Java Virtual Machine (JVM) that runs your Java application.
- **[wavefront-opentracing-sdk-java](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java)**: Wavefront OpenTracing Java SDK. See [our tracing documentation](https://docs.wavefront.com/tracing_basics.html) for background.
- **[wavefront-grpc-sdk-java](https://github.com/wavefrontHQ/wavefront-grpc-sdk-java)**: Wavefront gRPC Java SDK. Provides out-of-the-box metrics, histograms, and trace data from gRPC operations in your Java application and reports that data to Wavefront.
- **[wavefront-jaxrs-sdk-java](https://github.com/wavefrontHQ/wavefront-jaxrs-sdk-java)**: Wavefront JAX-RS Java SDK. Provides out-of-the-box trace data from JAX-RS based clients in your Java application and reports that data to Wavefront.
- **[wavefront-jersey-sdk-java](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)**: Wavefront Jersey Java SDK. Provides out-of-the-box metrics, histograms and (optionally) traces from your Jersey-based Java application, and reports the data to Wavefront

In the Setup tab, the integration includes sample code based on `wavefront-dropwizard-metrics-sdk-java` for sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

The steps in the Setup tab start the metrics flow and also set up a dashboard. Here's a screenshot of a dashboard with metrics collected from JVM by the wavefront-dropwizard-metrics-sdk-java.

{% include image.md src="images/dropwizard-dashboard.png" width="80" %}
## Java Setup

The Wavefront plugin for [Dropwizard Metrics](https://metrics.dropwizard.io) adds [Wavefront reporters](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java) and an abstraction that supports tagging at the reporter level. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).



### Set up Maven

Add the `wavefront-dropwizard-metrics-sdk-java` library as a dependency in your project:
{% raw %}
```
<dependencies>
    <dependency>
        <groupId>com.wavefront</groupId>
        <artifactId>wavefront-dropwizard-metrics-sdk-java</artifactId>
        <version>$releaseVersion</version>
    </dependency>
</dependencies>
```
{% endraw %}

### Option 1. Create a Wavefront Proxy Reporter and Register Metrics

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.

#### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Java application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you create the reporter.

#### Step 2. Create a Wavefront Proxy Reporter and Register Metrics

To create a reporter which will emit data to a Wavefront proxy every 5 seconds:{% raw %}
```
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;
import com.wavefront.dropwizard.metrics.DropwizardMetricsReporter;
import com.wavefront.sdk.proxy.WavefrontProxyClient;
import java.util.concurrent.TimeUnit;

MetricRegistry metricRegistry = new MetricRegistry();
Counter evictions = metricRegistry.counter("cache-evictions");
evictions.inc();

String proxyHost = "wavefront.proxy.hostname";
int metricsPort = 2878;

WavefrontProxyClient wavefrontProxyClient = new WavefrontProxyClient.Builder(proxyHost).
    metricsPort(metricsPort).
    build();

DropwizardMetricsReporter reporter = DropwizardMetricsReporter.forRegistry(metricRegistry).
    withSource("app-1.company.com").
    prefixedWith("service").
    withReporterPointTag("dc", "us-west-2").
    withReporterPointTag("env", "staging").
    build(wavefrontProxyClient);

reporter.start(5, TimeUnit.SECONDS);
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter and Register Metrics

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

To create a reporter which will emit data to a Wavefront service every 5 seconds:
{% raw %}
```
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;
import com.wavefront.dropwizard.metrics.DropwizardMetricsReporter;
import com.wavefront.sdk.direct.ingestion.WavefrontDirectIngestionClient;
import java.util.concurrent.TimeUnit;

String wavefrontServer = "https://YOUR_CLUSTER.wavefront.com";
String token = "YOUR_API_TOKEN";

MetricRegistry metricRegistry = new MetricRegistry();
Counter evictions = metricRegistry.counter("cache-evictions");
evictions.inc();

WavefrontDirectIngestionClient wavefrontDirectIngestionClient =
    new WavefrontDirectIngestionClient.Builder(wavefrontServer, token).build();

DropwizardMetricsReporter reporter = DropwizardMetricsReporter.forRegistry(metricRegistry).
    withSource("app-1.company.com").
    prefixedWith("service").
    withReporterPointTag("dc", "us-west-2").
    withReporterPointTag("env", "staging").
    build(wavefrontDirectIngestionClient);

reporter.start(5, TimeUnit.SECONDS);
```
{% endraw %}

### JVM Metrics

To add default JVM metrics to the `MetricsRegistry`, call `.withJvmMetrics()` when you create the reporter. If you call `.withJvmMetrics()`, the following metrics are added to the registry:
{% raw %}
```
metricRegistry.register("jvm.uptime",
    (Gauge<Long>) () -> ManagementFactory.getRuntimeMXBean().getUptime());
metricRegistry.register("jvm.current_time", (Gauge<Long>) clock::getTime);

metricRegistry.register("jvm.buffers",
    new BufferPoolMetricSet(ManagementFactory.getPlatformMBeanServer()));
metricRegistry.register("jvm.classes", new ClassLoadingGaugeSet());
metricRegistry.register("jvm.fd_usage", new FileDescriptorRatioGauge());
metricRegistry.register("jvm.gc", new GarbageCollectorMetricSet());
metricRegistry.register("jvm.memory", new MemoryUsageGaugeSet());
metricRegistry.register("jvm.thread-states", new ThreadStatesGaugeSet());
```
{% endraw %}

