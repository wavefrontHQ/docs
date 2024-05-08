---
title: SNMP Integration
tags: [integrations list]
permalink: snmp.html
summary: Learn about the SNMP Integration.
---

This page provides an overview of what you can do with the SNMP integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the SNMP integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **SNMP** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## SNMP Integration

Monitoring SNMP devices is easy with Tanzu Observability. This integration installs and configures Telegraf to send SNMP agent metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's the SNMP section of a dashboard displaying SNMP metrics.

{% include image.md src="images/SNMP_Dashboard.png" width="80" %}



