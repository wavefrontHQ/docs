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
* The out-of-the-box metrics can tell you this sort of thing:
* The out-of-the-box tracing data can tell you this sort of thing:

Watch this video or perform the steps below to get started:

(video here)

## Pick a Language and Framework to Instrument 

For each service in your app, pick the language and framework it uses.  

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

What are the simple "1-2-3" steps?

1. Set up maven
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

Click [here](#pick-a-language-and-framework-to-instrument) to pick another framework.

## Writer's Discussion:

1. Can we **simplify** steps? 
  - Should doc be more general/abstract (but then not very useful)
  - Maybe provide users with a file containing all the snippets that can be edited and included in code?
  - Is a config file a possibility?

2. **Git readme.md** file already has steps with snippets.  [GitHub link](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)
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
