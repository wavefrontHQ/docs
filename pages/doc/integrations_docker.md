---
title: Monitoring Docker Containers
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_docker.html
summary: Learn how to monitor Docker containers in Wavefront.
---

Wavefront provides several options for monitoring Docker containers. Which is best depends on which Docker orchestration system you are using (if any).
 
<table class="layout">
<tbody>
<tr>
<td style="text-align: center;vertical-align: bottom; font-weight:bold"><a href="integrations_cadvisor"><img src="images/docker.png"/></a><br /><a href="integrations_cadvisor">Docker</a></td>
<td style="vertical-align:middle"><a href="https://github.com/google/cadvisor">Google cAdvisor</a> collects metrics from containers running on any Docker host. One of the major benefits is that cAdvisor runs inside a container itself which means it can be launched by <strong>docker run</strong> or <strong>docker-compose</strong>. cAdvisor automatically discovers any running containers on a host as they're spun up or down.
Wavefront has a native storage driver for cAdvisor. As it collects resource metrics, it adds your Docker labels as point tags. This allows you to add useful metadata to your container metrics and leverage Wavefront's query engine for unprecedented visibility and intelligence into your running containers.
</td>
</tr>
<tr>
<td style="text-align: center;vertical-align: bottom; font-weight:bold"><a href="integrations_aws_ecs"><img src="images/amazon_ecs.png"/></a><br /><a href="integrations_aws_ecs">Amazon EC2<br />Container Service (ECS)</a></td>
<td style="vertical-align:middle">Google cAdvisor is also a great fit for monitoring ECS. All you need to do is run cAdvisor on each ECS EC2 instance. The Amazon blog post <a href="https://aws.amazon.com/blogs/compute/running-an-amazon-ecs-task-on-every-instance/">Running an Amazon ECS Task (cAdvisor) on Every Instance</a>​ explains how to automatically run cAdvisor on EC2 instances as they are created.
</td>
</tr>
<tr>
<td style="text-align: center;vertical-align: bottom; font-weight:bold"><a href="integrations_kubernetes"><img src="images/kubernetes.png"/></a><br /><a href="integrations_kubernetes">Kubernetes</a></td>
<td style="vertical-align:middle">Wavefront has a native storage driver for <a href="http://blog.kubernetes.io/2015/05/resource-usage-monitoring-kubernetes.html">Heapster</a>. Heapster collects and aggregates resource metrics at every level of a Kubernetes cluster. Kubernetes labels are applied as point tags to resource metrics.
</td>
</tr>
</tbody>
</table>

If you're looking for information on how to run the Wavefront proxy as a container, see [Running a Wavefront Proxy in Docker](proxies_running_docker).


{% include links.html %}
