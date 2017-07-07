---
title: Integrations
keywords: integrations
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations.html
summary: Learn about the integrations supported by Wavefront, how to install an integration, and how to work with integration content.
---

Integrations facilitate setting up links between the Wavefront application and external systems.

## Integration Categories

Integrations are grouped into categories based on the type of link set up between Wavefront and the external system.

- **Featured, Collector, and Code Instrumentation** - set up sending metrics data into Wavefront. These include:
  - Ingesting metrics into Wavefront using the Telegraf collector agent and the Wavefront proxy
  - Ingesting metrics using a [technology-specific collector](integrations_containers.html) and the Wavefront proxy
  - Ingesting [log data](integrations_log_data.html)
  - Ingesting custom metrics sent from applications to the Wavefront proxy
  - Pulling metrics from [Amazon Web Services](integrations_aws_metrics.html)

  ![collector integrations](images/integrations_data_collector.png)

- **Alert Notification** - set up sending alerts from Wavefront to incident management systems and notification services.

  ![alert notification integrations](images/integrations_alert_notification.png)

- **Authentication** - set up authentication providers to enable SSO access to the Wavefront application.

  ![authentication integrations](images/integrations_authentication.png)

## Integration Support

Wavefront offers two levels of support for integrations: in-product and documentation. 

In-product integrations provide assisted installation and configuration. Featured and Data Collector integrations have advanced support such as dashboard installation. In-product integrations typically point to documentation for configuration reference information. 

Documentation integrations are available as documentation only and consist of installation and configuration instructions.

### In-Product Integrations

To view in-product integrations, click **Integrations** in the Wavefront UI task bar.

<table width="100%">
<colgroup>
<col width="20%" />
<col width="10%" />
<col width="70%" />
</colgroup>
<thead><tr><th>Category</th><th>Dashboards?</th><th>Integrations</th></tr></thead>
<tbody>
<tr>
<td>Featured</td>
<td>Yes</td>
<td>Amazon Web Services, Kubernetes (k8s), Docker, Mac host, Linux host, Windows host, Ansible, Tour<sup><strong>*</strong></sup>, Tutorial<sup><strong>*</strong></sup>, System<sup><strong>*</strong></sup></td>
</tr>
<tr>
<td>Data Collector</td>
<td>Yes</td>
<td>NGINX, Memcachd, PostgreSQL, MySQL, Redis, Elasticsearch, HAProxy, Puppet Server, Kafka, RabbitMQ</td>
</tr>
<tr>
<td>Custom Collector</td>
<td>No</td>
<td>Log data, Prometheus, Graphite, OpenTSDB, Telegraf, collectd</td>
</tr>
<tr>
<td>Code Instrumentation</td>
<td>No</td>
<td>StatsD, DropWizard, Go</td>
</tr>
<tr>
<td markdown="span">[Alert Notification](webhooks_alert_notification.html)</td>
<td>No</td>
<td>Slack, PagerDuty, HipChat, VictorOps</td>
</tr>
<tr>
<td markdown="span">[Authentication](integrations_authentication.html)</td>
<td>No</td>
<td>Okta, OneLogin, Azure AD, Google, ADFS</td>
</tr>
</tbody>
</table>

<div markdown="span" class="alert alert-info" role="alert">**\*** The Tour, Tutorial, and System integrations are pre-installed in all Wavefront instances. The Tour and Tutorial integrations consist of a set of [dashboards](dashboards_getting_started.html) that demonstrate features of Wavefront and describe how to use the features. The Tour and Tutorial integrations use pre-populated sample data. The System integration provides the System Usage dashboard, which charts [Wavefront internal metrics](wavefront_monitoring.html).</div>

### Documentation

To view documentation integrations, click the links in the Integrations column.

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
<td>Data Collector</td>
<td markdown="span">[Amazon Web Services ECS](integrations_aws_ecs.html), [AppDynamics](integrations_appdynamics.html), [JMX](integrations_jmx.html), [NewRelic](integrations_newrelic.html), [Apache collectd](integrations_collectd_apache.html), [Cassandra collectd](integrations_collectd_cassandra.html), [MySQL collectd](integrations_collectd_mysql.html), [NGINX collectd](integrations_collectd_nginx.html), [Redis collectd](integrations_collectd_redis.html), [ZooKeeper collected](integrations_collectd_zookeeper.html)
</td>
</tr>
<tr>
<td>Date Export</td>
<td markdown="span">[External Links](external_links_managing.html), [R](integrations_r.html)</td>
</tr>
</tbody>
</table>

## In-Product Integration Content

All in-product integrations have an overview of how the integration is implemented and instructions for installing and configuring software required for the integration implementation.

Featured and Data Collector integrations also have:

- **Metrics** - searchable list and charts of metrics sent by the integration and the rate that the integration is sending metrics. Each integration has a set of "canary" metrics that Wavefront uses to determine that the integration is functioning correctly. The Metrics tab automatically displays charts of the canary metrics. You can click any metric to display a chart of the metric. 
- **Content** - pre-defined dashboards that highlight important metrics or illustrate techniques for querying metrics. Some dashboards contain pre-defined alert conditions embedded as queries in charts contained in the dashboards. You can install and uninstall the dashboards.

For example, here is the Docker with cAdvisor integration:

![docker integration](images/integrations_docker.png)

### In-Product Integration States

The Integrations page reports integration state for integrations depending on two factors:

- Whether metrics ever reported and whether they reported in the last 2 hours or in the last 7 days.
- The state of content installation: never installed, installed, uninstalled.

The supported states are:

- **Active** - integrations whose metrics are reporting and installed or uninstalled content.
- **Available** - integrations whose metrics never reported and never installed content or that don't have metrics.
- **Warning** - integrations whose metrics never reported and installed content.
- **Error** - integrations whose metrics reported within the last 7 days but have stop reporting for 2 hours and installed content.

You can use the filter bar on the left to filter integrations by state. You can also filter integrations with the following saved searches:

- **New Integrations** - integrations with metrics reporting for at most 2 hours and installed content.
- **Installed Integrations** - integrations in the Active, Warning, or Error state. An integration is in one of these states even if content has been uninstalled.

#### State Indicators

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

For example the following integration is in the Error state because metrics have reported within the last 7 days but have stopped reporting in the past 2 hours and content is installed.

![integration state](images/integration_state.png)

## Adding Integrations

To add an in-product integration, click **Integrations** in the task bar.

### Adding a Featured or Data Collector Integration

1. Click a tile in the Featured or Data Collector sections.
1. Click the **Setup** tab. 
1. Follow the instructions for installing and configuring required software.
1. Click the **Metrics** tab to verify that metrics are flowing.
1. Optionally click the **Content** tab and click **Install Dashboards**.

   <div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view integrations, you must have [Integration Management permission](permissions_overview.html) to install and uninstall dashboards. If you do not have permission, buttons to perform these tasks are not visible.</div>


### Adding a Custom Collector or Code Instrumentation Integration

1. Click a tile in the Custom Collector or Code Instrumentations sections.
1. Click the **Setup** tab. 
1. Follow the instructions for installing and configuring required software.
1. Select **Browse > Metrics** tab to verify that metrics are flowing. 

### Adding an Alert Notification Integration

1. Click a tile in the Alert Notification section.
1. Click the **Setup** tab. 
1. Follow the instructions for configuring the notification service.
1. [Create an alert](alerts_managing.html#creating-an-alert).
1. Configure the Targets field to use the notification service.
1. Verify that the notification occurs when the alert changes state.

### Adding an Authentication Integration

1. Click a tile in the Authentication section.
1. Click the **Setup** tab. 
1. Follow the instructions for installing and configuring required software.

## Installing and Uninstalling Integration Dashboards

You can install and uninstall dashboards from Featured and Data Collector integrations.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view integrations, you must have [Integration Management permission](permissions_overview.html) to install and uninstall integration dashboards. If you do not have permission, buttons to perform these tasks are not visible.</div>

1. Click **Integrations**.
1. Click the integration tile.
1. Click the **Content** tab.
1. Click **\[Install \| Uninstall\] Dashboards**.




