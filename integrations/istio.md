---
title: Istio Integration
tags: [integrations list]
permalink: istio.html
summary: Learn about the Istio Integration.
---

This page provides an overview of what you can do with the Istio integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Istio integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Istio** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Istio Integration

Istio is an open platform-independent service mesh that provides traffic management, policy enforcement, and telemetry collection.
Istio Control Plane itself, is a modern, cloud-native application. The Istio components, such as service discovery (Pilot), configuration (Galley), and certificate generation (Citadel) were all written and deployed as separate microservices. The need for these components to communicate securely and be observable, provided opportunities for Istio to _“drink its own champagne”_.

Click the **Setup** tab for instructions on:

* Setting up your environment to send Istio **metrics** to Operations for Applications.
* Setting up your environment to send Istio **traces** to Operations for Applications.

This integration uses `Prometheus` to scrape Istio mesh metrics and federate them, and the `Kubernetes Metrics Collector` to collect the federated metrics from Prometheus server and forward them to Operations for Applications.
This integration also installs the dashboards. Here's a preview of the Istio Data Plane and Control Plane dashboards:

{% include image.md src="images/istio_dashboard.png" width="80" %}
{% include image.md src="images/istio_control_plane_dashboard.png" width="80" %}



## Metrics

|Metric Name|Description|
| :--- | :--- |
|istio.request.bytes.*.value|This is a DISTRIBUTION which measures HTTP request body sizes. Statistics: bucket, p50, p75, p90, p95, p99, p999, count, sum.|
|istio.request.duration.milliseconds.*.value|This is a DISTRIBUTION which measures the duration of requests. Statistics: bucket, p50, p75, p90, p95, p99, p999, count, sum.|
|istio.requests.total.value|This is a COUNTER incremented for every request handled by an Istio proxy.|
|istio.response.bytes.*.value|This is a DISTRIBUTION which measures HTTP response body sizes. Statistics: bucket, p50, p75, p90, p95, p99, p999, count, sum.|
|istio.tcp.sent.bytes.total.value|This is a DISTRIBUTION which measures HTTP response body sizes.|
|istio.tcp.received.bytes.total.value|This is a COUNTER which measures the size of total bytes received during request in case of a TCP connection.|
|istio.tcp.connections.opened.total.value|This is a COUNTER incremented for every opened connection.|
|istio.tcp.connections.closed.total.value|This is a COUNTER incremented for every closed connection.|
|pilot.services.value|The total services known to pilot.|
|pilot.virt.services.value|The total virtual services known to pilot.|
|istio.build.value|Istio component build info.|
|pilot.xds.pushes.value|Pilot build and send errors for LDS, RDS, CDS and EDS.|
|pilot.total.xds.rejects.value|The total number of XDS responses from pilot rejected by proxy.|
|pilot.xds.cds.reject.value|Pilot rejected CDS configs.|
|pilot.xds.eds.reject.value|Pilot rejected EDS.|
|pilot.xds.lds.reject.value|Pilot rejected LDS.|
|pilot.xds.rds.reject.value|Pilot rejected RDS.|
|pilot.xds.write.timeout.value|Pilot XDS response write timeouts.|
|pilot.xds.push.context.errors.value|The number of errors (timeouts) initiating push context.|
|pilot.conflict.inbound.listener.value|The number of conflicting inbound listeners.|
|pilot.total.xds.internal.errors.value|The total number of internal XDS errors in pilot.|
|pilot.conflict.outbound.listener.http.over.current.tcp.value|The number of conflicting wildcard HTTP listeners with current wildcard TCP listener.|
|pilot.conflict.outbound.listener.tcp.over.current.http.value|The number of conflicting wildcard TCP listeners with current wildcard HTTP listener.|
|pilot.conflict.outbound.listener.tcp.over.current.tcp.value|The number of conflicting TCP listeners with current TCP listener.|
|pilot.proxy.convergence.time.bucket.value|Delay in seconds between config change and a proxy receiving all required configuration.|
|pilot.proxy.queue.time.bucket.value|Time in seconds, a proxy is in the push queue before being dequeued.|
|process.cpu.seconds.total.value|Total user and system CPU time spent in seconds.|
|process.resident.memory.bytes.value|Resident memory size in bytes.|
|process.virtual.memory.bytes.value|Virtual memory size in bytes.|
|galley.validation.http.error.value|Resource validation HTTP serve errors.|
|galley.validation.failed.value|Resource validation failed.|
|galley.validation.passed.value|Resource is valid.|
|galley.validation.config.updates.value|K8s webhook configuration updates.|
|galley.validation.config.update.error.value|K8s webhook configuration update error.|
|galley.validation.config.load.value|K8s webhook configuration update error.|
|galley.validation.config.load.error.value|K8s webhook configuration (re)load error.|
|galley.validation.config.delete.error.value|K8s webhook configuration delete error.|
|citadel.server.csr.count.value|The number of CSRs received by Citadel server.|
|citadel.server.success.cert.issuance.count.value|The number of certificates issuances that have succeeded.|
|citadel.server.csr.sign.error.count.value|The number of errors occurred when signing the CSR.|
|go.goroutines.value|Number of goroutines that currently exist.|
|go.memstats.alloc.bytes.value|Number of bytes allocated and still in use.|
|go.memstats.heap.alloc.bytes.value|Bytes allocated to the heap.|
|go.memstats.heap.inuse.bytes.value|Number of bytes in the heap.|
|go.memstats.heap.sys.bytes.value|Number of bytes used by the heap.|
|go.memstats.stack.inuse.bytes.value|Number of bytes in use by the stack allocator.|


