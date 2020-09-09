---
title: Distributed Tracing Overview
keywords: data, distributed tracing
tags: [getting started, tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Collect and visualize trace data from your applications.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a request. This visibility can help you find errors and performance problems in your code.

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a request. This visibility can help you find errors and performance problems in your code. Wavefront supports OpenTracing and OpenTelemetry for tracing.

In an application that consists of multiple services, an incoming request typically starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into that chain across services, even when those services are running in different environments.

You can use Wavefront charts and dashboards for tasks such as the following:

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors.
* Pinpoint the specific operations that bottlenecks occur in.

## Distributed Tracing Videos

Watch this video to listen to our Co-founder Clement Pang introduce distributed tracing with Wavefront, and give updates including improved ingestion options and intelligent sampling:

<table style="width: 100%;">
<tbody>
<tr><td width="48%"><a href="https://youtu.be/Z7mf_oZfcSE"><img src="/images/v_tracing_rev.png" alt="distributed tracing"/></a></td>
<td width="52%"><a href="https://youtu.be/SlROqypTUYk"><img src="/images/v_tracing_updates.png"  alt="Distributed Tracing Updates"/></a></td>
</tr>
</tbody>
</table>

{% include shared/badge.html content="You need either [Proxy Management permission](permissions_overview.html) or [Direct Data Ingestion permission](permissions_overview.html) to send trace data from your application to Wavefront." %}

## Instrument Your Application

An application must be instrumented for tracing before it can send trace data to Wavefront. Wavefront supports several options. Here's the big picture:

![tracing architecture](images/tracing_send_data_to_wavefront.png)

### Already Instrumented
If you have already instrumented your code with Jaeger or Zipkin, you can forward the trace data to Wavefront using an integration. The integration sends the data through a Wavefront proxy.

* You can use OpenTelemetry (OpenTracing and OpenCensus have merged to form OpenTelemetry) to send traces to Wavefront using the Jaeger or Zipkin integration. See [OpenTelemetry](opentelemetry.html#sending-trace-data-to-wavefront) for details.
* If you have configured your applications using OpenTracing instrument your code with [Jaeger](jaeger.html) or [Zipkin](zipkin.html), you can set up a [tracing integration](tracing_integrations.html) to forward the trace data to Wavefront.

### Not Instrumented
If you have not yet instrumented your code, you can add instrumentation by using [Wavefront OpenTracing SDKs or the Wavefront Java Tracing Agent](tracing_instrumenting_frameworks.html#step-2-get-data-flowing-into-wavefront).
The Wavefront OpenTracing SDKs let you to [choose how to send trace data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) -- through a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended. <!--- See XX for guidelines for choosing a proxy vs. direct ingestion. --->

## Visualize Distributed Tracing Data in Wavefront

You use the [Wavefront UI to visualize the trace data](tracing_ui_overview.html) that you collect from your instrumented application.

![tracing architecture](images/tracing_ui_horizontal.png)

### Application Map

Get an overview of how the applications and services are linked, focus on a specific service, and view Request, Error, and Duration (RED) metrics for each service and the edges in the application using [application map](/tracing_ui_overview.html#application-map-beta). That’s not all, you can view traces for the services and edges and drill down from the application map.

![application map](/images/Application_map_intro.png)

### Application Status

View the status of all instrumented applications, or search for a particular application by applying filters and inspect Request Error and Duration (RED) metrics to obtain a status summary for an application.

![application status](/images/application_status_intro.png)


### Service Status

Examine the services in the application, and inspect Request Error and Duration (RED) metrics to obtain a status summary for a service.

![service status](/images/service_status_intro.png)

### Service dashboards

The default, read-only dashboard for a service lets you explore trace data sent by each service in your application.
![service dahsboard](/images/service_dashboard_intro.png)

### Tracing Browser

The Traces browser supports a streamlined task flow for examining traces. You can perform trace queries, view query results, expand traces to see their member spans, and expand individual spans to see their details, without having to navigate between pages and pop-ups.
![tracing browser](/images/tracing_browser_intro.png)

## Next Steps

- Familiarize yourself with the tracing concepts. See [Tracing Concepts in Wavefront](trace_data_details.html) for details.
- A large-scale web application can produce a high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  Wavefront limits the volume of trace data by performing [intelligent sampling](trace_data_sampling.html#wavefront-intelligent-sampling).
