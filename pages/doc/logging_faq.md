---
title: Logs FAQ
keywords: logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_faq.html
summary: Learn logs customization and answers to issues you run into.
---

## Don't See Logs When Drilling Down From a Chart?

Did you right click on chart, click logs, came to the log browse, and then saw no data on the Log Browser?
This can happen:
* If your chart has data from more than one source.
  You can only search data for a specific source on the the Log Browser. If you have more than once source , you don't see any data. Therefore, select specific source using the **Source** and search again.
* If you have not tagged your log data when sending the logs from your log shipper. [MORE INFO ON HOW TO TAG]

Did you right-click on a chart, click logs, and saw no data on the Log Browser? This can happen:
* If your chart has data from more than one source. You can only search data from one source on the Log Browser. Therefore, select a source using **Source** and search again.
* If you have not tagged your log data using the source, timestamp, message, application, service, and other additional tags when sending the logs from your log shipper. See [What’s a Log?](logging_overview.html#whats-a-log) for details.

## Don't See Application and Service Logs?

To see logs for an application and service on the Log Browser, you need to tag the data with the `application` and `service` tags on your log shipper (example: Fluentd) before sending the logs to Tanzu Observability. If the logs do not have the application and service tags, the Wavefront proxy adds the application and service tags to the log data and assigns the value `None`.

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
    #service "${record['kubernetes']['labels']['service']}"
    #application "${record['kubernetes']['labels']['application']}"
    timestamp ${time.to_datetime().strftime('%Q')}
  </record>
</filter>

```

## How Do I Track Data Dropped by Proxy?

Wavefront proxy drops the logs that exceed the maximum character limit for a message, tag, and value. To track the data points that were dropped by the proxy:
1. Click **Dashboards** > **All Dashboards**.
1. Search for the **Wavefront Service and Proxy Data chart**, click on it to open.
1. Under the **Proxies overview** section, see the chart **Blocked Logs Per Second** [DOUBLE CHECK NAME WHEN ADDED].
    ADD SCREENSHOT

You see the number of logs that were dropped at a given time. If you see a spike in the number of dropped logs, make sure that you follow the [best practices](logging_send_logs.html#best-practice) when sending logs to Tanzu Observability.
