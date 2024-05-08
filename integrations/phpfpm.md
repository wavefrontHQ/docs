---
title: PHP-FPM Integration
tags: [integrations list]
permalink: phpfpm.html
summary: Learn about the PHP-FPM Integration.
---

This page provides an overview of what you can do with the PHP-FPM integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the PHP-FPM integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **PHP-FPM** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## PHP-FPM Integration
PHP-FPM (FastCGI Process Manager) is a PHP FastCGI implementation with features that are useful for sites of any size. This integration installs and configures Telegraf to send PHP-FPM metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Overview** and **Cluster Resources** sections of a dashboard displaying PHP-FPM  metrics:

{% include image.md src="images/php_dashboard.png" width="80" %}




