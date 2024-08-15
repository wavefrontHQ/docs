---
title: Chef Integration
tags: [integrations list]
permalink: chef.html
summary: Learn about the Chef Integration.
---

This page provides an overview of what you can do with the Chef integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Chef integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Chef** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Chef Integration

Chef is a configuration management tool written in Ruby and Erlang. This integration installs and configures Telegraf to send Chef metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying Chef metrics:

{% include image.md src="images/chef_dashboard.png" width="80" %}




