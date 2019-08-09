---
title: Java Integration
tags: [integrations list]
permalink: dropwizard.html
summary: Learn about the Wavefront Java Integration.
---
# Java Integration

You can use the Dropwizard metrics library and the Wavefront reporters to send Java application metrics to Wavefront. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). You can assign point tags at the reporter level for fine-grained filtering.

In addition to setting up the metrics flow, this integration also sets up a dashboard. For example, here's a screenshot of a dashboard with metrics collected from JVM.

{% include image.md src="images/dropwizard-dashboard.png" width="80" %}

## Java Setup

The Wavefront plugin for [Dropwizard Metrics] (https://metrics.dropwizard.io) adds [Wavefront reporters](https://github.com/wavefrontHQ/java/tree/master/dropwizard-metrics/dropwizard-metrics) and an abstraction that supports tagging at the reporter level. The reporters support sending metrics to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html) or using [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

Supported Versions: Dropwizard Metrics versions 3.1.x, 3.2.x and 4.0.x.



### Set up Maven

Add the Dropwizard `metrics-core`, Wavefront `dropwizard-metrics`, and `org.slf4j` libraries as dependencies in your project:
{% raw %}
```
<dependency>
  <groupId>io.dropwizard.metrics</groupId>
  <artifactId>metrics-core</artifactId>
  <version>3.2.5</version>
</dependency>
<dependency>
  <groupId>com.wavefront</groupId>
  <artifactId>dropwizard-metrics</artifactId>
  <version>4.29</version>
</dependency>
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-simple</artifactId>
  <version>1.7.16</version>
</dependency>       
```
{% endraw %}

Versions `3.1.x`, `3.2.x` and `4.0.x` of `metrics-core` also work.

### Configure Wavefront Reporter

These steps are applicable to both the Wavefront proxy reporter and Wavefront direct reporter.

To create a Wavefront reporter:

1. Import `com.wavefront.integrations.metrics.WavefrontReporter`
2. Set the source using the `.withSource(String source)` method.
3. Set point tags at the reporter level:
  - Add one point tag using `.withPointTag(String tagK, String tagV)`
  - Add one or more tags to a `Map<String,String>` and call `.withPointTags(Map)`
4. Bind the reporter to a Wavefront proxy or directly to a Wavefront service:
  - For the Wavefront proxy: Set the hostname and port of the proxy using the `.build(String hostname, long port)` method.  
  - For the Wavefront service: Set the server and token of the Wavefront service using the `.buildDirect(String server, String token)` method.


By default:

  - There is no metric prefix
  - Rates are converted to seconds
  - Durations are converted to milliseconds
  - The filter is set to `MetricFilter.ALL`
  - The clock is set to `Clock.defaultClock()`

### Option 1. Create a Wavefront Proxy Reporter and Register Metrics

Follow these steps for sending metrics to a Wavefront proxy. See Option 2 for sending metrics directly to a Wavefront service.

#### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Java application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you create the reporter.

#### Step 2. Create a Wavefront Proxy Reporter and Register Metrics

To create a reporter which will emit data to a Wavefront proxy every 5 seconds:{% raw %}
```
import com.wavefront.integrations.metrics.WavefrontReporter;
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;

MetricRegistry registry = new MetricRegistry();
Counter evictions = registry.counter("cache-evictions");

String hostname = "wavefront.proxy.hostname";
int port = 2878;

WavefrontReporter reporter = WavefrontReporter.forRegistry(registry).
    withSource("app-1.company.com").
    withPointTag("dc", "us-west-2").
    withPointTag("service", "query").
    build(hostname, port);
reporter.start(5, TimeUnit.SECONDS);
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter and Register Metrics

You can send metrics directly to a Wavefront service, discussed next. Option 1 above explains how to send metrics to a Wavefront proxy.

To create a reporter which will emit data to a Wavefront service every 5 seconds:
{% raw %}
```
import com.wavefront.integrations.metrics.WavefrontReporter;
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;

MetricRegistry registry = new MetricRegistry();
Counter evictions = registry.counter("cache-evictions");

String server = "https://YOUR_CLUSTER.wavefront.com";
String token = "YOUR_API_TOKEN";

WavefrontReporter reporter = WavefrontReporter.forRegistry(registry).
    withSource("app-1.company.com").
    withPointTag("dc", "us-west-2").
    withPointTag("service", "query").
    buildDirect(server, token);
reporter.start(5, TimeUnit.SECONDS);
```
{% endraw %}

### JVM Metrics

To add default JVM metrics to the `MetricsRegistry`, call `.withJvmMetrics()` when you create the reporter. If you call `.withJvmMetrics()`, the following metrics are added to the registry:
{% raw %}
```
registry.register("jvm.uptime", new Gauge<Long>() {
    @Override
      public Long getValue() {
        return ManagementFactory.getRuntimeMXBean().getUptime();
      }
});
registry.register("jvm.current_time", new Gauge<Long>() {
    @Override
      public Long getValue() {
        return clock.getTime();
    }
});

registry.register("jvm.classes", new ClassLoadingGaugeSet());
registry.register("jvm.fd_usage", new FileDescriptorRatioGauge());
registry.register("jvm.buffers", new BufferPoolMetricSet(ManagementFactory.getPlatformMBeanServer()));
registry.register("jvm.gc", new GarbageCollectorMetricSet());
registry.register("jvm.memory", new MemoryUsageGaugeSet());
```
{% endraw %}
