---
title: Integrations Release Notes and Announcements
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed integrations.
---
VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.


## Announcement

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to the [VMware Cloud services platform](https://console.cloud.vmware.com/) and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until onboarded to VMware Cloud services. We are in the process of incrementally [onboarding](csp_migration.html) all original subscriptions to VMware Cloud services.

For details about the two subscription types and how they differ, see [Subscription Types](subscriptions-differences.html).

If your Operations for Applications service **is onboarded** to VMware Cloud services, most of the integrations authenticate with VMware Cloud services **access tokens**. Only a limited list of integrations still authenticate with Operations for Applications API tokens. For details, see [How Integration Authentication Works](integrations_onboarded_subscriptions.html).

{% include note.html content= "The integrations in the **Archived** section are approaching their end-of-life. For that reason, we will not update these integrations to authenticate with VMware Cloud services access tokens" %}

During the process of onboarding an original Operations for Applications service to VMware Cloud services, all of the existing integrations are preserved and continue to operate using Operations for Applications API tokens. You should incrementally switch to integration authentication with the more secure VMware Cloud services access tokens. See [What Happens with the Integrations?](csp_migration.html#what-happens-with-the-integrations).

{% include note.html content= "Currently, if your service **is onboarded** to VMware Cloud services, direct ingestion by using the Wavefront Output Plugin for Telegraf is not supported. For best performance, use a Wavefront proxy. " %}

## October 2023

We **deprecated** a number of integrations in October 2023, and moved these integrations to the **Archived** section:

* Azure Deployment Manager
* Ansible Role
* AVI Networks (NSX ALB)
* CollectD
* Data Platforms
* FreeBSD Host
* Metricproxy
* OpenBSD Host
* VMware Blockchain
* VMware tc Server
* Chef Server
* AWS Lambda Functions
* nodejs

{% include important.html content= "The deprecated integrations in the list above will reach **end-of-life** in January, 2024 and will be removed from the product. If you are using any of these integrations and need assistance, reach out to our [Technical Support team](wavefront_support_feedback.html)." %}

Also, we made improvements to the following integrations in October 2023:

* Kubernetes:

  * Fixed the alert query of the **K8s node unhealthy** system alert.
  * Removed the `limit()` function from the queries in the Kubernetes integration system dashboards, because this function [may return No Data](ts_limit.html#summary).
  * Removed thresholds from the **K8s pod CPU usage too high** system alert.
  * Updated the **Kubernetes Workloads Troubleshooting** dashboard overview with information about the Operator compatibility.
* Tanzu Application Service - Updated the **Error Rate per Minute** chart in the **Workload Monitoring** dashboard to include the 4xx and 5xx HTTP request error counts.
* Operations for Applications Usage -- Enabled the **Include Obsolete Metrics** option for all charts in the **Operations for Applications Service and Proxy Data** dashboard.
* VMware GemFire -- Updated the queries of the GemFire system alerts with new prefixes.
* Go -- Removed references of deprecated SDKs.
* C Sharp -- Removed references of deprecated libraries.

In addition, we updated the following integrations to support VMware Cloud Services access token authentication when your Operations for Applications service **is onboarded** to VMware Cloud services. See [Integrations That Use VMware Cloud Services Access Tokens](integrations_onboarded_subscriptions.html#integrations-that-use-vmware-cloud-services-access-tokens).

  * Catchpoint
  * Nagios
  * Uptime

## August 2023

We made improvements to the following integrations in August 2023:

* vSphere:

  * Updated a query in the **vSphere: VM Details** dashboard, which uses the `limit()` function, because this function [may return No Data](ts_limit.html#summary). The `limit ()` function is replaced by `count ()`.
  
  * Added a new **vSphere: VMware vSAN** dashboard that allows you to monitor detailed metrics about vSAN.

* Tanzu Service Mesh -- Updated a query in the **Tanzu Service Mesh: Workload Summary** dashboard, which uses the `limit()` function, because this function [may return No Data](ts_limit.html#summary). The `limit ()` function is replaced by `count ()`.

* AWS App Mesh -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 

* Velero -- Added setup instructions to the integration. To see how to set up the Velero integration:

  1. Log in to your service instance.
  2. Click **Integrations** on the toolbar.
  3. Search for **Velero** and click its tile.
  4. Click the **Setup** tab.

* Tanzu Application Service -- We added support for Tanzu Application Service setup when your Operations for Applications service **is onboarded** to VMware Cloud services. See [Integrations Supported for Onboarded Subscriptions](integrations_onboarded_subscriptions.html).

* Kubernetes:
  * We added [new alerts templates](https://github.com/wavefrontHQ/observability-for-kubernetes/blob/main/docs/alerts/alerts.md).
  * We added a new dashboard **Kubernetes Workloads Troubleshooting** which allows you to monitor the health of the Kubernetes workloads. To use this dashboard, maker sure that you use the Observability for Kubernetes Operator version 2.10.0 and later.
  * We added support for Kubernetes setup when your Operations for Applications service **is onboarded** to VMware Cloud services.
  * We now support a number of integrations on Kubernetes. The list includes: Cassandra, Ceph, Envoy Proxy, etcd, Fluentd, Kafka, NVIDIA, Rabbit MQ, and Redis.  

  For the latest list of integrations, see [Integrations Supported for Onboarded Subscriptions](integrations_onboarded_subscriptions.html).

* Operations for Applications Usage -- Made bug fixes to the **Committed Rate vs Monthly Usage (PPS P95) for Billable** and **Usage (PPS) vs Remaining Balance (PPS P95) for Burndown** dashboards.

* Fluentd -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Ceph -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* .NET Core -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Docker with cAdvisor -- Updated the setup steps and instructions.
* Tanzu Service Mesh -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 


## July 2023

We made improvements to the following integrations in July 2023:

* Google Cloud Platform:
  * You can select to ingest Google Cloud Platform histogram metrics and filter these metrics by their Google Cloud Platform grouping functions such as **Count**, **Mean**, and **Standard Deviation**. To do so, when you register or edit your Google Cloud Platform integration, enable **Histogram** metrics ingestion, select **Custom** and select to ingest certain histogram metrics based on the listed Google Cloud Platform grouping functions. When you select a grouping function, only the histogram metrics with the respective grouping function will be ingested. If you deselect all check boxes, all histogram metrics will be ingested.
  * You can now select to ingest Google Cloud Run metrics. To do so, when you register or edit your Google Cloud Platform integration, in the **Categories to fetch** section, select **Custom** and select the **Cloud Run** check box.
* Amazon Web Services - You can now select to ingest Amazon Web Services Usage metrics. To do so, when you register or edit your CloudWatch integration, in the **Products** section, select **Custom** and select the **AWS Usage** check box.
* Kafka -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Redis -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* etcd -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Cassandra -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* NVIDIA -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* VMware GemFire -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. Also updated some of the dashboard queries to a new format.
* Uptime -- Updated the integration with the new Uptime logo.
* Windows Host -- The setup steps now use a URL parameter in the Wavefront proxy configuration.
* Operations for Applications Usage -- Fixed issues in the predefined dashboards.
* Terraform Provider -- Fixed a discrepancy in the Terraform `resource_alert` provider resulting in erroneous Terraform change plan.


## May 2023

We made improvements to the following integrations in May 2023:

* Istio -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Envoy Proxy -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* RabbitMQ -- Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Tanzu Application Service -- Made updates to the **TAS: Nozzle Troubleshooting** and the **TAS: Workload Monitoring** dashboards, as well as to the **TAS UAA Latency is Elevated** alert.
  * Updated the latency queries because now we emit latency as a histogram.
  * Updated the **TAS: Nozzle Troubleshooting** dashboard to show points used by histograms.

* Improved the documentation on how to use regular expressions for the following list of integrations:
  * [Microsoft Azure](azure.html#add-a-microsoft-azure-cloud-integration)
  * [Amazon Web Services](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion)
  * [Google Cloud Platform](gcp.html#add-a-gcp-integration)


## March 2023


Logs (Beta) Related Changes:

 {% include important.html content="Logs (Beta) is enabled only for selected customers. To participate, contact your VMware Aria Operations for Applications account representative or [technical support](wavefront_support_feedback.html#support)." %}

We have made an improvement to the AWS integration:

* Amazon Web Services –- Now contains AWS CloudWatch Logs Setup (Beta) instructions. If Logs (Beta) is enabled for you, you can set up your AWS integration to send logs to Operations for Applications. For details on our Logs (Beta) feature, see [Get Started with Logs (Beta)](logging_overview.html). For details on how to set up the integration, see [Setup for Ingesting AWS CloudWatch Logs (Beta)](integrations_aws_metrics.html#setup-for-ingesting-aws-cloudwatch-logs).


We added the following integration in March 2023:

* .NET Core

    The .NET Core is a general-purpose, most versatile framework that may be used to build software applications for Windows, Linux, and MacOS.
    This integration installs and configures the Kubernetes Metrics Collector to collect the .NET Core performance metrics and uses the [Wavefront proxy](https://docs.wavefront.com/proxies.html) for sending those metrics to the service.


We made improvements to the following integrations in March 2023:

* Log Data -- Log Data – Updated the integration overview and setup steps to include information about the Logs (Beta) solution.
* Filebeat -- Made updates to the integration overview and the setup steps.

* Tanzu Application Service: 

  - Improved descriptions of dashboards and charts.
  - Added new charts.
  - Made improvements to CPU queries in dashboards for additional accuracy and consistency.
  - Excluded Platform MySQL from charts on the MySQL Service dashboard, because this dashboard is only for MySQL broker and service instances.

* Kubernetes -- Fixed validation errors in several Kubernetes system dashboards.
* Catchpoint -- Improved the Catchpoint service to validate the credentials before caching them.
* Amazon Web Services -- Made improvements to provide the dedicated thread pool to complete the AWS related tasks.
* Microsoft Azure -- Made improvements to cache the metric name properly and handle a missing data issue.
* Spring Boot -- Updated the Spring Boot integration with the steps for Spring Boot 3, and updated the doc links.
 

## February 2023

We made improvements to the following integration in February 2023:

* Amazon Web Services -- With the 2023-07.x release, you can use the **Custom Namespace(s)** text box to additionally filter the list of AWS products for which you want to monitor metrics by using the CloudWatch integration. For more information about how to use this text box and monitor metrics from services that are not part of the **Products** list in the GUI, see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion) and [How to Use the Metric Allow List and the Products List](integrations_aws_metrics.html#how-to-use-the-metric-allow-list-and-the-products-list).

## January 2023

We made improvements to the following integrations in January 2023:

* Amazon Web Services -- You can now ingest and monitor AWS Lambda cold start metrics. For information about how to do this, see [Ingesting AWS Lambda Cold Start Metrics into VMware Aria Operations for Applications](integrations_aws_lambda.html#ingesting-aws-lambda-cold-start-metrics-into-vmware-aria-operations-for-applications).

* ServiceNow -- We updated the instructions on how to set up the integration to reflect the latest UI changes.

* Microsoft SQL Server -- Updated the charts in the **SQL Server Metrics** dashboard to use the instance variables.

* Operations for Applications Usage -- Made fixes to the integration and now dashboards are populated with data depending on your type of contract (Billable vs. Burndown).

* Tanzu Application Service -- Made updates to the TAS system alerts and removed some of the alerts that are no longer needed, such as:
  - TAS Active Locks Alerts
  - TAS BOSH VM CPU Used
  - TAS BOSH VM Memory Used

* Microsoft Azure -- Added vCore charts and updated variables with common queries to the **Azure SQL Database** dashboard.

General improvements:

* Metrics Charts -- All charts that you see when you select a metric on the **Metrics** tab are now improved in terms of performance and are up-to-date with the latest UI.
<!--* Clone a System Dashboard Changes -- When you [clone a system integration dashboard](integrations.html#cloning-and-customizing-dashboards), you can now add a custom metric prefix. The prefix will be applied to all the charts in the cloned dashboard.
-->



## All 2019 - 2022 Integrations Release Notes

We have separate pages for:

* [New and Changed Integrations in 2022](integrations_new_changed_2022.html)
* [New and Changed Integrations in 2021](integrations_new_changed_2021.html)
* [New and Changed Integrations in 2019-2020](integrations_new_changed_2020.html)
