---
title: Distributed Tracing Basics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Learn about Wavefront's support for tracing data, and how visualizing traces can help you pinpoint errors and bottlenecks in your app.
---

Distributed tracing enables you to track the flow of work that is performed by an application as it processes a user request. In an application that consists of multiple services, a typical user request starts a chain of requests that are propagated from one service to the next.  Distributed tracing gives you end-to-end visibility into an entire transaction (chain of requests) across services, even when those services are running in different environments. This visibility can help you fix (or prevent) errors and performance problems in your code. 

Distributed tracing starts with ingesting _trace data_ from your applications into Wavefront.
Because Wavefront integrates tracing data with metrics, you can use Wavefront charts and dashboards for tasks such as the following: 

* Monitor your application to make sure it meets your expectations for response times.
* Troubleshoot and analyze reported errors. 
* Pinpoint the specific operations that bottlenecks occur in.

<!--- This page gives basic concepts. You can go straight to Instrumenting [link]--->

## Wavefront Trace Data

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data. This means:

* Wavefront represents an individual workflow (transaction) in an application as a _trace_. A trace shows you how a particular request propagates throughout your application or among a set of services. 

* A Wavefront trace consists of one or more _spans_, which are the individual segments of work in the trace. Each span typically represents an operation or API call from one service to another, such an an HTTP request or an RPC request. A span can also represent an operation that calls another operation within the same service.

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
* A parent span with multiple children indicates a request that invokes multiple operations, either serially or in parallel. 

You can think of the trace itself as the top-level parent in a tree of related spans. We refer to a trace by the service and operation of its first (root) span. Because the first operation in our sample trace is Shopping service's `orderShirts`, we use that operation to refer to the trace. 

It is important to remember that many traces can begin with the same operation. For example, a new, separate trace begins every time the Shopping service's `orderShirts` API is called. Each such trace has a unique trace id, which is shared by each of the member spans. The trace in our example is just one of potentially thousands of similar traces, which might have different start times or durations. 


## Ways to Send Trace Data to Wavefront

An application must be _instrumented for tracing_ before it can produce and send trace data to Wavefront. Wavefront supports several options to choose from, depending on your use case. 

<!--- Other metrics, and enable histograms too? --->

If you have already instrumented your code using a 3rd party OpenTracing-compliant solution such as Jaeger, you can simply set up an integration to forward the trace data to Wavefront. <!--- See XX.--->

If you have not yet instrumented your code, choose one of these options:

* Set up your application with one or more Wavefront SDKs that instrument the frameworks you use in your application. This is the simplest technique, because each SDK produces out-of-the-box metrics, histograms, and trace data for each API supported by the instrumented framework. See [Instrumenting Your App For Tracing](tracing_instrumenting_frameworks.html) for a list of supported frameworks and for links to the setup steps for each SDK.

* Use Wavefront's OpenTracing SDK to implement custom traces for your application's operations. This is a good choice if you want to use annotations to tag your traces or if you want to obtain trace data from critical operations that do not use a supported framework. <!--- ---> See XX for a list of supported programming languages and for links to the setup and usage steps.

All of the options for instrumenting your code allow you to choose whether to send trace data to a Wavefront proxy or directly to the Wavefront service. Using a Wavefront proxy is recommended because of it enables you to configure sampling for your trace data. <!--- See XX --->
 

## How to See Trace Data in Wavefront

Wavefront enables you to visualize and analyze trace data from your applications.


_This section to mention/link to doc for:_

* _spans() query page._

* _"Tracing a Hotspot Across Services" pages._

WF collects traces and spans, and enables you to query and visualize them.

Spans are the basic data type. You can configure WF to keep spans for 7 or 30 days.

## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
