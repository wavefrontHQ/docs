---
title: Migrate from OpenTracing to OpenTelemetry
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: opentracing_to_opentelemetry_migration.html
summary: Migrate your Java application from OpenTracing to use OpenTelemetry.
---

OpenTracing is deprecated. ([OpenTracing](https://opentracing.io/) and [OpenCensus](https://opencensus.io/) have merged to form [OpenTelemetry](https://opentelemetry.io/).) To send trace data to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront), use OpenTelemetry.

{% include note.html content="Read the [OpenTelemetry documentation](https://opentelemetry.io/docs/migration/opentracing/) for migration options and strategies." %}

This guide shows you how to migrate a Java application that uses OpenTracing to use OpenTelemetry.

## Update the pom.xml File

Follow these steps to add the OpenTelemetry dependencies to your Java project's `pom.xml` file.

1. Add the OpenTelemetry  Bill of Materials (BOM).
    ```xml
    <properties>
        <otel.version><Add the OpenTelemetry version. For example, 1.20.1.></otel.version>
    </properties>
    
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>io.opentelemetry</groupId>
                <artifactId>opentelemetry-bom</artifactId>
                <version>${otel.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>io.opentelemetry</groupId>
                <artifactId>opentelemetry-bom-alpha</artifactId>
                <version>${otel.version}-alpha</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    ```
1. Add the OpenTelemetry dependencies.
    ```xml
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-opentracing-shim</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-api</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk</artifactId>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>
    ```

## Add the OTelConfig.java File

Add the `OTelConfig.java` file to your Java project.

Example:

```java
package com.your.package;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nullable;

import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.common.AttributesBuilder;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.resources.Resource;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;


public class OTelConfig {
  private static final String SERVICE_NAME_KEY = "service.name";
  private static final String OTEL_COLLECTOR_ENDPOINT = "http://localhost:4317";
  private static final String APP_NAME_KEY = "application";
  private static final String CLUSTER = "cluster";
  private static final String SHARD = "shard";

  // Adds a BatchSpanProcessor initialized with OtlpGrpcSpanExporter to the TracerSdkProvider.
  public static OpenTelemetry newOpenTelemetry(Resource res) {
    OtlpGrpcSpanExporter spanExporter = getOtlpGrpcSpanExporter();
    BatchSpanProcessor spanProcessor = getBatchSpanProcessor(spanExporter);
    SdkTracerProvider tracerProvider = getSdkTracerProvider(spanProcessor, res);
    OpenTelemetrySdk openTelemetrySdk = getOpenTelemetrySdk(tracerProvider);
    Runtime.getRuntime().addShutdownHook(new Thread(tracerProvider::shutdown));

    return openTelemetrySdk;
  }

  public static Resource resource(String appName, String serviceName) {
    return resource(appName, serviceName, null, null, null);
  }

  public static Resource resource(String appName, String serviceName, @Nullable String cluster,
                                  @Nullable String shard, @Nullable Map<String, String> customTags) {
    AttributesBuilder builder = Attributes.builder().put(SERVICE_NAME_KEY, serviceName)
        .put(APP_NAME_KEY, appName);
    if (cluster != null) {
      builder.put(CLUSTER, cluster);
    }
    if (shard != null) {
      builder.put(SHARD, shard);
    }
    if (customTags != null) {
      for (Map.Entry<String, String> kv : customTags.entrySet()) {
        builder.put(kv.getKey(), kv.getValue());
      }
    }
    return Resource.getDefault().merge(Resource.create(builder.build()));
  }

  private static OpenTelemetrySdk getOpenTelemetrySdk(SdkTracerProvider tracerProvider) {
    return OpenTelemetrySdk.builder().setTracerProvider(tracerProvider)
        .build();
  }

  private static SdkTracerProvider getSdkTracerProvider(BatchSpanProcessor spanProcessor,
                                                        Resource res) {
    return SdkTracerProvider.builder().addSpanProcessor(spanProcessor)
        .setResource(res).build();
  }

  private static BatchSpanProcessor getBatchSpanProcessor(OtlpGrpcSpanExporter spanExporter) {
    return BatchSpanProcessor.builder(spanExporter)
        .setScheduleDelay(100, TimeUnit.MILLISECONDS).build();
  }

  private static OtlpGrpcSpanExporter getOtlpGrpcSpanExporter() {
    return OtlpGrpcSpanExporter.builder()
        .setEndpoint(OTEL_COLLECTOR_ENDPOINT)
        .setTimeout(2, TimeUnit.SECONDS)
        .build();
  }
}
```

## Create Your Tracer

For OpenTracing, you created the tracer using the Operations for Applications SDKs. To create the Tracer for OpenTelemetry, use the OpenTracing Shim.

1. Create the tracer using the OpenTelemetry to OpenTracing Shim.
    <br/>Example: 
    ```java
    public static Tracer generateOTelTracer(Resource res) {
    return OpenTracingShim.createTracerShim(OTelConfig.newOpenTelemetry(res));
    }
    ```
1. Create a Resource to invoke the function you created:
    <br/>Example:
    ```java
    Resource resource = OTelConfig.resource(appName, serviceName);
    ```

Save the changes and run the application to send the trace data to Operations for Applications.

## Next Steps

For details on configuring your application to send traces or metrics to Operations for Applications using the Wavefront proxy or the OpenTelemetry Collector, see [Send OpenTelemetry Data](opentelemetry_tracing.html).
