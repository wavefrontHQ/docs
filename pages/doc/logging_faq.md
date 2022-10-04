---
title: Logs FAQs (Beta)
keywords: logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_faq.html
summary: Learn how to customize your logging experience and find answers for frequently asked questions.
---

{% include important.html content="Tanzu Observability Logs (Beta) is enabled only for selected customers. If you'd like to participate, contact your Tanzu Observability account representative."%}

## Why Don't I See Logs When I Drill Down From a Chart?

If you right-click on a chart and select **Logs**, you're directed to the Log Browser. If ou don't see data on the Log Browser, here are some things to explore:
* If your chart has data from more than one source, the Log Browser cannot show the logs because it can show logs from only one log. To see the data corresponding to the chart query but focused on one source, select a sourc in the Log Browser and click **Search**.
* If you have not tagged your log data using the source, application, service, or other tags when you sent the logs from your log shipper, you might see no search results in the Log Browser. See [What’s a Log?](logging_overview.html#whats-a-tanzu-observability-log) for details on the log syntax.

## Why Don't I See Application and Service Logs?

To see logs for an application and service on the Log Browser, the data must include the `application` and `service` tags when they're sent by your log shipper (e.g. Fluentd). If the logs do not have the `application` and `service` tags, the Wavefront proxy adds the application and service tags to the log data and assigns the value `none`.

{{site.data.alerts.note}}
  <ul>
    <li>
      There may be a marginal cost increase for additional tags.
    </li>
    <li>
      If you're using our [distributed tracing](tracing_basics.html) solution, use the same `application` and `service` tags in both places to map from the tracing GUI to the Log Browser.
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

The Wavefront proxy drops the logs that exceed the [maximum character limit](logging_send_logs.html#best-practices) for a message, tag, and value. To track the incoming log data and the number of logs that are blocked by the proxy:
1. Find the integration-systems-with-logs.json file that was shared with you when signing up as a logs Beta customer.
1. Log in to your Wavefront instance and select **Dashboards** > **Create Dashboards**.
1. Click **JSON** in the top-left corner.
    ![a screenshot of the UI with the JSON link highlighted.](images/logging_dashboard_json.png)
1. Select **Code** from the drop-down menu and open the editor.
    <br/>![Screenshot of the drop down menu mentioned in the step.](images/dashboard_code_view.png)
1. Copy the content in the JSON file, paste it into the editor, and click **Accept**.
1. In the top right of the dashboard that appears, click **Save**.
    ![a screenshot of the UI with Save highlighted.](images/logging_dashboard_save.png)
1. Examine the charts in the **Proxy Overview** section to get details about the logs you are sending.

    ![A screenshot of the proxy dashboard with the preconfigured charts.](images/logging_proxy_json_dashboard.png)

{% include note.html content="[Examine Data with Dashboards and charts](ui_examine.html) explains how explore dashboards and includes videos and links." %}

In the **Blocked logs per second** chart you see how many logs were blocked. If you see a spike in the number of dropped logs, ensure that you follow [best practices](logging_send_logs.html#best-practices) when sending logs.

## Why do I See a `pattern not match` Error in the Fluentd Logs?

If your application runs on a Kubernetes cluster, and if you see a `pattern not match` error in the Fluentd logs, Fluentd scrapes the logs on your application but does not send them to the Wavefront proxy. Add the following configuration to your `fluent.conf` file to resolve the `pattern not match` error:

```
<pattern>
  format regexp
  expression /^(?<time>.+) (?<stream>stdout|stderr)( (.))? (?<log>.*)$/
  time_format '%Y-%m-%dT%H:%M:%S.%NZ'
  keep_time_key false
</pattern>
```

## How Do I Know If the Proxy Receives Data?

You don't see your data on the Log Browser. You don't know if there's a problem with the log shipper (e.g. Fluentd) or with the Wavefront proxy not sending the data to the Wavefront service? To confirm that the Wavefront proxy is sending data, follow these steps:

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

    For example, use the following command if you are running the proxy locally and using port 2878:

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
    {% include note.html content="If you get the following error message: **Failed to connect to localhost port 2878: Connection refused**, the problem is likely that the proxy is not running." %}

1. Verify that the data that is sent from the Log Shipper to the proxy is then sent by the proxy to the Wavefront service, as follows:
    1. Log in to your Wavefront instance.
    1. On the toolbar, click **Logs**.
    1. In the Log Browser, click **applications** under **All Tags**.
    1. Click **test_application** (or the value of the application tag in the log message you sent).

* If the proxy is sending data but you don't see your log data, check that the Logs Shipper is configured correctly.
* If you don't see the data, check your proxy configuration and ensure, for example, that the port and URL are correct.


## Next Steps

* [Understand the big picture](logging_overview.html)
* [Send logs to Tanzu Observability](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn about [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html).


<!---
[Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
--->
