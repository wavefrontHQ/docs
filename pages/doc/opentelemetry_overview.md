---
title: OpenTelemetry Overview
tags: [tracing]
permalink: opentelemetry_overview.html
summary: Learn how to send data your OpenTelemetry metrics and traces to Tanzu Observability.
---
## OpenTelemetry Integration

OpenTracing and OpenCensus have merged to form OpenTelemetry. OpenTelemetry provides a single set of APIs, libraries, agents, and collector services to capture distributed traces and metrics from your application. If your application uses OpenTelemetry, you can configure the application to send traces and metrics to Wavefront as explained below:

{{site.data.alerts.tip}}
  <p>If you are not sure on what you need to use, we recommend the following:</p>
    <ul>
      <li>
        If your application uses SpringBoot, use Spring Sleuth.
      </li>
      <li>
        If your application is already using OpenTracing, continue using OpenTracing until the OpenTelemetry libraries mature. See <a href="tracing_instrumenting_frameworks.html">Instrumenting Your App for Tracing]</a> to send traces to Wavefront when using OpenTracing.
      </li>
      <li>
        If you are a new user, and you are configuring your application to send data to Wavefront, use OpenTelemetry. If you run into issues when configuring Wavefront with OpenTelemetry, contact <a href="wavefront_support_feedback.html#support">Wavefront Technical Support</a> for help.
      </li>
    </ul>
{{site.data.alerts.end}}

## Sending Trace Data to Wavefront

If your application uses OpenTelemetry, you can configure the application to send trace data to Wavefront using the OpenTelemetry Collector or by directly sending it to the Wavefront proxy. When the data is in Wavefront, you can use our tracing dashboards to visualize any request as a trace that consists of a hierarchy of spans. This visualization helps you pinpoint where the request is spending most of its time and discover problems.

### [Recommended] Sending Data To Wavefront Proxy

Send data from your application to the Wavefront Proxy. This is the recommended approach and most simplified approach to get your data into Wavefront.

Here's how it works:
![Shows how the data flows from your application to Wavefront](images/tracing_opentelemetry_trace_exporter_data.png)

Follow these steps:

1. [Install the Wavefront Proxy](proxies_installing.html).
1. Open port 4317 on the Wavefront Proxy to send OpenTelemetry spans to Wavefront. 
  <br/>For example, on Linux, Mac, and Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file, add the line `otlpGrpcListenerPorts=4317`, and save the file.
1. Configure your application to send the trace data to the Wavefront Proxy. 
  <br/>By default, OpenTelemetry SDKs will send data over gRPC to `http://localhost:4317`. This can be changed at a per-SDK level, but there are conventions that most SDKs adhere to. For example, to customize the endpoint that your application reports OpenTelemetry data to, add `OTEL_EXPORTER_OTLP_ENDPOINT=http://wavefront-proxy.mydomain:4317` to the environment variables.
1. Explore the trace data that was sent to Wavefront using the [tracing dashboards](tracing_basics.html#visualize-distributed-tracing-data-in-wavefront).


### Sending Data To The OpenTelemetry Collector

If you have already configured your application to send data to the OpenTelemetry Collector, follow these steps:

{% include note.html content="You need to use OpenTelemetry Collector Contrib version v0.28.0 or later to export traces to Wavefront." %} 

Here's how it works:
![Shows how the data flows from your application to the OpenTelemetry Collector to Wavefront](images/tracing_opentelemetry_trace_exporter_data.png)

1. [Install the Wavefront Proxy](proxies_installing.html).
    {{site.data.alerts.note}}
      <ul>
      <li>
        Open port 30001, with <code>customTracingListenerPorts=30001</code>, for the proxy to generate span-level RED metrics.
       </li>
       <li>
         Open port 2878 to send spans and metrics to Wavefront. For example, on Linux, Mac, and Windows, open the <code>wavefront.conf</code> file, uncomment  the <code>pushListenerPorts</code> and set it to 2878. 
       </li>
       
     </ul>
    {{site.data.alerts.end}}
     
1. Configure your application to send the trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/) for details.
1. Export the data from the OpenTelemetry Collector to the Tanzu Observability (Wavefront) trace exporter:
    1. Create a directory to store all the files.
    1. Download the binary from the latest release of the [OpenTelemetry Collector project](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) to the directory you created.
    1. In the same directory, create a file named `otel_collector_config.yaml`.
    1. Copy the configurations below into the yaml file.
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
        {% include note.html content="To learn more about OpenTelemetry configurations, [OpenTelemetry Collector Configuration](https://opentelemetry.io/docs/collector/configuration/)." %}
    1. On your console, navigate to the directory and run the following command to start OpenTelemetry Collector:
        ```
        ./otelcontribcol_darwin_amd64 --config otel_collector_config.yaml
        ```
1. Explore the trace data that was sent to Wavefront using the [tracing dashboards](tracing_basics.html#visualize-distributed-tracing-data-in-wavefront).

## Sending Metrics Data to Wavefront

If your application uses OpenTelemetry, you can configure the application to send metrics data to Wavefront. Metrics data includes time series, counters, and histograms. You use the Wavefront Prometheus storage adapter and the Wavefront proxy. Once the data is in Wavefront, you can use charts and dashboards to visualize the data and create alerts.

Here's how it works:
{% include image.md src="images/tracing_opentelemetry_metrics_data.png" width="100" %}

Follow these steps:

1. [Install the Wavefront Proxy](https://docs.wavefront.com/proxies_installing.html).
   <br/>Make sure to open port 2878 to send spans and metrics to Wavefront. For example, on Linux, Mac, and Windows, open the wavefront.conf file, uncomment  the `pushListenerPorts` and set it to 2878.
1. Configure your application to send the metrics/trace data to the OpenTelemetry Collector. See the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/) for details.
1. Export the data from the OpenTelemetry Collector to the Wavefront Prometheus Storage Adapter. 

### Tutorial

This tutorial uses the OpenTelemetry Collector demo. For steps on how to configure your application to send custom OpenTelemetry metrics to Wavefront, see the [registering OpenCensus metric exporter in Java Application](#registering-opencensus-metric-exporter).

1. If you do not have a [Wavefront proxy](proxies.html) installed on your network, install a proxy.
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
    1. Open the prometheus.yaml file and add the following configurations.
        {% raw %}
        ```
        remote_write:
          - url: "http://<enter your IP address>:1234/receive"
        
        ```
{% endraw %}
        
        **Note**: The IP address and port configured in the prometheus.yaml file needs to match configurations in the Prometheus Storage Adapter configured in Step 3 below.
        
        For example, this is how the prometheus.yaml file looks:{% raw %}
        ```
        scrape_configs:
          - job_name: 'otel-collector'
          scrape_interval: 10s
          static_configs:
            - targets: ['otel-collector:8889']
            - targets: ['otel-collector:8888']

          remote_write:
            - url: "http://<enter your IP address>:1234/receive"
        ```
{% endraw %}
    
    1. Run `docker-compose up -d` to start the OpenTelemetry Collector and Prometheus Server. The Prometheus server is exposed on port `9090`.

1. Send the data from the OpenTelemetry Collector to the Wavefront Prometheus integration. This adapter takes the data and forwards it to a Wavefront proxy. 
    Run the Prometheus Storage Adapter as a docker container. The metrics sent to Wavefront has the `prom` prefix.{% raw %}
    ```
    docker run -d -p 1234:1234 wavefronthq/prometheus-storage-adapter -proxy=<enter your IP address> -proxy-port=2878 -listen=1234 -prefix=prom -convert-paths=true
    ```
{% endraw %}
    **Tip**: Enter `http://localhost:1234/health` on your browser and run it. If you see `{"Message":"OK"}`, you have successfully configured the Prometheus Storage Adapter.
  
1. Explore the data sent to Wavefront: 
    * See the metrics sent in the [Metrics browser](metrics_managing.html#metrics-browser):
        1. Log in to your Wavefront instance and select Browse > Metrics. 
        1. Search for metrics that have a prom prefix. 
{% include image.md src="images/tracing_opentelemetry_metrics.png" width="90" %}
    * You can create [charts and dashboards](ui_examine_data.html) to see the data that was sent from your application and [create alerts](alerts_manage.html).
{% include image.md src="images/tracing_opentelemetry_collector_chart.png" width="90" %}

### Registering OpenCensus Metric Exporter
Once you have configured your OpenTelemetry Collector to send metric data to Wavefront, you can use the code snippet below to register the OpenCensus metric exporter in a Java application and send custom metrics to Wavefront. See [OpenCensus documentation](https://opencensus.io/stats/) for details on OpenCensus API.
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

## Next Steps

[Try out the Tutorials](opentelemetry_java_tutorial.html) and see how you can send your data to Wavefront!
