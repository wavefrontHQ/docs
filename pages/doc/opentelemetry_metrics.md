---
title: OpenTelemetry Metrics DATA
tags: [tracing]
permalink: opentelemetry_metrics.html
summary: Learn how to send data your OpenTelemetry metrics and traces to Tanzu Observability.
---

OpenTracing and OpenCensus merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces, metrics, and logs from your application. If your application uses OpenTelemetry, you can configure the application to send metrics to Tanzu Observability by Wavefront as explained below:

## Sending Metrics Data to Wavefront

Metrics data includes time series, counters, and histograms. You use the OpenTelemetry Collector and the Wavefront proxy. Once the data is in Wavefront, you can use charts and dashboards to visualize the data and create alerts.

Here's how it works:
<br/>[ADD IMAGE - FLOW]

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html).
   <br/>Make sure to open port 2878 to send spans and metrics to Wavefront. For example, on Linux, Mac, and Windows, open the wavefront.conf file, uncomment  the `pushListenerPorts` and set it to 2878.
1. Configure your application to send the metrics data to the OpenTelemetry Collector. 
1. Export the data from the OpenTelemetry Collector to the Tanzu Observability (Wavefront) metrics exporter. See [Install the OpenTelemetry Collector](https://github.com/wavefrontHQ/opentelemetry-examples#install-the-opentelemetry-collector) to get the up to date YAML file.
    {% include note.html content="The Tanzu Observability by Wavefront trace exporter in the collector coverts the OpenTelemetry metrics to the Wavefront metrics format. See []() to see the different metrics types you can see in Wavefront." %}
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

## OpenTelemetry Metrics in Tanzu Observability

The OpenTelemetry metrics your applications send are converted to the Wavefront metrics format as follows:

<table style="width: 100%;">
  <tbody>
    <thead>
      <tr>
        <th>OpenTelemetry Metric</th>
        <th>Wavefront Metric</th>
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

For more information on the Wavefront metrics, see [Metric Types](metric_types.html).

## Next Steps

[Try out the Tutorials](opentelemetry_java_tutorial.html) and see how you can send your data to Wavefront!
