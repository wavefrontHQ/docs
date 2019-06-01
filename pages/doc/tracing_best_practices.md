---
title: Tracing Best Practices
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_best_practices.html
summary: Best practices for collecting and sending trace data from an application to Wavefront.
---

Wavefront supports various techniques for instrumenting your applications to collect and send trace data to Wavefront. The best practices on this page will help you get optimal results from whichever technique you choose.

## Planning for Tracing

Learn about trace data. 
* Traces represent end-to-end requests across microservices, and are composed of spans, which represent calls to individual operations. Traces can help you troubleshoot errors or pinpoint performance bottlenecks in your code.
* See [Tracing Basics](tracing_basics.html) for basic tracing concepts. 
* See [https://opentracing.io](https://opentracing.io/) for comprehensive discussion and details. 

Inventory your application to answer these questions:
* Which microservices belong to your application? Which ones participate in the most critical requests?
* What programming language or languages are these microservices written in?  
* Are any microservices built with open-source component frameworks? Which frameworks?

Choose your Wavefront instrumentation support. 
* Instrument each microservice with the [Wavefront OpenTracing SDK](wavefront_sdks.html##sdks-for-collecting-trace-data) in the microservice's language. 
  - Get a head start by using any [Wavefront framework SDKs](wavefront_sdks.html#sdks-that-instrument-frameworks) that are available for your microservice's language and frameworks. Augment the framework SDKs with the Wavefront OpenTracing SDK.
* If you have already instrumented your application with a 3rd party distributed tracing system such as Jaeger or Zipkin, use a [Wavefront integration](tracing_integrations.html). 
* Use consistent intrumentation (either Wavefront SDKs or a 3rd party tracing system) for all microservices that participate in the same trace. Otherwise, spans cannot link to each other across microservice boundaries. 
  - It's OK to instrument different microservices with different Wavefront SDKs in different programming languages.

## Best Practices for Sending Trace Data to Wavefront

Large-scale applications should use a Wavefront proxy to send trace data to Wavefront. (A proxy is required with 3rd party distributed tracing systems.)

### When Using Wavefront Observability SDKs

[Install and configure the Wavefront proxy](tracing_instrumenting_frameworks.html#to-prepare-a-wavefront-proxy) with listener ports for metrics, histograms, and trace data. 
* Be sure to configure the proxy with the `histogramDistListener` property. You might overlook this property if you are already using a proxy that is configured for metrics.

Configure your application code to send metrics, histograms, and trace data to the Wavefront proxy. 
* See the [README file on GitHub for your Wavefront SDK](tracing_instrumenting_frameworks.html#step-2-instrument-your-application) for specific steps.
* Set up a [Wavefront sender](tracing_instrumenting_frameworks.html#wavefront-sender) that can find the Wavefront proxy host.
  - Configure the Wavefront sender with the same listener ports you set for the Wavefront proxy.
  - Instantiate a single Wavefront sender per process and share it among SDKs.
* Java example: Instantiate a singleton `WavefrontSender`

```java
  // Create the builder with the proxy hostname or address
  WavefrontProxyClient.Builder wfProxyClientBuilder = new WavefrontProxyClient.Builder(proxyHostName);

  // Set the proxy ports for metrics, histograms, and trace data
  wfProxyClientBuilder.metricsPort(2878);
  wfProxyClientBuilder.distributionPort(2878);
  wfProxyClientBuilder.tracingPort(30_000);

  // Create the WavefrontProxyClient
  WavefrontSender wavefrontSender = wfProxyClientBuilder.build();
```


### When Using 3rd Party Tracing Systems

Follow the integration's setup steps. 
* Configure the Wavefront proxy with an integration-specific port.
* No code changes - the integration implicitly instantiates and configures an internal Wavefront sender for you.

## Application Inventory Best Practices 

Think of your instrumented application as a hierarchic inventory of constructs. An application consists of microservices. Each microservice is built with one or more open-source component frameworks. Each microservice and component framework defines the operations that are represented as spans in traces.

Wavefront requires that you choose a name for each construct at each level. For example:
* Application name: `"beachshirts"`
* Microservice names: `"delivery"`, `"packaging"`, `"printing"`, and so on
* Component names: `"grpc"`, `"django"`, and so on
  - **Note:** Some Wavefront SDKs choose the component name for you.

Wavefront stores these names as the values of span tags, and uses them to filter traces and to aggregate RED metrics. Application and service names appear in the UI and as qualifiers for operation names, for example, `beachshirts.delivery.dispatch`. 

### Guidelines for Choosing Application Inventory Names
 
* Choose names that are unique among other names at the same level. For example, at most one service in any application should be called `delivery`
- **Note:** Incorrect RED metrics might result from duplicate application, service, or component names.
* Choose logical names that clearly map to your applications and services.  
  - Logical names do not need to exactly match code identifiers, but might be simplified for readability. 

### When Using Wavefront Observability SDKs

Configure your application code to define logical names for application constructs. 
* See the [README file on GitHub for your Wavefront SDK](tracing_instrumenting_frameworks.html#step-2-instrument-your-application) for specific steps.
* Set up an [Application tags object](tracing_instrumenting_frameworks.html#application-tags) in each microservice to encapsulate the logical names that apply to that microservice. 
  - Logical application and service names are required.
  - Logical names for cluster and shard are optional. Specify them if you want to use the physical topology to filter your data.
* Define a tag called `component` as a custom tag if you are using the Wavefront OpenTracing SDK. (**Note:** Framework SDKs automatically define `component` for you.)
* Java example: Instantiate `ApplicationTags` for the `delivery` service.

```java
  String application = "beachshirts";
  String service = "delivery";
  String cluster = "us-west-2";
  String shard = "secondary";

  Map<String, String> customTags = new HashMap<String, String>() { { 
    put("location", "Oregon");
    put("env", "Staging");
    put("component", "Jersey");
   } } ;

  ApplicationTags applicationTags = new ApplicationTags.Builder(application, service).
      cluster(cluster).       // optional
      shard(shard).           // optional
      customTags(customTags). // optional
      build();
```

### When Using 3rd Party Tracing Systems

Wavefront automatically assigns standard application names, service names, and component names, based on the tags that are set for your 3rd party distributed tracing system.

## Source Names Best Practices

A source is a host, container, instance, or any other unique source of application code that is sending a span to Wavefront. 

Wavefront requires that you choose unique names for the sources that send spans. Wavefront stores these names as the values of a span tag called `source`, and uses source names to filter traces and to aggregate RED metrics.


### Guidelines for Choosing Source Names

Choosing source names for trace data is similar to choosing [source names for metric data and histograms](wavefront_data_naming.html#source-names-best-practices).

* Choose a unique string name for each source, for example, an IP address or a logical name describing the source.
  - If you allow the source name to default to the host name, make sure each host has a unique host name. 
  - **Note:** Incorrect RED metrics might result from duplicate source names.
* Limit the number of source names, so that the `source` tag will have low cardinality.  

### When Using Wavefront Observability SDKs

Configure your application code to define source names. 
* See the [README file on GitHub for your Wavefront SDK](tracing_instrumenting_frameworks.html#step-2-instrument-your-application) for specific steps.
* Set up a [WavefrontSpanReporter object](tracing_instrumenting_frameworks.html#wavefronttracer-and-wavefrontspanreporter).
  - Leave the source name unspecified to use the name of the host that the code is running on. 
  - Specify a source name explicitly to use a name other than the host name. 
  - Some SDKs define additional reporters so you may need to specify the source in several places. Be consistent across SDKs. Use the same string for a given source. All reporter objects for a particular microservice must specify the same source.
* Java example: Build a `WavefrontSpanReporter` that reports from a source called `wavefront-tracing-example`.

```Java
// Create a WavefrontProxyClient
WavefrontSender wavefrontSender = ... 

Reporter wfSpanReporter = new WavefrontSpanReporter.Builder().
  withSource("wavefront-tracing-example"). 
  build(wavefrontSender);
```


## Span Names Best Practices

<!---

Spans are the building blocks of traces.
Each span corresponds to a particular invocation of a particular operation– e.g., getShoppingMenu(menu_id=123)  
For best results:
Name the span for the operation/method whose calls it represents.
Adopt naming conventions so that you’ll end up with no more than 1000 unique span names. Add extra detail as span tags (rather than incorporating the detail into the span name).
Example. For an operation like getShoppingMenu(menu_id=123) 
A good choice for span name is getShoppingMenu. (Add a span tag if more detail is desired: menu_id=123 ) 
A poor choice might be: getShoppingMenu_123  
Incorporating specific menu identifiers into this span name could result in an open-ended proliferation of unique span names (getShoppingMenu_122, getShoppingMenu_123, getShoppingMenu_124, getShoppingMenu_125...), all representing a call to the same piece of code.

--->

## Custom Span Tags Best Practices

<!---
You define custom span tags so that you can query/filter for the subsets of trace data that you're interested in. 
If you are not using a WF framework SDK, be sure to define a component= tag and application=tag
component= works together with the required application= and service= tags (see above) to display the Application Services page and each service-specific page.
Avoid using standard OpenTracing tag names, which are reserved.
WF uses indexes to optimize the performance of filtering/querying.
WF automatically indexes all point tags and a specific set of span tags (application, service, etc.).  ==> Link to or incorporate Indexed/Unindexed Span Tags section 
WF optimizes performance by automatically indexing span tags with low cardinality (== tags with < XX possible values). I.e.:
WF automatically indexes, e.g.: span.kind= , component=
WF does not index:  spanId= because there could be an open-ended proliferation of unique span identifiers.
If you define custom span tags, you can contact WF support to request indexing for them. 
The lower the cardinality, the better the filtering/querying performance.
--->
## Instrumentation Best Practices
