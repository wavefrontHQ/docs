---
title: Monitor and Scale Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers]
sidebar: doc_sidebar
permalink: wavefront_kubernetes.html
summary: Learn about using Wavefront with Kubernetes
---
Wavefront allows you to monitor the Kubernetes metrics and the application metrics in your Kubernetes environment. You can also set up Wavefront so the metrics available in Wavefront are used to scale your Kubernetes environment through the Kubernetes Horizontal Pod Autoscaler.

In the following video, Pierre Tessier discusses different approaches to monitor and scale Kubernetes.

<p><a href="https://www.youtube.com/watch?v=uqknhOpUEqU&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_kubernetes_pierre.png" style="width: 700px;" alt="monitor and scale kubernetes"/></a>
</p>

## Kubernetes and Wavefront

The architecture and the tools you use for monitoring Kubernetes differ for core monitoring and for monitoring applications.

* **Core monitoring:** Monitor performance of the Kubernetes cluster and the state of the objects within the cluster using a metrics collector such as Heapster.
* **Application monitoring:** Monitor applications such as NGNIX, Redis, or MySQL that run in your Kubernetes cluster. To monitor applications, you might use a Telegraf sidecar or Telegraf in a standalone container which can also be used for Prometheus scraping.

Our [Monitoring VMware Kubernetes Engine and Application Metrics with Wavefront](https://www.wavefront.com/monitoring-vmware-kubernetes-engine-and-application-metrics-with-wavefront/) blog discusses that special use case.

Visit the [wavefront-kubernetes Github repository](https://www.github.com/wavefrontHQ/wavefront-kubernetes) to find sample deployment definitions and container images used for core and application monitoring.

## Core Monitoring

Core monitoring retrieves metrics using a cluster monitoring service -- currently Heapster -- and through kube-state-metrics.
* The cluster monitoring service provides CPU, memory, filesystem, and network/IO usage for the cluster and all nodes, pods, namespaces, and containers.
* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) provides the current state of Kubernetes resources such as deployments, replica sets, pods, etc.

Monitoring data are sent to a Wavefront proxy and from there to the Wavefront service.

![kubernetes core monitoring](/images/kubernetes_core.svg)

## Application Monitoring

How you perform application monitoring depends on the type of application. You have these choices.
* For many self-contained services such as Redis you can use a Telegraf sidecar container. Each deployment of the pod will have the core container and all sidecar containers defined.

  A sidecar enhances or extends the capability of an existing container and is deployed within the same Kubernetes pod. The pod wraps these containers and their storage resources into a single entity. No changes to the existing container image are necessary.

* To monitor a service deployed as a cluster, for example, a MySQL cluster, you deploy your Telegraf agent in a standalone container. This container can live in the same node as the cluster you monitor, or even in a different node.
* You can also use a standalone Telegraf agent to do Prometheus scraping. You deploy a container with Telegraf, and the Telegraf Prometheus plugin can scrape Prometheus endpoints for metrics.

  An pod that contains multiple and dynamic replicas can be exposed using a headless service. This service is used by the Telegraf Prometheus plugin to scrape metrics from each individual pod/endpoint.

  As in the other cases, Telegraf sends the metrics that it collects to the Wavefront proxy.

![kubernetes application monitoring](/images/kubernetes_apps.svg)

## Scaling your Kubernetes Environment Based on Metrics

The Kubernetes infrastructure includes the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/), which can automatically scale the number of pods. The Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server by default, and the Horizontal Pod Autoscaler uses that information.

Wavefront allows you to scale based on other metrics.

* The [Wavefront Horizontal Pod Autoscaler Adapter](https://www.github.com/wavefrontHQ/wavefront-kubernetes-adapter) allows you to collect additional metrics, such as memory or other information from your Kubernetes environment, and provide them to the Horizontal Pod Autoscaler. The Horizontal Pod Autoscaler can then use that information to scale the environment.

* In addition to other Kubernetes environment metrics, the Wavefront Horizontal Pod Autoscaler Adapter can also allow any metric and query within Wavefront to be the driving factor for scale. As a result, you can scale Kubernetes pods on any metric, including custom application metrics or even metrics external to your Kubernetes environment.

![kubernetes scaling](/images/kubernetes_scaling.svg)

In the following video, two Wavefront systems engineers discuss container monitoring best practices.

<p><a href="https://www.youtube.com/watch?v=_XYr1hlQqfI&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K&index=1"><img src="/images/v_container_monitoring.png" style="width: 700px;" alt="monitor and scale kubernetes"/></a>
</p>
