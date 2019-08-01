---
title: Visualizing Traces, Spans, and RED Metrics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Explore your apps and services from a browser.
---

The Wavefront tracing UI enables exploration of your apps and services. Once your application is instrumented for tracing, you can examine traces, spans, and RED metrics, moving easily from one browser page to the next. This doc page gives an overview of the different UI pages.



## Choose Your Starting Point

To choose your starting point for visualizing traces:
1. In your web browser, go to your Wavefront cluster and log in.
2. From the task bar:

    - Select **Applications > Inventory** to [view all application services](#view-application-services) and drill down from there.
    - Select **Applications > Traces** to start by [querying for traces](#query-for-a-list-of-traces) and drill down from there.

    ![tracing menu](images/tracing_menu.png)

## View Application Services

Go to the Application Services page for a top-level overview of your instrumented applications.

![app services](images/tracing_app_services.png)

On the Application Services page, you can:
* Select an application from the **Jump To** pulldown, or search for a service or application.
* Examine the inventory of services in your application.
* View the inventory of component frameworks that each service is built on.
* Click inside a service box to go to the dashboard for that service.

## Examine Service Metrics and Drill Down

When you select a service, you can examine the corresponding metrics to identify potential hot spots, and then drill down to the Traces browser.

![examine services](images/tracing_services.png)

**Note:** The charts on this dashboard are read only.

On the page for a particular service, you can:
* Select the time and timezone in the task bar to customize the chart display. These selections are the same as for other dashboards.
* Use the **Jump To** pulldown to select a dashboard section:
  - Select Overview to examine the RED metrics that are derived from all of the spans for the service. These metrics reflect the health of the service.
  - Select an individual component to examine metrics for just that component of the service. A component could be an instrumented framework (e.g., `Jersey`) or the runtime system (e.g., `JVM`).
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
* Examine the TopK charts to find out which operations are potential hot spots. The bars represent operations that execute in this component of the service.
* Navigate to the Traces browser:
  - Select **See All ... Traces** to display all traces that include a span from this service component.
  - Click a bar in a TopK chart to display just the traces that include spans for the selected operation.
* If your environment uses Telegraf, view system metrics such as CPU usage, memory usages, and disk usage in the **System** section.
  ![system metrics](images/system_metrics.png)


## Explore Traces

In the Traces browser, you can explore the context and the details of your application's traces.

* Navigate from the service's page to display traces for operations you selected.
* Select **Applications > Traces** from the task bar to display an empty page that you populate by [querying](trace_data_query.html).

![explore trace browser](images/tracing_traces_browser_rev.png)

From the Traces browser, you can:
* Query for traces and view the query results in the [traces list](#query-for-a-list-of-traces).
* Select a trace in the list and:
  - Use the [service map panel](#investigate-the-service-map-for-a-trace) to investigate the microservices that contribute spans to the trace.
  - Use the [trace details panel](#examine-trace-details) to examine the individual spans in the trace.
* Examine how a trace compares to other traces in the percentile indicator.

You can toggle the panel size for the traces list, service map, or trace details.

## Query for a List of Traces

In the Traces browser, you can [query](trace_data_query.html) for the traces that include spans for a particular operation, and you can view the results in a traces list.

![explore traces list](images/tracing_traces_browser_traces_list_rev.png)

Here's how to get started:
1. Start typing in the Operations field and select an operation (or type a name in the search box).
2. Click **Add Filter** and specify a filter to limit the results.
3. (Optional) Advanced users can use Query Editor to limit the scope even further.



You can then use the trace list to:

* Sort the returned traces according to different criteria.
* Click a trace to view its context in the [service map panel](#investigate-the-service-map-for-a-trace) and its details in the [trace details panel](#examine-trace-details).
* See the relationship of a trace to similar traces in the percentile indicator -- and potentially find outliers.

## Investigate the Service Map for a Trace

In the Traces browser, use the service map to investigate the services that contribute spans to a selected trace.

![explore service map](images/tracing_traces_browser_service_map.png)

In the service map panel, you can:
* View the service dependencies, and follow the flow of request calls from service to service.
* Select a service to display:
  - The RED metrics that reflect the health of the service.
  - Line charts that indicate the general contour of the RED metrics.
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


## Drill Down Into Spans and View Related Metrics

In the trace details panel, you can view details about a particular span in the trace. If that span came from another service, you can navigate to the dashboard for that service.

![trace span details](images/tracing_traces_browser_span_details.png)

Span details include:
* Application tags. These are the application, service, cluster, and shard, as selected by the trace query.
* Other tags including the trace ID.
* A clickable link to the corresponding dashboard that lets you examine the metrics associated with the call.


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
