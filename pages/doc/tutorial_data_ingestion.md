---
title: "Tutorial: Getting Data into Wavefront"
tags: [getting started, data, proxies, integrations, tutorials]
sidebar: doc_sidebar
permalink: tutorial_data_ingestion.html
summary: Learn how to get data into Wavefront.
---

 You have three options for getting data into Wavefront:

- You ingest metrics data using one or more collector agents and the Wavefront proxy. A collector agent, such as Telegraf or Docker cAdvisor, collects metrics such as capacity and usage from your systems, and outputs them to the Wavefront proxy. The Wavefront proxy works with the Wavefront server to ensure security and end-to-end flow control.
- Your application sends metrics directly to a Wavefront proxy.
- Wavefront pulls your data directly from Amazon Web Services. 

The diagram below shows all three options. 

![Wavefront architecture](images/integrations_data_collector.png)

## Set Up an Integration

If you use the Wavefront trial or you do the in-product tutorial, you set up your first integration as part of the tutorial. 

Many users set up Wavefront to monitor the host on which they're working. 
1. Select **Browse > Integrations**. 
2. Select Mac Host, Windows Host, or one of the Linux Host options. 
3. Click **Setup** and follow the in-product instructions. 
   * First you install the Wavefront proxy. 
   * Then you install and configure the Telegraph agent. 
     This process is different on different operating systems. 

 If you're using Amazon Web Services, you can instead use the Amazon Web Services integration to pull AWS data. 
 
 Both types of integration include dashboards for exploring your data. Once you've completed the Getting Started tutorial you can explore the integration dashboards.

## Next Steps

After you have data flowing into Wavefront, you can use the in-product tutorial and tour and the documentation.

 - Learn how to develop charts and dashboards to visualize your data and how to set up alerts that notify you when anomalous values occur. See the in-product tutorial, or see [Tutorial: Getting Started](tutorial_getting_started.html).

- Explore the full range of [integrations](integrations.html).
 
- See [Getting Data Into Wavefront](wavefront_data_ingestion.html) for additional information. 

- Consider working with a [Wavefront API](wavefront_api.html). 
