---
title: OpenTelemetry Tutorials
keywords: tracing opentelemetry tutorial
tags: [tracing, tutorials]
sidebar: doc_sidebar
permalink: opentelemetry_java_tutorial.html
summary: Set up your environment to send OpenTelemetry Data to Wavefront.
---
With observability, you can ask questions about your system and get answers based on the telemetry data (metrics, traces, and logs) they produce.

With our tracing capabilities, you can analyze every request as it moves from one service to the next. This helps you:
* Pinpoint the root cause of failures.
* Identify performance bottlenecks.

With native support for OpenTelemetry, you can get started **without** manually instrumenting your Java application.

## Tutorials on Github

The tutorials on Github are Hello World style examples that support getting data in for different languages. For most languages, we have an example for auto instrumentation and an example for manual instrumentation.

* [Sending Trace Data to Tanzu Observability by Wavefront](https://github.com/wavefrontHQ/opentelemetry-examples) gets you started with an overview.
* **Java** [Instrumenting Java Apps with Opentelemetry](https://github.com/wavefrontHQ/opentelemetry-examples/tree/master/java-example) has details for manual instrumentation.
* **DOTNET** [Instrumenting .NET Apps with OpenTelemetry](https://github.com/wavefrontHQ/opentelemetry-examples/tree/master/DOTNET-example) includes steps for both autoinstrumentation and manual instrumentation.
* **Python** [Instrumenting Python Apps with OpenTelemetry](https://github.com/wavefrontHQ/opentelemetry-examples/tree/master/python-example) includes steps for both autoinstrumentation and manual instrumentation.
* **Go** [The Go example folder](https://github.com/wavefrontHQ/opentelemetry-examples/tree/master/go-example) includes a folder for auto-instrumentation and a folder for manual instrumentation. 

## Next Steps

- Familiarize yourself with the tracing concepts. See [Tracing Concepts in Wavefront](trace_data_details.html) for details.
- To see Tanzu Observability in action, watch [this replay from our SpringOne 2021 keynote](https://youtu.be/QMCYmaPa_14), which shows an example of how a team can use it to get to the bottom of an application incident.
