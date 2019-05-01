---
title: Visualizing Traces, Spans, and Metrics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Explore your apps and services from a browser.
---

The Wavefront tracing UI enables exploration of your apps and services. Once your application is instrumented for tracing, you can examine traces, spans, and RED metrics, moving easily from one browser page to the next. This doc page gives an overview of the different UI pages. 

<!---
Exploring Traces, Spans, and Metrics gives more detail.
--->

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

When you select a service, you can examine the corresponding metrics and potential hot spots in detail, and then drill down to the Traces browser. 

![examine services](images/tracing_services.png)

**Note:** The charts on this dashboard are read only.

On the page for a particular service, you can:
* Select the time and timezone in the task bar to customize the chart display. These selections are the same as for other dashboards.
* Use the **Jump To** pulldown to select a dashboard section:
  - Select Overview to examine the RED metrics that are derived from all of the spans for the service.
  - Select an individual component to examine metrics for just that component of the service. A component could be an instrumented framework (e.g., `Jersey`) or the runtime system (e.g., `JVM`).
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
* Examine the TopK charts to find out which operations are potential hot spots. The bars represent operations that execute in this component of the service.
* Navigate to the Traces browser:
  - Select **See All ... Traces** to display all traces that include a span from this service component. 
  - Click a bar in a TopK chart to display just the traces that include spans for the selected operation.


## Explore Traces

In the Traces browser, you can explore the context and the details of your application's traces.

* Navigate from the Service page to display traces for operations you selected.
* Select **Applications > Traces** from the task bar to display an empty page that you populate by [querying](trace_data_query.html).

![explore trace browser](images/tracing_traces_browser.png)

From the Traces browser, you can:
* Query for traces and view the query results in the [traces list](#view-trace-query-results).
* Select a trace from the list and investigate its service-level context in the [service map panel](#view-related-services).
* Select a trace from the list and examine its spans in the [trace details panel](#examine-trace-details). 

You can toggle the panel size for the traces list, service map, or trace details. 

## Query for a List of Traces

In the Traces browser, you can [query](trace_data_query.html) for the traces that include spans for a particular operation, and you can view the results in a traces list.

![explore traces list](images/tracing_traces_browser_traces_list.png)

You can:

* Use Query Builder to apply filters and narrow down the scope of the trace query.
* Use Query Editor to limit the scope even further (advanced users).
* Sort the returned traces according to different criteria.
* Click any trace to view its context in the [service map panel](#view-related-services) or its details in the [trace details panel](#examine-trace-details).

## View Related Services

In the Traces browser, you can investigate the services that have spans in a selected trace. The services are shown as nodes in a service map.

![explore service map](images/tracing_traces_browser_service_map.png)

In the service map panel, you can:
* Investigate the real-time traffic flow among the services that contribute to a trace.
* Click on a service to display: 
  - A link to the service's dashboard.
  - A summary of the service's RED metrics, which aggregate spans from all operations in the service. 
  - A set of line charts that show the general contour for each of the summarized RED metrics.
* Scroll the service map to zoom in or out, and re-center the service map.

**Note:** A service is grayed out if it participates in at least one trace in the traces list, but does not contribute any spans to the currently selected trace. 

## Examine Trace Details

In the Traces browser, you can examine the spans that belong to a selected trace. Some of these spans may represent operations executed by other services.

![trace details](images/tracing_traces_browser_trace_details.png)

In the trace details panel, you can:
* Examine the call hierarchy for a selected trace.
* Click any span to expand and see more detail.
* Explore the trace’s [critical path](#a-closer-look-at-critical-paths). This is an end-to-end sequence of blocking spans, where each blocking span must complete before the trace can complete.


## Drill Down Into Spans and View Related Metrics

In the trace details panel, you can view details about a particular span in the trace. If that span came from another service, you can navigate to the dashboard for that service.

![trace span details](images/tracing_traces_browser_span_details.png)

Span details include:
* Application tags. These are the application, service, cluster, and shard, as selected on the Services page.
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
