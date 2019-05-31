---
title: Tracing Best Practices
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_best_practices.html
summary: Best practices for collecting and sending trace data from an application to Wavefront.
---

Wavefront supports various techniques for instrumenting your applications to collect and send trace data to Wavefront. The best practices on this page will help you get optimal results from whichever technique you choose.

## Planning for Tracing

Before you start instrumenting your application:
* Learn about trace data. 
  - Traces represent end-to-end requests across microservices, and are composed of spans, which represent calls to individual operations.
  - See [Tracing Basics](tracing_basics.html) for basic concepts. 
  - See [https://opentracing.io/](https://opentracing.io/) for comprehensive discussion and details. 
* Inventory your application for instrumentation.
  - Does your application consist of multiple microservices? Which ones participate in the most critical requests?
  - What programming language or languages are these microservices written in?  
  - Are any microservices built with open-source component frameworks? Which frameworks?
* Choose your Wavefront instrumentation support. 
  - For best results, instrument your application with one or more [Wavefront observability SDKs](wavefront_sdks.html). Use a Wavefront OpenTracing SDK alone, or in combination with Wavefront framework SDKs, if any are available for microservice languages and frameworks.
  - If you have already instrumented your application with a 3rd party distributed tracing system such as Jaeger or Zipkin, use a [Wavefront integration](tracing_integrations.html). 
  - For microservices that participate in the same traces, use either Wavefront SDKs or a 3rd party tracing system. Without consistent instrumentation, spans cannot link to each other across microservice boundaries. (It's OK for microservices to use different Wavefront SDKs in different programming languages.)

## Best Practices for Sending Trace Data to Wavefront

Large-scale applications should use a Wavefront proxy to send trace data to Wavefront. 

### When Using Wavefront Observability SDKs
If you are instrumenting your application with Wavefront observability SDKs, you must: 

* [Install and configure the Wavefront proxy](tracing_instrumenting_frameworks.html#to-prepare-a-wavefront-proxy) with listener ports for metrics, histograms, and spans. (Be sure to configure the proxy with the `histogramDistListener` property. You might overlook this property if you have already configured the proxy for metrics.)

Use same ports in instrumented code. Java: Instantiate a singleton WFSender. (See GitHub readme for other languages)

### When Using 3rd Party Tracing Systems

3rd party systems - follow directions in integration setup. configure proxy with integration port.

## Application Inventory Best Practices 
<!---
An application is a hierarchic inventory of constructs: App consists of services. Services are built using components.  
Assign logical names to each application construct. 
Here's how they're used => (span tags, filtering traces in queries & UI, qualifiers for operation names represented by spans)

For best results: Unique within scope. Low cardinality. When using a WF OT SDK, define a `component` tag for better granularity in UI and filtering. 

Set as tags in instrumented code. Java: Instantiate a singleton AppTags. (See GitHub readme for other languages). Include custom tags as necessary.
--->

## Source Names Best Practices

## Span Names Best Practices


## Custom Span Tags Best Practices

## Instrumentation Best Practices
