---
title: Integrations Release Notes
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed integrations.
---
Tanzu Observability by Wavefront continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.

## March 2023

We added the following integration in March 2023:

* .NET Core

    The .NET Core is a general-purpose, most versatile framework that may be used to build software applications for Windows, Linux, and MacOS.
    This integration installs and configures the Wavefront Collector for Kubernetes to collect the .NET Core performance metrics and uses the [Wavefront proxy](https://docs.wavefront.com/proxies.html) for sending those metrics to the service.


We made improvements to the following integrations in March 2023:

* Log Data -- Made updates to the integration overview and the setup steps.

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

* Amazon Web Services -- You can now ingest and monitor AWS Lambda cold start metrics. For information about how to do this, see [Ingesting AWS Lambda Cold Start Metrics into Tanzu Observability](integrations_aws_lambda.html#ingesting-aws-lambda-cold-start-metrics-into-tanzu-observability).

* ServiceNow -- We updated the instructions on how to set up the integration to reflect the latest UI changes. See more in the [ServiceNow Setup](servicenow.html#servicenow-setup) instructions.

* Microsoft SQL Server -- Updated the charts in the **SQL Server Metrics** dashboard to use the instance variables.

* Wavefront Usage -- Made fixes to the integration and now dashboards are populated with data depending on your type of contract (Billable vs. Burndown).

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
