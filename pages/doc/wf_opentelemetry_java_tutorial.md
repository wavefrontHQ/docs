---
title: OpenTelemetry and VMware Tanzu Observability Tutorial
keywords: tracing opentelemetry tutorial
tags: [tracing, tutorials]
sidebar: doc_sidebar
permalink: wf_opentelemetry_java_tutorial.html
summary: Set up your environment to send OpenTelemetry Data to Wavefront.
---
With observability, you can ask questions about your system and get answers based on the telemetry data (metrics, traces, and logs) they produce. Our tracing capabilities can help you pinpoint the root cause of failures and identify performance bottlenecks by analyzing every request as it moves from one service to the next.

So, using Tanzu Observability, how do we go about instrumenting our services to emit trace data? In addition to it supporting various instrumentation and ingestion methods for distributed tracing, Tanzu Observability now natively supports OpenTelemetry.

Wavefront has supported [instrumenting your apps for tracing with OpenTracing](tracing_java_tutorial.html) for a while. In this tutorial, we explore how to get started with OpenTelemetry **without** manually instrumenting your Java application. You'll get there in three simple steps.

## Prerequisites

* A Wavefront account. If you don't have one yet, sign up for a [free trial](https://tanzu.vmware.com/observability).
* Java 8 or newer
* Maven build tool
* Docker
* A sample application. You can download the [Otel Beachshirts](https://github.com/wavefrontHQ/otel-demo-app-java) sample application.

## Install Wavefront Proxy

[Wavefront proxy](proxies.html) ingests metrics and forwards them to the Wavefront service in a secure, fast, and reliable manner. Run the following command.

* `MYINSTANCE` is the name of your Wavefront instance, so the URL might be `https://example.wavefront.com/api/`
* Here are the instructions for [getting an API Token](wavefront_api.html#generating-an-api-token).

```
docker run -d \
  -e WAVEFRONT_URL=https://{MYINSTANCE}.wavefront.com/api/ \
  -e WAVEFRONT_TOKEN={TOKEN} \
  -e JAVA_HEAP_USAGE=512m \
  -e WAVEFRONT_PROXY_ARGS="--customTracingListenerPorts 30001" \
  -p 2878:2878 \
  -p 30001:30001 \
  wavefronthq/proxy:latest
```
See [Run a Proxy in a Container](proxies_container.html) for additional details.

## Install the OpenTelemetry Collector

Next, you install the OpenTelemetry Collector.

1. Download the binary from the latest release of the [OpenTelemetry Collector project](open-telemetry/opentelemetry-collector-contrib/releases/latest) and add it to a  directory of your choice.
2. In the same directory, create the `otel_collector_config.yaml` file and copy the following configuration into the file. (Learn more about [OpenTelemetry Collector configuration](https://opentelemetry.io/docs/collector/configuration/).)

```
receivers:
   otlp:
      protocols:
          grpc:
              endpoint: "localhost:4317"
exporters:
    tanzuobservability:
      traces:
        endpoint: "http://localhost:30001"
  # Proxy hostname and customTracing ListenerPort
processors:
    batch:
      timeout: 10s

service:
    pipelines:
      traces:
        receivers: [otlp]
        exporters: [tanzuobservability]
        processors: [batch]
```

Finally, navigate to the directory from your console and run the collector host with the config file using the `--config parameter` as follows:

```
./otelcontribcol_darwin_amd64 --config otel_collector_config.yaml
```

## Auto-instrument the Application

For instrumentation, we use the Java agent provided by OpenTelemetry, which can be attached to any Java application. This agent dynamically injects bytecode to collect telemetry data so that you don’t need to manually add instrumentation.

1. Download the sample application and navigate to the directory.
```
  git clone https://github.com/wavefrontHQ/otel-demo-app-java
  cd otel-demo-app-java
```

2. Do the install by running the following command from the root directory of the project.
```
mvn clean install
```

3. Download the [OpenTelemetry Java agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent-all.jar).

4. Attach the Java agent and start the services independently by running the following commands.

```
java -javaagent:<path to otel agent> \
-Dotel.resource.attributes=service.name=styling \
-Dotel.metrics.exporter=none \
-jar ./styling/target/styling-1.0-SNAPSHOT.jar

java -javaagent:<path to otel agent> \
-Dotel.resource.attributes=service.name=shopping \
-Dotel.metrics.exporter=none \
-jar ./shopping/target/shopping-1.0-SNAPSHOT.jar

java -javaagent:<path to otel agent> \
-Dotel.resource.attributes=service.name=delivery \
-Dotel.metrics.exporter=none \
-jar ./delivery/target/delivery-1.0-SNAPSHOT.jar
```

5. Interact with your application to generate traces. For the sample application we’ve shared here, run the command below from the root directory to send requests to services every 10 seconds.
```
  ./loadgen.sh 10
```

## Visualize the Trace Data

When Wavefront ingests the trace data that the OpenTelemetry Collector has collected, you can examine them in the UI.

**1.** Log in to your Wavefront instance and select **Applications > Application Status**.

![Data flow from shopping to styling to delivery](images/otel_in_gui.png)

Tanzu Observability gives you end-to-end visibility into the chain across services, even when those services are running in different environments. The application map shown above can help you understand interdependencies and the overall health of your application for faster root cause analysis.

**2.** Select **Applications > Service Dashboard** to can access the out-of-the-box dashboard that provides a health overview at the service level.

![Annotated screenshot of trace services and information on UI options](images/tracing_services.png)

**3.** Select **Applications > Traces** to drill down into the traces.

![Annotated traces browser with information on UI options](images/tracing_traces_browser.png)

## Next Steps


- Familiarize yourself with the tracing concepts. See [Tracing Concepts in Wavefront](trace_data_details.html) for details.
- To see Tanzu Observability in action, watch [this replay from our SpringOne 2021 keynote](https://youtu.be/QMCYmaPa_14), which shows an example of how a team can use it to get to the bottom of an application incident.
