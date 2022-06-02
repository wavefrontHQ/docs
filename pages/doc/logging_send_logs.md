---
title: Sending Logs to Tanzu Observability
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_send_logs.html
summary: Learn how to send logs to Tanzu Observability, view them, and make decisions from the logs data.
---

You can send logs from your logs shipper, or directly from your application to the Wavefront proxy.

![shows how data goes from the log shipper to the wavefront proxy and then to the Wavefront instance](images/logging_send_logs.png)

## Prerequisites

* A Tanzu Observability by Wavefront account, which gives you access to a cluster. If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).
* A Tanzu Observability API token linked to an account with Proxy permission. See [Generating an API Token](wavefront_api.html#generating-an-api-token).
* Whitelist the VMware domain (`*.vmware.com`). 
  Tanzu Observability uses the VMware log server as part of its architecture. Therefore, to send your log data successfully, you need to whitelist the VMware domain.

## Install Wavefront Proxy 

The Wavefront proxy accepts a JSON payload over HTTP. Follow these steps to install and configure the proxy:
1. [Install the Wavefront Proxy](proxies_installing.html) version 11.1 or higher.
1. Open the `pushListnerPorts` to receive the logs from the log shipper.
    For example:
    * If you installed the proxy on Linux, Mac, or Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file and uncomment the `pushListnerPorts` configuration.
    * If you are running the proxy on Docker using the Tanzu Observability User Interface (UI) command, the command opens the `pushListnerPorts` of the proxy and sets it to 2878.
1. [Start the proxy](proxies_installing.html#start-and-stop-a-proxy).

## Configure Your Log Shipper

As a best practice, we recommend you use a log shipper to send logs to Tanzu Observability. A Logs shipper scrapes and buffers your logs before sending them to the Wavefront proxy.

{% include note.html content="Tanzu Observability supports the Fluentd log shipper. If you are using a different log shipper, reach out to [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help." %}

Configure your log shipper:
  1. Configure the log shipper to send data to the Wavefront proxy by adding the hostname the proxy runs on and the `pushListnerPorts` you configured in the proxy.
      Shown below is an example configuration if you are running the proxy locally and opened the default `pushListnerPorts` on the proxy, which is 2878:
      ```
      <match wf.**>
        @type copy
        <store>
          @type http
          endpoint http://localhost:2878/logs/json_array?f=logs_json_arr
          open_timeout 2
          json_array true
          <buffer>
            flush_interval 10s
          </buffer>
        </store>
      </match>
      ```
  1. To view logs specific to your application and service, you need to tag the logs with the application and service name. If the logs do not have the application and service name, the Wavefront proxy adds the service and application tags to the log data, and assigns the value `None`. 
  
### Best Practices

If the maximum character limit for a message, tag, and value is exceeded, logs are dropped by the Wavefront proxy. Therefore, make sure your logs are within the given limits. See [FAQs](logging_faq.html#track-data-dropped-by-proxy) to monitor the data points dropped by the proxy.

{% include note.html content="If you want to increase the limits, reach out to [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help." %}

<table style="width: 100;">
  <tr>
    <th width="20%">
      Attribute
    </th>
    <th width="80%">
      Default Limit
    </th>
  </tr>
  <tr>
    <td>
      Log message
    </td>
    <td>
      20,000 characters
    </td>
  </tr>
  <tr>
    <td>
      Log tags
    </td>
    <td>
      128 characters per tag<br/>
      100 tags per log
    </td>
  </tr>
  <tr>
    <td>
      Tag value
    </td>
    <td>
      128 characters
    </td>
  </tr>
</table>


## View Logs in Tanzu Observability

Once the data is in Tanzu Observability, you can use the Log Browser to filter and search logs, and drill into logs from charts, alerts, Application Map page, and the Traces Browser. See [View Logs and Troubleshoot](logging_overview.html#view-logs-and-troubleshoot).

## Next Steps

* Use Preprocessor rules to update and manage logs sent to Tanzu Observability [Link to doc with examples]
* Have questions? See [Logs FAQs](logging_faq.html).
