---
title: Instrumenting Your App for Tracing
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_instrumenting_frameworks.html
summary: Learn how to set up your application to send metrics, histograms, and trace data to Wavefront.
---

You instrument your application so that [trace data](tracing_basics.html) from different parts of the stack can be sent to Wavefront. Instrumentation enables you to trace a request from end to end across multiple distributed services, guided by key metrics from your application. 

After instrumentation, you can use our [tracing UI](tracing_ui_overview.html) to visualize a request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time, and discover problems.

You instrument each microservice in your application with one or more [Wavefront observability SDKs](wavefront_sdks.html). You choose these SDKs based on:
* The frameworks (components) you use in the microservice -- for example, Dropwizard
* The kind of data you want to collect -- metrics, histograms, trace data, or all 3 
* Whether you want to collect out-of-the-box metrics and trace data, custom business metrics and trace data, or both

This page helps you choose the SDK(s), and directs you to the setup steps for each SDK. For an overview of what instrumentation adds to your microservices, see [A Closer Look at an Instrumented Microservice](#a-closer-look-at-an-instrumented-microservice), below.

<!---
* For information about instrumenting your application to send custom traces and metrics. _[[Link to SDK page for custom tracing and metrics ]]_
* For information about ingesting trace data from an application that has been instrumented with a 3rd party distributed system such as Jaeger, see XX.
--->

<!---
## Sample Setup

Watch this video to see how to set up a sample application to send out-of-the-box metrics and traces. (You can read about the steps [below](#quickstart).)

_[[video that describes how to set up BeachShirts app]]_
--->

## Step 1. Prepare to Send Data to Wavefront

**Choose** one of the following ways to send metrics, histograms, and trace data from your application to the Wavefront service:
* The simplest way is to use direct ingestion to send data directly to the Wavefront service. This gets you up and running with minimal preparation.  
* For large-scale deployments, you'll need a Wavefront proxy to forward data from your application to the Wavefront service. Using a proxy provides resilience to internet outages, control over data queuing and filtering, and more. 

**To prepare for direct ingestion:** 

1. Identify the URL of your Wavefront instance. This is the URL you connect to when you log in to Wavefront, typically something like `https://virunga.wavefront.com`.
2. [Obtain an API token](wavefront_api.html#generating-an-api-token).

**To prepare a Wavefront proxy:** 

1. On the host that will run the proxy, [install the proxy](proxies_installing.html#proxy-installation). If you already have a proxy installed, you may need to upgrade it. You need Version 4.36 or later. 
2. On the proxy host, open the proxy configuration file `wavefront.conf` for editing. The [path to the file](proxies_configuring.html#paths) depends on the host OS. 
3. In the `wavefront.conf` file, find and uncomment the [listener-port property](proxies_installing.html#configuring-listener-ports-for-metrics-histograms-and-traces) for each listener port you want to enable. The following example enables the default/recommended listener ports for metrics, histogram distributions, and trace data:
    ```
    pushListenerPorts=2878
    ...
    histogramDistListenerPorts=40000
    ...
    traceListenerPorts=30000
    ```
4. Consider setting up [trace sampling](trace_data_sampling.html) by [configuring the proxy with a sampling strategy](trace_data_sampling.html#setting-up-sampling-through-the-proxy).
5. Save the `wavefront.conf` file. 
6. [Start the proxy](proxies_installing.html#starting-and-stopping-a-proxy).




## Step 2. Instrument Your Application

Identify the microservices in your application and the components you use in each microservice. Then choose the setup option that best fits your use case. 

### Option 1. Quickstart - Use Config Files 

Use Option 1 to instrument a cloud-native Java application with RESTful microservices that are built using one of the following Jersey-compliant frameworks: 
* **Dropwizard** 
* **Spring Boot**

These steps use configuration files and minimal code changes: 

1. [Prepare to send data to Wavefront](#step-1-prepare-to-send-data-to-wavefront). 
2. For each microservice that is built using Dropwizard or Spring Boot, follow the [quickstart steps](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java#quickstart) in the `README` file for the SDK.  

    For an overview of what these steps automatically add to your microservice, see [A Closer Look at an Instrumented Microservice](#a-closer-look-at-an-instrumented-microservice), below.
3. After your recompiled application starts running, click **Applications > Inventory** in the task bar to start [exploring the metrics, histograms, and trace data](tracing_ui_overview.html) that are sent from the framework's operations and from the JVM that runs them.


### Option 2. Custom Setup - Instantiate Helper Objects Directly

Use a custom setup:
* For any microservice that is not based on a framework listed for [Option 1](#option-1-quickstart---use-config-files). 
* For instrumenting critical business methods that are not handled by any instrumented framework. 
* For control over every configurable feature, such as tuning [the data reporting interval](#wavefront-reporters).

These steps involve instantiating [helper objects](#a-closer-look-at-an-instrumented-microservice) directly in your code:

1. [Prepare to send data to Wavefront](#step-1-prepare-to-send-data-to-wavefront). 

2. For each microservice in your application: 

    1. Choose the Wavefront observability SDK you want to set up, and click the link to its `README` file. The SDKs are listed by programming language:
          
          | [Java SDKs](#java-observability-sdks) |  
          | [C# SDKs](#netc-observability-sdks) |
          | [Python SDKs](#python-observability-sdks) | 
          | [Go SDKs](#go-observability-sdks) | 


    3. Follow the setup steps in the `README` file. If a `README` file offers Custom Setup steps, choose those. 
    4. Repeat for each instrumentable framework or component in the microservice. 

3. After your recompiled application starts running, you can click **Applications > Inventory** in the task bar to start exploring metrics, histograms, and trace data.

**Note:** When you use the custom setup option for an SDK, no other SDK is set up automatically for you. If you want to add multiple SDKs to a microservice, you must set up each one individually.

## Java Observability SDKs

Wavefront supports observability SDKs for collecting metrics, histograms, and trace data from the microservices in a Java application. For each SDK, click on the link to see the detailed setup steps. 

**Note:** Be sure to use the latest version of the SDK on Github.

### Instrument Java Frameworks 

Each SDK collects metrics, histograms, and trace data from a particular Java framework. Setup consists of configuring and instantiating several helper objects in your microservice. No other code changes are needed.

These SDKs automatically collect metric data for request rates, error rates, latencies, payload sizes, and so on. Click on the link for an SDK to find a list of these predefined metrics and histograms.

<table id = "sdks" width="100%">
<colgroup>
<col width="22%" />
<col width="32%" />
<col width="45%" />
</colgroup>
<tbody>
<thead>
<tr><th>To Collect Data From This Framework</th><th>Set Up This Wavefront SDK</th><th>Description</th></tr>
</thead>

<tr>
<td>Dropwizard</td>
<td markdown="span">[`wavefront-jersey-sdk-java`](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java) <br> [`wavefront-dropwizard-sdk-java`](https://github.com/wavefrontHQ/wavefront-dropwizard-sdk-java)</td>
<td>Instruments Dropwizard, a Jersey-compliant framework for building RESTful Web services. Sends metrics, histograms and trace data from HTTP requests and responses.</td></tr>

<tr>
<td>gRPC</td>
<td markdown="span">[`wavefront-grpc-sdk-java`](https://github.com/wavefrontHQ/wavefront-gRPC-sdk-java)</td>
<td>Instruments gRPC, a framework for building services that communicate through remote procedure calls. Sends metrics, histograms and trace data from gRPC requests and responses.</td></tr>

<tr>
<td>JAX-RS implementation</td>
<td markdown="span">[`wavefront-jaxrs-sdk-java`](https://github.com/wavefrontHQ/wavefront-jaxrs-sdk-java)</td>
<td>Instruments a JAX-RS (JSR 311: The Java API for RESTful Web Services) implementation for building RESTful Web services. Sends metrics, histograms and trace data from HTTP requests and responses.</td></tr>

<tr>
<td>Spring Boot</td>
<td markdown="span">[`wavefront-jersey-sdk-java`](https://github.com/wavefrontHQ/wavefront-jersey-sdk-java)</td>
<td>Instruments Spring Boot, a Jersey-compliant framework for building RESTful Web services. Sends metrics, histograms and trace data from HTTP requests and responses.</td></tr>

</tbody>
</table>

### General Java Instrumentation

Each SDK enables you to instrument critical business methods that are not handled by any instrumented framework.

Setup consists of configuring and instantiating several helper objects in your microservice, defining the particular types of data to be collected, and augmenting individual business methods with SDK operations.

<table id = "sdks" width="100%">
<colgroup>
<col width="25%" />
<col width="35%" />
<col width="40%" />
</colgroup>
<tbody>
<thead>
<tr><th>To Collect This Type of Data</th><th>Use This Wavefront SDK</th><th>Description</th></tr>
</thead>
<tr>
<td>Metrics and histograms</td>
<td markdown="span">[wavefront-dropwizard-metrics-sdk-java](https://github.com/wavefrontHQ/wavefront-dropwizard-metrics-sdk-java)</td>
<td>Implements Dropwizard Metrics, so you can instrument your application code to send custom business metrics and histograms to Wavefront. </td></tr>

<tr>
<td>Trace data</td>
<td markdown="span">[wavefront-opentracing-sdk-java](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java)</td>
<td>Implements OpenTracing, so you can instrument your application code to send custom traces and spans to Wavefront. </td></tr>

<tr>
<td>JVM metrics</td>
<td markdown="span">[`wavefront-runtime-sdk-jvm`](https://github.com/wavefrontHQ/wavefront-runtime-sdk-jvm)</td>
<td>Instruments the Java Virtual Machine to send runtime metrics and histograms to Wavefront. Sends metrics and histograms for CPU usage, disk usage, and so on.</td></tr>

</tbody>
</table>


## .NET/C# Observability SDKs

Wavefront supports  the available Wavefront observability SDKs for collecting metrics, histograms, and trace data from the microservices in a .NET/C# application. For each SDK, click on the link to see the detailed setup steps. 

**Note:** Be sure to use the latest version of the SDK on Github.

### General .NET/C# Instrumentation 

Each SDK enables you to instrument critical business methods that are not handled by any instrumented framework.

Setup consists of configuring and instantiating several helper objects in your microservice, defining the particular types of data to be collected, and augmenting individual business methods with SDK operations.

<table id = "sdks" width="100%">
<colgroup>
<col width="25%" />
<col width="30%" />
<col width="45%" />
</colgroup>
<tbody>
<thead>
<tr><th>To Collect This Type of Data</th><th>Use This Wavefront SDK</th><th>Description</th></tr>
</thead>
<tr>
<td>Metrics and histograms</td>
<td markdown="span">[wavefront-appmetrics-sdk-csharp](https://github.com/wavefrontHQ/wavefront-appmetrics-sdk-csharp)</td>
<td>Implements App Metrics, so you can instrument your application code to send custom metrics and histograms to Wavefront. </td></tr>

<tr>
<td>Trace data</td>
<td markdown="span">[wavefront-opentracing-sdk-csharp](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)</td>
<td>Implements OpenTracing, so you can instrument your application code to send custom traces and spans to Wavefront. </td></tr>
</tbody>
</table>

## Python Observability SDKs

Wavefront supports the available Wavefront observability SDKs for collecting metrics, histograms, and trace data from the microservices in a Python application. For each SDK, click on the link to see the detailed setup steps. 

**Note:** Be sure to use the latest version of the SDK on Github.

### General Python Instrumentation 

Each SDK enables you to instrument critical business methods that are not handled by any instrumented framework.

Setup consists of configuring and instantiating several helper objects in your microservice, defining the particular types of data to be collected, and augmenting individual business methods with SDK operations.

<table id = "sdks" width="100%">
<colgroup>
<col width="25%" />
<col width="30%" />
<col width="45%" />
</colgroup>
<tbody>
<thead>
<tr><th>To Collect This Type of Data</th><th>Use This Wavefront SDK</th><th>Description</th></tr>
</thead>
<!--- This is actually a plug in. Does it belong here?
<tr>
<td>Metrics and histograms</td>
<td markdown="span">[wavefront-pyformance](https://github.com/wavefrontHQ/wavefront-pyformance)</td>
<td>Implements PyFormance, so you can instrument your application code to send custom metrics and histograms to Wavefront. </td></tr>
--->
<tr>
<td>Trace data</td>
<td markdown="span">[wavefront-opentracing-sdk-python](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python)</td>
<td>Implements OpenTracing, so you can instrument your application code to send custom traces and spans to Wavefront. </td></tr>
</tbody>
</table>

## Go Observability SDKs

Wavefront supports the available Wavefront observability SDKs for collecting metrics, histograms, and trace data from the microservices in a Go application. For each SDK, click on the link to see the detailed setup steps. 

**Note:** Be sure to use the latest version of the SDK on Github.

### General Go Instrumentation 

Each SDK enables you to instrument critical business methods that are not handled by any instrumented framework.

Setup consists of configuring and instantiating several helper objects in your microservice, defining the particular types of data to be collected, and augmenting individual business methods with SDK operations.

<table id = "sdks" width="100%">
<colgroup>
<col width="25%" />
<col width="30%" />
<col width="45%" />
</colgroup>
<tbody>
<thead>
<tr><th>To Collect This Type of Data</th><th>Use This Wavefront SDK</th><th>Description</th></tr>
</thead>
<tr>
<td>Trace data</td>
<td markdown="span">[wavefront-opentracing-sdk-go](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)</td>
<td>Implements OpenTracing, so you can instrument your application code to send custom traces and spans to Wavefront. </td></tr>
</tbody>
</table>

## A Closer Look at an Instrumented Microservice

When an application consists of multiple microservices, you instrument each microservice separately by setting up one or more Wavefront SDKs. Doing so causes several helper objects to be created in the instrumented microservice. These helper objects work together to create and send metrics, histograms, and trace data to Wavefront.

The details of creating the helper objects for an SDK are in the setup steps for that SDK's `README` file: 
* In some cases, you edit a configuration file, and Wavefront instantiates the helper object.
* In other cases, you instantiate the helper object directly in your code.


The following diagram shows the Wavefront helper objects in a Java microservice that uses Spring Boot to implement RESTful operations to other services:

![sdk objects](images/sdk_objects.svg)

The actual set of helper objects in a particular microservice depends on which SDKs you set up. A typical set of helper objects includes some or all of the following:

* An [ApplicationTags](#application-tags) object that describes your application to Wavefront. 
* One or more framework-specific objects that collect metrics and histograms. (In the diagram, these are the Java `WavefrontJerseyFilter` and `WavefrontJaxrsClientFilter` objects).
* [WavefrontTracer and WavefrontSpanReporter](#wavefronttracer-and-wavefrontspanreporter) objects that create and propagate trace data.
* Several different kinds of [WavefrontReporter objects](#wavefront-reporters) that specify how metrics and histograms are reported.
* A [WavefrontSender](#wavefrontsender) that specifies whether to send data through a Wavefront proxy or directly to the Wavefront service.

**Note:** When you use multiple Wavefront SDKs to instrument a microservice, certain helper objects will belong to exactly one SDK, and other helper objects will be shared.

<!---
Passing contexts between operations for trace data.
--->

## Application Tags

Wavefront requires tags that describe the architecture of your application. These application tags are associated with the metrics and trace data that the instrumented microservices in your application send to Wavefront. 

Application tags and their values are encapsulated in an `ApplicationTags` object in your microservice's code. You specify a separate `ApplicationTags` object, with a separate set of tag values, for each microservice you instrument. Because the tags describe the application's architecture and the way it is deployed, your code typically obtains tag values from a configuration file, either through the [quickstart setup steps](#option-1-quickstart---use-config-files), or through a custom mechanism implemented by your application.

**Note:** You can use an `ApplicationTags` object to store any additional custom tags that you want to associate with reported metrics or trace data.

### How Wavefront Uses Application Tags

Wavefront uses application tags to aggregate and filter data at different levels of granularity.

* **Required tags** enable you to drill down into the data for a particular service:  
    - `application` - Name that identifies the application, for example, `beachshirts`. All microservices in the same application should use the same `application` name.
    - `service` - Name that identifies the microservice, for example, `delivery`. Each microservice should have its own `service` name.

  ![tracing app services](images/tracing_app_services_page.png)


* **Optional tags** enable you to use the physical topology of your application to further filter your data:
  - `cluster` - Name of a group of related hosts that serves as a cluster or region in which the application will run, for example, `us-west-2`. 
  - `shard` - Name of a subgroup of hosts within a cluster, for example, `secondary`.

  ![tracing service filter](images/tracing_service_filter_page.png)



<!---
**Note:** For details, see _[[link to tagging topic on another page]]_.
--->

## Helper Objects That Collect and Transfer Data



### WavefrontSender

Part of instrumenting an application is to choose and set up a mechanism for sending metrics and trace data to the Wavefront service, as described in [Step 1](#step-1-prepare-to-send-data-to-wavefront) above. You can choose between:

* Sending data directly to the Wavefront service, also called [direct ingestion](direct_ingestion.html).
* Sending data to a [Wavefront proxy](proxies.html), which then forwards the data to the Wavefront service. 

Your choice is represented in your microservice's code as an object of type `WavefrontSender`. This object encapsulates the settings you supply when you instrument your microservice, either through the [quickstart setup steps](#option-1-quickstart---use-config-files) or the [custom setup steps](#option-2-custom-setup---instantiate-helper-objects-directly). The settings in your microservice must match the information you provided in [Step 1](#step-1-prepare-to-send-data-to-wavefront) above. 

**Note:** The [custom setup steps](#option-2-custom-setup---instantiate-helper-objects-directly) enable you to tune performance by setting the frequency for flushing data to the Wavefront proxy or the Wavefront service. If you are using direct ingestion, you can optionally change the defaults for batching up the data to be sent. 

<!--- change links when proxy/dir ing decision is in a single section --->

### Wavefront Reporters

Wavefront uses one or more Reporter objects to gather metrics and histograms and forward that data to the `WavefrontSender`. Different Wavefront Reporters gather data from different components of your application. For example, a `WavefrontJvmReporter` reports runtime data obtained from the JVM.

A Wavefront Reporter specifies: 
* The reporting interval for metrics and histograms. The reporting interval controls how often data is reported to the `WavefrontSender` and therefore determines the timestamps of data points sent to Wavefront. The default reporting interval is once a minute.

* The source of the reported metrics and histograms, typically the host that the code is running on. You can specify a more meaningful name explicitly during setup. All Reporters for a particular microservice must specify the same source.

**Note:** The [custom setup steps](#option-2-custom-setup---instantiate-helper-objects-directly) enable you to set a nondefault reporting interval.

<!---
**Note:** For guidelines, see _[[link to reporting interval topic on another page]]_.
--->

### WavefrontTracer and WavefrontSpanReporter

Wavefront uses a pair of objects to create and report trace data: 

* A `WavefrontTracer` creates spans and traces. 
* A `WavefrontSpanReporter` forwards the trace data to the `WavefrontSender`. 
 
Whereas metric data reporting occurs at the interval you specify, trace data reporting occurs automatically whenever spans are complete. 

**Note:** The [custom setup steps](#option-2-custom-setup---instantiate-helper-objects-directly) enable you to set up a reporter that sends trace data to your console for debugging, too.

<!---
### Instrumenting Multiple Frameworks in the Same Service 

If you are instrumenting multiple frameworks that are used in the same service, bear in mind: 

* You create a single Wavefront sender object object per process. Your code  instantiate each object once, and then re-use these objects as needed in the setup steps for each framework you are instrumenting.
* Each instrumented framework  have its own application-tags object.
* Each instrumented framework  have its own Wavefront reporter (or Wavefront span reporter) object. 
--->
<!--- 
## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
2. Mention passing tracing context around?
--->
