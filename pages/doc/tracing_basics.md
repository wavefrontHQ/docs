---
title: Distributed Tracing Basics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_basucs.html
summary: Learn about Wavefront's support for tracing data, and how visualizing traces can help you pinpoint errors and bottlenecks in your app.
---

One of the ways to start the flow of traces into Wavefront is to instrument your application. Instrumentation enables you to trace a transaction flow from end to end across multiple distributed services, guided by key metrics from your application. By displaying a transaction as a hierarchy of Wavefront tracing _spans_, you can pinpoint where the transaction is spending most of its time, and discover where it might be failing.

This page shows you the fast track to producing out-of-the-box metrics and tracing spans from popular application frameworks. 


## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
