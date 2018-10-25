---
title: Distributed Tracing Basics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_basics.html
summary: Learn about Wavefront's support for tracing data, and how visualizing traces can help you pinpoint errors and bottlenecks in your app.
---

Distributed tracing enables you to track the flow of work that is performed by your application as it processes a user request. When an application consists of multiple services, a request is typically propagated from one service to the next. Distributed tracing gives you end-to-end visibility into an entire transaction (chain of requests) across services. This visibility can help you fix or prevent errors and performance problems in your code. 

Distributed tracing starts with ingesting _tracing data_ from your applications into Wavefront.
Because Wavefront integrates tracing data with metrics, you can use Wavefront charts and dashboards for tasks such as the following: 

* Monitor your application to make sure it meets your expectations for response times.
* Troubleshoot and analyze reported errors. 
* Pinpoint the specific operations that bottlenecks occur in.

## Tracing Data

Following the OpenTracing standard, Wavefront enables you to represent an application's workflows and transactions as _traces_, where each trace is a particular chain of requests among an application's services. A segment of work within a trace is 






## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
