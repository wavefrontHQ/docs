---
title: Tanzu Observability Usage Integration
tags: [integrations list]
permalink: system.html
summary: Learn about the Tanzu Observability Usage Integration.
---

This page provides an overview of what you can do with the Tanzu Observability Usage integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Tanzu Observability Usage integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Tanzu Observability Usage** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Operations for Applications Usage Integration

The **Operations for Applications Service and Proxy Data** dashboard allows you to examine internal metrics and check whether your Operations for Applications instance is behaving as expected.

The **Operations for Applications Ingestion Policy Explorer** dashboard provides a granular breakdown of Operations for Applications ingestion across your organization by ingestion policies, accounts, sources, and types.
Use this dashboard to identify who is contributing the most to your Operations for Applications usage and manage your overall usage.

The **Operations for Applications Namespace Usage Explorer** dashboard breaks down metrics usage based on integrations with the ability to drill-down further into the metric namespaces.

The **Usage (PPS) vs Remaining Balance (PPS P95) for Burndown** dashboard shows your monthly PPS usage against your remaining burndown balance. Applies only to customers who have burndown commit contracts with Operations for Applications.

The **Committed Rate vs Monthly Usage (PPS P95) for Billable** dashboard shows your monthly PPS usage against your monthly billable commitment. Applies only to customers who have billable commit contracts with Operations for Applications.

Operations for Applications internal metrics have the following [prefixes](https://docs.wavefront.com/wavefront-internal-metrics.html#internal-metrics-overview).

To modify the **Operations for Applications Usage alerts**, install them and clone them. You must update the required fields in cloned alerts.




<h2>Alerts</h2>  <ul><li markdown="span"><b>High rate of host IDs observed</b>:Alert for tenant is reporting high rate of new host (source) IDs to Tanzu Observability.</li><li markdown="span"><b>High rate of metric IDs observed</b>:Alert for tenant is reporting high rate of new metric IDs to Tanzu Observability.</li><li markdown="span"><b>High rate of string IDs observed</b>:Alert for tenant is reporting high rate of new string (point tags) IDs to Tanzu Observability.</li><li markdown="span"><b>Alert Webhooks failed</b>:Alert is reporting when the alert webhooks end with either a 4xx or 5xx error.</li><li markdown="span"><b>Proxy check-in with an invalid token observed</b>:Alert is reporting when a proxy checks in by using an invalid token.</li><li markdown="span"><b>Proxy Network Latency (P95)</b>:Alert is reporting the 95th percentile of the latency. Latency measures the time it takes for the proxy to push its metric, i.e. the duration. Constantly large numbers mean that the network suffers certain latency.</li><li markdown="span"><b>Proxy Data Received Lag (P95)</b>:Alert is reporting the 95th percentile of time differences (in milliseconds) between the timestamp on a point and the time that the proxy received it. Large numbers indicate backfilling old data, or clock drift in the sending systems. You can also graph other percentiles.</li><li markdown="span"><b>Proxy Backlog (spans) has been accumulating</b>:This alert checks whether there is any span back logs on proxy. Back logs means the proxy is queuing points due to either the span data transmission between proxy and TO service has been blocked, or data is being pushed back by the service due to the ingestion limit imposed.</li><li markdown="span"><b>Proxy Backlog (histograms) has been accumulating</b>:Alert is reporting there are histogram backlogs on the proxy. Backlogs mean that the proxy is queuing histograms because either the data transmission between the proxy and the service has been blocked, or the data is being pushed back by the service because the ingestion limit is reached.</li><li markdown="span"><b>Proxy rate limiter is activated</b>:Alert is reporting when the points per second rate's 30-minute moving sum is constantly high. Check to see which proxy is affected by the data being pushed back.</li><li markdown="span"><b>Proxy Backlog (points) has been accumulating</b>:This alert checks whether there is any metric back logs on proxy. Back logs means the proxy is queuing metric points due to either the data transmission between proxy and TO service has been blocked, or data is being pushed back by the service due to the ingestion limit imposed.</li><li markdown="span"><b>High proxy JVM memory heap usage observed</b>:Alert is reporting when the heap memory usage of the proxy is constantly high. Make sure that the memory of the proxy is reasonable.</li><li markdown="span"><b>Tanzu Observability rate limits exceeded</b>:Alert is reporting when the points per second that are being rate limited reach a certain threshold.</li><li markdown="span"><b>Invalid Alert Condition Found</b>:Alert is reporting that some alerts are with invalid state. To find the detailed list of the alerts that are currently in invalid state, in the alert list search for invalid status.</li><li markdown="span"><b>Remaining Balance</b>:Alert is reporting when the usage balance is below 5% of the total contract rate.</li><li markdown="span"><b>Percentage of Usage Scanned (Real-Time)</b>:Alert is reporting when the total percentage of usage scanned is above 95% of the committed rate.</li><li markdown="span"><b>Percentage of Usage Ingested (Real-Time)</b>:Alert is reporting when the total percentage of usage ingested is above 95% of the committed rate.</li></ul>