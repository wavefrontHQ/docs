---
title: Monitoring Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers]
sidebar: doc_sidebar
permalink: wavefront_kubernetes.html
summary: Learn about using Wavefront with Kubernetes
---
Wavefront allows you to monitor the Kubernetes metrics and the application metrics in your Kubernetics environment. You can also set up Wavefront so the metrics available in Wavefront are used to scale your Kubernetes environment through the Kubernetes Horizontal Autoscaler.

In the following video, Pierre Tessier discusses different approaches to monitor and scale Kubernetes.

LINK HERE


## Kubernetes and Wavefront

The architecture and the tools you use differs for core monitoring and for monitoring applications.

* **Core monitoring:** Monitor performance of the Kubernetes cluster and the state of the objects within the cluster using a metrics collector such as Heapster.
* **Application monitoring:** Monitor applications such as NGNIX, Redis, or MySQL that run in your Kubernetes cluster. To monitor applications, you might use a Telegraf sidecar, Telegraf in a standalone container, or Prometheus scraping.

Our [Monitoring VMware Kubernetes Engine and Application Metrics with Wavefront](https://www.wavefront.com/monitoring-vmware-kubernetes-engine-and-application-metrics-with-wavefront/) discussed that special use case.


## Core Monitoring

Core monitoring retrieves metrics using a cluster monitoring service -- currently Heapster -- and through kube-state-metrics.
* The cluster monitoring service provides CPU, memory, filesystem, and network/IO usage for the cluster and all nodes, pods, namespaces, and containers.
* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) provides the current state of Kubernetics objects such as deployments, replica sets, pods, etc.

Monitoring data are sent to the Wavefront proxy and from there to the Wavefront service.

![kubernetes core monitoring](/images/kubernetes_core.jpeg)

## Application Monitoring

How you perform application monitoring depends on the type of application. You have these choices.
* For a single-pod application such as Redis you can use a Telegraf sidecar container. You might have more than one pod, each with a sidecar, inside a node.

  A sidecar enhances or extends the capability of an existing container and is deployed within the same Kubernetes pod. The pod wraps these containers and their storage resources into a single entity. No changes to the existing container image are necessary.

* To monitor a Kubernetes cluster, for example, a MySQL cluster, you deploy your Telegraf agent in a standalone container. This container can live in the same node as the cluster you monitor, or even in a different node.
* You can also use Wavefront with Prometheus. You deploy a container with Telegraf, and the Telegraf Prometheus plugin scrapes the Prometheus endpoint for metrics. A headless service exposes the Prometheus endpoint (port) so that it can be scraped easily.

  As in the other cases, Telegraf sends the metrics it collects to the Wavefront proxy.

![kubernetes application monitoring](/images/kubernetes_apps.jpg)

## Scaling your Kubernetes Environment Based on Metrics

The Kubernetes infrastructure includes the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) which can automatically scale the number of pods.

* By default, the Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server.

* The Wavefront Horizontal Pod Autoscaler Adapter allows you to collect additional metrics, such as memory or other information from your Kubernetes environment, and provide them to the Horizontal Pod Autoscaler. The Horizontal Pod Autoscaler can then use that information to scale the environment.

![kubernetes scaling](/images/kubernetes_scaling.jpg)
