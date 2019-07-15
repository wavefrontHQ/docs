---
title: New Relic Integration
tags: [integrations list]
permalink: newrelic.html
summary: Learn about the Wavefront New Relic Integration.
---
## New Relic Integration

The New Relic integration is a native integration offering agent less data ingestion of metrics from the New Relic SaaS service.

### Metrics Configuration
This integration can be configured to pull all application metrics from New Relic. If you want to pull only certain application metrics, configure filters while setting up the integration.

Metrics that originate from New Relic are prefixed with `newrelic.apps.` in Wavefront. After you set up the integration, you can browse the available metrics in the metrics browser.



### Give Wavefront Read-Only Access to Your New Relic Account

Before you can get data flowing into Wavefront, give use read-only access. Then configure Wavefront to continually load application data.
1. Navigate to the New Relic API Key generator.
2. Generate a key.
3. Copy the key and paste in into the API Key field in the integration setup.
4. (Optional) Add source filters and metric filters.
