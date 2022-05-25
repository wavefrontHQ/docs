---
title: Distributed Tracing Overview
keywords: data, distributed tracing
tags: [getting started, tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Collect and visualize trace data from your applications.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a request. This visibility can help you find errors and performance problems in your code. Tanzu Observability by Wavefront supports OpenTracing and OpenTelemetry for tracing.

In an application that consists of multiple services, an incoming request typically starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into that chain across services, even when those services are running in different environments.

You can use our tracing dashboards and browsers to:

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors.
* Pinpoint the specific operations that bottlenecks occur in.

## Distributed Tracing Videos

Watch these videos to listen to our Co-founder Clement Pang introduce distributed tracing, and give updates including improved ingestion options and intelligent sampling:

{% include note.html content="You need either [Proxy Management permission](permissions_overview.html) or [Direct Data Ingestion permission](permissions_overview.html) to send trace data from your application to the Wavefront proxy or the Wavefront service." %}

<table style="width: 100%;">
<tbody>
<tr><td width="48%"><a href="https://youtu.be/Z7mf_oZfcSE"><img src="/images/v_tracing_rev.png" alt="distributed tracing"/></a></td>
<td width="52%"><a href="https://youtu.be/SlROqypTUYk"><img src="/images/v_tracing_updates.png"  alt="Distributed Tracing Updates"/></a></td>
</tr>
</tbody>
</table>

## Instrument Your Application

[OpenTracing](https://opentracing.io/) and [OpenCensus](https://opencensus.io/) have merged to form [OpenTelemetry](https://opentelemetry.io/) and OpenTracing will be deprecated soon.

### OpenTelemetry

If your application uses an OpenTelemetry SDK, you can configure the application to send trace data to Tanzu Observability using any of the following options:

* [**Directly send OpenTelemetry data to the Wavefront proxy**](opentelemetry_tracing.html#directly-send-data-using-the-wavefront-proxy---recommended) - [Recommended]
  <img src="images/opentelemetry_proxy_tracing.png" alt="A data flow diagram that shows how the data flows from your application to the proxy, and then to Tanzu Observability" style="width:680px;"/>
* Or [**use the OpenTelemetry Collector and the Wavefront proxy**](opentelemetry_tracing.html#send-data-using-the-opentelemetry-collector-and-the-wavefront-proxy)
  ![A data flow diagram that shows how the data flows from your application to the collector, to the proxy, and then to Tanzu Observability](images/opentelemetry_collector_tracing.png)

### OpenTracing

An application must be instrumented for tracing before it can send trace data to Tanzu Observability. We support several options. Here's the big picture:

![This diagram shows how to send data to Wavefront if your application has OpenTracing.](images/tracing_send_data_to_wavefront.png)

* **Configure Your Already Instrumented Applications**

  If you have already instrumented your code with Jaeger or Zipkin, you can forward the trace data to the Wavefront proxy using a [tracing integration](tracing_integrations.html). The proxy sends the data to the Wavefront service.

* **Configure Applications That are Not Instrumented**

  The Wavefront OpenTracing SDKs let you to [choose how to send trace data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data) -- through a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended.
  
  If you have not yet instrumented your code, you can add instrumentation by using [Wavefront OpenTracing SDKs or the Wavefront Java Tracing Agent](tracing_instrumenting_frameworks.html#step-2-get-data-flowing).

## Visualize Distributed Tracing Data

You can visualize the trace data that you collect from your instrumented application with several dashboards and browsers. We show information on your applications and services, and you can navigate from one dashboard to another to see more detail:

<img src="images/tracing_ui.png" alt="tracing user interfaces"/>

### Examine Applications Using Application Status

Get an overview of how the applications and services are linked, understand the health of each service, and troubleshoot when your applications or services run into issues. You can get an overview and see the overall health of each application using the application map, table view and grid view. See [Application Status](tracing_ui_overview.html).

* [**Application Map**](tracing_ui_overview.html#application-map-features) view gives you an overview of how the applications and services are linked. You can focus on a specific service, view Request, Error, and Duration (RED) metrics for each service and see the tracing traffic, including the traffic direction.

  ![application map](/images/Application_map_intro.png)

* [**Table view**](tracing_ui_overview.html#table-view-features) lists the applications and services in the form of a table. You can see the Request, Error, and Duration (RED) metrics at a glance and sort the data.
  <img src="/images/tracing_table_view_intro.png" alt="the image shows the table view of all the applications that send data to Wavefront. It has helpers to show you what to do with each UI section. For example, how to filter applications or services, change the table settings or the legend settings, and how to change back to the application map view or the grid view"/>

* [**Grid view**](tracing_ui_overview.html#grid-view-features) lists the application and services in a grid. You can see the RED metrics for each of the application’s services.
  <img src="/images/tracing_grid_view_overview.png" alt="grid view of the services grouped by the application"/>

### Examine Application RED Metrics Using Service Dashboard

The default, read-only [dashboard for a service](tracing_service_dashboard.html) lets you explore trace data sent by each service in your application.
![service dahsboard](/images/service_dashboard_intro.png)

### Examine Operation RED Metrics Using Operation Dashboard

The [Operation Dashboard](tracing_operation_dashboard.html) shows the RED metrics for each operation. You can view data for each operations using the filters and drill down to the traces browser.
![operation dashboard](images/tracing_operations_dashboard_intro.png)

### Examine Traces Using Traces Browser

The [Traces Browser](tracing_traces_browser.html) supports a streamlined task flow for examining traces. You can perform trace queries, view query results, expand traces to see their member spans, and expand individual spans to see their details without having to navigate between pages and pop-ups.
![traces browser](/images/tracing_browser_intro.png)

### Examine Downloaded Traces Using Offline Traces

You can export traces you view in the Traces Browser, save them locally as JSON files, and view them later using [Offline Traces](tracing_view_offline_traces.html).

![Shows how the offline traces look once you upload the JSOn file that has the imported trace details.](images/tracing_offline_tracing_view.png)

### Create a Sampling policy

Our intelligent sampling algorithm reduces the volume of ingested traces. The goals of intelligent sampling are to retain traces that are likely to be informative. But sometimes intelligent sampling discards traces that you want to keep. You can [create a sampling policy](trace_sampling_policies.html) to fine-tune intelligent sampling and let the Wavefront service know that you want to keep certain spans.

![Shows a screenshot of the sampling polices user interface](images/tracing_sampling_policies.png)


### Configure Applications Using Application Configuration

The Apdex score helps you compare the response time of a service based on the response time threshold that you define. Define the response time threshold for each service using the <a href="tracing_apdex.html">Application Configuration page</a>.

![The image shows where to click to edit the threshold value.](images/tracing_edit_service_legend_settings.png)


## Next Steps

- Familiarize yourself with the tracing concepts. See [Tracing Concepts in Wavefront](trace_data_details.html) for details.
- A large-scale web application can produce a high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  We limit the volume of trace data by performing [intelligent sampling](trace_data_sampling.html#intelligent-sampling).
