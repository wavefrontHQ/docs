---
title: Kubernetes Integration
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_kubernetes.html
summary: Learn how to set up Kubernetes to send container metrics to Wavefront.
---
[Kubernetes](https://kubernetes.io/) is a popular open-source system for deploying and scaling containerized applications. It runs on Google Container Engine and it is also a common choice for deploying containerized applications on Amazon Web Services.

[Heapster](https://github.com/kubernetes/heapster) is a service that runs on Kubernetes that collects and aggregates resource metrics (CPU, memory, storage, network) about the Kubernetes cluster, containers, pods, and nodes. Wavefront maintains a [Docker image](https://hub.docker.com/r/wavefronthq/heapster-amd64/) of Heapster that sends metrics to a [Wavefront proxy](proxies_installing.html).

{% include note.html content="If you installed a Wavefront Kubernetes integration before February 14th, 2017, we recommend upgrading your Heapster image to **wavefronthq/heapster-amd64:latest** and getting the latest Kubernetes dashboard. These changes improve dashboard performance for large Kubernetes deployments." %}


## Setting up the Kubernetes Integration

To set up to send Kubernetes metrics to Wavefront:

1. Use [wavefront-proxy.yml](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/deploy/wavefront-proxy.yml) to deploy a containerized Wavefront proxy using `kubectl` or the Kubernetes UI. Change \<YOUR_API_TOKEN\> to a valid [API token](wavefront_api.html#api-tokens) and \<YOUR_INSTANCE\> to your Wavefront URL.
1. Add a Wavefront proxy service. Expose the Wavefront proxy deployed in step 1 to other services on the cluster on ports 2878 and 4242 so they can send metrics into Wavefront. Use  [wavefront-proxy-service.yml](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/deploy/wavefront-proxy-service.yml), which exposes TCP connections to the addresses wavefront-proxy:2878 and wavefront-proxy:4242 on the cluster.
1. Use [heapster.yml](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/deploy/heapster.yml) to deploy the Wavefront Heapster image. The file is configured to flush metrics to the service you defined in step 2. 
1. Optionally set [additional configuration options](https://github.com/wavefrontHQ/integrations/tree/master/kubernetes) depending on your use case.
 
## Kubernetes Dashboard

Once you have started collecting metrics from your Kubernetes cluster, optionally deploy the Wavefront [Kubernetes dashboard](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/dashboards/K8s.json), which monitors namespaces, pods, and containers:

  ![k8_nodes_namespaces](images/k8_nodes_namespaces.png)
  
  ![k8_pods](images/k8_pods.png)
  
  ![k8_pod_containers](images/k8_pod_containers.png)


