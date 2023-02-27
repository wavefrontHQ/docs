---
title: How to Monitor Custom App Metrics on TAS with Tanzu Observability
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_tas_custom_app_metrics_howto.html
summary: How to get your custom application metrics to appear in Tanzu Observability by Wavefront.
---

Out of the box, the Wavefront Nozzle for TAS provides metrics for monitoring the TAS platform. For monitoring applications running **on** the platform, the Nozzle supports two approaches:

1. **Metrics Registrar:** a **pull-based** model based on the **Prometheus metrics format**
1. **Wavefront Service Broker:** a **push-based** model where applications send metrics directly to a Wavefront Proxy.

**We recommend the Metrics Registrar approach** as a simpler and more predictable pattern, but teams may choose either option. Both have drawbacks, and for some workloads only the push method can be used in practice.

## Push vs Pull Models Generally

The “pull” or “scrape” model has gained popularity in recent years. The typical pull-based design involves hosting an HTTP route on your server, typically at `/metrics`, which exposes custom metrics. Another process periodically fetches the response from that route and transforms it into metrics within a metric store.

In the push model, the application instead periodically sends metrics directly to a server using authentication credentials provided to the application.

Scraping is a popular approach, because the application being monitored does not need to know anything about the metrics store, such as an endpoint or a credential.

In the scraping model, the rate of metrics collection can be centrally controlled. In a push model, applications may or may not be able to throttle their metric volume if they are overwhelming the metrics service.

The output of a `/metrics` endpoint in a scraping model is normally human readable, which can help with debugging the metrics coming from a running application.

Pushing metrics can produce more detail; in the push model, a metric can be submitted as often as practically limits allow - possibly multiple times per second. In a scrape model, only changes since the last scrape are seen. Typically metrics data does not need to be extremely high-fidelity in order to be useful, and this periodic sampling is acceptable to most users.

Very short-lived processes **must** use a push model, because they do not run long enough to be discovered and scraped by a metrics collector.

## Metrics Registrar

TAS supports a pull model for custom app metrics using the “Metrics Registrar” component.

The metrics registrar is a TAS component that periodically scrapes registered endpoints and forwards scraped metrics to the Loggregator Firehose. In the Wavefront Nozzle, these metrics are then ingested in the same way as platform or service tile metrics, and become visible in Wavefront automatically.

To instrument an application for metrics registrar scraping, you will typically use either a prometheus SDK or an metrics framework built into your application stack, such as Spring Boot Actuator.

After deploying your application, you register it using the `cf` CLI, as described in the documentation: [https://docs.pivotal.io/application-service/metric-registrar/using.html](https://docs.pivotal.io/application-service/metric-registrar/using.html).

## Wavefront Service Broker

To implement a push-based metrics pattern using Wavefront, you can use the Wavefront SDK for your language stack, or you can use a pluggable abstraction like Spring Boot Actuator.

In either case, you will need to provide your application with a URL for a wavefront proxy instance.

The supported way to do this using the Wavefront Nozzle for TAS is to use the Wavefront Service Broker to create a service instance and bind it to your application. You can then push custom metrics to the proxy from your own application code.

## Factors to Consider

### Spring Boot

Spring Boot is commonly used to build apps running on TAS.

Spring Boot Actuator supports both push and pull models, with the only difference typically being configuration changes. In that case, it becomes relatively easy to switch from push to pull or vice-versa.

### Wavefront Proxy Load

All additional custom app metrics increase the load on the Wavefront Proxy. It may be necessary to increase the count of wavefront proxy instances and to deploy an IaaS load balancer to balance traffic across proxy instances.

### Loggregator Firehose and Nozzle Component Load

The Metrics Registrar scrapes metrics endpoints and publishes those metrics through the Loggregator Firehose. Sending additional app metrics through the Loggregator Firehose may require scaling up the Loggregator Firehose. The Firehose can be horizontally scaled to a certain point, but eventually hits a practical limit where additional instances do not increase throughput.

The additional metrics flowing through the firehose will also increase load on two Nozzle components that cannot be horizontally scaled - the Exporters and the Telegraf Agent. In future versions, it may be possible to horizontally scale the exporters. In current versions, you can increase throughput of these components by increasing VM size, but only to a certain point. After this point, you must limit the number of metrics or reduce scrape frequency in order to improve performance.

Most TAS environments will not encounter these scaling bottlenecks. If these scaling issues do occur, this may be a reason to use the push model for sending metrics instead.

### Metric Naming

The Nozzle appends the prefix `tas.` to all metrics, including Metrics Registrar metrics. Metrics collected via the Metrics Registrar will have names starting with `tas.apps`, and will automatically have the "source" tag set to the same foundation name used by platform metrics.

For push-based metrics, metric naming and specifying source and point tags must be done by the application sending the metric or through rewrite rules at the wavefront proxy level. Some point tags are reserved and cannot be customized by the application. For example, if the application sends tag values for “job", "origin" and "source_id", they will be overwritten while being sent to Wavefront.
