---
title: Alert Dependency Hierarchies
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_hierarchies.html
summary: Learn how to manage alert hierarchies.
---

In any environment metrics can be related in a dependency hierarchy. For example, a login application service is dependent on a user database, and that database is dependent on one underlying hardware host. In this simple case we have login service > user database > database host. 

In order to stop alert storms when a lower-level metric in the hierarchy triggers an alert, you can define an alert hierarchy and specify how alerts are triggered within that hierarchy. 

To create an alert based on underlying conditions, you reference one or more _alert metrics_ in the alert's [Condition](alerts_creating.html#creating-an-alert) field. For example, the alert for a metric that depends on 2 underlying sources can reference the corresponding alert metrics for those sources in its condition and fire on the combination of those alert metrics.

Alert metrics are named according to the following syntax:

```
~alert.<category>.<alert ID>.<severity>.<type>
```
where the fields are:

- `category` the alert metric category. One of: summary, firing, isfiring.
- `alert ID` the alert ID. The field accepts the wildcard `*`.
- `severity` the severity of the triggered alert.
- `type` the type of the metric.

For definitions of the components, see [Alert Metric Components](#alert-metric-components).

## Referencing Alert Metrics


There are three ways to reference an alert metric: alert name, alert tags, and alert ID.

- **alert name** - Specify the alert name in the `alertName` tag and `*` in the alert ID field. The example below shows an alert condition that depends on 2 alerts generating the `sourcesFiring` metric with severity WARN.  It specifies alerts named `alert1` and `alert2`.

  ```
  last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert1)) > 0 and last(ts(~alert.summary.*.WARN.sourcesFiring, alertName=alert2)) > 0
  ```

- **alert tag** - Specify one or more [alert tags](tags_overview.html) using the syntax `alertTag1=<tag1>...alertTag<N>=<tagN>` and `*` in the alert ID field. The following condition identifies an alert based on the alert tag hierarchy `myapp.database.*`: 

  ```
  last(ts(~alert.summary.*.SEVERE.sourcesFiring, alertTag1=myapp.database.*)) > 0
  ```

- **alert ID** - Specify the alert ID. An alert ID is the second to last component of the URL open when you edit an alert definition. In the URL `https://<wavefront_instance>.wavefront.com/alerts/1493407920928/edit`, the ID is `1493407920928`. The example below is an alert condition that depends on 2 alerts generating the `sourcesFiring` metric with severity SEVERE. This example refers to the alerts using the alert IDs `1493407920928` and `1493407943926`. 

  ```
  last(ts(~alert.summary.1493407920928.SEVERE.sourcesFiring)) > 0 and last(ts(~alert.summary.1493407943926.SEVERE.sourcesFiring)) > 0
  ```

## Alert Metric Components

The table below lists the alert metric components.

<table style="width: 100.0%;">
<colgroup>
<col width="10%" />
<col width="30%" />
<col width="30%" />
<col width="30%" />
</colgroup>
  <thead>
    <tr>
      <th>Category</th>
      <th>Severity</th>
      <th>Type</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>summary</td>
      <td>INFO, SMOKE, WARN, or SEVERE</td>
      <td>sourcesFiring</td>
      <td>Count of unique sources firing in the alert list.</td>
    </tr>
    <tr>
      <td>summary</td>
      <td>INFO, SMOKE, WARN, or SEVERE</td>
      <td>seriesFiring</td>
      <td>Count of all entries in the series present in the alert list.</td>
    </tr>
    <tr>
      <td>summary</td>
      <td>INFO, SMOKE, WARN, or SEVERE</td>
      <td>labelsFiring</td>
      <td>Count of unique labels firing present in the alert list.</td>
    </tr>
    <tr>
      <td>summary</td>
      <td>INFO, SMOKE, WARN, or SEVERE</td>
      <td>pointTagsFiring</td>
      <td>Count of point tag key-value pairs present in the alert list.</td>
    </tr>
    <tr>
      <td>firing</td>
      <td>INFO, SMOKE, WARN, or SEVERE</td>
      <td> &lt;metricName&gt;. The metric name is not appended if the alert does not have the metric value.</td>
      <td>1 point for each entry in the series present in the alert list.</td>
    </tr>
    <tr>
      <td>isfiring</td>
      <td></td>
      <td></td>
      <td>1 if alert is firing, 0 otherwise.</td>
    </tr>
  </tbody>
</table>


### Notes

- The source of the `~alert.summary.*` metrics is set to `wavefront`. The `source` of the `~alert.*firing.*` metrics is the sources involved in the alert. If the host field is empty or the HLP is empty, the `source` is set to `unknown`. You can filter the `~alert.*firing.*` metrics by specifying `source=<source>`. 
- When the alert is either snoozed or not firing, the `~alert.summary.*` and `~alert.firing.*` metrics are emitted with the value 0. If the alert is in a maintenance window, no metric is emitted.

### Example Metrics

- `~alert.summary.1484772362710.WARN.sourcesFiring`
- `~alert.summary.1484772362710.WARN.seriesFiring`
- `~alert.summary.1484772362710.WARN.labelsFiring`
- `~alert.summary.1484772362710.WARN.pointTagsFiring`
- `~alert.firing.1484772362710.WARN.metric1`
- `~alert.isfiring.1484772362710`








