---
title: Fast Track to Instrumenting Your App <Doc Prototype>
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_sdk_quickstart.html
summary: Learn how to set up your application to send data into Wavefront.
---
It's easy to get telemetry data (metrics, histograms, and tracing spans) out of your application and into Wavefront.

You'll want to start by instrumenting the services in your app to send out-of-the-box metrics and tracing data from each request and response.
* The out-of-the-box metrics can tell you this sort of thing: ...
* The out-of-the-box tracing data can tell you this sort of thing: ...

Watch this video:

(video here? Need to define what territory it covers.)

## Setup Process 

Your exact setup steps will depend on which programming language and frameworks you use in the application you want to instrument. You'll pick these [below](#pick-a-language-and-framework-to-instrument). 

In all cases, you will:
 
1. Define dependencies in a build system of your choice, such as Maven. 

2. Edit your code to create a few helper objects. These objects:
  * Describe your application to Wavefront. _Link to tagging topic._
  * Determine how often data is reported. _Link to reporter topic._
  * Specify whether to send data through a Wavefront proxy or directly to the Wavefront service.  _Link to proxy vs. direct ingestion topic._
    You'll also need to start a Wavefront proxy if you are using one. 
3. Build and run your application.
4. Click Applications in the Wavefront menu bar to start exploring your metrics and traces.


## Pick a Language and Framework to Instrument 

For each service in your app, pick the language and framework it uses.  _Pretend this is a better table!_

| Java | Framework |
|------| --------- |
|   | [Jersey Compliant](#instrumenting-a-jersey-compliant-framework) |
|   | gRPC | 

| Python or C# | Framework |
|------| --------- |
|   | tbd  |
|   | tbd  |


## Instrumenting a Jersey Compliant Framework

*PRETEND THIS IS A SEPARATE PAGE*

_The content of this page should be either the [GitHub readme.md file](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java), or a doc page generated from that file._



## Writer's Discussion:


2. **Git readme.md** file already has steps with snippets.  
  - Doc should not duplicate. 
    - Error prone and confusing to user.
    - Duplication in doc Won't scale to complete set of SDKs with current writing staff.

3. Git readme.md should be the **single source for code and doc**.
  - Many developers will go to readme anyway.

### Proposal 
**package and present SDKs as integrations**.
  * Datadog does this: [DataDog Language Integrations](https://docs.datadoghq.com/integrations/#cat-languages)
  * WF already has UI conventions and infrastructure for integrations.

  * Easy for user to search for integration tiles in the WF UI and then view setup info: 
    - Click on a tile to view integration page with Overview, Setup, Metrics tabs
    - Generated from separate overview.md, setup.md, metrics.md files.
  * Easy for user to view setup info from doc:
    - Script combines all .md into a single generated .html page in the doc. 
    - Other doc pages can link to generated page.

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
