---
title: Istio Integration
tags: [integrations list]
permalink: istio.html
summary: Learn about the Istio Integration.
---
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

## Istio Setup



**Supported Versions:**
* Istio: 1.14.0 or later.
* Kubernetes Metrics Collector: v1.13.0 or later.
* Prometheus: v2.21.0 or later

This integration uses:
* The [Prometheus](https://istio.io/latest/docs/ops/integrations/prometheus/) server to scrape metrics from Istio and federate them.

* The **Kubernetes Metrics Collector** to collect the federated metrics from a Prometheus server and send the metrics to Operations for Applications, so that you can monitor your clusters and workloads in Kubernetes.

You can deploy the Kubernetes Metrics Collector by using either the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes) (recommended deployment) or by using the [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or [manual installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install) (deprecated deployment).

If you do not already have the Kubernetes Metrics Collector installed in your Kubernetes cluster, follow the add Kubernetes instructions and add it to your cluster. Then proceed with the steps below, except step `2.2`.

If you already have the Kubernetes Metrics Collector installed by using the deprecated Helm or manual deployment, you can choose to proceed with one of the options below:
  - Uninstall the deprecated Kubernetes Metrics Collector, then install the Observability for Kubernetes Operator and proceed with the steps below, except step `2.2`.
  - Continue using the deprecated Helm or manual deployment. In such a case, proceed with the steps below, except step `2.1`.

### Reporting Istio Metrics to Operations for Applications

#### 1. Deploy Prometheus with Federation Configuration

Step 1. Deploy the Prometheus server to the `istio-system` namespace.{% raw %}
```
kubectl create -f https://raw.githubusercontent.com/wavefrontHQ/integrations/master/istio/prometheus.yaml
```
{% endraw %}

#### 2. Update the Collector ConfigMap

* To update the Observability for Kubernetes Operator, follow the steps under [Update the Observability for Kubernetes Operator ConfigMap](#kubernetes-operator).
* To update the Kubernetes Metrics Collector installed using Helm or manual installation, follow the steps under [Update the Kubernetes Metrics Collector ConfigMap](#kubernetes-collector).

##### <a name="kubernetes-operator"></a><br> 2.1 Update the Observability for Kubernetes Operator ConfigMap

Step 1. Download the [existing collector ConfigMap](https://raw.githubusercontent.com/wavefrontHQ/observability-for-kubernetes/main/deploy/scenarios/wavefront-collector-existing-configmap.yaml) `.yaml` file, and open in edit mode.

Step 2. Update `YOUR_CLUSTER_NAME` with the name of your Kubernetes cluster and `YOUR_WAVEFRONT_URL` with the URL of your Operations for Applications instance.

Step 3. Add the following snippet under `sources`:{% raw %}
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

Step 4. Add the following snippet under `discovery`, and save the `.yaml` file:{% raw %}
```
      annotation_excludes:
      - namespaces:
        - istio-system
```
{% endraw %}

Step 5. Deploy the existing collector ConfigMap `.yaml` file.{% raw %}
```
kubectl apply -f wavefront-collector-existing-configmap.yaml
```
{% endraw %}

##### <a name="kubernetes-collector"></a><br> 2.2 Update the Kubernetes Metrics Collector ConfigMap

Step 1. Edit the Kubernetes Metrics Collector ConfigMap at runtime and add the following snippet under `prometheus_sources`.{% raw %}
```
kubectl edit configmap wavefront-collector-config -n wavefront
```
{% endraw %}

Istio config:{% raw %}
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

**Note**: When Istio is configured as a multi-cluster service, you must deploy Prometheus and the Kubernetes Metrics Collector on each cluster. Follow the steps above for each cluster in your environment.

### Reporting Istio Traces to Operations for Applications

The following instructions are for reporting traces. To report metrics, use the Istio metrics setup instructions above.

#### Step 1. Set Up the Wavefront Proxy

Follow these [steps](https://github.com/wavefrontHQ/wavefront-kubernetes#wavefront-proxy-required) to deploy a Wavefront proxy. As part of the process, uncomment the lines to enable Zipkin/Istio traces. Use a proxy version 12.0 or later.

#### Step 2. Set Up Istio to Send Traces to Wavefront Proxy

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


