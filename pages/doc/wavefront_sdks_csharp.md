---
title: Wavefront Observability SDKs for .NET/C#
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: wavefront_sdks_csharp.html
summary: Find Wavefront SDKs for instrumenting a .NET/C# application to send observability data to Wavefront.
---


This page lists the available [Wavefront observability SDKs](wavefront_sdks.html) for collecting metrics, histograms, and trace data from the microservices in a .NET/C# application. 

To obtain an SDK, click on the link and follow the setup steps on GitHub. 

* **Note:** Be sure to use the latest version of the SDK.

<!---
## Framework-level .NET/C# SDKs

Each [framework-level SDK](wavefront_sdks.html#sdks-for-instrumenting-application-frameworks) collects observability data from a particular .NET/C# framework or component, with minimal code setup.

<table id = "framework-csharp" width="100%">
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

## Custom-level .NET/C# SDKs

Each [custom-level SDK](wavefront_sdks.html#sdks-for-instrumenting-custom-operations) enables you to instrument critical-path, proprietary business operations that are not based on an instrumented framework. You'll need to add some code to each operation that is to report observability data.

<table id = "custom-csharp" width="100%">
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
<td markdown="span">[App Metrics SDK for .NET/C#](https://github.com/wavefrontHQ/wavefront-appmetrics-sdk-csharp)</td>
<td>Implements App Metrics, so you can instrument custom business operations to collect and send metrics and histograms to Wavefront. </td>
<td markdown="span">Metrics, histograms</td>
</tr>

<tr>
<td markdown="span">[OpenTracing SDK for .NET/C#](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)</td>
<td markdown="span">Implements the [OpenTracing](https://www.opentracing.io) specification, so you can instrument custom business operations to collect and send traces and spans to Wavefront. </td>
<td markdown="span">Trace data</td>
</tr>
</tbody>
</table>

## Core .NET/C# SDK

The [core SDK](wavefront_sdks.html#core-sdks-for-sending-raw-data-to-wavefront) enables you send raw values to Wavefront for ingestion as metrics, histograms, or trace data. 

<table id = "core-csharp" width="100%">
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
<td markdown="span">[Metrics, histograms, trace data](https://github.com/wavefrontHQ/wavefront-sdk-csharp)</td>
<td>Sends raw data values either directly to the Wavefront service or to a Wavefront proxy. </td>
<td markdown="span">Metrics, histograms, trace data</td>
</tr>

</tbody>
</table>
