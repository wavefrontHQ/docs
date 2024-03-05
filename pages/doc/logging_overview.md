---
title: Get Started with Logs
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn about Tanzu Observability (formerly known as VMware Aria Operations for Applications) metrics, logs, and traces.
---

{% include important.html content="The Logs feature is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

 <table style="width: 100%;">
<tbody>
<tr>
  <td width="60%" >
    Tanzu Observability helps you monitor your application using metrics, traces, and logs.
    For example, you can:
    <ul>
      <li>
        Use metrics to get the numerical data and identify and alert on the performance issues in a system.
      </li>
      <li>
        Use traces for an overview of all application services and to find bottlenecks.
      </li>
      <li>
        Use logs to find the root cause of issues.
      </li>
    </ul>
  </td>
  <td width="40%" markdown="span">
    ![shows that Tanzu Observability supports all three pillars : metrics, traces, and logs.](images/logging_ufo.png)
  </td>
</tr>
</tbody>
</table>

{{site.data.alerts.note}}
<ul>
  <li markdown="span">
    Our service retains logs for 30 days during the Logs free trial or retains logs for 7 days when on the freemium subscription! To retain logs for a longer period, contact your account representative or [technical support](wavefront_support_feedback.html#support).
  </li>
  <li>
    Only users with the <b>Logs</b> permission can view the Logs Browser and drill down into logs from charts, alerts, and traces.
    <p>The steps to add roles and permissions differ for <a href="wavefront_release_notes.html#vmware-aria-operations-for-applications-on-vmware-cloud-services">Onboarded and Original subscriptions</a>. See add permissions details for <a href="csp_users_roles.html#create-edit-or-delete-a-custom-role">Onboarded subscriptions</a> and <a href="users_roles.html">Original subscriptions</a>.</p>
  </li>
</ul>
{{site.data.alerts.end}}

## What's a Log?

Logs are structured or unstructured text records of events that took place at a given time. Our service ingests logs in JSON or JSON Lines format.

### Log Attributes

Each log has required attributes, standard attributes, and custom tags. We tokenize the values of these attributes and tags, so that you can filter and search logs.

{%include tip.html content="If your logging solution doesn't use exactly the same tags, you can use a proxy configuration file to map your tags to the expected attributes and tags. See [My Logging Solution Doesn't Use the Default Attributes](logging_faq.html#my-logging-solution-doesnt-use-the-default-attributes). "%}

<table style="width: 100;">
  <tr>
    <td width="20%">
      <strong>Required attributes</strong>
    </td>
    <td width="80%">
    <ul>
    <li><strong>timestamp</strong> or <strong>log_timestamp</strong>: The time when the log was created. The value must be in Epoch milliseconds.
    <p>If your log shipper sends this attribute with a different name, use the <code>customTimestampTags</code> proxy configuration property to establish the mapping.</p>
    <p>If you don't send or map this attribute, we set the value by using our system time.</p>
    </li>
    <li><strong>message</strong> or <strong>text</strong>: The body of the log entry. Can be up to 20k characters.
    <p>If your log shipper sends this attribute with a different name, use the <code>customMessageTag</code> proxy configuration property to establish the mapping.</p></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>
      <strong>Standard attributes</strong>
    </td>
    <td>
    These attributes are required if you want to drill into logs from charts and traces.
    <ul>
    <li><strong>source</strong>: A unique platform that emits the log, such as an AWS EC2 instance or a node in Kubernetes. To ensure that you can drill into logs from charts, use matching source values for logs and metrics. To ensure that you can drill into logs from traces, use matching source values for logs and traces.
    </li>
    <li><strong>application</strong>: Name of the application that emits the log. To ensure that you can drill into logs from traces, use matching application values for logs and traces.
    <p>If your log shipper sends this attribute with a different name, use the <code>customApplicationTags</code> proxy configuration property to establish the mapping.</p></li>
    <li><strong>service</strong>: Name of the service that emits the log. To ensure that you can drill into logs from traces, use matching service values for logs and traces.
    <p>If your log shipper sends this attribute with a different name, use the <code>customServiceTags</code> proxy configuration property to establish the mapping.</p></li>
    </ul>
    </td>
  </tr>
<tr>
    <td>
    <strong>Custom Tags</strong>
    </td>
    <td>
    You can send logs with additional custom tag key-value pairs of your choice. 
    <br/>Make sure the custom tags are low-cardinality tags. Many of the recommendations in <a href="optimize_data_shape.html">Optimizing Data Shape to Improve Performance</a> apply.
    </td>
  </tr>
</table>


### Log Data Format Example

![Image giving an overview of the attributes in a log. They are listed in the table above.](images/logging_log_image.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Send Logs

You can send your logs using a log shipper, such as Fluentd that sends logs as JSON arrays over HTTP, or Fluent Bit that sends logs as JSON lines over HTTP. See [Send logs to our service](logging_send_logs.html).

![A diagram shows how logs are sent from a log shipper to our service components](images/logging_send_logs2.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

{% include note.html content="Our service does not support logs ingestion for the OpenTelemetry Protocol." %}

## View Logs and Troubleshoot

When logs start flowing into our service, as a user with the **Logs** permission, you can:
* Go to the [Logs Browser](logging_log_browser.html) directly to view and explore logs.
* You can [create a logs chart](logging_logs_chart.html) on a dashboard so you can troubleshoot faster.
* Drill into the Logs Browser from charts, alerts, application map, and the Traces Browser.
* [Customize log settings](logging_logs_settings.html)
  * If your metrics, logs, and traces have different tags, you can map the metrics and traces tags to the log tags.
  * Customize the time window on a chart or Traces Browser when drilling into logs from a chart and trace.
  
![A diagram that shows all the UI pages that link to logs (charts, alerts, application map and Traces Browser). How to navigate from each one of them to the Logs Browser is explained in the sections below.](images/logging_all_ui.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Learn More!

* [Send logs](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn about the [proxy configurations and proxy preprocessor rules for logs](logging_proxy_configurations.html).
* See [Logs troubleshooting](logging_faq.html).

