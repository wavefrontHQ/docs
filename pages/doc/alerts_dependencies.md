---
title: Building Linked Alerts
keywords: webhooks
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_dependencies.html
summary: Use alert metrics to build alerts that depend on other alerts.
---

Metrics can be related in a dependency hierarchy. For example, a login application service is dependent on a user database, and that database is dependent on a hardware host.

Wavefront generates _alert metrics_ for any alert. You can pass the metrics from one alert to the next in the dependency hierarchy.

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

- **firing** - `~alert.firing.<alert ID>.<severity>.<metric>`. Returns a time series for each source/label associated with the alert if the alert is firing. Returns nothing otherwise.
  - `alertID` - The alert ID. The field accepts the wildcard `*`. See [Referencing Alert Metrics](#referencing-alert-metrics).
  - `severity` - The severity of the alert.
  - `metricName` - Name of the _first_ metric in the alert condition causing the alert to fire.

{% include note.html content="We recommend that you use `last()` with the `~alert` metrics as shown in the [examples](#alerting-on-other-alerts) below." %}



### Example Metrics

- `~alert.summary.1484772362710.WARN.sourcesFiring`
- `~alert.summary.1484772362710.WARN.seriesFiring`
- `~alert.firing.1484772362710.WARN.jvm.thread-states.blocked`
- `~alert.isfiring.1484772362710`

### Alert Metric Source Field

The alert metrics `~alert.firing.*` and `~alert.isfiring.*` have a `source` field that is set to the source involved in the alert. If the source is empty, the `source` field is set to `unknown`.

You can filter for alerts that are firing from specific sources by specifying `source=<source>`, as shown in [Example 1](#example-1-alert-on-an-alert-that-fires-from-specific-sources), below.

{% include note.html content="The `source` field of the `~alert.summary.*` metrics is set to `wavefront`." %}



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

When you write an alert, Alert A, that depends on another alert, Alert B, you must provide a condition for Alert A that references one or more metrics for alert B. You can reference Alert B's metrics by alert name, by alert tags, or by alert ID.


### Reference by Alert Name

To write an alert condition that uses an alert name to reference an alert metric, specify:

* The wildcard  `*` in the `alertID` field of the metric name.
* The `alertName` keyword with the alert name.

For example, the following alert condition references the `sourcesFiring` metric with severity `WARN` that is generated by an alert named `Latency Alert`:

```
last(ts(~alert.summary.*.WARN.sourcesFiring, alertName="Latency Alert")) > 0
```

### Reference by Alert Tag

To write an alert condition that uses alert tags to reference an alert metric, specify:

* The wildcard  `*` in the `alertID` field of the metric name.
* 1 or more [alert tags](tags_overview.html) using the syntax `alertTag*=<tag1>,..., alertTag*=<tagN>`

For example, the following alert condition references the `sourcesFiring` metrics with severity `SEVERE` that are generated by alerts with tags in the alert tag hierarchy `myapp.database.*`:

```
last(ts(~alert.summary.*.SEVERE.sourcesFiring, alertTag*="myapp.database.*")) > 0
```

### Reference by Alert ID

To write an alert condition that uses an alert ID to reference an alert metric, specify:
* The alert ID in the `alertID` field of the metric name.

{% include note.html content="You can find the alert ID by viewing the alert in the Alerts browser (click **Alerting > All Alerts** in the taskbar). If you are editing the alert, you can find its ID in the page URL." %}

For example, the following alert condition references the `sourcesFiring` metric with severity `SEVERE` that is generated by the alert with ID `1493407920928`:

```
last(ts(~alert.summary.1493407920928.SEVERE.sourcesFiring)) > 0
```
