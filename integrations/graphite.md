---
title: Graphite Integration
tags: [integrations list]
permalink: graphite.html
summary: Learn about the Graphite Integration.
---

This page provides an overview of what you can do with the Graphite integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Graphite integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Graphite** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Graphite Data Integration

The [Wavefront proxy](https://docs.wavefront.com/proxies.html) supports the [plaintext](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol) Graphite data format and the [pickle](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-pickle-protocol) Graphite data format.

The plaintext Graphite data format is different than the [Wavefront data format](https://docs.wavefront.com/wavefront_data_format.html).  Wavefront supports point tags natively with its data format, and requires a tag named `source` or `host`.  The setup process explains how to extract a source from the Graphite metric name.



