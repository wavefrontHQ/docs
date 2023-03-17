---
title: Filebeat Log Data Integration
tags: [integrations list]
permalink: filebeat.html
summary: Learn about the Filebeat Log Data Integration.
---
## Filebeat Integration

The Filebeat integration is a metricized logs solution, which lets you extract metrics from Filebeat logs. Once your Filebeat log data arrives at the proxy, the proxy converts it to metrics by parsing log lines with grok patterns (regular expressions) that you specify in the proxy configuration file. When log metrics start flowing, you can create queries to visualize the data and create alerts.
## Filebeat Log Data Setup



### Step 1. Set Up a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

### Step 2. Configure the Wavefront Proxy to Ingest Log Data and Set Up Data Flow

Follow the instructions in [Log Data Metrics Integration](https://docs.wavefront.com/integrations_log_data.html) for configuring the grok patterns to extract metrics from log data and sending data using Filebeat.



