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
<!--- Check final names of services. Styling vs. Designer. --->

Let's look at an example. Here we see a simple Java application for ordering beach shirts. 

![tracing beachShirts](images/tracing_beachshirts_app.png)

This BeachShirts application has multiple services for processing different aspects of a customer order. The diagram shows how these services collaborate by sending requests and responses:
* The customer clicks a button on the client browser to trigger a request (`orderShirts`) to the Shopping service.
* The Shopping service sends the customer's shirt-selection data in a request to the Styling service. 
* The Styling service sends a series of requests to invoke other application services (such as Printing and Packaging). Each invoked service performs its operations and returns a response to Styling.
* Finally, the Styling service sends a response to the Shopping service, which invokes the Delivery service and sends a confirmation email back to the customer. 

These services are designed to be run on different hosts, so they are implemented using frameworks (like Dropwizard, gRPC, and Spring Boot) that support HTTP and RPC requests. The requests among these services might be asynchronous and quite lengthy.


### Sample Traces and Spans
<!--- Check final names of services. Styling vs. Designer. --->
<!--- Get real screen shot when colors are finalized. --->

Now let's look at how we represent the end-to-end transaction that starts with the `orderShirts` request:

![tracing trace spans](images/tracing_trace_spans.png)

Notice:
* trace is a tree of spans
* spans contain other spans. Represents operation within a service that passes data or control to another operation in some other service (could be in same service)
* trace at one level is a span in a larger trace above it.
* trace is identified by the name of its first span. Could have a trace called makeShirts whose spans are operations in Styling service.


## Ways to Send Trace Data to Wavefront

_This section to mention/link to doc for:_

* _Applications instrumented by 3rd party OpenTracing solutions such as Jaeger._

* _Applications instrumented by Wavefront SDKs._


## How to See Trace Data in Wavefront
_This section to mention/link to doc for:_

* _spans() query page._

* _"Tracing a Hotspot Across Services" pages._


## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
2. Simplify BeachShirts app diagram? Just want to illustrate trace vs. span for now, and give link to UI section for full demo.
