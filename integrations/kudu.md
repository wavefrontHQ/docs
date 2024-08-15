---
title: Apache Kudu Integration
tags: [integrations list]
permalink: kudu.html
summary: Learn about the Apache Kudu Integration.
---

This page provides an overview of what you can do with the Apache Kudu integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Apache Kudu integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Apache Kudu** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Apache Kudu Integration

Apache Kudu is an open source column-oriented data store compatible with most of the processing frameworks in the Apache Hadoop ecosystem. It enables fast analytics on fast data.

This integration installs and configures Telegraf to send Apache Kudu server metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Apache Kudu dashboard.

{% include image.md src="images/kudu1.png" width="80" %}
{% include image.md src="images/kudu2.png" width="80" %}
{% include image.md src="images/kudu3.png" width="80" %}




