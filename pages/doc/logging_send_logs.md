---
title: Sending Logs to Tanzu Observability
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_send_logs.html
summary: Learn how to send logs to Tanzu Observability, view them, and make decisions from the logs data.
---

You can send logs from your logs shipper, or directly from your application to the Wavefront proxy.

The Wavefront proxy accepts a JSON payload over HTTP. Logs greater than 16 MB are rejected by the Wavefront proxy. If your logs exceed the default limit of 16 MB, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help.

![shows how data goes from the log shipper to the wavefront proxy and then to the Wavefront instance](images/logging_send_data.png)

### Prerequisites

* A Tanzu Observability by Wavefront account, which gives you access to a cluster. If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).
* A specific API token to send logs to Tanzu Observability. [HOW TO GET THIS?]

### Configure Your Log Shipper

As a best practice, use a log shipper to send your logs to Tanzu Observability. A Logs shipper helps buffer, and scrape your logs before sending them to the Wavefront proxy.

Configure your log shipper:
  1. Open port to send logs to the Wavefront Proxy by opening port [ENTER PORT] .. [WHAT ELSE?]
  1. To view logs specific to your application and service, you need to tag the logs with the application and service name. If the logs do not have the application and service name, the Wavefront proxy will add these tags and add the value as `None` [CHECK AND CONFIRM].

### Install Wavefront Proxy 

Follow these steps:
1. [Install the Wavefront Proxy](proxies_installing.html) version [ADD VERSION] or higher.
1. Open the port on the Wavefront Proxy to receive logs from the log shipper [WHAT [PORT]].

## View Logs in Tanzu Observability

[cover a scenario - log browser, alerts on logs, traces to logs and link to log browser UI]

[SAMPLE DATA TO EXPLAIN LOG BROWSER]

## Next Steps

* Use Preprocessor rule to update and manage logs sent to Tanzu Observability [Link to doc with examples]

[anything to add here?]
