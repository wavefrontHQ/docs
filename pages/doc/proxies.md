---
title: Wavefront Proxies
keywords:
tags: [proxies]
sidebar: doc_sidebar
permalink: proxies.html
summary: Learn about Wavefront proxies.
---
[Introduction to Wavefront](wavefront_introduction.html) introduced the Wavefront proxy. The proxy is a Java program
that sends data collected from hosts, applications, and services to Wavefront in a secure, fast, and reliable manner.
The proxy handles hundreds to thousands of simultaneous clients. It consolidates points into configurable batches
(usually 1 second), adding minimal latency (0.5 second, on average, due to the 1 second batches).

The proxy works with the Wavefront server to ensure end-to-end flow control. When it detects network connectivity
issues, the proxy queues metrics in memory and to disk. Once connectivity is restored the proxy replays queued metrics
but prioritizes real-time traffic. There are many ways to [configure](proxies_configuring.html) the proxy to tune this
behavior.

The proxy includes a [preprocessor](proxies_preprocessor_rules.html) that applies various user-defined point filtering
and altering rules before data is sent to Wavefront. This functionality allows addressing correctable data quality
issues within the existing data flow, when fixing the problem at the emitting source is not feasible.

A proxy generates its own [internal metrics](wavefront_monitoring.html) for easy monitoring of the pipeline within
Wavefront. In initial deployments you can start with one Wavefront proxy. However, to enable fault tolerance and higher
data rates, production environments more typically employ a load balancer sending data to multiple proxies:

![Wavefront architecture load balanced](images/wavefront_architecture_lb.png)