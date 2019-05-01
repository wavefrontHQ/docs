---
title: Distributed Tracing Basics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Learn how Wavefront helps you collect and visualize trace data from your applications.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a user request. In an application that consists of multiple services, a typical user request starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into an entire request across services, even when those services are running in different environments. This visibility can help you find errors and performance problems in your code. 

Distributed tracing starts with ingesting trace data from your applications into Wavefront.
Because Wavefront integrates trace data with metrics, you can use Wavefront charts and dashboards for tasks such as the following: 

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors. 
* Pinpoint the specific operations that bottlenecks occur in.


Watch this video to listen to our Co-founder Clement Pang introduce distributed tracing with Wavefront:

<p><a href="https://youtu.be/Z7mf_oZfcSE"><img src="/images/v_tracing.png" style="width: 700px;" alt="distributed tracing"/></a>
</p>

{% include shared/badge.html content="You need either [Proxy Management permission](permissions_overview.html) or [Direct Data Ingestion permission](permissions_overview.html) to send trace data from your application to Wavefront." %}


<!--- This page gives basic concepts. You can go straight to Instrumenting [link]--->

## Wavefront Trace Data

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data. This means:

* Wavefront represents an individual workflow in an application as a trace. A trace shows you how a particular request propagates through your application or among a set of services. 

* A Wavefront trace consists of one or more spans, which are the individual segments of work in the trace. Each span represents time spent by an operation in a service (often a microservice). 

Because requests normally consist of other requests, a trace actually consists of a tree of spans. 

### Sample Application
<!--- Revise with final names and inventory of services and operations. Styling vs. Designer. --->

Let's look at an example. Here's how the different services (black) interact in a simple Java application for ordering beach shirts. 

![tracing beachShirts](images/tracing_beachshirts_app.png)

Each service processes a different part of a customer order. The diagram shows how these services collaborate by sending requests (red) and responses:
* The customer clicks a button on the browser to trigger a request (Order Shirts) to the Shopping service.
* The Shopping service sends the customer's shirt-selection data in a request to the Styling service. 
* The Styling service performs its operations, which include sending requests to the Printing and Packaging services. Each of these services performs its operations and returns a response to Styling.
* Finally, the Styling service sends a response to the Shopping service, which in turn invokes the Delivery service and sends a confirmation email back to the customer. 

These services run on different hosts, and are implemented using frameworks (like Dropwizard, gRPC, and Spring Boot) that support HTTP and RPC requests. The requests among these services might be asynchronous and quite lengthy.

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

Trace IDs are not normally displayed because they are long and hard to remember. For convenience, we refer to a trace by the service and operation of its root span. This means we use `shopping: orderShirts` as the label for the entire trace, as well as for its root span. 

Different traces have the same label if they represent different calls to the same operation. For example, a new, separate trace begins every time the Shopping service's `orderShirts` API is called.  The trace in our example is just one of potentially thousands of traces that start with a call to `orderShirts`. Each such trace has a unique trace ID, and normally has a different start time and duration.

[See Traces, Spans, and Metrics for details.](trace_data_details.html)


## Ways to Send Trace Data to Wavefront

An application must be _instrumented for tracing_ before it can send trace data to Wavefront. Wavefront supports several options. Here's the big picture:

![tracing architecture](images/tracing_architecture.png) 

### Use Cases

**If you have already instrumented your code** with a 3rd party distributed tracing system such as [Jaeger](jaeger.html) or [Zipkin](zipkin.html) you can set up a [tracing-system integration](tracing_integrations.html) to forward the trace data to Wavefront. The integration sends the data through a Wavefront proxy.

**If you have not yet instrumented your code,** you can add instrumentation by using [Wavefront observability SDKs](wavefront_sdks.html):

* If your application is built with a supported application framework, you can [instrument that framework](tracing_instrumenting_frameworks.html#instrument-a-framework) by setting up the corresponding Wavefront observability SDK. This is the simplest approach, because a framework SDK produces out-of-the-box metrics, histograms, and trace data for the APIs supported by the instrumented framework. 

* If your application includes critical methods that are not handled by any supported framework, you can [instrument those methods](tracing_instrumenting_frameworks.html#instrument-with-opentracing) with a Wavefront OpenTracing SDK. This is also a good choice if you want to use custom annotations to tag your traces. <!---  See XX for a list of supported programming languages and for links to the setup and usage steps. --->

The Wavefront observability SDKs let you to [choose how to send trace data to Wavefront](tracing_instrumenting_frameworks.html#step-1-prepare-to-send-data-to-wavefront) -- through a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended. <!--- See XX for guidelines for choosing a proxy vs. direct ingestion. --->
 

## How to See Trace Data in Wavefront

You use the [Wavefront UI to visualize the trace data](tracing_ui_overview.html) that you collect from your instrumented application. 

<!---
Watch this video to see how visualizing trace data can help you find hot spots in your applications:

<p><a href="https://youtu.be/OI75w0dFs-U"><img src="/images/v_tracing_howto.png" style="width: 700px;" alt="introduction to tracing"/></a>
</p>
--->

### Start With Metrics That Provide Context

You can view trace data by starting with the [RED metrics](trace_data_details.html#red-metrics-derived-from-spans) that Wavefront collects for each microservice in an instrumented application. RED metrics measure the request Rate (number of requests being served per minute), Errors (number of failed requests per minute), and Duration (histogram distributions of the amount of time each request takes). These metrics are key indicators of the health of your services, and you can use them as context to help you discover problem traces and spans.

To start examining your application's microservices from the RED metrics:
1. Select **Applications > Inventory** in the task bar and find your application.
2. Click on a service that you are interested in.
3. Scroll the service's page until you find the framework or component you are interested in.
4. Select an operation from one of the charts to examine traces. <!---by following the steps in _[[Link to subsection of Tracing a Hotspot Across Services page]]_.--->

### Start by Submitting a Trace Query

You can view trace data by [submitting a trace query](trace_data_query.html). A trace query describes one or more spans to be matched, and then displays the traces that contain the matched spans:
1. Select **Applications > Traces** in the task bar.
2. In the Traces browser, by select the filters that describe the spans to be matched. 

<!--- In Hotspots topic - mention that specified span could be anywhere in result trace. Might but need not be first. ---> 
<!---  In Hotspots topic -  mention and link to traces() function ---> 
<!--- You can use the `traces()` function in the Wavefront Query Language to describe the spans you want to match.

```
limit(100, traces("orderShirts", application=beachshirts and service=shopping))
```
--->

## Trace Sampling and Storage

A large-scale web application can produce a high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  You normally limit the volume of trace data using a [sampling strategy](trace_data_sampling.html). 

A sampling strategy helps you keep the volume of trace data manageable, and can help reduce costs. Your costs are calculated based on the number of spans you store in Wavefront. You can configure Wavefront to keep spans in storage for 7 or 30 days. 

Wavefront supports several [ways to specify sampling strategies](trace_data_sampling.html#ways-to-set-up-sampling). You can choose the way the best fits your use case. 

You can [monitor](wavefront_monitoring.html#using-internal-metrics-to-optimize-performance) your span storage by checking the following internal metrics. If you have set up sampling, these metrics report the number of spans after sampling takes place:
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


<!---
## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?

--->
