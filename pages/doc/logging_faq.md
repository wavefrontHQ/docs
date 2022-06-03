---
title: Logs FAQ
keywords: logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_faq.html
summary: Learn logs customization and answers to issues you run into.
---

## Don't See Logs When Drilling Down From a Chart

Did you right click on chart, click logs, came to the log browse, and then saw no data on the log browser?
This can happen:
* If your chart has data from more than one source.
  You can only search data for a specific source on the the log browser. If you have more than once source , you don't see any data. Therefore, select specific source using the **Source** and search again.
* If you have not tagged your log data when sending the logs from your log shipper. [MORE INFO ON HOW TO TAG]

## Don't See Application and Service Logs

To see logs for an application and service on the Log Browser, you need to tag the data with the `application` and `service` tags on your Log Shipper (example: FluentD) before sending the logs to Tanzu Observability. If the logs do not have the application and service name, the Wavefront proxy adds the service and application tags to the log data, and assigns the value `None`.

{% include note.html content="Distributed tracing uses the `application` and `service` identify applications and service. Therefore, for Tanzu Observability to map the log data to the trace data you need to use the same tags." %}

For example, if you are using FluentD, your `fluent.conf` file can have the following configurations:
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

## Track Data Dropped by Proxy

Logs are dropped by the Wavefront proxy, if the maximum character limit, for a message, tag, and value are exceeded. To track the data points that were dropped by the proxy:
1. Click **Dashboards** > **All Dashboards**.
1. Search for the **Wavefront Service and Proxy Data chart**, click on it to open.
1. Under the **Proxies overview** section, see the chart **Blocked Logs Per Second** [DOUBLE CHECK NAME WHEN ADDED].
    ADD SCREENSHOT

You see the number of logs that were dropped at a given time. If you see, spike in dropped logs, make sure that you follow the [best practices](logging_send_logs.html#best-practice) when sending logs to Tanzu Observability.
