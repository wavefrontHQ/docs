---
title: Monitor Custom App Metrics
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_custom_app_metrics_howto.html
summary: Learn how to ingest and monitor your custom application metrics.
---

By default, the Tanzu Observability by Wavefront Nozzle provides metrics for monitoring the TAS platform. For monitoring applications that run **on** the platform, the nozzle supports two models:
  * **Metric Registrar** -- A **pull-based** model based on the **Prometheus metrics format.**
  * **Wavefront Service Broker** -- A **push-based** model where applications send metrics directly to a Wavefront proxy.

The **Metric Registrar** model is recommended, because it is a simpler and more predictable pattern, but you can choose either option.  Both models have drawbacks, and for some workloads only the push-based model can be used in practice.

## Push vs Pull Models Overview

The “pull” or “scrape” model has gained popularity in recent years. The typical pull-based design involves hosting an HTTP route on your server, typically at `/metrics`, which exposes custom metrics. Another process periodically fetches the response from that route and transforms it into metrics within a metric store.

In the push model, the application instead periodically sends metrics directly to a server using authentication credentials provided to the application.

Scraping is a popular approach, because the application being monitored does not need to know anything about the metrics store, such as an endpoint or a credential.

In the scraping model, the rate of metrics collection can be centrally controlled. In a push model, applications may or may not be able to throttle their metric volume if they are overwhelming the metrics service.

The output of a `/metrics` endpoint in a scraping model is normally human readable, which can help with debugging the metrics coming from a running application.

Pushing metrics can produce more details. In the push-based model, a metric can be submitted as often as practically limits allow - possibly multiple times per second. In a scrape model, only changes since the last scrape are seen. Typically metrics data does not need to be extremely high-fidelity in order to be useful, and this periodic sampling is acceptable to most users.

Very short-lived processes **must** use a push model, because they do not run long enough to be discovered and scraped by a metrics collector.

## Metric Registrar

Tanzu Application Service supports a pull-based model for custom app metrics using the Metric Registrar component.

The Metric Registrar is a TAS component that periodically scrapes registered endpoints and forwards scraped metrics to the Loggregator Firehose. In the Tanzu Observability by Wavefront Nozzle, these metrics are then ingested in the same way as platform or service tile metrics, and become available automatically in Tanzu Observability.

To instrument an application for Metric Registrar scraping, you will typically use either a Prometheus SDK or a metrics framework built into your application stack, such as Spring Boot Actuator.

After deploying your application, you register it by using the `cf` CLI, as described in the [Using Metrics Registrar](https://docs.pivotal.io/application-service/metric-registrar/using.html) documentation. 

## Wavefront Service Broker

To implement a push-based metrics model using Tanzu Observability, you can use the Wavefront SDK for your language stack, or you can use a pluggable abstraction such as Spring Boot Actuator.

In either case, you must provide your application with a URL for a Wavefront proxy instance.

The supported way to do this using the Tanzu Observability by Wavefront Nozzle is to use the Wavefront Service Broker, create a service instance, and bind it to your application. You can then push custom metrics to the proxy from your own application code.

## Factors to Consider

### Spring Boot

Spring Boot is commonly used to build apps running on TAS. To use a VMware Tanzu solutions workbook, see [Instrumenting TAS OpenTelemetry for Spring Boot Application](https://docs.vmware.com/en/VMware-Tanzu-Reference-Architecture/services/tanzu-solutions-workbooks/solution-workbooks-TAS-OpenTelemetry-SpringBoot-TO.html).

Spring Boot Actuator supports both push and pull models, with the only difference typically being configuration changes. In that case, it becomes relatively easy to switch from push to pull or vice-versa.

### Wavefront Proxy Load

All additional custom app metrics increase the load on the Wavefront proxy. You might have to increase the count of Wavefront proxies and to deploy an IaaS load balancer to balance traffic across proxy instances.

### Loggregator Firehose and Nozzle Component Load

The Metric Registrar scrapes metrics endpoints and publishes those metrics through the Loggregator Firehose. Sending additional app metrics through the Loggregator Firehose might require scaling up the Loggregator Firehose. The Firehose can be horizontally scaled to a certain point, but eventually hits a practical limit where additional instances do not increase throughput.

The additional metrics flowing through the Firehose also increase the load on two of the Tanzu Observability by Wavefront Nozzle components that cannot be horizontally scaled - the Exporters and the Telegraf Agent. In the current versions, you can increase throughput of these components by increasing the VM size, but only to a certain point. After this point, you must limit the number of metrics or reduce scrape frequency in order to improve performance.

Most TAS environments will not encounter these scaling bottlenecks. If these scaling issues do occur, consider using the push model for sending metrics.

### Metric Naming

The Tanzu Observability by Wavefront Nozzle appends the prefix `tas.` to all metrics, including the Metric Registrar metrics. Metrics collected by using the Metric Registrar will have names with the `tas.apps` prefix, and will automatically have the `source` tag set to the same foundation name used by the platform metrics.

For push-based metrics, metric naming and specifying source and point tags must be done by the application sending the metrics or through rewrite rules at the Wavefront proxy level. Some point tags are reserved and cannot be customized by the application. For example, if the application sends tag values for `job`, `origin`, and `source_id`, they will be overwritten while being sent to Tanzu Observability.
