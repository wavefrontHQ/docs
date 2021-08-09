---
title: "Tutorial: Getting Data into Wavefront"
tags: [getting started, data, proxies, integrations, tutorials]
sidebar: doc_sidebar
published: false
permalink: tutorial_data_ingestion.html
summary: Learn how to get data into Wavefront.
---

 Ready to get your data into Wavefront? You have several options:

- You ingest metrics data using one or more collector agents and the Wavefront proxy.

  A collector agent, such as Telegraf or Docker cAdvisor, collects metrics such as capacity and usage and outputs them to the Wavefront proxy. The Wavefront proxy forwards the data to the Wavefront server.  The Wavefront proxy works with the Wavefront server to ensure security and end-to-end flow control.
- Your application sends metrics directly to a Wavefront proxy.
- Wavefront pulls data directly from a cloud-based service (e.g. Amazon Web Services, Google Cloud Platform, Tesla).

**Note:** Typical production environments have a small number of proxies, with many agents sending metrics through the proxies to Wavefront. You can ask questions on the [Wavefront public Slack channel](https://www.wavefront.com/join-public-slack).

The diagram below shows the different options for getting data into Wavefront.

![Wavefront architecture](images/wavefront_architecture.svg)

## Set Up an Integration

To get some data into Wavefront right away,  set up an integration that monitors the machine (host) on which you are working, or that monitors an existing cloud service you are using.

**Note** If you are currently going through the Getting Started workflow of a Wavefront trial, follow the on-screen steps to set up your first integration. Some menu items, such as **Integrations** are not available for trial users until they've completed Getting Started.

Many users set up Wavefront to monitor the host on which they're working.

1. Select **Integrations**.
2. Select Mac Host, Windows Host, or one of the Linux Host options.
3. Click **Setup** and follow the in-product instructions.
   The installation process is different on different operating systems.

 If you're using Amazon Web Services, you can instead use the Amazon Web Services integration to pull AWS data. This use case needs no proxy.

 Both types of integration include dashboards for exploring your data.

**Note:** Our [Free 30-day Trial](https://tanzu.vmware.com/observability) steps you through setting up an integration. You learn how to get data flowing from you host or for your AWS account and can experiment with dashboards, charts, and alerts. We've included interactive tutorials and a tour so you can explore your own data or some sample data that are available for trial users.

## Next Steps

After you have data flowing into Wavefront, you can use the in-product tutorial and tour dashboards and the documentation to learn more.

- Watch some [Wavefront and Data Videos](videos_data.html).

- Learn how to examine charts and dashboards to visualize data. See the in-product tutorial dashboards, or see [Dashboards and Charts Tutorial](tutorial_dashboards.html).

- Explore the full range of integrations from the **Integrations** menu and see [integrations](integrations.html) for details about some of them.

- See [Getting Data Into Wavefront](wavefront_data_ingestion.html) and [Wavefront Data Format](wavefront_data_format.html) for background information.

- Consider working with a [Wavefront API](wavefront_api.html).
