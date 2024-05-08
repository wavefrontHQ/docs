---
title: Apache Hadoop HDFS Integration
tags: [integrations list]
permalink: hadoop-hdfs.html
summary: Learn about the Apache Hadoop HDFS Integration.
---

This page provides an overview of what you can do with the Apache Hadoop HDFS integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Apache Hadoop HDFS integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Apache Hadoop HDFS** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Apache Hadoop Distributed File System (HDFS)

The Hadoop Distributed File System (HDFS) can store very large data sets reliably, and can stream those data sets at high bandwidth to user applications. In a large cluster, thousands of servers can host directly attached storage and also execute user application tasks.

This integration installs and configures Telegraf and Jolokia to send Hadoop HDFS cluster metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy. Jolokia is a JMX-HTTP bridge that allows non-Java processes to retrieve JMX mBean attributes.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/hadoop-hdfs-metrics.png" width="80" %}




