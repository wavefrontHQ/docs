---
title: AWS ECS Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_aws_ecs.html
summary: Learn how to send AWS ECS data to Wavefront.
---
[Amazon EC2 Container Service (ECS)](https://aws.amazon.com/ecs/) is Amazon's Docker container orchestration system. From the Amazon ECS website:

```quote
Amazon EC2 Container Service (ECS) is a highly scalable, high performance container management service 
that supports Docker containers and allows you to easily run applications on a managed cluster of 
Amazon EC2 instances.
```

This guide provides detailed steps on how to install and configure Wavefront's ECS integration. The integration provides the following:

- Monitoring of important CloudWatch metrics related to Amazon ECS.
- Monitoring of detailed metrics about individual containers, services, and clusters running in your AWS ECS environment.
 
## Requirements

- Access to Amazon Web Services.
- Access to a [Wavefront proxy](proxies_installing.html) - Preferably running in AWS or a place accessible to your ECS instances.
- Wavefront AWS integration - Parts of the ECS integration use CloudWatch metrics, which can be acquired by configuring the Wavefront AWS integration.
 
## Configure AWS Integration
 
Set up [Wavefront's AWS cloud integration](integrations_aws_metrics.html). This allows Wavefront to collect useful high-level metrics about ECS using the Amazon CloudWatch API.
 
## Create Wavefront cAdvisor Task Definition
 
Wavefront maintains an image of [cAdvisor](integrations_cadvisor.html) that includes a Wavefront storage driver. These steps create an ECS task definition that ensures the Wavefront cAdvisor container automatically runs on each EC2 instance in your ECS cluster.

1. Within AWS Services, navigate to **EC2 Container Service**. It appears below EC2. 
1. Click **Task Definitions**, then **Create new Task Definition**:
  ![create task def](images/create_new_task_definition.png)
1. Scroll to the bottom of the new Task Definition form and click the **Configure via JSON** button. A JSON form displays.
   1. Paste the [JSON example](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/aws-ecs/example-task-definition.json) into the JSON form field:
 
      ![paste json](images/paste_json.png)
  
   1. In the JSON form, set the property `-storage_driver_wf_proxy_host` to `<wavefront_proxy_ip_address>:<port>`. See [Docker Integration (cAdvisor)](integrations_cadvisor.html) for an explanation of all the available options.
   1. Click **Save**.
1. Click the **Create** button at the bottom of the Task Definition form.
1. Select **Actions > Run Task**.

   ![actions menu](images/actions_run_task.png)
1. In the **Placement Templates** dropdown under the Task Placement section, select **One Task Per Host**. This ensures that each EC2 instance in your ECS cluster has a Wavefront cAdvisor task.

   ![actions menu](images/one_task_per_host.png)
1. Click **Run Task**.

## View ECS Container Metrics

1. Select **Browse > Metrics**. 
1. In the Metrics field, enter `cadvisor.*`.

Alternatively, deploy the [AWS ECS dashboard](integrations_aws_metrics.html#aws-dashboards):

![db aws ecs](images/db_aws_ecs.png)


