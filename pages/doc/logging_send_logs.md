---
title: Sending Logs to Tanzu Observability (Beta)
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_send_logs.html
summary: Learn how to send logs to Tanzu Observability, view them, and make decisions from the logs data.
---

{% include important.html content="Tanzu Observability Logs (Beta) is only enabled for selected customers. If you'd like to participate, contact [technical support](wavefront_support_feedback.html#support)."%}

You can send logs to the Wavefront proxy from your log shipper or directly from your application. The Wavefront proxy sends the log data to the Wavefront instance. 

![shows how data goes from the log shipper to the wavefront proxy and then to the Wavefront instance](images/logging_send_logs.png)

## Prerequisites

* A Wavefront account, which gives you access to a cluster. If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).
* A Wavefront API token linked to an account with Proxy permission. See [Generating an API Token](wavefront_api.html#generating-an-api-token).
* Whitelist the VMware domain (`*.vmware.com`) on your environment. 
  Tanzu Observability uses a VMware log cluster. Therefore, to send your log data successfully, you need to whitelist the VMware domain.

## Install Wavefront Proxy 

The Wavefront proxy accepts a JSON array payload over HTTP. Follow these steps to install and configure the proxy version 11.1 or higher.
1. Log into the Wavefront instance. 
1. Select **Browse** > **Proxies**. 
1. Click **Add Proxy** and follow the instructions on screen. 
1. Open the `pushListnerPorts` to receive the logs from the log shipper.
    <br/>For example:
    * If you installed the proxy on Linux, Mac, or Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file and uncomment the `pushListnerPorts` configuration. The port is set to 2878 by default.
    * If you are running the proxy on Docker, the command you used opens the `pushListnerPorts` and sets it to 2878.
1. [Start the proxy](proxies_installing.html#start-and-stop-a-proxy) again.

## Configure Your Log Shipper

As a best practice, we recommend you use a log shipper to send logs to Tanzu Observability. A log shipper scrapes and buffers your logs before sending them to the Wavefront proxy.

{% include note.html content="Tanzu Observability supports the Fluentd log shipper. If you are using a different log shipper, reach out to [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help." %}

Configure your log shipper:
  1. Configure the log shipper to send data to the Wavefront proxy by adding the hostname of the host that the proxy runs, and the `pushListnerPorts` you configured in the proxy.
  <br/>Shown below is an example configuration:
      
      ```
      <match wf.**>
        @type copy
        <store>
          @type http
          endpoint http://<proxy url>:<proxy port (example:2878)>/logs/json_array?f=logs_json_arr
          open_timeout 2
          json_array true
          <buffer>
            flush_interval 10s
          </buffer>
        </store>
      </match>
      ```
  1. To view logs specific to your application and service, tag the logs with the application and service name. If the logs do not have the application and service name, the Wavefront proxy adds the service and application tags to the log data, and assigns the value `none`. 
  
### Best Practices

If logs exceed the maximum character limit for a message, tag, and value the Wavefront proxy drops the logs. Make sure your logs are within the given limits. See [FAQs](logging_faq.html#track-data-dropped-by-proxy) to monitor the data points dropped by the proxy.

{% include note.html content="If you want to increase the limits, ask your administrator to reach out to [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help." %}

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
      Tags need to be of log cardinality. <br/>
      128 characters per tag.<br/>
      100 tags per log.
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

When the data is in Tanzu Observability, you can use the Log Browser to filter and search logs, and drill into logs from charts, alerts, Application Map page, and the Traces Browser. See [View Logs and Troubleshoot](logging_overview.html#view-logs-and-troubleshoot).

## Next Steps

* Get an overview of [Tanzu Observability logs](logging_overview.html).
* Learn how to [view and browse logs](logging_log_browser.html).
* [Try out the tutorial](logging_kubernetes_tutorial.html) to send logs to Tanzu Observability.
* Have questions? See [Logs FAQs](logging_faq.html).
