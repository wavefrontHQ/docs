---
title: Instrumenting Your App for Tracing - Draft2
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_instrumenting_frameworks.html
summary: Learn how to set up your application to send metrics, histograms, and trace data to Wavefront.
---

One of the ways to start the flow of traces into Wavefront is to instrument your application. Instrumentation enables you to trace a transaction flow from end to end across multiple distributed services, guided by key metrics from your application. By displaying a transaction as a _trace_ that consists of a hierarchy of _spans_, you can pinpoint where the transaction is spending most of its time, and discover where it might be failing.

When an application consists of multiple microservices, you instrument each microservice separately with one or more Wavefront SDKs. You choose these SDKs based on:
* The frameworks (components) you use in the microservice
* The kind of data you want to collect (metrics, histograms, trace data, or all 3) 
* Whether you want to collect out-of-the-box metrics, custom metrics, or both

This page shows you the fast track to producing out-of-the-box metrics and trace data from the application frameworks you use in your microservices. These frameworks are listed [below](#pick-a-language-and-framework-to-instrument), along with links to detailed setup steps.

<!---
* For information about instrumenting your application to send custom traces and metrics. _[[Link to SDK page for custom tracing and metrics ]]_
* For an introduction to distributed tracing in Wavefront, see [Distributed Tracing Basics](tracing_basics.html).
--->

## Sample Setup

Watch this video to see how to set up a sample application to send out-of-the-box metrics and traces. (You can read about the steps [below](#quickstart).)

_[[video that describes how to set up BeachShirts app]]_

## Quickstart  

The quickstart steps use configuration files and a minimal code changes to specify what you need to start metrics, histograms, and trace data flowing to Wavefront: 

1. Choose how you want to send metric and trace data to Wavefront: by proxy or by direct ingestion.
  * If you are using a Wavefront proxy, [install it](proxies_installing.html) if necessary and configure its ports. 
2. Click on the link that describes your application, and follow the Quickstart steps: 
  * [Java Dropwizard Jersey application](tracing_instrumenting_jersey_dw.html)
  * Java Spring Boot application
3. After your application starts running, you can click **Browse > Applications** in the Wavefront menu bar to start exploring your metrics and traces.

For a general overview of the kinds of the objects Step 2 will add to your application, click [here](#a-closer-look-at-an-instrumented-microservice).


## Advanced Setup  

The steps for advanced setup provide complete control over all configurable aspects of instrumenting application frameworks. These steps involve editing your code to instantiate several helper objects.

1. Choose how you want to send metric and trace data to Wavefront: by proxy or by direct ingestion.
  * If you are using a Wavefront proxy, [install it](proxies_installing.html) if necessary, and configure its ports. 
2. For each microservice in your application: 
  * [Pick one or more frameworks](#pick-a-language-and-framework-to-instrument) you want to instrument, and click the link(s).
  * Follow the setup steps in the `README` file(s).

For a general overview of the kinds of the objects Step 2 will add to your application, click [here](#a-closer-look-at-an-instrumented-microservice).

## Pick a Language and Framework to Instrument 

Pick the language and frameworks used by the service you want to instrument. For each framework, click on the link to go to the detailed setup steps. You'll also see examples of metrics that will be reported.

<table width="100%">
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
<td>JVM</td>
<td markdown="span">[`wavefront-appagent-sdk-jvm`](https://github.com/wavefrontHQ/wavefront-appagent-sdk-jvm)</td>
<td>Instrument Java Virtual Machine calls to send metrics and histograms to Wavefront. Measure CPU, disk usage, and so on.</td></tr>

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

Instrumenting an application means instrumenting its individual microservices. For each microservice, you will edit some combination of configuration files and code files to create several helper objects that work together to create and send metrics, histograms, and trace data to Wavefront. These objects include:

  * An [ApplicationTags](#describing-your-application-to-wavefront) object for describing your application to Wavefront. 
  * A [WavefrontSender](#configuring-how-to-send-data-to-wavefront) for specifying whether to send data through a Wavefront proxy or directly to the Wavefront service.
  * Several different kinds of [Wavefront-Reporter objects](#configuring-metric-data-reporting) for configuring how metrics, histograms, and traces are reported to the WavefrontSender.
  * A [WavefrontTracer](#arranging-for-trace-data-to-be-reported) object for creating and propagating trace data.
  * One or more framework-specific objects (such as a Java WavefrontJerseyFilter) for collecting metrics and histograms.


Here is an overview of these objects in a Java service that uses Spring Boot and the JVM to implement RESTful operations to other services.

![sdk objects](images/sdk_objects.png)

<!---
Passing contexts between oprations for trace data.
--->

### Describing Your Application to Wavefront

Part of instrumenting an application framework is to specify values for a few tags that describe the architecture of your application as it is deployed. These tags (called _application metadata_) will be associated with the predefined metrics and trace data sent from each operation that uses an API from the instrumented framework. Wavefront uses these tags to aggregate and filter the metrics and traces at different levels of granularity.

In your application, you instantiate an _application-tags_ object that will store your values for the metadata tags.
Because the metadata tags describe the application's architecture as it is deployed, you typically implement a mechanism for obtaining tag values from a configuration file, which you then update for each deployed application instance.

For each microservice that uses an instrumented framework, you specify the following required tags:
* `application` - Name that identifies the application. If the application is composed of coordinated microservices, all of those microservices should share the same application name.
* `service` - Name that identifies the microservice. Each microservice should have its own service name.

If the physical topology of your application will be useful for filtering metrics, you can specify the following optional tags:
* `cluster` - Name of a group of related hosts that serves as a cluster or region in which the application will run. 
* `shard` - Name of a subgroup of hosts within a cluster that serve as a partition or replica.

<!---
**Note:** For details, see _[[link to tagging topic on another page]]_.
--->

### Configuring How to Send Data to Wavefront

Part of instrumenting an application framework is to specify how you want metrics and spans to be sent to Wavefront. The recommended way in most cases is to send data to a Wavefront proxy, which in turn forwards the data to the Wavefront service. An alternative is for your applications to send data directly to the Wavefront service.

* If you choose to use a proxy, you will need to specify the proxy host, and the ports it listens to for metrics, histograms, and trace data. 
* If you choose direct ingestion, you can optionally change the defaults for batching up the data to be sent. 

In either case, you can optionally tune performance by setting the frequency for flushing data to the Wavefront proxy or the Wavefront service.

In your application, you instantiate a _Wavefront sender_ object that will store your ingestion choices.
To make it easy to reconfigure the sender at runtime, you typically implement a mechanism for obtaining values from a configuration file.

<!--- change links when proxy/dir ing decision is in a single section --->
**Note:** For information about the choices for sending data to Wavefront, see [Proxies](proxies.html) and  [Direct Ingestion](direct_ingestion.html).

### Configuring Metric Data Reporting
<!--- Mention source here? --->

Part of instrumenting an application framework for metrics and histograms is to specify a reporting interval, which determines the timestamps of data points sent to Wavefront. The default reporting interval is once a minute. (The reporting interval controls how often data is reported to the Wavefront sender.) 

Another aspect of reporting is to identify the source of the metrics and histograms. By default, the source will be automatically set to the name of the host that the code is running on. You can optionally specify a more meaningful name explicitly.
 
In your application, you instantiate a _Wavefront reporter_ object that will store your reporting interval and optional source.
To make it easy to reconfigure the reporter at runtime, you normally implement and use a mechanism for obtaining values from a configuration file.

<!---
**Note:** For guidelines, see _[[link to reporting interval topic on another page]]_.
--->

### Arranging for Trace Data to be Reported

Part of instrumenting an application framework for tracing is to set up the mechanism for creating and reporting trace data. 

In your application, you instantiate:
* A _Wavefront span reporter_ object that will forward trace data to a Wavefront sender. (You can optionally configure the reporter to send trace data to your console for debugging, too.)
* A _Wavefront tracer_ object that will create spans and traces, and hand the trace data off to the Wavefront span reporter. 

Whereas metric data reporting occurs at the interval you specify, trace data reporting occurs automatically whenever spans are complete. 


### Instrumenting Multiple Frameworks in the Same Service 

If you are instrumenting multiple frameworks that are used in the same service, bear in mind: 

* You create a single Wavefront sender object object per process. Your code should instantiate each object once, and then re-use these objects as needed in the setup steps for each framework you are instrumenting.
* Each instrumented framework should have its own application-tags object.
* Each instrumented framework should have its own Wavefront reporter (or Wavefront span reporter) object. 

<!--- 
## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
--->
