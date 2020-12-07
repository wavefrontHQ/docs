---
title: AWS ECS Integration Details
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_aws_ecs.html
summary: Send AWS ECS data to Wavefront using cAdvisor or AWS Fargate.
---
[Amazon Elastic Container Service (ECS)](https://aws.amazon.com/ecs/) is Amazon's Docker container orchestration system. From the Amazon ECS website:

```quote
Amazon Elastic Container Service (ECS) is a highly scalable, high-performance container orchestration service that supports Docker containers and allows you to easily run and scale containerized applications on AWS. Amazon ECS eliminates the need for you to install and operate your own container orchestration software, manage and scale a cluster of virtual machines, or schedule containers on those virtual machines.
```

Wavefront supports an Amazon Web Services [built-in integration](amazon_ecs.html) that allows Wavefront to collect useful high-level metrics about ECS using the AWS CloudWatch API, but that's only part of your setup.

## Overview

The integration basics are covered in our [AWS ECS Integration](amazon_ecs.html) page.

This page provides detailed steps on how to install and configure the Wavefront ECS integration either by creating a cAdvisor task definition or by creating an AWS Fargate task definition. After you complete these steps, the integration provides:

- Monitoring of important CloudWatch metrics related to Amazon ECS.
- Monitoring of detailed metrics about individual containers, services, and clusters running in your AWS ECS environment.

### Prerequisites

- Access to Amazon Web Services.
- Access to a [Wavefront proxy](proxies_installing.html) - Preferably running in AWS or a place accessible to your ECS instances.
- Wavefront AWS integration - Parts of the ECS integration use CloudWatch metrics, which can be acquired by configuring the Wavefront AWS integration.


### Configure the AWS Integration

Set up the [AWS integration](integrations_aws_metrics.html). This allows Wavefront to collect useful high-level metrics about ECS using the AWS CloudWatch API.

**Note:** To ensure that dashboards display correctly, use only the default EC2 instance name for the ECS cluster.

## Create AWS ECS Fargate Task Definition for Wavefront

You can set up Wavefront to collect the data from AWS Fargate containers. These steps create an ECS task definition that ensures the Wavefront Collector automatically runs on each Fargate instance in your ECS cluster.

After you've performed the setup, you can view and examine the data in our AWS Fargate dashboard in your Wavefront instance. See the screenshot at the bottom of this page.

1. Within AWS Services, navigate to **ECS**.
1. Click **Task Definitions**, then **Create new Task Definition**.
  ![create task def](images/create_new_task_definition.png)
1. Select the Fargate launch type and click **Next Step**.
![fargate launch type](images/aws_fargate.png)

1. Scroll to the bottom of the new Task Definition form and click **Configure via JSON**.
  1. Delete the content and paste the following snippet into the JSON form field:
  ```
  {
        "family": "wavefront-task-def",
        "networkMode": "awsvpc",
        "containerDefinitions": [
            {
                "name": "tomcat-example",
                "image": "tomcat:latest",
                "essential": true,
				"portMappings": [
					{
					  "hostPort": 8080,
					  "protocol": "tcp",
					  "containerPort": 8080
					}
				]
            },
			{
                "name": "fargate-metrics-collector",
                "image": "wavefronthq/wavefront-fargate-collector:latest",
                "essential": true,
                "environment": [],
				"portMappings": [
					{
					  "hostPort": 8000,
					  "protocol": "tcp",
					  "containerPort": 8000
					}
				],
				"command": [
					"-port=8000",
					"-storage_driver=wavefront",
					"-storage_driver_options=storage_driver_wf_proxy_host=YOUR_PROXY_ADDRESS storage_driver_wf_metric_prefix=aws.fargate.ecs."
				]
			}
        ],
        "requiresCompatibilities": [
            "FARGATE"
        ],
        "cpu": "256",
        "memory": "512"
  }
   ```
1. In the JSON form, set the `storage_driver_wf_proxy_host` property to the proxy address. If you want to use a custom port, set the `storage_driver_wf_metric_port` to the port of your Wavefront instance. Use the format `<wavefront_proxy_IP>:<port>` and click **Save**.
1. Click **Create** at the bottom of the Task Definition form.
2. After the task is created, click **View Task Definition**, select **Actions > Run Task** and specify the task information. Most fields are self-evident, here are a few.
  * **Cluster**--Select the cluster on which your task has to run.
  * **Number of tasks**--Select a number (minimum 1).
  * **Task Group** (Optional)--Task group name for identifying a set of related tasks.
  * **Launch Type**--Fargate

   ![run task](images/aws_fargate_run_task.png)
9. Click **Run Task**.


## Create AWS ECS EC2 Task Definition for Wavefront

Wavefront maintains an image of cAdvisor that includes a Wavefront storage driver. These steps create an ECS task definition that ensures the Wavefront cAdvisor container automatically runs on each EC2 instance in your ECS cluster.

After you've performed the setup, you can view and examine the data in our AWS EC2 dashboard in your Wavefront instance. The screenshots at the bottom of this page show the AWS EC2 dashboard and the AWS Fargate dashboard.

1. Within AWS Services, navigate to **ECS**.
1. Click **Task Definitions**, then **Create new Task Definition**.
  ![create task def](images/create_new_task_definition.png)
1. Select the launch type that you want your task to be compatible with and click **Next Step**.

   ![select launch type](images/select_launch_type.png)
1. Scroll to the bottom of the new Task Definition form and click the **Configure via JSON** button.
   1. Delete the content and paste the [JSON example](https://raw.githubusercontent.com/wavefrontHQ/integrations/master/aws-ecs/example-task-definition.json) into the JSON form field.
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

You can view the ECS Container metrics on the dashboards we set up for the two different options.

Here's a screenshot of the AWS ECS dashboard.
![db aws ecs](images/db_aws_ecs.png)

Here's a screenshot of the AWS ECS Fargate dashboard.

![ecs fargate](images/aws_ecs_fargate.png)
