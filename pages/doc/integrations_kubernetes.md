---
title: Kubernetes Integration
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_kubernetes.html
summary: Learn how to set up Kubernetes to send container metrics to Wavefront.
---
Kubernetes is a popular open-source system for deploying and scaling containerized applications. It runs on Google Container Engine and it is also a popular choice for deploying containerized applications on Amazon Web Services.

{% include note.html content="If you installed a Wavefront Kubernetes integration before February 14th, 2017, we recommend upgrading your Heapster container image to **wavefronthq/heapster-amd64:latest** and getting the latest Kubernetes dashboard. These changes improve dashboard performance for large Kubernetes deployments." %}

## Metric Collection
Heapster is a service that runs on Kubernetes. It collects and aggregates resource metrics (CPU, memory, storage, network) about the Kubernetes cluster, containers, pods, and nodes. Wavefront maintains an image of Heapster that will send metrics to your [Wavefront proxy](proxies_installing).
 
## Instructions
To set up the Kubernetes integration:

1. Deploy a Wavefront proxy. Use this [wavefront-proxy.yml](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/deploy/wavefront-proxy.yml) to deploy a containerized Wavefront proxy using `kubectl` or the Kubernetes UI. Change \<wavefront_api_token\> to a valid [API token](wavefront_api#api-tokens) and \<wavefront_instance\> to your Wavefront URL.
1. Add a Wavefront proxy service. Expose the Wavefront proxy deployed in step 1 to other services on the cluster on ports 2878 and 4242 so they can send metrics into Wavefront. You can use this [wavefront-proxy-service.yml](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/deploy/wavefront-proxy-service.yml) file which exposes TCP connections to the addresses wavefront-proxy:2878 and wavefront-proxy:4242 on the cluster.
1. Deploy Heapster. Use this [heapster.yml](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/deploy/heapster.yml) file to deploy our image of Heapster. It is already configured to flush metrics to the service you defined in step 2. 
1. Additional options. The Wavefront sink for Heapster has several [additional configuration options](https://github.com/wavefrontHQ/integrations/tree/master/kubernetes) that may or may not be useful depending on your use case.
 
## Dashboard
Once you have started collecting metrics from your Kubernetes cluster, you can deploy this [dashboard](https://github.com/wavefrontHQ/integrations/blob/master/kubernetes/dashboards/K8s.json).

  ![k8_nodes_namespaces](images/k8_nodes_namespaces.png)
  
  ![k8_pods](images/k8_pods.png)
  
  ![k8_pod_containers](images/k8_pod_containers.png)

{% include links.html %}
