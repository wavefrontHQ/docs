---
title: Wavefront Observability SDKs for C++
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: wavefront_sdks_cpp.html
summary: Find Wavefront SDKs for instrumenting a C++ application to send observability data to Wavefront.
---


This page lists the available [Wavefront observability SDKs](wavefront_sdks.html) for collecting metrics, histograms, and trace data from the microservices in a C++ application. 

To obtain an SDK, click on the link and follow the setup steps on GitHub. 

* **Note:** Be sure to use the latest version of the SDK.

<!---
## Framework-level C++ SDKs

Each [framework-level (Level 3) SDK](wavefront_sdks.html#sdks-for-framework-instrumentation) collects observability data from a particular C++ framework or component, with minimal code setup.

<table id = "framework-cpp" width="100%">
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


## General-Purpose C++ SDKs

Each [general-purpose (Level 2) SDK](wavefront_sdks.html#general-purpose-sdks-for-custom-and-runtime-instrumentation) enables you to instrument critical business methods that are not handled by any instrumented framework. You'll need to add some code to each method to be instrumented.


<table id = "custom-cpp" width="100%">
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
<td markdown="span">[XX SDK for C++](https://github.com/wavefrontHQ/wavefront-xx-sdk-cpp)</td>
<td>Implements App Metrics, so you can instrument your application code to collect and send custom metrics and histograms to Wavefront. </td>
<td markdown="span">Metrics, histograms</td>
</tr>

<tr>
<td markdown="span">[OpenTracing SDK for C++](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-cpp)</td>
<td markdown="span">Implements the [OpenTracing](https://www.opentracing.io) specification, so you can instrument your application code to collect and send custom traces and spans to Wavefront. </td>
<td markdown="span">Trace data</td>
</tr>
</tbody>
</table>
--->

## Core C++ SDK

The [core (Level 1)  SDK](wavefront_sdks.html#core-sdks-for-sending-raw-data-to-wavefront) enables you send raw values to Wavefront for ingestion as metrics, histograms, or trace data. 

<table id = "core-cpp" width="100%">
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
<td markdown="span">[Core SDK for C++](https://github.com/wavefrontHQ/wavefront-sdk-cpp)</td>
<td>Sends raw data values either directly to the Wavefront service or to a Wavefront proxy. </td>
<td markdown="span">Metrics, histograms, trace data</td>
</tr>

</tbody>
</table>
