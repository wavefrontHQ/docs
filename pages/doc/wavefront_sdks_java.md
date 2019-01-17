---
title: Wavefront Observability SDKs for Java
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: wavefront_sdks_java.html
summary: Find Wavefront SDKs for instrumenting a Java application to send observability data to Wavefront.
---


This page lists the available [Wavefront observability SDKs](wavefront_sdks.html) for collecting metrics, histograms, and trace data from the microservices in a Java application. For each SDK, click on the link to see the detailed setup steps.

## Framework-level Java SDKs

Each framework-level SDK collects metrics, histograms, and trace data from a particular Java framework or component. Setup consists of configuring and instantiating several helper objects in your microservice. No other code updates are needed.

<table id = "sdks" width="100%">
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="60%" />
</colgroup>
<tbody>
<thead>
<tr><th>Instrumented Framework</th><th>Collected Data</th><th>SDK Description</th></tr>
</thead>

<tr>
<td markdown="span">[Dropwizard](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)</td>
<td markdown="span">Metrics, histograms, trace data</td>
<td>Instruments Dropwizard, a Jersey-compliant framework for building RESTful Web services. Sends observability data from HTTP requests and responses.</td></tr>

<tr>
<td markdown="span">[gRPC](https://github.com/wavefrontHQ/wavefront-gRPC-sdk-java)</td>
<td markdown="span">Metrics, histograms, trace data</td>
<td>Instruments gRPC, a framework for building services that communicate through remote procedure calls. Sends observability data from gRPC requests and responses.</td></tr>

<tr>
<td markdown="span">[JAX-RS](https://github.com/wavefrontHQ/wavefront-jaxrs-sdk-java)</td>
<td markdown="span">Metrics, histograms, trace data</td>
<td>Instruments a JAX-RS (JSR 311: The Java API for RESTful Web Services) implementation for building RESTful Web services. Sends observability data from HTTP requests and responses.</td></tr>

<tr>
<td markdown="span">[JVM](https://github.com/wavefrontHQ/wavefront-runtime-sdk-jvm)</td>
<td markdown="span">Metrics, histograms</td>
<td>Instruments the Java Virtual Machine to send runtime metrics and histograms to Wavefront. Sends observability data for CPU usage, disk usage, and so on.</td></tr>

<tr>
<td markdown="span">[Spring Boot](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)</td>
<td markdown="span">Metrics, histograms, trace data</td>
<td>Instruments Spring Boot, a Jersey-compliant framework for building RESTful Web services. Sends observability data from HTTP requests and responses.</td></tr>

</tbody>
</table>

## Custom-level Java SDKs

Each SDK enables you to instrument critical-path, proprietary business operations that are not based on an instrumented framework. 
Setup consists of configuring and instantiating several helper objects in your microservice, defining the particular types of data to be collected, and augmenting the individual business operations with calls to SDK methods.

<table id = "sdks" width="100%">
<colgroup>
<col width="25%" />
<col width="75%" />
</colgroup>
<tbody>
<thead>
<tr><th>Supported Data</th><th>SDK Description</th></tr>
</thead>
<tr>
<td markdown="span">[Metrics and histograms](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java)</td>
<td>Implements Dropwizard Metrics, so you can instrument custom business operations to send metrics and histograms to Wavefront. </td></tr>

<tr>
<td markdown="span">[Trace data](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java)</td>
<td>Implements the [OpenTracing](https://www.opentracing.io) specification, so you can instrument custom business operations to send traces and spans to Wavefront. </td></tr>
</tbody>
</table>

## Core SDK

The core SDK enables you send raw values to Wavefront for ingestion as metrics, histograms, or trace data. 

<table id = "sdks" width="100%">
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<tbody>
<thead>
<tr><th>Values For</th><th>Java SDK Description</th></tr>
</thead>
<tr>
<td markdown="span">[Metrics, histograms, trace data](https://github.com/wavefrontHQ/wavefront-sdk-java)</td>
<td>Sends values either directly to the Wavefront service or to a Wavefront proxy. </td></tr>

</tbody>
</table>
