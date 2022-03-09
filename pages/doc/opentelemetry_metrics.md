---
title: OpenTelemetry Metrics Data
tags: [tracing]
permalink: opentelemetry_metrics.html
summary: Learn how to send data your OpenTelemetry metrics and traces to Tanzu Observability.
---

{% include warning.html content="This document is work in progress!" %}

OpenTracing and OpenCensus merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces, metrics, and logs from your application. If your application uses OpenTelemetry, you can configure the application to send metrics to Tanzu Observability by Wavefront as explained below:

## Sending Metrics Data to Tanzu Observability

Metrics data includes time series, counters, and histograms. You use the OpenTelemetry Collector and the Wavefront proxy. Once the data is in Tanzu Observability, you can use charts and dashboards to visualize the data and create alerts.

Here's how it works:
![tThe diagram shows how the data flows from an application to OpenTelemetry collector, which has the OpenTelemetry exporter, to the wavefront proxy, which has the OpenTelemetry receiver, and finally to Tanzu Observability.](images/opentelemetry_collector_metrics.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html).
    {{site.data.alerts.note}}
      <ul>
        <li>
          If you have already installed the Wavefront proxy, make sure it is version 10.14 or higher. 
        </li>
        <li>
          Make sure to open port 2878 to send spans and metrics to Tanzu Observability. For example, on Linux, Mac, and Windows, open the <a href="proxies_configuring.html#proxy-file-paths"><code>wavefront.conf</code></a> file, uncomment  the <code>pushListenerPorts</code>, and set it to 2878.
        </li>
      </ul>
    {{site.data.alerts.end}}

1. Configure your application to send the metrics data to the OpenTelemetry Collector. 
1. Export the metrics data from the OpenTelemetry Collector using the Tanzu Observability (Wavefront) metrics exporter. See [Install the OpenTelemetry Collector](https://github.com/wavefrontHQ/opentelemetry-examples#install-the-opentelemetry-collector) to get the up-to-date YAML file.
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
          endpoint: "http://<enter your Wavefront proxy IP address>:2878"
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
        <th>OpenTelemetry Metrics Format</th>
        <th>Tanzu Observability Metrics Format</th>
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
        Gauge metrics
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
        Gauge metrics
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
        Gauge metrics
        <br/>Each quantile in the summary is sent to Wavefront as a series of gauge metrics.
      </td>
    </tr>
    
    
  </tbody>
</table>

{% include tip.html content="For more information on the Tanzu Observability metrics, see [Metric Types](metric_types.html)." %}

## Next Steps

[Try out the Tutorials](opentelemetry_java_tutorial.html) and see how you can send your data to Tanzu Observability!
