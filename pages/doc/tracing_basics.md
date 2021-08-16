---
title: Distributed Tracing Overview
keywords: data, distributed tracing
tags: [getting started, tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Collect and visualize trace data from your applications.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a request. This visibility can help you find errors and performance problems in your code. Wavefront supports OpenTracing and OpenTelemetry for tracing.

In an application that consists of multiple services, an incoming request typically starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into that chain across services, even when those services are running in different environments.

You can use Wavefront tracing dashboards and browsers to:

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors.
* Pinpoint the specific operations that bottlenecks occur in.

## Distributed Tracing Videos

Watch these videos to listen to our Co-founder Clement Pang introduce distributed tracing with Wavefront, and give updates including improved ingestion options and intelligent sampling:

{% include shared/badge.html content="You need either [Proxy Management permission](permissions_overview.html) or [Direct Data Ingestion permission](permissions_overview.html) to send trace data from your application to Wavefront." %}

<table style="width: 100%;">
<tbody>
<tr><td width="48%"><a href="https://youtu.be/Z7mf_oZfcSE"><img src="/images/v_tracing_rev.png" alt="distributed tracing"/></a></td>
<td width="52%"><a href="https://youtu.be/SlROqypTUYk"><img src="/images/v_tracing_updates.png"  alt="Distributed Tracing Updates"/></a></td>
</tr>
</tbody>
</table>

## Instrument Your Application

[OpenTracing](https://opentracing.io/) and [OpenCensus](https://opencensus.io/) have merged to form [OpenTelemetry](https://opentelemetry.io/). 

{% include note.html content="If you are new to Wavefront, we recommend that you use OpenTelemetry because OpenTracing will be deprecated soon." %}

### OpenTelemetry

If your application uses OpenTelemetry, you can configure the application to send trace data to Wavefront using the Tanzu Observability (Wavefront) trace exporter. See [Sending Trace Data to Wavefront](opentelemetry.html#sending-trace-data-to-wavefront) and follow the steps to configure your OpenTelemetry application with Wavefront.

{% include important.html content="OpenTelemetry is still at it is early stage. Therefore, if you run into issues when configuring Wavefront with OpenTelemetry, contact [Wavefront Technical Support](wavefront_support_feedback.html#support) for help." %}

![This diagram shows how to send data to Wavefront if your application has OpenTelemetry.](images/tracing_opentelemetry_trace_exporter_data.png)

### OpenTracing

An application must be instrumented for tracing before it can send trace data to Wavefront. Wavefront supports several options. Here's the big picture:

![This diagram shows how to send data to Wavefront if your application has OpenTracing.](images/tracing_send_data_to_wavefront.png)

* **Configure Your Already Instrumented Applications**
  
  If you have already instrumented your code with Jaeger or Zipkin, you can forward the trace data to Wavefront using a [tracing integration](tracing_integrations.html). The integration sends the data through a Wavefront proxy.

* **Configure Applications That are Not Instrumented**

  If you have not yet instrumented your code, you can add instrumentation by using [Wavefront OpenTracing SDKs or the Wavefront Java Tracing Agent](tracing_instrumenting_frameworks.html#step-2-get-data-flowing-into-wavefront).
  The Wavefront OpenTracing SDKs let you to [choose how to send trace data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) -- through a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended. 

## Visualize Distributed Tracing Data in Wavefront

You use the Wavefront UI to visualize the trace data that you collect from your instrumented application. Wavefront offers the following dashboards and browsers to view information on your applications and services and you can navigate from one to another to gather more information:

<img src="images/tracing_ui.png" alt="tracing user interfaces"/>

### Examine Applications Using Application Status

Get an overview of how the applications and services are linked, understand the health of each service, and troubleshoot when your applications or services run into issues. You can get an overview and see the overall health of each application using the application map, table view and grid view. See [Application Status](tracing_ui_overview.html).

* [**Application Map**](tracing_ui_overview.html#application-map) view gives you an overview of how the applications and services are linked. You can focus on a specific service, view Request, Error, and Duration (RED) metrics for each service and see the tracing traffic, including the traffic direction.

  ![application map](/images/Application_map_intro.png)

* [**Table view**](tracing_ui_overview.html#table-view) lists the applications and services in the form of a table. You can see the Request, Error, and Duration (RED) metrics at a glance and sort the data.
  <img src="/images/tracing_table_view_intro.png" alt="the image shows the table view of all the applications that send data to Wavefront. It has helpers to show you what to do with each UI section. For example, how to filter applications or services, change the table settings or the legend settings, and how to change back to the application map view or the grid view"/>

* [**Grid view**](tracing_ui_overview.html#grid-view) lists the application and services in a grid. You can see the RED metrics for each of the application’s services.
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

You can export traces from Wavefront, save them locally as JSON files, and view them later using [Offline Traces](tracing_view_offline_traces.html).

![Shows how the offline traces look once you upload the JSOn file that has the imported trace details.](images/tracing_offline_tracing_view.png)

### Configure Applications Using Application Configuration

The Apdex score helps you compare the response time of a service based on the response time threshold that you define. Define the response time threshold for each service using the <a href="tracing_apdex.html">Application Configuration page</a>.

![The image shows where to click to edit the threshold value.](images/tracing_edit_service_legend_settings.png)


## Next Steps

- Familiarize yourself with the tracing concepts. See [Tracing Concepts in Wavefront](trace_data_details.html) for details.
- A large-scale web application can produce a high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  Wavefront limits the volume of trace data by performing [intelligent sampling](trace_data_sampling.html#wavefront-intelligent-sampling).
