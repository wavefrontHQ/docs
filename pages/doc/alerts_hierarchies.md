---
title: Alert Dependency Hierarchies
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_hierarchies.html
summary: Learn how to manage alert hierarchies.
---

In any environment metrics can be related in a dependency hierarchy. For example, a login application service is dependent on a user database, and that database is dependent on a hardware host. 

In order to stop alert storms when a lower-level metric in the hierarchy triggers an alert, you can define an alert hierarchy and specify how alerts are triggered within that hierarchy. In addition, if you have a series of different alerts that all depend, in part, on one common underlying metric, you would have to repeat the code for that common metric in every one of the "parent" alerts, which quickly becomes a maintenance burden.

## Alert Metrics

Wavefront generates various types of _alert metrics_. Alert metrics summarize the state of the alert object. 

Alert metrics are named according to the following syntax:

```
~alert.<type>.<alert ID>.<severity>.<subtype>
```

where the fields and their values are:

- `category` - The alert metric category. One of: 
  - `summary`
    - `type` - The subtype of the metric. One of:
      - `sourcesFiring` - Count of unique sources causing the alert to fire.
      - `seriesFiring` - Count of all series present in the alert.
      - `labelsFiring` - Count of unique labels present in the alert.
      - `pointTagsFiring` - Count of point tag key-value pairs present in the alert.
  - `firing`
    - `subtype`- `<metricName>` of the first metric in the alert condition causing the alert to fire. 1 for the first metric present in the alert.
  - `isfiring` - 1 if alert is firing, 0 otherwise.
- `alert ID` - The alert ID. The field accepts the wildcard `*`.
- `severity` - The [severity](alerts_managing.html#severity) of the alert.


### Notes

- The source of the `~alert.summary.*` metrics is set to `wavefront`. The `source` of the `~alert.*firing.*` metrics is the source involved in the alert. If the host field is empty or the HLP is empty, the `source` is set to `unknown`. You can filter the `~alert.*firing.*` metrics by specifying `source=<source>`. 
- When the alert is either snoozed or not firing, the `~alert.summary.*` and `~alert.firing.*` metrics are emitted with the value 0. If the alert is in a maintenance window, no metric is emitted.


## Referencing Alert Metrics

To create an alert based on underlying conditions, you reference one or more alert metrics in the alert's [Condition](alerts_managing.html#creating-an-alert#creating-an-alert) field. For example, the alert for a metric that depends on 2 underlying sources can reference the corresponding alert metrics for those sources in its condition and fire on the combination of those alert metrics.

There are three ways to reference an alert metric: alert name, alert tags, and alert ID.

- **alert name** - Specify `*` in the alert ID field and the alert name in the `alertName` tag. The example below shows an alert condition that depends on 2 alerts generating the `sourcesFiring` metric with severity `WARN`.  It specifies alerts named `alert1` and `alert2`.

  ```r
  last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert1)) > 0 and last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert2)) > 0
  ```

- **alert tag** - Specify  `*` in the alert ID field and one or more [alert tags](tags_overview.html) using the syntax `alertTag1=<tag1>...alertTag<N>=<tagN>`. The following condition selects alerts that have the tags in the alert tag hierarchy `myapp.database.*`: 

  ```r
  last(ts(~alert.summary.*.SEVERE.sourcesFiring, alertTag1=myapp.database.*)) > 0
  ```

- **alert ID** - Specify the alert ID. An alert ID is the second to last component of the URL when you [edit an alert](alerts_managing.html#editing-an-alert). In the URL `https://<wavefront_instance>.wavefront.com/alerts/1493407920928/edit`, the ID is `1493407920928`. The example below is an alert condition that depends on 2 alerts generating the `sourcesFiring` metric with severity `SEVERE`. This example refers to the alerts using the alert IDs `1493407920928` and `1493407943926`. 

  ```r
  last(ts(~alert.summary.1493407920928.SEVERE.sourcesFiring)) > 0 and last(ts(~alert.summary.1493407943926.SEVERE.sourcesFiring)) > 0
  ```

## Example Metrics

- `~alert.summary.1484772362710.WARN.sourcesFiring`
- `~alert.summary.1484772362710.WARN.seriesFiring`
- `~alert.summary.1484772362710.WARN.labelsFiring`
- `~alert.summary.1484772362710.WARN.pointTagsFiring`
- `~alert.firing.1484772362710.WARN.jvm.thread-states.blocked`
- `~alert.isfiring.1484772362710`








