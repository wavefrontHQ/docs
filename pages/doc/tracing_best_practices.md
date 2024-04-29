---
title: Tracing Best Practices
keywords: data, distributed tracing
tags: [tracing, best practice]
sidebar: doc_sidebar
permalink: tracing_best_practices.html
summary: Best practices for collecting and sending trace data to Tanzu Observability (formerly known as VMware Aria Operations for Applications)).
---

The best practices on this page help you get optimal results from instrumenting your application for tracing with our service.

## Planning for Tracing

1. Learn about traces and spans.
   -**Traces** represent end-to-end requests across services and consist of spans.
   -**Spans** represent calls to individual operations.

   See [Tracing Basics](tracing_basics.html) for basic tracing concepts, and see [https://opentelemetry.io/docs/](https://opentelemetry.io/docs/) for details.

2. Examine your application to answer these questions:
* Which services belong to your application? Which ones participate in the most critical requests?
* What programming language or languages are these services written in?
* Are any services built with open-source component frameworks? Which frameworks?

3. Choose your instrumentation support.

   * If you have already instrumented your application with a 3rd party distributed tracing system such as Jaeger or Zipkin, set up an [**integration**](tracing_integrations.html).

   * Use **consistent instrumentation**, either Tanzu Observability SDKs or a 3rd party tracing system for all services that participate in the same trace. Otherwise, spans cannot link to each other across service boundaries. You can intermix different Tanzu Observability SDKs in different programming languages.

## Best Practices for Sending Trace Data Through a Wavefront Proxy

For reliable performance, use a Wavefront proxy to send trace data to your Tanzu Observability service. A proxy is required with the Jaeger and Zipkin integrations. [Direct ingestion](direct_ingestion.html#proxy-or-direct-ingestion) might seem like an easy way to get results quickly, but the buffering and queuing that the proxy performs is especially useful with trace data.

### Best Practices for Tanzu Observability SDKs

1. [Install and configure the Wavefront proxy](tracing_instrumenting_frameworks.html#to-prepare-for-using-a-wavefront-proxy) with listener ports for metrics, histograms, and trace data. All three types of data are necessary for displaying RED metrics derived from spans.

    {% include note.html content="Configure the proxy with the `histogramDistListener=` property. You might overlook this property if you are already using a proxy that is configured for metrics." %}

2. Configure your application code to send data via the Wavefront proxy:
* Set up a [Wavefront sender](trace_data_details.html#wavefront-sender-object) that can connect to the Wavefront proxy host.
  - Configure the Wavefront sender with the same listener ports you set for the Wavefront proxy.
  - Instantiate a single Wavefront sender per process and share it among SDKs.

  **Java example:** Instantiate a singleton `WavefrontSender`

```java
  WavefrontClientFactory wavefrontClientFactory = new WavefrontClientFactory();
  wavefrontClientFactory.addClient("https://someToken@DOMAIN.wavefront.com");
  wavefrontClientFactory.addClient("proxy://our.proxy.lb.com:2878");

  WavefrontSender wavefrontSender = wavefrontClientFactory.getClient();
```

{% include tip.html content="Complete setup steps are in the README file for your Tanzu Observability SDK on GitHub." %}

### Best Practices for Jaeger and Zipkin

If you're using a [Jaeger](jaeger.html) or [Zipkin](zipkin.html) integration, follow the setup steps to configure the Wavefront proxy with a special port for the integration.

{% include note.html content="Log in to your service instance to configure the integration to automate the setup. The steps in this doc set only give an overview. " %}

The integration instantiates and configures an internal Wavefront sender for you.

## Application Inventory Best Practices

Think of your instrumented application as a hierarchic inventory of constructs. You must assign a name to the constructs at each level. Consider this example:

<table>
<colgroup>
<col width="20%" />
<col width="35%" />
<col width="45%" />
</colgroup>
<thead>
<tr><th>Construct</th><th>Example Names</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">Application</td>
<td markdown="span">`beachshirts`</td>
<td markdown="span">Top-level construct that identifies a set of interacting services. </td>
</tr>
<tr>
<td markdown="span">Service</td>
<td markdown="span">`"delivery"`, `"packaging"`, `"printing"`</td>
<td markdown="span">Constructs that implement the operations to be traced.</td>
</tr>
<tr>
<td markdown="span">Component</td>
<td markdown="span">`"grpc"`, `"django"`, `"jersey"`</td>
<td markdown="span">Open-source component frameworks that services might be built with. </td>
</tr>
</tbody>
</table>

Our service uses these names as span tag values, as filters for traces, as components in RED metric names, and as qualifiers for operation names, for example, `beachshirts.delivery.dispatch`.

### Guidelines for Choosing Application Construct Names

* Choose a string name for each construct. Names at the same level must be unique.
  - **Example:** Specify only one application named `beachshirts` in a Tanzu Observability instance, and only one service named `delivery` in a given application.
  {% include important.html content="Duplicate application, service, or component names might result in incorrect RED metrics. " %}
* Choose logical names that clearly map to your applications and services. Logical names might be simpler, more readable versions of code identifiers.

### Best Practices for Tanzu Observability SDKs

* Set up an [Application tags object](trace_data_details.html#application-tags) in each service to define logical names for the application constructs. Specify the logical application and service names that apply to the service. Optionally, if you want to use the physical topology to filter your data, include logical cluster and shard names.

   **Java example:** Instantiate `ApplicationTags` for the `delivery` service

```java
  String application = "beachshirts";
  String service = "delivery";
  String cluster = "us-west-2";
  String shard = "secondary";

  Map<String, String> customTags = new HashMap<String, String>() { {
    put("location", "Oregon");
    put("env", "Staging");
    put("component", "Jersey");
   } } ;

  ApplicationTags applicationTags = new ApplicationTags.Builder(application, service).
      cluster(cluster).
      shard(shard).
      customTags(customTags).
      build();
```

{% include tip.html content="Complete setup steps are in the README file for your Tanzu Observability SDK on GitHub. " %}


### Best Practices for 3rd Party Tracing Systems

Our service automatically assigns standard application names, service names, and component names, based on the tags that are set for your 3rd party distributed tracing system.

## Source Names Best Practices

A source is a host, container, Kubernetes pod, instance, or any other unique origination point for application code that is sending a span to our service.

You must choose unique names for the sources that send spans. Tanzu Observability uses source names to filter traces and to define RED metrics.


### Guidelines for Choosing Source Names

* Choose a unique string name for every source that will send spans to our service.
  - For example, use a machine's IP address or a descriptive logical name.
  - If you use a machine's host name (the default), make sure all machines have unique host names. Use logical names to distinguish machines with the same host names in different data centers.

  {% include note.html content="Duplicate source names might result in incorrect RED metrics." %}

* See also the guidelines for choosing [source names for metric data and histograms](wavefront_data_format.html#source-names-best-practices).


### Best Practices for Tanzu Observability SDKs

* Set up a [WavefrontSpanReporter object](trace_data_details.html#wavefronttracer-and-wavefrontspanreporter) to define a source name:
  - Specify the source name explicitly, or leave it unspecified to automatically use the host name. Make sure the host name is unique.
  - If your Tanzu Observability SDK defines additional reporters, specify the same source name in each one. All reporter objects for a particular service must specify the same source.

   **Java example:** Build a `WavefrontSpanReporter` that reports from a source called `wavefront-tracing-example`.

```Java
  // Create a WavefrontProxyClient
  WavefrontSender wavefrontSender = ...

  Reporter wfSpanReporter = new WavefrontSpanReporter.Builder().
    withSource("wavefront-tracing-example").
    build(wavefrontSender);
```

{% include tip.html content="Complete setup steps are in the README file for your Tanzu Observability SDK on GitHub." %}


## Span Names Best Practices

Spans are the building blocks of traces. Each span corresponds to a particular invocation of an operation. For example, a span might represent a specific method call such as `getShoppingMenu(menu_id=123)`.

The OpenTracing standard requires that you choose names for the spans that your instrumented application creates and sends. We use span names:
* As part of the data format of each span
* As filters for traces
* As the basis for RED metrics, for example, to report the number of calls to the `getShoppingMenu`  method per minute.


### Guidelines for Choosing Span Names

* When you name a span, use the name of the operation or method being invoked as the span name.
* Adopt naming conventions so that you’ll end up with no more than 1000 unique span-source pairs.
* Add extra detail as span tags, instead of incorporating that detail into the span name.
* **Example:** Suppose you are instrumenting a call to `getShoppingMenu(menu_id=123)`.
  - A good choice for the span name is `getShoppingMenu`. You might add a custom span tag `menu_id=123` to preserve the menu ID detail.

  - A poor choice for the span name is `getShoppingMenu_123`. If you incorporate the menu ID detail directly into the span names, you might end up with unique span names like `getShoppingMenu_122`, `getShoppingMenu_123`, `getShoppingMenu_124`, ... `getShoppingMenu_nnn`, which all represent calls to the same piece of code. The result is a cardinality explosion!

### Best Practices for Jaeger

If you are using Jaeger, verify that the number of generated span names will result in fewer than 1000 unique span-source pairs. If necessary, fix Jaeger instrumentation to produce fewer span names.

## Custom Span Tags Best Practices

You can define custom span tags to let you query and filter for particular subsets of trace data.

[Indexing](trace_data_details.html#indexed-and-unindexed-span-tags) optimizes the speed of querying and filtering with tags. By default, our service indexes all point tags and certain built-in span tags. Indexing for custom span tags is available on request.

### Guidelines for Defining Custom Span Tags

* Do not have more than 50 custom span tags.

* Do not have more than 100 values assigned to a span tag. Keep the cardinality of custom span tags low.

* [Contact technical support](wavefront_support_feedback.html) to request indexing for those span tags. Indexing is available only for low-cardinality custom span tags.

## Instrumentation Best Practices

The goal of instrumentation is to instrument enough methods to produce traces that can help you troubleshoot errors or pinpoint bottlenecks. You usually do this in successive passes.

1. **Go wide:** Produce end-to-end traces across all services.
  * Focus on the entry/exit points of your services. Instrument each inbound and outbound request to report spans.

2. **Go deep:** Produce traces that contain a deep, meaningful hierarchy of spans.
  * Identify the classes and methods that implement significant operations within each service, and instrument those methods.

### Best Practices for Tanzu Observability SDKs

* Limit the number of spans in a trace to < 1000.

* **Java example:** Instantiate a singleton `WavefrontTracer`, pass it to each class, and use it in each method of interest:

```Java
  Span span = tracer.buildSpan("<name>").start();
  try {
    //app logic
  } catch (HandledException e) {
    // handle exception logic
    Tags.ERROR.set(span, true);
  } finally {
    span.finish();
  }
```

## Sampling Best Practices

A large-scale web application can produce a high volume of traces. Consider limiting the volume of trace data using a head-based [sampling strategy](trace_data_sampling.html). By default, [intelligent sampling](trace_data_sampling.html) limit the data coming in, but you can create a custom trace sampling policy.

## Using Tracing with Spring Boot

Assume that you are using Spring Boot 2 with Sleuth or Spring Boot 3 with Micrometer Tracing, and you are using a `RestTemplate` to send and receive messages between microservices:
* Everything has to be a bean. All `RestTemplate` usage must come from a bean for distributed tracing to work.
* You can create a `RestTemplate` bean yourself or inject it via the `RestTemplateBuilder`.
* If you invoke a Remote Procedure Call (RPC) or messaging service without using a bean, Sleuth, and Micrometer Tracing won't work. 

### Example: Works for Spans Across Services

Here is a sample code snippet written for spans across services. The snippet uses `RestTemplate`:

```java
package com.demo.test.tier2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
Controller to test RestTemplate configuration
*/
@RestController
public class Tier2aEndpoint {

  private static final String uri = "http://localhost:8083/tier3a";

  private final RestTemplate restTemplate;

  public Tier2aEndpoint(RestTemplateBuilder builder) {
    this.restTemplate = builder.build();
  }

  @RequestMapping("/tier2a")
  public String tier2a() {
    String response = restTemplate.getForObject(uri, String.class);
    return "tier2a " + response;
  }
}
```

## Learn More!

[Optimizing the Data Shape to Improve Performance](optimize_data_shape.html) has a focus on time series metrics but some of the guidance applies to trace data as well.
