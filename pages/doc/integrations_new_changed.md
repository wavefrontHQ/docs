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

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to the [VMware Cloud services platform](https://console.cloud.vmware.com/) and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until they migrate to VMware Cloud services. We are in the process of incrementally migrating original subscriptions to VMware Cloud services. 

For details about the two subscription types and how they differ, see [Subscription Types](subscriptions-differences.html).

If your Operations for Applications service is onboarded to VMware Cloud services, you still can see, but cannot configure some of our integrations. For the list of integrations that we support when your Operations for Applications service is onboarded to VMware Cloud services, see [Integrations Supported for Onboarded Subscriptions](integrations_onboarded_subscriptions.html).

{% include note.html content= "Currently, if your service **is onboarded** to VMware Cloud services, direct ingestion by using the Wavefront Output Plugin for Telegraf is not supported. For best performance, use a Wavefront proxy. " %}

## May 2023

We made improvements to the following integrations in May 2023:

* Istio - Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* Envoy Proxy - Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
* RabbitMQ - Updated the setup steps and instructions. You can now set up the integration and the Kubernetes Metrics Collector by using the Observability for Kubernetes Operator. 
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

* Amazon Web Services – Now contains AWS CloudWatch Logs Setup (Beta) instructions. If Logs (Beta) is enabled for you, you can set up your AWS integration to send logs to Operations for Applications. For details on our Logs (Beta) feature, see [Get Started with Logs (Beta)](logging_overview.html). For details on how to set up the integration, see [Setup for Ingesting AWS CloudWatch Logs (Beta)](integrations_aws_metrics.html#setup-for-ingesting-aws-cloudwatch-logs-beta).


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
