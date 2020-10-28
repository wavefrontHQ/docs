---
title: Tracing FAQ
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_faq.html
summary: Get answers to your questions about Wavefront distributed tracing
---
This page has some special tips to help you instrument your applications and send trace data to Wavefront.

## How do I send custom span level RED metrics using a Wavefront sender SDK?

For details on how to send span-level RED metrics using a custom tracing port, see [Instrument Your Application with Wavefront Sender SDKs](tracing_instrumenting_frameworks.html#instrument-your-application-with-wavefront-sender-sdks).

## How do I filter RED metrics using custom span tags?

If you want to filter RED metrics data using a span tag that is not a default span tag, you need to propagate it as a custom span tag to the RED metrics. For details, see [Custom Span-Level Tags for RED Metrics](tracing_customize_spans_and_alerts.html).

## How do I customize the application name when my application uses a Zipkin library?

To override the default application name when using [zipkin-js](https://github.com/openzipkin/zipkin-js), OpenTracing Zipkin libraries, or OpenTelemetry Zipkin libraries, use any of the following options:

* Add the following span tag to the application logic.
  ```
  application=<applicationName>
  ```

* Open the [`<wavefront_config_path>`](#paths)`/wavefront.conf` file, and update or add the following configuration if you are using the Wavefront proxy and don't want to modify your code.
  ```
  traceZipkinApplicationName = <Enter_Application_Name>
  ```
  {% include note.html content="You cannot have more than 1 application sending traces to the same proxy because this configuration can override only one application name."%}
  
## How do I send spans to Wavefront?

You can send spans to Wavefront using the Wavefront SDKs or using the Wavefront proxy.

* Instrument your applications using the Wavefront Sender SDKs. See [Instrument Your Application with Wavefront Sender SDKs](tracing_instrumenting_frameworks.html#instrument-your-application-with-wavefront-sender-sdks) for details.

* Send spans to the Wavefront proxy's `customTracingListenerPorts` port in the Wavefront spans format. Open the [`<wavefront_config_path>`](proxies_configuring.html#paths)`/wavefront.conf` file, and update or add the `customTracingListenerPorts` configuration.

Example: Wavefront span format
```
wavefrontSender.sendSpan("getAllUsers", System.currentTimeMillis(), 343, "localhost",
      UUID.fromString("7b3bf470-9456-11e8-9eb6-529269fb1459"),
      UUID.fromString("0313bafe-9457-11e8-9eb6-529269fb1459"),
      ImmutableList.<UUID>builder().add(UUID.fromString(
        "2f64e538-9457-11e8-9eb6-529269fb1459")).build(), null,
      ImmutableList.<Pair<String, String>>builder().
        add(new Pair<>("application", "Wavefront")).
        add(new Pair<>("service", "myService")).
        add(new Pair<>("http.method", "GET")).build(), null);
```
