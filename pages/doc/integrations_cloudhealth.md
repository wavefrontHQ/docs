---
title: Send Wavefront Data to CloudHealth
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_cloudhealth.html
summary: Learn how to send Tanzu Observability by Wavefront data to CloudHealth.
---

The CloudHealth platform helps your team manage resource utilization and costs across multiple cloud environments. CloudHealth provides spending summary reports for each cost center, which helps you drive financial accountability and find ways to lower your cloud spend.  You can create custom policies that automate daily cloud operations, support faster decision making, and reduce risk. CloudHealth also, reports on vulnerabilities so you can proactively monitor, detect, and remediate risks in real-time.

This page explains how to send date that are ingested into Tanzu Observability by Wavefront to CloudHealth. From CloudHealth, you can then examine those data and learn how to use your cloud resources more efficiently:

![Diagram shows data from Wavefront that goes to CloudHealth.](images/integration_cloudhleath_intro.png)

## Benefits of the Wavefront Integration in CloudHealth

CloudHealth ingests the usage and performance data that Tanzu Observability by Wavefront gathers to help you in the following ways:
* Understand how your cloud assets are being allocated and utilized through usage reports.
* Categorize assets into Perspectives inside CloudHealth.
* Make rightsizing decisions for EC2 Instances and Azure Virtual Machines.


## Prerequisites

Here's what you need to get started.

**CloudHealth**
* You must have a CloudHealth account. If you don't have one, [request a demo from the CloudHealth team](https://go.cloudhealthtech.com/demo-request.html?ref=nav).
* You need Administrator permission in CloudHealth to add a Wavefront account to CloudHealth.

**Tanzu Observability by Wavefront**
* You need access to a Wavefront cluster that monitors the data source you're interested in.
* [Generate a Wavefront API token](users_account_managing.html#generate-an-api-token) to let CloudHealth access the Wavefront API.
  {% include note.html content="A Wavefront API token is tied to a Wavefront account. Ensure that the account whose API token you select has access to the Tanzu Observability by Wavefront Sources that you want to ingest in CloudHealth. Creating a service account is often the right approach." %}


## Create a Wavefront Account in CloudHealth

Follow these steps to create a Wavefront account in CloudHealth:

1. Sign in to your CloudHealth account.
1. Click the cloud environment (e.g. AWS or Azure) where you want to add the Wavefront account.
1. Select **Accounts** > **Setup** > **Wavefront**.
1. Click **New Account** and configure the integration:
  ![Screenshot of the configuration screen in the CloudHealth UI.](images/integration_cloudhealth_wavefront_setup.png)
    1. Enter ab account name.
    1. Retrieve the Wavefront API token (see Prerequisites) and paste it in the **API Token** field.
    1. If you are using a metric prefix in Tanzu Observability by Wavefront, enter its value in the **Metric Prefix** field.
    1. To import tags from a legacy Servers account, enable **Import Tags**. 
       CloudHealth then actively collects tags, and you will see an additional field to accept the tags that you want to import into CloudHealth.
1. Click **Save Account**.

CloudHealth begins collecting Wavefront Sources within 15 minutes of account setup, and continues collecting these Sources every 15 min. CloudHealth fetches up to one day's worth of time-series data from the date when you add the Wavefront account.

## Data Gathered by CloudHealth

The following data from Tanzu Observability by Wavefront is sent to CloudHealth:

* Tanzu Observability [Sources](sources_managing.html) every 15 minutes. Each source is a data source (host, VM, etc). Sources can have tags attached to them.
* Tanzu Observability [Source tags](tags_overview.html#source-tags) every 15 minutes. Source tags are treated as dynamic attributes on a Tanzu Observability Source. You cannot overwrite Tanzu Observability Source tags with custom CloudHealth tags, but you can use them to build Perspectives in CloudHealth, as explained in the next section.
  {% include tip.html content="CloudHealth Perspectives are lenses through which you want to view your infrastructure. They provide a framework for categorizing all the assets within your infrastructure. Sample perspectives might include Environment, Application, Department, Function, Project, or Cost Center." %}
* Memory and disk metrics for each source every 1 hour. For each metric, CloudHealth gathers the mean, minimum, and maximum.
* If you have enabled CloudWatch metrics collection through the CloudHealth platform, additional core metrics such as CPU, network bytes, and filesystem usage are gathered.


## Create Perspectives in CloudHealth

You can use Tanzu Observability source tags to create Perspective Groups within the CloudHealth Platform. Follow these steps:

1. Navigate to CloudHealth, and click **Wavefront**.
1. Click **Setup** > **Perspectives** > **New Perspective**.
1. Provide a Name and click **Create Perspective and Start Building**.
  ![The UI that shows with the name text box, and optional description. There are two buttons at the bottom, which are create perspective and start building and cancel.](images/integartion_cloudhealth_perspective.png)
1. On the **Guided Search** tab:
    1. From the **Choose an Asset Type** drop-down menu, select **Source** under **Wavefront**.
        ![Shows the source selected under the Wavefront section as explained in this step.](images/integration_cloudhealth_perspective_asset_type.png)
    1. Set the **Discovery Method** to **Categorize**.
    1. Click the drop-down menu under **Choose a Field to Categorize By** and select the tag you want to use to create Perspective groups.
    1. Click **Categorize**.

    ![A screenshot that shows all the fields filled as explained in the sub steps below.](images/integartion_cloudhealth_perspective_group.png)

## Rightsize Using CloudHealth

CloudHealth ingests Tanzu Observability by Wavefront metrics (Memory, CPU, network bytes, and filesystem usage) for the cloud resources you selected and displays these metrics in the Rightsizing Report.
