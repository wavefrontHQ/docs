---
title: Wavefront Usage Integration Details
keywords:
tags: [integrations, dashboards]
sidebar: doc_sidebar
permalink: integrations_wavefront.html
summary: Learn about the predefined alerts and more.
---
The [Wavefront Usage Integration](system.html) enables you to get usage information for your Wavefront instance and Wavefront proxy, examine PPS based on predefined ingestion policies, see whether the ingested metrics are at 95% committed rates, and more.

On this page, we list the predefined alerts.

## Predefined Alerts for the Integration

The Wavefront Usage integration provides the following monitoring alerts. These alerts are predefined, no additional setup is required. You can [create additional alerts](alerts.html#creating-an-alert) from the **Alerts** browser or from charts in the Wavefront UI.

<table>
<tbody>
<thead>
<tr><th width="60%">Name</th><th width="20%">Severity</th><th width="20%">Resolve After (min)</th></tr>
</thead>
<tr>
<td>High rate of host IDs observed</td>
<td>INFO</td>
<td>5</td></tr>
<tr>
<td>High rate of metric IDs observed</td>
<td>INFO</td>
<td>5</td></tr>
<tr>
<td>High rate of string IDs observed</td>
<td>INFO</td>
<td>5</td></tr>
</tbody>
</table>


## Wavefront Usage Monitoring Dashboards

Wavefront includes several predefined dashboards for monitoring Tanzu Kubernetes Grid. You can use these dashboards as is, or [clone and customize them](ui_dashboards.html).

We support dashboards for major functionality including:

* Wavefront Service and Proxy data dashboard
* Wavefront Namespace Usage Explorer dashboard
* Wavefront Ingestion Policy Explorer dashboard
* Committed Rate and Monthly Usage (PPS P95) dashboard

For more information about the dashboards and how to monitor your Wavefront service, see [Monitor and troubleshoot your Wavefront instance and see PPS info](wavefront_monitoring.html). To see the full set of dashboards, sign in to your Wavefront instance, or sign up for a [free trial](http://wavefront.com/sign-up/?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"}.
