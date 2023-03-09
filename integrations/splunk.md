---
title: Splunk Integration
tags: [integrations list]
permalink: splunk.html
summary: Learn about the Splunk Integration.
---
# Splunk Logs Integration

Usually the best way to send metrics to a monitoring system is to use a metrics library. However, sometimes you have a legacy system, or a system that is difficult to modify, and you want to garner metrics from Splunk logs. 

Wavefront supports sending log data to your Wavefront proxy with TCP. This method is supported in Wavefront proxy 4.4 and higher. Once your data arrives at the proxy, the proxy converts your Splunk log data to metrics by parsing log lines with grok patterns (regular expressions) that you specify in a proxy configuration file.



## Splunk Log Data Setup



### Step 1. Set up Wavefront Proxy

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.


### Step 2. Configure the Wavefront Proxy to Ingest Log Data and Set up Data Flow

Follow the instructions in [Log Data Metrics Integration](https://docs.wavefront.com/integrations_log_data.html) for configuring the grok patterns to extract metrics from log data and sending data using TCP.




