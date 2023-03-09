---
title: VMware Tanzu Service Mesh Integration
tags: [integrations list]
permalink: tsm.html
summary: Learn about the VMware Tanzu Service Mesh Integration.
---
## Tanzu Service Mesh Integration

Tanzu Service Mesh provides advanced, end-to-end connectivity, security, and insights for modern applications across application end-users, microservices, APIs, and data. It enables compliance with Service Level Objectives (SLOs) and data protection and privacy regulations.

Click the **Setup** tab for instructions on setting up your environment to send Tanzu Service Mesh **metrics** to Wavefront.

This integration uses `Prometheus` to scrape Istio mesh metrics and federate them. It uses the Wavefront Collector for Kubernetes to forward these metrics to Wavefront.
This integration also installs dashboards. Here's a preview of the Tanzu Service Mesh Data Plane and Control Plane dashboards:

{% include image.md src="images/tsm_dataplane_db.png" width="80" %}
{% include image.md src="images/tsm_controlplane_db.png" width="80" %}

## Tanzu Service Mesh Setup



  **Supported Versions:**
  * Istio: 1.13.0 or later.
  * Wavefront Collector for Kubernetes: 1.10.0 or later.
  * Prometheus: 2.37.0 or later.


  **Prerequisites:**
  * While onboarding new Kubernetes clusters on Tanzu Service Mesh dashboard, make sure that you exclude the Wavefront Collector and Wavefront Proxy deployed namespaces.
    For example: `wavefront` and `wavefront-collector`.
  * When the Tanzu Service Mesh is configured as a multi-cluster, make sure that you deploy Prometheus and Wavefront Collector on each cluster.

This integration uses two main components:
* [Prometheus](https://istio.io/latest/docs/ops/integrations/prometheus/) server to scrape metrics from Istio and federate them.

* [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) to collect the federated metrics from Prometheus server and send these metrics to Wavefront. The Collector can send data to Wavefront using a [Wavefront Proxy](https://docs.wavefront.com/proxies.html) or through [direct ingestion](https://docs.wavefront.com/direct_ingestion.html).

Use the following instructions to start reporting metrics.

### Reporting Tanzu Service Mesh Metrics to Wavefront

#### 1. Deploy Prometheus with Federation Configuration

Step 1. Download the [Prometheus yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/istio/prometheus.yaml) file with the federation.

Step 2. Deploy the Prometheus server to `istio-system` namesapce.{% raw %}
```
kubectl create -f prometheus.yaml
```
{% endraw %}

#### 2. Update the Wavefront Collector ConfigMap
If you do not already have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster either by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).

Step 1. Edit the Wavefront Collector ConfigMap at runtime:{% raw %}
```
kubectl edit configmap wavefront-collector-config -n wavefront
```
{% endraw %}
- Add the following snippet under `Prometheus Sources`:{% raw %}
```
        ##########################################################################
        # Static source to collect Istio metrics via a federated Prometheus server
        ##########################################################################
        prometheus_sources:
        - url: 'http://prometheus.istio-system.svc.cluster.local:9090/federate?match[]={job=~"federate|kubernetes-pods"}'
          httpConfig:
            bearer_token_file: '/var/run/secrets/kubernetes.io/serviceaccount/token'
            tls_config:
              ca_file: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
              insecure_skip_verify: true

          prefix: 'tsm.'

          filters:
            metricTagDenyList:
              destination_principal:
              - '*'

            metricAllowList:
            - 'tsm.istio.requests.*'
            - 'tsm.istio.request.*'   # mandatory for OOTB dashboards
            - 'tsm.istio.response.*'
            - 'tsm.istio.tcp.*'       # mandatory for OOTB dashboards
            - 'tsm.go.goroutines.value'
            - 'tsm.go.memstats.alloc.bytes.value'
            - 'tsm.go.memstats.heap.alloc.bytes.value'
            - 'tsm.go.memstats.heap.inuse.bytes.value'
            - 'tsm.go.memstats.heap.sys.bytes.value'
            - 'tsm.go.memstats.stack.inuse.bytes.value'
            - 'tsm.istio.build.value' # mandatory for OOTB dashboards
            - 'tsm.pilot.conflict.*.listener.*'
            - 'tsm.pilot.proxy.convergence.time.bucket.value'
            - 'tsm.pilot.services.value'
            - 'tsm.pilot.total.xds.internal.errors.value'
            - 'tsm.pilot.total.xds.rejects.value'
            - 'tsm.pilot.virt.services.value'
            - 'tsm.pilot.xds.*.reject.value'
            - 'tsm.pilot.xds.push.context.errors.value'
            - 'tsm.pilot.xds.pushes.value'
            - 'tsm.pilot.xds.write.timeout.value'
            - 'tsm.pilot.xds.value'
            - 'tsm.process.cpu.seconds.total.value'
            - 'tsm.process.resident.memory.bytes.value'
            - 'tsm.process.virtual.memory.bytes.value'
            - 'tsm.citadel.server.*'
            - 'tsm.galley.validation.*'
            - 'tsm.sidecar.*'
            - 'tsm.istio.agent.*'
```
{% endraw %}
- Add the following snippet for Wavefront Proxy metricDenyList under `sinks`:{% raw %}
```
          metricDenyList:
          - 'istio.*'
```
{% endraw %}

## Metrics

| Metric Name                                                      | Description                                                                                                                       |
|:-----------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------|
| tsm.istio.request.bytes.*.value                                  | This is a DISTRIBUTION which measures the HTTP request body sizes.<br>Statistics: bucket, p50, p75, p90, p95, p99, p999, count, sum.  |
| tsm.istio.request.duration.milliseconds.*.value                  | This is a DISTRIBUTION which measures the duration of requests.<br>Statistics: bucket, p50, p75, p90, p95, p99, p999, count, sum. |
| tsm.istio.requests.total.value                                   | This is a COUNTER incremented for every request handled by an Istio proxy.                                                        |
| tsm.istio.response.bytes.*.value                                 | This is a DISTRIBUTION which measures the HTTP response body sizes.<br>Statistics: bucket, p50, p75, p90, p95, p99, p999, count, sum. |
| tsm.istio.tcp.sent.bytes.total.value                             | This is a DISTRIBUTION which measures the HTTP response body sizes.                                                                   |
| tsm.istio.tcp.received.bytes.total.value                         | This is a COUNTER which measures the size of total bytes received during request in case of a TCP connection.                     |
| tsm.istio.tcp.connections.opened.total.value                     | This is a COUNTER incremented for every opened connection.                                                                        |
| tsm.istio.tcp.connections.closed.total.value                     | This is a COUNTER incremented for every closed connection.                                                                        |
| tsm.pilot.services.value                                         | The total services known to tsm.pilot.                                                                                            |
| tsm.pilot.virt.services.value                                    | The total virtual services known to tsm.pilot.                                                                                    |
| tsm.istio.build.value                                            | Istio component build info.                                                                                                       |
| tsm.pilot.xds.pushes.value                                       | Pilot build and send errors for LDS, RDS, CDS, and EDS.                                                                            |
| tsm.pilot.total.xds.rejects.value                                | The total number of XDS responses from pilot rejected by proxy.                                                                   |
| tsm.pilot.xds.cds.reject.value                                   | Pilot rejected CDS configs.                                                                                                       |
| tsm.pilot.xds.eds.reject.value                                   | Pilot rejected EDS.                                                                                                               |
| tsm.pilot.xds.lds.reject.value                                   | Pilot rejected LDS.                                                                                                               |
| tsm.pilot.xds.rds.reject.value                                   | Pilot rejected RDS.                                                                                                               |
| tsm.pilot.xds.write.timeout.value                                | Pilot XDS response write timeouts.                                                                                                |
| tsm.pilot.xds.push.context.errors.value                          | The number of errors (timeouts) initiating push context.                                                                          |
| tsm.pilot.conflict.inbound.listener.value                        | The number of conflicting inbound listeners.                                                                                      |
| tsm.pilot.total.xds.internal.errors.value                        | The total number of internal XDS errors in tsm.pilot.                                                                             |
| tsm.pilot.conflict.outbound.listener.http.over.current.tcp.value | The number of conflicting wildcard HTTP listeners with current wildcard TCP listener.                                             |
| tsm.pilot.conflict.outbound.listener.tcp.over.current.http.value | The number of conflicting wildcard TCP listeners with current wildcard HTTP listener.                                             |
| tsm.pilot.conflict.outbound.listener.tcp.over.current.tcp.value  | The number of conflicting TCP listeners with current TCP listener.                                                                |
| tsm.pilot.proxy.convergence.time.bucket.value                    | Delay in seconds between config change and a proxy receiving all required configuration.                                          |
| tsm.pilot.proxy.queue.time.bucket.value                          | Time in seconds, a proxy is in the push queue before being dequeued.                                                              |
| tsm.process.cpu.seconds.total.value                              | Total user and system CPU time spent in seconds.                                                                                  |
| tsm.process.resident.memory.bytes.value                          | Resident memory size in bytes.                                                                                                    |
| tsm.process.virtual.memory.bytes.value                           | Virtual memory size in bytes.                                                                                                     |
| tsm.galley.validation.http.error.value                           | Resource validation HTTP serve errors.                                                                                            |
| tsm.galley.validation.failed.value                               | Resource validation failed.                                                                                                       |
| tsm.galley.validation.passed.value                               | Resource is valid.                                                                                                                |
| tsm.galley.validation.config.updates.value                       | K8s webhook configuration updates.                                                                                                |
| tsm.galley.validation.config.update.error.value                  | K8s webhook configuration update error.                                                                                           |
| tsm.galley.validation.config.load.value                          | K8s webhook configuration loads.                                                                                           |
| tsm.galley.validation.config.load.error.value                    | K8s webhook configuration load or reload error.                                                                                         |
| tsm.galley.validation.config.delete.error.value                  | K8s webhook configuration delete error.                                                                                           |
| tsm.citadel.server.csr.count.value                               | The number of CSRs received by the Citadel server.                                                                                    |
| tsm.citadel.server.success.cert.issuance.count.value             | The number of certificates issuances that have succeeded.                                                                        |
| tsm.citadel.server.csr.sign.error.count.value                    | The number of errors occurred when signing the CSR.                                                                               |
| tsm.go.goroutines.value                                          | Number of goroutines that currently exist.                                                                                        |
| tsm.go.memstats.alloc.bytes.value                                | Number of bytes allocated and still in use.                                                                                       |
| tsm.go.memstats.heap.alloc.bytes.value                           | Bytes allocated to the heap.                                                                                                      |
| tsm.go.memstats.heap.inuse.bytes.value                           | Number of bytes in the heap.                                                                                                      |
| tsm.go.memstats.heap.sys.bytes.value                             | Number of bytes used by the heap.                                                                                                 |
| tsm.go.memstats.stack.inuse.bytes.value                          | Number of bytes in use by the stack allocator.                                                                                    |


