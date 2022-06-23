---
title: Logs FAQs (Beta)
keywords: logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_faq.html
summary: Learn how to customize your logging experience and find answers for frequently asked questions.
---

{% include important.html content="Tanzu Observability Logs (Beta) is only enabled for selected customers. If you'd like to participate, contact your [Tanzu Observability account representative](wavefront_support_feedback.html#support)."%}

{% include tip.html content="This document is work in progress!" %}

## Don't See Logs When Drilling Down From a Chart?

Did you right-click on a chart, click logs, and saw no data on the Log Browser? This can happen:
* If your chart has data from more than one source. You can only search data from one source on the Log Browser. Therefore, select a source using **Source** and search again.
* If you have not tagged your log data using the source, application, service, and other additional tags when sending the logs from your log shipper. See [What’s a Log?](logging_overview.html#whats-a-log) for details.

## Don't See Application and Service Logs?

To see logs for an application and service on the Log Browser, you need to tag the data with the `application` and `service` tags on your log shipper (example: Fluentd) before sending the logs to Tanzu Observability. If the logs do not have the application and service tags, the Wavefront proxy adds the application and service tags to the log data and assigns the value `none`.

{% include note.html content="Distributed tracing uses the concept of application and service. Therefore, for Tanzu Observability to map the log data to the trace data you need to use the same tags." %}

For example, if you are using Fluentd, your `fluent.conf` file can have the following configurations:
```
<filter **>
  @type record_transformer
  enable_ruby
  <record>
    service "<INSERT_YOUR_SERVICE_HERE>"
    application "<INSERT_YOUR_APPLICATION_HERE>" 
    #source "#{ENV['MY_NODE_NAME']}"    
    timestamp ${time.to_datetime().strftime('%Q')}
  </record>
</filter>

```

## How Do I Track Data Blocked by the Wavefront Proxy?

Wavefront proxy drops the logs that exceed the [maximum character limit](logging_send_logs.html#best-practices) for a message, tag, and value. To track the data points logs data and the number of logs blocked by the proxy:
1. Get the integration-systems-with-logs.json file that was shared with you when signing up as a logs beta customer.
1. Click **Dashboards** > **Create Dashboards**.
1. Click **JSON** on the top-left corner.
    ![a screenshot of the UI with the JSON link highlighted.](images/logging_dashboard_json.png)
1. Select **Code** from the drop-down menu and open the editor.
    <br/>![Screenshot of the drop down menu mentioned in the step.](images/dashboard_code_view.png)
1. Copy the content in the JSON file and paste it into the editor.
1. Click **Accept**.
1. Now you see the new dashboard. Click **Save**.
    ![a screenshot of the UI with Save highlighted.](images/logging_dashboard_save.png)
1. See the charts in the **Proxy Overview** section and get more details about the logs you send to Tanzu Observability.
    Example:
    ![A screenshot of the proxy dashboard with the preconfigured charts.](images/logging_proxy_json_dashboard.png)

{% include note.html content="See [Create, Customize, and Optimize Dashboards](ui_dashboards.html) to edit and customize the dashboard." %}

You see the number of logs that were blocked in the **Blocked logs per second** chart. If you see a spike in the number of dropped logs, make sure that you follow the [best practices](logging_send_logs.html#best-practice) when sending logs to Tanzu Observability.


## Nest Steps

* Get an overview of [Tanzu Observability logs](logging_overview.html).
* See how to [send logs to Tanzu Observability](logging_send_logs.html).
* Learn how to [view and browse logs](logging_log_browser.html).
* [Try out the tutorial](logging_kubernetes_tutorial.html) to send logs to Tanzu Observability.
* Learn more about the [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html).
