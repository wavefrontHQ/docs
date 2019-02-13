---
title: Wavefront Observability SDKs for Python
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: wavefront_sdks_python.html
summary: Find Wavefront SDKs for instrumenting a Python application to send observability data to Wavefront.
---


This page lists the available [Wavefront observability SDKs](wavefront_sdks.html) for collecting metrics, histograms, and trace data from the microservices in a Python application. 

To obtain an SDK, click on the link and follow the setup steps on GitHub. 

* **Note:** Be sure to use the latest version of the SDK.

<!---
## Framework-level Python SDKs

Each [framework-level (Level 3) SDK](wavefront_sdks.html#sdks-for-framework-instrumentation) collects observability data from a particular Python framework or component, with minimal code setup.

<table id = "framework-python" width="100%">
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

## General-Purpose Python SDKs

Each [general-purpose (Level 2) SDK](wavefront_sdks.html#general-purpose-sdks-for-custom-and-runtime-instrumentation) enables you to instrument critical business methods that are not handled by any instrumented framework. You'll need to add some code to each method to be instrumented.

<table id = "custom-python" width="100%">
<colgroup>
<col width="20%" />
<col width="60%" />
<col width="20%" />
</colgroup>
<tbody>
<thead>
<tr><th>Wavefront SDK</th><th>Description</th><th>Observability Data</th></tr>
</thead>
<!---
<tr>
<td markdown="span">[PyFormance SDK for Python](https://github.com/wavefrontHQ/wavefront-pyformance)</td>
<td>Implements PyFormance, so you can instrument your application code to collect and send custom metrics and histograms to Wavefront. </td>
<td markdown="span">Metrics, histograms</td>
</tr>
--->
<tr>
<td markdown="span">[OpenTracing SDK for Python](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python)</td>
<td markdown="span">Implements the [OpenTracing](https://www.opentracing.io) specification, so you can instrument your application code to collect and send custom traces and spans to Wavefront. </td>
<td markdown="span">Trace data</td>
</tr>

</tbody>
</table>



## Core Python SDK

The [core (Level 1)  SDK](wavefront_sdks.html#core-sdks-for-sending-raw-data-to-wavefront) enables you send raw values to Wavefront for ingestion as metrics, histograms, or trace data. 

<table id = "core-python" width="100%">
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
<td markdown="span">[Core SDK for Python](https://github.com/wavefrontHQ/wavefront-sdk-python)</td>
<td>Sends raw data values either directly to the Wavefront service or to a Wavefront proxy. </td>
<td markdown="span">Metrics, histograms, trace data</td>

</tr>

</tbody>
</table>
