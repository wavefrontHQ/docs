---
title: AWS ECS Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_aws_ecs.html
summary: Learn how to send AWS ECS data to Wavefront.
---
Amazon EC2 Container Service (ECS) is Amazon's Docker container orchestration system. From the Amazon ECS website:

```quote
Amazon EC2 Container Service (ECS) is a highly scalable, high performance container management service 
that supports Docker containers and allows you to easily run applications on a managed cluster of Amazon 
EC2 instances.
```
This guide provides detailed steps on how to install and configure Wavefront's ECS integration. The integration provides the following:

- Monitoring of important CloudWatch metrics related to Amazon ECS.
- Monitoring of detailed metrics about individual containers, services, and clusters running in your AWS ECS environment.
 
## Requirements

- Access to Amazon Web Services
- Access to a [Wavefront proxy](proxies_installing) - Preferably running in AWS or a place accessible to your ECS instances.
- Wavefront AWS Integration - Parts of the ECS integration use CloudWatch metrics, which can be acquired by configuring the Wavefront AWS integration.
 
## Configure AWS Integration
 
If you have not already done so already, set up [Wavefront's AWS Integration](integrations_aws_metrics). This allows Wavefront to collect useful high-level metrics about ECS using the Amazon CloudWatch API.
 
## Create Wavefront cAdvisor Task Definition
 
Wavefront maintains an image of [cAdvisor](integrations_cadvisor) that includes a Wavefront storage driver. The goal of these steps is to create an ECS task definition that ensures the Wavefront cAdvisor container runs on each EC2 instance within your ECS cluster automatically.
 
  1. Within AWS Services, navigate to **EC2 Container Service**. It appears below EC2. 
  1. Click **Task Definitions**, then **Create new Task Definition**:
    ![create task def](images/create_new_task_definition.png)
  1. Scroll to the bottom of the new Task Definition form and click the **Configure via JSON** button:
    ![configure json](images/configure_json.png)
  1. Paste the JSON example into the JSON form field:
    ![paste json](images/paste_json.png)
  1. In the JSON example, update the following:
      - **-storage_driver_wf_proxy_host** - Replace YOUR_WAVEFRONT_PROXY_ADDRESS.
      - **-storage_driver_wf_interval** - The interval is preset and defaults to 60 seconds. This controls how often metrics are flushed into Wavefront.
      - **-storage_driver_wf_add_tags** - This allows you to set one or more point tags on the metrics collected by cAdvisor. The format is: **tag1Name=tag1Value** **tag2Name=tag2Value**

     Optional: See the guide on our [Wavefront cAdvisor container](integrations_cadvisor) for a full explanation of the options available.
  1. Click the **Create** button at the bottom of the form:
    ![create menu](images/create.png)
  1. Select **Actions > Run Task**.
    ![actions menu](images/actions_run_task.png)
  1. In the **Placement Templates** drop-down under the Task Placement section, select **One Task Per Host**. This ensures that each EC2 instance in your ECS cluster has a Wavefront cAdvisor task.
    ![actions menu](images/one_task_per_host.png)
  1. Click **Run Task**.
   

{% include links.html %}
