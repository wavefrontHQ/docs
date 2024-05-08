---
title: Rollbar Integration
tags: [integrations list]
permalink: rollbar.html
summary: Learn about the Rollbar Integration.
---

This page provides an overview of what you can do with the Rollbar integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Rollbar integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Rollbar** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Rollbar Integration

Rollbar provides a live error feed from applications that includes complete stack traces and contextual data. You can find errors quickly and track who is affected by each error. This integration installs and configures Telegraf to send Rollbar events into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's the Overview section of a dashboard that displays Rollbar metrics.

{% include image.md src="images/Rollbar_Dashboard.png" width="80" %}




