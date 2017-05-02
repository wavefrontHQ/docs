---
title: "Tutorial: Getting Started with Amazon Web Services Data"
tags: [getting started, data, integrations, tutorials]
sidebar: doc_sidebar
permalink: tutorial_aws_data_ingestion.html
summary: Learn how to get AWS data into Wavefront.
---

Getting your Amazon Web Services metrics data into Wavefront is quick and easy. Wavefront's SaaS platform lets you build your monitoring solution without installing and configuring complex software. For AWS, you can ingest metrics directly using Wavefront's AWS cloud integration. You can also ingest data from other sources using a Wavefront proxy and one or more collector agents. The diagram below depicts each of these components.

![Wavefront architecture](images/wavefront_architecture.png)

Here we focus on getting data from AWS. Once you have data flowing, you visit the Metrics browser to view the metrics and finally view a Wavefront AWS dashboard.

For the proxy and collector agent version, see [Tutorial: Getting Started with Host, Application, and Custom Data](tutorial_proxy_data_ingestion.html). 

## Set up an Amazon Web Services Cloud Integration

An AWS cloud integration allows Wavefront to ingest metrics directly from AWS.  Adding an AWS cloud integration requires establishing a trust relationship between Amazon and Wavefront by sharing account IDs and an external ID. To complete this task you need [Proxy Management permission](permissions_overview.html) which your Wavefront administrator can grant.

To set up an AWS integration:
 
 1. Open the Wavefront application UI.
 1. Select **Browse > Cloud Integrations**.
 1. Select **Add Integration > Set up Amazon Account**.  A page displays with instructions for configuring the integration. Follow the instructions in the product page. After you save, CloudWatch, AWS Metrics+, and optionally CloudTrail integrations are added to the Cloud Integrations list and AWS dashboards are installed.
  1. Click **Save**. CloudWatch, AWS Metrics+, and optionally CloudTrail integrations are added to the Cloud Integrations list and AWS dashboards are installed.
  1. Let's look at the data that we are ingesting from the AWS services. Select **Browse > Metrics** to open the Metrics browser.
    1. In the Metrics field, type **aws.** AWS metrics and metrics folders display. For information on AWS metrics collected by Wavefront, see [AWS Metrics Integration](integrations_aws_metrics.html).
  1. Open the AWS summary dashboard installed by Wavefront: `https://<wavefront_instance>/dashboard/wavefront-aws-summary`. From there, you can easily navigate to the other AWS dashboards.
  ![db_aws_summary](images/db_aws_summary.png)

## Next Steps

After you have data flowing into Wavefront, see [Tutorial: Getting Started](tutorial_getting_started.html) to learn how to develop charts and dashboards to visualize your data and alerts that notify you when anomalous values occur.

{% include shared/tutorial_next_steps.html %}

