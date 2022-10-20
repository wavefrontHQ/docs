---
title: Send Logs to Tanzu Observability (Beta)
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_send_logs.html
summary: Learn about sending logs to Tanzu Observability.
---

{% include important.html content="Tanzu Observability Logs (Beta) is enabled only for selected customers. To participate, contact your Tanzu Observability account representative."%}


{% include tip.html content="This doc page gets you started. [Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to experiment with sending logs to Tanzu Observability."%}

You can send logs to the Wavefront proxy from your log shipper or directly from your application. The Wavefront proxy sends the log data to the Wavefront instance.

![shows how data goes from the log shipper to the wavefront proxy and then to the Wavefront instance](images/logging_send_logs_rev.png)

## Prerequisites

* Ensure that you have access to a Wavefront instance.
  <!--If you don’t have a cluster, [sign up for a free trial](https://tanzu.vmware.com/observability-trial).-->
* Add the VMware domain (`*.vmware.com`) to the allowlist in your environment. Because Tanzu Observability uses a VMware log cluster, you need to add the VMware domain to your allowlist to send log data successfully.

  If you want to narrow down the domain, contact your Tanzu Observability account representative.


<!---Token is needed to get from proxy to service. If I generate proxy from GUI, don't need to specify one. * A Wavefront API token linked to an account with Proxy permission. See [Generating an API Token](wavefront_api.html#generating-an-api-token).--->

## Install a Wavefront Proxy

Our logging solution currently requires a Wavefront proxy and does not support direct ingestion. The Wavefront proxy accepts a JSON array payload over HTTP or HTTPS and forwards it to the Wavefront service.

Follow these steps to install and configure a new proxy version 11.3 or later.

1. Log in to your Wavefront instance and select **Browse** > **Proxies**.
1. Click **Add Proxy** and follow the instructions on screen.
1. Edit the `wavefront.conf` file to open the `pushListenerPorts` to receive logs from the log shipper.
    <br/>For example:
    * If you installed the proxy on Linux, Mac, or Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file, uncomment the `pushListenerPorts` configuration property, and save the file. The port is set to 2878 by default.
    * If you installed the proxy on Docker, the command you use opens the `pushListenerPorts` and sets it to 2878.
1. [Start the proxy](proxies_installing.html#start-and-stop-a-proxy).

<!--Is the proxy started as part of the Add Proxy workflow?? If yes, we don't need the last step.--->

{% include note.html content="To learn more about the proxy configuration properties and preprocessor rules for logs, see [Logs Proxy Configurations and Preprocessor Rules](logging_proxy_configurations.html)." %}

<!--This was commented out by Shavi. Confirm with team whether we want to add it back.
### Proxy Recommendations for Logs

When sending logs to the proxy we recommend the following:

* A standalone proxy cluster that only receives logs payloads.
* 2 CPUs
* 4 GB memory
* 2 instances of the proxy working behind a load balancer
* Add the following configurations:
    Example:
    ```
      - name: JAVA_HEAP_USAGE
        value: 2G

      - name: JVM_USE_CONTAINER_OPTS
        value: "false"
    ```

-->

## Configure the Log Shipper

The log shipper sends your data to the Wavefront proxy. During Beta, we support the [Fluentd](https://docs.fluentd.org/) log shipper, which scrapes and buffers your logs before sending them to the Wavefront proxy specified in the `fluent.conf` file.

If you want to use a different log shipper, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support).


Configure your log shipper:
  1. Install the log shipper. For example, [install Fluentd](https://docs.fluentd.org/installation).

  1. Configure the log shipper to send data to the Wavefront proxy.

     a. Add the hostname of the host where the proxy runs.

     b. Add the `pushListenerPorts` that you configured in the proxy.
     <br/>For example, edit the `fluent.conf` file to send data to a proxy as follows:
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
  1. As part of preprocessing, tag the logs with the application and service name to ensure you can drill down from traces to logs.
  2. (Optional) If you're already using a logging solution, specify alternate strings for required and optional log attributes in the [proxy configuration file](logging_proxy_configurations.html). See also [My Logging Solution Doesn't Use the Default Attributes](logging_faq.html#my-logging-solution-doesnt-use-the-default-attributes).

### Limits for Logs

If logs exceed the maximum character limit for a message, tag, or value, the Wavefront proxy drops the logs. Ensure that your logs are within the given limits. See [How Do I Track Data Blocked by the Wavefront Proxy?](logging_faq.html#how-do-i-track-data-blocked-by-the-wavefront-proxy)

{% include note.html content="To increase the limits, ask your administrator to reach out to [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support)." %}

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
      Low cardinality. Many of the recommendations in <a href="optimize_data_shape.html">Optimizing Data Shape to Improve Performance</a> apply.<br/>
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

<!--- Repeat from logging_overview. There are links below already. I recommend we cut this.
## Map the Traces and Metrics to Logs

To get the unified observability experience and drill down from traces to logs and metrics in dashboards or charts to logs, you need to update your settings so that your traces and metrics map to the logs sent from your application. Contact [technical support](wavefront_support_feedback.html#support) to update the settings.

## View Logs

When the data is in Tanzu Observability, you can use the Logs Browser to filter and search logs, and drill into logs from charts, alerts, Application Map page, and the Traces Browser. See [View Logs and Troubleshoot](logging_overview.html#view-logs-and-troubleshoot).
--->

## Next Steps

* [Get started with logs](logging_overview.html)
* [View and browse logs](logging_log_browser.html)
* Learn about [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html)
* [Get answers to FAQs](logging_faq.html)

<!---
[Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
--->
