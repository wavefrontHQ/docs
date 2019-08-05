---
title: Monitor and Scale Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers]
sidebar: doc_sidebar
permalink: wavefront_kubernetes.html
summary: Monitor Kubernetes infrastructure and applications. Scale the Kubernetes deployment based on Wavefront metrics.
---
*Monitor* your Kubernetes environment at the infrastructure level and at the applications level with Wavefront Kubernetes Collector.

* Monitor Kubernetes infrastructure metrics (containers, pods, etc.) from Wavefront dashboards -- and create alerts from those dashboards.
* Automatically get metrics from many applications that support Telegraf.
* Integrate with other applications that support Telegraf.
* Automatically get metrics from Prometheus scraping.

*Scale* your Kubernetes environment based on any metrics that are available in Wavefront with the Wavefront Horizontal Pod Autoscaler Adapter.


In the following video, Pierre Tessier explains how this works.

<p><a href="XX"><img src="/images/v_kubernetes_pierre_2.png" style="width: 700px;" alt="monitor and scale kubernetes"/></a>
</p>

## Kubernetes and Wavefront: Overview

You can take advantage of our open-source collector in Github or the in-product integration:
* The **Wavefront Kubernetes Collector** is [available on github](https://github.com/wavefrontHQ/wavefront-kubernetes-collector). The collector is highly customizable and includes [docs on Github](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/tree/master/docs)and examples for different use cases.

* The Wavefront **Kubernetes integration** is available in your Wavefront instance. You can [preview the setup steps here.](kubernetes.html). The integration is  a great way to get your data flowing and includes predefined dashboards for commonly used metrics. For further customization, you can use the files in the Github repository.

The Wavefront Kubernetes solution supports automatic annotation and configuration based on auto discovery of pods and services. The collector runs as a daemonset and supports leader election.

* **Kubernetes infrastructure monitoring:** Monitor performance of the Kubernetes cluster and the state of the objects (pods, containers, etc) within the cluster using [Wavefront Kubernetes Collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector).
* **Host-level monitoring** Below the kubernetes infrastructure is the host or VM layer. The Wavefront Kubernetes Collector monitors that layer as well.
* **Application monitoring:** The collector integrates with Telegraf, and automatically sets up monitoring for several popular applications. We also perform Kubernetes scraping for applications that use Kubernetes. You can customize the frequency and which metrics we collect.

**TBD: How do I know what we collect automatically? How do I customize frequency and what we collect? **

You can set up scaling with the Wavefront Horizontal Autoscaler Adapter based on any metrics available in Wavefront. That means if your environment needs more (or fewer) resources, Wavefront can tell the Kubernetes Autoscaler to adjust the environment.

## Kubernetes Monitoring with Wavefront

The Wavefront Kubernetes Collector monitors your Kubernetes infrastructure at all levels of the stack. Much of the monitoring happens automatically after you've set up the integration - and fine-tuning and customizing the solution is straightforward.

### Kubernetes Infrastructure Monitoring

The [Wavefront Kubernetes Collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector)
collects metrics to give comprehensive insight into all layers of your Kubernetes environment (nodes, pods, services, config maps, etc).

Depending on the selected setup, metrics are sent to a Wavefront proxy and from there to the Wavefront service. It's possible to send metrics using direct ingestion, but the Wavefront proxy is preferred for most cases.

![kubernetes core monitoring](/images/kubernetes_core.png)

As part of environment we use the daemonset and we support leader election to ensure all Kubernetes metrics become available from Wavefront.

### Host-Level Monitoring

The Wavefront Kubernetes collector supports automatic monitoring of host-level metrics and host-level systemd metrics. When you set up the collector in your environment, it auto-discovers pods and services and starts collecting host-level metrics from Telegraf.

To make this possible, we support daemonset mode. Furthermore, you can [filter the metrics](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/filtering.md) before they are reported to Wavefront.

### Application Monitoring

The Wavefront Kubernetes Collector automatically starts collecting metrics from many commonly used applciations. It also scrapes Prometheus metric endpoints (API server, etcd, NGINX, etc). The following diagram illustrates this.

![kubernetes application monitoring](/images/kubernetes_apps.png)

## Kubernetes Scaling with Wavefront

The default Kubernetes infrastructure can include a [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/), which can automatically scale the number of pods. The Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server by default, and the Horizontal Pod Autoscaler uses that information.

The [Wavefront Horizontal Pod Autoscaler Adapter](https://www.github.com/wavefrontHQ/wavefront-kubernetes-adapter) allows you to scale based on *any* metric that it knows about.

For example, you could scale based on networking or disk metrics, or any application metrics that are available to Wavefront. The Autoscaler Adapter sends the recommendation to the Horizontal Pod Autoscaler, and the Kubernetes environment is kept healthy as a result.

![kubernetes scaling](/images/kubernetes_scaling.png)


## Wavefront Github Repositories for Kubernetes

We support the following open-source Github repositories:

-  **[wavefront-kubernetes-collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector)** Second-generation Kubernetes monitoring. Supports auto-discovery, scaling using daemonset, filtering, and more.
- **[wavefront-kubernetes-adapter](https://github.com/wavefrontHQ/wavefront-kubernetes-adapter)**
- **[wavefront-kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes)** First-generation Kubernetes monitoring. Contains definitions and templates for monitoring Kubernetes using Wavefront. Supports only sending data to the Wavefront proxy (no direct ingestion support).
- **[prometheus-storage-adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter)** -- Usually used with our first-generation Kubernetes monitoring solution. The adapter forwards data it receives to a Wavefront proxy. It is useful when you want some control on how data collected by Prometheus are made available in  Wavefront. Our second-generation solution, the Wavefront Kubernetes Collector, automatically collects Prometheus metrics.
