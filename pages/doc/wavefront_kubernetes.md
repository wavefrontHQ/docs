---
title: Monitor and Scale Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers]
sidebar: doc_sidebar
published: false
permalink: wavefront_kubernetes.html
summary: Learn about using Wavefront with Kubernetes
---
Monitor and scale your Kubernetes environment with Wavefront.

* Monitor Kubernetes infrastructure metrics (containers, pods, etc.) from Wavefront dashboards.
* Automatically get metrics from all applications that support Telegraf from Wavefront.
* Get Prometheus metrics.
* Use the Wavefront Horizontal Autoscaler Adapter to scales your Kubernetes environment based on data Wavefront knows about.

In the following video, Pierre Tessier explains how this works.

<p><a href="XX"><img src="/images/v_kubernetes_pierre_2.png" style="width: 700px;" alt="monitor and scale kubernetes"/></a>
</p>

## Kubernetes and Wavefront: Overview

Our new Wavefront Kubernetes Collector is [available on github](https://github.com/wavefrontHQ/wavefront-kubernetes-collector). Our Kubernetes integration is an easy way to get started - it includes basic setup instructions and predefined dashboards.

We support automatic annotation and configuration based on auto discovery on pods and services.

* **Kubernetes infrastructure monitoring:** Monitor performance of the Kubernetes cluster and the state of the objects (pods, containers, etc) within the cluster using [Wavefront Kubernetes Collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector).
* **Application monitoring:** For any applications in your Kubernetes environment that support Telegraf, we set up monitoring. You can customize the frequency and which metrics we collect.

You can set up scaling with the Wavefront Horizontal Autoscaler Adapter based on any metrics available in Wavefront. That means if an application needs more (or fewer) resources, Wavefront can tell the Kubernetes Autoscaler to adjust the environment.



## Kubernetes Environment Monitoring

The [Wavefront Kubernetes Collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector)
collects metrics to give comprehensive insight into all layers of your Kubernetes environment (nodes, pods, services, config maps, etc).

Depending on the selected setup, metrics are sent to a Wavefront proxy and from there to the Wavefront service, or directly to the Wavefront service using direct ingestion.

![kubernetes core monitoring](/images/kubernetes_core.svg)

As part of environment we use the daemonset and we support leader election to ensure all Kubernetes metrics become available from Wavefront.

## Host-Level Monitoring

The Wavefront Kubernetes collector supports automatic monitoring of host-level metrics and host-level systemd metrics. When you set up the collector in your environment, it auto-discovers pods and services and starts collecting metrics for all services that support Telegraf.

To make this possible, we support daemonset mode. Furthermore, you can [filter the metrics](https://github.com/wavefrontHQ/wavefront-kubernetes-collector/blob/master/docs/filtering.md) before they are reported to Wavefront.

## Application Monitoring



![kubernetes application monitoring](/images/kubernetes_apps.svg)

## Scaling your Kubernetes Environment Based on Metrics

The Kubernetes infrastructure includes the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/), which can automatically scale the number of pods. The Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server by default, and the Horizontal Pod Autoscaler uses that information.

Wavefront allows you to scale based on other metrics.

* The Kubernetes Horizontal Pod Autoscaler uses CPU and memory information to optimize your Kubernetes environment.
* With the [Wavefront Horizontal Pod Autoscaler Adapter](https://www.github.com/wavefrontHQ/wavefront-kubernetes-adapter) you can scale the environment based on any metrics that Wavefront knows about. You can scale the environment based on application metrics external to your environment, and you can used the disk or metrics information from your pods to compute the correct scaling.

![kubernetes scaling](/images/kubernetes_scaling.svg)


## Wavefront Github Repositories for Kubernetes

We support the following open-source Github repositories:

-  **[wavefront-kubernetes-collector](https://github.com/wavefrontHQ/wavefront-kubernetes-collector)** Second-generation Kubernetes monitoring. Supports auto-discovery, scaling using daemonset, filtering, and more.
- **[wavefront-kubernetes-adapter](https://github.com/wavefrontHQ/wavefront-kubernetes-adapter)**
- **[wavefront-kubernetes](https://github.com/wavefrontHQ/wavefront-kubernetes)** First-generation Kubernetes monitoring. Contains definitions and templates for monitoring Kubernetes using Wavefront. Supports only sending data to the Wavefront proxy (no direct ingestion support).
- **[prometheus-storage-adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter)** -- Usually used with our first-generation Kubernetes monitoring solution. The adapter forwards data it receives to a Wavefront proxy. It is useful when you want some control on how data collected by Prometheus are made available in  Wavefront. Our second-generation solution, the Wavefront Kubernetes Collector, automatically collects Prometheus metrics.
