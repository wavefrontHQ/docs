---
title: Log Data Integration
tags: [integrations list]
permalink: log.html
summary: Learn about the Log Data Integration.
---

This page provides an overview of what you can do with the Log Data integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Log Data integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Log Data** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Log Data Integration

Operations for Applications supports two solutions for sending log data to a Wavefront proxy:

* **Logs**: A logging analytics solution, which lets you send logs using a log shipper, such as Fluentd that sends logs as JSON arrays over HTTP, or Fluent Bit that sends logs as JSON lines over HTTP. When your logs start flowing, the users with the **Logs** permission can:
    * View and explore logs on the Logs Browser.
    * Drill into related logs from charts, alerts, application maps, and traces.
See [Get Started with Logs](https://docs.wavefront.com/logging_overview.html) for details.
* **Log Data Metrics Integration**: A metricized logs solution, which lets you extract metrics from logs. You can send log data using the Filebeat integration or TCP. Once your log data arrives at the proxy, the proxy converts it to metrics by parsing log lines with grok patterns (regular expressions) that you specify in the proxy configuration file. When log metrics start flowing, you can create queries to visualize the data and create alerts. See [Log Data Metrics Integration](https://docs.wavefront.com/integrations_log_data.html) for details.



