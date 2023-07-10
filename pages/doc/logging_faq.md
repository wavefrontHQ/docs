---
title: Logs Troubleshooting (Beta)
keywords: logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_faq.html
summary: Learn how to customize your logging experience and find answers for frequently asked questions.
---

{% include important.html content="Logs (Beta) is enabled only for selected customers. If you'd like to participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

## My Logging Solution Doesn't Use the Default Attributes

You can use the [proxy configuration properties](logging_proxy_configurations.html) to map attributes your logs are using to attributes our logging solution expects, as follows:

<table>
<tr>
  <th width="30%">
  Expected log attribute
  </th>
  <th width="70%">
  Proxy property to change the attribute
  </th>
</tr>
<tr>
<td>timestamp </td>
<td>customTimestampTags</td> </tr>
<tr><td>message </td>
<td>customMessageTags </td> </tr>
<tr><td>application </td>
<td>customApplicationTags  </td> </tr>
<tr><td>service </td>
<td>customServiceTags </td> </tr>
</table>


## Why Don't I See Logs When I Drill Down From a Chart?

If you right-click on a chart and select **Logs (Beta)**, you're directed to the Logs Browser. If you don't see data on the Logs Browser, here are some things to explore:
* If your chart has data from more than one source and you didn't select the target source, the Logs Browser cannot show the logs because this feature shows logs from only one source. To see the data corresponding to the chart query but focused on one source, select a source in the Logs Browser and click **Search**.
* If you have not tagged your log data using the corresponding source value when you sent the logs from your log shipper, you might see no search results in the Logs Browser. See [What’s a Log?](logging_overview.html#whats-a-log) for details on the log syntax.

## Why Are Some of the Logs Tags Missing?

Our logging solution expects that certain tags are defined in the logs that you send in.

You can use proxy configuration properties to map the tags that your log shipper is using to the tags that our solution expects. See [Logs Proxy Configurations and Preprocessor Rules](logging_proxy_configurations.html).

{{site.data.alerts.note}}
  <ul>
    <li>
      There may be a marginal cost increase for additional tags.
    </li>
    <li>
      If you're using our <a href="tracing_basics.html">distributed tracing</a>, use the same <code>application</code> and <code>service</code> tags in both places to map from the tracing GUI to the Logs Browser.
    </li>
  </ul>
{{site.data.alerts.end}}


If you are using Fluentd, you can specify the `application` and `service` in the `fluent.conf` file as follows:
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

The Wavefront proxy drops the logs that exceed the [maximum character limit](logging_send_logs.html#limits-for-logs) for a message, tag, and value. Use the methods listed below to track the incoming log data and the number of logs blocked by the proxy:

### Step 1: See the Data on the Predefined Logs Stats Charts

1. Select **Dashboards** > **All Dashboards**.
1. Search for **Operations for Applications Service and Proxy Data** in the search bar, and click the dashboard.
    ![A screenshot of the results you get when you search for  the Operations for Applications Service and Proxy Data dashboard. ](images/logs_wavefront_service_and_proxy_data.png)
1. Examine the charts in the **Logs Stats** section of the [Operations for Applications Service and Proxy Data dashboard](wavefront_monitoring.html#operations-for-applications-service-and-proxy-data-dashboard) to get details about the logs you are sending.

    ![A screenshot of the proxy dashboard with the preconfigured charts.](images/logging_proxy_logs_dashboard.png)

    {% include note.html content="To learn more, see [Examine Data with Dashboards and charts](ui_examine_data.html)." %}

    - In the **Blocked Logs per Second** chart, you can see how many logs were blocked.
    - In the **Proxy Backlog Size (Bytes)** chart, non-zero values indicate that the proxy is having issues delivering data.

If you see blocked logs, you can get more details about them in the metrics browser (see the next section).

### Step 2: Search for Metrics on the Metrics Browser

1. Select **Browse** > **Metrics**.
1. In the [Metrics Browser](metrics_managing.html), search for metrics with the `~proxy.log.` namespace. The results you see can be:
    <table style="width: 100%;">
      <thead>
        <tr>
          <th width="30%">
            Metric Name
          </th>
          <th width="70%">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td markdown="span">
            `logAnnotationKeyBadChars`
          </td>
          <td>
            If the log tag key does not meet the following guidelines the logs are blocked:<br/>
            <ul>
              <li>
                The log tag key must only have alphanumeric or underscore characters.
                {% include note.html content="Alphanumeric refers to A through Z (uppercase letters), a through z (lowercase letters), and 0 through 9 (numbers)." %}
              </li>
              <li>
                The tag key name also should not start with a digit and should not start or finish with an underscore.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td markdown="span">
            `logAnnotationValueEmpty`
          </td>
          <td markdown="span">
            A value for one or more of the annotations in the log message was either blank or empty.
          </td>
        </tr>
        <tr>
          <td markdown="span">
            `logSourceTooLong` <br/>
            `logMessageTooLong`<br/>
            `tooManyLogTags`<br/>
            `logAnnotationKeyTooLong`<br/>
            `logAnnotationValueTooLong`
          </td>
          <td markdown="span">
            You see the following metrics if the log value you sent or the number of log tags you sent exceeds the maximum limit. For more details, see [limits for logs](logging_send_logs.html#limits-for-logs).
          </td>
        </tr>
      </tbody>
    </table>

Example: 
![A screenshot of the metrics you see when you search for ~proxy.log.](images/logging_blocked_logs_metrics.png)

### Step 3: Search the Proxy Logs

Go to your proxy logs and search for logs containing the following message:

```
INFO  [AbstractReportableEntityHandler:reject] [2878] blocked input:
```

You can see why the log was rejected and the log message.


## Why Do I See a `pattern not match` Error in the Fluentd Logs?

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

If you don't see your data on the Logs Browser, you might not know if there's a problem with the log shipper or with the Wavefront proxy.

To confirm that the Wavefront proxy is sending data, follow these steps:

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
    {% include tip.html content="For information on the log format, see [What’s a Log?](logging_overview.html#whats-a-log)" %}

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

1. Verify that the data that is sent from the log shipper to the proxy is then sent by the proxy to our service, as follows:
    1. On the toolbar, click **Logs**.
    1. In the Logs Browser, click **applications** under **All Tags**.
    1. Click **test_application** (or the value of the application tag in the log message you sent).

* If the proxy is sending data but you don't see your log data, check that the log shipper is configured correctly.
* If you don't see the data, check your proxy configuration and ensure, for example, that the port and URL are correct.


## Learn More!

* [Get started with logs](logging_overview.html).
* [Send logs to our service](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn about the [proxy configurations and proxy preprocessor rules for logs](logging_proxy_configurations.html).

