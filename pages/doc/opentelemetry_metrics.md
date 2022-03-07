---
title: OpenTelemetry Metrics Data
tags: [tracing]
permalink: opentelemetry_metrics.html
summary: Learn how to send data your OpenTelemetry metrics and traces to Tanzu Observability.
---

OpenTracing and OpenCensus merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces, metrics, and logs from your application. If your application uses OpenTelemetry, you can configure the application to send metrics to Tanzu Observability by Wavefront as explained below:

## Sending Metrics Data to Tanzu Observability

Metrics data includes time series, counters, and histograms. You use the OpenTelemetry Collector and the Wavefront proxy. Once the data is in Tanzu Observability, you can use charts and dashboards to visualize the data and create alerts.

Here's how it works:
<br/>[ADD IMAGE - FLOW]

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html).
   {% include note.html content="Make sure to open port 2878 to send spans and metrics to Tanzu Observability. For example, on Linux, Mac, and Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file, uncomment  the `pushListenerPorts`, and set it to 2878." %}
1. Configure your application to send the metrics data to the OpenTelemetry Collector. 
1. Export the data from the OpenTelemetry Collector to the Tanzu Observability (Wavefront) metrics exporter. See [Install the OpenTelemetry Collector](https://github.com/wavefrontHQ/opentelemetry-examples#install-the-opentelemetry-collector) to get the up-to-date YAML file.
    {% include note.html content="The Tanzu Observability metrics exporter in the OpenTelemetry collector converts the OpenTelemetry metrics to the Tanzu Observability metrics format. See [OpenTelemetry Metrics in Tanzu Observability](#opentelemetry-metrics-in-tanzu-observability) to learn more about the different metrics types you can see in Tanzu Observability." %}
    For example, make sure you have all the metrics configurations in your YAML file:
    
    ```
    receivers:
      otlp:
        protocols:
            grpc:
                endpoint: "<enter your IP address>:4317"

    exporters:
      tanzuobservability:
        metrics:
          endpoint: "http://<enter your IP address>:2878"
    # Proxy hostname and customTracing ListenerPort

    processors:
      batch:
        timeout: 10s

    service:
      pipelines:
        metrics:
          receivers: [otlp]
          exporters: [tanzuobservability]
          processors: [batch]

    ```
1. Explore the metrics data you sent to Tanzu Observability using charts and dashboards.
    {% include note.html content="If you are new to using Tanzu Observability, try out the [Dashboards and Charts tutorial](tutorial_dashboards.html) and see how you can use charts and dashboards to view data." %}

## OpenTelemetry Metrics in Tanzu Observability

The OpenTelemetry metrics your applications send are converted to the Tanzu Observability metrics format as follows:

<table style="width: 100%;">
  <tbody>
    <thead>
      <tr>
        <th>OpenTelemetry Metric</th>
        <th>Tanzu Observability Metric</th>
      </tr>
    </thead>
    <tr>
      <td>
        Gauge metrics
      </td>
      <td markdown="span">
        Gauge metrics
      </td>
    </tr>
    
    <tr>
      <td>
        Cumulative sum metrics
      </td>
      <td>
        Gauge metrics
      </td>
    </tr>
    
    <tr>
      <td>
        Delta sum metrics
      </td>
      <td>
        Delta counters
      </td>
    </tr>
    
    <tr>
      <td>
        Cumulative histograms
      </td>
      <td>
        Histograms
      </td>
    </tr>
    
    <tr>
      <td>
        Delta histograms
      </td>
      <td>
        Histograms
      </td>
    </tr>
    
    <tr>
      <td>
        Cumulative exponential histograms
      </td>
      <td>
        Histograms
      </td>
    </tr>
    
    <tr>
      <td>
        Delta exponential histograms
      </td>
      <td>
        Histograms
      </td>
    </tr>
    
    <tr>
      <td>
        Summary metrics
      </td>
      <td>
        WHAT TO ADD HERE?
      </td>
    </tr>
    
    
  </tbody>
</table>

{% include tip.html content="For more information on the Tanzu Observability metrics, see [Metric Types](metric_types.html)." %}

## Next Steps

[Try out the Tutorials](opentelemetry_java_tutorial.html) and see how you can send your data to Tanzu Observability!
