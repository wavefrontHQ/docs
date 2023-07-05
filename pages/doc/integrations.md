---
title: Integrations Overview
keywords: integrations
tags: [integrations, data, dashboards, alerts, administration]
sidebar: doc_sidebar
permalink: integrations.html
summary: Learn how to customize a built-in integration and how to set up a custom integration.
---

Integrations are one easy way to get data from external systems into VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront). Use one of the [built-in integrations](label_integrations%20list.html) and customize it as needed.

We update our [integrations release notes](integrations_new_changed.html) frequently.

Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. After this date, we support two types of subscriptions: Operations for Applications subscriptions **onboarded** to the [VMware Cloud services platform](https://console.cloud.vmware.com/) and **original** subscriptions. Original subscriptions are the existing ones and they remain as is until they migrate to VMware Cloud services. For information about the subscription types and how they differ, see [Subscription Types](subscriptions-differences.html).  

## Watch a Video

In this video, Jason talks about the different integrations we have, and how you can use them to get your data into the product. You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_j454pr6u" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.

<p>
<iframe id="kmsembed-1_j454pr6u" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_j454pr6u/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="intro to integrations"></iframe>
</p>

## Try an Integration!

Sign up for a trial version to try our integrations. Detailed setup steps for each integration are in the product UI. 

When the integration setup requires a token for the proxy authentication, the setup instructions of some integrations (such as all integrations for Linux distributions, Windows host integration, MacOS integration, Prometheus, and so on) vary depending on whether your service is onboarded to VMware Cloud services or not. For details, see [Integrations Supported for Onboarded Subscriptions](integrations_onboarded_subscriptions.html). For the latest and most recent instructions on how to set up an integration, see the steps on the **Setup** tab of the integration that you're interested in.

* If your Operations for Applications service **is** onboarded to VMware Cloud services, you have two choices:

   * Use OAuth App authentication (recommended):

     You must use the credentials (client ID and client secret) of an existing server to server app which has the **Proxies** service role assigned and is added to the VMware Cloud organization running the service. You must also provide the ID of the VMware Cloud organization running the service.

      If you don’t have a server to server app already, you can create one in the VMware Cloud Services Console. For details, see [How to use OAuth 2.0 for server to server apps](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-327AE12A-85DB-474B-89B2-86651DF91C77.html) in the VMware Cloud services documentation.


   * Use API Token authentication:

     The API token must be generated in the VMware Cloud Services Console by an active user account. It also must have the **Proxies** service role assigned. For more information, see [How do I generate API tokens](https://docs.vmware.com/en/VMware-Cloud-services/services/Using-VMware-Cloud-Services/GUID-E2A3B1C1-E9AD-4B00-A6B6-88D31FCDDF7C.html).
   

* If your Operations for Applications service is **not** onboarded to VMware Cloud services, generate the API token in the Operations for Applications UI. It is recommended that you use a service account API token. For more information, see [Manage API tokens](api_tokens.html).

Here's a sample of what you see when you select one of our integrations:
* The **Overview** tab explains how the integration works and what's included, often a sample dashboard with commonly used charts.
* The **Setup** tab has the instructions for configuring the integration.
* The **Metrics** and **Dashboard** tabs are preconfigured to show your metrics after you've set up the integration. You can [clone and customize our dashboards](integrations.html#cloning-and-customizing-dashboards).
* The **Alerts** tab is an optional one. It contains a list of preconfigured integration alerts.

Here's a screenshot that shows the different tabs of the Apache Solr integration.

![An image of the Apache Solr integration showing the Overview, Setup, Metrics, and Dashboards tabs.](images/integrations_example.png)


**Note** Even if we don't have an integration for you data source, you can send your data directly to the [Wavefront proxy](proxies.html) in one of the [supported data formats](proxies.html#supported-data-formats).

## Built-In and Custom Integrations

VMware Aria Operations for Applications lets you set up many integrations directly from the product. For other integrations, we give step-by-step instructions -- or you can send your data in other ways, for example, using the Telegraf output plug-in.

- **Built-in integrations** provide assisted installation and configuration. Many integrations also install a dashboard for you. Access the integration by clicking **Integrations** on the toolbar and clicking the **Setup** tab.

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

Our first external integration sends AlertSite monitoring results to VMware Aria Operations for Applications and is available at [https://github.com/secureworks/AlertSite2Wavefront](https://github.com/secureworks/AlertSite2Wavefront).

We're excited about this contribution and hope to see more soon!

<!--## Get to Know the Integration Dashboards

Before setting up an integration, you can look into our demo dashboards. These demo dashboards are for our most used integrations and contain some sample (sandbox) data. You can explore the data and look how the dashboards work. As these are demo dashboards, you cannot edit them.

 {% include note.html content="The Sample Data Dashboards are currently available to some of our customers. They will become available to all customers within the next releases."%}

1. Click **Integrations** on the toolbar.

   ![Sample data dashboards section preview](images/integrations-sample-dashboards.png)
1. In the **Get to know integration dashboards!** section, click the **Explore** button for a sample integration dashboard.

    {% include note.html content="You are redirected to a sandbox data tenant cluster in another tab of your browser. Notice the URL. This sandbox data tenant cluster contains the sample integrations data and dashboards." %}

1. To close the **Sample Data Dashboards** section, click **Close the section** and confirm.
1. To bring back the demo dashboards section, in the left pane, click **Show Demo Dashboards**.
-->
## Installing and Uninstalling Integration Dashboards

You can install and uninstall the system integration dashboards.

<div markdown="span" class="alert alert-info" role="alert">While every user can view integrations, you must have the [**Integrations** permission](permissions_overview.html) to install and uninstall integration dashboards. If you do not have this permission, buttons to perform these tasks are not visible.</div>

1. Click **Integrations** on the toolbar.
1. Click an integration tile.
1. Click the **Dashboards** tab.
1. Click **\[Install \| Uninstall\] Dashboards**.

## Cloning and Customizing Dashboards

You cannot modify the system dashboards. Instead, you must clone the dashboards.
1. Open an integration dashboard:
   1. Click **Integrations** on the toolbar.
   1. Click an integration tile.
   1. Click the **Dashboards** tab.
   1. Click the dashboard that you want to clone and edit.
2. Click the ellipsis icon in the top right corner of the dashboard.
3. Select **Clone**.
4. Provide a URL string that's just the name (e.g., `mydashboard` or `dashboard-name-clone`) and not the URL (e.g., `http://mydashboard`).
5. Customize the clone to suit your needs.

<!--Add this as step 4 when we have the custom prefix feature is rolled out to more customers

(Optional) Provide a custom metric prefix.
  
   The metric prefix will be applied to all the charts in the cloned dashboard. It can contain:
   
   * Uppercase and lowercase letters
   * Numbers
   * Full stop (.)
   * Hyphen (-)
   * Underscore (_)
   
   Note that the custom metric prefix cannot end with a hyphen or underscore.
-->

## Installing and Uninstalling Integration Alerts

Some integrations contain system alerts. You can preview the system alerts even before setting up an integration by clicking **Preview**. In Preview mode, you cannot do any customizations to these alerts. You can also install and uninstall the predefined integration alerts to explore them further. After you install the system alerts, you edit some of their settings.

{% include note.html content="All users can view alerts. You must have the **Integrations** permission to install and uninstall the system alerts." %}

**To install the system alerts**:

1. Click **Integrations** on the toolbar.
1. Click an integration tile.
1. Click the **Alerts** tab.
1. Click **\[Install All\| Uninstall All\]**.

  {% include important.html content= "After you install the system integration alerts, make sure that you set one or more alert targets for each severity of the alerts so that you receive alert notifications." %}

## Editing and Cloning the Integration Alerts

To [edit the targets of the integration alerts](webhooks_alert_notification.html#learn-about-alert-targets), you must have the **Alerts** permission. If you edit the system integration alerts and then reinstall them, all of the changes that you've made are reverted back to their original state.

By default, when integration alerts are installed, you can edit the following alert settings:

* **Tags** -- You can add additional tags, as necessary.
* **Alert Condition** threshold values -- You can edit the threshold values but NOT the operator.
* **Recipients** -- Specify the email address, PagerDuty key, or alert targets that will receive alert notifications
* **Runbook**, **Triage Dashboard(s)**, and **Additional Information** settings -- Allow you to add runbook URLs and specify other information that can help with alert resolution.

Clone the alert before making any customizations so that you don't lose your changes. 

**To clone an integration alert:**

1. Click **Integrations** on the toolbar.
1. Click an integration tile.
1. Click the **Alerts** tab.
1. Click **Edit** next to the alert that you want to clone.
   The alert opens in Edit mode.
1. Click the **Clone** button in the top right corner of the alert.

   ![Example screenshot that shows the clone button](images/alerts-clone.png)
   
1. Enter a name of the new alert and click **Clone**.

   The new alert opens in edit mode.
1. Customize the clone to suit your needs and click **Save**.

After you clone an alert, snooze the original system integration alert to avoid running a duplicate version of the alert. For more information about editing alerts, see [Manage Alerts](alerts_manage.html).


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
* On our [VMware Aria Operations for Applications](https://tanzu.vmware.com/observability) pages we have several blog posts with use cases and background info:
  - [Google Cloud Monitoring Using Wavefront Metrics-Driven Analytics](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/google-cloud-monitoring-using-wavefront-metrics-driven-analytics)
  - [Monitor MongoDB Metrics for Better Scaling and Optimized Database Performance](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/monitor-mongodb-metrics-for-better-scaling-and-optimized-database-performance)
  - [Monitoring Apache HTTP Server with Wavefront Metrics-Driven Analytics](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/monitoring-apache-http-server-with-wavefront-metrics-driven-analytics)
