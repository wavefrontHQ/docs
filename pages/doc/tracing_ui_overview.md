---
title: Visualizing Traces, Spans, and RED Metrics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Explore traces and spans from the Wavefront UI.
---

The Wavefront tracing UI enables exploration of your apps and services. Once your application is instrumented for tracing, you can examine traces, spans, and RED metrics, moving easily from one browser page to the next.

This page explains how you can examine trace data from our UI. You'll learn how to query for traces, examine details, find potential problems, and more.


## Choose Your Starting Point

To choose your starting point for visualizing traces:
1. In your web browser, go to your Wavefront cluster and log in.
2. From the task bar:

    - Select **Applications > Application Status** to [view the status of your instrumented applications](#view-application-status) and drill down from there.
    - Select **Applications > Traces** to start by [querying for traces](#query-for-a-list-of-traces) and drill down from there.

    ![tracing menu](images/tracing_menu.png)

## View Application Status

Go to the Applications page for a top-level status overview of your instrumented applications.

![app status](images/tracing_application_status.png)

On the Applications page, you can:
* View the status of all instrumented applications, or search for a particular application by applying filters.
  - Apply one or more filters to select application name, cluster, or shard and click **Apply**.
* Inspect RED metrics to obtain a status summary for an application:
  - The total number of requests that are represented by the application's spans.
  - The percentage of the application's spans that contain errors.
  - The span duration (in milliseconds) at the 95th percentile across the application.
* Sort the displayed applications by name or by a RED metric.
* Click an application name for an overview of its services.


## View the Services of an Application

When you select an application, you get an overview of its services.

![app services](images/tracing_app_services.png)

On the page for a particular application, you can:
* Examine the services in the application, or search for a particular service by applying filters.
* View the inventory of component frameworks that each service is built on.
* Inspect RED metrics to obtain a status summary for a service:
  - The total number of requests that are represented by the service's spans.
  - The percentage of the service's spans that contain errors.
  - The span duration (in milliseconds) at the 95th percentile across the service.

* Drill down from a service box:
  - Click the name of the service or **Details** to [explore the dashboard for that service](#explore-the-default-service-dashboard).
  - Click **All Traces** to [explore the traces](#explore-traces) that originate in that service.


## Examine Service Metrics and Drill Down

When you click on a service's **Details**, you can examine a dashboard of metrics to identify potential hot spots, and then drill down to the Traces browser.

### Explore the Default Service Dashboard

The default, read-only dashboard for a service lets you explore that service, however, you can't make changes to the dashboard.

![examine services](images/tracing_services.png)

{% include note.html content="You can add these charts to a dashboard and customize them using [Tracing Templates](ui_dashboards.html#create-a-dashboard-from-a-tracing-template). " %}

On the dashboard for a particular service, you can:
* Select the time and time zone in the task bar to customize the chart time properties.
* Use the **Jump To** pulldown to select a dashboard section:
  - Select **Overview** to examine the RED metrics that are derived from all of the spans for the service. These metrics reflect the health of the service.
  - Select an individual component to examine metrics for just that component of the service. A component could be an instrumented framework (e.g., **Jersey**) or the runtime system (e.g., **JVM**).
  - Select **System** if your environment uses Telegraf and you want to view CPU usage, memory usage, and disk usage.
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
<a name="Tracesbrowser"></a>
* Examine the TopK charts to find out which operations are potential hot spots. The bars represent operations that execute in this component of the service.
* Navigate to the Traces browser.
  * Click a bar on a histogram.
  * Click a bar on a TopK chart.
  * Click the vertical ellipsis in the top right of any chart, click **Traces**, and click a service.
    {% include note.html content="If you don’t see **Traces**, check whether your metrics include `application` and `service point` tags.<br/><br/> These tags are defined when you instrument your application for tracing via [Application tags](tracing_instrumenting_frameworks.html#application-tags). If your application is already sending this data into Wavefront via the Wavefront proxy, you can add point tags using [Wavefront proxy preprocessor rules](proxies_preprocessor_rules.html#addtag-and-addtagifnotexists)." %}

### Custom Service Dashboard

The standard dashboard for services is read-only. To create a customizable copy:

1. Click **Clone** from the ellipsis menu.
2. In the cloned dashboard, add your own charts or customize the RED metrics charts. (Use the [ts_countersum](ts_countersum.html) function to display RED metrics.)

After you save the clone, you can find it by name from the **Dashboards** menu of the task bar, and you can use it to drill down to the Traces browser.

## Explore Traces

In the Traces browser, you can explore the context and the details of your application's traces.

* Navigate from the service's page to display traces for operations you selected.
* Select **Applications > Traces** from the task bar to display an empty page that you populate by [querying](trace_data_query.html).

![explore trace browser](images/tracing_traces_browser.png)

From the Traces browser, you can:
* Query for traces and view the query results in the [traces list](#query-for-a-list-of-traces).
* Select a trace in the list and:
  - Use the [service map panel](#investigate-the-service-map-for-a-trace) to investigate the services that contribute spans to the trace.
  - Use the [trace details panel](#examine-trace-details) to examine the individual spans in the trace.
* Examine a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces.

You can toggle the panel size for the traces list, service map, or trace details.

## Query for a List of Traces

In the Traces browser, you can [use the query builder or query editor](trace_data_query.html) to query for traces that include spans for a particular operation.

You can view the results in a traces list.

![explore traces list](images/tracing_traces_browser_traces_list.png)

Here's how to get started:
1. Add an Operation or Trace ID. See [Get Started with Trace Queries](trace_data_query.html#get-started-with-trace-queries) for details.
2. Click **Add Filter** and specify a filter to limit the results.
3. (Optional) Advanced users can use Query Editor to limit the scope even further.

You can use the trace list to:

* Sort the returned traces according to different criteria.
* Click a trace to view its context in the [service map panel](#investigate-the-service-map-for-a-trace) and its details in the [trace details panel](#examine-trace-details).
* View a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces -- and potentially find outliers.

## Investigate the Service Map for a Trace

In the Traces browser, use the service map to investigate the services that contribute spans to a selected trace.

![explore service map](images/tracing_traces_browser_service_map.png)

In the service map panel, you can:
* View the service dependencies, and follow the flow of request calls from service to service.
* Click on a service to display the RED metrics that reflect the health of the service:
  - Request count, error count, and trace duration at the 95th percentile, over all traces (root spans) that originate in the service.
  - Line charts that indicate the general contour of the RED metrics.
  - [Fine-tune the time window](ui_examine_data.html#fine-tune-the-time-window) of the RED metrics charts, and see [events](events.html). 
* Navigate to the selected service's dashboard for more service details.
* Scroll the service map to zoom in or out, and re-center the service map.
* Look for nodes that are grayed out. These represent services that contribute spans to at least one trace in the list, but not to the trace that is currently selected.

Watch this video to see how a service map can help you pinpoint a performance bottleneck in a microservices architecture:

<p><a href="https://youtu.be/7F1TTmSKN7g"><img src="/images/v_tracing_service_map.png" style="width: 700px;" alt="introduction to service maps"/></a>
</p>


## Examine Trace Details

In the Traces browser, use the trace details panel to examine the spans that belong to a selected trace. Some of these spans may represent operations executed by other services.

![trace details](images/tracing_traces_browser_trace_details.png)

In the trace details panel, you can:
* Examine the call hierarchy for a selected trace.
* Click any span to expand and see more detail.
* Explore the trace’s [critical path](#a-closer-look-at-critical-paths). This is an end-to-end sequence of blocking spans, where each blocking span must complete before the trace can complete.


## Drill Down Into Spans and View Metrics and Span Logs

In the trace details panel, you can view details about a particular span in the trace. If that span came from another service, you can navigate to the dashboard for that service.

![trace span details](images/tracing_span_details_with_logs.png)

Span details include:

* Application tags. These are the application, service, cluster, and shard, as selected by the trace query.
* Other tags, including the trace ID.
* A clickable link to the corresponding dashboard that lets you examine the metrics associated with the call.

If your spans have been instrumented to show span logs, you can click **Logs** to fetch the logs and drill down to examine them. We don't show span logs by default for better browser performance.


## A Closer Look at Critical Paths

The [trace details panel](#examine-trace-details) uses an orange line to show the critical path through a trace. You can think of the critical path as the end-to-end combination of spans that are the most blocking. These spans represent the sequence of operations that must complete before the trace itself can complete.

Analyzing the critical path of a trace can help you determine which operations took the most time, and can help you decide which operations to try to optimize.

We use the following rules to determine which spans to include in a critical path (in order of applicability):
1. Ignore asynchronous spans (spans tagged with `followFrom`).
2. Ignore spans that end before their parent starts.
3. If a child span continues after its parent, ignore that continuation period.
4. Choose longer spans over shorter siblings.
5. Choose later spans over earlier spans.
6. Choose child spans instead of their parent spans.
