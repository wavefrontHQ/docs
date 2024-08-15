---
title: Consul Integration
tags: [integrations list]
permalink: consul.html
summary: Learn about the Consul Integration.
---

This page provides an overview of what you can do with the Consul integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Consul integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Consul** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Consul Integration

 Hashicorp Consul allows you to discover and configure services in your environment. This integration provides a real-time status for both **Cloud Managed** and **Open source (Self-managed) Consul** nodes.
This integration installs and configures Telegraf to send Consul server metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Consul dashboard.

{% include image.md src="images/consul.png" width="80" %}




