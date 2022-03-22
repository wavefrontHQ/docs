---
title: OpenTelemetry Tracing Data
tags: [tracing]
permalink: opentelemetry_tracing.html
summary: Learn how to send data your OpenTelemetry metrics and traces to Tanzu Observability.
---

OpenTracing and OpenCensus have merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces and metrics from your application. If your application uses OpenTelemetry, you can configure the application to send traces to Tanzu Observability by Wavefront as explained below:

{{site.data.alerts.tip}}
  <p>If you are not sure about what you need to use, we recommend the following:</p>
    <ul>
      <li>
        If your application uses SpringBoot, use Spring Cloud Sleuth.
      </li>
      <li>
        If you are a new user, and you are configuring your application to send data to Tanzu Observability, use OpenTelemetry. If you run into issues when configuring Tanzu Observability with OpenTelemetry, contact <a href="wavefront_support_feedback.html#support">Technical Support</a> for help.
      </li>
      <li>
        If your application is already using OpenTracing, continue using OpenTracing. See <a href="https://opentelemetry.io/docs/reference/specification/compatibility/opentracing/">OpenTracing Compatibility</a> for guidance on transition from OpenTracing to OpenTelemetry.
      </li>
      
    </ul>
{{site.data.alerts.end}}

## Send Trace Data

If your application uses OpenTelemetry, you can configure the application to send native OpenTelemetry trace data to Tanzu Observability using the OpenTelemetry Collector or by directly sending it to the Wavefront proxy. When the data is in Tanzu Observability, you can use our tracing dashboards to visualize any request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time and discover problems.

### Send Data Using the Wavefront Proxy - (Recommended) 

Send data from your application to the Wavefront Proxy. This is the recommended and most simplified approach to get your data into Wavefront.

Here's how it works:
![Shows how the data flows from your application to Tanzu Observability](images/opentelemetry_proxy_tracing.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html) version 11 or higher.
1. Open port 4317 on the Wavefront Proxy to send OpenTelemetry spans to Tanzu Observability. 
  <br/>For example, on Linux, Mac, and Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file, add the line `otlpGrpcListenerPorts=4317`, and save the file.
1. Configure your application to send trace data to the Wavefront Proxy. 
    {% include note.html content="By default, OpenTelemetry SDKs send data over gRPC to `http://localhost:4317`." %}
1. Explore the trace data sent to Tanzu Observability using the [tracing dashboards](tracing_basics.html#visualize-distributed-tracing-data-in-wavefront).


### Send Data Using the OpenTelemetry Collector

If you have already configured your application to send data to the OpenTelemetry Collector, follow these steps:

{% include note.html content="You need to use OpenTelemetry Collector Contrib version v0.28.0 or later to export traces to Tanzu Observability." %} 

Here's how it works:
![Shows how the data flows from your application to the OpenTelemetry Collector to Tanzu Observability](images/opentelemetry_collector_tracing.png)

1. [Install the Wavefront Proxy](proxies_installing.html).
    {{site.data.alerts.note}}
      <ul>
      <li>
        Open port 30001, with <code>customTracingListenerPorts=30001</code>, for the proxy to generate span-level RED metrics.
       </li>
       <li>
         Ensure that port 2878 is open to send spans and metrics to Tanzu Observability. For example, on Linux, Mac, and Windows, open the <a href="proxies_configuring.html#proxy-file-paths"><code>wavefront.conf</code></a> file and confirm that <code>pushListenerPorts</code> is set to 2878, and that this configuration is uncommented. 
       </li>
       
     </ul>
    {{site.data.alerts.end}}
     
1. Configure your application to send trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/) for details.
1. Export the data from the OpenTelemetry Collector to the Tanzu Observability (Wavefront) trace exporter:
    1. Create a directory to store all the files.
    1. Download the binary from the latest release of the [OpenTelemetry Collector project](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) to the directory you created.
    1. In the same directory, create a file named `otel_collector_config.yaml`.
    1. Copy the configurations below into the YAML file.
        ```
        receivers:
           otlp:
              protocols:
                  grpc:
                      endpoint: "<enter your IP address>:4317"
        exporters:
            tanzuobservability:
              traces:
                endpoint: "http://<enter your IP address>:30001"
              metrics:
                endpoint: "http://<enter your IP address>:2878"
          # Proxy hostname and customTracing ListenerPort
        processors:
            batch:
              timeout: 10s
            memory_limiter:
              check_interval: 1s
              limit_percentage: 50
              spike_limit_percentage: 30


        service:
            pipelines:
              metrics:
                receivers: [otlp]
                exporters: [tansuobservability]
                processors: [memory_limiter, batch]
              traces:
                receivers: [otlp]
                exporters: [tanzuobservability]
                processors: [memory_limiter, batch]
          
        ```
        {% include tip.html content="To learn more about OpenTelemetry configurations, see [OpenTelemetry Collector Configuration](https://opentelemetry.io/docs/collector/configuration/)." %}
    1. On your console, navigate to the directory and run the following command to start OpenTelemetry Collector:
        ```
        ./otelcontribcol_darwin_amd64 --config otel_collector_config.yaml
        ```
1. Explore the trace data sent to Tanzu Observability using the [tracing dashboards](tracing_basics.html#visualize-distributed-tracing-data-in-wavefront).


## Next Steps

- [Try out the Tutorials](opentelemetry_java_tutorial.html) and see how you can send your data to Tanzu Observability!
- To enable logs for your OpenTelemetry data, see [Enable Logs for OpenTelemetry Data](opentelemetry_logs.html).
