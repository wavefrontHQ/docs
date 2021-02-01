---
title: Container Integrations
keywords: integrations, Docker, containers
tags: [integrations]
sidebar: doc_sidebar
published: false
permalink: integrations_containers.html
summary: Learn how to monitor containers in Wavefront.
---

Wavefront provides several options for monitoring containers. Which is best depends on whether or not you are using a Docker orchestration system. This page explains how to monitor containers in Wavefront. See our blog post [How to Monitor Containers Efficiently at Scale](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/how-to-monitor-containers-efficiently-at-scale) for some background info.

<table class="layout">
<tbody>
<tr>
<td style="text-align: center;vertical-align: bottom; font-weight:bold"><a href="integrations.html#in-product-integrations"><img src="images/docker.png"/></a><br /><a href="integrations.html#in-product-integrations">Docker</a></td>
<td style="vertical-align:middle"><a href="https://github.com/google/cadvisor">Google cAdvisor</a> collects metrics from containers running on any Docker host. One of the major benefits is that cAdvisor runs inside a container itself which means it can be launched by <code>docker run</code> or <code>docker-compose</code>. cAdvisor automatically discovers any running containers on a host as they're spun up or down.
Wavefront has a native storage driver for cAdvisor. As it collects resource metrics, it adds your Docker labels as point tags. This allows you to add useful metadata to your container metrics and leverage Wavefront's query engine for unprecedented visibility and intelligence into your running containers.
</td>
</tr>
<tr>
<td style="text-align: center;vertical-align: bottom; font-weight:bold"><a href="integrations_aws_ecs.html"><img src="images/amazon_ecs.png"/></a><br /><a href="integrations_aws_ecs.html">Amazon EC2<br />Container Service (ECS)</a></td>
<td style="vertical-align:middle">Google cAdvisor is also a great fit for monitoring ECS. All you need to do is run cAdvisor on each ECS EC2 instance. The Amazon blog post <a href="https://aws.amazon.com/blogs/compute/running-an-amazon-ecs-task-on-every-instance/">Running an Amazon ECS Task (cAdvisor) on Every Instance</a>​ explains how to run cAdvisor on EC2 instances as they are created. For our implementation, see <a href="integrations_aws_ecs.html">AWS ECS Integration</a>.
</td>
</tr>
<tr>
<td style="text-align: center;vertical-align: bottom; font-weight:bold"><a href="integrations.html#in-product-integrations"><img src="images/kubernetes.png"/></a><br /><a href="integrations.html#in-product-integrations">Kubernetes</a></td>
<td style="vertical-align:middle">Wavefront Collector for Kubernetes collects and aggregates resource metrics at every level of a Kubernetes (also referred to as k8s) cluster. Wavefront has a native storage driver for Wavefront Collector for Kubernetes.  Kubernetes labels are applied as point tags to resource metrics.
</td>
</tr>
</tbody>
</table>
