---
title: Distributed Tracing Basics
keywords: data, distributed tracing
tags: [getting started, tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Collect and visualize trace data from your applications.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a request. This visibility can help you find errors and performance problems in your code.

In an application that consists of multiple services, an incoming request typically starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into that chain across services, even when those services are running in different environments.

You can use Wavefront charts and dashboards for tasks such as the following:

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors.
* Pinpoint the specific operations that bottlenecks occur in.

## Distributed Tracing Video

Watch this video to listen to our Co-founder Clement Pang introduce distributed tracing with Wavefront:

<p><a href="https://youtu.be/Z7mf_oZfcSE"><img src="/images/v_tracing.png" style="width: 700px;" alt="distributed tracing"/></a>
</p>

{% include shared/badge.html content="You need either [Proxy Management permission](permissions_overview.html) or [Direct Data Ingestion permission](permissions_overview.html) to send trace data from your application to Wavefront." %}


<!--- This page gives basic concepts. You can go straight to Instrumenting [link]--->

## Traces and Spans in Wavefront

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data.

* **Traces** Wavefront represents an individual workflow in an application as a trace. A trace shows you how a particular request propagates through your application or among a set of services.

* **Spans** A Wavefront trace consists of one or more spans, which are the individual segments of work in the trace. Each span represents time spent by an operation in a service (often a microservice).

Because requests normally consist of other requests, a trace consists of a tree of spans. Depending on setup, spans can have associated span logs.

### Sample Application
<!--- Revise with final names and inventory of services and operations. Styling vs. Designer. --->

Let's look at an example. Here's how the different services interact in a simple Java application for ordering beach shirts.

![tracing beachShirts](images/tracing_beachshirts_app.png)

Each service processes a different part of a customer order. The diagram shows how these services collaborate by sending requests and responses:
* The customer clicks a button on the browser to trigger a request (Order Shirts) to the Shopping service.
* The Shopping service sends the customer's shirt-selection data in a request to the Styling service.
* The Styling service performs its operations, which include sending requests to the Printing and Packaging services. Each of these services performs its operations and returns a response to Styling.
* Finally, the Styling service sends a response to the Shopping service, which in turn invokes the Delivery service and sends a confirmation email back to the customer.

These services run on different hosts, and are implemented using frameworks that support HTTP and RPC requests, like Dropwizard, gRPC, and Spring Boot. The requests among these services might be asynchronous and quite lengthy.

<!--- Could be in different threads, or in containers --->


### Sample Traces and Spans
<!--- Check final names and inventory of services and operations. Styling vs. Designer. --->

Now let's look at how traces and spans represent an end-to-end request.

This diagram illustrates a trace for a particular request that started with the Shopping service's `orderShirts` request and finished with the Delivery service's `dispatch` request.

![tracing trace spans](images/tracing_trace_spans.png)

This trace consists of 9 member spans, one for each operation performed in the request. The span for the first request (namely, the Shopping service's `orderShirts` span) is the root span of the trace.

### A Closer Look at Traces and Spans

Several of the spans in our sample trace have parent-child relationships to other spans in the trace. For example,
the Styling service's `makeShirts` span has two child spans (`printShirts` and `giftWrap`), and each of these spans has a child span of its own.
* A parent-child relationship exists between two spans when one operation passes data or control to another, either in the same service or in a different one.
* A parent span with multiple children represents a request that invokes multiple operations, either serially or in parallel.

You can think of the trace as a tree of related spans. The trace has a unique trace ID, which is shared by each member span in the tree.

Trace IDs are not normally displayed because they are long and hard to remember. For convenience, we refer to a trace by using the service and operation of its root span. This means we use `shopping: orderShirts` as the label for the entire trace, as well as for its root span.

Different traces have the same label if they represent different calls to the same operation. For example, a new, separate trace begins every time the Shopping service's `orderShirts` API is called.  The trace in our example is just one of potentially thousands of traces that start with a call to `orderShirts`. Each such trace has a unique trace ID, and normally has a different start time and duration.

[See Traces, Spans, and RED Metrics for details.](trace_data_details.html)


## Ways to Send Trace Data to Wavefront

An application must be _instrumented for tracing_ before it can send trace data to Wavefront. Wavefront supports several options. Here's the big picture:

![tracing architecture](images/tracing_architecture_small.png)

### Use Cases

**If you have already instrumented your code** with [Jaeger](jaeger.html) or [Zipkin](zipkin.html), you can set up a [tracing integration](tracing_integrations.html) to forward the trace data to Wavefront. The integration sends the data through a Wavefront proxy.

**If you have not yet instrumented your code,** you can add instrumentation by using [Wavefront observability SDKs](wavefront_sdks.html):

* If your application is built with a supported application framework, you can [instrument that framework](tracing_instrumenting_frameworks.html#instrument-a-framework) by setting up the corresponding Wavefront observability SDK. This is the simplest approach, because a framework SDK produces out-of-the-box metrics, histograms, and trace data for the APIs supported by the instrumented framework.

* If your application includes critical methods that are not handled by any supported framework, you can [instrument those methods](tracing_instrumenting_frameworks.html#instrument-with-opentracing) with a Wavefront OpenTracing SDK. This is also a good choice if you want to use custom annotations to tag your traces. <!---  See XX for a list of supported programming languages and for links to the setup and usage steps. --->

The Wavefront observability SDKs let you to [choose how to send trace data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) -- through a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended. <!--- See XX for guidelines for choosing a proxy vs. direct ingestion. --->


## How to See Trace Data in Wavefront

You use the [Wavefront UI to visualize the trace data](tracing_ui_overview.html) that you collect from your instrumented application.


### Start by Looking for a Trace

You can view trace data by [looking for a trace](trace_data_query.html).

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Select <strong>Applications > Traces</strong> in the task bar.</li>
<li>Use the Traces Query Builder to select the filters that describe the spans to be matched and click <strong>Search</strong>.</li>
</ol></td>
<td width="60%"><img src="/images/look_for_trace.png" alt="look for a trace"></td>
</tr>
</tbody>
</table>

The [Traces browser](tracing_ui_overview.html) displays the traces that contain the matched spans.
* Use the histograms on the left to find potential problem spots.
* Explore what's going on in the service map.
* Drill down to learn more about time spent, errors, and span logs.

### Start With Metrics That Provide Context

You can view trace data by starting with the [RED metrics](trace_data_details.html#red-metrics-derived-from-spans) that Wavefront collects for each instrumented application.
RED metrics measure:
* The request **Rate** (number of requests being served per minute),
* **Errors** (number of failed requests per minute)
* **Duration** (histogram distributions of the amount of time each request takes).

These metrics are key indicators of the health of your services, and you can use them as context to help you discover problem traces and spans.

To start examining your application's RED metrics:
1. Select **Applications > Application Status** in the task bar and find your application.
2. Click on the application's name.
3. Find the service you are interested in and click **Details**.
4. Scroll the service's page until you find the framework or component you are interested in.
5. Select an operation from one of the charts to examine traces.




## Trace Sampling

A large-scale web application can produce a high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  You can limit the volume of trace data using a [sampling strategy](trace_data_sampling.html).

A sampling strategy helps you keep the volume of trace data manageable, and can help reduce costs. Wavefront supports several [ways to specify sampling strategies](trace_data_sampling.html#ways-to-set-up-sampling).

## Trace Storage

Your costs are calculated in part based on the number of spans you store in Wavefront. You can configure Wavefront to keep spans in storage for 7 or 30 days.

You can [monitor](wavefront_monitoring.html#using-internal-metrics-to-optimize-performance) your span storage by checking the following internal metrics. If you have set up sampling, these metrics report the number of spans after sampling takes place.
<table width="100%">
<colgroup>
<col width="50%"/>
<col width="50%"/>
</colgroup>
<thead>
<tr><th>Metric</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`~collector.tracing.spans.reported`</td>
<td markdown="span">Number of spans per second being sent via a Wavefront proxy.</td>
</tr>
<tr>
<td markdown="span">`~collector.direct-ingestion.tracing.spans.reported`</td>
<td markdown="span">Number of spans per second being sent directly to the Wavefront service (direct ingestion).</td>
</tr>
</tbody>
</table>

## Trace-Data Alerts

<!--- Verify name of integration. It may change to "Tracing Alerts" --->

Whenever an instrumented application sends trace data, Wavefront not only computes RED metrics from that data, but also alerts on any RED metrics that exceed preset performance thresholds. We automatically alert on request rates or error rates that are particularly high, as well as request latencies that are particularly long. You can view any  alert events in the charts on the dashboard for a service. 

Trace-data alerts are enabled by default. For best results, you should perform some minimal customization on each of the alerts. To customize an alert:

1. Open the **Alerts for Tracing RED Metrics** integration from the Integrations browser.
2. Go to the **Alerts** page and click **Edit** next to the alert.
3. Review the preset thresholds in the **Severity** section. Change any or all of the thresholds to suit your use cases.
  - Request rate: Number of requests per second
  - Error rate: Number of errors per second
  - Duration: Number of milliseconds
4. Click **Add Target** at to add [notification targets](alerts_notifications.html) such as email addresses.

**Note:** You can clone the alert if you need further [trace-data alert customization](trace_data_details.html#custom-alerts-on-red-metrics). 

If you do not want to see trace-data alert events on your charts, you can either suppress all events from your chart display, or you can disable trace-data alerts from being generated. To disable trace-data alerts: 

1. Open the **Alerts for Tracing RED Metrics** integration from the Integrations browser.
2. Go to the **Alerts** page and click **Uninstall All**.  
