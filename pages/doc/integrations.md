---
title: Integrations Overview
keywords: integrations
tags: [integrations, data, dashboards, alerts, administration]
sidebar: doc_sidebar
permalink: integrations.html
summary: Learn how to customize a built-in integration and how to set up a custom integration.
---

Integrations are one easy way to get data from external systems into Tanzu Observability by Wavefront. Use one of the [built-in integrations](label_integrations%20list.html) and customize it as needed.

We update our [integrations release notes](integrations_new_changed.html) on a monthly basis.

## Watch a Video

In this video, Jason talks about the different integrations we have, and how you can use them to get your data into Tanzu Observability. You can also watch the video <a href="https://bcove.video/2JTvMgW" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.

<p><a href="https://bcove.video/2JTvMgW"><img src="/images/v_integrations_v2.png" style="width: 700px;" alt="new intro to integratons"/></a>
</p>

## Try an Integration!

Sign up for a trial version to try our integrations. Detailed setup steps for each integration are in the product.

Here's a sample of what you see when you select one of our integrations:
* The **Overview** tab explains how the integration works and what's included, often a sample dashboard with commonly used charts.
* The **Setup** tab has instructions for configuring the integration.
* The **Metrics** and **Dashboard** tabs are preconfigured to show your metrics after you've set up the integration. You can [clone and customize our dashboards](integrations.html#cloning-and-customizing-dashboards).
* The **Alerts** tab is an optional one. It contains a list of preconfigured integration alerts.

Here's a screenshot that shows the different tabs of the Apache Solr integration.

![An image of the Apache Solr integration showing the Overview, Setup, Metrics, and Dashboards tabs.](images/integrations_example.png)


**Note** Even if we don't have an integration for you data source, you can send your data directly to the [Wavefront proxy](proxies.html) in one of the [supported data formats](proxies.html#supported-data-formats).

## Built-In and Custom Integrations

Tanzu Observability lets you set up many integrations directly from the product. For other integrations, we give step-by-step instructions -- or you can send your data in other ways, for example, using the Telegraf output plug-in.

- **Built-in integrations** provide assisted installation and configuration. Many integrations also install a dashboard for you. Access the integration by selecting **Integrations** from the taskbar and clicking the **Setup** tab.

- **Customizable built-in integrations** provide a built-in integration for the initial connection, with additional customization information in this documentation.

- **Custom** integrations provide installation and configuration instructions in this documentation.

This table provides links to the documentation pages for many of the custom and customizable integrations:

<table width="100%">
<colgroup>
<col width="30%" />
<col width="70%" />
</colgroup>
<thead>
<tr><th>Category</th><th>Examples</th></tr>
</thead>
<tbody>
<tr>
<td>Customizable built-in integrations</td>
<td markdown="span">[AWS Metrics Integration](integrations_aws_metrics.html), [Amazon Web Services ECS](integrations_aws_ecs.html), [AWS Lambda Functions](integrations_aws_lambda.html), [Log Data -- FileBeat and TCP](integrations_log_data.html)
</td>
</tr>
<tr>
<td>Custom integrations - collectd</td>
<td markdown="span"> [Apache collectd](integrations_collectd_apache.html), [Cassandra collectd](integrations_collectd_cassandra.html), [MySQL collectd](integrations_collectd_mysql.html), [NGINX collectd](integrations_collectd_nginx.html), [Redis collectd](integrations_collectd_redis.html), [ZooKeeper collectd](integrations_collectd_zookeeper.html)
</td>
</tr>
</tbody>
</table>

## External (Open-Source) Integrations

Our customers have started to make open-source integrations available on GitHub.

Our first external integration sends AlertSite monitoring results to Tanzu Observability and is available at [https://github.com/secureworks/AlertSite2Wavefront](https://github.com/secureworks/AlertSite2Wavefront).

We're excited about this contribution and hope to see more soon!

## Get to Know the Integration Dashboards

Before setting up an integration, you can look into our demo dashboards. These demo dashboards are for our most used integrations and contain some sample (sandbox) data. You can explore the data and look how the dashboards work. As these are demo dashboards, you cannot edit them.

 {% include note.html content="The Sample Data Dashboards are currently available to some of our customers. They will become available to all customers within the next releases."%}

1. Click **Integrations** on the taskbar.

   ![Sample data dashboards section preview](images/integrations-sample-dashboards.png)
1. In the **Get to know integration dashboards!** section, click the **Explore** button for a sample integration dashboard.

    {% include note.html content="You are redirected to a sandbox data tenant cluster in another tab of your browser. Notice the URL. This sandbox data tenant cluster contains the sample integrations data and dashboards." %}

1. To close the **Sample Data Dashboards** section, click **Close the section** and confirm.
1. To bring back the demo dashboards section, in the left pane, click **Show Demo Dashboards**.

## Installing and Uninstalling Integration Dashboards

You can install and uninstall the system integration dashboards.

<div markdown="span" class="alert alert-info" role="alert">While every user can view integrations, you must have [**Integration Management** permission](permissions_overview.html) to install and uninstall integration dashboards. If you do not have this permission, buttons to perform these tasks are not visible.</div>

1. Click **Integrations**.
1. Click the integration tile.
1. Click the **Dashboards** tab.
1. Click **\[Install \| Uninstall\] Dashboards**.

## Cloning and Customizing Dashboards

You cannot modify the system dashboards. Instead, you must clone the dashboards.
1. Click the ellipsis icon in the top right corner of the dashboard.
2. Select **Clone**.
3. Provide a URL string that's just the name (e.g., `mydashboard` or `dashboard-name-clone`) and not the URL (e.g., `http://mydashboard`).
4. Customize the clone to suit your needs.

## Installing and Uninstalling Integration Alerts

Some integrations contain system alerts. You can install and uninstall the predefined integration alerts or preview them before setting up the integration.

{% include note.html content="All users can view alerts. You must have the **Alerts** permission to install and uninstall or modify alerts. If some of the alerts in your environment are under [access control](access.html), you can view or view and modify those alerts only if they've been shared with you." %}

1. Click **Integrations**.
1. Click the integration tile.
1. Click the **Alerts** tab.
1. Click **\[Install All\| Uninstall All\]**.

  {% include important.html content= "After you install the system integration alerts, make sure that you set one or more alert targets for each severity of the alerts so that you receive alert notifications." %}

## Editing and Cloning the Integration Alerts

To [edit the targets of the integration alerts](webhooks_alert_notification.html#learn-about-alert-targets), you must have the **Alerts** permission. If you edit the system integration alerts and then reinstall them, all of the changes that you've made are reverted back to their original state.

To make further customizations, clone the alert first.

1. Click **Alerting > All Alerts** from the toolbar.
2. Click the ellipsis icon next to the alert that you want to clone, and select **Clone**.
3. Enter a name of the new alert and click **Clone**.

After you clone an alert, snooze the original system integration alert to avoid running a duplicate version of the alert. For more information about cloning and editing alerts, see [Manage Alerts](alerts_manage.html).


## Integration States

The Integrations page reports integration states depending on two factors:

- Whether metrics ever reported and whether they reported in the last 2 hours or in the last 7 days.
- The state of content installation, such as installed, never installed, or uninstalled.

### Supported States

The supported states are:

- **Active** - integrations whose metrics are reporting and user has installed or uninstalled content.
- **Available** - integrations whose metrics never reported and content has been never installed or integrations that don't have metrics.
- **Warning** - integrations whose metrics never reported and have no installed content.
- **Error** - integrations whose metrics reported within the last 7 days but have stop reporting for 2 hours and have installed content.
- **Pending** - integrations whose metrics are yet to start reporting.
- **Alias** - integrations that are supported by another integration.

{% include note.html content="To filter the integrations by state, scroll down, so that the states of the integrations are loaded. When you click a state from the left panel, for example, **Active**, only the integrations whose Active states are loaded will be filtered out and displayed in the main panel." %}

You can also filter integrations with the following saved searches:

- **New Integrations** - integrations that have metrics reporting for at most two hours and have installed content.
- **Installed Integrations** - integrations in the Active, Warning, or Error state. An integration can be in one of these states even if content has been uninstalled.

### State Indicators

When you hover over an integration, the integration border in the UI changes and you see indicators based on the current state. For example, the following integration is in the Warning state because metrics have stopped reporting in the past month and content is installed.

![Windows integration state with a Warning sign next to metrics](images/integration_state.png)


## More Info

* Don't see the integration you are looking for? Have a look at [Set Up Data Ingestion](wavefront_data_ingestion.html) and at [Data Format](wavefront_data_format.html).
* On our [Tanzu Observability](https://tanzu.vmware.com/observability) pages we have several blog posts with use cases and background info:
  - [Google Cloud Monitoring Using Wavefront Metrics-Driven Analytics](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/google-cloud-monitoring-using-wavefront-metrics-driven-analytics)
  - [Monitor MongoDB Metrics for Better Scaling and Optimized Database Performance](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/monitor-mongodb-metrics-for-better-scaling-and-optimized-database-performance)
  - [Monitoring Apache HTTP Server with Wavefront Metrics-Driven Analytics](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/monitoring-apache-http-server-with-wavefront-metrics-driven-analytics)
