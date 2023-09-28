---
title: Monitoring Metric Data Quality
keywords: administration
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring_metric.html
summary: Monitor and investigate metrics that have the potential to cause performance issues.

---

During ingestion, Operations for Applications assigns an ID to each newly added metric name, span name, source name, and key-value pair of a point tag or span tag. A new ID generally indicates that a new time series has been introduced. The Operations for Applications Usage integration includes a list of predefined alerts that can help you monitor the new metrics being sent. These metrics might include metrics with potentially problematic data quality.

Typically, quick bursts of high cardinality metrics would be cause for an investigation. Using metric names, source names, or point tags to store high-cardinality data, such as timestamps, web session IDs, login IDs, and so on, can eventually cause performance issues when querying your data. 


## How to Install and Customize the Operations for Applications Usage Alerts

To use the predefined alerts, you must first install them, then clone them, and then edit the clones to add recipients.

{% include note.html content="All users can view alerts. You must have the **Integrations** permission to install the system alerts." %}

### Install the Operations for Applications Usage Alerts

**To install the predefined Operations for Applications Usage alerts:**

1. In your service instance, click **Integrations** on the toolbar.
1. Click the **Operations for Applications Usage** integration tile.
1. Click the **Alerts** tab.
1. Click **Install All**.

After you install the alerts, clone them, and edit the clones to add the recipients who will receive notifications when an alert is triggered.

### Clone and Customize the Operations for Applications Usage Alerts

{% include note.html content="To clone and [edit the targets of the integration alerts](webhooks_alert_notification.html#learn-about-alert-targets), you must have the **Alerts** permission. If you edit the system integration alerts and then reinstall them, all of the changes that you've made will be reverted back to their original state." %}

**To clone an integration alert:**

1. On the **Alerts** tab, click **Edit** next to the alert that you want to clone.

   The alert opens in Edit mode.

1. Click the **Clone** button in the top right corner of the alert.
   
1. Enter a name of the new alert and click **Clone**.

   The new alert opens in edit mode.
1. Customize the clone to [specify the recipients](alerts_manage.html#step-3-specify-recipients) and click **Save**.

After you clone an alert, snooze the original integration alert to avoid running duplicate versions of the alert. For more information about editing alerts, see [Manage Alerts](alerts_manage.html).


## How to Monitor the Metric Data Quality with the Usage Alerts

The following list of alerts can help you to monitor the metrics that might have data quality problems.

### High Rate of Host IDs Observed

This alert is designed to keep track of any bursts of new source IDs. The newly created source IDs might be caused by an expected flow in the metrics pipeline, such as new containers spinning up, or by a configuration issue that needs investigation.  

 
### High Rate of Metric IDs Observed

This alert is designed to keep track of new metric IDs sent in per minute over a 10-minute moving average. For example, the following data shape would trigger this alert.

```
"http.client.requests.clientName.api-test.us-west-2.aws.method.GET.outcome.SUCCESS.status.200.uri.-v2-order_carts-cc1d3049-c318-4db2-93b7-4c473a5f-delivery_times-.count_95 2669831779"
"http.client.requests.clientName.api-test.us-west-2.aws.method.GET.outcome.SUCCESS.status.200.uri.-v2-order_carts-c9ecefad-79d1-4f87-8f25-a7b79976-.upper 2669831781"
 
```

The metrics above, have a session ID included in the metric name. This doesn't add any value as it is essentially in the format of an event instead of a continuous time series. The querying of this type of metric data would require using a wildcard (`*`) and could experience performance problems because of the poor-quality data shape.

### High Rate of String IDs Observed

This alert is designed to keep track of new string IDs or point tags. A high rate of new point tags added to a metric, if left unchecked, can have a detrimental effect on the performance of the queries associated with the metric. The following example has a string of characters in the point tag, which would quickly ramp up cardinality. 

```
Point Tag: com.docker.swarm.task.name=aci-665-amp.1.dawqwykkaldwm62tekj675ut8a 1610985074
Point Tag: com.docker.swarm.task.name=aci-665-amp.1.i5dsafbi9capxsf76z6zy877i 1610985074

```

 

## Learn More!

* Use `spy` to sample the new ID assignments and print the metrics associated with them out on screen. See [Use Wavefront Top or Spy to Investigate Traffic](wavefront_monitoring_spy.html).
* Use the Wavefront Top utility to explore the new IDs being ingested. For more information, see the Wavefront Top [documentation on GitHub](https://github.com/wavefrontHQ/wftop).