---
title: Istio Integration
tags: [integrations list]
permalink: istio.html
summary: Learn about the Wavefront Istio Integration.
---
## Istio Integration

Istio is an open platform-independent service mesh that provides traffic management, policy enforcement, and telemetry collection.
Istio Control Plane itself, is a modern, cloud-native application. The Istio components, such as service discovery (Pilot), configuration (Galley), and certificate generation (Citadel) were all written and deployed as separate microservices. The need for these components to communicate securely and be observable, provided opportunities for Istio to _“drink its own champagne”_.

Click the **Setup** tab for instructions on:

* Setting up your environment to send Istio **metrics** to Wavefront.
* Setting up your environment to send Istio **traces** to Wavefront.

This integration uses `Prometheus` to scrape Istio mesh metrics and federate them. It uses `Wavefront Collector for Kubernetes` to forward these metrics to Wavefront.
This integration also installs the dashboards. Here's a preview of the Istio Data Plane and Control Plane dashboards:

{% include image.md src="images/istio_dashboard.png" width="80" %}
{% include image.md src="images/istio_control_plane_dashboard.png" width="80" %}

## Istio Setup



  **Supported Versions:**
  * Istio: 1.8.0 or later.
  * Wavefront Collector for Kubernetes: v1.2.0 or later.
  * Prometheus: v2.21.0 or later

This integration uses
* [Prometheus](https://istio.io/latest/docs/ops/integrations/prometheus/) server to scrape metrics from Istio and federate them.

* [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/observability-for-kubernetes) to collect the federated metrics from Prometheus server and to send metrics to Wavefront. The collector can send data to Wavefront using the [proxy](https://docs.wavefront.com/proxies.html) or [direct ingestion](https://docs.wavefront.com/direct_ingestion.html). The instructions below assume Istio is deployed in a Kubernetes environment.

### Reporting Istio Metrics to Wavefront

#### 1. Deploy the Prometheus with Federation Configuration

Step 1. Download the [Prometheus yaml](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/istio/prometheus.yaml) with the federation.

Step 2. Deploy the Prometheus server to `istio-system` namesapce.{% raw %}
```
kubectl create -f prometheus.yaml
```
{% endraw %}

#### 2. Update the Wavefront Collector ConfigMap
If you do not already have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, please follow these instructions to add it to your cluster either via [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or [Manual Install](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).

Step 1. Edit the Wavefront Collector ConfigMap at runtime, and add the following snippet under `Prometheus Sources`.{% raw %}
   ```
   kubectl edit configmap wavefront-collector-config -n wavefront
   ```
{% endraw %}

Istio config:{% raw %}
   ```
      ##########################################################################
      # Static source to collect Istio metrics via federated Prometheus server
      ##########################################################################
      prometheus_sources:
      - url: 'http://prometheus.istio-system.svc.cluster.local:9090/federate?match[]={job=~"federate|kubernetes-pods"}'
        httpConfig:
          bearer_token_file: '/var/run/secrets/kubernetes.io/serviceaccount/token'
          tls_config:
            ca_file: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
            insecure_skip_verify: true

        filters:
          metricTagDenyList:
            destination_principal:
            - '*'

          metricAllowList:
          - 'istio.requests.*'
          - 'istio.request.*'   # mandatory for OOTB dashboards
          - 'istio.response.*'
          - 'istio.tcp.*'       # mandatory for OOTB dashboards
          - 'go.goroutines.value'
          - 'go.memstats.alloc.bytes.value'
          - 'go.memstats.heap.alloc.bytes.value'
          - 'go.memstats.heap.inuse.bytes.value'
          - 'go.memstats.heap.sys.bytes.value'
          - 'go.memstats.stack.inuse.bytes.value'
          - 'istio.build.value' # mandatory for OOTB dashboards
          - 'pilot.conflict.*.listener.*'
          - 'pilot.proxy.convergence.time.bucket.value'
          - 'pilot.services.value'
          - 'pilot.total.xds.internal.errors.value'
          - 'pilot.total.xds.rejects.value'
          - 'pilot.virt.services.value'
          - 'pilot.xds.*.reject.value'
          - 'pilot.xds.push.context.errors.value'
          - 'pilot.xds.pushes.value'
          - 'pilot.xds.write.timeout.value'
          - 'pilot.xds.value'
          - 'process.cpu.seconds.total.value'
          - 'process.resident.memory.bytes.value'
          - 'process.virtual.memory.bytes.value'
          - 'citadel.server.*'
          - 'galley.validation.*'
          - 'sidecar.*'
   ```
{% endraw %}
**Note**: When the Istio is configured as a multi-cluster service, you must deploy Prometheus and Wavefront Collector on each cluster. Follow the steps above.

### Reporting Istio Traces to Wavefront
The following instructions are for reporting traces. To report metrics, use the Istio metrics setup instructions above.

#### Step 1. Set up Wavefront Proxy
Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. As part of the process, uncomment the lines to enable Zipkin/Istio traces. Use a proxy version 4.35 or later.

#### Step 2. Set up Istio to Send Traces to Wavefront Proxy

Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes/tree/master/istio) to allow Istio to redirect its traces to the Wavefront proxy.



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


