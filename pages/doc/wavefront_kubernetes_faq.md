---
title: Kubernetes FAQ
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wavefront_kubernetes_faq.html
summary: Answers about viewing Kubernetes metrics in Tanzu Observability (formerly known as VMware Aria Operations for Applications).
---

The [Kubernetes Metrics Collector on GitHub](https://github.com/wavefrontHQ/observability-for-kubernetes) enables monitoring Kubernetes clusters and sending metrics to Tanzu Observability. Much of the doc for the project is in the [docs folder on GitHub](https://github.com/wavefrontHQ/observability-for-kubernetes/tree/main/docs/collector). This page has some special tips and tricks to help you create the user experience you're after.

<!--- Consider including Improve Display Speed with Sampling Option here --->

## What Is the Kubernetes Metrics Collector?

The [Collector](https://github.com/wavefrontHQ/observability-for-kubernetes) is an agent that you deploy within a Kubernetes cluster as a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/). This agent collects metrics about a Kubernetes cluster and sends them to the Wavefront service. You can visualize these metrics using pre-built dashboards that help you monitor your Kubernetes clusters.

## Do I Have to Deploy the Collector on Every Kubernetes Cluster?

Yes, deploy the Collector on each of your Kubernetes clusters.

## How Can I Filter Data?

You can filter data by configuring the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes) with data collection filters or by configuring Wavefront proxy preprocessor rules.

### Data Collection Filters

The [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes) can be configured with data collection filters to:

* Define a list of metrics that will be reported.
* Define a list of metrics that will be dropped.
* Define a list of tags that are guaranteed to not be removed as part of limiting the point tags to the 20 tag limit.

See the [filtering scenario](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/deploy/scenarios/wavefront-collector-filtering.yaml) for an example of how to define data collection filters using the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes).

### Wavefront Proxy Preprocessor Rules

Filter using a Wavefront [proxy preprocessor rule](proxies_preprocessor_rules.html). You can use point filtering/altering rules and span filtering/altering rules. The proxy deals with data coming from Kubernetes exactly the same way as with data from other data sources.

See the [proxy preprocessor rules scenario](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/deploy/scenarios/wavefront-proxy-preprocessor-rules.yaml) for an example of how to configure the Wavefront proxy preprocessor rules using the [Observability for Kubernetes Operator](https://github.com/wavefrontHQ/observability-for-kubernetes).

## How Do I Monitor Prometheus Metric Endpoints?

Many Kubernetes components and applications expose metrics in the Prometheus format via HTTP endpoints. The Collector natively supports discovering such endpoints and collecting metrics from them. The Collector listens for the addition of pods within a Kubernetes cluster, and can automatically start collecting the Prometheus metrics from pods by:

* Adding specific annotations on a pod to inform the Collector to start collecting metrics from it.
* Configuring static discovery rules to identify pods by labels, namespaces or image names and information on how to collect metrics from the pods.

See the [auto discovery documentation](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md) for details.

## How Do I Monitor Popular Third-Party Applications?

The Collector supports monitoring over 20 popular applications such as Redis, Memcached, Postgres, MongoDB, etc. Use [static discovery rules](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/collector/discovery.md#rule-based-discovery) to monitor these applications.
