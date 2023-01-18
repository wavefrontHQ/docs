---
title: (Archived) Using Jaeger or Zipkin with Tanzu Observability
keywords: data, distributed tracing, OpenTelemetry
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_integrations.html
summary: Learn how to send trace data from Jaeger or Zipkin to Tanzu Observability by Wavefront.
---

{% include important.html content="OpenTracing is deprecated. ([OpenTracing](https://opentracing.io/) and [OpenCensus](https://opencensus.io/) have merged to form [OpenTelemetry](https://opentelemetry.io/).) To send trace data to Tanzu observability, use OpenTelemetry."%}

You can collect traces  with Jaeger or Zipkin and send the trace data to Tanzu Observability by Wavefront, which:
* Provides managed, highly scalable storage for your trace data.
* Allows you to examine and alert on RED metrics that are derived from the spans.

Suppose you have already instrumented your application using Jaeger or Zipkin with OpenTracing or OpenTelemetry. You can continue using that system for application development, and then switch to using Tanzu Observability by changing a few configuration settings.

{{site.data.alerts.note}}
  <p>You can use OpenTracing or OpenTelemetry to send traces to the Wavefront service using the Jaeger or Zipkin integration. To learn about the specification that works for you, see <a href="https://help.wavefront.com/hc/en-us/articles/360058140212-OpenTracing-or-OpenTelemetry-Which-specification-to-select-for-instrumenting-applications-for-tracing-">OpenTracing or OpenTelemetry</a>.</p>
  <ul>
    <li>
      The OpenTelemetry collector can identify data coming from applications instrumented with Jaeger or Zipkin and convert them to Open Telemetry format. Next, the Tanzu Observability (Wavefront) trace exporter converts the data to the Wavefront data format. See <a href="opentelemetry.html">OpenTelemetry</a> to configure your application.
    </li>
    <li>
      For OpenTracing, follow the steps given below.
    </li>
  </ul>
{{site.data.alerts.end}}


## Tracing-System Integrations and Exporters

You can use the Jaeger or Zipkin integrations, but you can also specify custom tags.

To get data flowing:

* Follow setup steps for the [Jaeger integration](jaeger.html)
* Follow setup steps for the [Zipkin integration](zipkin.html)

Each integration
1. Configures your distributed tracing system to send trace data to a Wavefront proxy. During integration setup, follow the prompts to create a new integration or use an existing integration.
2. The proxy processes the data and sends it to your Wavefront service.

Part of setting up the integration is to configure the Wavefront proxy to listen for the trace data on an integration-specific port.

Using an integration is the simplest way - [but not the only way](#alternatives-to-integrations) - to send trace data to the Wavefront service from a 3rd part tracing system.

## Trace Data from an Integration

When you use a tracing-system integration, the Wavefront proxy receives the trace data that your application emits. If you configured your distributed tracing system to perform sampling, the proxy receives only the spans that the 3rd party sampler has allowed.

The Wavefront proxy:
* Checks for required span tags on each received span, and adds them if needed.
* Automatically derives RED metrics from the received spans.

### Required Span Tags

The Wavefront service requires certain [span tags](trace_data_details.html#span-tags) on well-formed spans. The following spans tags enable you to filter and visualize trace data from the different services in your instrumented application:
<table>
<colgroup>
<col width="20%"/>
<col width="35%"/>
<col width="35%"/>
</colgroup>
<thead>
<tr><th>Tag Name</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`application`</td>
<td markdown="span">Name that identifies the application that emitted the span. </td>
<td markdown="span">Name of your tracing system, for example,`Jaeger` or `Zipkin`.</td>
</tr>
<tr>
<td markdown="span">`service`</td>
<td markdown="span">Name of the microservice that emitted the span. </td>
<td markdown="span">Service name that you specified to your distributed tracing system.</td>
</tr>
</tbody>
</table>

The proxy preserves any tags that you assigned through your distributed tracing system. You can explicitly instrument your code to add an `application` tag with a preferred application name.

The mandatory span tags cannot have multiple values. Ensure that your application does not send spans with multiple application or service tags.
For example, a span with two span tags `service=notify` and `service=backend` is invalid.

{% include note.html content="The Wavefront service ignores span tags with empty values." %}

### Derived RED Metrics

The Wavefront service automatically derives RED metrics from the spans that are sent from the instrumented application services. RED metrics are measures of the request Rate, Errors, and Duration that are obtained from the reported spans. These metrics are key indicators of the health of your services, and you can use them as context to help you discover problem traces.

The Wavefront service stores the RED metrics along with the spans they are based on. For more details, see [RED Metrics](trace_data_details.html#red-metrics).

{% include note.html content="The level of detail for the RED metrics is affected by any sampling that is done by your 3rd party distributed tracing system. See [Trace Sampling and RED Metrics from an Integration](#trace-sampling-and-red-metrics-from-an-integration), below." %}

### Custom Tags for RED Metrics

Include custom tags for RED metrics using the Wavefront proxy. To do so, add:

```
traceDerivedCustomTagKeys=<comma-separated-custom-tag-keys>
```

to the [proxy configuration file](proxies_configuring.html#paths) (`/etc/wavefront/wavefront-proxy/wavefront.conf` by default).

The Wavefront proxy generates custom tags for the specified keys.

For example, if you add the following properties, the Wavefront proxy generates 3 custom tags:

```
traceDerivedCustomTagKeys=tenant, env, location
```
{% include note.html content="For faster performance, index only low-cardinality custom span tags. A low cardinality tag has comparatively few unique values that can be assigned to it. See [Indexed and Unindexed Span Tags](trace_data_details.html#indexed-and-unindexed-span-tags) for details." %}

### Custom Application Names

You can set up custom application names for Jaeger and Zipkin. The process differs depending on your source, as follows.

#### Custom Application Names for Jaeger

You can specify custom application names at the level you need, like this:

- **Span-level tag**: Add the `application` tag to all spans.
- **Process-level tag**: Add the `application` tag as a Jaeger tracer tag, that is, a [process tag](https://www.jaegertracing.io/docs/1.12/client-features/).
- **Proxy-level tag**: Add `traceJaegerApplicationName=<application-name>` in the proxy configuration at `/etc/wavefront/wavefront-proxy/wavefront.conf`. See [Proxy Configuration Paths](proxies_configuring.html#paths) for details on the config file location.

The order of precedence is span level > process level > proxy level.

#### Custom Application Names for Zipkin

You can specify custom application names at the level you need, like this:

- **Span-level tag**: Add tag `application` to all spans.
- **Proxy-level tag**: Add `traceZipkinApplicationName=<application-name>` in the proxy configuration at `/etc/wavefront/wavefront-proxy/wavefront.conf`. See [Proxy Configuration Paths](proxies_configuring.html#paths) for details on the config file location.

The order of precedence is span level > proxy level.

## Visualizing Trace Data from an Integration

You view trace data from an integration using the [Application Status](tracing_ui_overview.html), [Service Dashboard](tracing_service_dashboard.html). and [Traces Browser](tracing_traces_browser.html).

If you want context for identifying problem traces, you can start by viewing the [derived RED metrics](#derived-red-metrics):

1. From the toolbar, select **Applications > Application Status**, and find the application (by default, `Jaeger` or `Zipkin`).
2. Click the application name, and find the service whose RED metrics you want to see.
2. Click the **Details** link for the service.
3. Select an operation from one of the charts to examine the traces for that operation.

If you want to view trace data directly, you can start by submitting [a trace query](trace_data_query.html#search-and-filter-traces-on-the-traces-browser):
1. From the toolbar, select **Applications > Traces**.
2. In the Traces Browser, [submit a trace query](trace_data_query.html#search-and-filter-traces-on-the-traces-browser) by selecting the operations and filters that describe the spans of interest.
3. Click **Search**.


## Trace Sampling and RED Metrics from an Integration

When you use a 3rd party distributed tracing system, you normally configure it to perform sampling. Doing so means that sampling occurs first, before the Wavefront proxy derives the [RED metrics](#derived-red-metrics). The Wavefront proxy receives only a subset of the generated spans, and the RED metrics will reflect just that subset.

For more accurate RED metrics, you can disable the 3rd party sampling, and choose one of the following options instead:

* Set up [sampling through the Wavefront proxy](trace_data_sampling.html#setting-up-explicit-sampling-through-the-proxy). You need proxy version 4.36 or later.
* [Swap in a Wavefront Tracer](#swap-in-a-wavefront-tracer) and configure it to perform sampling.

The Wavefront proxy or Wavefront Tracer will auto-derive the RED metrics first, and then perform the sampling.

## Enable Logs
You can enable logging for your Jaeger and Zipkin integrations.

### Enable Logs for Jaeger Integrations

Follow these steps:

1. Open the [`<wavefront_config_path>`](proxies_configuring.html#proxy-file-paths)`/log4j2.xml` file.
2. Add the configurations to enable and manage logs under `<Appenders>`.<br/>
  Example:

    ```
    <Appenders>
       <RollingFile name="[Enter_Your_File_Name]" fileName="${log-path}/wavefront-jaeger-data.log" filePattern="${log-path}/wavefront-jaeger-data-%d{yyyy-MM-dd}-%i.log">
          <PatternLayout>
             <pattern>%m%n</pattern>
          </PatternLayout>
          <Policies>
             <TimeBasedTriggeringPolicy interval="1" />
             <SizeBasedTriggeringPolicy size="1024 MB" />
          </Policies>
          <DefaultRolloverStrategy max="10">
             <Delete basePath="/var/log/wavefront" maxDepth="1">
                <IfFileName glob="wavefront-jaeger*.log" />
                <IfLastModified age="7d" />
             </Delete>
          </DefaultRolloverStrategy>
       </RollingFile>
    </Appenders>
    ```
    {% include note.html content="See the [log4j2 documentation](https://logging.apache.org/log4j/2.x/manual/appenders.html) for information on each parameter."%}

3. Add the logger name for `JaegerDataLogger` inside `<Loggers>`.<br/>
    Example:

      ```
      <!-- Set level="ALL" to log Jeager data to a file. -->
      <Loggers>
         <AsyncLogger name="JaegerDataLogger" level="DEBUG" additivity="false">
            <AppenderRef ref="[Enter_Your_File_Name]" />
         </AsyncLogger>
      </Loggers>
      ```
4. Save the file.

### Enable Logs for Zipkin Integrations

Follow these steps:

1. Open the [`<wavefront_config_path>`](proxies_configuring.html#proxy-file-paths)`/log4j2.xml` file.
2. Add the configurations to enable and manage logs under `<Appenders>`.<br/>
  Example:

    ```
    <Appenders>
       <RollingFile name="[Enter_Your_File_Name]" fileName="${log-path}/wavefront-zipkin-data.log" filePattern="${log-path}/wavefront-zipkin-data-%d{yyyy-MM-dd}-%i.log">
          <PatternLayout>
             <pattern>%m%n</pattern>
          </PatternLayout>
          <Policies>
             <TimeBasedTriggeringPolicy interval="1" />
             <SizeBasedTriggeringPolicy size="1024 MB" />
          </Policies>
          <DefaultRolloverStrategy max="10">
             <Delete basePath="${log-path}/var/log/wavefront" maxDepth="1">
                <IfFileName glob="wavefront-zipkin*.log" />
                <IfLastModified age="7d" />
             </Delete>
          </DefaultRolloverStrategy>
       </RollingFile>
    </Appenders>
    ```
    {% include note.html content="See the [log4j2 documentation](https://logging.apache.org/log4j/2.x/manual/appenders.html) for information on each parameter."%}

3. Add the logger name for `ZipkinDataLogger` under `<Loggers>`.<br/>
    Example:
    ```
    <!-- Set level="ALL" to log Zipkin data to a file. -->
    <Loggers>
       <AsyncLogger name="ZipkinDataLogger" level="ALL" additivity="false">
          <AppenderRef ref="[Enter_Your_File_Name]" />
       </AsyncLogger>
    </Loggers>
    ```

4. Save the file.

## Alternatives to Integrations

If using the Jaeger or Zipkin integration doesn't make sense in your environment, you can still use Tanzu Observability with those systems.

### Swap In a Wavefront Tracer

If you are using Jaeger (or some other tracing system that is compliant with the [OpenTracing](https://opentracing.io) specification), you can replace the Jaeger Tracer with a Wavefront Tracer.

Swapping Tracers enables the Wavefront service to derive the RED metrics from the entire set of generated spans. In contrast, using the Jaeger integration causes the RED metrics to reflect just the subset of spans that are admitted by the Jaeger sampling.

For setup details, see the [Wavefront OpenTracing SDK](wavefront_sdks.html#sdks-for-collecting-trace-data) for your programming language.

### Send Raw Trace Data

We don't support an integration for your distributed tracing system, or if you are using your own proprietary tracing system, you can use a sender SDK to send raw trace data to Wavefront service. With a sender SDK, you can write code that obtains the component values from your spans, and assembles those values into the [Wavefront span format](trace_data_details.html#wavefront-span-format). The sender SDK also lets you configure your application to send the trace data to a Wavefront proxy or directly to the Wavefront service.

For SDK setup details, see the [Wavefront sender SDK](wavefront_sdks.html#sdks-for-sending-raw-data) for your programming language.

{%include note.html content="This technique does not automatically derive RED metrics from the spans."%}

### Use the Wavefront OpenCensus Go Exporter

If you have instrumented your Go application with OpenCensus, you can use the [Wavefront OpenCensus Go Exporter](https://opencensus.io/exporters/supported-exporters/go/wavefront/) to push metrics, histograms, and traces into Wavefront. This exporter is built on the [Wavefront sender SDK](wavefront_sdks.html#sdks-for-sending-raw-data) for Go.








<!---
<table>
<colgroup>
<col width="18%"/>
<col width="50%"/>
<col width="32%"/>
</colgroup>
<thead>
<tr><th>Menu</th><th>Description</th><th>Example</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> </td>
<td markdown="span"> </td>
<td markdown="span"> </td>
</tr>
</tbody>
</table>


--->
