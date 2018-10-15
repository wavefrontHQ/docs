---
title: Fast Track to Instrumenting Your App <Doc Prototype>
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_sdk_quickstart.html
summary: Learn how to set up your application to send data into Wavefront.
---

You start the flow of telemetry data into Wavefront by instrumenting the services in your application. 

This page shows you the fast track to instrumentation, which produces out-of-the-box metrics, histograms, and tracing spans from popular application frameworks. As your application executes, you'll be able to identify requests that have unusual frequency, the most errors, the longest latency, the largest payload, and so on. With this information, you can quickly pinpoint application hotspots to be fixed.

Wavefront also supports custom instrumentation. _[[Link to other SDKs]]_

## Sample Setup

Watch this video to see how to set up a sample application to send out-of-the-box metrics and traces. (You can read about the steps [below](#setup-process).)

_[[video that describes how to set up Beach Shirt app?]]_

## Setup Process 

You get the exact setup steps by picking a programming language and framework in a [table below](#pick-a-language-and-framework-to-instrument). 

In all cases, you will:
 
1. Define dependencies in a build system of your choice, such as Maven. 

2. Edit your code to create a few helper objects. These objects:
  * Describe your application to Wavefront. _[[Link to tagging topic]]_
  * Determine how often data is reported. _[[Link to reporter topic]]_
  * Specify whether to send data through a Wavefront proxy or directly to the Wavefront service. _[[Link to proxy vs. direct ingestion topic]]_

3. Start a Wavefront proxy if you are using one. 

After you build and run your application, you can click **Applications** in the Wavefront menu bar to start exploring your metrics and traces.


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
<td>Instruments Jersey-compliant APIs to send telemetry data to Wavefront.</td></tr>
<tr><td markdown="span">gRPC</td>
<td>Instruments gRPC APIs to send telemetry data to Wavefront.</td></tr>
<tr><td markdown="span">JVM</td>
<td>Instruments the Java Virtual Machine to send metrics and histograms to Wavefront. Measures CPU, disk usage, and so on.</td></tr>
</tbody>
</table>

<table width="100%">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<tbody>
<thead>
<tr><th>Python Framework</th><th>Description</th></tr>
</thead>
<tr><td markdown="span"> TBD </td>
<td>TBD</td></tr>
<tr><td markdown="span">TBD</td>
<td>TBD</td></tr>
</tbody>
</table>


_[[Links from this table should be either go to the GitHub readme.md file, or to a doc page generated from that file.]]_



## Writer's Discussion:

1. This is the standard doc template. Changing would be time-consuming. 
    - TOC at the top only suppressed if there are no headers on the page.
3. OK to use SDK readme file on Git for detailed setup steps. 
  - File already has steps with snippets.  
  - Doc should not duplicate -- Error prone and confusing to user; won't scale
  - Developers are comfortable with the style and length.
  - Many developers will go to readme anyway.

### Writer's Questions

1. Is the page title ok? 
  *  Instrumenting Your App? or Instrumenting Your App for Tracing? 
  * SDKs do more than emit tracing data. In fact, JVM SDK doesn’t emit traces at all
1. OK to use SDK readme file on Git as source for a generated doc .html file?
2. Consider packaging/presenting SDKs as integrations?
  * Datadog does this for its JVM SDK equivalent: [DataDog Language Integrations](https://docs.datadoghq.com/integrations/#cat-languages)
  * WF already has UI conventions and infrastructure for integrations.
  * Easy for user to search for integration tiles in the WF UI and then view setup info. Click on a tile to view integration page with Overview, Setup, Metrics tabs.
  * Easy for user to view setup info from doc. Script combines all separate overview.md, setup.md, metrics.md files into a single generated .html page in the doc. Other doc pages can link to generated page.

### Background details
readme files cover the following:
1. Set up dependencies
      * Snippet
2. Edit code to instantiate WavefrontSender object (`WavefrontProxyClient`, `WavefrontDirectIngestionClient`)
      * Code snippet
      * _Link to doc for definitions/guidelines about proxy vs. direct ingestion_
3. Edit code to instantiate `WavefrontJerseyReporter` object with `WavefrontSender` object.
      * Code snippet
      * _Link to doc for guidelines on reporting interval_
4. Edit code to create a map of application tags. 
      * Code snippet
      * _Link to doc to describe application topology_
5. Edit code to instantiate `WavefrontJerseyFilter` object with map of tags and reporter object.
      * Code snippet
      * _Specific to Jersey...something similar for gRPC?_
6. Edit code to activate JVM metrics?
      * Code snippet
6. Go to XXX for example of generated metrics.
7. Go to YYY to see the dashboard we defined for you.
