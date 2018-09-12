---
title: Monitoring Kubernetes with Wavefront
keywords: containers, kubernetes
tags: [containers]
sidebar: doc_sidebar
permalink: wavefront_kubernetes.html
summary: Learn about using Wavefront with Kubernetes
---
Wavefront allows you to monitor the Kubernetes metrics and the application metrics in your Kubernetes environment. You can also set up Wavefront so the metrics available in Wavefront are used to scale your Kubernetes environment through the Kubernetes Horizontal Pod Autoscaler.

In the following video, Pierre Tessier discusses different approaches to monitor and scale Kubernetes.

LINK HERE


## Kubernetes and Wavefront

The architecture and the tools you use differs for core monitoring and for monitoring applications.

* **Core monitoring:** Monitor performance of the Kubernetes cluster and the state of the objects within the cluster using a metrics collector such as Heapster.
* **Application monitoring:** Monitor applications such as NGNIX, Redis, or MySQL that run in your Kubernetes cluster. To monitor applications, you might use a Telegraf sidecar or Telegraf in a standalone container which can also be used for Prometheus scraping.

Our [Monitoring VMware Kubernetes Engine and Application Metrics with Wavefront](https://www.wavefront.com/monitoring-vmware-kubernetes-engine-and-application-metrics-with-wavefront/) discussed that special use case.

Visit the [wavefront-kubernetes](https://www.github.com/wavefrontHQ/wavefront-kubernetes) GitHub repository to find sample deployment definitions, and container images used for Core and Application Monitoring.

## Core Monitoring

Core monitoring retrieves metrics using a cluster monitoring service -- currently Heapster -- and through kube-state-metrics.
* The cluster monitoring service provides CPU, memory, filesystem, and network/IO usage for the cluster and all nodes, pods, namespaces, and containers.
* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) provides the current state of Kubernetes resources such as deployments, replica sets, pods, etc.

Monitoring data are sent to a Wavefront proxy and from there to the Wavefront service.

![kubernetes core monitoring](/images/kubernetes_core.jpeg)

## Application Monitoring

How you perform application monitoring depends on the type of application. You have these choices.
* For many self contained services such as Redis you can use a Telegraf sidecar container. Each deployment of the pod will have the core conainer, and all sidecar containers defined.

  A sidecar enhances or extends the capability of an existing container and is deployed within the same Kubernetes pod. The pod wraps these containers and their storage resources into a single entity. No changes to the existing container image are necessary.

* To monitor a service deployed as a cluster, for example, a MySQL cluster, you deploy your Telegraf agent in a standalone container. This container can live in the same node as the cluster you monitor, or even in a different node.
* You can also use a standalone Telegraf agent to do Prometheus scraping. You deploy a container with Telegraf, and the Telegraf Prometheus plugin is leveraged to scrape Prometheus endpoints for metrics. 
  
  An pod that may contain mulitple and dynamic replicas, can be exposed using a headless service. This service is used by the Telegraf Prometheus plugin to scrape metrics from each individual pod/endpoint.

  As in the other cases, Telegraf sends the metrics it collects to the Wavefront proxy.

![kubernetes application monitoring](/images/kubernetes_apps.jpg)

## Scaling your Kubernetes Environment Based on Metrics

The Kubernetes infrastructure includes the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) which can automatically scale the number of pods.

* By default, the Horizontal Pod Autoscaler gets CPU and memory information from the Kubernetes Metrics Server.

* The [Wavefront Horizontal Pod Autoscaler Adapter](https://www.github.com/wavefrontHQ/wavefront-kubernetes-adapter) allows you to collect additional metrics, such as memory or other information from your Kubernetes environment, and provide them to the Horizontal Pod Autoscaler. The Horizontal Pod Autoscaler can then use that information to scale the environment.

* In addition to other Kubernetes environment metrics, the Wavefront Horizontal Pod Autoscaler Adapter can also allow provide any metric and query within Wavefront to be the driving factor for scale. This functionality allows you to scale Kubernetes pods on any metric, including custom applicaiton metrics, or even metrics external to your Kubernetes environment.

![kubernetes scaling](/images/kubernetes_scaling.jpg)
