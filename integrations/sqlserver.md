---
title: Microsoft SQL Server Integration
tags: [integrations list]
permalink: sqlserver.html
summary: Learn about the Microsoft SQL Server Integration.
---

This page provides an overview of what you can do with the Microsoft SQL Server integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Microsoft SQL Server integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Microsoft SQL Server** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Microsoft SQL Server Integration

SQL Server by Microsoft is a popular enterprise RDBMS. This integration installs and configures Telegraf to send SQL server metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the performance counters section of a dashboard displaying MSSQL metrics:
{% include image.md src="images/sqlserver-perfcounters.png" width="80" %}




