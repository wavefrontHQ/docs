---
title: "Tutorial: Getting Data into Wavefront"
tags: [getting started, data, proxies, integrations, tutorials]
sidebar: doc_sidebar
permalink: tutorial_data_ingestion.html
summary: Learn how to get data into Wavefront.
---

Getting data into Wavefront is quick and easy. There are three main paths:

- You ingest metrics data using one or more collector agents and the Wavefront proxy. A collector agent, such as Telegraf or Docker cAdvisor, collects metrics such as capacity and usage from your systems, and outputs them to storage, in this case the Wavefront proxy. The Wavefront proxy works with the Wavefront server to ensure security and end-to-end flow control.
- Your application sends metrics directly to a proxy.
- You pull data directly from Amazon Web Services. 

The diagram below depicts each of these options.

![Wavefront architecture](images/integrations_data_collector.png)

## Set Up an Integration

You set up an integration during the [Getting Started tutorial](documentation_getting_started.html#getting-started-tutorial). Choose a Mac, Linux, or Windows host integration for the quickest way to set up a collector agent and Wavefront proxy. Alternatively choose the Amazon Web Services integration to pull AWS data. Both types of integrations include rich dashboards for exploring your data. Once you've completed the Getting Started tutorial you can view the installed dashboards.

## Next Steps

After you have data flowing into Wavefront:

 - See [Tutorial: Getting Started](tutorial_getting_started.html) to learn how to develop charts and dashboards to visualize your data and alerts that notify you when anomalous values occur.

- Explore the full range of [integrations](integrations.html).
 
- View the [getting started dashboards​](dashboards_getting_started.html) to learn more about Wavefront benefits, capabilities, components, illustrative use cases, and example dashboards for specific domains. 

- Browse [Getting Started Documentation](documentation_getting_started.html) for a list of documents for delving further into Wavefront.
