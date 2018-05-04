---
title: Java Integration
tags: [integrations list]
permalink: dropwizard.html
summary: Learn about the Wavefront Java Integration.
---
# Java Integration

To send Java application metrics to Wavefront use the DropWizard metrics library and the Wavefront reporter. The reporter sends data to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html). Wavefront supports the 3.1 reporter which lets you assign point tags at the reporter level.

This is a custom integration. You can send your own metrics and create your own dashboards.


## Java Setup

Wavefront has reporters for [Dropwizard Metrics 3.1](https://dropwizard.github.io/metrics/3.1.0/): [Wavefront reporter 3.1](https://github.com/wavefrontHQ/java/tree/master/dropwizard-metrics/3.1).



### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Java application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you create the reporter.

### Step 2. Set up Maven

Add the DropWizard `metrics-core`, Wavefront `metrics-wavefront`, and `org.slf4j` libraries as dependencies in your project:

#### DropWizard 3.1
{% raw %}
```
<dependency>
  <groupId>io.dropwizard.metrics</groupId>
  <artifactId>metrics-core</artifactId>
  <version>3.1.2</version>
</dependency>
<dependency>
  <groupId>com.wavefront</groupId>
  <artifactId>dropwizard-metrics-3.1</artifactId>
  <version>3.9</version>
</dependency>
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-simple</artifactId>
  <version>1.7.16</version>
</dependency>       
```

Versions `3.1.0` and `3.1.1` of `metrics-core` also work.

### Step 3. Create a Wavefront Reporter and Register Metrics

The Wavefront reporter lets you use DropWizard metrics exactly as you normally would. See the [DropWizard getting started guide](https://dropwizard.github.io/metrics/3.1.0/getting-started/) for DropWizard basics. 

To create the Wavefront reporter:

- Import `com.wavefront.integrations.metrics.WavefrontReporter`
- Set the source using the `.withSource(String source)`
- Set the hostname and port of the Wavefront proxy using the `.build(String hostname, long port)` method. 
- Set point tags at the reporter level:
  - Add one point tag using `.withPointTag(String tagK, String tagV)`
  - Add one or more tags to a `Map<String,String>` and call `.withPointTags(Map)`

The reporter provides all the same options as [GraphiteReporter](http://metrics.dropwizard.io/3.1.0/manual/graphite/). By default:

  - There is no metric prefix
  - Rates are converted to seconds
  - Durations are converted to milliseconds
  - The filter is set to `MetricFilter.ALL`
  - The clock is set to `Clock.defaultClock()`

#### Example

The following code fragment creates a reporter that emits data every 10 seconds for:

- A `MetricRegistry` named `metrics`
- A Wavefront proxy on `localhost` at port `2878`
- Data that should appear with the source `app-1.company.com`
- Reporter-level point tags named `dc` and `service`
- A counter metric prefix with `numbers`
- Various JVM metrics prefix with `jvm`


```
import com.wavefront.integrations.metrics.WavefrontReporter;
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;

MetricRegistry metrics = new MetricRegistry();

Counter counter = metrics.counter("numbers");
counter.inc();

// Reporter-level point tags
WavefrontReporter reporter = WavefrontReporter.forRegistry(metrics)
    .withSource("app-1.company.com")
    .withPointTag("dc", "dallas")
    .withPointTag("service", "query")
    .withJvmMetrics()
    .build("localhost", 2878);

reporter.start(10, TimeUnit.SECONDS);
```

#### JVM Metrics

Default JVM metrics are added to the `MetricsRegistry` by calling `.withJvmMetrics()` when you create the reporter. If you call `.withJvmMetrics()`, the following metrics are added to the registry:

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