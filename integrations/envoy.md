---
title: Envoy Proxy Integration
tags: [integrations list]
permalink: envoy.html
summary: Learn about the Envoy Proxy Integration.
---
## Envoy Proxy Integration

Envoy Proxy is a modern, high performance service proxy. It adds resilience and observability to your services. By setting up this integration, you can send Envoy metrics into Wavefront.

1. **Envoy Proxy**: This integration installs and configures Telegraf to send Envoy Proxy metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).
2. **Envoy Proxy on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape Envoy metrics using auto-discovery and annotation based discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
  * Envoy Proxy
  * Envoy Proxy on Kubernetes

Here's a screenshot of Envoy Proxy dashboard:

{% include image.md src="images/envoy_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Envoy Proxy Setup

This integration uses Telegraf's Prometheus input plugin to fetch the metrics from Envoy Proxy and push them to Wavefront. If you've already installed Telegraf on your server, you can skip to Step 2.



### Step 1: Install the Telegraf Agent

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2: Enable the Prometheus Input Plugin

Create a file called `envoy.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
    # Read metrics exposed by Envoy Proxy
    [[inputs.prometheus]]
      urls = ["http://<envoy_proxy_admin_server_url>/stats?format=prometheus"]
   ```
{% endraw %}

### Step 3: Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.
  
## Envoy Proxy on Kubernetes

This integration uses the [annotation based discovery](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md#annotation-based-discovery) feature in Wavefront Collector to monitor Envoy proxy on Kubernetes. If you do not have the Wavefront Collector for Kubernetes installed, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install). You can check the status of the Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster on the `Setup` tab of the Kubernetes integration.

### Steps to Annotate Envoy Proxy Deployment

1. Make sure that auto discovery `enableDiscovery: true` and annotation based discovery `discovery.disable_annotation_discovery: false` are enabled in the Wavefront Collector ConfigMap. They should be enabled by default.
**NOTE**: The Wavefront Collector scrapes all the pods that have Prometheus annotation enabled.
2. Annotate the Envoy pods so that they can be discovered by Wavefront Collector. Assuming that the admin `port_value` in Envoy ConfigMap is `9901`, run:{% raw %}
```
kubectl annotate pods <pod-name> prometheus.io/scrape=true prometheus.io/port=9901 prometheus.io/path=/stats/prometheus
```
{% endraw %}

Refer [here](https://github.com/wavefrontHQ/integrations/tree/master/envoy) to see a sample Envoy Proxy Deployment and ConfigMap.



## Metrics


|Metric Name|Description|
| :--- | :--- |
|envoy.cluster.assignment.stale.counter|Stale assignments|
|envoy.cluster.assignment.timeout.received.counter|Timed out assignments|
|envoy.cluster.bind.errors.counter|Bind errors.|
|envoy.cluster.circuit.breakers.*|Circuit breaker metrics.Envoy supports various types of fully distributed (not coordinated) circuit breaking.|
|envoy.cluster.circuit.breakers.default.cx.open.gauge||
|envoy.cluster.circuit.breakers.default.cx.pool.open.gauge||
|envoy.cluster.circuit.breakers.default.rq.open.gauge||
|envoy.cluster.circuit.breakers.default.rq.pending.open.gauge||
|envoy.cluster.circuit.breakers.default.rq.retry.open.gauge||
|envoy.cluster.circuit.breakers.high.cx.open.gauge||
|envoy.cluster.circuit.breakers.high.cx.pool.open.gauge||
|envoy.cluster.circuit.breakers.high.rq.open.gauge||
|envoy.cluster.circuit.breakers.high.rq.pending.open.gauge||
|envoy.cluster.circuit.breakers.high.rq.retry.open.gauge||
|envoy.cluster.client.ssl.socket.factory.*|Metrics related to SSL socket.|
|envoy.cluster.client.ssl.socket.factory.downstream.context.secrets.not.ready.counter||
|envoy.cluster.client.ssl.socket.factory.ssl.context.update.by.sds.counter||
|envoy.cluster.client.ssl.socket.factory.upstream.context.secrets.not.ready.counter||
|envoy.cluster.control.plane.*|Control plane metrics|
|envoy.cluster.control.plane.connected.state.gauge||
|envoy.cluster.control.plane.pending.requests.gauge||
|envoy.cluster.control.plane.rate.limit.enforced.counter||
|envoy.cluster.default.total.match.count.counter|Total match count.|
|envoy.cluster.external.upstream.rq.*|Router metrics.|
|envoy.cluster.external.upstream.rq.completed.counter||
|envoy.cluster.external.upstream.rq.counter||
|envoy.cluster.external.upstream.rq.time.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.cluster.external.upstream.rq.time.-Inf||
|envoy.cluster.external.upstream.rq.time.1.8e-06||
|envoy.cluster.external.upstream.rq.time.100||
|envoy.cluster.external.upstream.rq.time.1000||
|envoy.cluster.external.upstream.rq.time.10000||
|envoy.cluster.external.upstream.rq.time.25||
|envoy.cluster.external.upstream.rq.time.250||
|envoy.cluster.external.upstream.rq.time.2500||
|envoy.cluster.external.upstream.rq.time.3.6e-06||
|envoy.cluster.external.upstream.rq.time.30000||
|envoy.cluster.external.upstream.rq.time.300000||
|envoy.cluster.external.upstream.rq.time.50||
|envoy.cluster.external.upstream.rq.time.500||
|envoy.cluster.external.upstream.rq.time.5000||
|envoy.cluster.external.upstream.rq.time.60000||
|envoy.cluster.external.upstream.rq.time.600000||
|envoy.cluster.external.upstream.rq.time.bucket||
|envoy.cluster.external.upstream.rq.xx.counter||
|envoy.cluster.grpc.web.*|gRP-Web metrics. gRPC-Web is supported by a filter that allows a gRPC-Web client to send requests to Envoy over HTTP/1.1 and get proxied to a gRPC server.|
|envoy.cluster.grpc.web.auth.Authenticator.Authenticate.success.counter||
|envoy.cluster.grpc.web.auth.Authenticator.Authenticate.total.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetTopKSlowVCOps.0.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetTopKSlowVCOps.14.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetTopKSlowVCOps.2.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetTopKSlowVCOps.failure.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetTopKSlowVCOps.success.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetTopKSlowVCOps.total.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsFrequency.0.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsFrequency.14.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsFrequency.2.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsFrequency.failure.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsFrequency.success.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsFrequency.total.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsStats.0.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsStats.14.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsStats.2.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsStats.failure.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsStats.success.counter||
|envoy.cluster.grpc.web.eda.VCOpsEDA.GetVCOpsStats.total.counter||
|envoy.cluster.grpc.web.health.Health.GetFleetHealthSummary.0.counter||
|envoy.cluster.grpc.web.health.Health.GetFleetHealthSummary.14.counter||
|envoy.cluster.grpc.web.health.Health.GetFleetHealthSummary.failure.counter||
|envoy.cluster.grpc.web.health.Health.GetFleetHealthSummary.success.counter||
|envoy.cluster.grpc.web.health.Health.GetFleetHealthSummary.total.counter||
|envoy.cluster.grpc.web.health.Health.GetRegionWiseHealthSummary.0.counter||
|envoy.cluster.grpc.web.health.Health.GetRegionWiseHealthSummary.14.counter||
|envoy.cluster.grpc.web.health.Health.GetRegionWiseHealthSummary.failure.counter||
|envoy.cluster.grpc.web.health.Health.GetRegionWiseHealthSummary.success.counter||
|envoy.cluster.grpc.web.health.Health.GetRegionWiseHealthSummary.total.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCComponentHealth.0.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCComponentHealth.success.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCComponentHealth.total.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCHealth.0.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCHealth.2.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCHealth.failure.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCHealth.success.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCHealth.total.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCOverallHealth.0.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCOverallHealth.success.counter||
|envoy.cluster.grpc.web.health.Health.GetSDDCOverallHealth.total.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetOrg.0.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetOrg.success.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetOrg.total.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetSDDC.0.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetSDDC.2.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetSDDC.failure.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetSDDC.success.counter||
|envoy.cluster.grpc.web.vmc.VMC.GetSDDC.total.counter||
|envoy.cluster.http*.*|Connection manager metrics.|
|envoy.cluster.http1.metadata.not.supported.error.counter||
|envoy.cluster.http1.response.flood.counter||
|envoy.cluster.http2.header.overflow.counter||
|envoy.cluster.http2.headers.cb.no.stream.counter||
|envoy.cluster.http2.inbound.empty.frames.flood.counter||
|envoy.cluster.http2.inbound.priority.frames.flood.counter||
|envoy.cluster.http2.inbound.window.update.frames.flood.counter||
|envoy.cluster.http2.outbound.control.flood.counter||
|envoy.cluster.http2.outbound.flood.counter||
|envoy.cluster.http2.rx.messaging.error.counter||
|envoy.cluster.http2.rx.reset.counter||
|envoy.cluster.http2.too.many.header.frames.counter||
|envoy.cluster.http2.trailers.counter||
|envoy.cluster.http2.tx.reset.counter||
|envoy.cluster.init.fetch.timeout.counter|Initialization timout for the cluster.|
|envoy.cluster.internal.upstream.rq.*|Internal router metrics. |
|envoy.cluster.internal.upstream.rq.completed.counter||
|envoy.cluster.internal.upstream.rq.counter||
|envoy.cluster.internal.upstream.rq.time.count||
|envoy.cluster.internal.upstream.rq.time.sum||
|envoy.cluster.internal.upstream.rq.time.bucket||
|envoy.cluster.internal.upstream.rq.xx.counter||
|envoy.cluster.lb.*|Load balancer metrics.|
|envoy.cluster.lb.healthy.panic.counter||
|envoy.cluster.lb.local.cluster.not.ok.counter||
|envoy.cluster.lb.recalculate.zone.structures.counter||
|envoy.cluster.lb.subsets.active.gauge||
|envoy.cluster.lb.subsets.created.counter||
|envoy.cluster.lb.subsets.fallback.counter||
|envoy.cluster.lb.subsets.fallback.panic.counter||
|envoy.cluster.lb.subsets.removed.counter||
|envoy.cluster.lb.subsets.selected.counter||
|envoy.cluster.lb.zone.cluster.too.small.counter||
|envoy.cluster.lb.zone.no.capacity.left.counter||
|envoy.cluster.lb.zone.number.differs.counter||
|envoy.cluster.lb.zone.routing.all.directly.counter||
|envoy.cluster.lb.zone.routing.cross.zone.counter||
|envoy.cluster.lb.zone.routing.sampled.counter||
|envoy.cluster.manager.*|Cluster manager metrics. Envoy’s cluster manager manages all configured upstream clusters. Just as the Envoy configuration can contain any number of listeners, the configuration can also contain any number of independently configured upstream clusters.|
|envoy.cluster.manager.active.clusters.gauge||
|envoy.cluster.manager.cds.control.plane.connected.state.gauge||
|envoy.cluster.manager.cds.control.plane.pending.requests.gauge||
|envoy.cluster.manager.cds.control.plane.rate.limit.enforced.counter||
|envoy.cluster.manager.cds.init.fetch.timeout.counter||
|envoy.cluster.manager.cds.update.attempt.counter||
|envoy.cluster.manager.cds.update.failure.counter||
|envoy.cluster.manager.cds.update.rejected.counter||
|envoy.cluster.manager.cds.update.success.counter||
|envoy.cluster.manager.cds.version.gauge||
|envoy.cluster.manager.cluster.added.counter||
|envoy.cluster.manager.cluster.modified.counter||
|envoy.cluster.manager.cluster.removed.counter||
|envoy.cluster.manager.cluster.updated.counter||
|envoy.cluster.manager.cluster.updated.via.merge.counter||
|envoy.cluster.manager.update.merge.cancelled.counter||
|envoy.cluster.manager.update.out.of.merge.window.counter||
|envoy.cluster.manager.warming.clusters.gauge||
|envoy.cluster.max.host.weight.gauge|Maximum number of entries per host when useng the Maglev load balancer.|
|envoy.cluster.membership.*|Cluster membership metrics. |
|envoy.cluster.membership.change.counter||
|envoy.cluster.membership.degraded.gauge||
|envoy.cluster.membership.excluded.gauge||
|envoy.cluster.membership.healthy.gauge||
|envoy.cluster.membership.total.gauge||
|envoy.cluster.original.dst.host.invalid.counter|Total number of invalid hosts passed to original destination load balancer|
|envoy.cluster.retry.or.shadow.abandoned.counter|Total number of times shadowing or retry buffering was canceled due to buffer limits|
|envoy.cluster.ssl.*|SSL-related metrics. |
|envoy.cluster.ssl.ciphers.counter||
|envoy.cluster.ssl.connection.error.counter||
|envoy.cluster.ssl.curves.X25519.counter||
|envoy.cluster.ssl.fail.verify.cert.hash.counter||
|envoy.cluster.ssl.fail.verify.error.counter||
|envoy.cluster.ssl.fail.verify.no.cert.counter||
|envoy.cluster.ssl.fail.verify.san.counter||
|envoy.cluster.ssl.handshake.counter||
|envoy.cluster.ssl.no.certificate.counter||
|envoy.cluster.ssl.session.reused.counter||
|envoy.cluster.ssl.sigalgs.unknown.ssl.algorithm.counter||
|envoy.cluster.ssl.versions.TLSv1.2.counter||
|envoy.cluster.update.*|Metrics related to cluster updates|
|envoy.cluster.update.attempt.counter||
|envoy.cluster.update.empty.counter||
|envoy.cluster.update.failure.counter||
|envoy.cluster.update.no.rebuild.counter||
|envoy.cluster.update.rejected.counter||
|envoy.cluster.update.success.counter||
|envoy.cluster.upstream.*|Metrics about upstream cluster connections.|
|envoy.cluster.upstream.cx.active.gauge||
|envoy.cluster.upstream.cx.close.notify.counter||
|envoy.cluster.upstream.cx.connect.attempts.exceeded.counter||
|envoy.cluster.upstream.cx.connect.fail.counter||
|envoy.cluster.upstream.cx.connect.ms.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.cluster.upstream.cx.connect.ms.-Inf||
|envoy.cluster.upstream.cx.connect.ms.1.8e-06||
|envoy.cluster.upstream.cx.connect.ms.100||
|envoy.cluster.upstream.cx.connect.ms.1000||
|envoy.cluster.upstream.cx.connect.ms.10000||
|envoy.cluster.upstream.cx.connect.ms.25||
|envoy.cluster.upstream.cx.connect.ms.250||
|envoy.cluster.upstream.cx.connect.ms.2500||
|envoy.cluster.upstream.cx.connect.ms.3.6e-06||
|envoy.cluster.upstream.cx.connect.ms.30000||
|envoy.cluster.upstream.cx.connect.ms.300000||
|envoy.cluster.upstream.cx.connect.ms.50||
|envoy.cluster.upstream.cx.connect.ms.500||
|envoy.cluster.upstream.cx.connect.ms.5000||
|envoy.cluster.upstream.cx.connect.ms.60000||
|envoy.cluster.upstream.cx.connect.ms.600000||
|envoy.cluster.upstream.cx.connect.ms.bucket||
|envoy.cluster.upstream.cx.connect.timeout.counter||
|envoy.cluster.upstream.cx.destroy.counter||
|envoy.cluster.upstream.cx.destroy.local.counter||
|envoy.cluster.upstream.cx.destroy.local.with.active.rq.counter||
|envoy.cluster.upstream.cx.destroy.remote.counter||
|envoy.cluster.upstream.cx.destroy.remote.with.active.rq.counter||
|envoy.cluster.upstream.cx.destroy.with.active.rq.counter||
|envoy.cluster.upstream.cx.http1.total.counter||
|envoy.cluster.upstream.cx.http2.total.counter||
|envoy.cluster.upstream.cx.idle.timeout.counter||
|envoy.cluster.upstream.cx.length.ms.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.cluster.upstream.cx.length.ms.-Inf||
|envoy.cluster.upstream.cx.length.ms.1.8e-06||
|envoy.cluster.upstream.cx.length.ms.100||
|envoy.cluster.upstream.cx.length.ms.1000||
|envoy.cluster.upstream.cx.length.ms.10000||
|envoy.cluster.upstream.cx.length.ms.25||
|envoy.cluster.upstream.cx.length.ms.250||
|envoy.cluster.upstream.cx.length.ms.2500||
|envoy.cluster.upstream.cx.length.ms.3.6e-06||
|envoy.cluster.upstream.cx.length.ms.30000||
|envoy.cluster.upstream.cx.length.ms.300000||
|envoy.cluster.upstream.cx.length.ms.50||
|envoy.cluster.upstream.cx.length.ms.500||
|envoy.cluster.upstream.cx.length.ms.5000||
|envoy.cluster.upstream.cx.length.ms.60000||
|envoy.cluster.upstream.cx.length.ms.600000||
|envoy.cluster.upstream.cx.length.ms.bucket||
|envoy.cluster.upstream.cx.max.requests.counter||
|envoy.cluster.upstream.cx.none.healthy.counter||
|envoy.cluster.upstream.cx.overflow.counter||
|envoy.cluster.upstream.cx.pool.overflow.counter||
|envoy.cluster.upstream.cx.protocol.error.counter||
|envoy.cluster.upstream.cx.rx.bytes.buffered.gauge||
|envoy.cluster.upstream.cx.rx.bytes.total.counter||
|envoy.cluster.upstream.cx.total.counter||
|envoy.cluster.upstream.cx.tx.bytes.buffered.gauge||
|envoy.cluster.upstream.cx.tx.bytes.total.counter||
|envoy.cluster.upstream.flow.control.backed.up.total.counter||
|envoy.cluster.upstream.flow.control.drained.total.counter||
|envoy.cluster.upstream.flow.control.paused.reading.total.counter||
|envoy.cluster.upstream.flow.control.resumed.reading.total.counter||
|envoy.cluster.upstream.internal.redirect.failed.total.counter||
|envoy.cluster.upstream.internal.redirect.succeeded.total.counter||
|envoy.cluster.upstream.rq.active.gauge||
|envoy.cluster.upstream.rq.cancelled.counter||
|envoy.cluster.upstream.rq.completed.counter||
|envoy.cluster.upstream.rq.counter||
|envoy.cluster.upstream.rq.maintenance.mode.counter||
|envoy.cluster.upstream.rq.pending.active.gauge||
|envoy.cluster.upstream.rq.pending.failure.eject.counter||
|envoy.cluster.upstream.rq.pending.overflow.counter||
|envoy.cluster.upstream.rq.pending.total.counter||
|envoy.cluster.upstream.rq.per.try.timeout.counter||
|envoy.cluster.upstream.rq.retry.counter||
|envoy.cluster.upstream.rq.retry.overflow.counter||
|envoy.cluster.upstream.rq.retry.success.counter||
|envoy.cluster.upstream.rq.rx.reset.counter||
|envoy.cluster.upstream.rq.time.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.cluster.upstream.rq.time.-Inf||
|envoy.cluster.upstream.rq.time.1.8e-06||
|envoy.cluster.upstream.rq.time.100||
|envoy.cluster.upstream.rq.time.1000||
|envoy.cluster.upstream.rq.time.10000||
|envoy.cluster.upstream.rq.time.25||
|envoy.cluster.upstream.rq.time.250||
|envoy.cluster.upstream.rq.time.2500||
|envoy.cluster.upstream.rq.time.3.6e-06||
|envoy.cluster.upstream.rq.time.30000||
|envoy.cluster.upstream.rq.time.300000||
|envoy.cluster.upstream.rq.time.50||
|envoy.cluster.upstream.rq.time.500||
|envoy.cluster.upstream.rq.time.5000||
|envoy.cluster.upstream.rq.time.60000||
|envoy.cluster.upstream.rq.time.600000||
|envoy.cluster.upstream.rq.time.bucket||
|envoy.cluster.upstream.rq.timeout.counter||
|envoy.cluster.upstream.rq.total.counter||
|envoy.cluster.upstream.rq.tx.reset.counter||
|envoy.cluster.upstream.rq.xx.counter||
|envoy.cluster.version.gauge|Cluster version metric. |
|envoy.control.plane.*|Control plane metrics.|
|envoy.control.plane.connected.state.gauge||
|envoy.control.plane.pending.requests.gauge||
|envoy.control.plane.rate.limit.enforced.counter||
|envoy.filesystem.*|Filesystem metrics.|
|envoy.filesystem.flushed.by.timer.counter||
|envoy.filesystem.reopen.failed.counter||
|envoy.filesystem.write.buffered.counter||
|envoy.filesystem.write.completed.counter||
|envoy.filesystem.write.failed.counter||
|envoy.filesystem.write.total.buffered.gauge||
|envoy.http.cors.origin.*|CORS (Cross-Origin Resource Sharing) metrics.|
|envoy.http.cors.origin.invalid.counter||
|envoy.http.cors.origin.valid.counter||
|envoy.http.downstream.cx.*|HTTP downstream connection metrics. |
|envoy.http.downstream.cx.active.gauge||
|envoy.http.downstream.cx.delayed.close.timeout.counter||
|envoy.http.downstream.cx.destroy.active.rq.counter||
|envoy.http.downstream.cx.destroy.counter||
|envoy.http.downstream.cx.destroy.local.active.rq.counter||
|envoy.http.downstream.cx.destroy.local.counter||
|envoy.http.downstream.cx.destroy.remote.active.rq.counter||
|envoy.http.downstream.cx.destroy.remote.counter||
|envoy.http.downstream.cx.drain.close.counter||
|envoy.http.downstream.cx.http1.active.gauge||
|envoy.http.downstream.cx.http1.total.counter||
|envoy.http.downstream.cx.http2.active.gauge||
|envoy.http.downstream.cx.http2.total.counter||
|envoy.http.downstream.cx.http3.active.gauge||
|envoy.http.downstream.cx.http3.total.counter||
|envoy.http.downstream.cx.idle.timeout.counter||
|envoy.http.downstream.cx.length.ms.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.http.downstream.cx.length.ms.-Inf||
|envoy.http.downstream.cx.length.ms.1.8e-06||
|envoy.http.downstream.cx.length.ms.100||
|envoy.http.downstream.cx.length.ms.1000||
|envoy.http.downstream.cx.length.ms.10000||
|envoy.http.downstream.cx.length.ms.25||
|envoy.http.downstream.cx.length.ms.250||
|envoy.http.downstream.cx.length.ms.2500||
|envoy.http.downstream.cx.length.ms.3.6e-06||
|envoy.http.downstream.cx.length.ms.30000||
|envoy.http.downstream.cx.length.ms.300000||
|envoy.http.downstream.cx.length.ms.50||
|envoy.http.downstream.cx.length.ms.500||
|envoy.http.downstream.cx.length.ms.5000||
|envoy.http.downstream.cx.length.ms.60000||
|envoy.http.downstream.cx.length.ms.600000||
|envoy.http.downstream.cx.length.ms.bucket||
|envoy.http.downstream.cx.max.duration.reached.counter||
|envoy.http.downstream.cx.overload.disable.keepalive.counter||
|envoy.http.downstream.cx.protocol.error.counter||
|envoy.http.downstream.cx.rx.bytes.buffered.gauge||
|envoy.http.downstream.cx.rx.bytes.total.counter||
|envoy.http.downstream.cx.ssl.active.gauge||
|envoy.http.downstream.cx.ssl.total.counter||
|envoy.http.downstream.cx.total.counter||
|envoy.http.downstream.cx.tx.bytes.buffered.gauge||
|envoy.http.downstream.cx.tx.bytes.total.counter||
|envoy.http.downstream.cx.upgrades.active.gauge||
|envoy.http.downstream.cx.upgrades.total.counter||
|envoy.http.downstream.flow.control.paused.reading.total.counter||
|envoy.http.downstream.flow.control.resumed.reading.total.counter||
|envoy.http.downstream.rq.*|Downstream router queue metrics for HTTP. |
|envoy.http.downstream.rq.active.gauge||
|envoy.http.downstream.rq.completed.counter||
|envoy.http.downstream.rq.http1.total.counter||
|envoy.http.downstream.rq.http2.total.counter||
|envoy.http.downstream.rq.http3.total.counter||
|envoy.http.downstream.rq.idle.timeout.counter||
|envoy.http.downstream.rq.non.relative.path.counter||
|envoy.http.downstream.rq.overload.close.counter||
|envoy.http.downstream.rq.response.before.rq.complete.counter||
|envoy.http.downstream.rq.rx.reset.counter||
|envoy.http.downstream.rq.time.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.http.downstream.rq.time.-Inf||
|envoy.http.downstream.rq.time.1.8e-06||
|envoy.http.downstream.rq.time.100||
|envoy.http.downstream.rq.time.1000||
|envoy.http.downstream.rq.time.10000||
|envoy.http.downstream.rq.time.25||
|envoy.http.downstream.rq.time.250||
|envoy.http.downstream.rq.time.2500||
|envoy.http.downstream.rq.time.3.6e-06||
|envoy.http.downstream.rq.time.30000||
|envoy.http.downstream.rq.time.300000||
|envoy.http.downstream.rq.time.50||
|envoy.http.downstream.rq.time.500||
|envoy.http.downstream.rq.time.5000||
|envoy.http.downstream.rq.time.60000||
|envoy.http.downstream.rq.time.600000||
|envoy.http.downstream.rq.time.bucket||
|envoy.http.downstream.rq.timeout.counter||
|envoy.http.downstream.rq.too.large.counter||
|envoy.http.downstream.rq.total.counter||
|envoy.http.downstream.rq.tx.reset.counter||
|envoy.http.downstream.rq.ws.on.non.ws.route.counter||
|envoy.http.downstream.rq.xx.counter||
|envoy.http.gzip.*|Metrics about the gzip HTTP filter, which enables Envoy to compress dispatched data from an upstream service upon client request. |
|envoy.http.gzip.compressed.counter||
|envoy.http.gzip.content.length.too.small.counter||
|envoy.http.gzip.header.gzip.counter||
|envoy.http.gzip.header.identity.counter||
|envoy.http.gzip.header.not.valid.counter||
|envoy.http.gzip.header.wildcard.counter||
|envoy.http.gzip.no.accept.header.counter||
|envoy.http.gzip.not.compressed.counter||
|envoy.http.gzip.not.compressed.etag.counter||
|envoy.http.gzip.total.compressed.bytes.counter||
|envoy.http.gzip.total.uncompressed.bytes.counter||
|envoy.http.no.cluster.counter|Number of HTTP connections that did not find a cluster. |
|envoy.http.no.route.counter|Number of HTTP connections that did not find a route.|
|envoy.http.rds.*|Metrics for HTTP route configuration using RDS. For those connections, the connection manager’s route table is dynamically loaded via the RDS API.|
|envoy.http.rds.config.reload.counter||
|envoy.http.rds.connected.state.gauge||
|envoy.http.rds.init.fetch.timeout.counter||
|envoy.http.rds.pending.requests.gauge||
|envoy.http.rds.rate.limit.enforced.counter||
|envoy.http.rds.update.attempt.counter||
|envoy.http.rds.update.empty.counter||
|envoy.http.rds.update.failure.counter||
|envoy.http.rds.update.rejected.counter||
|envoy.http.rds.update.success.counter||
|envoy.http.rds.version.gauge||
|envoy.http.rq.*|Metrics for HTTP connections that use RQ (Redis Queue), a simple Python library for queueing jobs|
|envoy.http.rq.direct.response.counter||
|envoy.http.rq.redirect.counter||
|envoy.http.rq.reset.after.downstream.response.started.counter||
|envoy.http.rq.retry.skipped.request.not.complete.counter||
|envoy.http.rq.total.counter||
|envoy.http.rq.too.large.counter||
|envoy.http.tracing.*|HTTP tracing metrics. |
|envoy.http.tracing.client.enabled.counter||
|envoy.http.tracing.health.check.counter||
|envoy.http.tracing.not.traceable.counter||
|envoy.http.tracing.random.sampling.counter||
|envoy.http.tracing.service.forced.counter||
|envoy.http.user.agent.downstream.cx.*|Metrics for user agent downstream connections.|
|envoy.http.user.agent.downstream.cx.destroy.remote.active.rq.counter||
|envoy.http.user.agent.downstream.cx.length.ms.count||
|envoy.http.user.agent.downstream.cx.length.ms.sum||
|envoy.http.user.agent.downstream.cx.length.ms.bucket||
|envoy.http.user.agent.downstream.cx.total.counter||
|envoy.http.user.agent.downstream.rq.total.counter||
|envoy.http*.*|Statistics for HTTP1 and HTTP2 requests. |
|envoy.http1.metadata.not.supported.error.counter||
|envoy.http1.response.flood.counter||
|envoy.http2.header.overflow.counter||
|envoy.http2.headers.cb.no.stream.counter||
|envoy.http2.inbound.empty.frames.flood.counter||
|envoy.http2.inbound.priority.frames.flood.counter||
|envoy.http2.inbound.window.update.frames.flood.counter||
|envoy.http2.outbound.control.flood.counter||
|envoy.http2.outbound.flood.counter||
|envoy.http2.rx.messaging.error.counter||
|envoy.http2.rx.reset.counter||
|envoy.http2.too.many.header.frames.counter||
|envoy.http2.trailers.counter||
|envoy.http2.tx.reset.counter||
|envoy.init.fetch.timeout.counter|Initialization timout counter.|
|envoy.listener.admin.downstream.cx.*|Metrics for admin listener downstream connections. |
|envoy.listener.admin.downstream.cx.active.gauge||
|envoy.listener.admin.downstream.cx.destroy.counter||
|envoy.listener.admin.downstream.cx.length.ms.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.listener.admin.downstream.cx.length.ms.-Inf||
|envoy.listener.admin.downstream.cx.length.ms.1.8e-06||
|envoy.listener.admin.downstream.cx.length.ms.100||
|envoy.listener.admin.downstream.cx.length.ms.1000||
|envoy.listener.admin.downstream.cx.length.ms.10000||
|envoy.listener.admin.downstream.cx.length.ms.25||
|envoy.listener.admin.downstream.cx.length.ms.250||
|envoy.listener.admin.downstream.cx.length.ms.2500||
|envoy.listener.admin.downstream.cx.length.ms.3.6e-06||
|envoy.listener.admin.downstream.cx.length.ms.30000||
|envoy.listener.admin.downstream.cx.length.ms.300000||
|envoy.listener.admin.downstream.cx.length.ms.50||
|envoy.listener.admin.downstream.cx.length.ms.500||
|envoy.listener.admin.downstream.cx.length.ms.5000||
|envoy.listener.admin.downstream.cx.length.ms.60000||
|envoy.listener.admin.downstream.cx.length.ms.600000||
|envoy.listener.admin.downstream.cx.length.ms.bucket||
|envoy.listener.admin.downstream.cx.total.counter||
|envoy.listener.admin.downstream.pre.cx.active.gauge||
|envoy.listener.admin.downstream.pre.cx.timeout.counter||
|envoy.listener.admin.http.downstream.rq.completed.counter||
|envoy.listener.admin.http.downstream.rq.xx.counter||
|envoy.listener.admin.main.thread.downstream.cx.active.gauge||
|envoy.listener.admin.main.thread.downstream.cx.total.counter||
|envoy.listener.admin.no.filter.chain.match.counter||
|envoy.listener.downstream.cx.*|Metrics for listener downstream connections. |
|envoy.listener.downstream.cx.active.gauge||
|envoy.listener.downstream.cx.destroy.counter||
|envoy.listener.downstream.cx.length.ms.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.listener.downstream.cx.length.ms.-Inf||
|envoy.listener.downstream.cx.length.ms.1.8e-06||
|envoy.listener.downstream.cx.length.ms.100||
|envoy.listener.downstream.cx.length.ms.1000||
|envoy.listener.downstream.cx.length.ms.10000||
|envoy.listener.downstream.cx.length.ms.25||
|envoy.listener.downstream.cx.length.ms.250||
|envoy.listener.downstream.cx.length.ms.2500||
|envoy.listener.downstream.cx.length.ms.3.6e-06||
|envoy.listener.downstream.cx.length.ms.30000||
|envoy.listener.downstream.cx.length.ms.300000||
|envoy.listener.downstream.cx.length.ms.50||
|envoy.listener.downstream.cx.length.ms.500||
|envoy.listener.downstream.cx.length.ms.5000||
|envoy.listener.downstream.cx.length.ms.60000||
|envoy.listener.downstream.cx.length.ms.600000||
|envoy.listener.downstream.cx.length.ms.bucket||
|envoy.listener.downstream.cx.total.counter||
|envoy.listener.downstream.pre.cx.active.gauge||
|envoy.listener.downstream.pre.cx.timeout.counter||
|envoy.listener.http.downstream.rq.*|Counters for HTTP router queue.|
|envoy.listener.http.downstream.rq.completed.counter||
|envoy.listener.http.downstream.rq.xx.counter||
|envoy.listener.manager.lds.*|Listener Discovery Service (lds) metrics.|
|envoy.listener.manager.lds.control.plane.connected.state.gauge||
|envoy.listener.manager.lds.control.plane.pending.requests.gauge||
|envoy.listener.manager.lds.control.plane.rate.limit.enforced.counter||
|envoy.listener.manager.lds.init.fetch.timeout.counter||
|envoy.listener.manager.lds.update.attempt.counter||
|envoy.listener.manager.lds.update.failure.counter||
|envoy.listener.manager.lds.update.rejected.counter||
|envoy.listener.manager.lds.update.success.counter||
|envoy.listener.manager.lds.version.gauge||
|envoy.listener.manager.*|Listener manager metrics.|
|envoy.listener.manager.listener.added.counter||
|envoy.listener.manager.listener.create.failure.counter||
|envoy.listener.manager.listener.create.success.counter||
|envoy.listener.manager.listener.modified.counter||
|envoy.listener.manager.listener.removed.counter||
|envoy.listener.manager.listener.stopped.counter||
|envoy.listener.manager.total.listeners.active.gauge||
|envoy.listener.manager.total.listeners.draining.gauge||
|envoy.listener.manager.total.listeners.warming.gauge||
|envoy.listener.manager.workers.started.gauge||
|envoy.listener.no.filter.chain.match.counter|Total connections that didn’t match any filter chain.|
|envoy.listener.server.ssl.socket.*|SSL socket metrics. |
|envoy.listener.server.ssl.socket.factory.downstream.context.secrets.not.ready.counter||
|envoy.listener.server.ssl.socket.factory.ssl.context.update.by.sds.counter||
|envoy.listener.server.ssl.socket.factory.upstream.context.secrets.not.ready.counter||
|envoy.listener.ssl.ciphers.*.counter|Counters for different types of SSL ciphers.|
|envoy.listener.ssl.ciphers.ECDHE.RSA.AES128.GCM.SHA256.counter||
|envoy.listener.ssl.ciphers.ECDHE.RSA.CHACHA20.POLY1305.counter||
|envoy.listener.ssl.ciphers.TLS.AES.128.GCM.SHA256.counter||
|envoy.listener.ssl.ciphers.unknown.ssl.cipher.counter||
|envoy.listener.ssl.*|Miscellaneous SSL connection metrics. |
|envoy.listener.ssl.connection.error.counter||
|envoy.listener.ssl.curves.P.256.counter||
|envoy.listener.ssl.curves.X25519.counter||
|envoy.listener.ssl.fail.verify.cert.hash.counter||
|envoy.listener.ssl.fail.verify.error.counter||
|envoy.listener.ssl.fail.verify.no.cert.counter||
|envoy.listener.ssl.fail.verify.san.counter||
|envoy.listener.ssl.handshake.counter||
|envoy.listener.ssl.no.certificate.counter||
|envoy.listener.ssl.session.reused.counter||
|envoy.listener.ssl.versions.TLSv1.2.counter||
|envoy.listener.ssl.versions.TLSv1.3.counter||
|envoy.listener.worker.*.downstream.cx. *|Metrics for downstream connections for different workers. |
|envoy.listener.worker.0.downstream.cx.active.gauge||
|envoy.listener.worker.0.downstream.cx.total.counter||
|envoy.listener.worker.1.downstream.cx.active.gauge||
|envoy.listener.worker.1.downstream.cx.total.counter||
|envoy.listener.worker.10.downstream.cx.active.gauge||
|envoy.listener.worker.10.downstream.cx.total.counter||
|envoy.listener.worker.11.downstream.cx.active.gauge||
|envoy.listener.worker.11.downstream.cx.total.counter||
|envoy.listener.worker.12.downstream.cx.active.gauge||
|envoy.listener.worker.12.downstream.cx.total.counter||
|envoy.listener.worker.13.downstream.cx.active.gauge||
|envoy.listener.worker.13.downstream.cx.total.counter||
|envoy.listener.worker.14.downstream.cx.active.gauge||
|envoy.listener.worker.14.downstream.cx.total.counter||
|envoy.listener.worker.15.downstream.cx.active.gauge||
|envoy.listener.worker.15.downstream.cx.total.counter||
|envoy.listener.worker.16.downstream.cx.active.gauge||
|envoy.listener.worker.16.downstream.cx.total.counter||
|envoy.listener.worker.17.downstream.cx.active.gauge||
|envoy.listener.worker.17.downstream.cx.total.counter||
|envoy.listener.worker.18.downstream.cx.active.gauge||
|envoy.listener.worker.18.downstream.cx.total.counter||
|envoy.listener.worker.19.downstream.cx.active.gauge||
|envoy.listener.worker.19.downstream.cx.total.counter||
|envoy.listener.worker.2.downstream.cx.active.gauge||
|envoy.listener.worker.2.downstream.cx.total.counter||
|envoy.listener.worker.20.downstream.cx.active.gauge||
|envoy.listener.worker.20.downstream.cx.total.counter||
|envoy.listener.worker.21.downstream.cx.active.gauge||
|envoy.listener.worker.21.downstream.cx.total.counter||
|envoy.listener.worker.22.downstream.cx.active.gauge||
|envoy.listener.worker.22.downstream.cx.total.counter||
|envoy.listener.worker.23.downstream.cx.active.gauge||
|envoy.listener.worker.23.downstream.cx.total.counter||
|envoy.listener.worker.3.downstream.cx.active.gauge||
|envoy.listener.worker.3.downstream.cx.total.counter||
|envoy.listener.worker.4.downstream.cx.active.gauge||
|envoy.listener.worker.4.downstream.cx.total.counter||
|envoy.listener.worker.5.downstream.cx.active.gauge||
|envoy.listener.worker.5.downstream.cx.total.counter||
|envoy.listener.worker.6.downstream.cx.active.gauge||
|envoy.listener.worker.6.downstream.cx.total.counter||
|envoy.listener.worker.7.downstream.cx.active.gauge||
|envoy.listener.worker.7.downstream.cx.total.counter||
|envoy.listener.worker.8.downstream.cx.active.gauge||
|envoy.listener.worker.8.downstream.cx.total.counter||
|envoy.listener.worker.9.downstream.cx.active.gauge||
|envoy.listener.worker.9.downstream.cx.total.counter||
|envoy.runtime.*|Runtime metrics.|
|envoy.runtime.admin.overrides.active.gauge||
|envoy.runtime.deprecated.feature.use.counter||
|envoy.runtime.load.error.counter||
|envoy.runtime.load.success.counter||
|envoy.runtime.num.keys.gauge||
|envoy.runtime.num.layers.gauge||
|envoy.runtime.override.dir.exists.counter||
|envoy.runtime.override.dir.not.exists.counter||
|envoy.server.*|Server metrics|
|envoy.server.concurrency.gauge||
|envoy.server.days.until.first.cert.expiring.gauge||
|envoy.server.debug.assertion.failures.counter||
|envoy.server.dynamic.unknown.fields.counter||
|envoy.server.hot.restart.epoch.gauge||
|envoy.server.initialization.time.ms.*|Statistics: 0.5, 1, 10, 5, count, sum|
|envoy.server.initialization.time.ms.-Inf||
|envoy.server.initialization.time.ms.1.8e-06||
|envoy.server.initialization.time.ms.100||
|envoy.server.initialization.time.ms.1000||
|envoy.server.initialization.time.ms.10000||
|envoy.server.initialization.time.ms.25||
|envoy.server.initialization.time.ms.250||
|envoy.server.initialization.time.ms.2500||
|envoy.server.initialization.time.ms.3.6e-06||
|envoy.server.initialization.time.ms.30000||
|envoy.server.initialization.time.ms.300000||
|envoy.server.initialization.time.ms.50||
|envoy.server.initialization.time.ms.500||
|envoy.server.initialization.time.ms.5000||
|envoy.server.initialization.time.ms.60000||
|envoy.server.initialization.time.ms.600000||
|envoy.server.initialization.time.ms.bucket||
|envoy.server.live.gauge||
|envoy.server.main.thread.watchdog.mega.miss.counter||
|envoy.server.main.thread.watchdog.miss.counter||
|envoy.server.memory.allocated.gauge||
|envoy.server.memory.heap.size.gauge||
|envoy.server.parent.connections.gauge||
|envoy.server.state.gauge||
|envoy.server.static.unknown.fields.counter||
|envoy.server.stats.recent.lookups.gauge||
|envoy.server.total.connections.gauge||
|envoy.server.uptime.gauge||
|envoy.server.version.gauge||
|envoy.server.watchdog.mega.miss.counter||
|envoy.server.watchdog.miss.counter||
|envoy.server.worker.0.watchdog.mega.miss.counter||
|envoy.server.worker.0.watchdog.miss.counter||
|envoy.server.worker.1.watchdog.mega.miss.counter||
|envoy.server.worker.1.watchdog.miss.counter||
|envoy.server.worker.10.watchdog.mega.miss.counter||
|envoy.server.worker.10.watchdog.miss.counter||
|envoy.server.worker.11.watchdog.mega.miss.counter||
|envoy.server.worker.11.watchdog.miss.counter||
|envoy.server.worker.12.watchdog.mega.miss.counter||
|envoy.server.worker.12.watchdog.miss.counter||
|envoy.server.worker.13.watchdog.mega.miss.counter||
|envoy.server.worker.13.watchdog.miss.counter||
|envoy.server.worker.14.watchdog.mega.miss.counter||
|envoy.server.worker.14.watchdog.miss.counter||
|envoy.server.worker.15.watchdog.mega.miss.counter||
|envoy.server.worker.15.watchdog.miss.counter||
|envoy.server.worker.16.watchdog.mega.miss.counter||
|envoy.server.worker.16.watchdog.miss.counter||
|envoy.server.worker.17.watchdog.mega.miss.counter||
|envoy.server.worker.17.watchdog.miss.counter||
|envoy.server.worker.18.watchdog.mega.miss.counter||
|envoy.server.worker.18.watchdog.miss.counter||
|envoy.server.worker.19.watchdog.mega.miss.counter||
|envoy.server.worker.19.watchdog.miss.counter||
|envoy.server.worker.2.watchdog.mega.miss.counter||
|envoy.server.worker.2.watchdog.miss.counter||
|envoy.server.worker.20.watchdog.mega.miss.counter||
|envoy.server.worker.20.watchdog.miss.counter||
|envoy.server.worker.21.watchdog.mega.miss.counter||
|envoy.server.worker.21.watchdog.miss.counter||
|envoy.server.worker.22.watchdog.mega.miss.counter||
|envoy.server.worker.22.watchdog.miss.counter||
|envoy.server.worker.23.watchdog.mega.miss.counter||
|envoy.server.worker.23.watchdog.miss.counter||
|envoy.server.worker.3.watchdog.mega.miss.counter||
|envoy.server.worker.3.watchdog.miss.counter||
|envoy.server.worker.4.watchdog.mega.miss.counter||
|envoy.server.worker.4.watchdog.miss.counter||
|envoy.server.worker.5.watchdog.mega.miss.counter||
|envoy.server.worker.5.watchdog.miss.counter||
|envoy.server.worker.6.watchdog.mega.miss.counter||
|envoy.server.worker.6.watchdog.miss.counter||
|envoy.server.worker.7.watchdog.mega.miss.counter||
|envoy.server.worker.7.watchdog.miss.counter||
|envoy.server.worker.8.watchdog.mega.miss.counter||
|envoy.server.worker.8.watchdog.miss.counter||
|envoy.server.worker.9.watchdog.mega.miss.counter||
|envoy.server.worker.9.watchdog.miss.counter||
|envoy.tls.inspector.*|Metrics for the TLS inspector listener. |
|envoy.tls.inspector.alpn.found.counter||
|envoy.tls.inspector.alpn.not.found.counter||
|envoy.tls.inspector.client.hello.too.large.counter||
|envoy.tls.inspector.connection.closed.counter||
|envoy.tls.inspector.read.error.counter||
|envoy.tls.inspector.sni.found.counter||
|envoy.tls.inspector.sni.not.found.counter||
|envoy.tls.inspector.tls.found.counter||
|envoy.tls.inspector.tls.not.found.counter||
|envoy.update.*|Envoy update metrics.|
|envoy.update.attempt.counter||
|envoy.update.failure.counter||
|envoy.update.rejected.counter||
|envoy.update.success.counter||
|envoy.version.gauge|Envoy version.|

