---
title: Instrumenting Your App for Tracing
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_sdk_quickstart.html
summary: Learn how to set up your application to send data into Wavefront.
---

One of the ways to start the flow of traces into Wavefront is to instrument your application. Instrumentation provides you with the ability to trace requests across services, in the context of key metrics from your application.

This page shows you the fast track to producing out-of-the-box metrics and tracing spans from popular application frameworks. 

**Note:** You can instrument your application to send custom traces and metrics. _[[Link to other SDKs]]_

## Sample Setup

Watch this video to see how to set up a sample application to send out-of-the-box metrics and traces. (You can read about the steps [below](#setup-process).)

_[[video that describes how to set up BeachShirts app]]_

## Setup Process 

You get the exact setup steps by picking a programming language and framework in a [table below](#pick-a-language-and-framework-to-instrument). 

In all cases, you will:
 
1. Add dependencies in the build system of your choice, such as Maven. 

2. Edit your code to instantiate a few helper objects. These objects:
  * Describe your application to Wavefront. _[[Link to tagging topic]]_
  * Configure how frequently data is reported. _[[Link to reporter topic]]_
  * Specify whether to send data through a Wavefront proxy or directly to the Wavefront service. _[[Link to proxy vs. direct ingestion topic]]_

3. Start a Wavefront proxy if you are using one. 

After your application starts running, you can click **Applications** in the Wavefront menu bar to start exploring your metrics and traces.


## Pick a Language and Framework to Instrument 

Pick the language and framework used by the service you want to instrument. Click on the link to go to the detailed setup steps.

<table width="100%">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<thead>
<tr><th>Java Framework</th><th>Description</th></tr>
</thead>
<tr><td markdown="span">[Jersey Compliant](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)</td>
<td>Instruments all Jersey-compliant APIs to send telemetry data to Wavefront, such as DropWizard and Spring Boot.</td></tr>
<tr><td markdown="span">gRPC</td>
<td>Instruments all gRPC APIs to send telemetry data to Wavefront.</td></tr>
<tr><td markdown="span">JVM</td>
<td>Instruments Java Virtual Machine calls to send metrics and histograms to Wavefront. Measures CPU, disk usage, and so on.</td></tr>
</tbody>
</table>

<table width="100%">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<thead>
<tr><th>C#/.NET Framework</th><th>Description</th></tr>
</thead>
<tr><td markdown="span"> TBD </td>
<td>TBD</td></tr>
<tr><td markdown="span">TBD</td>
<td>TBD</td></tr>
</tbody>
</table>


_[[Links from this table should be either go to the GitHub readme.md file, or to a doc page generated from that file.]]_

## Writer's Questions

1. OK to use SDK readme file on Git as source for a generated doc .html file?
2. Consider packaging/presenting SDKs as integrations?
  * Datadog does this for its JVM SDK equivalent: [DataDog Language Integrations](https://docs.datadoghq.com/integrations/#cat-languages)
  * WF already has UI conventions and infrastructure for integrations.
  * Easy for user to search for integration tiles in the WF UI and then view setup info. Click on a tile to view integration page with Overview, Setup, Metrics tabs.
  * Easy for user to view setup info from doc. Script combines all separate overview.md, setup.md, metrics.md files into a single generated .html page in the doc. Other doc pages can link to generated page.
