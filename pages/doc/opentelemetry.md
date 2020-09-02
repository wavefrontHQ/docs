---
title: OpenTelemetry in Wavefront
keywords: opentelemetry, distributed tracing
tags: [tracing]
permalink: opentelemetry.html
summary: configure applications to send OpenTelemetry data to Wavefront.
---

OpenTracing and OpenCensus have merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces and metrics from your application. If your application uses OpenTelemetry, you can configure the application to send metrics data to Wavefront using the Prometheus integration, and trace data to Wavefront using the Jaeger or Zipkin integration. 

## Sending Metrics Data to Wavefront

If your application uses OpenTelemetry, you can configure the application to send metrics data to Wavefront. Metrics data includes time series, counters, and histograms. You use the Wavefront Prometheus storage adapter and the Wavefront proxy. Once the data is in Wavefront, you can use charts and dashboards to visualize the data and create alerts.

Here's how it works:
![shows the workflow on how to send metrics data from your application configured for OpenTelemetry](/images/tracing_opentelemetry_metrics_data.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html).
1. Configure your application to send the trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/about/) for details.
1. Export the data from the OpenTelemetry Collector to the Wavefront Prometheus Storage Adapter. 
 <!--**Note**: See [Making OpenTelemetry Prometheus Collector Metrics Available in Wavefront](prometheus.html#use-case-3-making-opentelemetry-prometheus-collector-metrics-available-in-wavefront) for detailed steps.-->

### Tutorial

This tutorial uses the OpenTelemetry Collector demo. <!--For steps on how to configure your application, see [Making OpenTelemetry Prometheus collector metrics Available in Wavefront](prometheus.html#use-case-3-making-opentelemetry-prometheus-collector-metrics-available-in-wavefront).-->

1. [Install the Wavefront Proxy](proxies_installing.html).
1. Configure the demo application to send trace data to the OpenTelemetry Collector.
    1. Clone the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector.git).
        ```
        git clone https://github.com/open-telemetry/opentelemetry-collector.git
        ```
    3. Open the opentelemetry-collector/examples/demo/[prometheus.yaml](https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/master/examples/demo/prometheus.yaml) file and add the following configurations.
      
        ```yaml
        remote_write:
          - url: "http://<enter your IP address>:1234/receive"
        ```
      
        {% include note.html content="The IP address and port configured in the prometheus.yaml file needs to match configurations in the Prometheus Storage Adapter configured in Step 3 below." %}
    
    4. Navigate to the opentelemetry-collector/examples/demo directory via the terminal.
        ```
        cd opentelemetry-collector/examples/demo/
        ```
    5. Run `docker-compose up -d` to start the OpenTelemetry Collector and Prometheus Server. The Prometheus server is exposed on port `9090`.

1. Send the data from the OpenTelemetry Collector to the Wavefront Prometheus integration. This adapter takes the data and forwards it to a Wavefront proxy. 
    Run the Prometheus Storage Adapter as a docker container. The metrics sent to Wavefront has the `prom` prefix.
    ```
    docker run -d -p 1234:1234 wavefronthq/prometheus-storage-adapter -proxy=<enter your IP address> -proxy-port=2878 -listen=1234 -prefix=prom -convert-paths=true
    ```
    {{site.data.alerts.tip}}
    Enter <code>http://&lt;enter your IP address&gt;:1234/health</code> on your browser and run it. If you see <code>&#123;"Message":"OK"&#125;</code>, you have successfully configured the Prometheus Storage Adapter.
    {{site.data.alerts.end}}
  
1. Explore the data sent to Wavefront: 
    * See the metrics sent in the [Metrics browser](metrics_managing.html#metrics-browser):
        1. Log in to your Wavefront instance and select Browse > Metrics. 
        1. Search for metrics that have a prom prefix. 
      ![shows the metrics that has the prefix prom. The prom.gateway metrics are the default metrics sent by the Prometheus storage adapter. prom.otelcol and prom.scrape are the OpenTemeletry metrics that were sent to Wavefront.](images/tracing_open_telemetry_metrics.png)
    * You can create [charts and dashboards](ui_examine_data.html) to see the data that was sent from your application and [create alerts](alerts.html#creating-an-alert).
      ![a line chart that has a query which uses the prom.otelcol metrics ](images/tracing_oepntelemtry_collector_chart.png)

## Sending Trace Data to Wavefront

If your application uses OpenTelemetry, you can configure the application to send trace data to Wavefront using the Jaeger or Zipkin integration. When the data is in Wavefront, you can use our tracing dashboards to visualize any request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time, and discover problems.

Here's how it works:
![shows the workflow on how to send trace data from your application configured for OpenTelemetry](/images/tracing_opentelemetry_trace_data.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html)
1. Configure your application to sends the trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/about/) for details.
1. Export the data from the OpenTelemetry Collector to the Wavefront Jaeger or Zipkin integration. 
  See the Jaeger or Zipkin integration on how to configure the Wavefront proxy and send data to Wavefront.
    * [Jaeger integration](jaeger.html)
    * [Zipkin integration](zipkin.html)
1. Explore the trace data that was sent to Wavefront using the [tracing dashboards](tracing_ui_overview.html).
    
