---
title: Tutorial - Getting Amazon Web Services Data into Wavefront
tags: [getting started, data, proxies, integrations]
sidebar: doc_sidebar
permalink: tutorial_data_ingestion.html
summary: Learn about how to get data into Wavefront with the AWS cloud integration.
---
The major components of Wavefront include the Wavefront SaaS application, which facilitates economies of scale for deployment, flexibility, and time to value and the Wavefront proxy. The Wavefront proxy is the interface to collector agents, which instrument hardware and software applications. The Wavefront application can also collect metrics directly from external metrics services such as those provided by Amazon Web Services. The diagram below depicts each of these components.

![Wavefront architecture](images/wavefront_architecture.png)

To get data into Wavefront, you either install a Wavefront proxy and collector agent or set up an Amazon Web Services cloud integration.  Here we focus on AWS data ingestion. For the proxy and collector agent version, see [Tutorial: Getting Host, Application, and Custom Data into Wavefront](tutorial_proxy_data_ingestion). Once you have data flowing, you visit the Metrics Browser to view the metrics and finally view an AWS dashboard provided by Wavefront.


## Set up an Amazon Web Services Cloud Integration
An AWS cloud integration allows you to ingest metrics directly from AWS and send them to Wavefront without needing to set up a Wavefront proxy.  Adding an AWS cloud integration requires establishing a trust relationship between Amazon and Wavefront by sharing account IDs and an external ID. To complete this task you need [Proxy Management permission](permissions_overview) which your Wavefront administrator can grant.


To set up an AWS integration:
 
 1. Open the Wavefront application UI.
 1. Select **Browse > Cloud Integrations**.
 1. Select **Add Integration > Set up Amazon Account**.  A page displays with instructions for configuring the integration. Follow the instructions in the product page. After you save, CloudWatch, AWS API, and optionally CloudTrail integrations are added to the Cloud Integrations list and AWS dashboards are installed.
  1. Click **Save**. CloudWatch, AWS API, and optionally CloudTrail integrations are added to the Cloud Integrations list and AWS dashboards are installed.
  1. Let's look at the data that we are ingesting from the AWS services. Select **Browse > Metrics** to open the Metrics Browser.
    1. In the Metrics field, type **aws.** AWS metrics and metrics folders display. For information on AWS metrics collected by Wavefront, see [AWS Metrics Integration](integrations_aws_metrics).
  1. Open the AWS summary dashboard installed by Wavefront: `https://<wavefront_instance>/dashboard/wavefront-aws-summary`. From there, you can easily navigate to the other AWS dashboards.
  ![db_aws_summary](images/db_aws_summary.png)

  ## Next Steps

  After you have data flowing into Wavefront, see [Tutorial: Getting Started](tutorial_getting_started) to learn how to
  develop charts and dashboards to visualize your data and alerts that notify you when anomalous values occur.

{% include shared/tutorial_next_steps.html %}

{% include links.html %}