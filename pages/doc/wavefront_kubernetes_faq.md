---
title: Wavefront and Kubernetes FAQ
keywords: containers, kubernetes
tags: [containers, kubernetes]
sidebar: doc_sidebar
permalink: wavefront_kubernetes_faq.html
summary: Get answers about viewing Kubernetes metrics in Wavefront
---

The [Wavefront Collector for Kubernetes on github](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes) enables monitoring Kubernetes clusters and sending metrics to Wavefront. Much of the doc for the project is in the docs folder on Github.  This page has some special tips and tricks to help you create the user experience you're after.

<!--- Consider including Improve Display Speed with Sampling Option here --->

## How Do I Set Up Color Mapping?

Color mapping is a powerful way to get users' attention when there's a problem. We support color mapping for the following charts:
* Single stat
* Topk
* Node map
