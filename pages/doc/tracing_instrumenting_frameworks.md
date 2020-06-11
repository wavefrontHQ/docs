---
title: Instrumenting Your App for Tracing
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_instrumenting_frameworks.html
summary: Set up your application to send metrics, histograms, and trace data to Wavefront.
---

You instrument your application so that [trace data](tracing_basics.html) from different parts of the stack are sent to Wavefront. Instrumentation enables you to trace a request from end to end across multiple distributed services, guided by key metrics from your application. After instrumentation, you can use our [tracing UI](tracing_ui_overview.html) to visualize a request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time, and discover problems.

You instrument each microservice in your application with one or more [Wavefront observability SDKs](wavefront_sdks.html). This page:
* Helps you choose the SDK(s)
* Directs you to the setup steps for each SDK
* Provides [an overview of what instrumentation adds to your microservices](#a-closer-look-at-an-instrumented-microservice).

{% include note.html content="If you have already instrumented your application for tracing using Jaeger or Zipkin, you can set up a [Wavefront integration](tracing_integrations.html) to forward the trace data to Wavefront." %}

## Step 1. Prepare to Send Data to Wavefront

Choose one of the following ways to send metrics, histograms, and trace data from your application to the Wavefront service:
* **Direct Ingestion**. To get up and running quickly, use direct ingestion to send data directly to the Wavefront service.
* **Wavefront proxy**. For any production environment, we recommend a Wavefront proxy to forward data from your application to the Wavefront service. [Using a proxy](direct_ingestion.html#proxy-or-direct-ingestion) provides resilience to internet outages, control over data queuing and filtering, and more.

Watch [this video](https://youtu.be/Lrm8UuxrsqA) for some background on proxy vs. direct ingestion.

### To Prepare for Direct Ingestion

1. Identify the URL of your Wavefront instance. This is the URL you connect to when you log in to Wavefront, typically something like `https://mywavefront.wavefront.com`.
2. [Obtain an API token](wavefront_api.html#generating-an-api-token).


### To Prepare a Wavefront Proxy

1. On the host that will run the proxy, [install the proxy](proxies_installing.html#proxy-installation).  You need proxy version 4.36 or later. If you want to use span logs, you need proxy version 5.0 or later.
2. On the proxy host, open the proxy configuration file `wavefront.conf` for editing. The [path to the file](proxies_configuring.html#paths) depends on the host OS.
3. In the `wavefront.conf` file, find and uncomment the [listener-port property](proxies_installing.html#set-the-listener-port-for-metrics-histograms-and-traces) for each listener port you want to enable. The following example enables the default/recommended listener ports for metrics, histogram distributions, and trace data:
    ```
    pushListenerPorts=2878
    ...
    histogramDistListenerPorts=2878
    ...
    traceListenerPorts=30000
    ```
4. Consider setting up [trace sampling](trace_data_sampling.html) by [configuring the proxy with a sampling strategy](trace_data_sampling.html#setting-up-explicit-sampling-through-the-proxy).
5. Save the `wavefront.conf` file.
6. [Start the proxy](proxies_installing.html#starting-and-stopping-a-proxy).


## Step 2. Get Data Flowing into Wavefront

Wavefront provides SDKs that implement the [OpenTracing](https://opentracing.io) specification in many languages. You can use a Wavefront OpenTracing SDK to collect custom trace data that you define for your service, for example, to augment an auto-instrumented framework or to replace a 3rd party OpenTracing-compliant library.

{% include note.html content="If you can not find the SDK you were looking for, see all the [SDKs provided by Wavefront](wavefront_sdks.html#what-do-you-want-to-collect)." %}

{% include tip.html content="Wavefront can only retrieve up to 1000 spans for a given trace, and you only see up to 1000 spans when you [drill down into spans](tracing_ui_overview.html#drill-down-into-spans-and-view-metrics-and-span-logs) via the Tracing browser. Therefore, as a best practice and for optimal performance, configure your application to have less than 1000 spans in a trace." %}

### Instrument Your Application with OpenTracing SDKs

Choose the Wavefront OpenTracing SDK for your microservice's programming language, and click the link to go to its `README` file on GitHub:

<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java">
            <img src="/images/icons_svg_java.png" alt="Java logo">
            </a>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python">
            <img src="/images/icons_svg_phython.png" alt="Python">
            </a>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go">
            <img src="/images/icons_svg_go.png" alt="Go">
            </a>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
        <div class="panel panel-default text-center">
            <div class="panel-body">
               <a href="https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp">
               <img src="/images/icons_svg_.net.png" alt="Net">
               </a>
            </div>
        </div>
    </div>
  </div>

### Instrument Your OpenTracing Java Application Without Writing Code

If you need application observability, but don't want to instrument code for your Java microservices, use the [Wavefront Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java). For more information, see [this blog post on the Wavefront Java Tracing Agent](https://www.wavefront.com/wavefront-tracing-agent-for-java/).

<div class="row">
   <div class="col-md-3 col-sm-6">
       <div class="panel panel-default text-center">
           <div class="panel-body">
              <a href="https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java">
              <img src="/images/icons_svg_java_tracing_agent.png" alt="Java tracing agent">
              </a>
           </div>
       </div>
   </div>
 </div>

### Send Trace Data to Wavefront via Applications Integrated with Jaeger or Zipkin

  If you have already instrumented your application with Jaeger or Zipkin follow the steps given below :
  1. Collect traces send them to Wavefront using the following integrations.

      <div class="row">
       <div class="col-md-3 col-sm-6">
           <div class="panel panel-default text-center">
               <div class="panel-body">
                  <a href="jaeger.html">
                  <img src="/images/icons_svg_jaeger.png" alt="Jaeger" class="center">
                  </a>
               </div>
           </div>
       </div>
       <div class="col-md-3 col-sm-6">
           <div class="panel panel-default text-center">
               <div class="panel-body">
                  <a href="zipkin.html">
                  <img src="/images/icons_svg_zipkin.png" alt="Zipkin" class="center">
                  </a>
               </div>
           </div>
       </div>
     </div>
 2. Optionally, add custom tags, applications names, or use an alternative for the Jaeger or Zipkin integration. See [Using Jaeger or Zipkin with Wavefront](tracing_integrations.html) for details.

After your recompiled application starts running, start [exploring your custom trace data](tracing_ui_overview.html) and the [metrics and histograms that are automatically derived](trace_data_details.html#red-metrics-derived-from-spans) from your trace data.

### Instrument Your Application with Wavefront Sender SDKs

For maximum flexibility, you can use the Wavefront Sender SDKs. See [SDKs for Sending Raw Data to Wavefront](wavefront_sdks.html#sdks-for-sending-raw-data-to-wavefront) for background.

<div class="row">
 <div class="col-md-2 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-sdk-java">
            <img src="/images/icons_svg_java.png" alt="Java logo">
            </a>
         </div>
     </div>
 </div>
 <div class="col-md-2 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-sdk-python">
            <img src="/images/icons_svg_phython.png" alt="Python">
            </a>
         </div>
     </div>
 </div>
 <div class="col-md-2 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-sdk-go">
            <img src="/images/icons_svg_go.png" alt="Go">
            </a>
         </div>
     </div>
 </div>
 <div class="col-md-2 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-sdk-csharp">
            <img src="/images/icons_svg_.net.png" alt="Net">
            </a>
         </div>
     </div>
 </div> 
 <div class="col-md-2 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-body">
            <a href="https://github.com/wavefrontHQ/wavefront-sdk-cpp">
            <img src="/images/icons_cplus.png" alt="C++">
            </a>
         </div>
     </div>
 </div>
</div>

When you use a Sender SDK, you won’t see span-level RED metrics by default. This section explains how to send span-level RED metrics.

1. [Prepare to send data via the Wavefront proxy](#to-prepare-a-wavefront-proxy).
1. Configure your application to send data via the Wavefront Proxy. See the SDK’s README file for details.
1. Specify the port or a comma-separated list of ports that you want to send the trace data using the `customTracingListenerPorts` configuration on your [`<wavefront_config_path>`](proxies_configuring.html#paths)`/wavefront.conf` file. The default port is 30001.
  ```xml
  ## port for sending custom spans using the sender sdk
  customTracingListenerPorts=30001
  ```
1. When you configure the `wavefront sender` on your application as explained in the SDK’s README file, define the port you want to send the data so that span level RED metrics will be gathered from your application.
  <br/>Example: Configuring your Java application to send trace data via the `tracingPort`.
    ```java 
    // set up wavefront sender for Proxy based ingestion
    WavefrontSender wavefrontSender = new WavefrontClient.Builder(proxyHost).
            tracingPort(30001). // customTracingListenerPorts configured in your wavefront.conf file
            metricsPort(metricsPort).
            distributionPort(distributionPort).
            messageSizeBytes(messageSizeInBytes).
            batchSize(batchSize).
            flushIntervalSeconds(flushIntervalSeconds).
            maxQueueSize(queueSize).
            build(); // Returns a WavefrontClient
            
    // now send distributed tracing spans as below
    wavefrontSender.sendSpan("getAllUsers", 1552949776000L, 343, "localhost",
          UUID.fromString(UUID.randomUUID()),
          UUID.fromString(UUID.randomUUID()),
          ImmutableList.<UUID>builder().add(UUID.fromString(
            "2f64e538-9457-11e8-9eb6-529269fb1459")).build(), null,
          ImmutableList.<Pair<String, String>>builder().
            add(new Pair<>("application", "Wavefront")).
            add(new Pair<>("http.method", "GET")).build(), null);
    ```

## A Closer Look at an Instrumented Microservice

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
