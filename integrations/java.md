---
title: Java Integration
tags: [integrations list]
permalink: java.html
summary: Learn about the Wavefront Java Integration.
---
# Java Integration

This Wavefront Java integration explains how to send Java application metrics to Wavefront.

### Java SDKs

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

### Dashboards

In addition to setting up the metrics flow, this integration also installs dashboards:

* Java 
* Java on Kubernetes

Here's a screenshot of Java on Kubernetes dashboard with metrics collected from JVM by the wavefront-dropwizard-metrics-sdk-java.

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

#### Step 2. Initialize the WavefrontClient and send data via Wavefront Proxy
To create a reporter which will emit data to a Wavefront proxy every 5 seconds:{% raw %}
```
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;
import com.wavefront.dropwizard.metrics.DropwizardMetricsReporter;
import com.wavefront.sdk.common.clients.WavefrontClientFactory;
import com.wavefront.sdk.common.WavefrontSender;
import java.util.concurrent.TimeUnit;
import java.net.InetAddress;
import java.net.UnknownHostException;

MetricRegistry metricRegistry = new MetricRegistry();
Counter evictions = metricRegistry.counter("cache-evictions");
evictions.inc();

WavefrontClientFactory wavefrontClientFactory = new WavefrontClientFactory();
// Add a client with the following URL format: "proxy://<your.proxy.fqdn>:<somePort>"
// to send data to proxies
wavefrontClientFactory.addClient(wavefrontURL);

WavefrontSender wavefrontSender = wavefrontClientFactory.getClient();

try {
    DropwizardMetricsReporter reporter = DropwizardMetricsReporter.forRegistry(metricRegistry).
        withSource(InetAddress.getLocalHost().getHostName()).
        prefixedWith("service"). // Prefix is optional
        withReporterPointTag("dc", "us-west-2").
        withReporterPointTag("env", "staging"). // Mandatory fields for K8s
        withReporterPointTag("service", "service-name"). // Mandatory fields for K8s
        build(wavefrontSender);

    reporter.start(5, TimeUnit.SECONDS);
} catch (UnknownHostException e) {
    e.printStackTrace();
}
```
{% endraw %}

### Option 2. Create a Wavefront Direct Reporter and Register Metrics
To create a reporter which will emit data to a Wavefront service every 5 seconds:{% raw %}
```
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;
import com.wavefront.dropwizard.metrics.DropwizardMetricsReporter;
import com.wavefront.sdk.common.clients.WavefrontClientFactory;
import com.wavefront.sdk.common.WavefrontSender;
import java.util.concurrent.TimeUnit;
import java.net.InetAddress;
import java.net.UnknownHostException;

MetricRegistry metricRegistry = new MetricRegistry();
Counter evictions = metricRegistry.counter("cache-evictions");
evictions.inc();

WavefrontClientFactory wavefrontClientFactory = new WavefrontClientFactory();

// Create a factory and add a client with the following URL format: "https://TOKEN@DOMAIN.wavefront.com"
// and a Wavefront API token with direct ingestion permission
wavefrontClientFactory.addClient(wavefrontURL,
  20_000,           // This is the max batch of data sent per flush interval
  100_000,          // This is the size of internal buffer beyond which data is dropped
  2,                // Together with the batch size controls the max theoretical throughput of the sender
  Integer.MAX_VALUE // The maximum message size in bytes we will push with on each flush interval
);

WavefrontSender wavefrontSender = wavefrontClientFactory.getClient();

try {
    DropwizardMetricsReporter reporter = DropwizardMetricsReporter.forRegistry(metricRegistry).
        withSource(InetAddress.getLocalHost().getHostName()).
        prefixedWith("service"). // Prefix is optional
        withReporterPointTag("dc", "us-west-2").
        withReporterPointTag("env", "staging"). // Mandatory fields for K8s
        withReporterPointTag("service", "service-name"). // Mandatory fields for K8s
        build(wavefrontSender);

    reporter.start(5, TimeUnit.SECONDS);
} catch (UnknownHostException e) {
    e.printStackTrace();
}
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


## Metrics


|Metric Name|Description|
| :--- | :--- |
|jvm.buffer-pool.direct.*|Metrics for direct (not mapped) JVM buffer pools.|
|jvm.buffer-pool.direct.count||
|jvm.buffer-pool.direct.capacity||
|jvm.buffer-pool.direct.used||
|jvm.buffer-pool.mapped.*|Metrics for mapped (not direct) JVM buffer pools.|
|jvm.buffer-pool.mapped.count||
|jvm.buffer-pool.mapped.capacity||
|jvm.buffer-pool.mapped.used||
|jvm.buffer.*|JVM buffer metrics.|
|jvm.buffer.count||
|jvm.buffer.count.buffers||
|jvm.buffer.count.buffers.gauge||
|jvm.buffer.memory.*|JVM buffer memory metrics.|
|jvm.buffer.memory.used||
|jvm.buffer.memory.used.bytes||
|jvm.buffer.memory.used.bytes.gauge||
|jvm.buffer.total.capacity.*|JVM total buffer capacity metrics.|
|jvm.buffer.total.capacity||
|jvm.buffer.total.capacity.bytes||
|jvm.buffer.total.capacity.bytes.gauge||
|jvm.buffers.direct.*|Metrics for direct (not mapped) JVM buffers.|
|jvm.buffers.direct.count||
|jvm.buffers.direct.capacity||
|jvm.buffers.direct.used||
|jvm.buffers.mapped.count|Metrics for mapped (not direct) JVM buffers.|
|jvm.buffers.mapped.capacity||
|jvm.buffers.mapped.used||
|jvm.classes.loaded.*|Metrics for loaded JVM classes|
|jvm.classes.loaded||
|jvm.classes.loaded.classes||
|jvm.classes.loaded.classes.gauge||
|jvm.classes.unloaded.*|Metrics for unloaded JVM classes|
|jvm.classes.unloaded||
|jvm.classes.unloaded.classes.total||
|jvm.classes.unloaded.classes.total.counter||
|jvm.current_time|Current time. |
|jvm.gc.G1-*-Generation. *|JVM garbage collection metrics (old or young generation)|
|jvm.gc.G1-Old-Generation.count||
|jvm.gc.G1-Old-Generation.time||
|jvm.gc.G1-Young-Generation.count||
|jvm.gc.G1-Young-Generation.time||
|jvm.gc.PS-*. *|Metrics for the PS MarkSweep and PS Scavenge Java beans. |
|jvm.gc.PS-MarkSweep.count||
|jvm.gc.PS-MarkSweep.time||
|jvm.gc.PS-Scavenge.count||
|jvm.gc.PS-Scavenge.time||
|jvm.gc.concurrent.phase.time.*|Metrics for JVM concurrent garbage collection (Mark Sweep collector).|
|jvm.gc.concurrent.phase.time.count||
|jvm.gc.concurrent.phase.time.max||
|jvm.gc.concurrent.phase.time.sum||
|jvm.gc.concurrent.phase.time.avg||
|jvm.gc.live.data.*|Metrics for JVM garbage collection live data.|
|jvm.gc.live.data.size||
|jvm.gc.live.data.size.bytes||
|jvm.gc.live.data.size.bytes.gauge||
|jvm.gc.max.data.*|Metrics for JVM garbage collection max data size.|
|jvm.gc.max.data.size||
|jvm.gc.max.data.size.bytes||
|jvm.gc.max.data.size.bytes.gauge||
|jvm.gc.memory.allocated||
|jvm.gc.memory.allocated.bytes.total||
|jvm.gc.memory.allocated.bytes.total.counter||
|jvm.gc.memory.*|Metrics for JVM garbage collection memory.|
|jvm.gc.memory.promoted||
|jvm.gc.memory.promoted.bytes.total||
|jvm.gc.memory.promoted.bytes.total.counter||
|jvm.gc.pause.*|Pause-related metrics for JVM garbage collection. |
|jvm.gc.pause.count||
|jvm.gc.pause.max||
|jvm.gc.pause.count||
|jvm.gc.pause.avg||
|jvm.gc.pause.seconds.count||
|jvm.gc.pause.seconds.max||
|jvm.gc.pause.seconds.sum||
|jvm.gc.pause.seconds.max.gauge||
|jvm.memory.max*|Maximum JVM memory metrics.|
|jvm.memory.max||
|jvm.memory.max.bytes||
|jvm.memory.max.bytes.gauge||
|jvm.memory.committed*|Metrics for JVM committed memory.|
|jvm.memory.committed||
|jvm.memory.committed.bytes||
|jvm.memory.committed.bytes.gauge||
|jvm.memory.heap.*|JVM memory heap metrics.|
|jvm.memory.heap.max||
|jvm.memory.heap.committed||
|jvm.memory.heap.init||
|jvm.memory.heap.usage||
|jvm.memory.heap.used||
|jvm.memory.non-heap.*|JVM memory non-heap metrics.|
|jvm.memory.non-heap.max||
|jvm.memory.non-heap.committed||
|jvm.memory.non-heap.init||
|jvm.memory.non-heap.usage||
|jvm.memory.non-heap.used||
|jvm.memory.pools.Code-Cache.*|Metrics for the code cache memory pool.|
|jvm.memory.pools.Code-Cache.max||
|jvm.memory.pools.Code-Cache.committed||
|jvm.memory.pools.Code-Cache.init||
|jvm.memory.pools.Code-Cache.usage||
|jvm.memory.pools.Code-Cache.used||
|jvm.memory.pools.Compressed-Class-Space.*|Metrics for the compressed class space memory pool.|
|jvm.memory.pools.Compressed-Class-Space.max||
|jvm.memory.pools.Compressed-Class-Space.committed||
|jvm.memory.pools.Compressed-Class-Space.init||
|jvm.memory.pools.Compressed-Class-Space.usage||
|jvm.memory.pools.Compressed-Class-Space.used||
|jvm.memory.pools.G1-Eden-Space.*|Metrics for the G1-Eden-Space memory pool.|
|jvm.memory.pools.G1-Eden-Space.max||
|jvm.memory.pools.G1-Eden-Space.committed||
|jvm.memory.pools.G1-Eden-Space.init||
|jvm.memory.pools.G1-Eden-Space.usage||
|jvm.memory.pools.G1-Eden-Space.used||
|jvm.memory.pools.G1-Eden-Space.used-after-gc||
|jvm.memory.pools.G1-Old-Gen.*|Metrics for the G1-Old-Gen memory pool.|
|jvm.memory.pools.G1-Old-Gen.max||
|jvm.memory.pools.G1-Old-Gen.committed||
|jvm.memory.pools.G1-Old-Gen.init||
|jvm.memory.pools.G1-Old-Gen.usage||
|jvm.memory.pools.G1-Old-Gen.used||
|jvm.memory.pools.G1-Old-Gen.used-after-gc||
|jvm.memory.pools.G1-Survivor-Space.*|Metrics for the G1-Survivor-Space memory pool.|
|jvm.memory.pools.G1-Survivor-Space.max||
|jvm.memory.pools.G1-Survivor-Space.committed||
|jvm.memory.pools.G1-Survivor-Space.init||
|jvm.memory.pools.G1-Survivor-Space.usage||
|jvm.memory.pools.G1-Survivor-Space.used||
|jvm.memory.pools.G1-Survivor-Space.used-after-gc||
|jvm.memory.pools.Metaspace.*|Metrics for the JVM metaspace memory pool.|
|jvm.memory.pools.Metaspace.max||
|jvm.memory.pools.Metaspace.committed||
|jvm.memory.pools.Metaspace.init||
|jvm.memory.pools.Metaspace.usage||
|jvm.memory.pools.Metaspace.used||
|jvm.memory.pools.PS-Eden-Space.*||
|jvm.memory.pools.PS-Eden-Space.max|Metrics for the JVM PS-Eden-Space memory pool.|
|jvm.memory.pools.PS-Eden-Space.committed||
|jvm.memory.pools.PS-Eden-Space.init||
|jvm.memory.pools.PS-Eden-Space.usage||
|jvm.memory.pools.PS-Eden-Space.used||
|jvm.memory.pools.PS-Eden-Space.used-after-gc||
|jvm.memory.pools.PS-Old-Gen.max|Metrics for the JVM PS-Old-Gen memory pool.|
|jvm.memory.pools.PS-Old-Gen.max||
|jvm.memory.pools.PS-Old-Gen.committed||
|jvm.memory.pools.PS-Old-Gen.init||
|jvm.memory.pools.PS-Old-Gen.usage||
|jvm.memory.pools.PS-Old-Gen.used||
|jvm.memory.pools.PS-Old-Gen.used-after-gc||
|jvm.memory.pools.PS-Survivor-Space.*|Metrics for the JVM PS-Survior-Space memory pool.|
|jvm.memory.pools.PS-Survivor-Space.max||
|jvm.memory.pools.PS-Survivor-Space.committed||
|jvm.memory.pools.PS-Survivor-Space.init||
|jvm.memory.pools.PS-Survivor-Space.usage||
|jvm.memory.pools.PS-Survivor-Space.used||
|jvm.memory.pools.PS-Survivor-Space.used-after-gc||
|jvm.memory.total.*|Metrics for total JVM memory.|
|jvm.memory.total.max||
|jvm.memory.total.committed||
|jvm.memory.total.init||
|jvm.memory.total.used||
|jvm.memory.used|Metrics for used JVM memory.|
|jvm.memory.used||
|jvm.memory.used.bytes||
|jvm.memory.used.bytes.gauge||
|jvm.thread-states.*|JVM thread state metrics.|
|jvm.thread-states.count||
|jvm.thread-states.blocked.count||
|jvm.thread-states.daemon.count||
|jvm.thread-states.deadlock.count||
|jvm.thread-states.new.count||
|jvm.thread-states.runnable.count||
|jvm.thread-states.terminated.count||
|jvm.thread-states.timed_waiting.count||
|jvm.thread-states.waiting.count||
|jvm.threads.*|JVM thread metrics|
|jvm.threads.count||
|jvm.threads.blocked.count||
|jvm.threads.daemon.count||
|jvm.threads.daemon.threads||
|jvm.threads.daemon.threads.gauge||
|jvm.threads.deadlock.count||
|jvm.threads.live||
|jvm.threads.live.threads||
|jvm.threads.live.threads.gauge||
|jvm.threads.new.count||
|jvm.threads.peak||
|jvm.threads.peak.threads||
|jvm.threads.peak.threads.gauge||
|jvm.threads.runnable.count||
|jvm.threads.states||
|jvm.threads.states.threads||
|jvm.threads.states.threads.gauge||
|jvm.threads.terminated.count||
|jvm.threads.timed_waiting.count||
|jvm.threads.waiting.count||
|jvm.uptime||

