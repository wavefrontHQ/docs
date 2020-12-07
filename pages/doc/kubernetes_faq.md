---
title: Wavefront and Kubernetes FAQ
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wf_kubernetes_faq.html
published: false 
summary: Get answers about viewing Kubernetes metrics in Wavefront
---

The [Wavefront Collector for Kubernetes on github](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) enables monitoring Kubernetes clusters and sending metrics to Wavefront. Much of the doc for the project is in the docs folder on Github.  This page has some special tips and tricks to help you create the user experience you're after.

<!--- Consider including Improve Display Speed with Sampling Option here --->

## What is the Wavefront Collector for Kubernetes?

The [Wavefront Collector](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) is an agent that you deploy within a Kubernetes cluster. It is deployed as a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) and collects metrics about a Kubernetes cluster and sends them to the Wavefront SaaS service. Wavefront provides pre-built dashboards that use these metrics to help you monitor your Kubernetes clusters.

## Do I have to deploy the Wavefront Collector on every Kubernetes cluster?
Yes, the Wavefront Collector should be deployed on each of your Kubernetes clusters.

## How Do I Monitor Prometheus Metric Endpoints?

Many Kubernetes components and applications expose metrics in the prometheus format via HTTP endpoints. The Wavefront Collector natively supports discovering such endpoints and collecting metrics from them. The Collector listens for the addition of pods within a Kubernetes cluster, and can automatically start collecting the prometheus metrics from pods by:

* Adding specific annotations on a pod to inform the Collector to start collecting metrics from it.
* Configuring static discovery rules to identify pods by labels, namespaces or image names and information on how to collect metrics from the pods.

See the [auto discovery documentation](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md) for further details.

## How Do I Monitor Popular Third Party Applications?
The Wavefront Collector supports monitoring over 20 popular applications such as Redis, Memcached, Postgres, MongoDB etc. These can be monitored using static discovery rules.

See the [auto discovery documentation](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md#rule-based-discovery) for further details.
