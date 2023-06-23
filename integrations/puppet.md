---
title: Puppet Server Integration
tags: [integrations list]
permalink: puppet.html
summary: Learn about the Puppet Server Integration.
---

This page provides an overview of what you can do with the Puppet Server integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Puppet Server integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Puppet Server** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Puppet Server Integration

Puppet is an open-source configuration management tool. It runs on many Unix-like systems as well as on Microsoft Windows, and includes its own declarative language to describe system configuration.

You can configure Puppet Server to emit Graphite formatted metrics using the Telegraf tcp_listener input plugin. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of the dashboard.

{% include image.md src="images/db_puppet.png" width="80" %}




