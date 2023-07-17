---
title: Apache Hadoop MapReduce Integration
tags: [integrations list]
permalink: hadoop-mapreduce.html
summary: Learn about the Apache Hadoop MapReduce Integration.
---

This page provides an overview of what you can do with the Apache Hadoop MapReduce integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Apache Hadoop MapReduce integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Apache Hadoop MapReduce** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Apache Hadoop MapReduce

Hadoop MapReduce is a Yarn-based system for parallel processing of large data sets.

This integration installs and configures Telegraf and a custom Python script to send Hadoop MapReduce metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy. The custom script uses the Hadoop HTTP REST API to gather metrics. 

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/hadoop-mapreduce-metrics.png" width="80" %}




