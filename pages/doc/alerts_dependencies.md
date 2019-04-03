---
title: Building Linked Alerts
keywords: webhooks
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_dependencies.html
summary: Use alert metrics to build alerts that depend on other alerts.
---

Metrics can be related in a dependency hierarchy. For example, a login application service is dependent on a user database, and that database is dependent on a hardware host. If you have a series of different alerts that all depend, in part, on one common underlying metric, you would have to repeat the code for that common metric in each alert in the chain, which quickly becomes a maintenance burden.

Wavefront generates _alert metrics_ for each alert, and you can use the metrics from one alert as part of another alert's condition.

## Alert Metrics

An alert generates three metrics (**isfiring**, **summary**, **firing**):

- **isfiring** - `~alert.isfiring.<alertID>`. Returns a single time series indicating whether the alert is firing. The value is 1 if the alert is firing, 0 otherwise.
  - `alertID` - The alert ID. The field accepts the wildcard `*`. See [Referencing Alert Metrics](#referencing-alert-metrics).

- **summary** - `~alert.summary.<alertID>.<severity>.<type>`. Returns a count for the specified type of metric. The count is 0 if an alert is snoozed or not firing. No value is returned if the alert is in a maintenance window.
  - `alertID` - The alert ID. The field accepts the wildcard `*`. See [Referencing Alert Metrics](#referencing-alert-metrics).
  - `severity` - The severity of the alert.
  - `type` - The type of the metric. One of:
    - `sourcesFiring` - Count of unique sources causing the alert to fire.
    - `seriesFiring` - Count of all series present in the alert causing the alert to fire.
    - `labelsFiring` - Count of unique metrics or aggregations present in the alert causing the alert to fire.
    - `pointTagsFiring` - Count of point tag key-value pairs present in the alert causing the alert to fire.
    
- **firing** - `~alert.firing.<alert ID>.<severity>.<metricName>`. Returns a time series for each source/label associated with the alert. The value is 1 if the alert is firing, 0 otherwise.
  - `alertID` - The alert ID. The field accepts the wildcard `*`. See [Referencing Alert Metrics](#referencing-alert-metrics).
  - `severity` - The severity of the alert.
  - `metricName` - Name of the _first_ metric in the alert condition causing the alert to fire.


**Note:** We recommend that you use `last()` with the `~alert` metrics as shown in the [examples](#alerting-on-other-alerts) below.



### Example Metrics

- `~alert.summary.1484772362710.WARN.sourcesFiring`
- `~alert.summary.1484772362710.WARN.seriesFiring`
- `~alert.firing.1484772362710.WARN.jvm.thread-states.blocked`
- `~alert.isfiring.1484772362710`

### Alert Metric Source Field

The alert metrics `~alert.firing.*` and `~alert.isfiring.*` have a `source` field that is set to the source involved in the alert. If the source is empty, the `source` field is set to `unknown`. 

You can filter for alerts that are firing from specific sources by specifying `source=<source>`, as shown in [Example 1](#example-1-alert-on-an-alert-that-fires-from-specific-sources), below.

**Note:** The `source` field of the `~alert.summary.*` metrics is set to `wavefront`.



## Building a Chain of Alerts with isFiring

Suppose you want 3 alerts to share some of the same alert conditions. You start by defining the alerts as follows:

- Alert A: `ts(processes.blocked) > 2 and ts(mem.available) > 10 and ts(cpu.loadavg.1m) > 5`
- Alert B: `ts(mem.available) > 10 and ts(cpu.loadavg.1m) > 5`
- Alert C: `ts(cpu.loadavg.1m) > 5`

The problem is, if you decide to change alert B or C, you will have to manually copy those changes to alerts A and B.

With `~alert` metrics you can rewrite the alerts as follows:

- Alert A: `ts(processes.blocked) > 2 and last(ts(~alert.isFiring.*, alertName="B"))`
- Alert B: `ts(mem.available) > 10 and last(ts(~alert.isFiring.*, alertName="C"))`
- Alert C: `ts(cpu.loadavg.1m) > 5`

If you decide to change the thresholds for any of the conditions in alerts B or C, the change is automatically propagated to alerts A and B because A and B depend on whether those alerts fire, not on the specific value of the thresholds for the metrics in alerts B and C.

## Alerting on Other Alerts

### Example 1: Alert On an Alert that Fires from Specific Sources

Suppose you want to write an alert, Alert A, that only fires when specific sources from Alert B fires.

- Alert A: `last(ts(~alert.firing.*, source="app-10" and alertName="B"))`

In this case, Alert A fires only if `app-10` was firing from Alert B.

### Example 2: Alert On an Alert that Fires from a Given Number of Sources 

Suppose you want to write an alert, Alert A, that only fires when Alert B has more than 5 sources firing.

- Alert A: `last(ts(~alert.summary.*.sourcesFiring, alertName="B")) > 5`

Suppose you want to write an alert, Alert A, that fires when Alert B has more than 5 sources firing AND the metric `mem.available` is less than 2.

- Alert A: `ts(mem.available) < 2 and last(ts(~alert.summary.*.sourcesFiring, alertName="B")) > 5`

### Example 3: Alert When 2 Alerts Each Have a Firing Source

The example below is an alert condition that depends on 2 separate alerts generating the `sourcesFiring` metrics. In this case, both alerts that this alert depends on must have at least 1 source firing to make this alert fire.

```
last(ts(~alert.summary.1493407920928.WARN.sourcesFiring)) > 0 and last(ts(~alert.summary.1493407943926.WARN.sourcesFiring)) > 0
```


## Referencing Alert Metrics

You can reference a particular alert metric by specifying the alert name, alert tags, or alert ID.

- **alert name** - Specify `*` in the `alertID` field and the alert name using the `alertName` keyword. The example below shows an alert condition that depends on an alert named `alert1` generating the `sourcesFiring` metric with severity `WARN`.

  ```
  last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert1)) > 0
  ```

- **alert tag** - Specify  `*` in the `alertID` field and one or more [alert tags](tags_overview.html) using the syntax `alertTag1=<tag1>...alertTag<N>=<tagN>`. The following condition selects alerts that have tags in the alert tag hierarchy `myapp.database.*`:

  ```
  last(ts(~alert.summary.*.SEVERE.sourcesFiring, alertTag1=myapp.database.*)) > 0
  ```

- **alert ID** - Specify the alert ID in the `alertID` field. To find an alert ID, edit the alert. The alert ID is the second to last component of the page URL. In the URL `https://<wavefront_instance>.wavefront.com/alerts/1493407920928/edit`, the ID is `1493407920928`. The example below is an alert condition that depends on the alert with ID `1493407920928` generating the `sourcesFiring` metric with severity `SEVERE`.

  ```
  last(ts(~alert.summary.1493407920928.SEVERE.sourcesFiring)) > 0
  ```
