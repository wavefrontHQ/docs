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
* If you have not tagged your log data using the source, application, service, and other additional tags when sending the logs from your log shipper. See [What’s a Log?](logging_overview.html#whats-a-tanzu-observability-log) for details.

## Don't See Application and Service Logs?

To see logs for an application and service on the Log Browser, you need to tag the data with the `application` and `service` tags on your log shipper (example: Fluentd) before sending the logs to Tanzu Observability. If the logs do not have the application and service tags, the Wavefront proxy adds the application and service tags to the log data and assigns the value `none`.

{{site.data.alerts.note}}
  <ul>
    <li>
      There may be a marginal cost increase for additional tags. For more information, contact <a href="wavefront_support_feedback.html#support">technical support</a>.
    </li>
    <li>
      Distributed tracing uses the concept of application and service. Therefore, for Tanzu Observability to map the log data to the trace data you need to use the same tags.
    </li>
  </ul>
{{site.data.alerts.end}}


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

You see the number of logs that were blocked in the **Blocked logs per second** chart. If you see a spike in the number of dropped logs, make sure that you follow the [best practices](logging_send_logs.html#best-practices) when sending logs to Tanzu Observability.

## Why do I See a `pattern not match` Error in the Fluentd Logs?

If your application runs on a Kubernetes cluster, and if you see a `pattern not match` error in the Fluentd logs, Fluentd scrapes the logs on your application but does not send them across to the Wavefront proxy. Add the following configuration to your `fluent.conf` file to resolve the `pattern not match` error:

```
<pattern>
  format regexp
  expression /^(?<time>.+) (?<stream>stdout|stderr)( (.))? (?<log>.*)$/
  time_format '%Y-%m-%dT%H:%M:%S.%NZ'
  keep_time_key false
</pattern>
```

## How Do I Know If the Proxy Receives Data?

Don't see your data on the Logs Browser and don't know if it is your log shipper (example: Fluentd) or the Wavefront proxy that's not sending the data? Follow the steps below to confirm that the Wavefront proxy is sending data. 

1. Run the following curl command to send a log to the proxy as a JSON payload:

    ```
    curl --location --request POST 'http://<Proxy_Host>:<Proxy_Port>/logs/json_array?f=logs_json_arr' \
    --header 'Content-Type: application/json' \
    --data-raw '[
        {
            "message": "test message",
            "source": "localhost",
            "application": "test_application",
            "test_label": "label1"
        }
    ]'
    ```
    {% include tip.html content="For information on the attributes that you can send for logs, see [What’s a Tanzu Observability Log?](logging_overview.html#whats-a-tanzu-observability-log)" %}

    Example: Use the following command if you are running the proxy locally and using port 2878:

    ```
    curl --location --request POST 'http://localhost:2878/logs/json_array?f=logs_json_arr' \
    --header 'Content-Type: application/json' \
    --data-raw '[
        {
            "message": "test message",
            "source": "localhost",
            "application": "test_application",
            "test_label": "label1"
        }
    ]'
    ```
    {% include note.html content="If the proxy is not up and running, you get the following error message: **Failed to connect to localhost port 2878: Connection refused**." %}

1. To confirm that the data sent to the proxy, is sent to the service:
    1. In your web browser, go to your Wavefront instance and log in.
    1. From the toolbar, select **Logs**. You are taken to the Log Browser.
    1. Click **applications** under **All Tags**.
    1. Click **test_application** (this is the value of the application tag in the log message you sent). You see the test data you sent on the chart.

{{site.data.alerts.note}}
  <ul>
    <li>
      If you don't see the data, you need to check your proxy configurations.
    </li>
    <li>
      If the proxy is sending data, you need to check the logs shipper is configurations.  
    </li>
  </ul>
{{site.data.alerts.end}}

## Nest Steps

* Get an overview of [Tanzu Observability logs](logging_overview.html).
* See how to [send logs to Tanzu Observability](logging_send_logs.html).
* Learn how to [view and browse logs](logging_log_browser.html).
* [Try out the tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
* Learn more about the [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html).
