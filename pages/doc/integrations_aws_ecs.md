---
title: AWS ECS Integration Details
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

Wavefront supports an Amazon Web Services [built-in integration](amazon_ecs.html) that allows Wavefront to collect useful high-level metrics about ECS using the AWS CloudWatch API, but that's only part of your setup.

## Overview

The integration basics are covered in our [AWS ECS Integration](amazon_ecs.html) page.

This page provides detailed steps on how to install and configure the Wavefront ECS integration. After you complete these steps, the integration provides:

- Monitoring of important CloudWatch metrics related to Amazon ECS.
- Monitoring of detailed metrics about individual containers, services, and clusters running in your AWS ECS environment.

### Prerequisites

- Access to Amazon Web Services.
- Access to a [Wavefront proxy](proxies_installing.html) - Preferably running in AWS or a place accessible to your ECS instances.
- Wavefront AWS integration - Parts of the ECS integration use CloudWatch metrics, which can be acquired by configuring the Wavefront AWS integration.

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

### Configure the AWS Integration
=======
## Configure the AWS Integration
>>>>>>> Stashed changes
=======
## Configure the AWS Integration
>>>>>>> Stashed changes
=======
## Configure the AWS Integration
>>>>>>> Stashed changes

Set up the [AWS integration](integrations_aws_metrics.html). This allows Wavefront to collect useful high-level metrics about ECS using the AWS CloudWatch API.

## Create Wavefront cAdvisor Task Definition

Wavefront maintains an image of cAdvisor that includes a Wavefront storage driver. These steps create an ECS task definition that ensures the Wavefront cAdvisor container automatically runs on each EC2 instance in your ECS cluster.

1. Within AWS Services, navigate to **ECS**.
1. Click **Task Definitions**, then **Create new Task Definition**.
  ![create task def](images/create_new_task_definition.png)
1. Select the launch type that you want your task to be compatible with and click **Next Step**.

   ![select launch type](images/select_launch_type.png)
1. Scroll to the bottom of the new Task Definition form and click the **Configure via JSON** button.
   1. Delete the content and paste the [JSON example](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/aws-ecs/example-task-definition.json) into the JSON form field:

      ![paste json](images/paste_json.png)

   1. In the JSON form, set the `-storage_driver_wf_proxy_host` property  to `<wavefront_proxy_ip_address>:<port>` and click **Save**.
1. Click the **Create** button at the bottom of the Task Definition form.
1. Select **Actions > Run Task** and specify the task information:
   ![actions menu](images/actions_run_task.png)
   1. In the **Cluster** dropdown, select the cluster on which your task has to run.
   2. Enter the number of tasks (minimum 1) of same definition you want to run.
   3. (Optional) Enter the Task Group name to identify a set of related tasks.
1. In the **Placement Templates** dropdown select **One Task Per Host**. This ensures that each EC2 instance in your ECS cluster has a Wavefront cAdvisor task.

   ![actions menu](images/one_task_per_host.png)
1. Click **Run Task**.

## View ECS Container Metrics

View the [AWS ECS dashboard](integrations_aws_metrics.html#aws-dashboards)

![db aws ecs](images/db_aws_ecs.png)
