---
title: Kubernetes FAQ
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wavefront_kubernetes_faq.html
summary: Answers about viewing Kubernetes metrics in VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).
---

The [Operations for Applications Collector for Kubernetes on GitHub](https://github.com/wavefrontHQ/observability-for-kubernetes) enables monitoring Kubernetes clusters and sending metrics to VMware Aria Operations for Applications. Much of the doc for the project is in the [docs folder on GitHub](https://github.com/wavefrontHQ/observability-for-kubernetes/tree/main/docs/collector). This page has some special tips and tricks to help you create the user experience you're after.

<!--- Consider including Improve Display Speed with Sampling Option here --->

## What Is the Operations for Applications Collector for Kubernetes?

The [Collector](https://github.com/wavefrontHQ/observability-for-kubernetes) is an agent that you deploy within a Kubernetes cluster as a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/). This agent collects metrics about a Kubernetes cluster and sends them to the Wavefront service. You can visualize these metrics using pre-built dashboards that help you monitor your Kubernetes clusters.

## Do I Have to Deploy the Collector on Every Kubernetes Cluster?

Yes, deploy the Collector on each of your Kubernetes clusters.

## How Can I Filter Metric Data?

You can filter metrics data during installation or later using proxy preprocessor rules.

### Filter During Installation

During the [Helm installation](https://github.com/wavefrontHQ/helm/tree/master/wavefront), you can pass in a `values.yaml` as a parameter.

Using `values.yaml` you can:
* [Filter out generated labels](https://github.com/wavefrontHQ/helm/blob/0bbf6a0e46e6e884c0b3c44b9c7d51f4b9392b20/wavefront/values.yaml#L105)
* [Create a filter to apply toward all metrics collected by the collector](https://github.com/wavefrontHQ/helm/blob/0bbf6a0e46e6e884c0b3c44b9c7d51f4b9392b20/wavefront/values.yaml#L86)

### Filter Using Proxy

Filter using a Wavefront [proxy preprocessor rule](proxies_preprocessor_rules.html). You can use point filtering/altering rules and span filtering/altering rules. The proxy deals with data coming from Kubernetes exactly the same way as with data from other data sources. 

## How Do I Monitor Prometheus Metric Endpoints?

Many Kubernetes components and applications expose metrics in the Prometheus format via HTTP endpoints. The Collector natively supports discovering such endpoints and collecting metrics from them. The Collector listens for the addition of pods within a Kubernetes cluster, and can automatically start collecting the Prometheus metrics from pods by:

* Adding specific annotations on a pod to inform the Collector to start collecting metrics from it.
* Configuring static discovery rules to identify pods by labels, namespaces or image names and information on how to collect metrics from the pods.

See the [auto discovery documentation](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md) for details.

## How Do I Monitor Popular Third-Party Applications?

The Collector supports monitoring over 20 popular applications such as Redis, Memcached, Postgres, MongoDB, etc. Use [static discovery rules](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md#rule-based-discovery) to monitor these applications.
