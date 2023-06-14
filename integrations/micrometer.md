---
title: Micrometer Integration
tags: [integrations list]
permalink: micrometer.html
summary: Learn about the Micrometer Integration.
---
# Micrometer Integration

To send Java application metrics to Wavefront you can use the Micrometer metrics library and the Wavefront registry. The registry sends data to Wavefront using the [Wavefront proxy](https://docs.wavefront.com/proxies.html), or it can send metrics directly to Wavefront services.

Starting with Spring Boot 2.0.0.M5, Micrometer is the instrumentation library powering the delivery of application metrics from Spring. The `micrometer-spring-legacymodule` provides drop-down support for Spring Boot 1.5.x.

This is a custom integration. You can send your own metrics and create your own dashboards.

## Micrometer Setup

Wavefront has a reporter for [Micrometer](http://micrometer.io/docs/registry/wavefront): [Wavefront reporter for Micrometer](https://github.com/micrometer-metrics/micrometer).

This page gives the setup steps. See the [Wavefront section of the Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready-metrics-export-wavefront) for some additional information.  



### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network and reachable from your Java application, install a proxy. You configure the Wavefront proxy hostname and port (by default 2878) when you create the reporter.

### Step 2. Set up Maven or Gradle

Add the Micrometer `io.micrometer`, and `org.slf4j` libraries as dependencies in your project:

#### POM.xml
If you are using Maven, add the following:
{% raw %}
```
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-api</artifactId>
  <version>LATEST</version>
</dependency>
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-wavefront</artifactId>
  <version>LATEST</version>
</dependency>
```
{% endraw %}

#### build.gradle
If you are using Gradle, add the following:
{% raw %}
```
compile 'io.micrometer:micrometer-registry-wavefront:latest.release'
```
{% endraw %}

### Step 3. Wavefront Configurations

#### Configuration Using the Wavefront Proxy{% raw %}
```
WavefrontConfig config = new WavefrontConfig() {
    @Override
    public String uri() {
        return "proxy://localhost:2878"; (1)
    }

    @Override
    public String get(String key) {
        return null; (2)
    }

    @Override
    public String prefix() {
        return "wavefront";
    }
};
MeterRegistry registry = new WavefrontMeterRegistry(config, Clock.SYSTEM);
```
{% endraw %}
  1. For URI, use the format `proxy://HOST:PORT`.
  2. Accept the defaults for other fields.

#### Configuration for Sending Data Directly to Wavefront{% raw %}
```
WavefrontConfig config = new WavefrontConfig() {
    @Override
    public String uri() {
        return "https://YOUR_CLUSTER.wavefront.com"; // (1)
    }

    @Override
    public String apiToken() {
        return "YOUR_API_TOKEN"; // (2)
    }

    @Override
    public String get(String key) {
        return null; // (3)
    }

    @Override
    public String prefix() {
        return "wavefront";
    }
};
MeterRegistry registry = new WavefrontMeterRegistry(config, Clock.SYSTEM);
```
{% endraw %}
  1. This configuration file uses `https://YOUR_CLUSTER.wavefront.com`, which is the Wavefront instance that is going to receive data.
  2. API token is the token that you can use to access the Wavefront API. Details can be found [here](https://docs.wavefront.com/wavefront_api.html#invoking-the-api).
  3. Accept the defaults for other fields.

#### Example

The following code fragment creates a Wavefront registry that emits data every 10 seconds for:

- A Wavefront proxy on `localhost` at port `2878`
- Data that should appear with the source `app-1.company.com`
- Reporter-level point tags named `dc` and `service`
- A counter metric `micrometer.counter`
{% raw %}
```
import io.micrometer.core.instrument.Clock
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.wavefront.WavefrontConfig;
import io.micrometer.wavefront.WavefrontMeterRegistry;
import java.time.Duration;

public class SimpleWavefrontProxyTest extends Thread {

    MeterRegistry registry = null;
    Counter counter = null;
    int no = 0;

    public SimpleWavefrontProxyTest(WavefrontConfig config) {
        registry = new WavefrontMeterRegistry(config, Clock.SYSTEM);
        counter = registry.counter("micrometer.counter", "dc", "west", "service", "app");
    }

    public static void main(String[] args) {
        final String proxyHost = "localhost";
        final int proxyPort = 2878;
        final WavefrontConfig config = new WavefrontConfig() {
            @Override
            public String uri() {
                return "proxy://" + proxyHost + ":" + proxyPort;
            }

            @Override
            public String source() {
                return "app-1.company.com";
            }

            @Override
            public String get(String key) {
                return null;
            }

            @Override
            public Duration step(){
              return Duration.ofSeconds(10);
            }

            @Override
            public String prefix() {
                return "wavefront";
            }
        };

        SimpleWavefrontProxyTest test = new SimpleWavefrontProxyTest(config);
        try {
            test.start();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while(true) {
            // increment a counter
            counter.increment();
            no++;
            System.out.println(no + " count: " + counter.count());
            try {
                sleep(1000);
            }
            catch(Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```
{% endraw %}

#### JVM Metrics

Micrometer provides several binders for monitoring the JVM.
{% raw %}
```
new ClassLoaderMetrics().bindTo(registry); (1)
new JvmMemoryMetrics().bindTo(registry); (2)
new JvmGcMetrics().bindTo(registry); (3)
new ProcessorMetrics().bindTo(registry); (4)
new JvmThreadMetrics().bindTo(registry); (5)
```
{% endraw %}
  1. Gauges loaded and unloaded classes.
  2. Gauges buffer and memory pool utilization.
  3. Gauges max and live data size, promotion and allocation rates, and times GC pauses (or concurrent phase time in the case of CMS).
  4. Gauges current CPU total and load average.
  5. Gauges thread peak, number of daemon threads, and live threads.



