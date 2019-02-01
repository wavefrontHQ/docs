---
title: Distributed Tracing Basics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Learn about Wavefront support for trace data, and how visualizing traces can help you pinpoint errors and bottlenecks in your app.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a user request. In an application that consists of multiple services, a typical user request starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into an entire request across services, even when those services are running in different environments. This visibility can help you find errors and performance problems in your code. 

Distributed tracing starts with ingesting trace data from your applications into Wavefront.
Because Wavefront integrates trace data with metrics, you can use Wavefront charts and dashboards for tasks such as the following: 

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors. 
* Pinpoint the specific operations that bottlenecks occur in.

<!---
Watch this video to listen to our Co-founder Clement Pang introduce distributed tracing with Wavefront:

<p><a href=""><img src="/images/v_tracing.png" style="width: 700px;" alt="distributed tracing"/></a>
</p>
--->

<!--- This page gives basic concepts. You can go straight to Instrumenting [link]--->

## Wavefront Trace Data

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data. This means:

* Wavefront represents an individual workflow in an application as a trace. A trace shows you how a particular request propagates throughout your application or among a set of services. 

* A Wavefront trace consists of one or more spans, which are the individual segments of work in the trace. Each span represents time spent by an operation in a service. 

Because requests normally consist of other requests, a trace actually consists of a tree of spans. 

### Sample Application
<!--- Revise with final names and inventory of services and operations. Styling vs. Designer. --->

Let's look at an example. Here we see a simple Java application for ordering beach shirts. 

![tracing beachShirts](images/tracing_beachshirts_app.png)

This BeachShirts application has multiple services for processing different parts of a customer order. The diagram shows how these services collaborate by sending requests and responses:
* The customer clicks a button on the browser to trigger a request (Order Shirts) to the Shopping service.
* The Shopping service sends the customer's shirt-selection data in a request to the Styling service. 
* The Styling service performs its operations, which include sending requests to the Printing and Packaging services. Each of these services performs its operations and returns a response to Styling.
* Finally, the Styling service sends a response to the Shopping service, which in turn invokes the Delivery service and sends a confirmation email back to the customer. 

These services run on different hosts, and are implemented using frameworks (like Dropwizard, gRPC, and Spring Boot) that support HTTP and RPC requests. The requests among these services might be asynchronous and quite lengthy.

<!--- Could be in different threads, or in containers --->


### Sample Traces and Spans
<!--- Check final names and inventory of services and operations. Styling vs. Designer. --->

Now let's look at how traces and spans represent an end-to-end request. 

In this diagram, we see a trace for a particular request that started with the Shopping service's `orderShirts` request and finished with the Delivery service's `dispatch` request. This trace consists of 8 member spans, one for each operation performed in the request.

![tracing trace spans](images/tracing_trace_spans.png)

### A Closer Look at Traces and Spans

As is typical, several of the spans in our sample trace have parent-child relationships to other spans in the trace. For example,
the Styling service's `makeShirts` span has two child spans (`printShirts` and `wrapShirts`), and each of these spans has a child span of its own. 
* A parent-child relationship exists between two spans when one operation passes data or control to another, either in the same service or in a different one. 
* A parent span with multiple children represents a request that invokes multiple operations, either serially or in parallel. 

You can think of the trace itself as the top-level parent in a tree of related spans. We refer to a trace by the service and operation of its first (root) span. Because the first operation in our sample trace is Shopping service's `orderShirts`, we use that operation to refer to the trace. 

Many traces can begin with the same operation. For example, a new, separate trace begins every time the Shopping service's `orderShirts` API is called. Each trace has a unique trace id, which is shared by each member span. The trace in our example is just one of potentially thousands of similar traces, which might have different start times or durations. 


## Ways to Send Trace Data to Wavefront

An application must be _instrumented for tracing_ before it can produce and send trace data to Wavefront. Wavefront supports several options to choose from, depending on your use case. Here's the big picture:

![tracing architecture](images/tracing_architecture.png) 

### Use Cases

If you have already instrumented your code with a 3rd party distributed tracing system such as [Jaeger](jaeger.html) or [Zipkin](zipkin.html) you can set up a [tracing-system integration](tracing_integrations.html) to forward the trace data to Wavefront. The integration sends the data through a Wavefront proxy.

If you have not yet instrumented your code, you can do so by using one or more Wavefront observability SDKs:

* If your application is built with various popular application frameworks, you can obtain trace data from each supported framework by setting up a corresponding framework-level observability SDK. This is the simplest approach, because a framework-level SDK produces out-of-the-box metrics, histograms, and trace data for the APIs supported by the instrumented framework. See [Instrumenting Your App for Tracing](tracing_instrumenting_frameworks.html) for a list of supported frameworks and for information about setting up the SDKs.

* If your application includes critical operations that are not based on any supported framework, you can use the Wavefront OpenTracing SDK to obtain trace data from these custom operations. This is also a good choice if you want to use custom annotations to tag your traces. <!---  See XX for a list of supported programming languages and for links to the setup and usage steps. --->

The Wavefront observability SDKs let you to choose whether to send trace data through a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended. <!--- See XX for guidelines for choosing a proxy vs. direct ingestion. --->
 

## How to See Trace Data in Wavefront
<!--- Revise if/when a top-level menu/button replaces Browse menu for Tracing. --->

Wavefront enables you to [query](trace_data_query.html) and visualize the trace data it collects from your instrumented application. There are several starting points. 

### Start From Metrics That Provide Context

You can view trace data by starting with the RED metrics that Wavefront collects for each microservice in an instrumented application. RED metrics are measures of Requests (number of requests being served per second), Errors (number of failed requests per second), and Duration (histogram distributions of the amount of time each request takes). You can use these metrics as context to help you discover problem traces.

To start from the RED metrics for your application's microservices:
1. Select **Applications > Inventory** in the task bar, and find your application.
2. Click on a service that you are interested in viewing traces from.
3. Scroll the page for the service until you find the framework or component you are interested in.
4. Select an operation to display the **Traces** page for that operation. <!---by following the steps in _[[Link to subsection of Tracing a Hotspot Across Services page]]_.--->

### Start by Submitting a Trace Query

You can view trace data by [submitting a trace query](trace_data_query.html). A trace query describes one or more spans to be matched, and then displays the traces that contain the matched spans:
1. Select **Applications > Traces** in the task bar.
2. In the **Traces** page, [build a trace query](trace_data_query.html#building-a-trace-query) by selecting the filters that describe the spans to be matched. 

<!--- In Hotspots topic - mention that specified span could be anywhere in result trace. Might but need not be first. ---> 
<!---  In Hotspots topic -  mention and link to spans() function ---> 
<!--- You can use the `spans()` function in the Wavefront Query Language to describe the spans you want to match.

```
limit(20, spans(orderShirts, application=beachshirts and service=shopping))
```
--->

## Trace Sampling and Storage

A large-scale web application can produce a high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  You normally limit the volume of trace data by specifying a [sampling strategy](trace_data_sampling.html). 

A sampling strategy helps you keep the volume of trace data manageable, and can help to reduce your costs. Your costs are calculated based on the number of spans you store in Wavefront. You can configure Wavefront to keep spans in storage for 7 or 30 days. 

Wavefront supports several [ways to set up sampling](trace_data_sampling.html#ways-to-set-up-sampling). You can choose the way the best fits your use case. 

You can [monitor](wavefront_monitoring.html) your span storage by checking the following metrics. If you have set up sampling, these metrics report the number of spans after sampling takes place:
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
