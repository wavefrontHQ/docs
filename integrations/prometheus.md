---
title: Prometheus Integration
tags: [integrations list]
permalink: prometheus.html
summary: Learn about the Prometheus Integration.
---

This page provides an overview of what you can do with the Prometheus integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Prometheus integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Prometheus** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Prometheus Integration

Prometheus is an open-source monitoring and alerting toolkit. The Wavefront Prometheus integration supports two different use cases:

* The first setup is excellent for monitoring applications by scraping metrics HTTP endpoints. This integration installs and configures Telegraf to collect Prometheus format metrics. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

* The second integration is perfect for integrating with Prometheus servers, preserving your existing service discovery mechanism. This integration uses the Wavefront [Prometheus Storage Adapter](https://github.com/wavefrontHQ/prometheus-storage-adapter) which takes the data being sent to it and forwards it to a Wavefront proxy. Prometheus storage adapters can act as a "fork" and send data to a secondary location. The adapter is useful when you make data collected by Prometheus available in Wavefront.




