---
title: Distributed Tracing Basics - Beta
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Learn about Wavefront's support for tracing data, and how visualizing traces can help you pinpoint errors and bottlenecks in your app.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a user request. In an application that consists of multiple services, a typical user request starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into an entire transaction across services, even when those services are running in different environments. This visibility can help you fix (or prevent) errors and performance problems in your code. 

Distributed tracing starts with ingesting _trace data_ from your applications into Wavefront.
Because Wavefront integrates tracing data with metrics, you can use Wavefront charts and dashboards for tasks such as the following: 

* Monitor your application to make sure its response times are as expected.
* Troubleshoot and analyze reported errors. 
* Pinpoint the specific operations that bottlenecks occur in.

<!--- This page gives basic concepts. You can go straight to Instrumenting [link]--->

## Wavefront Trace Data

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data. This means:

* Wavefront represents an individual workflow (transaction) in an application as a _trace_. A trace shows you how a particular request propagates throughout your application or among a set of services. 

* A Wavefront trace consists of one or more _spans_, which are the individual segments of work in the trace. Each span represents time spent by an operation in a service. 

Because requests are normally composed of other requests, a trace actually consists of a _tree_ of spans. 

### Sample Application
<!--- Revise with final names and inventory of services and operations. Styling vs. Designer. --->

Let's look at an example. Here we see a simple Java application for ordering beach shirts. 

![tracing beachShirts](images/tracing_beachshirts_app.png)

This BeachShirts application has multiple services for processing different aspects of a customer order. The diagram shows how these services collaborate by sending requests and responses:
* The customer clicks a button on the client browser to trigger a request ("Order Shirts") to the Shopping service.
* The Shopping service sends the customer's shirt-selection data in a request to the Styling service. 
* The Styling service performs its operations, which include sending requests to the Printing and Packaging services. Each of these services performs its operations and returns a response to Styling.
* Finally, the Styling service sends a response to the Shopping service, which in turn invokes the Delivery service and sends a confirmation email back to the customer. 

These services are designed to be run on different hosts, so they are implemented using frameworks (like Dropwizard, gRPC, and Spring Boot) that support HTTP and RPC requests. The requests among these services might be asynchronous and quite lengthy.

<!--- Could be in different threads, or in containers --->


### Sample Traces and Spans
<!--- Check final names and inventory of services and operations. Styling vs. Designer. --->
<!--- Get real screen shot when colors are finalized. --->

Now let's look at how traces and spans represent an end-to-end transaction. 

In this diagram, we see a trace for a particular transaction that started with the Shopping service's `orderShirts` request and finished with the Delivery service's `dispatch` request. This trace consists of 8 member spans, one for each operation performed in the transaction.

![tracing trace spans](images/tracing_trace_spans.png)

### A Closer Look at Traces and Spans

As is typical, several of the spans in our sample trace have parent-child relationships to other spans in the trace. For example,
the Styling service's `makeShirts` span has two child spans (`printShirts` and `wrapShirts`), and each of these spans has a child span of its own. 
* A parent-child relationship exists between two spans when one operation passes data or control to another, either in the same service or in a different one. 
* A parent span with multiple children represents a request that invokes multiple operations, either serially or in parallel. 

You can think of the trace itself as the top-level parent in a tree of related spans. We refer to a trace by the service and operation of its first (root) span. Because the first operation in our sample trace is Shopping service's `orderShirts`, we use that operation to refer to the trace. 

It is important to remember that many traces can begin with the same operation. For example, a new, separate trace begins every time the Shopping service's `orderShirts` API is called. Each such trace has a unique trace id, which is shared by each of the member spans. The trace in our example is just one of potentially thousands of similar traces, which might have different start times or durations. 


## Ways to Send Trace Data to Wavefront

An application must be _instrumented for tracing_ before it can produce and send trace data to Wavefront. Wavefront supports several options to choose from, depending on your use case. Here's the big picture:

![tracing architecture](images/tracing_architecture.png)

If you have already instrumented your code using a 3rd party OpenTracing-compliant solution such as [Jaeger](jaeger.html), you can simply set up an integration to forward the trace data to Wavefront. 

If you have not yet instrumented your code, choose one of these options:

* Set up your application with one or more Wavefront SDKs that instrument the frameworks you use in your application. This is the simplest technique, because each SDK produces out-of-the-box metrics, histograms, and trace data for the APIs supported by the instrumented framework. See [Instrumenting Your App For Tracing](tracing_instrumenting_frameworks.html) for a list of supported frameworks and for information about setting them up.

* Use Wavefront's OpenTracing SDK to implement custom traces for your application's operations. This is a good choice if you want to use annotations to tag your traces or if you want to obtain trace data from critical operations that do not use a supported framework. <!---  See XX for a list of supported programming languages and for links to the setup and usage steps. --->

All of the options for instrumenting your code allow you to choose whether to send trace data to a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is generally recommended. <!--- See XX for guidelines for choosing a proxy vs. direct ingestion. --->
 

## How to See Trace Data in Wavefront
<!--- Revise if/when a top-level menu/button replaces Browse menu for Tracing. --->

Wavefront enables you to query and visualize the trace data it collects from your application. There are several starting points, depending on the option you chose for instrumenting your code. 

If you instrumented any frameworks in your code to produce out-of-the-box metrics, histograms, and trace data, then Wavefront can show you a great deal of context for your traces. You can examine this context to help you find the traces you want to see. The best way to get started is to:
1. Select **Browse > Application** and find your application.
2. Click on a service that you are interested in viewing traces from.
3. Select a framework and an operation in it to show information about the traces and spans for that operation. <!---by following the steps in _[[Link to subsection of Tracing a Hotspot Across Services page]]_.--->

If you instrumented your code only for tracing -- for example, with a Wavefront OpenTracing SDK -- you find the traces you want to see by describing one or more spans that belong to those traces:
1. Select **Browse > Traces**.
2. Select filters to describe the spans of interest. <!---by following the steps in _[[Link to subsection of Tracing a Hotspot Across Services page]]_.--->

The **Browse Traces** page displays all traces containing one or more spans that match your description. For example, you could describe the span that is produced when `orderShirts` is called in the Shopping service of BeachShirts. The **Browse Traces** chart shows a set of traces that each contain at least one `orderShirts` span. Because a large number of traces might contain a matching span, we normally limit the result set to some manageable number, such as 20.



<!--- In Hotspots topic - mention that specified span could be anywhere in result trace. Might but need not be first. ---> 
<!---  In Hotspots topic -  mention and link to spans() function ---> 
<!--- You can use the `spans()` function in the Wavefront Query Language to describe the spans you want to match.

```
limit(20, spans(orderShirts, application=beachshirts and service=shopping))
```
--->

## Trace Sampling and Storage

A large-scale web application can produce a very high volume of traces. Many traces might be reported every minute, and each trace might consist of many spans, each with many tags.  You normally limit the volume of trace data by specify a _sampling strategy_. 
A sampling strategy helps you keep the volume of trace data manageable, and can help to reduce your costs.

<!--- _[[Summary of supported strategies. Link to topic on sampling strategies, proxy setup steps, SDK setup steps]]_ --->

Your costs are calculated based on the number of spans you store in Wavefront. You can configure Wavefront to keep spans in storage for 7 or 30 days.

<!---
## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?

--->
