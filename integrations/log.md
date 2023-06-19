---
title: Log Data Integration
tags: [integrations list]
permalink: log.html
summary: Learn about the Log Data Integration.
---
## Log Data Integration

Tanzu Observability by Wavefront supports two solutions for sending log data to a Wavefront proxy:

* **Logs (Beta)**: A logging analytics solution, which lets you send logs using a log shipper, such as Fluentd that sends logs as JSON arrays over HTTP, or Fluent Bit that sends logs as JSON lines over HTTP. When your logs start flowing, the users with the **Logs** permission can:
    * View and explore logs on the Logs Browser.
    * Drill into related logs from charts, alerts, application maps, and traces.
See [Get Started with Logs (Beta)](https://docs.wavefront.com/logging_overview.html) for details.
* **Log Data Metrics Integration**: A metricized logs solution, which lets you extract metrics from logs. You can send log data using the Filebeat integration or TCP. Once your log data arrives at the proxy, the proxy converts it to metrics by parsing log lines with grok patterns (regular expressions) that you specify in the proxy configuration file. When log metrics start flowing, you can create queries to visualize the data and create alerts. See [Log Data Metrics Integration](https://docs.wavefront.com/integrations_log_data.html) for details.
## Logs (Beta) Setup



### Step 1. Install and Configure a Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy and configure it to ingest logs.

Follow the instructions in [Install the Wavefront Proxy](https://docs.wavefront.com/logging_send_logs.html#install-the-wavefront-proxy).

### Step 2. Configure Your Log Shipper to Send Data to the Wavefront Proxy

Follow the instructions in [Configure a Log Shipper](https://docs.wavefront.com/logging_send_logs.html#option-2-configure-a-log-shipper).



