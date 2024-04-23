---
title: Send Logs
keywords: data, logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_send_logs.html
summary: Learn about sending logs to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).
---

{% include important.html content="The Logs feature is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

You can send logs to the Wavefront proxy from your log shipper or directly from your application. The Wavefront proxy sends the log data to our service.

![shows how data goes from the log shipper to the wavefront proxy and then to the Wavefront instance](images/logging_send_logs2.png)

## Install the Wavefront Proxy

Our logging solution currently requires a Wavefront proxy and does not support direct ingestion. The Wavefront proxy accepts logs as JSON array and JSON lines payload over HTTP or HTTPS and forwards it to the service.

{% include note.html content="For optimal performance, install a standalone proxy cluster that receives only logs payload. Typically two proxy instances behind a load balancer are sufficient." %}

<table style="width: 100;">
  <tr>
    <td width="50%" >
      Proxy System Requirements:
      <ul><li>2 CPUs</li>
      <li>4 GB memory</li>
      <li>Additional proxy configuration settings:
<code>
- name: JAVA_HEAP_USAGE
value:2G
- name: JVM_USE_CONTAINER_OPTS
value: "false"</code>
      </li>
      </ul>
    </td>
    <td width="50%" >
      Proxy Kubernetes Requirements:
      <ul><li>Request resources: 1 CPU and 2 GB memory</li>
      <li>Limit resources: 2 CPUs and 4 GB memory</li>
      <li>1 GB heap memory</li></ul>
    </td>
  </tr>
</table>

To install and configure a new proxy:

1. Select **Browse** > **Proxies**.
1. Click **Add new proxy** and follow the instructions on the screen.
1. Edit the `wavefront.conf` file to open the `pushListenerPorts` to receive logs from the log shipper.
    <br/>For example:
    * If you installed the proxy on Linux, Mac, or Windows, open the [`wavefront.conf`](proxies_configuring.html#proxy-file-paths) file, uncomment the `pushListenerPorts` configuration property, and save the file. The port is set to 2878 by default.
    * If you installed the proxy on Docker, the command you use opens the `pushListenerPorts` and sets it to 2878.
1. Optionally, uncomment or add other [logs proxy configurations](logging_proxy_configurations.html#proxy-configuration-properties-for-logs) the `wavefront.conf` file.
1. Optionally, configure [preprocessor rules](logging_proxy_configurations.html#proxy-preprocessor-rules-for-logs) for logs in the `preprocessor_rules.yaml` file.
1. [Start the proxy](proxies_installing.html#start-and-stop-a-proxy).

{% include note.html content="To learn more about the proxy configuration properties and preprocessor rules for logs, see [Logs Proxy Configurations and Preprocessor Rules](logging_proxy_configurations.html)." %}

## Option 1: Use Our Integrations

You can monitor your Kubernetes clusters or Linux hosts using our built-in integrations and send logs to our system.

* [Linux host integration](linux.html#linux-logs-setup): Install the Wavefront proxy and configure the log shipper.
* [Kubernetes integration](kubernetes.html#kubernetes-quick-install-using-the-kubernetes-operator): Enable logs while you set up the integration, generate the script, and run it on your Kubernetes cluster. 
  {% include note.html content="Logs is not supported when you use OpenShift." %}
* [AWS CloudWatch integration](integrations_aws_metrics.html#setup-for-ingesting-aws-cloudwatch-logs): If you have already configured the AWS CloudWatch integration, you can create an AWS lambda function to send logs to our service.

## Option 2: Configure a Log Shipper

The log shipper sends your data to the Wavefront proxy. We support the [Fluentd](https://docs.fluentd.org/) and [Fluent Bit](https://docs.fluentbit.io/) log shippers, which scrape and buffer your logs before sending them to the Wavefront proxy.

If you want to use a different log shipper, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support).

**Prerequisite**:

Add the VMware domain (`*.vmware.com`) to the allowlist in your environment. Because our service uses a VMware log cluster, you need to add the VMware domain to your allow list to send log data successfully. If you want to narrow down the domain, contact your account representative.

Configure your log shipper:
  1. Install the log shipper. For example, [install Fluentd](https://docs.fluentd.org/installation) or [install Fluent Bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).

  1. Configure the log shipper to send data to the Wavefront proxy.

     1. Add the hostname of the host where the proxy runs.
     1. Add the `pushListenerPorts` that you configured in the proxy.
         
     For example:
     - Edit the  Fluentd configuration file (`fluent.conf`) to send data to a proxy as follows:
    
       ```
       <match wf.**>
         @type copy
         <store>
           @type http
           endpoint http://<proxy url>:<proxy port (example:2878)>/logs?f=logs_json_arr
           open_timeout 2
           json_array true
           <buffer>
             flush_interval 10s
           </buffer>
         </store>
       </match>
     ```
     - Edit the  Fluent Bit configuration file  (`fluent-bit-<os>.conf`) to send data to a proxy as follows:
    
       ```
       [OUTPUT]
           Name http
           Host <proxy url>
           Port <proxy port>(example: 2878)
           URI /logs?f=logs_json_lines
           Format json_lines
       ```
  1. As part of preprocessing, tag the logs with the application and service name to ensure you can drill down from traces to logs.
  2. (Optional) If you're already using a logging solution, specify alternate strings for required and optional log attributes in the [proxy configuration file](logging_proxy_configurations.html). See also [My Logging Solution Doesn't Use the Default Attributes](logging_faq.html#my-logging-solution-doesnt-use-the-default-attributes).

## Learn More!

* [Get started with logs](logging_overview.html).
* [View and browse logs](logging_log_browser.html).
* Learn about the [proxy configurations and proxy preprocessor rules for logs](logging_proxy_configurations.html).
* See [Logs troubleshooting](logging_faq.html).
