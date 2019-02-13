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
   -Select **Applications > Inventory** to view all application services and drill down from there. Use this option if you've instrumented your app with one of our SDKs.
   -**Applications > Traces** to view traces and drill down from there. Use this option if your app uses Jaeger or Zipkin but you haven't explicitly instrumented it.

![tracing menu](images/tracing_menu.png)

## Get Started: Application Services

The Application Services page is your enty point for examining your application.
* Select an application from the **Jump To** menu.
* Search for a service.
* Click inside the service box to go to the dashboard for that service.

![app services](images/tracing_app_services.png)

## Examine Service Metrics and Drill Down

When you select a service, you can examine the corresponding metrics and potential hot spots in detail, and go to the Traces page from here.
**Note:** The charts on this dashboard are read only.

* In the task bar, select the time, timezone, and other chart attributes. These selections are the same as for other dashboards.
* Use the **Jump To** pulldown to select Overall for all metrics, or to select a component to examine metrics just for that component (inside the selected service).
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
* Select **See All Traces** or click one of the bars in a TopK chart to go to the Traces page.

![examine services](images/tracing_services.png)

## Explore Traces

You can access the Traces page like this:
* If you've instrumented your code and examine your application, select **See All Traces** on the Services page or click one of the bars in a TopK chart to go to the Traces page.
* If you're set up a Jaeger or Zipkin integration, select **Applications > Traces** from the Task bar.

On the Traces pop-up, you can examine traces for a service and the associated operations.
* Find the relevant part of the code by clicking in the scrollable overview panel.
* Examine the call hierarchy.
* Click any span to expand and see more detail.
* Explore the critical path (see below)

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
* Other tags including the process ID.
* A clickable link to the corresponding dashboard that lets you examine the metrics associated with the call.

![trace popup expanded](images/trace_popup_expanded.png)
