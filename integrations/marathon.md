---
title: Marathon Integration
tags: [integrations list]
permalink: marathon.html
summary: Learn about the Marathon Integration.
---

This page provides an overview of what you can do with the Marathon integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Marathon integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Marathon** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Marathon Integration

Marathon is a container orchestration platform for the Mesosphere Datacenter Operating System (DC/OS) and Apache Mesos.
This integration installs and configures Telegraf to send Marathon metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Overview** and **Task Processing** sections of a dashboard displaying Mesos cluster metrics:
{% include image.md src="images/marathon_dashboard.png" width="80" %}




