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

## Wavefront Trace Data

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data. This means:

* Wavefront represents an individual workflow (transaction) in an application as a _trace_. A trace shows you how a particular request propagates throughout your application or among a set of services. 

* A Wavefront trace consists of one or more _spans_, which are the individual segments of work in the trace. Each span typically represents an operation or API call from one service to another, such an an HTTP request or an RPC request. A span can also represent an operation that calls another operation within the same service.

Because requests are normally composed of other requests, a trace actually consists of a _tree_ of spans. 

### Example
Let's look at an example. Here we see a simple application for ordering beach shirts. 

![tracing beachShirts](images/tracing_beachshirts_app.png)

This application has multiple services for processing different aspects of a customer order. A user's order is processed by an API service, which in turn passes the user's shirt selection data along to a Styling service. The Styling service makes a series of requests, passing control to other services, such as OrderDetails, Printing, and Wrapping. 

These services are running an different hosts, and so they use frameworks like Dropwizard and gRPC to make HTTP and RPC requests.


Now let's look at how we represent the end-to-end transaction that starts with ordering a shirt:

_[[Diagram (or screen shot of UI P4?) with callout for a trace and a span]]_

Notice:
* spans contain other spans. Represents operation within a service that passes data or control to another operation in some other service (could be in same service)
* trace at one level is a span in a larger trace above it.


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
