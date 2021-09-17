---
title: Wavefront and Kubernetes FAQ
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wavefront_kubernetes_faq.html
summary: Answers about viewing Kubernetes metrics in Wavefront
---

The [Wavefront Collector for Kubernetes on github](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) enables monitoring Kubernetes clusters and sending metrics to Wavefront. Much of the doc for the project is in the [docs folder on Github](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/tree/master/docs). This page has some special tips and tricks to help you create the user experience you're after.

<!--- Consider including Improve Display Speed with Sampling Option here --->

## What is the Wavefront Collector for Kubernetes?

The [Wavefront Collector](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) is an agent that you deploy within a Kubernetes cluster as a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/).This agent collects metrics about a Kubernetes cluster and sends them to the Wavefront SaaS service. You can visualize these metrics using pre-built dashboards that help you monitor your Kubernetes clusters.

## Do I Have to Deploy the Wavefront Collector on Every Kubernetes Cluster?

Yes, deploy Wavefront Collector on each of your Kubernetes clusters.

## How Can I Filter Metric Data?

During the [Helm installation](https://github.com/wavefrontHQ/helm/tree/master/wavefront), you can pass in a `values.yaml` as a parameter.

Using `values.yaml` you can:
* [Filter out generated labels](https://github.com/wavefrontHQ/helm/blob/0bbf6a0e46e6e884c0b3c44b9c7d51f4b9392b20/wavefront/values.yaml#L105)
* [Create a filter to apply toward all metrics collected by the collector](https://github.com/wavefrontHQ/helm/blob/0bbf6a0e46e6e884c0b3c44b9c7d51f4b9392b20/wavefront/values.yaml#L86)

## How Do I Monitor Prometheus Metric Endpoints?

Many Kubernetes components and applications expose metrics in the Prometheus format via HTTP endpoints. The Wavefront Collector natively supports discovering such endpoints and collecting metrics from them. The Collector listens for the addition of pods within a Kubernetes cluster, and can automatically start collecting the prometheus metrics from pods by:

* Adding specific annotations on a pod to inform the Collector to start collecting metrics from it.
* Configuring static discovery rules to identify pods by labels, namespaces or image names and information on how to collect metrics from the pods.

See the [auto discovery documentation](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md) for details.

## How Do I Monitor Popular Third-Party Applications?

The Wavefront Collector supports monitoring over 20 popular applications such as Redis, Memcached, Postgres, MongoDB etc. Use [static discovery rules](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md#rule-based-discovery) to monitor these applications.
