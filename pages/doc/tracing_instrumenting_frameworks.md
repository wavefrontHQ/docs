---
title: Instrumenting Your App for Tracing - Beta
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_instrumenting_frameworks.html
summary: Learn how to set up your application to send metrics, histograms, and trace data to Wavefront.
---

You start the flow of trace data into Wavefront by instrumenting your application. Instrumentation enables you to trace a transaction flow from end to end across multiple distributed services, guided by key metrics from your application. By visualizing a transaction as a _trace_ that consists of a hierarchy of _spans_, you can pinpoint where the transaction is spending most of its time, and discover where it might be failing.

You instrument each microservice in your application with one or more Wavefront _observability SDKs_. You choose these SDKs based on:
* The frameworks (components) you use in the microservice -- for example, Java Dropwizard Jersey
* The kind of data you want to collect -- metrics, histograms, trace data, or all 3 
* Whether you want to collect out-of-the-box metrics and trace data, custom business metrics and trace data, or both

This page shows you the fast track to producing out-of-the-box metrics and trace data from the application frameworks you use in your microservices. 
* For an overview of what instrumentation addes to your microservices, see [A Closer Look at an Instrumented Microservice](#a-closer-look-at-an-instrumented-microservice)
* For a general overview of distributed tracing in Wavefront, see [Distributed Tracing Basics](tracing_basics.html).

<!---
* For information about instrumenting your application to send custom traces and metrics. _[[Link to SDK page for custom tracing and metrics ]]_
* For information about ingesting trace data from an application that has been instrumented with a 3rd party solution such as Jaeger, see XX.
--->

<!---
## Sample Setup

Watch this video to see how to set up a sample application to send out-of-the-box metrics and traces. (You can read about the steps [below](#quickstart).)

_[[video that describes how to set up BeachShirts app]]_
--->

## Step 1. Prepare to Send Data to Wavefront

1. Choose how you want to send metric and trace data to Wavefront. Two options are available:
   * Sending data to a [Wavefront proxy](proxies.html), which then forwards the data to the Wavefront service. (Recommended for most use cases.)
   * Sending data directly to the Wavefront service, also called [direct ingestion](direct_ingestion.html).
2. If you are using a **Wavefront proxy**: 
   * [Install the proxy](proxies_installing.html), if necessary. Make sure you are using Version 4.32 or later.
   * On the proxy host, open the proxy configuration file `wavefront.conf` in the installed [file path](proxies_configuring.html#paths), for example, `/etc/wavefront/wavefront-proxy/wavefront.conf`.
   * In the `wavefront.conf` file, find the following [port properties](proxies_installing.html#configuring-proxy-ports-for-metrics-histograms-and-traces), and uncomment them if necessary. You can optionally change these default port numbers:
    ```
    pushListenerPort=2878
    ...
    histogramDistListenerPort=40000
    ...
    traceListenerPort=30000
    ```
   * [Start the proxy](proxies_installing.html#starting-and-stopping-a-proxy).
3. If you are using **direct ingestion**:
  * Identify the URL of your Wavefront instance. This is the URL you connect to when you log in to Wavefront, typically something like `https://myCompany.wavefront.com`.
  * [Obtain an API token](wavefront_api.html#generating-an-api-token).

**Note:** You will need to specify information from these steps when you instrument your code.

## Step 2. Instrument Your Application

Take a moment to identify the microservices in your application, and the components you use in each microservice. Then choose the setup option that best fits your use case. 

### Option 1. Quickstart  

Use this option to instrument a cloud-native Java application with RESTful microservices that are based on one of the following Jersey-compliant frameworks: 
* **Dropwizard Jersey** 
* **Spring Boot**

These steps use configuration files and minimal code changes: 

1. Make sure you have [prepared to send data to Wavefront](#step-1-prepare-to-send-data-to-wavefront). 
3. For each Dropwizard or Spring Boot microservice:   
  * Add [dependencies](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java#maven) to the build system, and then follow the [quickstart steps](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java#quickstart).
  * For an overview of what these steps automatically add to your microservice, see [A Closer Look at an Instrumented Microservice](#a-closer-look-at-an-instrumented-microservice), below.
3. After your application starts running, you can click **Browse > Applications** in the Wavefront menu bar to start exploring the metrics, histograms, and trace data that are sent from the framework's operations and from the JVM that runs them.

**Note:** This option automatically sets up the SDK for the Java Virtual Machine (JVM) in addition to the  SDK for the selected framework.

### Option 2. Custom Setup  

Use this option to instrument any microservices that cannot be instrumented with [Option 1](#option-1-quickstart). In particular, follow these steps if you want to add custom metrics or traces to your business operations. Custom setup gives you complete control over every configurable aspect of instrumenting an application framework.

These steps involve instantiating various [helper objects](#a-closer-look-at-an-instrumented-microservice) in your code:

1. Make sure you have [prepared to send data to Wavefront](#step-1-prepare-to-send-data-to-wavefront). 

2. For each microservice in your application: 
  * Pick a framework to instrument from the [following table](#sdks-for-instrumenting-java-applications), and click the corresponding link.
  * Follow the setup steps in the `README` file for the SDK. If a `README` file offers Custom Setup steps, choose those.
  * Repeat for each instrumentable framework or component in the microservice. 

3. After your application starts running, you can click **Browse > Applications** in the Wavefront menu bar to start exploring metrics, histograms, and/or trace data.

**Note:** With this option, you set up the chosen SDKs individually. For example, you instrument the JVM separately from instrumenting any other framework. 

## SDKs for Instrumenting Java Applications

This table shows the available Wavefront observability SDKs for collecting data from microservices in a Java application. For each SDK, click on the link to go to the detailed setup steps. You'll also see examples of metrics that will be reported.

<table id = "sdks" width="100%">
<colgroup>
<col width="20%" />
<col width="30%" />
<col width="50%" />
</colgroup>
<tbody>
<thead>
<tr><th>To Collect Data From</th><th>Use This Wavefront SDK</th><th>Description</th></tr>
</thead>

<tr>
<td>Dropwizard framework</td>
<td markdown="span">[`wavefront-jersey-sdk-java`](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)</td>
<td>Instrument Dropwizard, a Jersey-compliant framework for building RESTful Web services. Enable HTTP requests and responses to send metrics, histograms and trace data to Wavefront.</td></tr>

<tr>
<td>Spring Boot framework</td>
<td markdown="span">[`wavefront-jersey-sdk-java`](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)</td>
<td>Instrument Spring Boot, a Jersey-compliant framework for building RESTful Web services. Enable HTTP requests and responses to send metrics, histograms, and trace data to Wavefront.</td></tr>

<tr>
<td>JAX-RS implementations</td>
<td markdown="span">[`wavefront-jaxrs-sdk-java`](https://github.com/wavefrontHQ/wavefront-jaxrs-sdk-java)</td>
<td>Instrument a JAX-RS (JSR 311: The Java API for RESTful Web Services) implementation for building RESTful Web services. Enable HTTP requests and responses to send metrics, histograms, and trace data to Wavefront.</td></tr>

<tr>
<td>JVM</td>
<td markdown="span">[`wavefront-runtime-sdk-jvm`](https://github.com/wavefrontHQ/wavefront-runtime-sdk-jvm)</td>
<td>Instrument the Java Virtual Machine to send runtime metrics and histograms to Wavefront. Measure CPU, disk usage, and so on.</td></tr>

<tr>
<td>Custom business operations (metrics data)</td>
<td markdown="span">[wavefront-dropwizard-metrics-sdk-java](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java)</td>
<td>Instrument custom business operations using Wavefront's Dropwizard Metrics implementation. Enable your operations to send metrics and histograms to Wavefront. </td></tr>

<tr>
<td>Custom business operations (trace data)</td>
<td markdown="span">[wavefront-opentracing-sdk-java](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java)</td>
<td>Instrument custom business operations using Wavefront's OpenTracing implementation. Enable your operations to send traces and spans to Wavefront. </td></tr>

</tbody>
</table>

<!---
<tr>
<td>gRPC operations</td> 
<td markdown="span">[gRPC](https://github.com/wavefrontHQ/wavefront-grpc-sdk-java)</td>
<td>Instruments all gRPC APIs to send telemetry data to Wavefront.</td></tr>
--->
<!---
**Note:** To instrument custom business operations that are not based on the supported frameworks: 
* For metrics and histograms, use [wavefront-dropwizard-metrics-sdk-java](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java)
* For trace data, use [wavefront-opentracing-sdk-java](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java).
--->
## A Closer Look at an Instrumented Microservice

When an application consists of multiple microservices, you instrument each microservice separately with one or more Wavefront SDKs. 
 
For each microservice, you edit some combination of configuration files and code files to create several helper objects that work together to create and send metrics, histograms, and trace data to Wavefront. These objects include:

  * An [ApplicationTags](#ApplicationTags) object for describing your application to Wavefront. 
  * A [WavefrontSender](#configuring-how-to-send-data-to-wavefront) for specifying whether to send data through a Wavefront proxy or directly to the Wavefront service.
  * Several different kinds of [WavefrontReporter objects](#configuring-metric-data-reporting) for configuring how metrics and histograms are reported to the WavefrontSender.
  * [WavefrontTracer and WavefrontSpanReporter](#arranging-for-trace-data-to-be-reported) objects for creating and propagating trace data.
  * One or more framework-specific objects (such as a Java WavefrontJerseyFilter) for collecting metrics and histograms.


The following diagram shows an overview of these objects in a Java service that uses Spring Boot to implement RESTful operations to other services:

![sdk objects](images/sdk_objects.png)

<!---
Passing contexts between oprations for trace data.
--->

### Application Tags

Wavefront requires tags that describe the architecture of your application as it is deployed. These tags (called _application tags_) are associated with the metrics and trace data sent from the instrumented microservices in your application. 

You specify a separate set of application tags for each microservice you instrument. Wavefront uses these tags to aggregate and filter data at different levels of granularity.

* **Required tags** enable you to drill down into the data for a particular service:  
    - `application` - Name that identifies the application, for example, `beachshirts`. **All microservices in the same application should share the same application name.**
    - `service` - Name that identifies the microservice, for example, `delivery`. **Each microservice should have its own service name.**

  ![tracing app services](images/tracing_app_services_page.png)


* **Optional tags** enable you to use the physical topology of your application to further filter your data:
  - `cluster` - Name of a group of related hosts that serves as a cluster or region in which the application will run, for example, `us-west-2`. 
  - `shard` - Name of a subgroup of hosts within a cluster that serve as a partition or replica, for example, `secondary`.

  ![tracing service filter](images/tracing_service_filter_page.png)

Application tags and their values are encapsulated in an `ApplicationTags` object in your microservice's code.
Because the tags describe the application's architecture as it is deployed, your code typically obtains values for the tags from a configuration file, either through the [quickstart setup steps](#option-1-quickstart), or through a custom mechanism implemented by your application.

**Note:** You can use an `ApplicationTags` object to store any additional custom tags that you want to associate with reported metrics or trace data.
<!---
**Note:** For details, see _[[link to tagging topic on another page]]_.
--->

### WavefrontSender

Part of instrumenting an application is to choose and set up a mechanism for sending metrics and trace data to the Wavefront service, as described in [Step 1](step-1-prepare-to-send-data-to-wavefront) above. 

Your choice is represented in your microservice's code as an object of type `WavefrontSender`. This object encapsulates the settings you supply when you instrument your microservice, either through the [quickstart setup steps](#option-1-quickstart) or the [custom setup steps](#option-2-custom-setup). These settings must match the information you provided in [Step 1](step-1-prepare-to-send-data-to-wavefront) above. 

**Note:** The [custom setup steps](#option-2-custom-setup) enable you to tune performance by setting the frequency for flushing data to the Wavefront proxy or the Wavefront service. If you are using direct ingestion, you can optionally change the defaults for batching up the data to be sent. 

<!--- change links when proxy/dir ing decision is in a single section --->

### Wavefront Reporters

Wavefront uses one or more Reporter objects to gather metrics and histograms and forward that data to the `WavefrontSender`. Different Wavefront Reporters gather data from different components of your application. For example, a `WavefrontJvmReporter` reports runtime data obtained from the JVM.

A Wavefront Reporter specifies: 
* The reporting interval for metrics and histograms. The reporting interval controls how often data is reported to the `WavefrontSender` and therefore determines the timestamps of data points sent to Wavefront. The default reporting interval is once a minute.

* The source of the reported metrics and histograms. By default, the source is automatically the host that the code is running on. You can specify a more meaningful name explicitly during setup. All Reporters for a particular microservice should specify the same source.

**Note:** The [custom setup steps](#option-2-custom-setup) enable you to set a nondefault reporting interval.

<!---
**Note:** For guidelines, see _[[link to reporting interval topic on another page]]_.
--->

### WavefrontTracer and WavefrontSpanReporter

Wavefront uses a pair of objects create and report trace data: 

* A `WavefrontTracer` creates spans and traces. 
* A `WavefrontSpanReporter` forwards the trace data to the `WavefrontSender`. 
 
Whereas metric data reporting occurs at the interval you specify, trace data reporting occurs automatically whenever spans are complete. 

**Note:** The [custom setup steps](#option-2-custom-setup) enable you to set up a reporter that sends trace data to your console for debugging, too.

<!---
### Instrumenting Multiple Frameworks in the Same Service 

If you are instrumenting multiple frameworks that are used in the same service, bear in mind: 

* You create a single Wavefront sender object object per process. Your code should instantiate each object once, and then re-use these objects as needed in the setup steps for each framework you are instrumenting.
* Each instrumented framework should have its own application-tags object.
* Each instrumented framework should have its own Wavefront reporter (or Wavefront span reporter) object. 
--->
<!--- 
## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
2. Mention passing tracing context around?
--->
