---
title: Architecture of an Instrumented Microservice
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: opentracing_sdk_architecture.html
summary: Set up your application to send metrics, histograms, and trace data to Wavefront.
---

When an application consists of multiple microservices, you instrument each microservice separately by setting up one or more Wavefront SDKs. Doing so causes several helper objects to be created in the instrumented microservice. These helper objects work together to create and send metrics, histograms, and trace data to Wavefront.

The details of creating the helper objects for an SDK are in the setup steps for that SDK's `README` file:
* In some cases, you edit a configuration file, and Wavefront instantiates the helper object.
* In other cases, you instantiate the helper object directly in your code.

The following diagram shows the Wavefront helper objects in a Java microservice that uses Spring Boot to implement RESTful operations to other services:

![sdk objects](images/sdk_objects.png)

The actual helper objects in a microservice depends on the SDKs you set up. A typical set of helper objects includes some or all of the following:

* An [ApplicationTags](#application-tags) object that describes your application to Wavefront.
* [WavefrontTracer and WavefrontSpanReporter](#wavefronttracer-and-wavefrontspanreporter) objects that create and propagate trace data.
* One or more framework-specific objects that collect metrics and histograms. (In the diagram, these are the Java `WavefrontJerseyFilter` and `WavefrontJaxrsClientFilter` objects).
* Several different kinds of [WavefrontReporter objects](#wavefront-reporters) that specify how metrics and histograms are reported.
* A [WavefrontSender](#wavefront-sender) that sends data through a Wavefront proxy or directly to the Wavefront service.

{% include note.html content="When you use multiple Wavefront SDKs to instrument a microservice, certain helper objects belong to exactly one SDK, and other helper objects are shared."%}

<!---
Passing contexts between operations for trace data.
--->

## Application Tags

Wavefront requires tags that describe the structure of your application. These application tags are associated with the metrics and trace data that the instrumented microservices in your application send to Wavefront.

Application tags and their values are encapsulated in an `ApplicationTags` object in your microservice's code. You specify a separate `ApplicationTags` object, with a separate set of tag values, for each microservice you instrument. The tags include information about the way your application is structured and deployed, so your code normally obtains tag values from a configuration file at runtime. The configuration file might be provided by the Wavefront SDK, or it might be part of a custom configuration mechanism that is implemented by your application. (Only SDKs with quickstart setup steps provide a configuration file.)

{% include note.html content="You can use an `ApplicationTags` object to store any additional custom tags that you want to associate with reported metrics or trace data." %}

### How Wavefront Uses Application Tags

Wavefront uses application tags to aggregate and filter data at different levels of granularity.

* **Required tags** enable you to drill down into the data for a particular service:
    - `application` - Name that identifies the application, for example, `beachshirts`. All microservices in the same application should use the same `application` name.
    - `service` - Name that identifies the microservice, for example, `shopping`. Each microservice should have its own `service` name.

  ![tracing app services](images/tracing_app_services_page.png)


* **Optional tags** enable you to use the physical topology of your application to further filter your data:
  - `cluster` - Name of a group of related hosts that serves as a cluster or region in which the application will run, for example, `us-west`.
  - `shard` - Name of a mirror or other subgroup of hosts within a cluster, for example, `primary`.

  ![tracing service filter](images/tracing_service_filter_page.png)

## Span Logs

The OpenTracing standard supports [span logs](https://opentracing.io/docs/overview/spans/#logs). You can use a Wavefront SDK to instrument your application to include span log information.

{% include note.html content="Span logs are disabled by default and require Wavefront proxy version 5.0 or later. Contact [support@wavefront.com](mailto:support@wavefront.com) to enable the feature." %}

You can instrument your application to emit one or more logs with a span, and examine the logs from the Tracing UI. For details on how to add a `log()` method for a specific SDK, see the OpenTracing SDK.

Here's an example that adds span logs to [the best practices example](tracing_best_practices.html#best-practices-for-wavefront-observability-sdks-3) to emit a span log in case of an exception:

![span log example](images/span_log_example.png)

Span logs are especially useful for recording additional information about errors within the span.

<!---
**Note:** For details, see _[[link to tagging topic on another page]]_.
--->

## Helper Objects That Collect and Transfer Data

### Wavefront Sender

When you instrument an application, you set up a mechanism for sending metrics and trace data to the Wavefront service, as described in [Step 1, Prepare to Send Metrics to Wavefront,](#step-1-prepare-to-send-data-to-wavefront) above. Choose between:

* Sending data directly to the Wavefront service, also called [direct ingestion](direct_ingestion.html).
* Sending data to a [Wavefront proxy](proxies.html), which then forwards the data to the Wavefront service.

Your choice is represented in your code as Wavefront Sender object.
(Most Wavefront SDKs define objects of type `WavefrontSender` or simply `Sender`. A few SDKs define a pair of separate `Client` objects.) A Wavefront sender encapsulates the settings you supply when you instrument your microservice. The settings in your code must match the information you provided in [Step 1](#step-1-prepare-to-send-data-to-wavefront) above.

{% include note.html content="You can use a Wavefront sender to tune performance by setting the frequency for flushing data to the Wavefront proxy or the Wavefront service. If you are using direct ingestion, you can also change the defaults for batching up the data to be sent." %}

<!--- change links when proxy/dir ing decision is in a single section --->

### WavefrontTracer and WavefrontSpanReporter

Wavefront uses a pair of objects to create and report trace data:

* A `WavefrontTracer` creates spans and traces.
* A `WavefrontSpanReporter` forwards the trace data to the Wavefront sender.

A `WavefrontSpanReporter` specifies the source of the reported trace data -- by default, the host that the code is running on. You can optionally specify a more useful source name explicitly during setup, for example, an IP address, a container or instance name, or some other unique data source. All reporter objects for a particular microservice must specify the same source.

Trace data is reported automatically whenever spans are complete, so a `WavefrontSpanReporter` does not specify a reporting interval.

{% include note.html content="If you need to debug issues with spans, you can set up a `CompositeReporter` to combine a `WavefrontSpanReporter` with a `ConsoleReporter`. A `ConsoleReporter` sends trace data to your console." %}

### Wavefront Metrics Reporter Objects

Wavefront uses one or more reporter objects to gather metrics and histograms and forward that data to the Wavefront sender. Different Wavefront reporter objects gather data from different components of your application. For example, a `WavefrontJvmReporter` reports runtime data from the JVM.

A Wavefront reporter object specifies:
* The reporting interval for metrics and histograms. The reporting interval controls how often data is reported to the Wavefront sender and therefore determines the timestamps of data points sent to Wavefront. The default reporting interval is once a minute.

* The source of the reported metrics and histograms -- by default, the host that the code is running on. You can optionally specify a more useful source name explicitly during setup, for example, an IP address, a container or instance name, or some other unique data source. All reporter objects for a particular microservice must specify the same source.

{% include note.html content="You can use a Wavefront reporter object to set a nondefault reporting interval." %}

<!---
**Note:** For guidelines on choosing a reporting interval, see _[[link to reporting interval topic on another page]]_.
--->

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
