---
title: Monitor and Scale Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wavefront_kubernetes.html
summary: Monitor Kubernetes infrastructure and applications. Scale Kubernetes workloads based on metrics in Wavefront.
---
*Monitor* your Kubernetes environment at the infrastructure level and at the applications level with Wavefront Collector for Kubernetes.

* Monitor Kubernetes infrastructure metrics (containers, pods, etc.) from Wavefront dashboards -- and create alerts from those dashboards.
* Automatically collect metrics from applications and workloads using built-in plug-ins such as Prometheus, Telegraf, etc.

*Scale* your Kubernetes environment based on any metrics that are available in Wavefront with the Wavefront Horizontal Pod Autoscaler Adapter.

Log in to your Wavefront instance to try the integration, or [see it on github here](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes)!

## Videos

The following two videos get you started.
* **Monitor and Scale Kubernetes with Wavefront** (August 2019, 6 minutes) gives you the big picture. It explains the different ways of monitoring Kubernetes with Wavefront.
* **Kubernetes and Wavefront** (January 2020, 13 minutes) includes more details and some recent developments including the one-click install of the new [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes).

<table style="width: 100%;">
<tbody>
<tr><td width="51%"><a href="https://youtu.be/nZnbdNHFNyU"><img src="/images/v_kubernetes_pierre_2.png" alt="monitor and scale Kubernetes"/></a></td>
<td width="49%"><a href="https://youtu.be/jbmUKPSIguQ"><img src="/images/v_kubernetes_lightboard.png" alt="Kubernetes and Wavefront Details"/></a></td>
</tr>
</tbody>
</table>



## Kubernetes and Wavefront: Overview

You can use our open-source collector or the in-product integration:
* The **Wavefront Collector for Kubernetes** is [available on GitHub](https://github.com/wavefrontHQ/wavefront-kubernetes-collector). The collector is highly customizable and includes [docs on GitHub](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/tree/master/docs) and examples for different use cases.

* The Wavefront **Kubernetes integration** is available in your Wavefront instance. You can [preview the setup steps here](kubernetes.html). The integration is a great way to get data flowing and includes predefined dashboards for commonly used metrics. For further customization, you can use the files in the GitHub repository.

The Wavefront Collector for Kubernetes supports autodiscovery of pods and services based on annotations and configuration rules. The collector runs as a DaemonSet for high scalability and supports leader election for monitoring cluster-level resources.

* **Kubernetes infrastructure monitoring:** Monitor performance of the Kubernetes cluster and the state of the objects (pods, containers, etc) within the cluster using [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes-collector).
* **Host-level monitoring** Below the Kubernetes infrastructure is the host or VM layer. The Wavefront Collector for Kubernetes monitors that layer as well.
* **Application monitoring:** The collector integrates with Telegraf, and automatically sets up monitoring for several popular applications. We also get metrics from Prometheus endpoints. You can customize the Wavefront Collector for Kubernetes with a [configuration file](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/configuration.md). For example, you can set collection frequency.

To set up scaling based on any metrics available in Wavefront, use the Wavefront Horizontal Autoscaler Adapter. If your environment needs more (or fewer) resources, Wavefront can tell the Kubernetes Autoscaler to [adjust the environment](https://github.com/wavefrontHQ/wavefront-kubernetes-adapter).

## Kubernetes Monitoring with Wavefront

The Wavefront Collector for Kubernetes monitors your Kubernetes infrastructure at all levels of the stack. You can set up the integration to have much of the monitoring happen automatically. After you've set up the integration you can fine-tune and customize the solution with configuration options available in the Wavefront Collector for Kubernetes.

### Kubernetes Infrastructure Monitoring

The [Wavefront Collector for Kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes-collector)
collects metrics to give comprehensive insight into all layers of your Kubernetes environment such as nodes, pods, services, and config maps.

Depending on the selected setup, metrics are sent to a Wavefront proxy and from there to the Wavefront service. It's possible to send metrics using direct ingestion, but the Wavefront proxy is preferred for most cases.

![kubernetes core monitoring](/images/kubernetes_core.png)

The collector runs as a DaemonSet for high scalability and supports leader election for monitoring cluster-level resources.

### Host-Level Monitoring

The Wavefront Collector for Kubernetes supports automatic monitoring of host-level metrics and host-level `systemd` metrics. When you set up the collector, it auto-discovers pods and services  in your environment and starts collecting host-level metrics.

You can [filter the metrics](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/filtering.md) before they are reported to Wavefront.

### Application Monitoring

The Wavefront Collector for Kubernetes automatically starts collecting metrics from many commonly used applciations. It also scrapes Prometheus metric endpoints such as API server, etcd and NGINX. The following diagram illustrates this.

![kubernetes application monitoring](/images/kubernetes_apps.png)

## Kubernetes Scaling with Wavefront

The default Kubernetes infrastructure can include a [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/), which can automatically scale the number of pods. The Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server by default, and the Horizontal Pod Autoscaler uses that information.

The [Wavefront Horizontal Pod Autoscaler Adapter](https://www.github.com/wavefrontHQ/wavefront-kubernetes-adapter) allows you to scale based on *any* metric that it knows about.

For example, you could scale based on networking or disk metrics, or any application metrics that are available to Wavefront. The Autoscaler Adapter sends the recommendation to the Horizontal Pod Autoscaler, and the Kubernetes environment is kept healthy as a result.

![kubernetes scaling](/images/kubernetes_scaling.png)


## Wavefront Github Repositories for Kubernetes

We support the following open-source Github repositories:

-  **[wavefront-kubernetes-collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector)** Second-generation Kubernetes monitoring. Supports auto-discovery, scaling using DaemonSet, filtering, and more.
- **[wavefront-kubernetes-adapter](https://github.com/wavefrontHQ/wavefront-kubernetes-adapter)** Wavefront Kubernetes HPA (Horizontal Pod Autoscaler) adapter that implements the custom metrics (custom.metrics.k8s.io/v1beta1) and external metrics (external.metrics.k8s.io/v1beta1) APIs. The adapter can be used with the autoscaling/v2 HPA in Kubernetes 1.9+ to perform scaling based on any metrics available in Wavefront.
- **[wavefront-kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes)** First-generation Kubernetes monitoring. Contains definitions and templates for monitoring Kubernetes using Wavefront. Supports only sending data to the Wavefront proxy (no direct ingestion support).
- **[prometheus-storage-adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter)** -- Usually used with our first-generation Kubernetes monitoring solution. The adapter forwards data it receives to a Wavefront proxy. It is useful when you want some control on how data collected by Prometheus are made available in  Wavefront. Our second-generation solution, the Wavefront Collector for Kubernetes, automatically collects Prometheus metrics.
