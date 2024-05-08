---
title: Oracle RDBMS Integration
tags: [integrations list]
permalink: oracle.html
summary: Learn about the Oracle RDBMS Integration.
---

This page provides an overview of what you can do with the Oracle RDBMS integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Oracle RDBMS integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Oracle RDBMS** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Oracle RDBMS

Oracle is an Industry-leading enterprise Relational Database Management System.

This integration installs and configures Telegraf and a custom Python script to send Oracle metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy. The custom script uses the Dynamic Performance views that Oracle provides to gather metrics.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/Oracle-DB-metrics.png" width="80" %}



