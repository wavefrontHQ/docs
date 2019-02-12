---
title: Integrations Overview
keywords: integrations
tags: [integrations, data, dashboards, alerts, administration]
sidebar: doc_sidebar
permalink: integrations.html
summary: Learn how to customize a built-in integration and how to set up a custom integration.
---

Integrations are one easy way to get data from external systems into Wavefront. Use one of the [built-in integrations](label_integrations%20list.html) and customize it as needed.

We update our list of [new and updated built-in integrations](integrations_new_changed.html) monthly.

## Try an Integration!

Sign up for a Wavefront trial to try integrations. Detailed setup steps for each integration are in the product.

Here's a sample of what you see when you select one of the Wavefront integrations:
* The **Overview** tab explains how the integration works and what's included, often a sample dashboard with commonly used charts.
* The **Setup** tab has instructions for configuring the integration.
* The **Metrics** and **Dashboard** tabs are preconfigured to show your metrics after you've set up the integration. You can [clone and customize our dashboards](integrations.html#cloning-and-customizing-dashboards)

Here's a screen shot that shows the different tabs of the Apache Solr integration.

![sample_integration](images/integrations_example.png)


**Note** Even if we don't have an integration for you data source, you can send your data directly to the [Wavefront proxy](proxies.html) in one of the [supported data formats](proxies.html#supported-data-formats).

## Built-In and Custom Integrations
Wavefront lets you set up many integrations directly from the product. For other integrations, we give step-by-step instructions -- or you can send your data to Wavefront in other ways, for example, using the Telegraf output plugin for Wavefront.

- **Built-in integrations** provide assisted installation and configuration. Many integrations also install a dashboard for you. Access the integration by selecting **Integrations** from the menu bar and click the **Setup** tab.

  For some data sources, for example Amazon AWS, we offer an integration for the initial connection and give customization information in this documentation.

- **Custom** integrations provide installation and configuration instructions in this documentation.

<table width="100%">
<colgroup>
<col width="20%" />
<col width="80%" />
</colgroup>
<thead>
<tr><th>Category</th><th>Integrations</th></tr>
</thead>
<tbody>
<tr>
<td>Customization of Built-In Integrations</td>
<td markdown="span">[AWS Metrics Integration](integrations_aws_metrics.html),[Amazon Web Services ECS](integrations_aws_ecs.html), [Log Data -- FileBeat and TCP](integrations_log_data.html)
</td>
</tr>
<tr>
<td>Data Collector Integrations</td>
<td markdown="span">[AppDynamics](integrations_appdynamics.html), [NewRelic](integrations_newrelic.html), [External links](external_links_managing.html), [R](integrations_r.html)
</td>
</tr>
<tr>
<td>collectd Integrations</td>
<td markdown="span"> [Apache collectd](integrations_collectd_apache.html), [Cassandra collectd](integrations_collectd_cassandra.html), [MySQL collectd](integrations_collectd_mysql.html), [NGINX collectd](integrations_collectd_nginx.html), [Redis collectd](integrations_collectd_redis.html), [ZooKeeper collected](integrations_collectd_zookeeper.html)
</td>
</tr>
</tbody>
</table>

## Integration States

The Integrations page reports integration state depending on two factors:

- Whether metrics ever reported and whether they reported in the last 2 hours or in the last 7 days.
- The state of content installation: never installed, installed, uninstalled.

### Supported States

The supported states are:

- **Active** - integrations whose metrics are reporting and installed or uninstalled content.
- **Available** - integrations whose metrics never reported and never installed content or integrations that don't have metrics.
- **Warning** - integrations whose metrics never reported and installed content.
- **Error** - integrations whose metrics reported within the last 7 days but have stop reporting for 2 hours and installed content.

You can filter integrations by state or with the following saved searches:

- **New Integrations** - integrations that have metrics reporting for at most two hours and have installed content
- **Installed Integrations** - integrations in the Active, Warning, or Error state. An integration can be in one of these states even if content has been uninstalled.

### State Indicators

When you hover over an integration, Wavefront colors the integration border and displays indicators based on the current state:

<table width="80%" class="layout">
<colgroup>
<col width="20%" />
<col width="40%" />
<col width="40%" />
</colgroup>
<tr><td></td><td><strong>Metrics</strong></td><td><strong>No Metrics</strong></td></tr>
<tbody>
<tr>
<td><strong>Content</strong></td>
<td>Active <i class="fa fa-check-circle text-success" style="font-size: 18px;"></i> <i class="fa fa-check-circle text-success" style="font-size: 18px;"></i></td>
<td>Warning <i class="fa fa-exclamation-circle" style="color:#FFA31C; font-size: 18px;"></i> <i class="fa fa-check-circle text-success" style="font-size: 18px;"></i> or Error <i class="fa fa-exclamation-triangle" style="color:#D9534F; font-size: 18px;"></i> <i class="fa fa-check-circle text-success" style="font-size: 18px;"></i></td>
</tr>
<tr>
<td><strong>No Content</strong></td>
<td>Active <i class="fa fa-check-circle text-success" style="font-size: 18px;"></i> <i class="fa fa-stop-circle text-muted" style="font-size: 18px;"></i></td>
<td>Available <i class="fa fa-exclamation-circle text-error" style="font-size: 18px;"></i> <i class="fa fa-stop-circle text-muted" style="font-size: 18px;"></i></td>
</tr>
</tbody>
</table>

For example, the following integration is in the Error state because metrics have reported within the last 7 days but have stopped reporting in the past 2 hours and content is installed.

![integration state](images/integration_state.png)

## Installing and Uninstalling Integration Dashboards

You can install and uninstall dashboards from Featured and Data Collector integrations.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view integrations, you must have [Integration Management permission](permissions_overview.html) to install and uninstall integration dashboards. If you do not have permission, buttons to perform these tasks are not visible.</div>

1. Click **Integrations**.
1. Click the integration tile.
1. Click the **Content** tab.
1. Click **\[Install \| Uninstall\] Dashboards**.

## Cloning and Customizing Dashboards

You cannot modify Wavefront system dashboards. Instead, click the Edit (pen) icon, select **Clone**, and provide a URL string that's just the name (e.g. `mydashboard`) and not the URL (e.g. `http://mydashboard`). You can then customize the clone to suit your needs.

## More Info

On our [wavefront.com](http://www.wavefront.com){:target="_blank" rel="noopenner noreferrer"} site we have several blog posts with use cases and background info:
* [Google Cloud Monitoring Using Wavefront Metrics-Driven Analytics](https://www.wavefront.com/gcp-metrics/){:target="_blank" rel="noopenner noreferrer"}
* [Monitor MongoDB Metrics for Better Scaling and Optimized Database Performance](https://www.wavefront.com/mongodb-metrics/){:target="_blank" rel="noopenner noreferrer"}
* [Monitoring Apache HTTP Server with Wavefront Metrics-Driven Analytics](https://www.wavefront.com/monitoring-apache-http-server-wavefront-metrics-driven-analytics/){:target="_blank" rel="noopenner noreferrer"}
