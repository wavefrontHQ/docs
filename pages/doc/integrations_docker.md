---
title: Monitoring Docker Containers
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_docker.html
summary: Learn how to monitor Docker containers to Wavefront.
---

Wavefront provides several options for monitoring Docker containers. Which is best depends on which Docker orchestration system you are using (if any).
 
If you're looking for information on how to run the Wavefront proxy as a container, see [Running a Wavefront Proxy in Docker](proxies_running_docker).
 
<table class="layout">
<tbody>
<tr>
<td><img src="images/docker.png"/><br /><br /><strong>Google cAdvisor</strong></td>
<td><a href="https://github.com/google/cadvisor">Google cAdvisor</a> collects metrics from containers running on any Docker host. One of the major benefits is that cAdvisor runs inside a container itself which means it can be launched by <strong>docker run</strong> or <strong>docker-compose</strong>. cAdvisor automatically discovers any running containers on a host as they're spun up or down.
Wavefront has a native storage driver for cAdvisor. As it collects resource metrics, it adds your Docker labels as point tags. This allows you to add useful metadata to your container metrics and leverage Wavefront's query engine for unprecedented visibility and intelligence into your running containers.
For information on integrating cAdvisor with Wavefront, see <a href="integrations_cadvisor.html">Docker Integration (cAdvisor)</a>.
</td>
</tr>
<tr>
<td><img src="images/amazon_ecs.png"/><br /><br /><strong>Amazon EC2 Container Service (ECS)</strong></td>
<td>Google cAdvisor is also a great fit for monitoring ECS. All you need to do is run cAdvisor on each ECS EC2 instance. The Amazon blog post <a href="https://aws.amazon.com/blogs/compute/running-an-amazon-ecs-task-on-every-instance/">Running an Amazon ECS Task (cAdvisor) on Every Instance</a>​ explains how to automatically run cAdvisor on EC2 instances as they are created.
For information on integrating cAdvisor with Wavefront, see <a href="integrations_aws_ecs.html">Amazon ECS Integration</a>​.
</td>
</tr>
<tr>
<td><img src="images/kubernetes.png"/><br /><br /><strong>Kubernetes</strong></td>
<td>Wavefront has a native storage driver for <a href="http://blog.kubernetes.io/2015/05/resource-usage-monitoring-kubernetes.html">Heapster</a>. Heapster collects and aggregates resource metrics at every level of a Kubernetes cluster. Kubernetes labels are applied as point tags to resource metrics.
For information on integrating Kubernetes with Wavefront, see <a href="integrations_kubernetes.html">Kubernetes Integration</a>.
</td>
</tr>
</tbody>
</table>

{% include links.html %}
