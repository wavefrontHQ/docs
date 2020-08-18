---
title: OpenTelemetry Integration
tags: [integrations list]
permalink: opentelemetry.html
summary: Learn about the Wavefront Jaeger Integration.
---
OpenTracing and OpenCensus have merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces and metrics from your application. You can use OpenTelemetry to send metrics or traces to Wavefront using the Prometheus, Jaeger, or Zipkin integration. 

## Sending Metrics Data to Wavefront

If your application uses OpenTelemetry, you can configure it to send metrics data to Wavefront using the Prometheus integration and the Wavefront proxy. Once the data is in Wavefront, you can use [charts and dashboards](ui_examine_data.html) to visualize the data. This visualization helps you pinpoint where the request is spending most of its time, and discover problems.

Here's how it works:
![shows the workflow on how to send metrics data from your application configured for OpenTelemetry](/images/tracing_opentelemetry_metrics_data.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html)
1. Configure your application to sends the trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/about/) for details.
1. Export the data from the OpenTelemetry Collector to the Wavefront Prometheus integration. See [Making Data in Prometheus Available in Wavefront](prometheus.html#use-case-2-making-data-in-prometheus-available-in-wavefront) for details.

### Tutorial

1. [Install the Wavefront Proxy](proxies_installing.html)
1. Configure the demo application to send trace data to the OpenTelemetry Collector.
    1. Clone the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector.git).
        ```
        git clone https://github.com/open-telemetry/opentelemetry-collector.git
        ```
    3. Open the opentelemetry-collector/example/demo/[prometheous.yaml](https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/master/examples/demo/prometheus.yaml) file and add the following configurations.
      
        ```yaml
        remote_write:
          - url: "http://localhost:1234/receive"
        ```
      
        **Note:** The [prometheous.yaml](https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/master/examples/demo/prometheus.yaml) of your `OpenTelemetry collector` must be replaced with the hostname and port of the Prometheus Storage Adapter configured on Step 3.2 below.
    
    4. Navigate to the opentelemetry-collector/example/demo directory via the terminal.
        ```
        cd opentelemetry-collector/example/demo/
        ```
    5. Run `docker-compose up -d` this sends the data of demo sample to the appropriate Prometheus backend exposed on `9090` port.

1. Send the data from the OpenTelemetry Collector to the Wavefront Prometheus integration. This adapter takes the data and forwards it to a Wavefront proxy. 
    1. Clone the Wavefront [Prometheus Storage Adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter.git) to forward demo sample data.
        ```
        git clone https://github.com/wavefrontHQ/prometheus-storage-adapter.git
        ```
    2. Navigate to the the prometheus-storage-adapter directory via the terminal.
        ```
        cd prometheus-storage-adapter
        ```
    2. Run the Prometheus Storage Adapter as a docker container:
        ```
        docker run wavefronthq/prometheus-storage-adapter -proxy=localhost -proxy-port=2878 -listen=1234 -prefix=prom -convert-paths=true
        ```
1. You can create [charts and dashboards](ui_examine_data.html) to see the data that was sent from your application and [create alerts](alerts.html#creating-an-alert). 

## Sending Trace Data to Wavefront

If your application is configured for tracing using OpenTelemetry, you can instrument it to send the trace data to Wavefront using the Jaeger or Zipkin integrations and the Wavefront proxy. Once the data is in Wavefront, you can use our [tracing UI](tracing_ui_overview.html) to visualize a request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time, and discover problems.

Here's how it works:
![shows the workflow on how to send trace data from your application configured for OpenTelemetry](/images/tracing_opentelemetry_trace_data.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html)
1. Configure your application to sends the trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/about/) for details.
1. Export the data from the OpenTelemetry Collector to the Wavefront Jaeger or Zipkin integration. 
  See the Jaeger or Zipkin integration on how to configure the Wavefront proxy and send data to Wavefront.
    * [Jaeger integration](jaeger.html)
    * [Zipkin integration](zipkin.html)
    
