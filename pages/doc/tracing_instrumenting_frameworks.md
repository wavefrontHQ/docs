---
title: Instrumenting Your App for Tracing
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_instrumenting_frameworks.html
summary: Learn how to set up your application to send trace data to Wavefront.
---

One of the ways to start the flow of traces into Wavefront is to instrument your application. Instrumentation enables you to trace a transaction flow from end to end across multiple distributed services, guided by key metrics from your application. By displaying a transaction as a _trace_ that consists of a hierarchy of _spans_, you can pinpoint where the transaction is spending most of its time, and discover where it might be failing.

This page shows you the fast track to producing out-of-the-box metrics and trace data from popular application frameworks. 
* For information about instrumenting your application to send custom traces and metrics. _[[Link to SDK page for custom tracing and metrics ]]_
* For an introduction to distributed tracing in Wavefront, see [Distributed Tracing Basics](tracing_basics.html).


## Sample Setup

Watch this video to see how to set up a sample application to send out-of-the-box metrics and traces. (You can read about the steps [below](#setup-process).)

_[[video that describes how to set up BeachShirts app]]_

## Setup Process 

You get the exact setup steps by [picking a programming language and framework](#pick-a-language-and-framework-to-instrument) below, and clicking on the link. 

In all cases, you will:
 
1. Add dependencies in the build system of your choice, such as Maven. 

2. Edit your code to instantiate a few helper objects. These objects:
  * [Describe your application to Wavefront](#describing-your-application-to-wavefront). 
  * [Specify how to send data](#configuring-how-to-send-data-to-wavefront) -- through a Wavefront proxy or directly to the Wavefront service.
  * [Configure how metrics and histograms are reported](#configuring-metric-data-reporting). 
  * [Arrange for trace data to be created and reported](#arranging-for-trace-data-to-be-reported).

3. Configure and start a Wavefront proxy if you are using one. _[[Link to table of proxy config properties, and steps for starting proxy ]]_

After your application starts running, you can click **Applications** in the Wavefront menu bar to start exploring your metrics and traces.


## Pick a Language and Framework to Instrument 

Pick the language and framework used by the service you want to instrument. Click on the link to go to the detailed setup steps. You'll also see examples of metrics that will be reported.

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
<td>Instruments Jersey-compliant frameworks, such as Dropwizard and Spring Boot. Enables HTTP operations to send telemetry data to Wavefront.</td></tr>
<tr><td markdown="span">[gRPC](https://github.com/wavefrontHQ/wavefront-grpc-sdk-java)</td>
<td>Instruments all gRPC APIs to send telemetry data to Wavefront.</td></tr>
<tr><td markdown="span">[JVM](https://github.com/wavefrontHQ/wavefront-appagent-sdk-jvm)</td>
<td>Instruments Java Virtual Machine calls to send metrics and histograms to Wavefront. Measures CPU, disk usage, and so on.</td></tr>
</tbody>
</table>

<!--- 
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
--->

**Note:** If you do not use any of the frameworks in this table, you can instead instrument your application with [Wavefront's OpenTracing SDK for Java](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java).

## Describing Your Application to Wavefront

Part of instrumenting an application framework is to specify values for a few tags that describe the architecture of your application as it is deployed. These tags (called _application metadata_) will be associated with the predefined metrics and trace data sent from each operation that uses an API from the instrumented framework. Wavefront uses these tags to aggregate and filter the metrics and traces at different levels of granularity.

In your application, you instantiate an _application-tags_ object that will store your values for the metadata tags.
Because the metadata tags describe the application's architecture as it is deployed, you typically implement a mechanism for obtaining tag values from a configuration file, which you then update for each deployed application instance.

For each microservice that uses an instrumented framework, you specify the following required tags:
* `application` - Name that identifies the application. If the application is composed of coordinated microservices, all of those microservices should share the same application name.
* `service` - Name that identifies the microservice. Each microservice should have its own service name.

If the physical topology of your application will be useful for filtering metrics, you can specify the following optional tags:
* `cluster` - Name of a group of related hosts that serves as a cluster or region in which the application will run. 
* `shard` - Name of a subgroup of hosts within a cluster that serve as a partition or replica.

**Note:** For details, see _[[link to tagging topic on another page]]_.

## Configuring How to Send Metric Data to Wavefront

Part of instrumenting an application framework is to specify how you want metrics and spans to be sent to Wavefront. The recommended way in most cases is to send data to a Wavefront proxy, which in turn forwards the data to the Wavefront service. An alternative is for your applications to send data directly to the Wavefront service.

* If you choose to use a proxy, you will need to specify the proxy host, and the ports it listens to for metrics, histograms, and trace data. 
* If you choose direct ingestion, you can optionally change the defaults for batching up the data to be sent. 

In either case, you can optionally tune performance by setting the frequency for flushing data to the Wavefront proxy or the Wavefront service.

In your application, you instantiate a _Wavefront sender_ object that will store your ingestion choices.
To make it easy to reconfigure the sender at runtime, you typically implement a mechanism for obtaining values from a configuration file.


**Note:** For details, see _[[link to proxy vs direct ingest topic on another page]]_.

## Configuring Metric Data Reporting
<!--- Mention source here? --->

Part of instrumenting an application framework for metrics and histograms is to specify a reporting interval, which determines the timestamps of data points sent to Wavefront. The default reporting interval is once a minute. (The reporting interval controls how often data is reported to the Wavefront sender.) 

Another aspect of reporting is to identify the source of the metrics and histograms. By default, the source will be automatically set to the name of the host that the code is running on. You can optionally specify a more meaningful name explicitly.
 
In your application, you instantiate a _Wavefront reporter_ object that will store your reporting interval and optional source.
To make it easy to reconfigure the reporter at runtime, you normally implement and use a mechanism for obtaining values from a configuration file.

**Note:** For guidelines, see _[[link to reporting interval topic on another page]]_.

## Arranging for Trace Data to be Reported

Part of instrumenting an application framework for tracing is to set up the mechanism for creating and reporting trace data. 

In your application, you instantiate:
* A _Wavefront span reporter_ object that will forward trace data to a Wavefront sender. (You can optionally configure the reporter to send trace data to your console for debugging, too.)
* A _Wavefront tracer_ object that will create spans and traces, and hand the trace data off to the Wavefront span reporter. 

Whereas metric data reporting occurs at the interval you specify, trace data reporting occurs automatically whenever spans are complete. 


## Instrumenting Multiple Frameworks in the Same Service 

If you are instrumenting multiple frameworks that are used in the same service, bear in mind: 

* You create a single application-tags object and a single Wavefront sender object object per process. Your code should instantiate each object once, and then re-use these objects as needed in the setup steps for each framework you are instrumenting.
* Each framework uses its own Wavefront reporter (or Wavefront span reporter) object. 

<!--- 
## Questions for Reviewers

1. Mention configuring sampling rate on this page? Proxy or SDK or both?
--->
