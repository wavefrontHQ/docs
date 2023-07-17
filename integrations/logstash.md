---
title: Logstash Integration
tags: [integrations list]
permalink: logstash.html
summary: Learn about the Logstash Integration.
---

This page provides an overview of what you can do with the Logstash integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Logstash integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Logstash** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# Logstash Integration

Logstash is a free and open server-side data processing pipeline that allows you to collect data from a variety of sources and ingests it to your favorite destination.

Wavefront supports two methods for sending log data to the Wavefront proxy:
 - Filebeat: Once your data arrives at the proxy, the proxy converts your Logstash log data to metrics by parsing log lines with grok patterns (regular expressions) that you specify in a proxy configuration file.
 - Wavefront Output Plugin: Wavefront Output Plugin for Logstash parses the log data and sends it as metrics to the Wavefront service.




