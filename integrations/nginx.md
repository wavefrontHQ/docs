---
title: NGINX Integration
tags: [integrations list]
permalink: nginx.html
summary: Learn about the NGINX Integration.
---

This page provides an overview of what you can do with the NGINX integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the NGINX integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **NGINX** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## NGINX Integration

NGINX is a popular HTTP and reverse proxy server and also function as a load balancer for HTTP, TCP, and UDP servers. This integration installs and configures Telegraf to send NGINX server and log metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the NGINX dashboard.

{% include image.md src="images/nginx_dashboard.png" width="80" %}







## Metrics


|Metric Name|Description|
| :--- | :--- |
|nginx.accepts|Total number of accepted client connections.|
|nginx.active|Current number of active client connections including `Waiting` connections|
|nginx.cache.bytes|Total number of bytes read from the proxy.|
|nginx.cache.requests|Total number of requests. |
|nginx.handled|Total number of handled connections.|
|nginx.ingress.controller.bytes.sent.*|Statistics: count, sum|
|nginx.ingress.controller.bytes.sent.bucket||
|nginx.ingress.controller.config.*|Controller config metrics.|
|nginx.ingress.controller.config.hash||
|nginx.ingress.controller.config.hash.gauge||
|nginx.ingress.controller.config.last.reload.successful||
|nginx.ingress.controller.config.last.reload.successful.gauge||
|nginx.ingress.controller.config.last.reload.successful.timestamp.seconds||
|nginx.ingress.controller.config.last.reload.successful.timestamp.seconds.gauge||
|nginx.ingress.controller.errors||
|nginx.ingress.controller.ingress.upstream.latency.seconds.*|Statistics: count, sum|
|nginx.ingress.controller.leader.election.status.gauge||
|nginx.ingress.controller.nginx.process.*|Metrics for controller processes. |
|nginx.ingress.controller.nginx.process.connections||
|nginx.ingress.controller.nginx.process.connections.gauge||
|nginx.ingress.controller.nginx.process.connections.total||
|nginx.ingress.controller.nginx.process.connections.total.counter||
|nginx.ingress.controller.nginx.process.cpu.seconds.total||
|nginx.ingress.controller.nginx.process.cpu.seconds.total.counter||
|nginx.ingress.controller.nginx.process.num.procs||
|nginx.ingress.controller.nginx.process.num.procs.gauge||
|nginx.ingress.controller.nginx.process.oldest.start.time.seconds||
|nginx.ingress.controller.nginx.process.oldest.start.time.seconds.gauge||
|nginx.ingress.controller.nginx.process.read.bytes.total||
|nginx.ingress.controller.nginx.process.read.bytes.total.counter||
|nginx.ingress.controller.nginx.process.requests.total||
|nginx.ingress.controller.nginx.process.requests.total.counter||
|nginx.ingress.controller.nginx.process.resident.memory.bytes||
|nginx.ingress.controller.nginx.process.resident.memory.bytes.gauge||
|nginx.ingress.controller.nginx.process.virtual.memory.bytes||
|nginx.ingress.controller.nginx.process.virtual.memory.bytes.gauge||
|nginx.ingress.controller.nginx.process.write.bytes.total||
|nginx.ingress.controller.nginx.process.write.bytes.total.counter||
|nginx.ingress.controller.request.*|Metrics releated to ingress controller requests. |
|nginx.ingress.controller.request.duration.seconds.*|Statistics: count, sum|
|nginx.ingress.controller.request.duration.seconds.bucket||
|nginx.ingress.controller.request.size.*|Statistics: count, sum|
|nginx.ingress.controller.request.size.bucket||
|nginx.ingress.controller.requests||
|nginx.ingress.controller.requests.counter||
|nginx.ingress.controller.response.*|Metrics related to ingress controller responses.|
|nginx.ingress.controller.response.duration.seconds.*|Statistics: count, sum|
|nginx.ingress.controller.response.duration.seconds.bucket||
|nginx.ingress.controller.response.size.*|Statistics: count, sum|
|nginx.ingress.controller.response.size.bucket||
|nginx.ingress.controller.ssl.expire.time.*|Expiration time for SSL for ingress controller. |
|nginx.ingress.controller.ssl.expire.time.seconds||
|nginx.ingress.controller.ssl.expire.time.seconds.gauge||
|nginx.ingress.controller.*|Ingress controller success metrics.|
|nginx.ingress.controller.success||
|nginx.ingress.controller.success.counter||
|nginx.reading|Number of connections that are reading client requests.|
|nginx.requests|NGINX request metrics.|
|nginx.server.*|NGINX server metrics. |
|nginx.server.bytes||
|nginx.server.cache||
|nginx.server.connections||
|nginx.server.info||
|nginx.server.requestMsec||
|nginx.server.requests||
|nginx.tail.*|NGNIX `tail` metrics|
|nginx.tail.http.version||
|nginx.tail.resp.bytes||
|nginx.upstream.*|Metrics for NGINX upstream.|
|nginx.upstream.bytes||
|nginx.upstream.requestMsec||
|nginx.upstream.requests||
|nginx.upstream.responseMsec||
|nginx.vts.exporter.build.info||
|nginx.waiting|Number of keep-alive connections waiting for work.|
|nginx.writing|Number of connections that are waiting for upstream responses and/or writing responses.|

