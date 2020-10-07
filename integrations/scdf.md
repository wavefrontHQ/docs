---
title: Spring Cloud Data Flow Integration
tags: [integrations list]
permalink: scdf.html
summary: Learn about the Wavefront Spring Cloud Data Flow Integration.
---
## Spring Cloud Data Flow Integration

Wavefront provides a comprehensive solution for monitoring [Spring Cloud Data Flow (SCDF)](https://dataflow.spring.io/). 
This integration uses the [Micrometer Wavefront registry](https://micrometer.io/docs/registry/wavefront) to collect detailed metrics from SCDF server as well as the Stream and Task data pipelines managed by the SCDF servers.

The following diagram illustrates the `Spring Cloud Data Flow` metrics collection architecture:

{% include image.md src="images/scdf_wavefront_architecture.png" width="45" %}

The Micrometer instrumentation library powers the delivery of application metrics from Spring Boot, including metrics for message rates and errors, which are critical to the monitoring of deployed event streaming and batch data pipelines in Spring Cloud Data Flow.

### Servers Monitoring

All [Spring Cloud Data Flow](https://spring.io/projects/spring-cloud-dataflow)and the [Spring Cloud Skipper](https://spring.io/projects/spring-cloud-skipper) are instrumented for Wavefront metrics collection.  
 This dashboard provides real-time visibility into the Spring Cloud Data Flow and Spring Cloud Skipper servers. 

The Spring Cloud Stream applications add additioanl `application` metrcis tag, that allow metrics aggregation by server type (SCDF or Skipper):

* `application`: The name of the Server (SCDF or Skipper applications name) to show metrics for.

### Streams Monitoring

All [Spring Cloud Stream Applications](https://cloud.spring.io/spring-cloud-stream-app-starters) are instrumented for Wavefront metrics collection.  
 
The Spring Cloud Stream applications add several, stream specific tags (below), 
that allow metrics aggregation by application type, instance, stream name, and so on:

* `stream.name`: The name of the Stream that contains the applications emitting the metrics.
* `application.name`: The `name` (or the `label`) of the application within the Stream emitting the metrics.
* `application.type`: The application role (e.g. `source`, `processor`, or `sink`) within the Stream emitting the metrics.
* `application.guid`: Unique application instance identifier. Every `application.name` can have multiple instance.
* `application.index`: Application instance ID (when available).

### Tasks Monitoring

The integration supports monitoring of [Task applications](https://spring.io/projects/spring-cloud-task) that were deployed as part of a [Task definition in Data Flow](https://dataflow.spring.io/docs/feature-guides/batch/monitoring/). 

The Spring Cloud Task applications add several task-specific tags that allow metric aggregation by application type, instance id or task name:

* `task.name`: The name of the Task application that emits the metrics.
* `task.execution.id`: The instance id of the executed task. A task can be executed many times with the same name but a different execution ID.
* `task.external.execution.id`: Task identifier inside the external platforms (e.g. Cloud Foundry or Kubernetes) where the task is run.
* `task.parent.execution.id`: If a task is run by another task the parent id is used to identify the task run it.

### Dashboards

In addition to setting up the metrics flow, this integration also installs dashboards:

* **Spring Cloud Data Flow Streams**: Performance overview for all event streaming data pipelines deployed by DataFlow. One can compare the average performance per stream, CPU, memory, message throughput, latency, and other metrics.
* **Spring Cloud Data Flow Stream Applications**: A detailed real-time performance report of all stream applications that are part of a single event streaming data pipeline. One can filter down metrics for a particular application, instance, or channel.
* **Spring Cloud Data Flow Task Applications**: A detailed real-time performance report for all Task applications.

Here's a preview of the Spring Cloud Data Flow and Skipper Server Summary dashboard:

{% include image.md src="images/scdf_servers.png" width="80" %}

Here's a preview of the Spring Cloud Data Flow Stream Summary dashboard:

{% include image.md src="images/scdf_streams.png" width="80" %}

Here's a preview of the Spring Cloud Data Flow Stream applications dashboard:

{% include image.md src="images/scdf_applications.png" width="80" %}

Here's a preview of the Spring Cloud Data Flow Task applications dashboard:

{% include image.md src="images/scdf_tasks.png" width="80" %}

## Setup

The `General Installation Instruction` section below shows how to enable the Wavefront Integration for Spring Cloud Data Flow.

The **Docker Compose Installation** section below shows how to quickly install the Spring Cloud Data Flow with Wavefront Integration on your local machine.
Setting up Spring Cloud Data Flow locally could be useful for testing and development.

### General Installation Instructions

 1. Follow the general [SCDF installation instructions](https://dataflow.spring.io/docs/installation/) for setting up Data Flow on the selected platform (e.g. Local, Kuberneted or Cloud Foundry).

 2. Set the configuration properties given below. You have several options:
 * Add the properties to your `Spring Cloud Data Flow` server configuration.
 * For the `Cloud Foundry` platform, set the properties inside the [SPRING_APPLICATION_JSON](https://dataflow.spring.io/docs/installation/cloudfoundry/cf-cli/#configuration-for-wavefront) environment variable.
 * For the `Kubernetes` platform add the properties to the `src/kubernetes/server/server-config.yaml` [configuration](https://dataflow.spring.io/docs/feature-guides/streams/monitoring/#kubernetes).
 * For the `Local` platform follow the instructions in the Docker Compose Installation section below.
{% raw %}
```yaml
management:
  metrics:
    export:
      wavefront:
        enabled: true
        api-token: YOUR_API_TOKEN
        uri: https://YOUR_CLUSTER.wavefront.com
        source: scdf-docker-compose
```
{% endraw %}

### Docker Compose Installation

Spring Cloud Data Flow provides a [Docker Compose Installation](https://dataflow.spring.io/docs/installation/local/docker/) to let you quickly install Spring Cloud Data Flow, Skipper, MySQL and Apache Kafka on your local machine and to [configure Wavefront monitoring](https://dataflow.spring.io/docs/installation/local/docker-customize/#wavefront).

 1. Download the [docker-compose.yml](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.2/spring-cloud-dataflow-server/docker-compose.yml) and [docker-compose-wavefront.yml](https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.2/spring-cloud-dataflow-server/docker-compose-wavefront.yml) files.
 2. Follow the [Data Flow with Wavefront metrics collection](https://dataflow.spring.io/docs/installation/local/docker-customize/#wavefront) installation instructions.
 3. When you stop seeing additional log messages on the command prompt, open the Spring Cloud Data Flow dashboard at http://localhost:9393/dashboard.

Here is a quick start, single-line command:
{% raw %}
```
wget -O docker-compose.yml https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.2/spring-cloud-dataflow-server/docker-compose.yml 
wget -O docker-compose-wavefront.yml https://raw.githubusercontent.com/spring-cloud/spring-cloud-dataflow/v2.6.2/spring-cloud-dataflow-server/docker-compose-wavefront.yml 

export DATAFLOW_VERSION=2.6.2 \
export SKIPPER_VERSION=2.5.2 \
export WAVEFRONT_KEY=YOUR_API_TOKEN \
export WAVEFRONT_URI=https://YOUR_CLUSTER.wavefront.com \
export WAVEFRONT_SOURCE=scdf-docker-compose \
docker-compose -f ./docker-compose.yml -f ./docker-compose-wavefront.yml up
```
{% endraw %}

Use the following environment variables to configure the Wavefront endpoint, before you start the `docker-compose`:

| Variable name      | Default value                | Description                                                                                  |
| ------------------ | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `WAVEFRONT_KEY`    | YOUR_API_TOKEN                 | Wavefront user API Key                                                                       |
| `WAVEFRONT_URI`    | https://YOUR_CLUSTER.wavefront.com     | Wavefront entry point URI                                                                    |
| `WAVEFRONT_SOURCE` | scdf-docker-compose          | Unique identifier for Wavefront to know the metrics are coming from this Data Flow installation |


## Spring Cloud Data Flow Metrics

Spring Cloud Data Flow's generic performance metrics are based on Micrometer and it is registered in Micrometer’s registry with the `spring.cloud.dataflow` prefix. 

The following table explains all the metrics in details:

Auto-configuration enables the instrumentation of requests handled by Spring MVC. When `management.metrics.web.server.request.autotime.enabled` is `true`, this instrumentation occurs for all requests.

| Metric Name | Description |
|------------|---------------|
| spring.cloud.dataflow.server.* | Metrics for all requests handled by SCDF's Spring MVC application. Statistics: avg, count, max, sum |  

## Spring Integration Metrics

[Spring Integration Metrics Documentation](https://docs.spring.io/spring-integration/reference/html/system-management.html#system-management-chapter)

Spring Integration registers micrometer timers for each `MessageHandler` and `MessageChannel` and a `counter` for each `MessageSource`.
All metrics provided by the framework are registered in Micrometer’s global registry under the `spring.integration` prefix. 
The following table explains all the metrics in details:

| Metric Name | Description |
|------------|---------------|
| spring.integration.receive (type=source)| Message sources messages received |
| spring.integration.receive (type=channel)| Messages received on pollable message channels| 
| spring.integration.send (type=handler) | Message handlers' send processing time |
| spring.integration.send (type=channel) | Message channels' send processing time |
| spring.integration.channels | Number of MessageChannels in the application |
| spring.integration.handlers | Number of MessageHandlers in the application |
| spring.integration.sources  | Number of MessageSources in the application |

## Spring Batch Metrics

[Spring Batch Metrics Documentation](https://docs.spring.io/spring-batch/docs/current/reference/html/monitoring-and-metrics.html#monitoring-and-metrics)

Spring Batch provides support for monitoring batch jobs using Micrometer. 
All metrics provided by the framework are registered in Micrometer’s global registry under the `spring.batch` prefix. 
The following table explains all the metrics in details:

| Metric Name | Description |
|------------|---------------|
| spring.batch.job (tags: name, status) |Duration of job execution.|  
| spring.batch.job.active | Currently active jobs. |  
| spring.batch.step (tags: job.name, name, status)| Duration of step execution. |  
| spring.batch.item.read (tags: job.name, step.name, status) | Duration of item reading. |  
| spring.batch.item.process (tags: job.name, step.name, status) | Duration of item processing. |  
| spring.batch.chunk.write | Duration of chunk writing |  

## Spring Cloud Task Metrics

[Spring Cloud Task Monitoring Documentation](https://dataflow.spring.io/docs/feature-guides/batch/monitoring/)

Spring Cloud Task provides support for monitoring batch jobs and short-lived task applications using Micrometer. 
All metrics provided by the framework are registered in Micrometer’s global registry under the `spring.cloud.task` prefix. 
The following table explains all the metrics in details:

| Metric Name | Description |
|------------|---------------|
| spring.cloud.task | Duration of Task execution |  
| spring.cloud.task.active | Records the run-time status of long-time lasting tasks |  

## Spring Boot Metrics

[Spring Boot Metrics Documentation](https://docs.spring.io/spring-boot/docs/2.3.2.RELEASE/reference/html/production-ready-features.html#production-ready-metrics-meter)

Spring Boot registers the following core metrics when applicable:

* JVM metrics, report utilization of:
  * Various memory and buffer pools
  * Statistics related to garbage collection
  * Threads utilization
  * Number of classes loaded/unloaded

| Metric Name | Description | 
|------------|---------------|
| jvm.buffer.count |  Number of buffer pools |
| jvm.buffer.memory.used |  Used buffer pools memory|  
| jvm.buffer.total.capacity  | Buffer pools total capacity |
| jvm.classes.loaded | Number of classes loaded |
| jvm.classes.unloaded   | Number of classes unloaded |
| jvm.gc.live.data.size   |  |
| jvm.gc.max.data.size   |  |
| jvm.gc.memory.allocated   |  |
| jvm.gc.memory.promoted   |  |
| jvm.gc.pause.* | Garbage collection pauses Statistics: avg, count, max, sum |
| jvm.memory.committed  | JVM committed memory |
| jvm.memory.max |  JMV max available memory |
| jvm.memory.used | JMV used available memory   |
| jvm.threads.daemon  | Current number of live daemon threads in this JVM  |
| jvm.threads.live | Current number of live threads in this JVM|
| jvm.threads.peak |  The peak number of threads in this JVM |
| jvm.threads.states | Reports threads states |
   
* CPU metrics

| Metric Name | Description | 
|------------|---------------|
| process.cpu.usage | Percentage of CPU usage |

* File descriptor metrics

| Metric Name | Description | 
|------------|---------------|
| process.files.max | Maximum allowed file descriptors count |
| process.files.open | Open file descriptors count |

* Log4j2 metrics: record the number of events logged to Log4j2 at each level
* Logback metrics: record the number of events logged to Logback at each level

| Metric Name | Description | 
|------------|---------------|
| logback.events |  | 

* Uptime metrics: report a gauge for uptime and a fixed gauge representing the application’s absolute start time

| Metric Name | Description | 
|------------|---------------|
| process.start.time | fixed gauge representing the application’s absolute start time|  
| process.uptime | gauge representing the application’s uptime |

* [Spring MVC Metrics](https://docs.spring.io/spring-boot/docs/2.3.2.RELEASE/reference/html/production-ready-features.html#production-ready-metrics-spring-mvc)

Auto-configuration enables the instrumentation of requests handled by Spring MVC. 
When `management.metrics.web.server.request.autotime.enabled` is `true`, this instrumentation occurs for all requests.

| Metric Name | Description | 
|------------|---------------|
| http.server.requests.*  | Statistics: avg, count, max, sum |  

* Tomcat metrics (`server.tomcat.mbeanregistry.enabled` must be set to true for all Tomcat metrics to be registered)

| Metric Name | Description | 
|------------|---------------|
| tomcat.sessions.active.current | |  
| tomcat.sessions.active.max |  |
| tomcat.sessions.alive.max |  |
| tomcat.sessions.created |  |
| tomcat.sessions.expired |  |
| tomcat.sessions.rejected |  |

