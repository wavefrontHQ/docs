---
title: Visualizing Traces, Spans, and Metrics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Explore your apps and services from a browser.
---

The Wavefront tracing UI enables exploration of your apps and services. Once your application is instrumented for tracing, you can examine traces, spans, and RED metrics moving easily from one browser page to the next. This doc page gives an overview of the different pages. Exploring Traces, Spans, and Metrics gives more detail.

## Navigate to the Tracing UI

To navigate to the tracing UI:
1. Log in to your Wavefront cluster.
2. From the task bar:

   - Select **Applications > Inventory** to view all application services and drill down from there. 
   - Select **Applications > Traces** to start by querying for traces and drill down from there. 

![tracing menu](images/tracing_menu.png)

## Get Started: Application Services

The Application Services page is your entry point for examining your application.
* Select an application from the **Jump To** pulldown.
* Search for a service.
* Click inside a service box to go to the dashboard for that service.

![app services](images/tracing_app_services.png)

## Examine Service Metrics and Drill Down

When you select a service, you can examine the corresponding metrics and potential hot spots in detail, and go to the Traces page from here.

**Note:** The charts on this dashboard are read only.

* In the task bar, select the time, timezone, and other chart attributes. These selections are the same as for other dashboards.
* Use the **Jump To** pulldown to:
  - Select Overall for RED metrics derived from all trace data emitted by the selected service.
  - Select an individual component to examine metrics for just that component inside the selected service. A component could be an instrumented framework or the runtime system.
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
* Select **See All Traces** or click one of the bars in a TopK chart to go to the Traces page.

![examine services](images/tracing_services.png)

## Explore Traces

You can access the Traces page like this:
*	On the Service page, click **See All Traces** to display all traces that contain at least one span emitted by the service.
*	On the Service page, click a bar in a TopK chart to display all traces that contain at least one span for the selected operation.  (Each bar in a TopK  chart corresponds to a particular operation that executes in the service. Each time the operation executes, a span is emitted.)
* Select **Applications > Traces** from the Task bar and use the query builder to populate the page with traces that match spans of interest.”


On the Traces page, you can:
* Apply filters and selectively narrow down the scope of the trace.
* Use the query editor to limit the scope even futher (advanced users).
* Examine the scatter plot to clearly see the duration of the operation over time, and to see errors (red circles).
* Sort traces with matching spans using different criteria.
* Click any trace for a pop-up that shows details.

![explore trace page](images/traces_trace_page.png)


## Examine Trace Details

On the Traces pop-up, you can examine the spans that belong to a single trace. Some of these spans may come from other services (represent operations executed by other services)
* Find the relevant part of the code by clicking in the scrollable overview panel.
* Examine the call hierarchy.
* Click any span to expand and see more detail.
* Explore the trace’s critical path -- an end-to-end combination of spans that are the most blocking (see below for details).

![trace popup](images/trace_popup_simple.png)

We use the following rules to determine critical path (in order of applicability):
1. Async spans cannot be critical (followsFrom)
2. Spans that end before their parent starts cannot be critical
3. The period of a child span that continues after its parent cannot be critical.
4. Longer spans are more critical than shorter siblings.
5. Later spans are more critical than earlier spans.
6. Child spans are more critical than their parents.

## Drill Down Into Traces and View Related Metrics

You can click any span in the Traces popup to view details about that call.
* Application tags (service, cluster, shard, and application, as selected on the Services page)
* Other tags including the trace ID.
* A clickable link to the corresponding dashboard that lets you examine the metrics associated with the call.

![trace popup expanded](images/trace_popup_expanded.png)
