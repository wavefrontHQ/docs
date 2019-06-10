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

## New Relic Integration Setup

To set up the integration, give Wavefront read-only access to your New Relic account.
then configure Wavefront to continually load application data.
1. Navigate to New Relic API Key generator
2. Generate a key
3. Give Wavefront read-only access to your New Relic account.
4. Copy the key and paste it into the **API Key** field on the right.
3. (Optional) Add Source Filters and Metric Filters. 
