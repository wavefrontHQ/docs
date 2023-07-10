---
title: New Relic Integration
tags: [integrations list]
permalink: newrelic.html
summary: Learn about the New Relic Integration.
---

This page provides an overview of what you can do with the New Relic integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the New Relic integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **New Relic** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## New Relic Integration

The New Relic integration is a native integration offering agent less data ingestion of metrics from the New Relic SaaS service.

### Metrics Configuration
This integration can be configured to pull all application metrics from New Relic. If you want to pull only certain application metrics, configure filters while setting up the integration.

Metrics that originate from New Relic are prefixed with `newrelic.apps.` in Operations for Applications. After you set up the integration, you can browse the available metrics in the metrics browser.




### Adding New Relic Integration

Adding a New Relic integration requires establishing a trust relationship between New Relic and VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).


1. Navigate to the New Relic API Key generator in your New Relic instance.
2. Generate a key.
3. Copy the key and paste in into the API Key field in the integration setup.
4. (Optional) Add source filters and metric filters.

You can then configure Operations for Applications to continually load application data.




