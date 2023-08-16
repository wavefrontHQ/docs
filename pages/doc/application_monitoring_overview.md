---
title: Monitor Your Applications
tags: [applications, ebpf, traces]
sidebar: doc_sidebar
permalink: application_monitoring_overview.html
summary: Learn how you can monitor your application using eBPF or tracing.
---

We can help you auto-discover and monitor your applications that run on a Kubernetes cluster or monitor your applications and services through the traces and spans sent to our service. 

You need to select how you want to send data to our service based on where the application runs or how you have configured your application. 

## Monitor Applications Running on Kubernetes

Send eBPF data from your applications running on a Kubernetes cluster. We can then auto-discover all the services in your Kubernetes cluster.

Go to [Kubernetes App Auto-Instrumentation via Pixie](https://github.com/wavefrontHQ/observability-for-kubernetes/tree/main/operator/hack/autoinstrumentation#kubernetes-app-auto-instrumentation-via-pixie), and follow the instructions to send data and start monitoring your applications.

You can use the different dashboard and monitor your applications:

* View the services on the [Service and Application View page](service_and_application_view.html).
* See how a specific service communicates with the other service using the [Service Map](service_map.html).
* Identify potential hotspots using the [Service Dashboard](tracing_service_dashboard.html). 
* Create charts using the RED metrics. 

Example: The service map shows how a specific service communicates with other services in the application.

![Shows a screenshot of the service map.](images/app_monitoring_ebpf_service_map.png)

## Monitor OpenTelemetry Applications

Instrument your applications using OpenTelemetry and send traces and spans to our service.
* [Get an overview](https://docs.wavefront.com/opentelemetry_overview.html) of how to configure your applications that use OpenTelemetry and send data to our service. 
* The [Java tutorial](opentelemetry_java_app_tutorial.html) shows you how to auto-instrument your Java application using the OpenTelemetry Java agent and send data to our service.

Once the data is in our service, you can monitor your applications and visualize the data.

* View the services on the [Service and Application View page](service_and_application_view.html).
* See how a specific service communicates with the other service using the [Service Map](service_map.html).
* Identify potential hotspots using the [Service Dashboard](tracing_service_dashboard.html).
* Create charts using the RED metrics.
* View the traces and spans on the [Traces Browser](/tracing_traces_browser.html).
* Download the traces locally and view them later using [Offline Traces](tracing_view_offline_traces.html).

Example: View the traces and spans on the Traces Browser, and identify the spans that take a long time to complete.
![A screenshot of the traces browser that shows the traces.](images/app_monitoring_traces_browser.png)