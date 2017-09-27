---
title: Alert Dependencies
keywords: webhooks
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_dependencies.html
summary: Learn how to manage alert dependencies using alert metrics.
---

In any environment metrics can be related in a dependency hierarchy. For example, a login application service is dependent on a user database, and that database is dependent on a hardware host. If you have a series of different alerts that all depend, in part, on one common underlying metric, you would have to repeat the code for that common metric in every one of the "parent" alerts, which quickly becomes a maintenance burden.

The mechanism that Wavefront provides for expressing alert dependencies are _alert metrics_. To create an alert based on underlying conditions, you reference one or more alert metrics in the alert's [Condition](alerts_managing.html#alert-properties) field. For example, the alert for a metric that depends on 2 underlying sources can reference the corresponding alert metrics for those sources in its condition and fire on the combination of those alert metrics.

## Alert Metrics

The three types of alert metrics&mdash;**summary**, **firing**, **isfiring**&mdash;and their syntax are:

- **summary** - `~alert.summary.<alertID>.<severity>.<type>`where 
  - `alertID` - The alert ID. The field accepts the wildcard `*`.
  - `severity` - The [severity](alerts_managing.html#alert-properties) of the alert.

When an alert is snoozed or not firing, the `~alert.summary.*` metrics are emitted with the value 0. If the alert is in a maintenance window, no metric is emitted.
   - `type` - The type of the metric. One of:
    - `sourcesFiring` - Count of unique sources causing the alert to fire.
    - `seriesFiring` - Count of all series present in the alert.
    - `labelsFiring` - Count of unique metrics or aggregations present in the alert.
    - `pointTagsFiring` - Count of point tag key-value pairs present in the alert.
    
- **firing** - `~alert.firing.<alert ID>.<severity>.<metricName>`, where `<metricName>`is the name of the _first_ metric in the alert condition causing the alert to fire. Firing will return a timeseries for each source/label associated with the alert. The value is 1 if the alert is firing, 0 otherwise. 
- **isfiring** - `~alert.isfiring.<alertID>`. As opposed to firing, isfiring returns just one timeseries that indicates if the alert is firing or not. The value is 1 if the alert is firing, 0 otherwise.



NOTE: It is recommended that you use last() with the ~alert metrics. Examples are in the use cases below.

### Example Metrics

- `~alert.summary.1484772362710.WARN.sourcesFiring`
- `~alert.summary.1484772362710.WARN.seriesFiring`
- `~alert.firing.1484772362710.WARN.jvm.thread-states.blocked`
- `~alert.isfiring.1484772362710`

### Use Case Example 1: Chain together alert dependencies with isFiring

Without ~alert metrics, one would traditionally create dependencies across alert A, B, and C using the following method:

- Alert A: `ts(processes.blocked) > 2 and ts(mem.available) > 10 and ts(cpu.loadavg.1m) > 5`
- Alert B: `ts(mem.available) > 10 and ts(cpu.loadavg.1m) > 5`
- Alert C: `ts(cpu.loadavg.1m) > 5`

The problem is, if you decide to change alert B or C, you will have to manually copy those changes to alerts A and B. 

With ~alert metrics you can rewrite the alerts as follows:

- Alert A: `ts(processes.blocked) > 2 and last(ts(~alert.isFiring.*, alertName="B"))`
- Alert B: `ts(mem.available) > 10 and last(ts(~alert.isFiring.*, alertName="C"))`
- Alert C: `ts(cpu.loadavg.1m) > 5`

If you decide to change the thresholds for any of the conditions in alerts B or C, the change is automatically propagated to alerts A and B because A and B depend on whether those alerts fire, not on the specific value of the thresholds for the metrics in alerts B and C.

### Use Case Example 2: Alert if another alert is firing, but only for specific source(s)

Suppose you want to write an alert, Alert A, that only fires when specific sources from Alert B fires.

- Alert A condition: `last(ts(~alert.Firing.*, source="app-10" and alertName="B")) > 5`

In this case, Alert A would only fire if app-10 was firing from Alert B.

### Use Case Example 3: Alert if more than X sources are firing from another alert

Suppose you want to write an alert, Alert A, that only fires when Alert B has more than 5 sources firing.

- Alert A condition: `last(ts(~alert.summary.*.sourcesFiring, alertName="B")) > 5`

Suppose you want to write an alert, Alert A, that only fires when Alert B has more than 5 sources firing AND the metric, "mem.available" is less than 2.

- Alert A condition: `ts(mem.available) < 2 and last(ts(~alert.summary.*.sourcesFiring, alertName="B")) > 5`

### Alert Metric Source Field

- The `source` field of the `~alert.summary.*` metrics is set to `wavefront`. 
- The `source` field of the `~alert.*firing.*` metrics is the source involved in the alert. If the source is empty, the `source` is set to `unknown`. You can filter the `~alert.*firing.*` metrics by specifying `source=<source>`. 

## Referencing Alert Metrics

There are three ways to reference an alert metric: alert name, alert tags, and alert ID.

- **alert name** - Specify `*` in the `alertID` field and the alert name in the `alertName` tag. The example below shows an alert condition that depends on an alert named `alert1` generating the `sourcesFiring` metric with severity `WARN`.

  ```
  last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert1)) > 0
  ```

- **alert tag** - Specify  `*` in the `alertID` field and one or more [alert tags](tags_overview.html) using the syntax `alertTag1=<tag1>...alertTag<N>=<tagN>`. The following condition selects alerts that have tags in the alert tag hierarchy `myapp.database.*`: 

  ```
  last(ts(~alert.summary.*.SEVERE.sourcesFiring, alertTag1=myapp.database.*)) > 0
  ```

- **alert ID** - Specify the alert ID in the `alertID` field. To find an alert ID, [edit an alert](alerts_managing.html#editing-an-alert). The alert ID is the second to last component of the page URL. In the URL `https://<wavefront_instance>.wavefront.com/alerts/1493407920928/edit`, the ID is `1493407920928`. The example below is an alert condition that depends on the alert with ID `1493407920928` generating the `sourcesFiring` metric with severity `SEVERE`.

  ```
  last(ts(~alert.summary.1493407920928.SEVERE.sourcesFiring)) > 0
  ```
  
## Sources Firing Use Case

An alert that depends on any `sourcesFiring` on 2 different alerts can refer to the corresponding internal metrics to take action when both the underlying alert metrics are generated. The example below is for an alert condition that depends on the `sourcesFiring` metric of 2 alerts identified by the `alertName` tag:

```
last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert1)) > 0 and last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert2)) > 0
```

