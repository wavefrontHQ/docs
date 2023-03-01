---
title: Integrations Release Notes
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_new_changed.html
summary: New and changed integrations.
---
VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) continuously adds new integrations to the existing set, and improves available integrations. We update our [**complete list of all integrations**](https://docs.wavefront.com/label_integrations%20list.html) each time we add new integrations.

## February 2023

* Amazon Web Services -- With the 2023-07.x release, you can use the **Custom Namespace(s)** text box to additionally filter the list of AWS products for which you want to monitor metrics by using the CloudWatch integration. For more information about how to use this text box and monitor metrics from services that are not part of the **Products** list in the GUI, see [Configuring CloudWatch Data Ingestion](integrations_aws_metrics.html#configuring-cloudwatch-data-ingestion) and [How to Use the Metric Allow List and the Products List](integrations_aws_metrics.html#how-to-use-the-metric-allow-list-and-the-products-list).

## January 2023

We made improvements to the following integrations in January 2023:

* Amazon Web Services -- You can now ingest and monitor AWS Lambda cold start metrics. For information about how to do this, see [Ingesting AWS Lambda Cold Start Metrics into VMware Aria Operations for Applications](integrations_aws_lambda.html#ingesting-aws-lambda-cold-start-metrics-into-vmware-aria-operations-for-applications).

* ServiceNow -- We updated the instructions on how to set up the integration to reflect the latest UI changes. See more in the [ServiceNow Setup](servicenow.html#servicenow-setup) instructions.

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
