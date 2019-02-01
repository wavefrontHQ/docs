---
title: Using a 3rd Party Distributed Tracing System
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_integrations.html
summary: Learn about ways to send trace data to Wavefront from a 3rd party distributed tracing system.
---

You can collect [traces](tracing_basics.html#wavefront_trace_data) with a 3rd party distributed tracing system, and send the trace data to Wavefront. Wavefront provides managed, highly scalable storage for your trace data, as well as RED metrics that are derived from the spans.

For example, suppose you have already instrumented your application using a 3rd party distributed tracing system. You can continue using that system for application development, and then switch to a Wavefront proxy in production by changing a few configuration settings. 

**Note:** If you have not yet [instrumented your application for tracing](tracing_instrumenting_frameworks.html), consider doing so with one or more [Wavefront observability SDKs](wavefront_sdks.html).

## Tracing-System Integrations

Wavefront provides integrations with several popular 3rd party distributed tracing systems. For setup steps, see the integration for your distributed tracing system:
* [Jaeger](jaeger.html)  
* [Zipkin](zipkin.html)

A Wavefront tracing-system integration causes your distributed tracing system to send trace data to a [Wavefront proxy](proxies_installing.html). The proxy, in turn, processes the data and sends it to your Wavefront service. Part of setting up the integration is to configure the Wavefront proxy to listen for the trace data on an integration-specific port.

**Note:** An [alternative to using a tracing-system integration](#alternatives-to-using-a-tracing-integration) might be appropriate for certain use cases.

## Trace Data from an Integration

When you use a tracing-system integration, the Wavefront proxy receives the trace data that your application emits. If you configured your distributed tracing system to perform sampling, the proxy receives just the subset of the spans that sampling has accepted. 

The Wavefront proxy:
* Ensures that each span has the span tags that are required by Wavefront.
* Derives RED metrics from the received spans.

### Required Span Tags

Wavefront uses a set of required [application tags](tracing_instrumenting_frameworks.html#how-wavefront-uses-application-tags) to aggregate and filter data at different levels of granularity.
The Wavefront proxy checks for these tags on each span it receives from your distributed tracing system, and automatically adds them as necessary:

<table>
<colgroup>
<col width="20%"/>
<col width="35%"/>
<col width="35%"/>
</colgroup>
<thead>
<tr><th>Tag Name</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`application`</td>
<td markdown="span">Name that identifies the application that emitted the span. </td>
<td markdown="span">By default, the name of your distributed tracing system, i.e., `Jaeger` or `Zipkin`.</td>
</tr>
<tr>
<td markdown="span">`service`</td>
<td markdown="span">Name that identifies the microservice that emitted the span. </td>
<td markdown="span">The service name you specified to your distributed tracing system.</td>
</tr>
</tbody>
</table>


**Note:** The proxy preserves any tags that you assigned through your distributed tracing system. You can explicitly instrument your code to add an `application` tag with a more meaningful application name.


### Derived RED Metrics

When you use a tracing-system integration, Wavefront derives RED metrics from the spans that are sent from each instrumented service in your application. You can use these metrics to help you find the traces in which problems occur.

RED metrics are measures of: 

* Requests -- the number of requests being served per second
* Errors -- the number of failed requests per second
* Duration -- per-minute histogram distributions of the amount of time that each request takes

In addition to the RED metrics, we list the most frequently invoked operations, the operations with the most errors, and the slowest operations.

Wavefront stores the RED metrics along with the spans from which they were derived. Wavefront uses the tag values from the input spans to organize the RED metrics by application and service.  


## Visualizing Trace Data from an Integration

You view trace data from an integration using Wavefront charts and queries. 

If you want context for identifying problem traces, you can start with the derived RED metrics:

1. Select **Applications > Inventory** in the task bar, and find the application (by default, `Jaeger` or `Zipkin`).
2. Click on the service whose derived RED metrics you want to see. 
3. Select an operation from one of the lists to display the **Traces** page for that operation. <!---by following the steps in _[[Link to subsection of Tracing a Hotspot Across Services page]]_.--->

If you want to view trace data directly, you can start with [a trace query](trace_data_query.html): 
1. Select **Applications > Traces** in the task bar.
2. In the **Traces** page, [build a trace query](trace_data_query.html#building-a-trace-query) by selecting the filters that describe the spans of interest. At a minimum, you must click on the Operation menu and select the application (by default, `Jaeger` or `Zipkin`) and, optionally, a service and operation. 


## Trace Sampling and Derived RED Metrics

When you use a 3rd party distributed tracing system, you normally configure it to perform sampling. Doing so means that the Wavefront proxy receives only a subset of the generated spans, and the derived RED metrics will reflect just that subset.

For more accurate RED metrics, you can consider setting up sampling through the Wavefront proxy instead of using the 3rd party sampling. The Wavefront proxy derives the RED metrics before it performs sampling. You need proxy version 4.36 or later.


## Alternatives to Using a Tracing-System integration

### Swapping In a Wavefront Tracer
If you are using Jaeger (or some other tracing system that is compliant with the [OpenTracing](https://opentracing.io) specification), you can substitute a Wavefront Tracer for the Jaeger Tracer. 

Swapping Tracers enables Wavefront to derive the RED metrics from the entire set of generated spans. In contrast, using the Jaeger integration causes the derived RED metrics to reflect just the subset of spans that are admitted by the Jaeger sampling.

For SDK setup details, see the Wavefront OpenTracing SDK for your programming language:
* [Java](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java) 
* [Python](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python)
* [.NET/C#](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)

### Sending Raw Trace Data
If Wavefront does not support an integration for your distributed tracing system, or if you are using your own proprietary tracing system, you can use a core SDK to send raw trace data to Wavefront. With a core SDK, you can write code that obtains the component values from your spans, and assembles those values into the [Wavefront span format](). The core SDK also lets you configure your application to send the trace data to a Wavefront proxy or directly to the Wavefront service. 

For SDK setup details, see the Wavefront core SDK for your your programming language:

* [Java](https://github.com/wavefrontHQ/wavefront-sdk-java) 
* [Python](https://github.com/wavefrontHQ/wavefront-sdk-python)
* [.NET/C#](https://github.com/wavefrontHQ/wavefront-sdk-csharp)

**Note:** This technique does not automatically derive RED metrics from the spans.










<!---
<table>
<colgroup>
<col width="18%"/>
<col width="50%"/>
<col width="32%"/>
</colgroup>
<thead>
<tr><th>Menu</th><th>Description</th><th>Example</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> </td>
<td markdown="span"> </td>
<td markdown="span"> </td>
</tr>
</tbody>
</table>


--->
