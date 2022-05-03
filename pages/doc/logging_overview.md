---
title: Logging Overview
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn how to send logs to Tanzu Observability, view them, and make decisions from the logs data.
---

{% include important.html content="This document is work in progress!"%}

In a microservice architecture, the services in an application are distributed, and you need to monitor each service carefully to ensure that your overall application runs smoothly. Tanzu Observability helps you monitor your application using metrics, traces, and logs. 

You can use metrics to get the numerical data to identify the performance issues in a system, use traces to get an overview of your entire application and discover the services or service requests that don’t perform as expected and use logs to debug the issues.

{%include note.html content="By default, Tanzu Observability retains the logs you send for 14 days. If you want to retain it for a longer time period contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help."%}

## What's a Log?

Logs are structured or unstructured text records of an events that took place at a given time. Logs in Taznu observability include the following attributes:

![Gives an overview of the attributes in a log. They are listed in the table below](images/logging_log_image.png)


<table style="width: 100;">
  <tr>
    <th width="20%">
      Attribute
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td>
      Source
    </td>
    <td markdown="span">
      
    </td>
  </tr>
  <tr>
    <td>
      Time
    </td>
    <td>
      
    </td>
  </tr>
  <tr>
    <td>
      Source
    </td>
    <td>
      
    </td>
  </tr>
  <tr>
    <td>
      Message
    </td>
    <td>
      
    </td>
  </tr>
  <tr>
    <td>
      Tag:Value
    </td>
    <td>
      
    </td>
  </tr>
</table>

## Send Logs to Tanzu Observability

You can send your logs from your logs shipper or directly from your application to the Wavefront proxy.

The Wavefront proxy accepts a JSON payload over HTTP. Logs greater than 16 MB are rejected by the Wavefront proxy. If you logs exceed the default limit of 16 MB, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help.

![shows how data goes from the log shipper to the wavefront proxy and then to the Wavefront instance](images/logging_send_data.png)

### Prerequisites

* A Tanzu Observability by Wavefront account, which gives you access to a cluster. If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).
* A specific API token to let you send logs data to Tanzu Observability. [HOW TO GET THIS?]

### Configure Your Log Shipper

As a best practice we recommend that you use a log shipper to send your logs to Tanzu Observability. A Logs shipper helps, buffer and scrape your logs before sending it to the Wavefront proxy.

Configure your log shipper:
  1. Open port to send logs to the Wavefront Proxy by opening port [ENTER PORT] .. [WHAT ELSE?]
  1. To view logs specific to your application and service, you need to tag the logs with the application and service name. If the logs do not have the application and service name, the Wavefront proxy will add these tags and add the value as `None` [CHECK AND CONFIRM].

### Install Wavefront Proxy 

The Wavefront proxy accepts a JSON payload over HTTP or you can send logs data as a GZIP file. 

Logs greater than 16 MB are rejected by the Wavefront proxy. If you logs exceed the default limit of 16 MB, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help.

Follow these steps:
1. Install the Wavefront Proxy version [ADD VERSION] or higher.
1. Open the port on the Wavefront Proxy to receive logs from the log shipper [WHAT [PORT]].

## View Logs in Tanzu Observability

[cover a scenario - log browser, alerts on logs, traces to logs and link to log browser UI]

[SAMPLE DATA TO EXPLAIN LOG BROWSER]

## Next Steps

* Use Preprocessor rule to update and manage logs sent to Tanzu Observability [Link to doc with examples]

[anything to add here?]
