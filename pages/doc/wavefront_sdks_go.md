---
title: Wavefront Observability SDKs for Go
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: wavefront_sdks_go.html
summary: Find Wavefront SDKs for instrumenting a Go application to send observability data to Wavefront.
---


This page lists the available [Wavefront observability SDKs](wavefront_sdks.html) for collecting metrics, histograms, and trace data from the microservices in a Go application. 

To obtain an SDK, click on the link and follow the setup steps on GitHub. 

* **Note:** Be sure to use the latest version of the SDK.

<!---
## Go SDKs That Instrument Frameworks

Each [framework-instrumentation SDK](wavefront_sdks.html#sdks-that-instrument-frameworks) collects observability data from a particular Go framework or component, with minimal code setup.

<table id = "framework-go" width="100%">
<colgroup>
<col width="20%" />
<col width="60%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Wavefront SDK</th><th>Description</th><th>Observability Data</th></tr>
</thead>
<tr>
<td markdown="span">[]()</td>
<td> </td>
<td markdown="span">Metrics, histograms, trace data</td>
</tr>

</tbody>
</table>
--->

<!---

## Go SDKs for Collecting Metrics

A [metrics SDK](wavefront_sdks.html#sdks-for-collecting-metrics-and-histograms) enables you to instrument critical business methods to collect and send custom metrics and histograms. You'll need to add some code to each method to be instrumented.

<table id = "metrics-go" width="100%">
<colgroup>
<col width="20%" />
<col width="60%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Wavefront SDK</th><th>Description</th><th>Observability Data</th></tr>
</thead>
<tr>
<td markdown="span">[XXX SDK for Go](https://github.com/wavefrontHQ/wavefront-pyformance)</td>
<td>Implementation of the XXX library, so you can instrument your application code to collect and send custom metrics and histograms to Wavefront. </td>
<td markdown="span">Metrics, histograms</td>
</tr>
<tr>
<td markdown="span">[OpenTracing SDK for Go](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)</td>
<td markdown="span">Implements the [OpenTracing](https://www.opentracing.io) specification, so you can instrument your application code to collect and send custom traces and spans to Wavefront. </td>
<td markdown="span">Trace data</td>
</tr>

</tbody>
</table>

--->
## Go SDK for Collecting Trace Data

The [Wavefront OpenTracing SDK](wavefront_sdks.html#sdks-for-collecting-trace-data) enables you to instrument critical business methods to collect and send custom trace data. You'll need to add some code to each method to be instrumented.

<table id = "opentracing-go" width="100%">
<colgroup>
<col width="30%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Wavefront SDK</th><th>Description</th><th>Observability Data</th></tr>
</thead>
<tr>
<td markdown="span">[OpenTracing SDK for Go](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)</td>
<td markdown="span">Implementation of the [OpenTracing](https://www.opentracing.io) specification, so you can instrument your application code to collect and send custom traces and spans to Wavefront. 
<br>Automatically reports [RED metrics](trace_data_details.html#red-metrics-derived-from-spans) that describe the reported spans.</td>
<td markdown="span">Trace data and derived RED metrics</td>
</tr>

</tbody>
</table>

## Go SDK for Sending Raw Data

The [sender  SDK](wavefront_sdks.html#sdks-for-sending-raw-data-to-wavefront) enables you send raw values to Wavefront for ingestion as metrics, histograms, or trace data. 

<table id = "raw-go" width="100%">
<colgroup>
<col width="30%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Wavefront SDK</th><th>Description</th><th>Observability Data</th></tr>
</thead>
<tr>
<td markdown="span">[Sender SDK for Go](https://github.com/wavefrontHQ/wavefront-sdk-go)</td>
<td>Sends raw data values either directly to the Wavefront service or to a Wavefront proxy. </td>
<td markdown="span">Metrics, histograms, trace data</td>

</tr>

</tbody>
</table>
