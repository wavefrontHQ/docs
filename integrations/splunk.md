---
title: Splunk Integration
tags: [integrations list]
permalink: splunk.html
summary: Learn about the Splunk Integration.
---

This page provides an overview of what you can do with the Splunk integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Splunk integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Splunk** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# Splunk Logs Integration

Usually the best way to send metrics to a monitoring system is to use a metrics library. However, sometimes you have a legacy system, or a system that is difficult to modify, and you want to garner metrics from Splunk logs.

Tanzu Observability supports sending log data to your Wavefront proxy with TCP. This method is supported in Wavefront proxy 4.4 and higher. Once your data arrives at the proxy, the proxy converts your Splunk log data to metrics by parsing log lines with grok patterns (regular expressions) that you specify in a proxy configuration file.






