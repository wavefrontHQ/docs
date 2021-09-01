---
title: OpenTelemetry Integration
tags: [integrations list]
permalink: opentelemetry.html
summary: Learn about the Wavefront OpenTelemetry Integration.
---
## OpenTelemetry Integration

OpenTracing and OpenCensus have merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces and metrics from your application. If your application uses OpenTelemetry, you can configure the application to send metrics data to Wavefront using the Prometheus integration, and trace data to Wavefront using the Jaeger or Zipkin integration. 




## Sending Metrics Data to Wavefront

If your application uses OpenTelemetry, you can configure the application to send metrics data to Wavefront. Metrics data includes time series, counters, and histograms. You use the Wavefront Prometheus storage adapter and the Wavefront proxy. Once the data is in Wavefront, you can use charts and dashboards to visualize the data and create alerts.

Here's how it works:
{% include image.md src="images/tracing_opentelemetry_metrics_data.png" width="100" %}

Follow these steps:

1. [Install the Wavefront Proxy](https://docs.wavefront.com/proxies_installing.html).
1. Configure your application to send the metrics/trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/) for details.
1. Export the data from the OpenTelemetry Collector to the Wavefront Prometheus Storage Adapter. 

### Tutorial

This tutorial uses the OpenTelemetry Collector demo. For steps on how to configure your application to send custom OpenTelemetry metrics to Wavefront, see the [registering OpenCensus metric exporter in Java Application](#registering-opencensus-metric-exporter).

1. If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.
1. Configure the demo application to send trace data to the OpenTelemetry Collector.

    1. Clone the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib.git).{% raw %}
        ```
        git clone https://github.com/open-telemetry/opentelemetry-collector-contrib.git
        ```
{% endraw %}
    1. Navigate to the opentelemetry-collector-contrib/examples/demo directory via the terminal.{% raw %}
        ```
        cd opentelemetry-collector-contrib/examples/demo/
        ```
{% endraw %}
    1. Open the `prometheus.yaml` file and add the following configurations.{% raw %}
        ```yaml
        remote_write:
          - url: "http://<enter your IP address>:1234/receive"
        ```
{% endraw %}
      
        **Note**: The IP address and port configured in the prometheus.yaml file needs to match configurations in the Prometheus Storage Adapter configured in Step 3 below.
    
    1. Run `docker-compose up -d` to start the OpenTelemetry Collector and Prometheus Server. The Prometheus server is exposed on port `9090`.

1. Send the data from the OpenTelemetry Collector to the Wavefront Prometheus integration. This adapter takes the data and forwards it to a Wavefront proxy. 
    Run the Prometheus Storage Adapter as a docker container. The metrics sent to Wavefront has the `prom` prefix.{% raw %}
    ```
    docker run -d -p 1234:1234 wavefronthq/prometheus-storage-adapter -proxy=<enter your IP address> -proxy-port=2878 -listen=1234 -prefix=prom -convert-paths=true
    ```
{% endraw %}
    **Tip**: Enter `http://localhost:1234/health` on your browser and run it. If you see `{"Message":"OK"}`, you have successfully configured the Prometheus Storage Adapter.
  
1. Explore the data sent to Wavefront: 
    * See the metrics sent in the [Metrics browser](https://docs.wavefront.com/metrics_managing.html#metrics-browser):
        1. Log in to your Wavefront instance and select Browse > Metrics. 
        1. Search for metrics that have a prom prefix. 
{% include image.md src="images/tracing_opentelemetry_metrics.png" width="90" %}
    * You can create [charts and dashboards](https://docs.wavefront.com/ui_examine_data.html) to see the data that was sent from your application and [create alerts](https://docs.wavefront.com/alerts_manage.html).
{% include image.md src="images/tracing_opentelemetry_collector_chart.png" width="90" %}

### Registering OpenCensus Metric Exporter
Once you have configured your OpenTelemetry Collector to send metric data to Wavefront, you can use the code snippet below to register OpenCensus metric exporter in a Java application and send custom metrics to Wavefront. See [OpenCensus documentation](https://opencensus.io/stats/) for details on OpenCensus API.
{% raw %}
```
    import io.opencensus.common.Duration;
    import io.opencensus.exporter.metrics.ocagent.OcAgentMetricsExporter;
    import io.opencensus.exporter.metrics.ocagent.OcAgentMetricsExporterConfiguration;
    import io.opencensus.stats.*;
    import io.opencensus.stats.Measure.MeasureLong;
    import io.opencensus.stats.View.Name;
    import io.opencensus.tags.TagKey;

    // Instantiate stats recorder
    private static final StatsRecorder STATS_RECORDER = Stats.getStatsRecorder();

    // Create views
    View[] views = new View[]{...}

    // Create the view manager
    ViewManager viewManager = Stats.getViewManager();

    // Create the view manager
    ViewManager vmgr = Stats.getViewManager();
    // Then finally register the views
    for (View view : views)
         vmgr.registerView(view);

    // Setup Exporter
    // Replace `open-telemetry-collector-host` with the OpenTelemetry Collector IP address.
    OcAgentMetricsExporter.createAndRegister(
          OcAgentMetricsExporterConfiguration.builder()
                .setEndPoint("<open-telemetry-collector-host:55678>")
                .setServiceName("ocagent-java-example")
                .setUseInsecure(true)
                .setRetryInterval(Duration.create(5, 0))
                .setExportInterval(Duration.create(5, 0))
                .build());
```
{% endraw %}



## Sending Trace Data to Wavefront

If your application uses OpenTelemetry, you can configure the application to send trace data to Wavefront using the Tanzu Observability (Wavefront) trace exporter. When the data is in Wavefront, you can use our tracing dashboards to visualize any request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time, and discover problems.

**Note**: To learn about the specification that works for you, see [OpenTracing or OpenTelemetry](https://help.wavefront.com/hc/en-us/articles/360058140212-OpenTracing-or-OpenTelemetry-Which-specification-to-select-for-instrumenting-applications-for-tracing-).

**Important**: OpenTelemetry is still at its early stage. Therefore, if you run into issues when configuring Wavefront with OpenTelemetry, contact [Wavefront Technical Support](wavefront_support_feedback.html#support) for help.

Here's how it works:
{% include image.md src="images/tracing_opentelemetry_trace_exporter_data.png" width="100" %}

Follow these steps:

1. [Install the Wavefront Proxy](https://docs.wavefront.com/proxies_installing.html)
1. Configure your application to sends the trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/) for details.
1. Export the data from the OpenTelemetry Collector to the [Tanzu Observability (Wavefront) trace exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/tanzuobservabilityexporter).
1. Explore the trace data that was sent to Wavefront using the [tracing dashboards](https://docs.wavefront.com/tracing_basics.html#visualize-distributed-tracing-data-in-wavefront).
    



