---
title: New Relic Integration
tags: [integrations list]
permalink: newrelic.html
summary: Learn about the New Relic Integration.
---
## New Relic Integration

The New Relic integration is a native integration offering agent less data ingestion of metrics from the New Relic SaaS service.

### Metrics Configuration
This integration can be configured to pull all application metrics from New Relic. If you want to pull only certain application metrics, configure filters while setting up the integration.

Metrics that originate from New Relic are prefixed with `newrelic.apps.` in Operations for Applications. After you set up the integration, you can browse the available metrics in the metrics browser.

## New Relic Integration



### Adding New Relic Integration

Adding a New Relic integration requires establishing a trust relationship between New Relic and Tanzu Observability by Wavefront.


1. Navigate to the New Relic API Key generator in your New Relic instance.
2. Generate a key.
3. Copy the key and paste in into the API Key field in the integration setup.
4. (Optional) Add source filters and metric filters.

You can then configure Tanzu Observability to continually load application data.





